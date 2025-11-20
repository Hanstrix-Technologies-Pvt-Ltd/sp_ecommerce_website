// app/(site)/(pages)/about/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";
import Intro from "./components/Intro";
import AboutTabs from "./components/AboutTabs";
import Philosophy from "./components/Philosophy";
import WhyStelz from "./components/WhyStelz";
import PartnersCarousel from "./components/PartnersCarousel";
import ABOUT_CONTENT from "@/data/AboutContent";
import { JSX } from "react";

export const metadata: Metadata = {
  title: "About Us | STELZ Multiparking | Innovative Parking Solutions",
  description:
    "Learn about STELZ Multiparking's mission, vision, and commitment to providing innovative, automated parking solutions for modern urban spaces.",
  keywords: [
    "about STELZ",
    "parking company",
    "STELZ mission",
    "automated parking solutions",
    "mechanical parking systems",
  ],
  alternates: { canonical: "https://stelzparking.com/about" },
  openGraph: {
    title: "About Us | STELZ Multiparking",
    description:
      "Learn about STELZ Multiparking's mission, vision, and commitment to providing innovative, automated parking solutions.",
    url: "https://stelzparking.com/about",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/home/Logo.webp",
        width: 1200,
        height: 630,
        alt: "STELZ Multiparking Logo",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | STELZ Multiparking",
    description:
      "Learn about STELZ Multiparking's mission, vision, and commitment to providing innovative, automated parking solutions.",
    images: ["https://stelzparking.com/assets/home/Logo.webp"],
  },
};

export default function AboutUs(): JSX.Element {
  return (
    <>
      <PageHeader title="About Us" breadcrumbLabel="Who We Are" />

      {/* Intro block */}
      <Intro
        intro={ABOUT_CONTENT.intro}
        youtube="https://youtu.be/KQBZgdnIpLU"
      />
      <AboutTabs />
      <Philosophy />
      <WhyStelz />
      <PartnersCarousel />
      {/* (Next: mount Tabs, Philosophy, Why, Clients...) */}
    </>
  );
}
