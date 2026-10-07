"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { getPetalConfig } from "@/lib/petal-physics";

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

const TASSEL_Y = ["18%", "34%", "50%", "66%", "82%"] as const;

const ROSE_COLORS = ["#E8A0A8", "#C45C6A", "#F3E6C4", "#D4896A", "#C9A227"] as const;
const CURTAIN_PETAL_COUNT = 24;
const FALL_SECONDS = 6.4;

type HeroCurtainProps = {
  isOpen: boolean;
  onOpen: () => void;
  onExited: () => void;
};

export function HeroCurtain({ isOpen, onOpen, onExited }: HeroCurtainProps) {
  return (
    <div
      className={`hero-curtain${isOpen ? " pointer-events-none" : ""}`}
      onClick={onOpen}
    >
      <motion.div
        className="hero-curtain-panel hero-curtain-panel-left"
        aria-hidden
        initial={false}
        animate={{ x: isOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.9, delay: 0.2, ease: CURTAIN_EASE }}
        onAnimationComplete={() => {
          if (isOpen) onExited();
        }}
      >
        <CurtainFace />
      </motion.div>

      <motion.div
        className="hero-curtain-panel hero-curtain-panel-right"
        aria-hidden
        initial={false}
        animate={{ x: isOpen ? "100%" : "0%" }}
        transition={{ duration: 0.9, delay: 0.2, ease: CURTAIN_EASE }}
      >
        <CurtainFace mirrored />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-0 z-[25] overflow-hidden"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ delay: isOpen ? 0.1 : 0, duration: 0.25 }}
        aria-hidden
      >
        <CurtainPetals />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[46%] z-20 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 px-4"
        initial={false}
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ delay: isOpen ? 0.1 : 0, duration: 0.25 }}
      >
        <GrandMonogram />
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpen();
          }}
          className="pointer-events-auto relative z-30 rounded-full border border-invite-ivory-gold/70 bg-invite-ivory/90 px-5 py-2 font-label text-[0.7rem] font-medium tracking-[0.28em] text-invite-royal-purple uppercase shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
        >
          Tap to open
        </button>
      </motion.div>
    </div>
  );
}

