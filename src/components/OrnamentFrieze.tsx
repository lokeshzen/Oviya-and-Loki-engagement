import { useId } from "react";
import { cn } from "@/lib/utils";

type OrnamentFriezeProps = {
  className?: string;
};

export function OrnamentFrieze({ className }: OrnamentFriezeProps) {
  const patternId = useId();

  return (
    <svg
      className={cn(
        "h-16 w-full text-invite-ivory-gold sm:h-20",
        className,
      )}
      viewBox="0 0 400 40"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 30 Q10 10 20 30 Q30 10 40 30"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="20" cy="16" r="1.15" fill="currentColor" />
          <path
            d="M0 34 H40"
            stroke="currentColor"
            strokeWidth="0.45"
            opacity="0.7"
          />
        </pattern>
      </defs>
      <rect width="400" height="40" fill={`url(#${patternId})`} />
    </svg>
  );
}
