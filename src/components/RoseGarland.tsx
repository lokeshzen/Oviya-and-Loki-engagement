"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ROSE_STEP = 9;

type RoseGarlandProps = {
  side: "left" | "right";
};

export function RoseGarland({ side }: RoseGarlandProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(280);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const groom = document.getElementById("hero-groom");
    if (!anchor || !groom) return;

    const update = () => {
      const top = anchor.getBoundingClientRect().top;
      const bottom = groom.getBoundingClientRect().bottom;
      setHeight(Math.max(200, Math.round(bottom - top)));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(groom);
    observer.observe(anchor);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const count = Math.max(8, Math.floor((height - 10) / ROSE_STEP));
  const roses = Array.from({ length: count }, (_, index) => ({
    x: index % 2 === 0 ? 20 : 36,
    y: 8 + index * ROSE_STEP,
    scale: index % 2 === 0 ? 1.28 : 1.12,
  }));
  const mid = height / 2;

  return (
    <div
      ref={anchorRef}
      className={cn(
        "pointer-events-none absolute top-3 z-[1] w-14",
        side === "left" ? "left-0" : "right-0",
      )}
      style={
        side === "right"
          ? { transform: "translateX(50%) scaleX(-1)" }
          : { transform: "translateX(-50%)" }
      }
      aria-hidden
    >
      <div className="rose-hang">
        <svg
          viewBox={`0 0 56 ${height}`}
          width={56}
          height={height}
          className="block w-14"
          fill="none"
        >
          <path
            className="rose-stem"
            d={`M27 0 C22 ${mid * 0.45} 34 ${mid * 0.45} 27 ${mid} C22 ${mid * 1.55} 34 ${mid * 1.55} 27 ${height}`}
            stroke="#3f6b32"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {roses.map((rose, index) => (
            <Rose
              key={`${rose.x}-${rose.y}`}
              x={rose.x}
              y={rose.y}
              scale={rose.scale}
              delay={`${(index % 6) * 0.22}s`}
              flipLeaf={index % 2 === 1}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function Rose({
  x,
  y,
  scale,
  delay,
  flipLeaf,
}: {
  x: number;
  y: number;
  scale: number;
  delay: string;
  flipLeaf: boolean;
}) {
  return (
    <g className="rose-bloom" style={{ animationDelay: delay }}>
      <g transform={`translate(${x} ${y}) scale(${scale})`}>
        <path
          d={flipLeaf ? "M2 6 C8 2 12 8 7 12 C4 9 2 8 2 6 Z" : "M-2 6 C-8 2 -12 8 -7 12 C-4 9 -2 8 -2 6 Z"}
          fill="#3f6b32"
        />
        <ellipse cx="-4.2" cy="0.4" rx="3.5" ry="2.3" fill="#e7a8b0" transform="rotate(-32)" />
        <ellipse cx="4.2" cy="0.4" rx="3.5" ry="2.3" fill="#e7a8b0" transform="rotate(32)" />
        <ellipse cx="0" cy="-3.3" rx="2.5" ry="3.1" fill="#d56d7c" />
        <ellipse cx="-2.2" cy="2.4" rx="2.7" ry="2.1" fill="#c45366" transform="rotate(-18)" />
        <ellipse cx="2.2" cy="2.2" rx="2.7" ry="2.1" fill="#b8455c" transform="rotate(16)" />
        <circle r="2.05" fill="#9a3348" />
        <circle r="1.15" fill="#f3e0a4" />
        <circle r="0.45" fill="#c9a227" />
      </g>
    </g>
  );
}
