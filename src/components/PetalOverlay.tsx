"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { RosePetals } from "@/components/RosePetals";
import { PETAL_DENSITY, type PetalDensity } from "@/lib/petal-physics";

type PetalOverlayProps = {
  density?: PetalDensity;
  burst?: boolean;
  burstDurationMs?: number;
};

export function PetalOverlay({
  density = "light",
  burst = false,
  burstDurationMs = 4000,
}: PetalOverlayProps) {
  const reduceMotion = useReducedMotion();
  const [activeDensity, setActiveDensity] = useState<PetalDensity>(density);

  useEffect(() => {
    setActiveDensity(density);
  }, [density]);

  useEffect(() => {
    if (!burst || reduceMotion) return;
    setActiveDensity("burst");
    const timer = window.setTimeout(() => setActiveDensity(density), burstDurationMs);
    return () => window.clearTimeout(timer);
  }, [burst, density, burstDurationMs, reduceMotion]);

  return <RosePetals density={activeDensity} />;
}

export { PETAL_DENSITY };
