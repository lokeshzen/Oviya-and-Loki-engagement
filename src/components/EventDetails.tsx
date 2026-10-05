"use client";

import { motion } from "framer-motion";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { TempleCurtain } from "@/components/TempleCurtain";
import { Card } from "@/components/ui/Card";
import { Kuthuvilakku } from "@/components/Kuthuvilakku";
import { EVENT, FAMILY, RECEPTION } from "@/lib/event";
import { hoverLift } from "@/lib/animations";

const ceremonies = [
  {
    label: "Wedding Reception",
    date: RECEPTION.dateLabel,
    time: RECEPTION.timeLabel,
    venue: EVENT.venueHall,
    address: EVENT.address,
    href: EVENT.mapsUrl,
  },
  {
    label: "Wedding",
    date: EVENT.dateLabel,
    time: EVENT.timeLabel,
    venue: EVENT.venueHall,
    address: EVENT.address,
    href: EVENT.mapsUrl,
  },
] as const;

export function EventDetails() {
  return (
    <section id="details" className="relative">
      <TempleCurtain>
        <div className="container-wide flex flex-col items-center gap-8">
          <SectionHeading
            eyebrow="Event Details"
            title="Join Us for the Celebration"
          />
          <FamilyInvitation />
        </div>
      </TempleCurtain>

      <div className="section-padding bg-gradient-to-b from-invite-ivory via-invite-champagne/45 to-invite-ivory">
        <div className="container-wide grid gap-4 sm:grid-cols-2">
          {ceremonies.map((ceremony, index) => (
            <ScrollReveal
              key={ceremony.label}
              delay={index * 0.08}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <CeremonyCard {...ceremony} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FamilyInvitation() {
  return (
    <Card
      variant="default"
      className="mx-auto max-w-xl bg-invite-ivory/80 text-center backdrop-blur-sm"
    >
      <p className="font-display text-lg font-medium leading-snug text-invite-royal-purple">
        {FAMILY.hostFather}
      </p>
      <p className="mt-1 font-body text-sm italic text-invite-gray">and</p>
      <p className="mt-1 font-display text-lg font-medium leading-snug text-invite-royal-purple">
        {FAMILY.hostMother}
      </p>
      <p className="mx-auto mt-5 max-w-md font-body text-base leading-relaxed text-invite-gray">
        {FAMILY.invitationLine}
      </p>
      <div className="mt-6 flex flex-col items-center gap-1">
        <p className="font-accent text-3xl leading-tight text-invite-royal-purple sm:text-4xl">
          {EVENT.groomFormal}
        </p>
        <p className="font-label text-[0.7rem] tracking-[0.12em] text-invite-royal-pink">
          {EVENT.groomCredentials}
        </p>
      </div>
      <p className="my-3 font-body text-sm italic text-invite-gray">with</p>
      <div className="flex flex-col items-center gap-1">
        <p className="font-accent text-3xl leading-tight text-invite-royal-purple sm:text-4xl">
          {EVENT.brideFormal}
        </p>
        <p className="font-label text-[0.7rem] tracking-[0.12em] text-invite-royal-pink">
          {EVENT.brideCredentials}
        </p>
      </div>
      <p className="mt-4 font-body text-base leading-relaxed text-invite-gray">
        (D/o. {FAMILY.brideFather} & {FAMILY.brideMother})
      </p>
    </Card>
  );
}

function CeremonyCard({
  label,
  date,
  time,
  venue,
  address,
  href,
}: {
  label: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
      aria-label={`${label}: ${date}, ${time} at ${venue}, ${address} — open in maps`}
    >
      <motion.div initial="rest" whileHover="hover" variants={hoverLift}>
        <Card
          variant="default"
          className="flex h-full flex-col items-center bg-invite-ivory/80 text-center backdrop-blur-sm transition-shadow hover:border-invite-royal-pink/40 hover:shadow-md hover:shadow-invite-royal-pink/5"
        >
          <p className="font-label text-[0.7rem] font-medium tracking-[0.15em] text-invite-royal-pink uppercase">
            {label}
          </p>
          {label === "Wedding" ? <Kuthuvilakku className="mt-3" /> : null}
          <div className="mt-4 flex w-full flex-col items-center gap-2.5">
            <p className="flex items-center gap-2 font-display text-lg font-medium leading-snug text-invite-royal-purple tabular-nums">
              <CalendarIcon />
              {date}
            </p>
            <p className="flex items-center gap-2 font-display text-base text-invite-royal-purple tabular-nums">
              <ClockIcon />
              {time}
            </p>
            <p className="flex items-center gap-2 font-body text-base leading-relaxed text-invite-gray">
              <PinIcon />
              {venue}
            </p>
            <p className="max-w-xs font-body text-sm leading-relaxed text-invite-gray-light">
              {address}
            </p>
          </div>
          <p className="mt-5 font-label text-xs tracking-[0.12em] text-invite-royal-pink uppercase">
            View on map →
          </p>
        </Card>
      </motion.div>
    </a>
  );
}

function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5l3 1.5" />
    </svg>
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
