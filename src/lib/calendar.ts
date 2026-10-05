import { EVENT, RECEPTION } from "@/lib/event";

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

const BOTH_EVENTS_DETAILS = `You are cordially invited.

Reception: ${RECEPTION.dateLabel} · ${RECEPTION.timeLabel}
Wedding: ${EVENT.dateLabel} · ${EVENT.timeLabel}
Venue: ${EVENT.venue}`;

function calendarUrl(title: string, startISO: string, endISO: string): string {
  const text = encodeURIComponent(title);
  const details = encodeURIComponent(BOTH_EVENTS_DETAILS);
  const location = encodeURIComponent(EVENT.venue);
  const dates = `${toUtcStamp(startISO)}/${toUtcStamp(endISO)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
}

export function googleCalendarUrl(): string {
  return calendarUrl(
    `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
    EVENT.startISO,
    EVENT.endISO
  );
}

export function googleCalendarReceptionUrl(): string {
  return calendarUrl(
    `${EVENT.bride} & ${EVENT.groom} — ${RECEPTION.title}`,
    RECEPTION.startISO,
    RECEPTION.endISO
  );
}

function vevent(summary: string, startISO: string, endISO: string): string[] {
  return [
    "BEGIN:VEVENT",
    `DTSTART:${toUtcStamp(startISO)}`,
    `DTEND:${toUtcStamp(endISO)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${BOTH_EVENTS_DETAILS.replace(/\n/g, "\\n")}`,
    `LOCATION:${EVENT.venue}`,
    "END:VEVENT",
  ];
}

export function buildIcs(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Oviya Lokesh Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...vevent(
      `${EVENT.bride} & ${EVENT.groom} — ${RECEPTION.title}`,
      RECEPTION.startISO,
      RECEPTION.endISO
    ),
    ...vevent(
      `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
      EVENT.startISO,
      EVENT.endISO
    ),
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
  a.download = "oviya-lokesh-wedding.ics";
  a.click();
  URL.revokeObjectURL(url);
}
