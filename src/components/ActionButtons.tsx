"use client";

import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";
import { EVENT } from "@/lib/event";

export function ActionButtons() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-wrap items-center justify-center gap-3">
      <a
        href={EVENT.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-invite-gold bg-invite-cream px-5 py-2.5 font-serif text-sm text-invite-burgundy shadow-sm transition hover:bg-white"
      >
        Open Maps
      </a>
      <a
        href={googleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full border border-invite-gold bg-invite-cream px-5 py-2.5 font-serif text-sm text-invite-burgundy shadow-sm transition hover:bg-white"
      >
        Google Calendar
      </a>
      <button
        type="button"
        onClick={downloadIcs}
        className="rounded-full border border-invite-gold bg-invite-cream px-5 py-2.5 font-serif text-sm text-invite-burgundy shadow-sm transition hover:bg-white"
      >
        Save .ics
      </button>
    </div>
  );
}
