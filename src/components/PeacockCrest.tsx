import { useId } from "react";

const PIVOT = { x: 180, y: 196 };

const FEATHERS = [
  { fan: -68, breath: 2.2, reach: 1 },
  { fan: -52, breath: -2.4, reach: 1 },
  { fan: -36, breath: 2.6, reach: 1 },
  { fan: -22, breath: -2.2, reach: 1 },
  { fan: -10, breath: 2.4, reach: 1 },
  { fan: 0, breath: -2, reach: 1 },
  { fan: 10, breath: 2.4, reach: 1 },
  { fan: 22, breath: -2.2, reach: 1 },
  { fan: 36, breath: 2.6, reach: 1 },
  { fan: 52, breath: -2.4, reach: 1 },
  { fan: 68, breath: 2.2, reach: 1 },
] as const;

const HUES = {
  emerald: { band: "#1E9A6A", iris: "#0C5C48" },
  teal: { band: "#149E9A", iris: "#0C5C64" },
  sapphire: { band: "#3A78D4", iris: "#1A4C92" },
  cobalt: { band: "#5B6FE0", iris: "#2C3C96" },
  gold: { band: "#E0B83A", iris: "#8A6410" },
} as const;

function hueFor(fan: number) {
  const angle = Math.abs(fan);
  if (angle >= 57) return HUES.emerald;
  if (angle >= 40) return HUES.teal;
  if (angle >= 24) return HUES.sapphire;
  if (angle >= 10) return HUES.cobalt;
  return HUES.gold;
}

function Feather({
  fan,
  breath,
  reach,
}: (typeof FEATHERS)[number]) {
  const hue = hueFor(fan);
  return (
    <g
      className="peacock-feather-open"
      style={{
        ["--fan" as string]: `${fan}deg`,
        ["--breath" as string]: `${breath}deg`,
      }}
    >
      <g className="peacock-feather-breathe">
        <g
          transform={`translate(${PIVOT.x} ${PIVOT.y}) scale(${reach}) translate(${-PIVOT.x} ${-PIVOT.y})`}
        >
          <path
            d="M180 190 C174 160 167 122 165 84 C164 66 170 50 180 34 C180 26 180 20 180 16 C180 20 180 26 180 34 C190 50 196 66 195 84 C193 122 186 160 180 190 Z"
            fill="#0B3A6A"
          />
          <path
            d="M180 188 C186 158 193 120 195 84 C196 66 190 50 180 34 L180 188 Z"
            fill={hue.band}
            opacity="0.42"
          />
          <path
            d="M180 190 C174 160 167 122 165 84 C164 66 170 50 180 34 C180 26 180 20 180 16"
            stroke="#C9A227"
            strokeWidth="0.75"
            fill="none"
          />
          <path
            d="M180 184 L180 42"
            stroke="#C9A227"
            strokeWidth="0.4"
            opacity="0.5"
          />
          <ellipse cx="180" cy="58" rx="9.2" ry="12" fill={hue.band} />
          <ellipse cx="180" cy="58" rx="7.4" ry="9.6" fill="#C9A227" />
          <ellipse cx="180" cy="58" rx="6" ry="7.8" fill={hue.iris} />
          <ellipse cx="180" cy="57.2" rx="2.3" ry="3" fill="#F7F1DE" />
          <circle cx="178.6" cy="55.4" r="0.95" fill="#FEFCF8" />
        </g>
      </g>
    </g>
  );
}

