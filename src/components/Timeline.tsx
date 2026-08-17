"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { EVENT, TIMELINE_MILESTONES } from "@/lib/event";
import { formatCountdownValue } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";

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
  const [parts, setParts] = useState<Parts | null>(() => getParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: [string, number][] = parts
    ? [
        ["Days", parts.days],
        ["Hours", parts.hours],
        ["Mins", parts.minutes],
        ["Secs", parts.seconds],
      ]
    : [];

  return (
    <section id="timeline" className="section-padding bg-invite-blush/30">
      <div className="container-wide">
        <ScrollReveal>
          <SectionHeading
            eyebrow="The Journey"
            title="Counting Down to Our Day"
            description="Every moment brings us closer to celebrating together."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          <Card variant="elevated" className="mx-auto max-w-md">
            {parts ? (
              <div>
                <p className="mb-4 text-center font-body text-xs tracking-[0.2em] text-invite-gray uppercase">
                  Time remaining
                </p>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {cells.map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-invite-gold/20 bg-invite-cream/80 px-2 py-4 text-center"
                    >
                      <div
                        className="font-display text-2xl font-medium text-invite-burgundy tabular-nums sm:text-3xl"
                        aria-live="polite"
                      >
                        {formatCountdownValue(value)}
                      </div>
                      <div className="mt-1 font-body text-[0.6rem] tracking-wider text-invite-gray-light uppercase">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center font-display text-lg text-invite-burgundy">
                The celebration has begun!
              </p>
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
                    className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-invite-gold/30"
                    aria-hidden
                  />
                )}
                <div
                  className={`relative z-10 mt-1 h-[22px] w-[22px] shrink-0 rounded-full border-2 ${
                    "highlight" in milestone && milestone.highlight
                      ? "border-invite-burgundy bg-invite-burgundy"
                      : "border-invite-gold bg-white"
                  }`}
                  aria-hidden
                >
                  {"highlight" in milestone && milestone.highlight && (
                    <span className="absolute inset-1 rounded-full bg-invite-gold-soft" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="font-body text-[0.65rem] tracking-[0.15em] text-invite-rose-gold uppercase">
                    {milestone.date}
                  </p>
                  <h3 className="mt-0.5 font-display text-lg font-medium text-invite-burgundy">
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
    </section>
  );
}
