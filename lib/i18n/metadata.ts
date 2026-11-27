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

const BRAND = "STELZ Multiparking";

/**
 * The root layout's title template appends " | STELZ Multiparking". Many page titles already
 * end with it (or contain the brand), which produced titles like
 * "About Us | STELZ Multiparking | Innovative Parking Solutions | STELZ Multiparking" that
 * Google cuts off. Drop a trailing brand, and if the brand is still in the title use it as-is
 * (absolute) instead of letting the template add it again.
 */
function pageTitle(raw: string): { tag: Metadata["title"]; text: string } {
  const text = raw.replace(/\s*\|\s*STELZ Multiparking\s*$/i, "").trim();
  return /stelz/i.test(text) ? { tag: { absolute: text }, text } : { tag: text, text: `${text} | ${BRAND}` };
}

export function buildLocalizedMetadata(locale: Locale, base: BaseMeta): Metadata {
  const { tag: titleTag, text: fullTitle } = pageTitle(base.title);
  const canonical = getCanonical(base.pathname, locale);
  const alternates = getHreflangAlternates(base.pathname);
  const normalizedImages = base.images?.map((url) => (url.startsWith("http") ? url : `${SITE_URL}${url}`));
  const ogImages = normalizedImages?.map((url) => ({
    url,
    width: 1200,
    height: 630,
  }));

  return {
    title: titleTag,
    description: base.description,
    keywords: base.keywords ? [...base.keywords] : undefined,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: fullTitle,
      description: base.description,
      url: canonical,
      locale: `${locale}_${LOCALE_META[locale].region}`,
      siteName: "STELZ Multiparking",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: base.description,
      images: normalizedImages,
    },
  };
}
