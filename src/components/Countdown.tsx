"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/event";

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function getParts(target: number): Parts | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const target = new Date(EVENT.startISO).getTime();
  const [parts, setParts] = useState<Parts | null>(() => getParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(getParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!parts) {
    return (
      <p className="text-center font-serif text-invite-burgundy">
        The celebration has begun!
      </p>
    );
  }

  const cells: [string, number][] = [
    ["Days", parts.days],
    ["Hours", parts.hours],
    ["Mins", parts.minutes],
    ["Secs", parts.seconds],
  ];

  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-3 text-center font-serif text-xs tracking-[0.25em] text-invite-burgundy/70 uppercase">
        Counting down
      </p>
      <div className="grid grid-cols-4 gap-2">
        {cells.map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-invite-gold/40 bg-invite-cream/90 px-2 py-3 text-center shadow-sm"
          >
            <div className="font-serif text-2xl font-semibold text-invite-burgundy tabular-nums">
              {String(value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[0.65rem] tracking-wider text-invite-burgundy/60 uppercase">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
