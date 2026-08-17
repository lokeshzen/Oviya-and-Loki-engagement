"use client";

import { useEffect, useState } from "react";
import {
  motion,
  motionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { canUseScrollDrivenAnimations } from "@/lib/performance";

const idleProgress = motionValue(0);

export function ScrollDrivenElements() {
  const reduceMotion = useReducedMotion();
  const scroll = useSmoothScroll();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    if (!canUseScrollDrivenAnimations()) setFallback(true);
  }, []);
  const progress = scroll?.progress ?? idleProgress;
  const yA = useTransform(progress, [0, 1], ["-8vh", "72vh"]);
  const yB = useTransform(progress, [0, 1], ["10vh", "80vh"]);
  const xA = useTransform(progress, [0, 1], ["0vw", "12vw"]);
  const xB = useTransform(progress, [0, 1], ["0vw", "-10vw"]);
  const blobY = useTransform(progress, [0, 1], ["0vh", "55vh"]);
  const blobScale = useTransform(progress, [0, 1], [1, 1.18]);
  const wash = useTransform(progress, [0, 1], [0.12, 0.28]);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[4] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="scroll-color-wash absolute inset-0 bg-gradient-to-b from-invite-royal-pink/5 via-transparent to-invite-ivory-gold/10"
        style={fallback ? { opacity: wash } : undefined}
      />
      <motion.div
        className="scroll-orb scroll-orb-a"
        style={fallback ? { y: yA, x: xA } : undefined}
      />
      <motion.div
        className="scroll-orb scroll-orb-b"
        style={fallback ? { y: yB, x: xB } : undefined}
      />
      <motion.div
        className="scroll-blob"
        style={fallback ? { y: blobY, scale: blobScale } : undefined}
      />
    </div>
  );
}
