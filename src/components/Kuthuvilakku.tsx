import { cn } from "@/lib/utils";

type KuthuvilakkuProps = {
  className?: string;
};

export function Kuthuvilakku({ className }: KuthuvilakkuProps) {
  return (
    <svg
      viewBox="0 0 64 120"
      className={cn("h-16 w-9", className)}
      aria-hidden
    >
      <g className="kuthuvilakku-flame">
        <path
          d="M32 6 C27 18 22 26 22 34 C22 41 26.5 46 32 46 C37.5 46 42 41 42 34 C42 26 37 18 32 6 Z"
          fill="#C9A227"
        />
        <path
          d="M32 18 C30 25 28.5 30 28.5 34 C28.5 38 30.2 41 32 41 C33.8 41 35.5 38 35.5 34 C35.5 30 34 25 32 18 Z"
          fill="#FEFCF8"
          opacity="0.92"
        />
      </g>
      <path d="M16 50 H48 L43 58 H21 Z" fill="#C9A227" />
      <path d="M21 58 H43 L41 62 H23 Z" fill="#0B3A6A" opacity="0.28" />
      <path d="M30 62 H34 V84 H30 Z" fill="#C9A227" />
      <ellipse cx="32" cy="70" rx="6.5" ry="2.2" fill="#0B3A6A" opacity="0.4" />
      <ellipse cx="32" cy="78" rx="5.2" ry="1.8" fill="#0B3A6A" opacity="0.32" />
      <path
        d="M32 84 C22 84 14 94 12 106 C18 114 46 114 52 106 C50 94 42 84 32 84 Z"
        fill="#C9A227"
      />
      <path
        d="M20 104 H44"
        stroke="#FEFCF8"
        strokeWidth="0.7"
        opacity="0.55"
      />
      <ellipse cx="32" cy="110" rx="20" ry="4" fill="#0B3A6A" opacity="0.18" />
    </svg>
  );
}
