"use client";

import { motion } from "framer-motion";
import { EVENT } from "@/lib/event";

type EnvelopeProps = {
  onOpen: () => void;
};

export function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="relative mx-auto flex w-full max-w-sm cursor-pointer flex-col items-center border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-invite-gold"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, y: -40 }}
      transition={{ duration: 0.6 }}
      aria-label="Open the invitation"
    >
      <p className="mb-6 font-serif text-sm tracking-[0.25em] text-invite-burgundy/80 uppercase">
        Tap to open
      </p>

      <div className="relative w-full aspect-[4/3]">
        {/* Back flap */}
        <div className="absolute inset-x-[6%] top-[18%] bottom-[8%] rounded-b-md border border-invite-gold/50 bg-invite-cream shadow-xl" />

        {/* Side folds suggestion */}
        <div className="absolute inset-x-[6%] bottom-[8%] h-[42%] overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#f0e6d4] to-invite-cream"
            style={{
              clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
            }}
          />
        </div>

        {/* Top flap */}
        <motion.div
          className="absolute inset-x-[6%] top-[8%] h-[38%] origin-top"
          style={{
            background: "linear-gradient(180deg, #fbf6ee 0%, #f0e4ce 100%)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            borderTop: "1px solid rgba(201,162,39,0.6)",
            boxShadow: "0 8px 20px rgba(122,31,43,0.12)",
          }}
          animate={{ rotateX: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Seal */}
        <div className="absolute left-1/2 top-[42%] z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-invite-gold bg-gradient-to-br from-rose-400 to-invite-burgundy shadow-lg">
          <span className="text-2xl text-invite-cream" aria-hidden>
            ♥
          </span>
        </div>

        {/* Names peek */}
        <div className="absolute inset-x-0 bottom-[18%] z-20 text-center">
          <p className="font-script text-3xl text-invite-burgundy">
            {EVENT.bride} & {EVENT.groom}
          </p>
          <p className="mt-1 font-serif text-xs tracking-widest text-invite-burgundy/70 uppercase">
            {EVENT.title}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
