"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  getPetalConfig,
  PETAL_DENSITY,
  type PetalDensity,
} from "@/lib/petal-physics";

type RosePetalsProps = {
  density?: PetalDensity;
  className?: string;
};

function getResponsiveCount(density: PetalDensity, isMobile: boolean): number {
  const base = PETAL_DENSITY[density];
  if (!isMobile) return base;
  return Math.max(6, Math.floor(base * 0.55));
}

function RosePetal({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const config = getPetalConfig(index, total);

  return (
    <span
      className="animate-petal-fall pointer-events-none absolute top-0 block opacity-0 will-change-transform"
      style={{
        left: `${config.left}%`,
        width: config.size,
        height: config.size * 1.25,
        backgroundColor: config.color,
        borderRadius: "50% 0 50% 0",
        animationDelay: `${config.delay}s, ${config.delay * 0.5}s`,
        animationDuration: `${config.duration}s, ${config.swayDuration}s`,
        ["--drift" as string]: `${config.drift}px`,
        transform: `rotate(${config.rotation}deg)`,
      }}
      aria-hidden
    />
  );
}

export function RosePetals({
  density = "medium",
  className = "",
}: RosePetalsProps) {
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () =>
      setCount(getResponsiveCount(density, mq.matches));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [density]);

  if (reduceMotion || count === null) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[5] overflow-hidden ${className}`}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <RosePetal key={i} index={i} total={count} />
      ))}
    </div>
  );
}
