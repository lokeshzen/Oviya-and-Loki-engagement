"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AmpersandMedallion, DecorativeBorder } from "@/components/DecorativeBorder";
import { HeroCurtain } from "@/components/HeroCurtain";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { EVENT } from "@/lib/event";
import { cn } from "@/lib/utils";

const CURTAIN_SEQUENCE_MS = 1200;
const CURTAIN_FALLBACK_MS = 8000;
// Matches HeroCurtain: 0.2s delay + 0.9s panel travel.
const CURTAIN_REVEAL_MS = 1100;
const BGM_VOLUME = 0.85;
const BGM_FADE_MS = 900;
const HERO_VIDEO_SRC = "/assets/loki-wedding.mp4";

function bindInlineVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
}

const NAME_SPARKS = [
  { top: "4%", left: "6%", delay: "2.05s", size: 3 },
  { top: "16%", left: "88%", delay: "2.35s", size: 2 },
  { top: "42%", left: "2%", delay: "2.7s", size: 2.5 },
  { top: "48%", left: "92%", delay: "2.2s", size: 3 },
  { top: "74%", left: "10%", delay: "2.9s", size: 2 },
  { top: "86%", left: "84%", delay: "2.55s", size: 2.5 },
  { top: "28%", left: "16%", delay: "3.15s", size: 2 },
  { top: "68%", left: "80%", delay: "3.35s", size: 2 },
] as const;

function MusicMark({ playing }: { playing: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("h-3.5 w-3.5 fill-current", playing && "animate-pulse")}
    >
      <path d="M9 18.5a2.5 2.5 0 1 1-2.5-2.5H8V6.2l10-1.7v10.5h-.5a2.5 2.5 0 1 1-1.5-2.3V7.1L9 8.5v10z" />
    </svg>
  );
}

