"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionTransition({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none relative z-20 -my-5 flex h-10 items-center justify-center",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "gold-divider h-px w-24 sm:w-32",
          !reduceMotion && "view-scale-line",
        )}
      />
      <span
        className={cn(
          "mx-2 h-1.5 w-1.5 rotate-45 bg-invite-ivory-gold shadow-[0_0_10px_rgba(230,215,184,0.7)]",
          !reduceMotion && "view-rotate-slow",
        )}
      />
      <div
        className={cn(
          "gold-divider h-px w-24 sm:w-32",
          !reduceMotion && "view-scale-line",
        )}
      />
    </div>
  );
}
