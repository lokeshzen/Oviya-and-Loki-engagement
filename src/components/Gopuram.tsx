import { useId } from "react";
import { cn } from "@/lib/utils";

type GopuramProps = {
  className?: string;
};

const CREAM = "#E8C574";
const CREAM_LIGHT = "#F6E3B4";
const TEAL = "#1A7A86";
const TEAL_DEEP = "#0D4F5C";
const GOLD = "#E6C04A";
const GOLD_DEEP = "#C4A05A";
const ROSE = "#E07A8A";
const ROSE_DEEP = "#C45C6A";
const LEAF = "#2D6B3A";
const LEAF_LIT = "#4A9A4A";
const SKIN = "#F3D5B8";

function Kalasam({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="10" rx="3.2" ry="2" fill={GOLD_DEEP} />
      <path
        d="M0 -8 C-4 0 -5 6 -3 10 C-1 13 1 13 3 10 C5 6 4 0 0 -8 Z"
        fill={GOLD}
      />
      <ellipse cx="0" cy="2" rx="2.4" ry="1.3" fill={CREAM_LIGHT} opacity="0.7" />
    </g>
  );
}

function Deity({
  x,
  y,
  h = 20,
  tone = "gold",
}: {
  x: number;
  y: number;
  h?: number;
  tone?: "gold" | "coral" | "teal";
}) {
  const fill = tone === "gold" ? GOLD : tone === "coral" ? "#D4786A" : "#5B9AA8";
  const s = h / 22;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="3.2" r="2.3" fill={SKIN} />
      <path d="M-1.2 1.6 H1.2 L1.6 -0.4 H-1.6 Z" fill={GOLD} />
      <path d="M0 6 C-4.2 8 -5.2 14 -3.8 20 H3.8 C5.2 14 4.2 8 0 6 Z" fill={fill} />
      <path d="M-4.4 10 L-7.5 16 M4.4 10 L7.5 16" stroke={fill} strokeWidth="1.35" strokeLinecap="round" />
    </g>
  );
}

function MiniVimana({
  x,
  y,
  w = 18,
  h = 24,
  cream,
  gold,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  cream: string;
  gold: string;
}) {
  const mid = x + w / 2;
  return (
    <g>
      <path
        d={`M${x} ${y + h} L${x + w * 0.12} ${y + 9} L${mid} ${y} L${x + w * 0.88} ${y + 9} L${x + w} ${y + h} Z`}
        fill={cream}
      />
      <path
        d={`M${x + w * 0.22} ${y + h} L${x + w * 0.28} ${y + 12} H${x + w * 0.72} L${x + w * 0.78} ${y + h} Z`}
        fill={TEAL}
        opacity="0.55"
      />
      <Kalasam x={mid} y={y - 2} s={0.55} />
      <rect x={mid - 2.2} y={y + h - 8} width="4.4" height="8" rx="0.8" fill={gold} opacity="0.35" />
    </g>
  );
}

function Flower({ x, y, r = 3.2, fill = ROSE }: { x: number; y: number; r?: number; fill?: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={r} ry={r * 0.72} fill={fill} />
      <circle cx={x} cy={y} r={r * 0.28} fill={GOLD} />
    </g>
  );
}

