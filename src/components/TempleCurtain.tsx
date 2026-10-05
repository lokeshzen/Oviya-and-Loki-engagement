"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
type TempleCurtainProps = {
  children: ReactNode;
};

export function TempleCurtain({ children }: TempleCurtainProps) {
  const reduceMotion = useReducedMotion();
  const gateRef = useRef<HTMLDivElement>(null);
  const openProgress = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: gateRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > openProgress.get()) {
      openProgress.set(latest);
    }
  });

  const leftX = useTransform(
    openProgress,
    [0, 0.08, 0.72, 1],
    ["0%", "0%", "-100%", "-100%"],
  );
  const rightX = useTransform(
    openProgress,
    [0, 0.08, 0.72, 1],
    ["0%", "0%", "100%", "100%"],
  );

  return (
    <div ref={gateRef} className="temple-curtain relative h-[170vh]">
      <div className="temple-curtain-stage sticky top-0 z-20 h-dvh overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-invite-ivory via-invite-champagne/45 to-invite-ivory"
          aria-hidden
        />

        <div className="temple-curtain-content relative z-0 flex h-full items-center justify-center overflow-y-auto px-4 py-8">
          {children}
        </div>

        <motion.div
          style={reduceMotion ? undefined : { x: leftX }}
          className="temple-curtain-panel pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 overflow-hidden"
          aria-hidden
        >
          <img
            src="/assets/temple-curtain.jpg"
            alt=""
            className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-cover object-left"
          />
        </motion.div>

        <motion.div
          style={reduceMotion ? undefined : { x: rightX }}
          className="temple-curtain-panel pointer-events-none absolute inset-y-0 right-0 z-10 w-1/2 overflow-hidden"
          aria-hidden
        >
          <img
            src="/assets/temple-curtain.jpg"
            alt=""
            className="absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-cover object-right"
          />
        </motion.div>
      </div>
    </div>
  );
}
