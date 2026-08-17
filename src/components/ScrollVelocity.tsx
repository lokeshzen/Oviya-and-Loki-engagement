"use client";

import {
  motion,
  motionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";

const idleVelocity = motionValue(0);
const idleDirection = motionValue(0);
const idleProgress = motionValue(0);

export function ScrollVelocity() {
  const reduceMotion = useReducedMotion();
  const scroll = useSmoothScroll();
  const velocity = scroll?.velocity ?? idleVelocity;
  const direction = scroll?.direction ?? idleDirection;
  const progress = scroll?.progress ?? idleProgress;

  const absVelocity = useTransform(velocity, (value) =>
    Math.min(0.32, Math.abs(value) / 36),
  );
  const topOpacity = useTransform(
    [absVelocity, direction],
    (latest: number[]) => (latest[1] >= 0 ? 0 : latest[0] ?? 0),
  );
  const bottomOpacity = useTransform(
    [absVelocity, direction],
    (latest: number[]) => (latest[1] <= 0 ? 0 : latest[0] ?? 0),
  );
  const ctaOpacity = useTransform(progress, [0.08, 0.18, 0.78, 0.9], [0, 1, 1, 0]);
  const ctaY = useTransform(progress, [0, 1], [10, -12]);
  const ctaEvents = useTransform(ctaOpacity, (value) =>
    value > 0.2 ? "auto" : "none",
  );

  if (reduceMotion) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-24 bg-gradient-to-b from-invite-royal-pink/20 to-transparent"
        style={{ opacity: topOpacity }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[45] h-24 bg-gradient-to-t from-invite-ivory-gold/25 to-transparent"
        style={{ opacity: bottomOpacity }}
        aria-hidden
      />
      <motion.a
        href="#rsvp"
        style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaEvents }}
        className="fixed bottom-5 left-5 z-50 rounded-full border border-invite-ivory-gold/60 bg-invite-royal-pink px-4 py-2 font-body text-xs tracking-[0.16em] text-white uppercase shadow-lg shadow-invite-royal-pink/20 backdrop-blur-sm transition hover:bg-invite-royal-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
      >
        RSVP
      </motion.a>
    </>
  );
}
