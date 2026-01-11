// app/(site)/(pages)/about/page.tsx
import type { Metadata } from "next";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import Intro from "./components/Intro";
import AboutTabs from "./components/AboutTabs";
import Philosophy from "./components/Philosophy";
import WhyStelz from "./components/WhyStelz";
import PartnersCarousel from "./components/PartnersCarousel";
import { getRequestLocale } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import type { AboutContentFile } from "@/data/locale/en/AboutContent";

async function loadAboutContent(locale: string): Promise<AboutContentFile> {
  if (locale === "de") {
    return import("@/data/locale/de/AboutContent").then((m) => m.ABOUT_CONTENT);
  }
  return import("@/data/locale/en/AboutContent").then((m) => m.ABOUT_CONTENT);
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const copy = await getPageCopy(locale);
  const meta = copy.about.metadata;
  return buildLocalizedMetadata(locale, {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    images: [meta.ogImage],
    pathname: meta.canonical,
  });
}

export default async function AboutUs() {
  const locale = await getRequestLocale();
  const [copy, aboutContent] = await Promise.all([getPageCopy(locale), loadAboutContent(locale)]);

  return (
    <>
      <PageHeader title={copy.about.header.title} breadcrumbLabel={copy.about.header.breadcrumb} homeLabel={copy.common.homeLabel} />

      <Intro intro={aboutContent.intro} youtube="https://youtu.be/KQBZgdnIpLU" />
      <AboutTabs tabs={aboutContent.tabs} labels={copy.about.tabsLabels} />
      <Philosophy content={aboutContent.philosophy} />
      <WhyStelz why={aboutContent.why} />
      <PartnersCarousel />
    </>
  );
}

