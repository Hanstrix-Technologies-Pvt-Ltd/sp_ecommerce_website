/* eslint-disable @next/next/google-font-preconnect */
// app/layout.tsx
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FixedButtons from "@/components/common/FixedButtons";
import CustomCursor from "@/components/common/CustomCursor";
import ScrollRestore from "@/components/common/ScrollRestore";
import AnalyticsConsent from "@/components/common/AnalyticsConsent";
import { NetworkClassProvider } from "@/components/common/NetworkClassProvider";
import { Poppins } from "next/font/google";
import { viewport as seoViewport } from "@/lib/seo";
import { getNetworkDetectionScript } from "@/lib/network-aware";
import { getRequestLocale, getHreflangAlternates, getCanonical } from "@/lib/i18n/locale";
import { LOCALE_META, SITE_URL, type Locale } from "@/lib/i18n/config";
import { getFooterContent, getNavContent } from "@/lib/i18n/content";
import type { NavLink } from "@/data/locale/en/NavContent";

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
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const footerModule = await getFooterContent(locale);
  const meta = footerModule.content.meta;

  const canonical = getCanonical("/", locale);
  const alternates = getHreflangAlternates("/");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: "%s | STELZ Multiparking",
      default: meta.title,
      absolute: meta.title,
    },
    description: meta.description,
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
      canonical,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale: `${locale}_${LOCALE_META[locale].region}`,
      url: canonical,
      siteName: "STELZ Multiparking",
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: meta.ogImage.startsWith("http") ? meta.ogImage : `${SITE_URL}${meta.ogImage}`,
          width: 1200,
          height: 630,
          alt: "STELZ Multiparking - Engineering Tomorrow's Parking",
          type: "image/webp",
        },
        {
          url: meta.ogImage.replace(".webp", ".jpg").startsWith("http")
            ? meta.ogImage.replace(".webp", ".jpg")
            : `${SITE_URL}${meta.ogImage.replace(".webp", ".jpg")}`,
          width: 1200,
          height: 630,
          alt: "STELZ Multiparking - Engineering Tomorrow's Parking",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage.startsWith("http") ? meta.ogImage : `${SITE_URL}${meta.ogImage}`],
      creator: "@stelzparking",
      site: "@stelzparking",
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const locale: Locale = await getRequestLocale();
  const [navModule, footerModule] = await Promise.all([getNavContent(locale), getFooterContent(locale)]);
  const navItems = navModule.NAV as NavLink[];
  const footerContent = footerModule.content;

  return (
    <html lang={locale} className={poppins.variable}>
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

        {/* ========== SEO & SOCIAL ========== */}

        {/* Theme color for browser chrome */}
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

        {/* Apple Web App metadata */}
        <meta name="apple-mobile-web-app-capable" content="true" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="STELZ Multiparking" />

        {/* ========== STRUCTURED DATA ========== */}

        {/* Organization schema for Google Knowledge Panel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "LocalBusiness"],
              "@id": SITE_URL,
              name: "STELZ MULTIPARKING PVT LTD",
              alternateName: "STELZ Multiparking",
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/assets/Logo.webp`,
                width: 250,
                height: 250,
              },
              image: `${SITE_URL}/assets/Logo.webp`,
              description: footerContent.meta.description,
              slogan: "Engineering Tomorrow's Parking",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560098",
                streetAddress: footerContent.footer.office.address,
                addressCountry: "IN",
              },
              telephone: footerContent.footer.contact.phone,
              email: footerContent.footer.contact.email,
              contactPoint: {
                "@type": "ContactPoint",
                telephone: footerContent.footer.contact.phone,
                contactType: "Customer Service",
                areaServed: "IN",
                availableLanguage: ["en", "hi"],
              },
              sameAs: [
                footerContent.footer.contact.socials.linkedin,
                footerContent.footer.contact.socials.facebook,
                footerContent.footer.contact.socials.instagram,
                footerContent.footer.contact.socials.youtube,
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
              "@id": SITE_URL,
              name: "STELZ Multiparking",
              url: SITE_URL,
              description: footerContent.meta.description,
              image: `${SITE_URL}/assets/Logo.webp`,
            }),
          }}
        />
      </head>

      <body className="bg-white text-neutral-900 font-sans">
        <NetworkClassProvider />
        <CustomCursor />
        <Navbar locale={locale} nav={navItems} />
        {children}
        <Footer content={footerContent} />
        <AnalyticsConsent gaId={gaId} />
        <FixedButtons />
        <ScrollRestore />
      </body>
    </html>
  );
}
