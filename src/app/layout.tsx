import type { Metadata, Viewport } from "next";
import { Allura, Inter, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { EVENT } from "@/lib/event";
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

const allura = Allura({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
  description: `You are cordially invited to the ${EVENT.title.toLowerCase()} of ${EVENT.bride} & ${EVENT.groom} on ${EVENT.dateLabel} at ${EVENT.venue}.`,
  openGraph: {
    title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
    description: `${EVENT.dateLabel} · ${EVENT.timeLabel} · ${EVENT.venue}. You are cordially invited.`,
    type: "website",
    locale: "en_IN",
    siteName: `${EVENT.bride} & ${EVENT.groom} ${EVENT.title}`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.bride} & ${EVENT.groom} — ${EVENT.title}`,
    description: `${EVENT.dateLabel} · ${EVENT.timeLabel} · ${EVENT.venue}. You are cordially invited.`,
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
    name: EVENT.venue,
    address: EVENT.venue,
  },
  description: `Engagement celebration of ${EVENT.bride} and ${EVENT.groom}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${allura.variable} font-body antialiased`}
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
