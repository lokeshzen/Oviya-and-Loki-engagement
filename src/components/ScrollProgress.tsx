"use client";

import {
  motion,
  motionValue,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { useSectionMarks } from "@/hooks/useScrollEffects";
import { cn } from "@/lib/utils";

const idleVelocity = motionValue(0);
const idleProgress = motionValue(0);

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const scroll = useSmoothScroll();
  const marks = useSectionMarks();
  const progress = scroll?.progress ?? idleProgress;
  const glow = useTransform(scroll?.velocity ?? idleVelocity, (value) =>
    Math.min(0.55, Math.abs(value) / 28),
  );
  const shadow = useMotionTemplate`0 0 14px rgba(184, 51, 106, ${glow})`;

  if (reduceMotion) return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60]"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      <div className="relative h-[3px] bg-invite-champagne/40">
        <motion.div
          className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-invite-royal-pink via-invite-ivory-gold to-invite-royal-purple will-change-transform"
          style={{ scaleX: progress, boxShadow: shadow }}
        />

        {marks.map((mark) => (
          <button
            key={mark.id}
            type="button"
            className="absolute top-0 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center"
            style={{ left: `${mark.at * 100}%` }}
            onClick={() => scroll?.scrollTo(`#${mark.id}`)}
            aria-label={`Jump to ${mark.label}`}
          >
            <span
              className={cn(
                "block h-1.5 w-1.5 rounded-full border border-invite-ivory bg-invite-ivory-gold shadow-sm transition-transform",
                "hover:scale-125 hover:bg-invite-royal-pink",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
