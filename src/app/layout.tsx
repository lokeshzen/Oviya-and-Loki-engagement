import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Oviya & Lokesh — Engagement",
  description:
    "You are cordially invited to the engagement of Oviya & Lokesh on September 9, 2026 at Hotel Emerald, Ranipet.",
  openGraph: {
    title: "Oviya & Lokesh — Engagement",
    description:
      "September 9, 2026 · 10am · Hotel Emerald, Ranipet. You are cordially invited.",
    type: "website",
    locale: "en_IN",
    siteName: "Oviya & Lokesh Engagement",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oviya & Lokesh — Engagement",
    description:
      "September 9, 2026 · 10am · Hotel Emerald, Ranipet. You are cordially invited.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oviya & Lokesh",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4cfd8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${cormorant.variable} font-serif antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
