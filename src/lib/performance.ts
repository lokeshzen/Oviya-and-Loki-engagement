type RafThrottled<T extends (...args: never[]) => void> = T & {
  cancel: () => void;
};

export function rafThrottle<T extends (...args: never[]) => void>(
  fn: T,
): RafThrottled<T> {
  let frame = 0;

  const throttled = ((...args: never[]) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      fn(...args);
    });
  }) as RafThrottled<T>;

  throttled.cancel = () => {
    if (!frame) return;
    cancelAnimationFrame(frame);
    frame = 0;
  };

  return throttled;
}

export function canUseScrollDrivenAnimations() {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") {
    return false;
  }

  return (
    CSS.supports("animation-timeline: scroll()") ||
    CSS.supports("animation-timeline", "scroll()") ||
    CSS.supports("animation-timeline: view()")
  );
}

export function prefersFinePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}

export function shouldEnableHeavyEffects() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  return prefersFinePointer() && window.innerWidth >= 640;
}

export function cleanupFns(...fns: Array<(() => void) | undefined>) {
  return () => {
    fns.forEach((fn) => fn?.());
  };
}
