// app/(site)/(pages)/about/r-and-d/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import Hero from "./components/Hero";
import Tabs from "./components/Tabs";
import { getRequestLocale } from "@/lib/i18n/locale";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import type { RAndDContent } from "@/data/locale/en/R&DContent";

async function loadRandDContent(locale: string): Promise<RAndDContent> {
  if (locale === "de") {
    return import("@/data/locale/de/R&DContent").then((m) => m.rANDd);
  }
  return import("@/data/locale/en/R&DContent").then((m) => m.rANDd);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.aboutRandD.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function RAndDPage() {
  const locale = await getRequestLocale();
  const [copy, content] = await Promise.all([getPageCopy(locale), loadRandDContent(locale)]);

  return (
    <>
      <PageHeader title={copy.aboutRandD.header.title} breadcrumbLabel={copy.aboutRandD.header.breadcrumb} homeLabel={copy.common.homeLabel} />
      <main className="bg-white">
        <Hero content={content} />
        <Tabs content={content.sections} />
      </main>
    </>
  );
}
