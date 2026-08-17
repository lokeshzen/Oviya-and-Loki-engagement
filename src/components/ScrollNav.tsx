"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SECTION_NAV } from "@/lib/palace-assets";
import { useActiveSection } from "@/hooks/useScrollEffects";
import { useSmoothScroll } from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

export function ScrollNav() {
  const reduceMotion = useReducedMotion();
  const scroll = useSmoothScroll();
  const sectionIds = SECTION_NAV.map((item) => item.id);
  const activeId = useActiveSection(sectionIds);

  if (reduceMotion) return null;

  return (
    <nav
      className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2 sm:flex md:right-5"
      aria-label="Section navigation"
    >
      {SECTION_NAV.map((item) => {
        const isActive = activeId === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(event) => {
              if (!scroll?.lenis) return;
              event.preventDefault();
              scroll.scrollTo(`#${item.id}`);
              history.pushState(null, "", `#${item.id}`);
            }}
            className="group flex items-center justify-end gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
            aria-label={`Go to ${item.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={cn(
                "pointer-events-none rounded-full bg-invite-royal-pink/90 px-2 py-0.5 font-body text-[0.6rem] tracking-wide text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100",
                isActive && "opacity-100",
              )}
            >
              {item.label}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="scroll-nav-dot"
                  className="absolute inset-0 rounded-full bg-invite-royal-pink/25"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span
                className={cn(
                  "block h-2 w-2 rounded-full border border-invite-ivory-gold/70 bg-invite-ivory/90 transition-all duration-300",
                  isActive &&
                    "scale-125 border-invite-royal-pink bg-invite-royal-pink",
                )}
                aria-hidden
              />
            </span>
          </a>
        );
      })}
    </nav>
  );
}
