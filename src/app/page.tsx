"use client";

import { ActionButtons } from "@/components/ActionButtons";
import { EventDetails } from "@/components/EventDetails";
import { Hero } from "@/components/Hero";
import { MusicToggle } from "@/components/MusicToggle";
import { RosePetals } from "@/components/RosePetals";
import { RsvpForm } from "@/components/RsvpForm";
import { ScrollDrivenElements } from "@/components/ScrollDrivenElements";
import { ScrollNav } from "@/components/ScrollNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollVelocity } from "@/components/ScrollVelocity";
import { SectionTransition } from "@/components/SectionTransitions";
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
      <ScrollDrivenElements />
      <ScrollVelocity />

      <ScrollProgress />
      <ScrollNav />

      <main className="relative min-h-dvh overflow-x-hidden bg-invite-ivory">
        <Hero />
        <SectionTransition />
        <Timeline />
        <SectionTransition />
        <EventDetails />
        <SectionTransition />
        <ActionButtons />
        <SectionTransition />
        <RsvpForm />

        <footer className="relative border-t border-invite-ivory-gold/30 bg-invite-ivory/95 backdrop-blur-sm overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px footer-gradient-border" />
          </div>
          
          <div className="container-wide py-8 relative">
            {/* Decorative top border */}
            <div className="mx-auto mb-4 w-24 gold-divider view-scale-line" />
            
            {/* Main footer content */}
            <div className="space-y-4 text-center view-fade-up">
              {/* Couple names with elegant styling */}
              <div className="space-y-2">
                <h3 className="font-accent text-4xl sm:text-5xl text-invite-royal-pink footer-couple-glow">
                  {EVENT.bride} & {EVENT.groom}
                </h3>
              </div>
              
              {/* Bottom decorative element */}
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-4">
                  <div className="h-px w-8 bg-invite-ivory-gold/40" />
                  <span className="text-invite-royal-pink text-sm">♡</span>
                  <div className="h-px w-8 bg-invite-ivory-gold/40" />
                </div>
                <p className="font-body text-xs tracking-wider text-invite-gray-light/70">
                  Crafted with love for our special day
                </p>
              </div>
            </div>
          </div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-invite-rose-blush/10 to-transparent pointer-events-none" />
        </footer>
      </main>

      <MusicToggle />
    </>
  );
}
