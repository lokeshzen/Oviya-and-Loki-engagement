"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { PALACE_IMAGES } from "@/lib/palace-assets";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

type DecorativeBorderProps = {
  className?: string;
  flip?: boolean;
};

export function DecorativeBorder({ className, flip = false }: DecorativeBorderProps) {
  const reduceMotion = useReducedMotion();

  const content = (
    <div
      className={cn(
        "relative mx-auto h-8 w-full max-w-xs opacity-70 sm:h-10 sm:max-w-md",
        flip && "rotate-180",
        className,
      )}
      aria-hidden
    >
      <Image
        src={PALACE_IMAGES.border}
        alt=""
        fill
        className="object-contain"
        sizes="(max-width: 768px) 320px, 448px"
        loading="lazy"
      />
    </div>
  );

  if (reduceMotion) return content;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      variants={fadeIn}
    >
      {content}
    </motion.div>
  );
}
