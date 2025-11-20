// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FixedButtons from "@/components/common/FixedButtons";
import CustomCursor from "@/components/common/CustomCursor";
import ScrollRestore from "@/components/common/ScrollRestore";
import { Poppins } from "next/font/google";
import { content } from "@/data/HomeFooterContent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  metadataBase: new URL(content.meta.siteUrl),
  title: content.meta.title,
  description: content.meta.description,
  keywords: [
    "STELZ Multiparking",
    "automated parking",
    "car parking solutions",
    "puzzle parking",
    "stack parking",
    "mechanical parking",
    "parking systems India",
    "Bengaluru parking",
    "space-saving parking",
    "smart parking technology",
  ],
  authors: [{ name: "STELZ MULTIPARKING PVT LTD" }],
  creator: "STELZ MULTIPARKING PVT LTD",
  publisher: "STELZ MULTIPARKING PVT LTD",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: content.meta.siteUrl,
    siteName: "STELZ Multiparking",
    title: content.meta.title,
    description: content.meta.description,
    images: [
      {
        url: content.meta.ogImage,
        width: 1200,
        height: 630,
        alt: "STELZ Multiparking - Engineering Tomorrow's Parking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: [content.meta.ogImage],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* Google Analytics 4 - Replace with your Measurement ID */}
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-white text-neutral-900 font-sans">
        <CustomCursor />
        <Navbar />
          {children}
        <Footer />
        <FixedButtons />
        <ScrollRestore />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "STELZ MULTIPARKING PVT LTD",
              alternateName: "STELZ Multiparking",
              url: content.meta.siteUrl,
              logo: `${content.meta.siteUrl}/assets/Logo.webp`,
              description: content.meta.description,
              address: [
                {
                  "@type": "PostalAddress",
                  addressLocality: "Bengaluru",
                  addressRegion: "Karnataka",
                  postalCode: "560098",
                  streetAddress: content.footer.office.address,
                  addressCountry: "IN",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: content.footer.contact.phone,
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: ["en", "hi"],
              },
              sameAs: [
                content.footer.contact.socials.linkedin,
                content.footer.contact.socials.facebook,
                content.footer.contact.socials.instagram,
                content.footer.contact.socials.youtube,
              ].filter(Boolean),
              founder: {
                "@type": "Organization",
                name: "STELZ MULTIPARKING PVT LTD",
              },
              foundingDate: "2020",
              areaServed: {
                "@type": "Country",
                name: "India",
              },
              knowsAbout: [
                "Automated Parking Systems",
                "Puzzle Parking",
                "Stack Parking",
                "Mechanical Parking",
                "Smart City Solutions",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
