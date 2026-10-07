"use client";

import { cn } from "@/lib/utils";

type ScrollTypographyProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
};

export function ScrollTypography({
  text,
  className,
  as: Tag = "h2",
  id,
}: ScrollTypographyProps) {
  return (
    <Tag id={id} className={className}>
      {text}
    </Tag>
  );
}

export function ScrollTypographyLine({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn(className)}>{children}</div>;
}
