export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCountdownValue(value: number) {
  return String(value).padStart(2, "0");
}
