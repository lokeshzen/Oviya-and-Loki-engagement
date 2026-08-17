import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "gold" | "burgundy";
};

const variantStyles = {
  default: "bg-invite-blush text-invite-burgundy border-invite-gold/20",
  gold: "bg-invite-gold-soft/40 text-invite-burgundy border-invite-gold/30",
  burgundy: "bg-invite-burgundy text-invite-cream border-invite-burgundy",
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