function CurtainFace({ mirrored = false }: { mirrored?: boolean }) {
  const floralId = `${useId().replace(/:/g, "")}-floral`;

  return (
    <div
      className="absolute inset-0"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #fefcf8 0%, #f7edd4 38%, #f3e6c4 58%, #fbf6ea 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(90deg, rgba(62,36,28,0.06) 0%, transparent 18%, transparent 78%, rgba(196,160,90,0.22) 100%)",
        }}
      />

      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern
            id={floralId}
            width="72"
            height="88"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M36 8 C28 18 28 26 36 36 C44 26 44 18 36 8 Z"
              fill="none"
              stroke="#c4a05a"
              strokeWidth="0.7"
              opacity="0.35"
            />
            <path
              d="M18 48 C12 56 12 64 18 72 C24 64 24 56 18 48 Z"
              fill="none"
              stroke="#c4a05a"
              strokeWidth="0.55"
              opacity="0.28"
            />
            <path
              d="M54 48 C48 56 48 64 54 72 C60 64 60 56 54 48 Z"
              fill="none"
              stroke="#c4a05a"
              strokeWidth="0.55"
              opacity="0.28"
            />
            <circle cx="36" cy="36" r="1.4" fill="#c4a05a" opacity="0.4" />
            <path
              d="M36 36 Q48 44 60 40"
              fill="none"
              stroke="#8e2436"
              strokeWidth="0.4"
              opacity="0.12"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${floralId})`} />
      </svg>

      <div className="absolute inset-[14px] rounded-sm border border-invite-ivory-gold/55" />
      <div className="absolute inset-[22px] rounded-sm border border-invite-ivory-gold/25" />

      <PeacockMotifs />

      <div className="absolute inset-y-[18px] right-[10px] w-px bg-gradient-to-b from-transparent via-invite-ivory-gold/70 to-transparent" />

      {TASSEL_Y.map((top) => (
        <Tassel key={top} style={{ top, right: "2px" }} />
      ))}
    </div>
  );
}

function PeacockMotifs() {
  return (
    <svg
      className="absolute inset-y-[12%] right-[18px] h-[76%] w-16 text-invite-ivory-gold"
      viewBox="0 0 64 320"
      fill="none"
      aria-hidden
    >
      {[36, 118, 200, 282].map((cy) => (
        <g key={cy} opacity="0.55">
          <path
            d="M48 0 C28 18 18 36 22 58 C26 74 40 82 48 90"
            transform={`translate(0 ${cy - 48})`}
            stroke="currentColor"
            strokeWidth="1.1"
          />
          <circle cx="26" cy={cy} r="7" stroke="currentColor" strokeWidth="0.9" />
          <circle cx="26" cy={cy} r="3.2" fill="#8e2436" opacity="0.35" />
          <circle cx="26" cy={cy} r="1.4" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

function Tassel({ style }: { style: { top: string; right: string } }) {
  return (
    <span className="absolute" style={style} aria-hidden>
      <svg width="18" height="42" viewBox="0 0 18 42" fill="none">
        <circle cx="9" cy="4" r="2.2" fill="#c4a05a" />
        <path d="M9 6 V14" stroke="#c4a05a" strokeWidth="1" />
        <path
          d="M9 14 C5 18 4 24 6 38"
          stroke="#c4a05a"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M9 14 C9 20 9 28 9 38"
          stroke="#c4a05a"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <path
          d="M9 14 C13 18 14 24 12 38"
          stroke="#c4a05a"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        <circle cx="6" cy="38" r="1.15" fill="#c4a05a" />
        <circle cx="9" cy="39" r="1.15" fill="#c4a05a" />
        <circle cx="12" cy="38" r="1.15" fill="#c4a05a" />
      </svg>
    </span>
  );
}

function GrandMonogram() {
  return (
    <div className="curtain-monogram relative w-[min(64.5vw,18rem)]" aria-hidden>
      <img
        src="/assets/ol-monogram.webp"
        alt=""
        width={560}
        height={527}
        fetchPriority="high"
        decoding="async"
        className="h-auto w-full"
      />
    </div>
  );
}

function CurtainPetals() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <>
      {Array.from({ length: CURTAIN_PETAL_COUNT }, (_, i) => (
        <CurtainRosePetal key={i} index={i} total={CURTAIN_PETAL_COUNT} />
      ))}
    </>
  );
}

function CurtainRosePetal({
  index,
  total,
}: {
  index: number;
  total: number;
}) {
  const config = getPetalConfig(index, total);
  const color = ROSE_COLORS[index % ROSE_COLORS.length];
  // The fall begins off-screen at opacity 0. Start each petal inside the
  // visible part of that cycle so the shower is moving with the curtain.
  const visibleProgress = 0.2 + (index / Math.max(total - 1, 1)) * 0.54;

  return (
    <span
      className="animate-curtain-petal-fall pointer-events-none absolute block"
      style={{
        left: `${((index * 41) % 100) + ((index * 7) % 5) - 2}%`,
        width: config.size * 1.2,
        height: config.size * 1.75,
        animationDelay: `-${(visibleProgress * FALL_SECONDS).toFixed(3)}s`,
        animationDuration: `${FALL_SECONDS}s`,
        ["--drift" as string]: `${config.drift * 0.45}px`,
      }}
    >
      <span
        className="animate-petal-sway"
        style={{
          animationDelay: `-${(index % 5) * 0.45}s`,
          animationDuration: `${config.swayDuration}s`,
        }}
      >
        <svg viewBox="0 0 20 28" width="100%" height="100%" fill="none">
          <path
            d="M10 2 C16.5 7.5 18.5 14 10 26 C1.5 14 3.5 7.5 10 2 Z"
            fill={color}
            opacity="0.82"
          />
          <path
            d="M10 5 C12.2 11 12.4 17 10 24"
            stroke="#FEFCF8"
            strokeWidth="0.55"
            opacity="0.4"
          />
        </svg>
      </span>
    </span>
  );
}
