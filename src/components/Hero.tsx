"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { DecorativeBorder } from "@/components/DecorativeBorder";
import { EVENT } from "@/lib/event";
import { PALACE_IMAGES } from "@/lib/palace-assets";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
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
        <motion.div
          className="absolute -inset-y-[10%] inset-x-0"
          style={
            reduceMotion
              ? undefined
              : { y: backgroundY, scale: backgroundScale }
          }
        >
          <Image
            src={PALACE_IMAGES.hero}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-invite-ivory/88 via-invite-rose-blush/75 to-invite-ivory/92" />
        <div className="absolute inset-0 bg-gradient-to-r from-invite-ivory/30 via-transparent to-invite-ivory/30" />
        <div className="palace-vignette absolute inset-0" />

        <div
          className="absolute inset-0 animate-reveal-glow opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(184,51,106,0.22) 0%, transparent 70%)",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-md text-center"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={staggerContainer}
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <motion.div variants={fadeUp}>
          <Badge variant="gold" className="mb-6">
            {EVENT.blessing}
          </Badge>
        </motion.div>

        <motion.div
          className="relative mx-auto mb-8 h-32 w-32 sm:h-36 sm:w-36"
          variants={fadeUp}
        >
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-invite-champagne/70 to-invite-royal-pink/25 blur-md" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-invite-ivory-gold bg-invite-ivory shadow-lg shadow-invite-royal-pink/10">
            <Image
              src="/assets/murugan.png"
              alt="Lord Murugan with peacock — Murugan Thunai"
              fill
              className="object-cover object-center"
              sizes="144px"
              priority
            />
          </div>
        </motion.div>

        <motion.p
          className="font-body text-xs font-medium tracking-[0.25em] text-invite-gray uppercase"
          variants={fadeUp}
        >
          You are cordially invited to our
        </motion.p>

        <motion.h1
          id="hero-title"
          className="royal-text-glow mt-3 font-display text-5xl font-light tracking-wide text-invite-royal-purple sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "0.05em" }}
          variants={fadeUp}
        >
          {EVENT.title}
        </motion.h1>

        <motion.div variants={fadeUp} className="my-6">
          <DecorativeBorder />
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-2"
          variants={fadeUp}
        >
          <span className="royal-name-glow font-accent text-6xl leading-none text-invite-royal-purple sm:text-7xl lg:text-8xl">
            {EVENT.bride}
          </span>
          <div className="my-1 flex items-center gap-3">
            <div className="gold-divider w-8" />
            <span
              className="font-display text-xl font-light tracking-widest text-invite-royal-pink"
              aria-hidden
            >
              &
            </span>
            <div className="gold-divider w-8" />
          </div>
          <span className="royal-name-glow font-accent text-6xl leading-none text-invite-royal-purple sm:text-7xl lg:text-8xl">
            {EVENT.groom}
          </span>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10">
          <a
            href="#details"
            className="inline-flex items-center gap-2 rounded-full border border-invite-ivory-gold/50 bg-invite-ivory/90 px-6 py-2.5 font-body text-sm text-invite-royal-purple shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
          >
            View Details
            <span className="animate-float-soft" aria-hidden>
              ↓
            </span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
      >
        <div className="h-8 w-px bg-gradient-to-b from-invite-ivory-gold/70 to-transparent" />
      </motion.div>
    </section>
  );
}
