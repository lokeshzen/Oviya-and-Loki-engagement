import Lenis, { type LenisOptions } from "lenis";

export const LENIS_OPTIONS: LenisOptions = {
  autoRaf: false,
  anchors: {
    duration: 1.2,
    offset: 0,
  },
  duration: 1.15,
  lerp: 0.09,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.1,
  syncTouch: false,
  overscroll: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

export function createLenis(options: LenisOptions = {}) {
  return new Lenis({ ...LENIS_OPTIONS, ...options });
}

export function scrollToTarget(
  lenis: Lenis | null,
  target: string | HTMLElement,
  offset = 0,
) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
    return;
  }

  const element =
    typeof target === "string"
      ? document.querySelector(target)
      : target;

  if (element instanceof HTMLElement) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
