"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { EVENT, TIMELINE_MILESTONES } from "@/lib/event";
import { PALACE_IMAGES } from "@/lib/palace-assets";
import { fadeUp, staggerContainer } from "@/lib/animations";
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
  const target = new Date(EVENT.startISO).getTime();
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
      backgroundSrc={PALACE_IMAGES.timeline}
      backgroundAlt="Royal palace courtyard with fountain and gardens"
      overlay="blush"
      speed={0.4}
      decorativeBorder
      borderSrc={PALACE_IMAGES.border}
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
                <p className="mb-4 text-center font-body text-xs tracking-[0.2em] text-invite-gray uppercase">
                  Time remaining
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
                      <div className="mt-1 font-body text-[0.6rem] tracking-wider text-invite-gray-light uppercase">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-12">
          <motion.ol
            className="relative mx-auto max-w-md space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {TIMELINE_MILESTONES.map((milestone, index) => (
              <motion.li
                key={milestone.label}
                variants={fadeUp}
                className="relative flex gap-4 pb-10 last:pb-0"
              >
                {index < TIMELINE_MILESTONES.length - 1 && (
                  <div
                    className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-invite-ivory-gold/40"
                    aria-hidden
                  />
                )}
                <div
                  className={`relative z-10 mt-1 h-[22px] w-[22px] shrink-0 rounded-full border-2 ${
                    "highlight" in milestone && milestone.highlight
                      ? "border-invite-royal-pink bg-invite-royal-pink"
                      : "border-invite-ivory-gold bg-invite-ivory"
                  }`}
                  aria-hidden
                >
                  {"highlight" in milestone && milestone.highlight && (
                    <span className="absolute inset-1 rounded-full bg-invite-champagne" />
                  )}
                </div>
                <div className="flex-1 rounded-xl bg-invite-ivory/60 px-3 py-2 backdrop-blur-sm">
                  <p className="font-body text-[0.65rem] tracking-[0.15em] text-invite-royal-pink uppercase">
                    {milestone.date}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-medium text-invite-royal-purple">
                    {milestone.label}
                  </h3>
                  <p className="mt-1 font-body text-sm leading-relaxed text-invite-gray">
                    {milestone.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}
