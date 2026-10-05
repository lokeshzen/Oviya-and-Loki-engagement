"use client";

import { useEffect, useState } from "react";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { RECEPTION } from "@/lib/event";
import { ScrollCounter } from "@/components/ScrollCounter";

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
        ["Mins", parts.minutes],
        ["Secs", parts.seconds],
      ]
    : [
        ["Days", 0],
        ["Hours", 0],
        ["Mins", 0],
        ["Secs", 0],
      ];

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
          <SectionHeading
            eyebrow="The Journey"
            title="Counting Down to Our Day"
            description="Every moment brings us closer to celebrating together."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} direction="3d" className="mt-10">
          <Card variant="elevated" className="mx-auto max-w-md backdrop-blur-sm">
            {showCelebration ? (
              <p className="text-center font-display text-lg text-invite-royal-purple">
                The celebration has begun!
              </p>
            ) : (
              <div>
                <p className="mb-1 text-center font-label text-xs tracking-[0.2em] text-invite-gray uppercase">
                  Time remaining
                </p>
                <p className="mb-4 text-center font-label text-[0.7rem] tracking-[0.12em] text-invite-royal-pink uppercase">
                  Until the reception · {RECEPTION.dateLabel}
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {cells.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-invite-ivory-gold/30 bg-invite-ivory/85 px-2 py-4 text-center backdrop-blur-sm"
                    >
                      <div
                        className={`font-display text-2xl font-medium text-invite-royal-purple tabular-nums sm:text-3xl${
                          showPlaceholder ? " opacity-40" : ""
                        }`}
                        aria-live={showCountdown ? "polite" : undefined}
                        aria-hidden={showPlaceholder}
                      >
                        <ScrollCounter value={value} />
                      </div>
                      <div className="mt-1 font-label text-[0.7rem] tracking-wider text-invite-gray-light uppercase">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}
