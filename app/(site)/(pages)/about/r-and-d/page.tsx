// app/(site)/(pages)/about/r-and-d/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";
import Hero from "./components/Hero";
import Tabs from "./components/Tabs";

export const metadata: Metadata = {
  title: "Research & Development | STELZ Multiparking | Innovation Lab",
  description:
    "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems and smart urban parking solutions.",
  keywords: [
    "R&D parking",
    "parking innovation",
    "research development",
    "automatic parking",
    "parking technology",
  ],
  alternates: {
    canonical: "https://stelzparking.com/about/r-and-d",
  },
  openGraph: {
    title: "Research & Development | STELZ Multiparking",
    description:
      "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems.",
    url: "https://stelzparking.com/about/r-and-d",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/home/Logo.webp",
        width: 1200,
        height: 630,
        alt: "STELZ Research & Development",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research & Development | STELZ Multiparking",
    description:
      "Explore STELZ Multiparking's research and development initiatives driving innovation in automated, mechanical parking systems.",
    images: ["https://stelzparking.com/assets/home/Logo.webp"],
  },
};

export default function RAndDPage() {
  return (
    <>
      <PageHeader title="R & D" breadcrumbLabel="R & D" />
      <main className="bg-white">
        <Hero />
        <Tabs />
      </main>
    </>
  );
}
