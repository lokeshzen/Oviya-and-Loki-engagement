"use client";

import { ActionButtons } from "@/components/ActionButtons";
import { EventDetails } from "@/components/EventDetails";
import { Hero } from "@/components/Hero";
import { MusicToggle } from "@/components/MusicToggle";
import { PhotoGallery } from "@/components/PhotoGallery";
import { RsvpForm } from "@/components/RsvpForm";
import { Timeline } from "@/components/Timeline";
import { EVENT } from "@/lib/event";

export default function HomePage() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>

      <main className="relative min-h-dvh overflow-x-hidden bg-invite-cream">
        <div
          className="pointer-events-none fixed inset-0 opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(212,165,116,0.15) 0, transparent 35%), radial-gradient(circle at 85% 85%, rgba(122,31,43,0.05) 0, transparent 40%)",
          }}
        />

        <Hero />
        <Timeline />
        <EventDetails />
        <PhotoGallery />
        <ActionButtons />
        <RsvpForm />

        <footer className="border-t border-invite-gold/20 py-10 text-center">
          <p className="font-body text-xs tracking-wide text-invite-gray-light">
            With love · {EVENT.bride} & {EVENT.groom}
          </p>
        </footer>
      </main>

      <MusicToggle />
    </>
  );
}
