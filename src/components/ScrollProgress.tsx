"use client";

import { useReducedMotion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollEffects";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-invite-gold/10"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-invite-rose-gold via-invite-gold to-invite-burgundy transition-[width] duration-150 ease-out will-change-[width]"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
