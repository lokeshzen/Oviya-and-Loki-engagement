import { EVENT } from "@/lib/event";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Format a Date as UTC for Google Calendar / ICS (YYYYMMDDTHHMMSSZ) */
export function toUtcStamp(iso: string): string {
  const d = new Date(iso);
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

export function googleCalendarUrl(): string {
  const text = encodeURIComponent(
    `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`
  );
  const details = encodeURIComponent(
    `You are cordially invited to our ${EVENT.title}.\nVenue: ${EVENT.venue}`
  );
  const location = encodeURIComponent(EVENT.venue);
  const dates = `${toUtcStamp(EVENT.startISO)}/${toUtcStamp(EVENT.endISO)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

export function buildIcs(): string {
  const title = `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Oviya Lokesh Engagement//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${toUtcStamp(EVENT.startISO)}`,
    `DTEND:${toUtcStamp(EVENT.endISO)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:You are cordially invited to our ${EVENT.title}.`,
    `LOCATION:${EVENT.venue}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

export function downloadIcs() {
  const blob = new Blob([buildIcs()], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "oviya-lokesh-engagement.ics";
  a.click();
  URL.revokeObjectURL(url);
}
