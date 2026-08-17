"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type OverlayTone = "cream" | "blush" | "warm" | "deep";

const overlayStyles: Record<OverlayTone, string> = {
  cream:
    "bg-gradient-to-b from-invite-cream/96 via-invite-cream/93 to-invite-cream/96",
  blush:
    "bg-gradient-to-b from-invite-cream/95 via-invite-cream/92 to-invite-blush/90",
  warm: "bg-gradient-to-b from-invite-cream/95 via-invite-cream/91 to-invite-cream/95",
  deep: "bg-gradient-to-b from-invite-cream/96 via-invite-cream/93 to-invite-cream/96",
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

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative overflow-hidden section-padding", className)}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          className="absolute -inset-y-[12%] inset-x-0"
          style={reduceMotion ? undefined : { y, scale }}
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

      <div className="relative z-10">{children}</div>
    </section>
  );
}
