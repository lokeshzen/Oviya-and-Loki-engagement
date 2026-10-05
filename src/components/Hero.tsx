"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { AmpersandMedallion, DecorativeBorder } from "@/components/DecorativeBorder";
import { PeacockCrest } from "@/components/PeacockCrest";
import { EVENT } from "@/lib/event";

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
  const sectionRef = useRef<HTMLElement>(null);

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
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-invite-ivory" />
        <div className="absolute inset-0 bg-gradient-to-b from-invite-rose-blush/55 via-invite-ivory to-invite-champagne/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-invite-ivory/40 via-transparent to-invite-ivory/40" />
        <motion.div
          className="absolute inset-0 animate-reveal-glow opacity-50"
          style={{
            y: reduceMotion ? undefined : glowY,
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(11,58,106,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-md text-center"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <PeacockCrest />

        <p className="hero-enter hero-enter-delay-1 font-label text-xs font-medium tracking-[0.25em] text-invite-gray uppercase">
          You are cordially invited to our {EVENT.title}
        </p>

        <div className="hero-enter hero-enter-delay-2 my-5 sm:my-6">
          <DecorativeBorder />
        </div>

        <h1
          id="hero-title"
          className="hero-enter hero-enter-delay-3 relative flex flex-col items-center gap-2"
        >
          {reduceMotion ? null : <NameSparks />}
          <span className="royal-name-glow font-accent text-6xl leading-none text-invite-royal-purple sm:text-7xl lg:text-8xl">
            {EVENT.bride}
          </span>
          <span className="my-1 flex items-center gap-3">
            <span className="gold-divider w-8" />
            <AmpersandMedallion />
            <span className="gold-divider w-8" />
          </span>
          <span className="royal-name-glow font-accent text-6xl leading-none text-invite-royal-purple sm:text-7xl lg:text-8xl">
            {EVENT.groom}
          </span>
        </h1>

        <div className="hero-enter hero-enter-delay-4 mt-8 sm:mt-10">
          <a
            href="#details"
            className="inline-flex items-center gap-2 rounded-full border border-invite-ivory-gold/50 bg-invite-ivory/90 px-6 py-2.5 font-label text-sm text-invite-royal-purple shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
          >
            View Details
            <span className="animate-float-soft" aria-hidden>
              ↓
            </span>
          </a>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        aria-hidden
      >
        <div className="h-8 w-px bg-gradient-to-b from-invite-ivory-gold/70 to-transparent" />
      </motion.div>
    </section>
  );
}
