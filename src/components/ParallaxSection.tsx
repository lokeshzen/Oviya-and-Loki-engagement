"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { shouldEnableHeavyEffects } from "@/lib/performance";

type OverlayTone = "cream" | "blush" | "warm" | "deep";

const overlayStyles: Record<OverlayTone, string> = {
  cream:
    "bg-gradient-to-b from-invite-ivory/96 via-invite-ivory/93 to-invite-ivory/96",
  blush:
    "bg-gradient-to-b from-invite-ivory/95 via-invite-rose-blush/88 to-invite-rose-blush/92",
  warm: "bg-gradient-to-b from-invite-ivory/95 via-invite-champagne/30 to-invite-ivory/95",
  deep: "bg-gradient-to-b from-invite-ivory/96 via-invite-rose-blush/85 to-invite-ivory/96",
};

type ParallaxSectionProps = {
  id: string;
  children: ReactNode;
  backgroundSrc: string;
  backgroundAlt: string;
  className?: string;
  overlay?: OverlayTone;
  speed?: number;
  priority?: boolean;
  decorativeBorder?: boolean;
  borderSrc?: string;
};

export function ParallaxSection({
  id,
  children,
  backgroundSrc,
  backgroundAlt,
  className,
  overlay = "cream",
  speed = 0.35,
  priority = false,
  decorativeBorder = false,
  borderSrc,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [heavy, setHeavy] = useState(false);

  useEffect(() => {
    setHeavy(!reduceMotion && shouldEnableHeavyEffects());
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${speed * 12}%`, `${speed * 12}%`],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3.2, 0, -3.2]);
  const overlayY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 8}%`, `-${speed * 8}%`],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative overflow-hidden section-padding", className)}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ perspective: heavy ? 1200 : undefined }}
      >
        <motion.div
          className="absolute -inset-y-[12%] inset-x-0 gpu-layer will-change-transform"
          style={
            reduceMotion
              ? undefined
              : heavy
                ? { y, scale, rotateX, transformPerspective: 1200 }
                : { y, scale }
          }
        >
          <Image
            src={backgroundSrc}
            alt={backgroundAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y: overlayY }}
        >
          <div className="absolute left-[18%] top-[28%] h-56 w-56 rounded-full bg-invite-royal-pink/10 blur-3xl" />
          <div className="absolute right-[12%] bottom-[18%] h-48 w-48 rounded-full bg-invite-ivory-gold/20 blur-3xl" />
        </motion.div>

        <div className={cn("absolute inset-0", overlayStyles[overlay])} />

        <div className="absolute inset-0 bg-invite-cream/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-invite-cream/30 via-transparent to-invite-cream/30" />
      </div>

      {decorativeBorder && borderSrc && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-16 opacity-40 sm:h-20"
          aria-hidden
        >
          <Image
            src={borderSrc}
            alt=""
            fill
            className="object-cover object-top"
            sizes="100vw"
            loading="lazy"
          />
        </div>
      )}

      <motion.div
        className="relative z-10"
        style={reduceMotion ? undefined : { y: contentY }}
      >
        {children}
      </motion.div>
    </section>
  );
}
