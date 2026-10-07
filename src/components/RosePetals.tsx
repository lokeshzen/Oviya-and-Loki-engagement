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
  return Math.max(8, Math.floor(base * 0.55));
}

function PeacockFeather({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const config = getPetalConfig(index, total);
  const eye = index % 3 === 2 ? "#C9A227" : "#0B3A6A";

  return (
    <span
      className="animate-petal-fall pointer-events-none absolute top-0 block opacity-0 will-change-transform"
      style={{
        left: `${config.left}%`,
        width: config.size,
        height: config.size * 2.1,
        animationDelay: `${config.delay}s`,
        animationDuration: `${config.duration}s`,
        ["--drift" as string]: `${config.drift}px`,
      }}
      aria-hidden
    >
      <span
        className="animate-petal-sway"
        style={{
          animationDelay: `${config.delay * 0.5}s`,
          animationDuration: `${config.swayDuration}s`,
        }}
      >
        <svg viewBox="0 0 24 52" width="100%" height="100%" fill="none">
          <ellipse cx="12" cy="30" rx="7.5" ry="20" fill={config.color} opacity="0.5" />
          <ellipse cx="12" cy="18" rx="4.4" ry="7.5" fill={eye} opacity="0.9" />
          <circle cx="12" cy="16.5" r="2.1" fill="#FEFCF8" />
          <circle cx="12" cy="16.5" r="1.1" fill="#C9A227" />
          <path
            d="M12 8.5 C12 8.5 12.4 4 12 1.5"
            stroke={config.color}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
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
        <PeacockFeather key={i} index={i} total={count} />
      ))}
    </div>
  );
}
