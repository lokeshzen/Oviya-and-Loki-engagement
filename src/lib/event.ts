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
  hostFather: "Mr. K. Murali",
  hostMother: "Mrs. M. Mekhala",
  hostRelation: "elder son",
  invitationLine:
    "We request the pleasure of your presence, with your family, and your blessings on the auspicious occasion of our wedding.",
  brideFather: "Mr. P. Sivaraman",
  brideMother: "Mrs. S. Jayaseela",
  complimentsFrom: "Dr. M. Rakesh, MBBS, and Er. S. Abinesh",
  complimentsLine:
    "With best compliments from\nDr. M. Rakesh, MBBS\nand\nEr. S. Abinesh.",
  contacts: [
    {
      name: "Dr. M. Rakesh, MBBS",
      phone: "+919994684038",
      display: "99946 84038",
    },
    {
      name: "Er. S. Abinesh",
      phone: "+919600817049",
      display: "96008 17049",
    },
  ],
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

export const WELCOME = {
  heading: "We welcome you",
  body: "Dear family and friends, having you by our side makes this beautiful journey even more meaningful. We are filled with joy as we look forward to celebrating this special occasion with you.",
} as const;

export const SCHEDULE = [
  {
    date: RECEPTION.dateLabel,
    time: RECEPTION.timeLabel,
    title: RECEPTION.title,
  },
  {
    date: EVENT.dateLabel,
    time: EVENT.timeLabel,
    title: EVENT.title,
  },
] as const;

export const COLORS = {
  royalPink: "#8E2436",
  royalPurple: "#3E241C",
  ivory: "#FEFCF8",
  ivoryGold: "#C4A05A",
  champagne: "#F3E6C4",
  deepPlum: "#3E241C",
  roseBlush: "#F6EDE0",
  petalLight: "#F3E6C4",
  petalMid: "#8E2436",
  gray: "#4A5A6E",
  grayLight: "#5F6E80",
} as const;