export function PeacockCrest() {
  const rawId = useId().replace(/:/g, "");
  const plumageId = `${rawId}-plumage`;
  const breastId = `${rawId}-breast`;
  const crownId = `${rawId}-crown`;
  const headId = `${rawId}-head`;
  const neckMaskId = `${rawId}-neck`;

  return (
    <div className="peacock-crest mx-auto mb-1 w-52 sm:mb-2 sm:w-64" aria-hidden>
      <svg viewBox="0 0 360 268" className="h-auto w-full" fill="none">
        <defs>
          <linearGradient
            id={plumageId}
            x1="164"
            y1="138"
            x2="198"
            y2="234"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2C6AAD" />
            <stop offset="42%" stopColor="#0B3A6A" />
            <stop offset="100%" stopColor="#03101C" />
          </linearGradient>
          <radialGradient
            id={breastId}
            cx="170"
            cy="200"
            r="22"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#5C8BC4" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#2C6AAD" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0B3A6A" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id={headId}
            cx="173"
            cy="129"
            r="16"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#2C6AAD" />
            <stop offset="42%" stopColor="#0B3A6A" />
            <stop offset="100%" stopColor="#03101C" />
          </radialGradient>
          <radialGradient
            id={crownId}
            cx="173"
            cy="128"
            r="5"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#5C8BC4" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#2C6AAD" stopOpacity="0" />
          </radialGradient>
          <mask id={neckMaskId} maskUnits="userSpaceOnUse">
            <rect width="360" height="268" fill="white" />
            <path
              fill="black"
              d="M180 176 C158 186 148 206 158 220 C168 234 192 234 202 220 C212 206 202 186 180 176 Z"
            />
          </mask>
        </defs>
        {FEATHERS.map((feather) => (
          <Feather key={feather.fan} {...feather} />
        ))}
        <g
          stroke="#C9A227"
          strokeWidth="1.35"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M170 218 L164 252" />
          <path d="M164 252 L156 256" />
          <path d="M164 252 L164 258" />
          <path d="M164 252 L172 256" />
          <path d="M190 218 L196 252" />
          <path d="M196 252 L188 256" />
          <path d="M196 252 L196 258" />
          <path d="M196 252 L204 256" />
        </g>
        <ellipse cx="180" cy="262" rx="28" ry="2.4" fill="#061E3A" opacity="0.12" />
        <path
          fill={`url(#${plumageId})`}
          stroke="#C9A227"
          strokeWidth="1.15"
          strokeLinejoin="round"
          d="M180 176 C158 186 148 206 158 220 C168 234 192 234 202 220 C212 206 202 186 180 176 Z"
        />
        <path
          fill={`url(#${breastId})`}
          d="M180 176 C158 186 148 206 158 220 C168 234 192 234 202 220 C212 206 202 186 180 176 Z"
        />
        <path
          fill={`url(#${plumageId})`}
          d="M173 186 C171 166 176 150 180 138 C184 150 189 166 187 186 C183 180 177 180 173 186 Z"
        />
        <path
          fill="none"
          stroke="#C9A227"
          strokeWidth="1.15"
          strokeLinejoin="round"
          mask={`url(#${neckMaskId})`}
          d="M173 186 C171 166 176 150 180 138 C184 150 189 166 187 186 C183 180 177 180 173 186 Z"
        />
        <g className="peacock-head">
        <circle
          cx="180"
          cy="136"
          r="12.5"
          fill={`url(#${headId})`}
          stroke="#C9A227"
          strokeWidth="1.15"
        />
        <circle cx="180" cy="136" r="12.5" fill={`url(#${crownId})`} />
        <path d="M189 135 L206 131 L189 144 Z" fill="#C9A227" />
        <path
          d="M172 128 C168 118 166 112 164 106"
          stroke="#C9A227"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <circle cx="164" cy="105" r="1.45" fill="#C9A227" />
        <path
          d="M180 126 C180 114 180 106 180 98"
          stroke="#C9A227"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <circle cx="180" cy="97" r="1.6" fill="#C9A227" />
        <path
          d="M188 128 C192 118 194 112 196 106"
          stroke="#C9A227"
          strokeWidth="1.05"
          strokeLinecap="round"
        />
        <circle cx="196" cy="105" r="1.45" fill="#C9A227" />
        <circle cx="185" cy="134" r="1.8" fill="#F3E6C4" />
        <circle cx="185.7" cy="134.3" r="0.8" fill="#061E3A" />
        </g>
      </svg>
    </div>
  );
}
