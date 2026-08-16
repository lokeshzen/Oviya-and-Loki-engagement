export const EVENT = {
  bride: "Oviya",
  groom: "Lokesh",
  title: "Engagement",
  blessing: "Murugan Thunai",
  dateLabel: "September 9, 2026",
  timeLabel: "10am",
  venue: "Hotel Emerald, Ranipet",
  /** Event start in IST (UTC+5:30) */
  startISO: "2026-09-09T10:00:00+05:30",
  endISO: "2026-09-09T14:00:00+05:30",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    "https://www.google.com/maps/search/?api=1&query=Hotel+Emerald+Ranipet",
} as const;

export const COLORS = {
  pink: "#f4cfd8",
  cream: "#fbf6ee",
  burgundy: "#7a1f2b",
  gold: "#c9a227",
  goldSoft: "#e8d5a3",
} as const;
