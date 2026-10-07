import type { Metadata, Viewport } from "next";
import {
  Beau_Rivage,
  Cinzel,
  Cormorant_Garamond,
  Imperial_Script,
  Inter,
  Ovo,
  Playfair_Display,
} from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { EVENT, RECEPTION } from "@/lib/event";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const beauRivage = Beau_Rivage({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-beau-rivage",
  display: "swap",
});

const imperialScript = Imperial_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-imperial-script",
  display: "swap",
});

const ovo = Ovo({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ovo",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
  description: `You are cordially invited to the wedding and reception of ${EVENT.bride} & ${EVENT.groom} on ${RECEPTION.dateLabel} and ${EVENT.dateLabel} at ${EVENT.venue}.`,
  openGraph: {
    title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
    description: `Reception ${RECEPTION.dateLabel} · ${RECEPTION.timeLabel}. Wedding ${EVENT.dateLabel} · ${EVENT.timeLabel}. ${EVENT.venue}. You are cordially invited.`,
    type: "website",
    locale: "en_IN",
    siteName: `${EVENT.bride} & ${EVENT.groom} ${EVENT.title}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
    description: `Reception ${RECEPTION.dateLabel} · ${RECEPTION.timeLabel}. Wedding ${EVENT.dateLabel} · ${EVENT.timeLabel}. ${EVENT.venue}. You are cordially invited.`,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: `${EVENT.bride} & ${EVENT.groom}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#FEFCF8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
  startDate: EVENT.startISO,
  endDate: EVENT.endISO,
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: EVENT.venueHall,
    address: EVENT.address,
  },
  description: `Wedding celebration of ${EVENT.bride} and ${EVENT.groom}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${beauRivage.variable} ${imperialScript.variable} ${ovo.variable} ${cormorant.variable} ${cinzel.variable} font-body antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
