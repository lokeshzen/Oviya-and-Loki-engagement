const VENUE_HALL = "Rangalaya Thirumana Mandapam";
const VENUE_ADDRESS =
  "No. 60, Vellore – Katpadi Main Road, Gandhi Nagar, Katpadi, Vellore – 632 006";
const MAPS_QUERY = `${VENUE_HALL}, ${VENUE_ADDRESS}`;

export const EVENT = {
  bride: "Oviya",
  groom: "Lokesh",
  brideFormal: "S. Oviya",
  groomFormal: "M. Lokesh",
  brideCredentials: "M.Sc., B.Ed.",
  groomCredentials: "M.Tech., Ph.D.",
  title: "Wedding",
  dateLabel: "Sunday, 15 November 2026",
  timeLabel: "6:00–7:30 am",
  venueHall: VENUE_HALL,
  venue: `${VENUE_HALL}, Katpadi, Vellore`,
  address: VENUE_ADDRESS,
  venueQr: "/assets/venue-qr.jpg",
  /** Wedding start in IST (UTC+5:30) */
  startISO: "2026-11-15T06:00:00+05:30",
  endISO: "2026-11-15T07:30:00+05:30",
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAPS_QUERY)}`,
} as const;

export const FAMILY = {
  hostFather: "Mr. K. Murali, B.Sc., DMLT",
  hostMother: "Mrs. M. Megala, B.Sc.",
  hostRelation: "elder son",
  invitationLine:
    "We cordially solicit your esteemed presence and blessings with family and friends on the auspicious occasion of the marriage of our elder son",
  brideFather: "Mr. P. Sivaraman",
  brideMother: "Mrs. S. Jayaseela",
  complimentsFrom: "Dr. M. Rakesh, MBBS.",
  complimentsLine: "With best compliments from Dr. M. Rakesh, MBBS.",
} as const;

export const RECEPTION = {
  title: "Wedding Reception",
  dateLabel: "Saturday, 14 November 2026",
  timeLabel: "6:30 pm onwards",
  venue: EVENT.venue,
  startISO: "2026-11-14T18:30:00+05:30",
  /** Calendar end only — invitation shows 6:30 pm onwards */
  endISO: "2026-11-14T21:30:00+05:30",
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
