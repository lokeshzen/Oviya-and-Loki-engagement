"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { RoseGarland } from "@/components/RoseGarland";
import { cn } from "@/lib/utils";

type DecorativeBorderProps = {
  className?: string;
  flip?: boolean;
};

export function DecorativeBorder({ className, flip = false }: DecorativeBorderProps) {
  const reduceMotion = useReducedMotion();

  const content = (
    <svg
      viewBox="0 0 320 36"
      className={cn(
        "mx-auto h-8 w-full max-w-xs text-invite-ivory-gold sm:h-10 sm:max-w-md",
        flip && "rotate-180",
        className,
      )}
      fill="none"
      aria-hidden
    >
      <path
        d="M8 18 H118"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M202 18 H312"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M118 18 L124 14 L130 18 L124 22 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M190 18 L196 14 L202 18 L196 22 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <g className="lotus-bloom">
        <path
          d="M160 7 C152 14 148 17 148 21 C148 25.4 153.4 28.5 160 28.5 C166.6 28.5 172 25.4 172 21 C172 17 168 14 160 7 Z"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinejoin="round"
        />
        <path
          d="M138 18 C146 11 152 14 160 18 C168 22 174 25 182 18"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
        />
        <path
          d="M138 18 C146 25 152 22 160 18 C168 14 174 11 182 18"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="160" cy="19.5" r="2.1" fill="currentColor" />
      </g>
    </svg>
  );

  const artwork = (
    <div className="relative mx-auto w-full max-w-xs sm:max-w-md">
      {content}
      {flip ? null : (
        <>
          <RoseGarland side="left" />
          <RoseGarland side="right" />
        </>
      )}
    </div>
  );

  if (reduceMotion) return artwork;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={fadeIn}
    >
      {artwork}
    </motion.div>
  );
}

export function AmpersandMedallion({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-11 w-11 items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 text-invite-ivory-gold"
        fill="none"
        aria-hidden
      >
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle
          cx="22"
          cy="22"
          r="15.2"
          stroke="currentColor"
          strokeWidth="0.4"
          opacity="0.55"
        />
      </svg>
      <span className="font-accent text-[1.65rem] leading-none text-invite-royal-pink">
        &
      </span>
    </span>
  );
}
