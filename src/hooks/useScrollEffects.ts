"use client";

import { useEffect, useRef, useState } from "react";
import { SECTION_NAV } from "@/lib/palace-assets";
import { rafThrottle } from "@/lib/performance";

export type SectionMark = {
  id: string;
  label: string;
  at: number;
};

function measureSectionMarks(): SectionMark[] {
  const limit = document.documentElement.scrollHeight - window.innerHeight;

  return SECTION_NAV.map((item) => {
    const el = document.getElementById(item.id);
    if (!el || limit <= 0) {
      return { id: item.id, label: item.label, at: 0 };
    }

    const top = el.getBoundingClientRect().top + window.scrollY;
    return {
      id: item.id,
      label: item.label,
      at: Math.min(1, Math.max(0, top / limit)),
    };
  });
}

export function useSectionMarks() {
  const [marks, setMarks] = useState<SectionMark[]>([]);

  useEffect(() => {
    const update = rafThrottle(() => {
      setMarks(measureSectionMarks());
    });

    update();
    window.addEventListener("resize", update, { passive: true });

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(update)
        : null;
    observer?.observe(document.documentElement);

    return () => {
      window.removeEventListener("resize", update);
      observer?.disconnect();
      update.cancel();
    };
  }, []);

  return marks;
}

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const nextIdRef = useRef(sectionIds[0] ?? "");
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey.split(",").filter(Boolean);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    let frame = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id;
        if (!id || id === nextIdRef.current) return;

        nextIdRef.current = id;
        if (frame) return;

        frame = requestAnimationFrame(() => {
          frame = 0;
          setActiveId(nextIdRef.current);
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [idsKey]);

  return activeId;
}
