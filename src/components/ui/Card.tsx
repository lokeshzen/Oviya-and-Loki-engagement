import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
  variant?: "default" | "elevated" | "ghost";
};

const variantStyles = {
  default:
    "border border-invite-gold/30 bg-white/90 shadow-sm backdrop-blur-sm",
  elevated:
    "border border-invite-gold/20 bg-white shadow-lg shadow-invite-burgundy/5",
  ghost: "border border-transparent bg-invite-blush/40",
};

export function Card({
  as: Tag = "article",
  variant = "default",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-2xl p-6 sm:p-8",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-6 text-center", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "font-display text-2xl font-medium tracking-tight text-invite-burgundy sm:text-3xl",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-2 font-body text-sm leading-relaxed text-invite-gray",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
