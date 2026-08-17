"use client";

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
  const variant = revealVariants[direction];

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
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
            "section-eyebrow mb-2 font-body text-[0.65rem] font-semibold tracking-[0.2em] uppercase",
            !onImage && "text-invite-royal-pink",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "section-title font-display text-2xl font-medium tracking-tight sm:text-3xl",
          !onImage && "text-invite-royal-purple",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "section-description mx-auto mt-3 max-w-sm font-body text-sm leading-relaxed",
            !onImage && "text-invite-gray",
          )}
        >
          {description}
        </p>
      )}
      <div className="gold-divider mx-auto mt-5 w-16" />
    </div>
  );
}
