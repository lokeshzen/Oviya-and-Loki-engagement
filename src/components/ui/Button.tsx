import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-invite-burgundy text-invite-cream shadow-md hover:bg-invite-burgundy/90 active:scale-[0.98]",
  secondary:
    "bg-invite-rose-gold text-white shadow-sm hover:bg-invite-rose-gold/90 active:scale-[0.98]",
  outline:
    "border border-invite-gold/60 bg-white/80 text-invite-burgundy hover:bg-white hover:border-invite-gold",
  ghost:
    "text-invite-burgundy hover:bg-invite-blush/60 active:scale-[0.98]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-wide",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm font-medium",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-body transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-gold focus-visible:ring-offset-2 focus-visible:ring-offset-invite-cream",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden
          />
          <span>Please wait…</span>
        </>
      ) : (
        children
      )}
    </button>
  )
);

Button.displayName = "Button";
