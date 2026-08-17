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
  royalPink: "#B8336A",
  royalPurple: "#6B1E3C",
  ivory: "#FEFCF8",
  ivoryGold: "#E6D7B8",
  champagne: "#F4E8D0",
  deepPlum: "#3A2A3E",
  roseBlush: "#F8E8F0",
  petalLight: "#E8A0BF",
  petalMid: "#D4688E",
  gray: "#7A6B7E",
  grayLight: "#A89AAD",
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
