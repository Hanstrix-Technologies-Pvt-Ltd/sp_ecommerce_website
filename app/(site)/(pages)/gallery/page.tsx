import type { Metadata } from "next";
import PageHeader from "@/app/(site)/components/PageHeader";
import GalleryCarousel from "./components/GalleryCarousel";
import ConceptCarousel from "./components/ConceptCarousel";

export const metadata: Metadata = {
  title: "Gallery | STELZ Multiparking | Project Showcase",
  description:
    "View our impressive gallery of mechanical parking systems, installations, and projects. Explore STELZ Multiparking's innovative parking solutions in action.",
  keywords: [
    "parking gallery",
    "parking projects",
    "parking portfolio",
    "parking installations",
    "parking images",
  ],
  alternates: {
    canonical: "https://stelzparking.com/gallery",
  },
  openGraph: {
    title: "Gallery | STELZ Multiparking",
    description:
      "View our impressive gallery of mechanical parking systems, installations, and projects. Explore innovative parking solutions in action.",
    url: "https://stelzparking.com/gallery",
    type: "website",
    images: [
      {
        url: "https://stelzparking.com/assets/home/Logo.webp",
        width: 1200,
        height: 630,
        alt: "STELZ Multiparking Gallery",
      },
    ],
    siteName: "STELZ Multiparking",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | STELZ Multiparking",
    description:
      "View our impressive gallery of mechanical parking systems, installations, and projects.",
    images: ["https://stelzparking.com/assets/home/Logo.webp"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader title="Gallery" breadcrumbLabel="Gallery" />
      <main className="flex flex-col">
        <GalleryCarousel />
        <ConceptCarousel />
      </main>
    </>
  );
}
