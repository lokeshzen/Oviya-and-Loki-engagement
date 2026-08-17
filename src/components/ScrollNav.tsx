"use client";

import { useReducedMotion } from "framer-motion";
import { SECTION_NAV } from "@/lib/palace-assets";
import { useActiveSection } from "@/hooks/useScrollEffects";
import { cn } from "@/lib/utils";

export function ScrollNav() {
  const reduceMotion = useReducedMotion();
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
            className={cn(
              "group flex items-center justify-end gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2",
            )}
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
            <span
              className={cn(
                "block h-2 w-2 rounded-full border border-invite-ivory-gold/70 bg-invite-ivory/90 transition-all duration-300",
                isActive && "scale-125 border-invite-royal-pink bg-invite-royal-pink",
              )}
              aria-hidden
            />
          </a>
        );
      })}
    </nav>
  );
}
