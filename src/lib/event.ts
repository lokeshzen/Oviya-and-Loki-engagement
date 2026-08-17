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
  roseGold: "#D4A574",
  burgundy: "#7A1F2B",
  cream: "#FAF7F2",
  gold: "#C9A227",
  goldSoft: "#E8D5A3",
  charcoal: "#2D2D2D",
  gray: "#6B6560",
  grayLight: "#A39E98",
  blush: "#F5E6E0",
} as const;

export const TIMELINE_MILESTONES = [
  {
    label: "Save the Date",
    date: "August 2026",
    description: "Our engagement celebration is on the horizon.",
  },
  {
    label: "Engagement Day",
    date: "September 2026",
    description: "The day we begin our forever together.",
    highlight: true,
  },
  {
    label: "Wedding Bells",
    date: "Coming Soon",
    description: "The next chapter of our journey together.",
  },
] as const;
