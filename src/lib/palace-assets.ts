export const PALACE_IMAGES = {
  hero: "/assets/palace/palace-hero-backdrop.webp",
  timeline: "/assets/palace/palace-timeline-courtyard.webp",
  eventHall: "/assets/palace/palace-event-hall.webp",
  garden: "/assets/palace/palace-garden-pathway.webp",
  border: "/assets/palace/palace-gold-border.webp",
} as const;

export type PalaceImageKey = keyof typeof PALACE_IMAGES;

export const SECTION_NAV = [
  { id: "hero", label: "Home" },
  { id: "timeline", label: "Timeline" },
  { id: "details", label: "Details" },
  { id: "actions", label: "Actions" },
  { id: "rsvp", label: "RSVP" },
] as const;
