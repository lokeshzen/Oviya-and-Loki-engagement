"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { EVENT } from "@/lib/event";
import { PALACE_IMAGES } from "@/lib/palace-assets";
import { hoverLift } from "@/lib/animations";

export function ActionButtons() {
  const [icsLoading, setIcsLoading] = useState(false);

  const handleIcs = () => {
    setIcsLoading(true);
    downloadIcs();
    setTimeout(() => setIcsLoading(false), 600);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
      text: `You're invited! ${EVENT.dateLabel} · ${EVENT.timeLabel} · ${EVENT.venue}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <ParallaxSection
      id="actions"
      backgroundSrc={PALACE_IMAGES.garden}
      backgroundAlt="Royal garden pathway with traditional lamps"
      overlay="deep"
      speed={0.25}
    >
      <div className="container-narrow">
        <ScrollReveal direction="3d">
          <SectionHeading
            eyebrow="Plan Your Visit"
            title="Save the Date"
            description="Add the event to your calendar or get directions to the venue."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <motion.a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-invite-ivory-gold/60 bg-invite-ivory/90 px-5 py-3 font-body text-sm text-invite-royal-purple shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-invite-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2 sm:flex-none"
              variants={hoverLift}
              initial="rest"
              whileHover="hover"
            >
              <PinIcon />
              Open Maps
            </motion.a>
            <motion.a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-invite-ivory-gold/60 bg-invite-ivory/90 px-5 py-3 font-body text-sm text-invite-royal-purple shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-invite-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2 sm:flex-none"
              variants={hoverLift}
              initial="rest"
              whileHover="hover"
            >
              <CalendarIcon />
              Google Calendar
            </motion.a>
            <motion.div variants={hoverLift} initial="rest" whileHover="hover">
              <Button
                type="button"
                variant="outline"
                size="lg"
                loading={icsLoading}
                onClick={handleIcs}
                className="w-full flex-1 bg-invite-ivory/90 backdrop-blur-sm sm:flex-none"
              >
                <DownloadIcon />
                Save .ics
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-4 text-center">
          <Button type="button" variant="ghost" size="sm" onClick={handleShare}>
            Share Invitation
          </Button>
        </ScrollReveal>
      </div>
    </ParallaxSection>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
    </svg>
  );
}
