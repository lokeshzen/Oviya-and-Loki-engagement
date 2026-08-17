"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/animations";
import { cn } from "@/lib/utils";

type ScrollImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollImageReveal({
  children,
  className,
  delay = 0,
}: ScrollImageRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: "inset(12% 12% 12% 12% round 999px)", scale: 1.12 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 999px)", scale: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 1.05, delay, ease: easeOut }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
