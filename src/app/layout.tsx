import type { Metadata, Viewport } from "next";
import { type ReactNode } from "react";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import { BRAND } from "@/lib/brand";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://3pmcafe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "3PM Cafe · Specialty Coffee, Matcha & Brunch · Vallabh Vidyanagar, Anand, Gujarat",
    template: "%s | 3PM Cafe",
  },
  description:
    "3PM Cafe blends specialty Arabica coffee, ceremonial matcha, artisanal brunch, and peaceful hospitality in Vallabh Vidyanagar, Anand, Gujarat. Dine-in and takeaway, open daily 08:00 – 21:00.",
  keywords: [
    "3PM Cafe",
    "3PM Cafe Anand",
    "Cafe in Vallabh Vidyanagar",
    "Specialty Coffee Gujarat",
    "Matcha Bar Gujarat",
    "Cafe near Ahmedabad Narol Highway",
    "All-day Brunch Kheda",
    "3PM Cafe Menu",
  ],
  authors: [{ name: "3PM Cafe", url: siteUrl }],
  creator: "3PM Cafe",
  publisher: "3PM Cafe",
  formatDetection: {
    telephone: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "3PM Cafe · Specialty Coffee, Matcha & Brunch",
    description:
      "A peaceful neighborhood sanctuary for specialty coffee, ceremonial matcha, and artisanal brunch in Vallabh Vidyanagar, Anand, Gujarat. Open daily 08:00 – 21:00.",
    type: "website",
    url: siteUrl,
    siteName: "3PM Cafe",
    locale: "en_IN",
    images: [
      {
        url: "/images/venue.jpg",
        width: 1200,
        height: 675,
        alt: "3PM Cafe Storefront and Welcoming Ambiance in Vallabh Vidyanagar, Anand, Gujarat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "3PM Cafe · Specialty Coffee, Matcha & Brunch",
    description:
      "A peaceful neighborhood sanctuary for specialty coffee, ceremonial matcha, and artisanal brunch in Vallabh Vidyanagar, Anand, Gujarat. Open daily 08:00 – 21:00.",
    images: ["/images/venue.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07543D",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["CafeOrCoffeeShop", "Restaurant"],
        "@id": `${siteUrl}/#cafe`,
        name: "3PM Cafe",
        url: siteUrl,
        telephone: BRAND.phone,
        priceRange: "₹₹",
        servesCuisine: [
          "Specialty Coffee",
          "Matcha Specialties",
          "All-Day Brunch",
          "Artisanal Desserts",
          "Vegetarian Options",
        ],
        image: `${siteUrl}/images/venue.jpg`,
        logo: `${siteUrl}/images/logo.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "c/o Dawat Restaurant, Ahmedabad-Narol-Kheda Highway",
          addressLocality: "Vallabh Vidyanagar",
          addressRegion: "Gujarat",
          postalCode: "387120",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "22.7533",
          longitude: "72.6841",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "08:00",
            closes: "21:00",
          },
        ],
        hasMap: BRAND.locations[0].maps,
        sameAs: [
          "https://www.instagram.com/__.3pmcafe",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "3PM Cafe",
        inLanguage: ["en", "hi"],
      },
    ],
  };

  return (
    <html lang="en" style={{ backgroundColor: "#f7f5f0" }}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Gaegu:wght@400;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="overflow-x-hidden max-w-full" style={{ backgroundColor: "#f7f5f0", color: "#1e3932" }}>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
