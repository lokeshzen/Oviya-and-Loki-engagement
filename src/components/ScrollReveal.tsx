"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  revealVariants,
  viewportOnce,
  type RevealDirection,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const variant = revealVariants[direction];

  useEffect(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (!inView) setShouldAnimate(true);
  }, [reduceMotion]);

  if (reduceMotion || !shouldAnimate) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(className, direction === "3d" && "gpu-layer")}
      style={
        direction === "3d"
          ? { transformPerspective: 900, transformOrigin: "center bottom" }
          : undefined
      }
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: {
            ...(typeof variant.visible === "object" &&
            variant.visible !== null &&
            "transition" in variant.visible
              ? variant.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  onImage = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  onImage?: boolean;
}) {
  const titleClassName = cn(
    "section-title font-display text-2xl font-medium tracking-tight sm:text-3xl",
    !onImage && "text-invite-royal-purple",
  );

  return (
    <div
      className={cn(
        "text-center",
        onImage && "section-heading-panel",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "section-eyebrow mb-2 font-label text-[0.7rem] font-semibold tracking-[0.2em] uppercase",
            !onImage && "text-invite-royal-pink",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2 className={titleClassName}>{title}</h2>
      {description && (
        <p
          className={cn(
            "section-description mx-auto mt-3 max-w-sm font-body text-lg leading-relaxed",
            !onImage && "text-invite-gray",
          )}
        >
          {description}
        </p>
      )}
      <div className="gold-divider view-scale-line mx-auto mt-5 w-16" />
    </div>
  );
}
