"use client";

import { ActionButtons } from "@/components/ActionButtons";
import { EventDetails } from "@/components/EventDetails";
import { Hero } from "@/components/Hero";
import { MusicToggle } from "@/components/MusicToggle";
import { RosePetals } from "@/components/RosePetals";
import { RsvpForm } from "@/components/RsvpForm";
import { ScrollNav } from "@/components/ScrollNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Timeline } from "@/components/Timeline";
import { EVENT } from "@/lib/event";

export default function HomePage() {
  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-invite-ivory focus:px-4 focus:py-2 focus:shadow-lg"
      >
        Skip to content
      </a>

      <RosePetals density="medium" />

      <ScrollProgress />
      <ScrollNav />

      <main className="relative min-h-dvh overflow-x-hidden bg-invite-ivory">
        <Hero />
        <Timeline />
        <EventDetails />
        <ActionButtons />
        <RsvpForm />

        <footer className="relative border-t border-invite-ivory-gold/30 bg-invite-ivory/95 py-10 text-center backdrop-blur-sm">
          <p className="font-body text-xs tracking-wide text-invite-gray-light">
            With love · {EVENT.bride} & {EVENT.groom}
          </p>
        </footer>
      </main>

      <MusicToggle />
    </>
  );
}
