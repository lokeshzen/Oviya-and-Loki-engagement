"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ParallaxSection } from "@/components/ParallaxSection";
import { ScrollReveal, SectionHeading } from "@/components/ScrollReveal";
import {
  downloadIcs,
  googleCalendarReceptionUrl,
  googleCalendarUrl,
} from "@/lib/calendar";
import { EVENT, RECEPTION } from "@/lib/event";
import { hoverLift } from "@/lib/animations";

const outlineButtonClass =
  "inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-invite-ivory-gold/60 bg-invite-ivory/90 px-5 py-3 font-label text-sm text-invite-royal-purple shadow-sm backdrop-blur-sm transition hover:border-invite-royal-pink hover:bg-invite-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2 sm:flex-none";

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
      text: `You're invited! Reception ${RECEPTION.dateLabel} · ${RECEPTION.timeLabel}. Wedding ${EVENT.dateLabel} · ${EVENT.timeLabel}. ${EVENT.venue}`,
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
      overlay="deep"
      speed={0.25}
    >
      <div className="container-narrow">
        <ScrollReveal direction="3d">
          <SectionHeading
            eyebrow="Plan Your Visit"
            title="Save the Date"
            description="Add both celebrations to your calendar or get directions to the venue."
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <motion.a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-invite-royal-pink px-5 py-3 font-label text-sm text-invite-ivory shadow-md shadow-invite-royal-pink/20 transition hover:bg-invite-royal-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2 sm:flex-none"
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
              className={outlineButtonClass}
              variants={hoverLift}
              initial="rest"
              whileHover="hover"
            >
              <CalendarIcon />
              Add Wedding
            </motion.a>
            <motion.a
              href={googleCalendarReceptionUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineButtonClass}
              variants={hoverLift}
              initial="rest"
              whileHover="hover"
            >
              <CalendarIcon />
              Add Reception
            </motion.a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-8">
          <div className="mx-auto flex max-w-[14rem] flex-col items-center rounded-2xl border border-invite-ivory-gold/70 bg-invite-ivory/95 p-4 shadow-sm backdrop-blur-sm">
            <Image
              src={EVENT.venueQr}
              alt="QR code to open Rangalaya Royal, Katpadi, Vellore in maps"
              width={220}
              height={220}
              className="h-auto w-full rounded-md"
            />
            <p className="mt-3 font-label text-[0.7rem] font-medium tracking-[0.18em] text-invite-royal-pink uppercase">
              Scan for location
            </p>
            <p className="mt-1 text-center font-body text-base text-invite-gray">
              {EVENT.venue}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="mt-5 flex flex-col items-center gap-3">
          <motion.button
            type="button"
            onClick={handleShare}
            className={outlineButtonClass}
            variants={hoverLift}
            initial="rest"
            whileHover="hover"
          >
            <ShareIcon />
            Share Invitation
          </motion.button>
          <button
            type="button"
            onClick={handleIcs}
            disabled={icsLoading}
            className="font-label text-xs tracking-[0.12em] text-invite-royal-purple underline-offset-4 transition hover:text-invite-royal-pink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-invite-royal-pink focus-visible:ring-offset-2 disabled:opacity-50"
          >
            {icsLoading ? "Saving…" : "Save .ics"}
          </button>
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

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="18" cy="5" r="2.4" />
      <circle cx="6" cy="12" r="2.4" />
      <circle cx="18" cy="19" r="2.4" />
      <path d="M8.2 13.1 15.8 17.4M15.8 6.6 8.2 10.9" />
    </svg>
  );
}
