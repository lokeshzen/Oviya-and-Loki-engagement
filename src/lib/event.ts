export const EVENT = {
  bride: "Oviya",
  groom: "Lokesh",
  title: "Wedding",
  dateLabel: "November 15, 2026",
  timeLabel: "6:00–7:30 am",
  venue: "Rangalaya Royal, Katpadi, Vellore",
  venueQr: "/assets/venue-qr.jpg",
  /** Wedding start in IST (UTC+5:30) */
  startISO: "2026-11-15T06:00:00+05:30",
  endISO: "2026-11-15T07:30:00+05:30",
  mapsUrl:
    process.env.NEXT_PUBLIC_MAPS_URL ||
    "https://www.google.com/maps/search/?api=1&query=Rangalaya+Royal+Katpadi+Vellore",
} as const;

export const RECEPTION = {
  title: "Wedding Reception",
  dateLabel: "November 14, 2026",
  timeLabel: "7:00 pm",
  venue: EVENT.venue,
  startISO: "2026-11-14T19:00:00+05:30",
  /** Calendar end only — invitation shows 7:00 pm */
  endISO: "2026-11-14T22:00:00+05:30",
} as const;

export const COLORS = {
  royalPink: "#0B3A6A",
  royalPurple: "#061E3A",
  ivory: "#FEFCF8",
  ivoryGold: "#C9A227",
  champagne: "#F3E6C4",
  deepPlum: "#061E3A",
  roseBlush: "#E7EEF6",
  petalLight: "#F3E6C4",
  petalMid: "#0B3A6A",
  gray: "#4A5A6E",
  grayLight: "#5F6E80",
} as const;
