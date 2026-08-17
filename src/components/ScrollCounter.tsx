"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type ScrollCounterProps = {
  value: number;
  duration?: number;
  padStart?: number;
  className?: string;
};

export function ScrollCounter({
  value,
  duration = 1.1,
  padStart = 2,
  className,
}: ScrollCounterProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  const liveValue = useRef(value);
  const [displayed, setDisplayed] = useState(reduceMotion ? value : 0);

  liveValue.current = value;

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(value);
      return;
    }
    if (hasAnimated.current) setDisplayed(value);
  }, [value, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const target = liveValue.current;

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / (duration * 1000));
          const eased = 1 - (1 - t) ** 3;
          setDisplayed(Math.round(eased * target));
          if (t < 1) {
            frame = requestAnimationFrame(tick);
          }
        };

        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {String(displayed).padStart(padStart, "0")}
    </span>
  );
}
