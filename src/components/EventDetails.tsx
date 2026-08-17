"use client";

import { motion } from "framer-motion";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { EVENT } from "@/lib/event";
import { PALACE_IMAGES } from "@/lib/palace-assets";
import { hoverLift } from "@/lib/animations";

const details = [
  {
    label: "Date",
    value: EVENT.dateLabel,
    icon: CalendarIcon,
  },
  {
    label: "Time",
    value: EVENT.timeLabel,
    icon: ClockIcon,
  },
  {
    label: "Venue",
    value: EVENT.venue,
    icon: PinIcon,
    href: EVENT.mapsUrl,
  },
] as const;

export function EventDetails() {
  return (
    <ParallaxSection
      id="details"
      backgroundSrc={PALACE_IMAGES.eventHall}
      backgroundAlt="Elegant palace hall with chandeliers and marble columns"
      overlay="warm"
      speed={0.3}
    >
      <div className="container-wide">
        <ScrollReveal direction="3d">
          <SectionHeading
            eyebrow="Event Details"
            title="Join Us for the Celebration"
            description="We would be honoured to have you with us on this special day."
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {details.map((detail, index) => (
            <ScrollReveal
              key={detail.label}
              delay={index * 0.08}
              direction={index % 2 === 0 ? "right" : "left"}
            >
              <DetailCard {...detail} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </ParallaxSection>
  );
}

function DetailCard({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: string;
  icon: () => React.ReactNode;
  href?: string;
}) {
  const content = (
    <motion.div initial="rest" whileHover="hover" variants={hoverLift}>
      <Card
        variant="default"
        className="flex h-full flex-col items-center bg-invite-ivory/80 text-center backdrop-blur-sm transition-shadow hover:border-invite-royal-pink/40 hover:shadow-md hover:shadow-invite-royal-pink/5"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-invite-rose-blush text-invite-royal-pink">
          <Icon />
        </div>
        <p className="font-body text-[0.65rem] font-medium tracking-[0.15em] text-invite-gray uppercase">
          {label}
        </p>
        <p className="mt-2 font-display text-base font-medium leading-snug text-invite-royal-purple">
          {value}
        </p>
      </Card>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2"
        aria-label={`${label}: ${value} — open in maps`}
      >
        {content}
      </a>
    );
  }

  return content;
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
