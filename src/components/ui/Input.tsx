import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

const fieldStyles =
  "w-full rounded-xl border border-invite-ivory-gold/40 bg-invite-ivory px-4 py-3 font-body text-sm text-invite-deep-plum outline-none transition-colors placeholder:text-invite-gray-light focus:border-invite-royal-pink focus:ring-2 focus:ring-invite-royal-pink/15";

type FieldWrapperProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

export function FieldWrapper({
  label,
  error,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <label className={cn("block font-body text-sm", className)}>
      <span className="mb-1.5 block text-invite-gray">{label}</span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs text-red-700" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(fieldStyles, className)} {...props} />
));

Input.displayName = "Input";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(fieldStyles, "resize-none", className)}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(fieldStyles, className)} {...props}>
      {children}
    </select>
  );
}
