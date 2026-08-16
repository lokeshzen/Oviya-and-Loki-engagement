"use client";

import { useMemo, type CSSProperties } from "react";

type Petal = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  drift: string;
  opacity: number;
};

export function Petals({ count = 18 }: { count?: number }) {
  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        delay: `${(i * 0.7) % 8}s`,
        duration: `${10 + (i % 7)}s`,
        size: 10 + (i % 5) * 4,
        drift: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12)}px`,
        opacity: 0.45 + (i % 4) * 0.1,
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => {
        const style = {
          left: p.left,
          width: p.size,
          height: p.size * 1.35,
          animationDelay: p.delay,
          animationDuration: p.duration,
          opacity: p.opacity,
          "--drift": p.drift,
        } as CSSProperties;

        return (
          <span
            key={p.id}
            className="animate-petal absolute top-0 rounded-[60%_40%_60%_40%] bg-gradient-to-br from-rose-300 to-rose-500 shadow-sm"
            style={style}
          />
        );
      })}
    </div>
  );
}
