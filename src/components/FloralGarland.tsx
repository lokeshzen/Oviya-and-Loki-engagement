"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SEGMENT_HEIGHT = 72;

const BLOOMS: { x: number; y: number; scale: number }[] = [
  { x: 18, y: 6, scale: 1.22 },
  { x: 28, y: 12, scale: 1.08 },
  { x: 17, y: 18, scale: 1.26 },
  { x: 29, y: 25, scale: 1.12 },
  { x: 18, y: 32, scale: 1.2 },
  { x: 27, y: 39, scale: 1.14 },
  { x: 17, y: 46, scale: 1.24 },
  { x: 29, y: 53, scale: 1.1 },
  { x: 18, y: 60, scale: 1.22 },
  { x: 27, y: 67, scale: 1.08 },
];

type FloralGarlandProps = {
  side: "left" | "right";
  className?: string;
};

export function FloralGarland({ side, className }: FloralGarlandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(4);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const height = el.getBoundingClientRect().height;
      setCount(Math.max(1, Math.ceil(height / SEGMENT_HEIGHT)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-y-0 z-[1] w-12 overflow-hidden",
        side === "left" ? "left-0" : "right-0",
        className,
      )}
      aria-hidden
    >
      <div
        className="origin-center"
        style={side === "right" ? { transform: "scaleX(-1)" } : undefined}
      >
        <div className="garland-strand flex flex-col">
          {Array.from({ length: count }, (_, index) => (
            <GarlandSegment key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GarlandSegment({ index }: { index: number }) {
  const budOnOuter = index % 2 === 0;

  return (
    <svg
      viewBox="0 0 46 72"
      width="48"
      height={SEGMENT_HEIGHT}
      className="block h-[72px] w-12 shrink-0"
      fill="none"
    >
      <path
        className="garland-vine"
        d="M22 0 C18 18 28 18 22 36 C17 54 28 54 21 72"
        stroke="#3f6b32"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {BLOOMS.map((bloom, bloomIndex) => (
        <Jasmine
          key={bloom.y}
          x={bloom.x}
          y={bloom.y}
          scale={bloom.scale}
          delay={`${((index * 3 + bloomIndex) % 8) * 0.28}s`}
        />
      ))}
      <JasmineBud
        x={budOnOuter ? 8 : 10}
        y={budOnOuter ? 20 : 50}
        rotate={budOnOuter ? -28 : -18}
        delay={`${(index % 5) * 0.4}s`}
      />
    </svg>
  );
}

function Jasmine({
  x,
  y,
  scale,
  delay,
}: {
  x: number;
  y: number;
  scale: number;
  delay: string;
}) {
  return (
    <g className="garland-sway" style={{ animationDelay: delay }}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <circle r="5.1" fill="#c5d7b0" />
        {Array.from({ length: 7 }, (_, petal) => (
          <ellipse
            key={petal}
            cx="0"
            cy="-3.5"
            rx="1.45"
            ry="2.85"
            fill="#ffffff"
            stroke="#3f6b32"
            strokeWidth="0.7"
            transform={`rotate(${(360 / 7) * petal})`}
          />
        ))}
        <circle r="1.55" fill="#f3e2a8" stroke="#8a6a1e" strokeWidth="0.35" />
        <circle r="0.55" fill="#c9a227" />
      </g>
    </g>
  );
}

function JasmineBud({
  x,
  y,
  rotate,
  delay,
}: {
  x: number;
  y: number;
  rotate: number;
  delay: string;
}) {
  return (
    <g className="garland-sway" style={{ animationDelay: delay }}>
      <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
        <ellipse cx="0" cy="0" rx="1.7" ry="3.3" fill="#ffffff" stroke="#3f6b32" strokeWidth="0.55" />
        <ellipse cx="0" cy="-1.7" rx="0.85" ry="1.35" fill="#3f6b32" />
      </g>
    </g>
  );
}
