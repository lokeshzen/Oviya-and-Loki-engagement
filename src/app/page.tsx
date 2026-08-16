"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ActionButtons } from "@/components/ActionButtons";
import { Countdown } from "@/components/Countdown";
import { Envelope } from "@/components/Envelope";
import { InviteCard } from "@/components/InviteCard";
import { MusicToggle } from "@/components/MusicToggle";
import { Petals } from "@/components/Petals";
import { RsvpForm } from "@/components/RsvpForm";

export default function HomePage() {
  const [opened, setOpened] = useState(false);

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-invite-pink">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0, transparent 40%), radial-gradient(circle at 80% 10%, rgba(255,182,193,0.5) 0, transparent 35%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.4) 0, transparent 45%)",
        }}
      />
      <Petals count={opened ? 22 : 10} />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-10 sm:px-6">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.div
              key="envelope"
              className="flex flex-1 flex-col items-center justify-center"
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.45 }}
            >
              <Envelope onOpen={() => setOpened(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="invite"
              className="flex flex-col gap-10 pb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <InviteCard />
              <Countdown />
              <ActionButtons />
              <RsvpForm />
              <p className="pb-4 text-center font-serif text-xs tracking-wide text-invite-burgundy/50">
                With love · Oviya & Lokesh
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MusicToggle unlocked={opened} />
    </main>
  );
}
