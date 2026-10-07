"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
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
        "mx-auto h-10 w-full max-w-xs text-white drop-shadow-[0_1px_2px_rgba(6,30,58,0.75)] sm:h-12 sm:max-w-md",
        flip && "rotate-180",
        className,
      )}
      fill="none"
      aria-hidden
    >
      <path
        d="M8 18 H118"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M202 18 H312"
        stroke="currentColor"
        strokeWidth="2.75"
        strokeLinecap="round"
      />
      <path
        d="M116 18 L124 12 L132 18 L124 24 Z"
        fill="currentColor"
      />
      <path
        d="M188 18 L196 12 L204 18 L196 24 Z"
        fill="currentColor"
      />
      <g className="lotus-bloom">
        <path
          d="M160 7 C152 14 148 17 148 21 C148 25.4 153.4 28.5 160 28.5 C166.6 28.5 172 25.4 172 21 C172 17 168 14 160 7 Z"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinejoin="round"
        />
        <path
          d="M138 18 C146 11 152 14 160 18 C168 22 174 25 182 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M138 18 C146 25 152 22 160 18 C168 14 174 11 182 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="160" cy="19.5" r="3.2" fill="currentColor" />
      </g>
    </svg>
  );

  if (reduceMotion) return content;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={fadeIn}
    >
      {content}
    </motion.div>
  );
}

export function AmpersandMedallion({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-14 w-14 items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 44 44"
        className="absolute inset-0 text-white drop-shadow-[0_1px_2px_rgba(6,30,58,0.7)]"
        fill="none"
        aria-hidden
      >
        <circle
          cx="22"
          cy="22"
          r="18"
          stroke="currentColor"
          strokeWidth="2.25"
        />
        <circle
          cx="22"
          cy="22"
          r="14.6"
          stroke="currentColor"
          strokeWidth="1.35"
        />
      </svg>
      <span className="font-monogram text-[2rem] font-semibold leading-none text-white [text-shadow:0_1px_3px_rgba(6,30,58,0.75)]">
        &
      </span>
    </span>
  );
}
