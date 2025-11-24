// app/(site)/page.tsx
import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import Hero from "./components/Hero";
import FootprintCarousel from "./components/FootprintCarousel";
import ParkingModelsCarousel from "./components/ParkingModelsCarousel";

export const metadata: Metadata = generatePageMetadata(
  "STELZ Multiparking | Innovative Automated Parking Solutions",
  "Discover STELZ Multiparking's cutting-edge automated parking systems. Engineering tomorrow's smart parking solutions for modern cities.",
  {
    keywords: [
      "automated parking",
      "parking solutions",
      "mechanical parking systems",
      "smart parking technology",
      "STELZ parking",
    ],
    canonicalUrl: "https://stelzparking.com",
    ogImage: "https://stelzparking.com/assets/home/Logo.webp",
    type: "website",
  }
);

export default function Home() {
  return (
    <main className="flex flex-col">
      <Hero />
      <FootprintCarousel />
      <ParkingModelsCarousel />
    </main>
  );
}
