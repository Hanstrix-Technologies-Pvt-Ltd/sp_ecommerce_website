import type { MetadataRoute } from "next";
import { translatePath } from "@/lib/i18n/slugMap";
import type { Locale } from "@/lib/i18n/config";
import { PRODUCTS as EN_PRODUCTS } from "@/data/locale/en/Products";
import { PRODUCTS as DE_PRODUCTS } from "@/data/locale/de/Products";

const locales: Locale[] = ["en", "de"];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://stelzparking.com";
const now = new Date();

function localizedEntries(
  pathname: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
) {
  return locales.map((locale) => ({
    url: `${baseUrl}${locale === "en" ? pathname : translatePath(pathname, locale)}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    ...localizedEntries("/", "weekly", 1.0),
    ...localizedEntries("/about", "monthly", 0.8),
    ...localizedEntries("/about/r-and-d", "monthly", 0.7),
    ...localizedEntries("/about/blog", "weekly", 0.6),
    ...localizedEntries("/products", "monthly", 0.9),
    ...localizedEntries("/services", "monthly", 0.8),
    ...localizedEntries("/clients", "monthly", 0.7),
    ...localizedEntries("/gallery", "monthly", 0.7),
    ...localizedEntries("/contact", "monthly", 0.8),
  ];

  const productPages: MetadataRoute.Sitemap = locales.flatMap((locale) => {
    const list = locale === "de" ? DE_PRODUCTS : EN_PRODUCTS;
    return list.map((product) => ({
      url: `${baseUrl}${locale === "en" ? product.path : translatePath(product.path, locale)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  });

  return [...staticPages, ...productPages];
}
