"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { EVENT } from "@/lib/event";
import { easeOut, fadeUp, staggerContainer } from "@/lib/animations";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
      aria-labelledby="hero-title"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,165,116,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(122,31,43,0.06) 0%, transparent 50%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-md text-center"
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp}>
          <Badge variant="gold" className="mb-6">
            {EVENT.blessing}
          </Badge>
        </motion.div>

        <motion.div
          className="relative mx-auto mb-8 h-28 w-28 sm:h-32 sm:w-32"
          variants={fadeUp}
        >
          <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-invite-gold-soft/60 to-invite-rose-gold/30 blur-md" />
          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-invite-gold/50 bg-white p-2 shadow-lg">
            <Image
              src="/assets/murugan.png"
              alt="Lord Murugan with peacock — Murugan Thunai"
              fill
              className="object-contain p-1"
              sizes="128px"
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
          className="mt-2 font-display text-4xl font-medium tracking-tight text-invite-burgundy sm:text-5xl"
          variants={fadeUp}
        >
          {EVENT.title}
        </motion.h1>

        <motion.div
          className="mx-auto my-6 flex items-center justify-center gap-3"
          variants={fadeUp}
        >
          <div className="gold-divider w-12 sm:w-16" />
          <span className="text-invite-gold" aria-hidden>
            ✦
          </span>
          <div className="gold-divider w-12 sm:w-16" />
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-1"
          variants={fadeUp}
        >
          <span className="font-accent text-5xl leading-none text-invite-burgundy sm:text-6xl">
            {EVENT.bride}
          </span>
          <span
            className="my-1 font-display text-lg text-invite-rose-gold"
            aria-hidden
          >
            &
          </span>
          <span className="font-accent text-5xl leading-none text-invite-burgundy sm:text-6xl">
            {EVENT.groom}
          </span>
        </motion.div>

        <motion.p
          className="mt-8 font-body text-sm text-invite-gray"
          variants={fadeUp}
          transition={{ delay: 0.1, duration: 0.6, ease: easeOut }}
        >
          {EVENT.dateLabel} · {EVENT.timeLabel}
          <br />
          {EVENT.venue}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <a
            href="#rsvp"
            className="inline-flex items-center gap-2 rounded-full border border-invite-gold/40 bg-white/80 px-6 py-2.5 font-body text-sm text-invite-burgundy shadow-sm transition hover:border-invite-gold hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-gold focus-visible:ring-offset-2"
          >
            RSVP Now
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-hidden
      >
        <div className="h-8 w-px bg-gradient-to-b from-invite-gold/60 to-transparent" />
      </motion.div>
    </section>
  );
}
