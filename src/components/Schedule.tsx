"use client";

import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SCHEDULE } from "@/lib/event";

export function Schedule() {
  return (
    <ParallaxSection id="schedule" overlay="warm" speed={0.35}>
      <div className="container-wide">
        <ScrollReveal direction="down">
          <div className="flex items-center justify-center gap-3">
            <span className="gold-divider hidden w-10 sm:block" aria-hidden />
            <h2 className="text-center font-script text-4xl leading-tight text-invite-ivory-gold sm:text-5xl">
              Schedule of Events
            </h2>
            <span className="gold-divider hidden w-10 sm:block" aria-hidden />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10">
          <div className="relative mx-auto max-w-lg">
            <div
              className="absolute bottom-6 left-1/2 top-10 w-px -translate-x-1/2 bg-invite-ivory-gold/50"
              aria-hidden
            />
            <ol>
              {SCHEDULE.map((item, index) => (
                <li
                  key={`${item.date}-${item.title}`}
                  className={index > 0 ? "mt-10" : undefined}
                >
                  <p className="relative z-10 mx-auto mb-5 w-fit bg-invite-ivory/80 px-3 text-center font-label text-[0.7rem] font-medium tracking-[0.16em] text-invite-royal-pink uppercase">
                    {item.date}
                  </p>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6">
                    <p className="text-right font-numerals text-lg leading-snug text-invite-royal-purple sm:text-xl">
                      {item.time}
                    </p>
                    <span
                      className="relative z-10 h-2.5 w-2.5 rotate-45 bg-invite-ivory-gold shadow-[0_0_8px_rgba(201,162,39,0.55)]"
                      aria-hidden
                    />
                    <p className="font-body text-lg leading-snug text-invite-royal-purple sm:text-xl">
                      {item.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}
