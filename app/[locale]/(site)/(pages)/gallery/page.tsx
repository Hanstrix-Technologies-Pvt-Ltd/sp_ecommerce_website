import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import GalleryCarousel from "./components/GalleryCarousel";
import ConceptCarousel from "./components/ConceptCarousel";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";

async function loadGalleryContent(locale: string) {
  if (locale === "de") {
    return import("@/data/locale/de/GalleryContent").then((m) => m.content);
  }
  return import("@/data/locale/en/GalleryContent").then((m) => m.content);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.gallery.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function GalleryPage() {
  const locale = await getRequestLocale();
  const [copy, galleryContent] = await Promise.all([getPageCopy(locale), loadGalleryContent(locale)]);

  return (
    <>
      <PageHeader title={copy.gallery.header.title} breadcrumbLabel={copy.gallery.header.breadcrumb} homeLabel={copy.common.homeLabel} />
      <main className="flex flex-col">
        <GalleryCarousel content={{ gallery: galleryContent.gallery }} />
        <ConceptCarousel content={{ concepts: galleryContent.concepts }} />
      </main>
    </>
  );
}
