import type { Metadata } from "next";
import { getCanonical, getHreflangAlternates } from "./locale";
import { LOCALE_META, type Locale, SITE_URL } from "./config";

type BaseMeta = {
  title: string;
  description: string;
  keywords?: readonly string[];
  images?: string[];
  pathname: string;
};

export function buildLocalizedMetadata(locale: Locale, base: BaseMeta): Metadata {
  const canonical = getCanonical(base.pathname, locale);
  const alternates = getHreflangAlternates(base.pathname);
  const normalizedImages = base.images?.map((url) => (url.startsWith("http") ? url : `${SITE_URL}${url}`));
  const ogImages = normalizedImages?.map((url) => ({
    url,
    width: 1200,
    height: 630,
  }));

  return {
    title: base.title,
    description: base.description,
    keywords: base.keywords ? [...base.keywords] : undefined,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: base.title,
      description: base.description,
      url: canonical,
      locale: `${locale}_${LOCALE_META[locale].region}`,
      siteName: "STELZ Multiparking",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: base.title,
      description: base.description,
      images: normalizedImages,
    },
  };
}
