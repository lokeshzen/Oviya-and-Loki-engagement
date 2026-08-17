"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, letterReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ScrollTypographyProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  id?: string;
};

export function ScrollTypography({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  id,
}: ScrollTypographyProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={className} aria-label={text}>
      <motion.span
        className="inline"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px", amount: 0.4 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.028,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-block whitespace-nowrap"
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                aria-hidden
                className="inline-block will-change-transform"
                variants={letterReveal}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

export function ScrollTypographyLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}
