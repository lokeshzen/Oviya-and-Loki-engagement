"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import {
  cancelFrame,
  frame,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { createLenis, scrollToTarget } from "@/lib/scroll";
import { cleanupFns } from "@/lib/performance";

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  progress: MotionValue<number>;
  velocity: MotionValue<number>;
  direction: MotionValue<number>;
  scrollTo: (target: string | HTMLElement) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(
  null,
);

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const progress = useMotionValue(0);
  const velocity = useMotionValue(0);
  const direction = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;

    const instance = createLenis();

    const onScroll = (current: Lenis) => {
      progress.set(current.progress);
      velocity.set(current.velocity);
      direction.set(current.direction);
    };

    const unbindScroll = instance.on("scroll", onScroll);

    const update = ({ timestamp }: { timestamp: number }) => {
      instance.raf(timestamp);
    };

    frame.update(update, true);
    setLenis(instance);
    instance.resize();
    onScroll(instance);

    return cleanupFns(unbindScroll, () => {
      cancelFrame(update);
      instance.destroy();
      setLenis(null);
      velocity.set(0);
      direction.set(0);
    });
  }, [reduceMotion, progress, velocity, direction]);

  const value = useMemo<SmoothScrollContextValue>(
    () => ({
      lenis,
      progress,
      velocity,
      direction,
      scrollTo: (target) => scrollToTarget(lenis, target),
    }),
    [lenis, progress, velocity, direction],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