function NameSparks() {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden>
      {NAME_SPARKS.map((spark) => (
        <span
          key={`${spark.top}-${spark.left}`}
          className="hero-spark"
          style={{
            top: spark.top,
            left: spark.left,
            width: spark.size,
            height: spark.size,
            animationDelay: spark.delay,
          }}
        />
      ))}
    </span>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const scroll = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tryPlayRef = useRef<() => void>(() => {});
  const audioRef = useRef<HTMLAudioElement>(null);
  const setVideoNode = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    if (node) bindInlineVideo(node);
  }, []);
  const hasOpenedRef = useRef(false);
  const holdHeroRef = useRef(true);
  const fadeFrameRef = useRef(0);
  const revealTimerRef = useRef(0);
  const lenisRef = useRef(scroll?.lenis ?? null);
  lenisRef.current = scroll?.lenis ?? null;

  const pinningRef = useRef(false);
  const pinHero = useCallback(() => {
    if (pinningRef.current) return;
    pinningRef.current = true;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    root.style.scrollBehavior = previous;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    pinningRef.current = false;
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [curtainMounted, setCurtainMounted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const skipCurtain = reduceMotion === true;

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current) {
      cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = 0;
    }
  }, []);

  const clearRevealTimer = useCallback(() => {
    if (revealTimerRef.current) {
      window.clearTimeout(revealTimerRef.current);
      revealTimerRef.current = 0;
    }
  }, []);

  const fadeTo = useCallback(
    (audio: HTMLAudioElement, target: number, duration: number) => {
      cancelFade();
      const from = audio.volume;
      const start = performance.now();
      const step = (now: number) => {
        // The first frame timestamp can land a few ms before performance.now().
        // An unclamped progress goes negative and setting volume throws, which
        // aborts the fade and leaves the track silent.
        const progress =
          duration <= 0 ? 1 : Math.min(1, Math.max(0, (now - start) / duration));
        const eased = 1 - (1 - progress) ** 3;
        audio.volume = Math.min(1, Math.max(0, from + (target - from) * eased));
        if (progress < 1) {
          fadeFrameRef.current = requestAnimationFrame(step);
        } else {
          fadeFrameRef.current = 0;
        }
      };
      fadeFrameRef.current = requestAnimationFrame(step);
    },
    [cancelFade],
  );

  const playMusic = useCallback(
    (afterReveal: boolean) => {
      const audio = audioRef.current;
      if (!audio) return;

      if (afterReveal) audio.volume = 0;

      void audio
        .play()
        .then(() => {
          const delay = afterReveal ? CURTAIN_REVEAL_MS : 0;
          const fade = afterReveal ? BGM_FADE_MS : 500;
          clearRevealTimer();
          revealTimerRef.current = window.setTimeout(() => {
            revealTimerRef.current = 0;
            if (!audio.paused) fadeTo(audio, BGM_VOLUME, fade);
          }, delay);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    },
    [clearRevealTimer, fadeTo],
  );

  const open = useCallback(() => {
    tryPlayRef.current();
    pinHero();
    if (window.location.hash && window.location.hash !== "#hero") {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    setIsOpen(true);
    if (hasOpenedRef.current) return;
    hasOpenedRef.current = true;
    playMusic(true);
  }, [pinHero, playMusic]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      clearRevealTimer();
      cancelFade();
      audio.pause();
      return;
    }

    playMusic(false);
  }, [cancelFade, clearRevealTimer, playMusic]);

  useEffect(() => {
    return () => {
      clearRevealTimer();
      cancelFade();
    };
  }, [cancelFade, clearRevealTimer]);

  useLayoutEffect(() => {
    if (skipCurtain) {
      holdHeroRef.current = false;
      return;
    }

    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    if (window.location.hash && window.location.hash !== "#hero") {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    pinHero();

    return () => {
      history.scrollRestoration = previousRestoration;
    };
  }, [pinHero, skipCurtain]);

  useEffect(() => {
    if (skipCurtain) {
      setIsOpen(true);
      setCurtainMounted(false);
      return;
    }

    const pinIfHeld = () => {
      if (!holdHeroRef.current) return;
      const native =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const smooth = lenisRef.current?.animatedScroll ?? 0;
      if (native < 1 && smooth < 1) return;
      pinHero();
    };

    pinIfHeld();
    window.addEventListener("scroll", pinIfHeld, { passive: true });
    window.addEventListener("pageshow", pinIfHeld);
    return () => {
      window.removeEventListener("scroll", pinIfHeld);
      window.removeEventListener("pageshow", pinIfHeld);
    };
  }, [pinHero, skipCurtain]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    bindInlineVideo(video);

    if (reduceMotion) {
      video.pause();
      return;
    }

    let stopped = false;
    let playPending = false;
    let nudgeTimer = 0;

    const tryPlay = (fromGesture = false) => {
      if (stopped) return;
      bindInlineVideo(video);
      if (!fromGesture && playPending) return;
      if (!video.paused && video.currentTime > 0.05) return;

      playPending = true;
      const pending = video.play();
      if (!pending) {
        playPending = false;
        return;
      }

      void pending
        .then(() => {
          playPending = false;
          if (stopped || nudgeTimer || video.paused) return;
          // Cold mobile loads often decode frame 0 and then never advance.
          nudgeTimer = window.setTimeout(() => {
            nudgeTimer = 0;
            if (stopped || video.paused || video.currentTime > 0.05) return;
            try {
              video.currentTime = 0.05;
            } catch {
              // Seek throws until metadata is available.
            }
            void video.play().catch(() => {});
          }, 400);
        })
        .catch(() => {
          playPending = false;
        });
    };

    tryPlayRef.current = () => tryPlay(true);

    const onEnded = () => {
      if (stopped) return;
      try {
        video.currentTime = 0;
      } catch {
        // Ignore seek before metadata.
      }
      tryPlay(true);
    };

    const onLoadedData = () => tryPlay();
    const onCanPlay = () => tryPlay();
    const onCanPlayThrough = () => tryPlay();

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.addEventListener("ended", onEnded);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const onGesture = () => tryPlay(true);

    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pageshow", onGesture);
    window.addEventListener("pointerdown", onGesture, { passive: true });

    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
      video.load();
    }
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      tryPlay();
    }

    const retryId = window.setInterval(() => tryPlay(), 700);
    const stopRetryId = window.setTimeout(() => {
      window.clearInterval(retryId);
    }, 15000);

    return () => {
      stopped = true;
      tryPlayRef.current = () => {};
      window.clearInterval(retryId);
      window.clearTimeout(stopRetryId);
      if (nudgeTimer) window.clearTimeout(nudgeTimer);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onGesture);
      window.removeEventListener("pointerdown", onGesture);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (skipCurtain || isOpen) return;

    const onIntent = () => open();
    window.addEventListener("wheel", onIntent, { passive: true });
    window.addEventListener("touchmove", onIntent, { passive: true });

    return () => {
      window.removeEventListener("wheel", onIntent);
      window.removeEventListener("touchmove", onIntent);
    };
  }, [isOpen, open, skipCurtain]);

  useEffect(() => {
    if (skipCurtain || isOpen) return;
    const id = window.setTimeout(open, CURTAIN_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [isOpen, open, skipCurtain]);

  useEffect(() => {
    if (skipCurtain) return;

    const lenis = scroll?.lenis;
    if (!isOpen) {
      document.documentElement.classList.add("hero-curtain-locked");
      lenis?.stop();
      pinHero();
      return () => {
        document.documentElement.classList.remove("hero-curtain-locked");
        lenis?.start();
      };
    }

    document.documentElement.classList.add("hero-curtain-locked");
    lenis?.stop();
    pinHero();
    const id = window.setTimeout(() => {
      document.documentElement.classList.remove("hero-curtain-locked");
      lenis?.start();
      pinHero();
      window.requestAnimationFrame(() => {
        pinHero();
        holdHeroRef.current = false;
      });
    }, CURTAIN_SEQUENCE_MS);

    return () => {
      window.clearTimeout(id);
      document.documentElement.classList.remove("hero-curtain-locked");
      lenis?.start();
    };
  }, [isOpen, pinHero, skipCurtain, scroll?.lenis]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={cn(
        "relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6",
        isOpen && "hero-revealed",
      )}
      aria-labelledby="hero-title"
    >
      <audio
        ref={audioRef}
        src="/assets/sundari-kannal-bgm.mp3"
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {isOpen ? (
        <button
          type="button"
          onClick={toggleMusic}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause music" : "Play music"}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-[max(1.25rem,env(safe-area-inset-left))] z-[75] inline-flex items-center gap-2 rounded-full border border-invite-ivory-gold/50 bg-invite-ivory/90 px-4 py-2 font-label text-[0.68rem] font-medium tracking-[0.22em] text-invite-royal-purple uppercase shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
        >
          <MusicMark playing={isPlaying} />
          {isPlaying ? "Pause" : "Play"}
        </button>
      ) : null}

      {curtainMounted ? (
        <HeroCurtain
          isOpen={isOpen}
          onOpen={open}
          onExited={() => setCurtainMounted(false)}
        />
      ) : null}

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <video
          ref={setVideoNode}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="absolute inset-0 bg-invite-ivory/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-invite-rose-blush/5 via-transparent to-invite-champagne/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-invite-ivory/6 via-transparent to-invite-ivory/6" />
        <motion.div
          className="absolute inset-0 animate-reveal-glow opacity-20"
          style={{
            y: reduceMotion ? undefined : glowY,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(11,58,106,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-md text-center"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        {...(!isOpen ? { inert: true } : {})}
      >
        <p className="hero-enter hero-enter-delay-1 royal-name-glow font-accent text-4xl leading-[1.7] text-white sm:text-5xl">
          With immense joy, we invite you to join us as we celebrate our wedding and the beginning of our beautiful journey together.
        </p>

        <div className="hero-enter hero-enter-delay-2 my-5 sm:my-6">
          <DecorativeBorder className="text-white drop-shadow-[0_1px_2px_rgba(62,36,28,0.75)]" />
        </div>

        <h1
          id="hero-title"
          className="hero-enter hero-enter-delay-3 relative flex flex-col items-center gap-2"
        >
          {reduceMotion ? null : <NameSparks />}
          <span className="royal-name-glow font-accent text-6xl leading-tight text-white sm:text-7xl lg:text-8xl">
            {EVENT.bride}
          </span>
          <span className="my-1 flex items-center gap-3">
            <span className="h-[2px] w-10 rounded-full bg-white shadow-[0_1px_2px_rgba(62,36,28,0.65)]" />
            <AmpersandMedallion />
            <span className="h-[2px] w-10 rounded-full bg-white shadow-[0_1px_2px_rgba(62,36,28,0.65)]" />
          </span>
          <span
            id="hero-groom"
            className="royal-name-glow font-accent text-6xl leading-tight text-white sm:text-7xl lg:text-8xl"
          >
            {EVENT.groom}
          </span>
        </h1>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: isOpen && !skipCurtain ? 2.4 : 0, duration: 0.8 }}
        aria-hidden
      >
        <div className="h-8 w-px bg-gradient-to-b from-invite-ivory-gold/70 to-transparent" />
      </motion.div>
    </section>
  );
}
