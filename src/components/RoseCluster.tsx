type Corner = "tl" | "tr" | "bl" | "br";

type RoseClusterProps = {
  position: Corner;
};

export function RoseCluster({ position }: RoseClusterProps) {
  const uid = `rose-${position}`;
  const transform =
    position === "tl"
      ? undefined
      : position === "tr"
        ? "scale(-1, 1)"
        : position === "bl"
          ? "scale(1, -1)"
          : "scale(-1, -1)";

  const pos =
    position === "tl"
      ? "-left-2 -top-1"
      : position === "tr"
        ? "-right-2 -top-1"
        : position === "bl"
          ? "-bottom-1 -left-2"
          : "-bottom-1 -right-2";

  return (
    <div
      className={`pointer-events-none absolute z-20 h-[6.75rem] w-[6.75rem] sm:h-[8.25rem] sm:w-[8.25rem] ${pos}`}
      style={{
        WebkitMaskImage:
          "radial-gradient(ellipse 92% 92% at 12% 12%, #000 48%, transparent 82%)",
        maskImage:
          "radial-gradient(ellipse 92% 92% at 12% 12%, #000 48%, transparent 82%)",
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 140 140"
        className="h-full w-full"
        style={{ transform }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${uid}-leaf`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7fad68" />
            <stop offset="100%" stopColor="#4a7540" />
          </linearGradient>
          <radialGradient id={`${uid}-p1`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffe8ee" />
            <stop offset="55%" stopColor="#f2a0b2" />
            <stop offset="100%" stopColor="#d4657c" />
          </radialGradient>
          <radialGradient id={`${uid}-p2`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fff0f4" />
            <stop offset="50%" stopColor="#eba0b4" />
            <stop offset="100%" stopColor="#c9556e" />
          </radialGradient>
          <radialGradient id={`${uid}-core`} cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#f7b8c6" />
            <stop offset="100%" stopColor="#a83852" />
          </radialGradient>
        </defs>

        {/* Leaves */}
        <path
          d="M12 72 C4 48 28 28 50 36 C36 48 28 62 24 82 Z"
          fill={`url(#${uid}-leaf)`}
        />
        <path
          d="M48 22 C34 6 58 -2 74 14 C60 20 52 30 48 42 Z"
          fill={`url(#${uid}-leaf)`}
          opacity="0.92"
        />
        <path
          d="M16 98 C2 108 8 132 30 128 C24 114 26 104 38 96 Z"
          fill={`url(#${uid}-leaf)`}
          opacity="0.9"
        />
        <path
          d="M88 16 C102 2 124 12 118 32 C108 24 96 26 86 36 Z"
          fill={`url(#${uid}-leaf)`}
          opacity="0.88"
        />
        <path
          d="M26 70 C32 56 40 46 46 40"
          stroke="#355a32"
          strokeWidth="0.9"
          fill="none"
          opacity="0.35"
        />

        {/* Large rose */}
        <g>
          <path
            d="M28 70 C22 48 40 34 58 40 C70 28 92 36 90 56 C104 62 100 86 80 90 C72 104 48 102 40 86 C26 86 22 76 28 70 Z"
            fill={`url(#${uid}-p1)`}
          />
          <path
            d="M42 66 C38 52 50 44 62 48 C70 40 84 46 82 58 C90 64 86 78 74 80 C68 90 52 88 48 76 C38 76 36 70 42 66 Z"
            fill={`url(#${uid}-p2)`}
          />
          <path
            d="M52 64 C50 56 56 52 64 54 C68 50 76 54 74 60 C78 64 76 72 68 72 C64 78 56 76 54 70 C48 70 48 66 52 64 Z"
            fill={`url(#${uid}-core)`}
          />
          <circle cx="64" cy="62" r="4.5" fill="#8f2f48" opacity="0.85" />
        </g>

        {/* Medium rose */}
        <g transform="translate(46 -4)">
          <path
            d="M34 48 C30 32 44 22 58 28 C66 20 82 28 78 42 C88 48 84 64 70 66 C64 76 48 74 44 62 C34 62 30 54 34 48 Z"
            fill={`url(#${uid}-p1)`}
          />
          <path
            d="M44 46 C42 36 50 32 58 36 C62 30 72 36 70 44 C76 48 72 58 64 58 C60 64 52 62 50 56 C44 56 42 50 44 46 Z"
            fill={`url(#${uid}-p2)`}
          />
          <circle cx="58" cy="46" r="3.5" fill="#8f2f48" opacity="0.8" />
        </g>

        {/* Bud */}
        <g>
          <path
            d="M102 78 C102 66 114 60 122 68 C126 74 122 88 110 90 C104 92 102 86 102 78 Z"
            fill={`url(#${uid}-p2)`}
          />
          <path
            d="M110 90 C106 102 102 112 98 118"
            stroke="#4a7540"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M104 104 C96 100 92 108 98 112 C102 114 106 110 104 104 Z"
            fill={`url(#${uid}-leaf)`}
          />
        </g>

        {/* Filler blossoms */}
        <g>
          <circle cx="22" cy="44" r="3.4" fill="#fff8fb" stroke="#efc2cc" strokeWidth="0.7" />
          <circle cx="34" cy="32" r="2.6" fill="#fff8fb" stroke="#efc2cc" strokeWidth="0.7" />
          <circle cx="18" cy="58" r="2.4" fill="#fff8fb" stroke="#efc2cc" strokeWidth="0.7" />
          <circle cx="96" cy="26" r="2.8" fill="#fff8fb" stroke="#efc2cc" strokeWidth="0.7" />
          <circle cx="108" cy="40" r="2.2" fill="#fff8fb" stroke="#efc2cc" strokeWidth="0.7" />
          <circle cx="40" cy="108" r="2.5" fill="#fff8fb" stroke="#efc2cc" strokeWidth="0.7" />
          <circle cx="22" cy="44" r="1" fill="#e8a0b0" />
          <circle cx="34" cy="32" r="0.8" fill="#e8a0b0" />
          <circle cx="96" cy="26" r="0.8" fill="#e8a0b0" />
        </g>
      </svg>
    </div>
  );
}
