"use client";

import { Kuthuvilakku } from "@/components/Kuthuvilakku";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { EVENT, SCHEDULE } from "@/lib/event";

export function Schedule() {
  return (
    <ParallaxSection id="schedule" overlay="warm" speed={0.35}>
      <div className="container-wide">
        <ScrollReveal direction="down">
          <div className="flex items-center justify-center gap-3">
            <span className="gold-divider hidden w-10 sm:block" aria-hidden />
            <h2 className="text-center font-script text-4xl leading-tight text-invite-wine sm:text-5xl">
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

        <ScrollReveal delay={0.18} className="mt-12">
          <VenueCard />
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}

function VenueCard() {
  return (
    <a
      href={EVENT.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mx-auto block max-w-md rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
      aria-label={`Venue: ${EVENT.venueHall}, ${EVENT.address} — open in maps`}
    >
      <Card
        variant="default"
        className="flex flex-col items-center bg-invite-ivory/80 text-center backdrop-blur-sm transition-shadow hover:border-invite-royal-pink/40 hover:shadow-md hover:shadow-invite-royal-pink/5"
      >
        <h3 className="font-script text-4xl leading-tight text-invite-wine sm:text-5xl">
          Venue
        </h3>
        <Kuthuvilakku className="mt-4" />
        <p className="mt-4 flex items-center gap-2 font-body text-base leading-relaxed text-invite-gray">
          <PinIcon />
          {EVENT.venueHall}
        </p>
        <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-invite-gray-light">
          {EVENT.address}
        </p>
        <p className="mt-5 font-label text-xs tracking-[0.12em] text-invite-royal-pink uppercase">
          View on Maps →
        </p>
      </Card>
    </a>
  );
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
