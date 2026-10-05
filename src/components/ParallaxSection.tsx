"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { OrnamentFrieze } from "@/components/OrnamentFrieze";
import { cn } from "@/lib/utils";

type OverlayTone = "cream" | "blush" | "warm" | "deep";

const overlayStyles: Record<OverlayTone, string> = {
  cream: "bg-invite-ivory",
  blush: "bg-gradient-to-b from-invite-ivory via-invite-rose-blush/70 to-invite-ivory",
  warm: "bg-gradient-to-b from-invite-ivory via-invite-champagne/45 to-invite-ivory",
  deep: "bg-gradient-to-b from-invite-ivory via-invite-rose-blush/55 to-invite-ivory",
};

type ParallaxSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  overlay?: OverlayTone;
  speed?: number;
  decorativeBorder?: boolean;
};

export function ParallaxSection({
  id,
  children,
  className,
  overlay = "cream",
  speed = 0.35,
  decorativeBorder = false,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const overlayY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 8}%`, `-${speed * 8}%`],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative overflow-hidden section-padding", className)}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className={cn("absolute inset-0", overlayStyles[overlay])} />
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y: overlayY }}
        >
          <div className="absolute left-[18%] top-[28%] h-56 w-56 rounded-full bg-invite-royal-pink/10 blur-3xl" />
          <div className="absolute right-[12%] bottom-[18%] h-48 w-48 rounded-full bg-invite-ivory-gold/20 blur-3xl" />
        </motion.div>
      </div>

      {decorativeBorder && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] opacity-45"
          aria-hidden
        >
          <OrnamentFrieze />
        </div>
      )}

      <motion.div
        className="relative z-10"
        style={reduceMotion ? undefined : { y: contentY }}
      >
        {children}
      </motion.div>
    </section>
  );
}
