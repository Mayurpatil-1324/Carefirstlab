import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LAB_DETAILS } from "@/data/labData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "CareFirst Pathology Laboratory | 24/7 Diagnostics & Blood Tests in Ambegaon, Pune",
    template: "%s | CareFirst Pathology Laboratory Pune",
  },
  description:
    "CareFirst Pathology Laboratory at Jijamata Chowk, Ambegaon Pathar, Pune. Open 24 Hours. Rated 5.0 on Google (82 reviews). Routine blood tests, CBC, Diabetes, Lipid, Thyroid, Dengue & doorstep home sample collection.",
  keywords: [
    "Pathology Lab Ambegaon Pune",
    "CareFirst Pathology Laboratory",
    "Blood Test Ambegaon Pathar",
    "24 hours Pathology lab Pune",
    "Home Blood Collection Katraj Ambegaon Pune",
    "CBC Test Ambegaon",
    "Thyroid test Pune",
    "Diabetes Blood Test Ambegaon Budruk",
    "Dengue Test 24 hours Pune",
    "Diagnostic Center Jijamata Chowk",
  ],
  authors: [{ name: "CareFirst Pathology Laboratory" }],
  openGraph: {
    title: "CareFirst Pathology Laboratory | 24/7 Diagnostics in Pune",
    description:
      "Reliable diagnostic testing, routine blood tests, health packages, and doorstep sample collection. Open 24 Hours at Jijamata Chowk, Ambegaon Pathar, Pune. Rated 5.0 on Google.",
    url: "https://carefirstlab.in",
    siteName: "CareFirst Pathology Laboratory",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://carefirstlab.in",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": LAB_DETAILS.name,
    "alternateName": "Care First Pathology Lab",
    "image": "https://carefirstlab.in/carefirst-lab-banner.jpg",
    "telephone": LAB_DETAILS.contact.phone,
    "url": "https://carefirstlab.in",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sr. No. 28, Jijamata Chowk, in front of Ambegaon Pathar Police Chowky",
      "addressLocality": "Ambegaon Pathar, Ambegaon Budruk",
      "addressRegion": "Maharashtra",
      "postalCode": "411046",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.4554832,
      "longitude": 73.8469665
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "82",
      "bestRating": "5"
    },
    "medicalSpecialty": [
      "Pathology",
      "Clinical Pathology",
      "Hematology",
      "Biochemistry"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-slate-900`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
