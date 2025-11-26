/* eslint-disable @next/next/google-font-preconnect */
// app/layout.tsx
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FixedButtons from "@/components/common/FixedButtons";
import CustomCursor from "@/components/common/CustomCursor";
import ScrollRestore from "@/components/common/ScrollRestore";
import { NetworkClassProvider } from "@/components/common/NetworkClassProvider";
import { Poppins } from "next/font/google";
import { content } from "@/data/HomeFooterContent";
import { viewport as seoViewport } from "@/lib/seo";
import { getNetworkDetectionScript } from "@/lib/network-aware";

/**
 * Font optimization with font-display: swap for better performance
 * Poppins subset to latin only to reduce file size
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap", // Show fallback while font loads
  variable: "--font-sans",
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

/**
 * Viewport optimization for Core Web Vitals
 * Defines device-specific viewport settings and color scheme
 */
export const viewport: Viewport = seoViewport;

/**
 * Root metadata with comprehensive SEO optimization
 * Includes Open Graph, Twitter Cards, and search engine directives
 */
export const metadata: Metadata = {
  metadataBase: new URL(content.meta.siteUrl),
  title: {
    template: "%s | STELZ Multiparking",
    default: content.meta.title,
    absolute: content.meta.title,
  },
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
  applicationName: "STELZ Multiparking",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "STELZ Multiparking",
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
    nocache: false,
  },
  alternates: {
    canonical: content.meta.siteUrl,
    languages: {
      "en-IN": `${content.meta.siteUrl}/en`,
      "hi-IN": `${content.meta.siteUrl}/hi`,
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
        type: "image/webp",
      },
      {
        url: content.meta.ogImage.replace(".webp", ".jpg"),
        width: 1200,
        height: 630,
        alt: "STELZ Multiparking - Engineering Tomorrow's Parking",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: content.meta.title,
    description: content.meta.description,
    images: [content.meta.ogImage],
    creator: "@stelzparking",
    site: "@stelzparking",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* ========== PERFORMANCE & OPTIMIZATION ========== */}

        {/* Network detection script - runs before hydration to prevent layout shift */}
        <script
          dangerouslySetInnerHTML={{
            __html: getNetworkDetectionScript(),
          }}
        />

        {/* DNS Prefetch for critical external resources */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect to critical origins - reduces handshake time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Prefetch Google Analytics - will load later */}
        <link rel="prefetch" href="https://www.googletagmanager.com/gtag/js" as="script" />

        {/* ========== SEO & SOCIAL ========== */}

        {/* Theme color for browser chrome */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Apple Web App metadata */}
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="STELZ Multiparking" />

        {/* Google Analytics 4 - Deferred to afterInteractive for performance */}
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
                    send_page_view: true,
                  });
                `,
              }}
            />
          </>
        )}

        {/* ========== STRUCTURED DATA ========== */}

        {/* Organization schema for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              "@id": content.meta.siteUrl,
              name: "STELZ MULTIPARKING PVT LTD",
              alternateName: "STELZ Multiparking",
              url: content.meta.siteUrl,
              logo: {
                "@type": "ImageObject",
                url: `${content.meta.siteUrl}/assets/Logo.webp`,
                width: 250,
                height: 250,
              },
              image: `${content.meta.siteUrl}/assets/Logo.webp`,
              description: content.meta.description,
              slogan: "Engineering Tomorrow's Parking",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560098",
                streetAddress: content.footer.office.address,
                addressCountry: "IN",
              },
              telephone: content.footer.contact.phone,
              email: content.footer.contact.email,
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
              foundingDate: "2020",
              geo: {
                "@type": "GeoCoordinates",
                latitude: "13.1939",
                longitude: "77.6245",
              },
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
                "Urban Mobility",
              ],
            }),
          }}
        />

        {/* Website schema for search action */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": content.meta.siteUrl,
              name: "STELZ Multiparking",
              url: content.meta.siteUrl,
              description: content.meta.description,
              image: `${content.meta.siteUrl}/assets/Logo.webp`,
            }),
          }}
        />
      </head>

      <body className="bg-white text-neutral-900 font-sans">
        <NetworkClassProvider />
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
        <FixedButtons />
        <ScrollRestore />
      </body>
    </html>
  );
}