function Window({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="1.2" fill={TEAL_DEEP} />;
}

export function Gopuram({ className }: GopuramProps) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 240 560"
      preserveAspectRatio="xMaxYMid meet"
      className={cn("h-full w-auto", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B9D7F0" />
          <stop offset="55%" stopColor="#D4E8F7" />
          <stop offset="100%" stopColor="#EAF4FB" />
        </linearGradient>
        <linearGradient id={`${uid}-cream`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C9963E" />
          <stop offset="42%" stopColor={CREAM} />
          <stop offset="100%" stopColor={CREAM_LIGHT} />
        </linearGradient>
        <linearGradient id={`${uid}-cream-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CREAM_LIGHT} />
          <stop offset="100%" stopColor="#C9963E" />
        </linearGradient>
        <linearGradient id={`${uid}-teal`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A9AAA" />
          <stop offset="100%" stopColor={TEAL_DEEP} />
        </linearGradient>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5E08A" />
          <stop offset="100%" stopColor={GOLD_DEEP} />
        </linearGradient>
        <linearGradient id={`${uid}-stone`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5C6774" />
          <stop offset="55%" stopColor="#8B95A3" />
          <stop offset="100%" stopColor="#C5CBD3" />
        </linearGradient>
        <linearGradient id={`${uid}-stone-v`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8B0BA" />
          <stop offset="100%" stopColor="#5C6774" />
        </linearGradient>
        <linearGradient id={`${uid}-interior`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A3A5C" />
          <stop offset="70%" stopColor="#2A4A6A" />
          <stop offset="100%" stopColor="#F3E6C4" />
        </linearGradient>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F3E6C4" />
          <stop offset="100%" stopColor="#D9C48A" />
        </linearGradient>
      </defs>

      <rect width="240" height="560" fill={`url(#${uid}-sky)`} />

      <g opacity="0.9">
        <path d="M6 318 C18 250 28 220 38 318 Z" fill={LEAF} />
        <path d="M22 312 C34 238 48 210 52 318 Z" fill={LEAF_LIT} />
        <path d="M40 318 C50 255 62 228 68 318 Z" fill={LEAF} />
      </g>

      {/* Tala 1 */}
      <path fill={`url(#${uid}-cream)`} d="M198 40 L240 40 L240 74 H190 Z" />
      <path fill={`url(#${uid}-teal)`} d="M204 48 H240 V68 H196 Z" />
      <path fill={`url(#${uid}-gold)`} d="M196 38 H240 L238 44 H198 Z" />
      <Window x={228} y={50} w={12} h={14} />
      <Deity x={214} y={49} h={16} />
      <Kalasam x={206} y={32} s={0.72} />
      <Kalasam x={218} y={28} s={0.9} />
      <Kalasam x={230} y={32} s={0.72} />
      <Kalasam x={240} y={30} s={0.8} />

      {/* Tala 2 */}
      <path fill={`url(#${uid}-cream)`} d="M190 74 L240 74 L240 112 H176 Z" />
      <path fill={`url(#${uid}-teal)`} d="M186 82 H240 V104 H180 Z" />
      <path fill={`url(#${uid}-gold)`} d="M176 72 H240 L238 78 H178 Z" />
      <MiniVimana x={178} y={80} w={16} h={22} cream={CREAM} gold={GOLD} />
      <Deity x={204} y={84} h={18} tone="coral" />
      <Window x={226} y={86} w={14} h={16} />

      {/* Tala 3 */}
      <path fill={`url(#${uid}-cream)`} d="M176 112 L240 112 L240 156 H160 Z" />
      <path fill={`url(#${uid}-teal)`} d="M170 122 H240 V148 H164 Z" />
      <path fill={`url(#${uid}-gold)`} d="M160 110 H240 L238 116 H162 Z" />
      <MiniVimana x={162} y={118} w={18} h={26} cream={CREAM} gold={GOLD} />
      <Deity x={192} y={124} h={20} />
      <Deity x={212} y={124} h={20} tone="teal" />
      <Window x={226} y={126} w={14} h={18} />

      {/* Tala 4 */}
      <path fill={`url(#${uid}-cream)`} d="M160 156 L240 156 L240 210 H140 Z" />
      <path fill={`url(#${uid}-teal)`} d="M150 168 H240 V200 H144 Z" />
      <path fill={`url(#${uid}-gold)`} d="M140 154 H240 L238 162 H142 Z" />
      <MiniVimana x={142} y={164} w={20} h={30} cream={CREAM} gold={GOLD} />
      <Deity x={176} y={172} h={22} tone="coral" />
      <Deity x={200} y={172} h={22} />
      <Window x={224} y={174} w={16} h={20} />
      <Flower x={168} y={198} r={3} />
      <Flower x={188} y={200} r={2.6} fill={ROSE_DEEP} />

      {/* Tala 5 */}
      <path fill={`url(#${uid}-cream)`} d="M140 210 L240 210 L240 276 H114 Z" />
      <path fill={`url(#${uid}-teal)`} d="M126 224 H240 V264 H120 Z" />
      <path fill={`url(#${uid}-gold)`} d="M114 208 H240 L238 216 H116 Z" />
      <MiniVimana x={116} y={218} w={24} h={36} cream={CREAM} gold={GOLD} />
      <Deity x={156} y={230} h={26} />
      <Deity x={182} y={230} h={26} tone="coral" />
      <Deity x={208} y={230} h={26} tone="teal" />
      <Window x={224} y={232} w={16} h={24} />
      <Flower x={150} y={258} r={3.4} />
      <Flower x={174} y={262} r={3} fill={ROSE_DEEP} />
      <Flower x={198} y={258} r={3.2} />

      {/* Tala 6 */}
      <path fill={`url(#${uid}-cream)`} d="M114 276 L240 276 L240 348 H84 Z" />
      <path fill={`url(#${uid}-teal)`} d="M98 292 H240 V336 H92 Z" />
      <path fill={`url(#${uid}-gold)`} d="M84 274 H240 L238 284 H88 Z" />
      <MiniVimana x={86} y={286} w={28} h={42} cream={CREAM} gold={GOLD} />
      <Deity x={136} y={300} h={30} tone="coral" />
      <Deity x={168} y={300} h={30} />
      <Deity x={200} y={300} h={30} tone="teal" />
      <Window x={222} y={302} w={18} h={26} />
      <path
        d="M120 288 Q160 312 200 292"
        fill="none"
        stroke="#6B4A1A"
        strokeWidth="1.3"
      />
      <Flower x={128} y={298} r={3.6} />
      <Flower x={148} y={306} r={4} fill={ROSE_DEEP} />
      <Flower x={170} y={304} r={3.4} />
      <Flower x={192} y={296} r={3.8} />

      {/* Cream side wall of the prakara */}
      <path fill={`url(#${uid}-cream-v)`} d="M0 360 H156 V548 H0 Z" />
      <rect x="18" y="400" width="36" height="48" rx="3" fill={TEAL} opacity="0.35" />
      <Deity x={36} y={408} h={22} />

      {/* Grey mahadwara */}
      <path fill={`url(#${uid}-stone-v)`} d="M132 348 H240 V388 H132 Z" />
      <path fill={`url(#${uid}-stone)`} d="M132 348 H176 V548 H132 Z" />
      <path
        fill={`url(#${uid}-interior)`}
        d="M176 388 H240 V548 H176 Z"
      />
      <path
        fill="#1A3A5C"
        d="M176 388 H240 V410 Q210 398 176 410 Z"
        opacity="0.85"
      />
      {/* Far shrine, centered on the seam */}
      <path fill={CREAM} d="M214 470 L240 448 L240 520 H214 Z" />
      <rect x="222" y="478" width="18" height="10" fill={TEAL} />
      <rect x="222" y="494" width="18" height="8" fill={TEAL_DEEP} />
      <Kalasam x={240} y={444} s={0.7} />
      <ellipse cx="198" cy="430" rx="4" ry="7" fill={GOLD} />
      <line x1="198" y1="388" x2="198" y2="424" stroke={GOLD_DEEP} strokeWidth="1.1" />
      <ellipse cx="228" cy="426" rx="3.2" ry="5.5" fill={GOLD} />
      <line x1="228" y1="388" x2="228" y2="421" stroke={GOLD_DEEP} strokeWidth="1" />

      {/* Lintel carving */}
      <rect x="138" y="352" width="96" height="8" rx="1" fill={`url(#${uid}-gold)`} opacity="0.55" />
      <rect x="140" y="364" width="30" height="18" rx="2" fill="#6A7380" />

      {/* Threshold */}
      <path fill={`url(#${uid}-ground)`} d="M0 544 H240 V560 H0 Z" />
      <ellipse cx="240" cy="548" rx="64" ry="8" fill="#EDE0B8" />

      {/* Banana and bushes */}
      <path d="M8 548 C4 500 22 470 34 508 C40 478 62 468 58 520 C72 490 86 500 78 548 Z" fill={LEAF} />
      <path d="M22 548 C18 510 36 486 44 518 C52 492 70 488 64 548 Z" fill={LEAF_LIT} />
      <path d="M70 548 C66 520 82 500 90 528 C98 508 112 512 106 548 Z" fill={LEAF} />
      <Flower x={16} y={542} r={2.4} />
      <Flower x={28} y={546} r={2.1} fill={CREAM_LIGHT} />
      <Flower x={44} y={544} r={2.6} fill={ROSE_DEEP} />
      <Flower x={84} y={546} r={2.2} />

      {/* Standing kuthuvilakku */}
      <g transform="translate(108 430)">
        <path d="M0 -8 C-4 4 -6 12 -4 18 C-2 22 2 22 4 18 C6 12 4 4 0 -8 Z" fill={GOLD} />
        <path d="M0 2 C-1.6 8 -2 12 0 14 C2 12 1.6 8 0 2 Z" fill={CREAM_LIGHT} />
        <path d="M-10 22 H10 L7 28 H-7 Z" fill={GOLD_DEEP} />
        <rect x="-1.6" y="28" width="3.2" height="22" fill={GOLD} />
        <ellipse cx="0" cy="36" rx="5" ry="1.6" fill={GOLD_DEEP} />
        <ellipse cx="0" cy="44" rx="4" ry="1.3" fill={GOLD_DEEP} />
        <path d="M0 50 C-10 50 -16 60 -18 70 C-10 78 10 78 18 70 C16 60 10 50 0 50 Z" fill={GOLD} />
      </g>

      {/* Entrance toran */}
      <path
        d="M176 388 Q198 412 220 390 Q232 404 240 392"
        fill="none"
        stroke="#6B4A1A"
        strokeWidth="1.4"
      />
      <Flower x={182} y={396} r={3.4} />
      <Flower x={196} y={408} r={4} fill={ROSE_DEEP} />
      <Flower x={210} y={398} r={3.6} />
      <Flower x={224} y={402} r={3.2} />
      <Flower x={236} y={394} r={3} fill={ROSE_DEEP} />
      <Flower x={170} y={420} r={2.8} />
      <Flower x={168} y={444} r={2.6} fill={ROSE_DEEP} />
      <Flower x={170} y={468} r={2.8} />
    </svg>
  );
}
