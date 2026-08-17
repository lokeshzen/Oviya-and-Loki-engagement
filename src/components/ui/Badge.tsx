import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "gold" | "royal";
};

const variantStyles = {
  default:
    "bg-invite-rose-blush text-invite-royal-purple border-invite-ivory-gold/40",
  gold:
    "bg-invite-champagne/60 text-invite-royal-purple border-invite-ivory-gold/50",
  royal:
    "bg-invite-royal-pink text-invite-ivory border-invite-royal-pink",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-body text-[0.65rem] font-medium tracking-[0.15em] uppercase",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
