import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
  variant?: "default" | "elevated" | "ghost";
};

const variantStyles = {
  default:
    "border border-invite-ivory-gold/40 bg-invite-ivory/95 shadow-sm backdrop-blur-sm",
  elevated:
    "border border-invite-champagne/60 bg-invite-ivory shadow-lg shadow-invite-royal-purple/8",
  ghost: "border border-transparent bg-invite-rose-blush/50",
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
        "font-display text-2xl font-medium tracking-tight text-invite-royal-purple sm:text-3xl",
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
