"use client";

import { Fragment, useEffect, useState } from "react";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { RECEPTION } from "@/lib/event";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function getParts(target: number): Parts | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const EMPTY_CELLS: [string, number][] = [
  ["Days", 0],
  ["Hours", 0],
  ["Minutes", 0],
  ["Seconds", 0],
];

export function Timeline() {
  const target = new Date(RECEPTION.startISO).getTime();
  const [parts, setParts] = useState<Parts | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setParts(getParts(target));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: [string, number][] = parts
    ? [
        ["Days", parts.days],
        ["Hours", parts.hours],
        ["Minutes", parts.minutes],
        ["Seconds", parts.seconds],
      ]
    : EMPTY_CELLS;

  const showCountdown = mounted && parts;
  const showPlaceholder = !mounted;
  const showCelebration = mounted && !parts;

  return (
    <ParallaxSection
      id="timeline"
      overlay="blush"
      speed={0.4}
      decorativeBorder
    >
      <div className="container-wide">
        <ScrollReveal direction="down">
          <h2 className="text-center font-script text-4xl leading-tight text-invite-wine sm:text-5xl">
            The reception begins in
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8">
          {showCelebration ? (
            <p className="text-center font-script text-3xl text-invite-ivory-gold">
              The celebration has begun!
            </p>
          ) : (
            <div
              className="flex items-start justify-center gap-2 sm:gap-3"
              aria-live={showCountdown ? "polite" : undefined}
              aria-hidden={showPlaceholder}
            >
              {cells.map(([label, value], index) => (
                <Fragment key={label}>
                  {index > 0 ? (
                    <span
                      className="mt-1 font-numerals text-4xl leading-none text-invite-ivory-gold sm:mt-2 sm:text-5xl"
                      aria-hidden
                    >
                      :
                    </span>
                  ) : null}
                  <div
                    className={`min-w-[3.5rem] text-center sm:min-w-[4.25rem]${
                      showPlaceholder ? " opacity-40" : ""
                    }`}
                  >
                    <div className="font-numerals text-4xl leading-none text-invite-ivory-gold tabular-nums sm:text-5xl">
                      {String(value).padStart(2, "0")}
                    </div>
                    <div className="mt-3 font-numerals text-sm tracking-wide text-invite-gray sm:text-base">
                      {label}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}
