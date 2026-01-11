// app/(site)/page.tsx
import type { Metadata } from "next";
import Hero from "./components/Hero";
import FootprintCarousel from "./components/FootprintCarousel";
import ParkingModelsCarousel, { type ModelItem } from "./components/ParkingModelsCarousel";
import { getRequestLocale } from "@/lib/i18n/locale";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import { SITE_URL } from "@/lib/i18n/config";
import { getFooterContent } from "@/lib/i18n/content";
import { getPageCopy } from "@/lib/i18n/pageCopy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return buildLocalizedMetadata(locale, {
    title: "STELZ Multiparking | Innovative Automated Parking Solutions",
    description:
      "Discover STELZ Multiparking's cutting-edge automated parking systems. Engineering tomorrow's smart parking solutions for modern cities.",
    keywords: [
      "automated parking",
      "parking solutions",
      "mechanical parking systems",
      "smart parking technology",
      "STELZ parking",
    ],
    images: [`${SITE_URL}/assets/home/Logo.webp`],
    pathname: "/",
  });
}

export default async function Home() {
  const locale = await getRequestLocale();
  const [footerModule, copy] = await Promise.all([getFooterContent(locale), getPageCopy(locale)]);
  const footerContent = footerModule.content;
  const heroContent = footerContent?.hero ?? { taglines: [], images: [], highlights: [] };
  const footprintContent = footerContent?.footprint ?? { projects: [] };
  const modelItems = (footerContent.models.items as ModelItem[]) ?? [];

  return (
    <main className="flex flex-col">
      <Hero content={heroContent} />
      <FootprintCarousel
        content={{
          title: copy.home.footprint.title,
          projects: footprintContent.projects ?? [],
          labels: {
            carSpaces: copy.home.footprint.carSpaces,
            location: copy.home.footprint.location,
          },
        }}
      />
      <ParkingModelsCarousel
        items={modelItems}
        title={footerContent.models.title ?? "Parking Models"}
      />
    </main>
  );
}
