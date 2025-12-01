import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, type Locale, LOCALE_META, SITE_URL, isLocale } from "./config";
import { stripLocaleFromPath, translatePath } from "./slugMap";

export async function getRequestLocale(): Promise<Locale> {
  // 1) Prefer explicit header/path locale (set by proxy)
  try {
    const hdrs = await headers();
    const headerLocale = hdrs.get("x-locale");
    if (isLocale(headerLocale)) return headerLocale;

    const nextUrl = hdrs.get("next-url") || hdrs.get("x-pathname") || hdrs.get("referer");
    if (nextUrl) {
      const { locale } = stripLocaleFromPath(new URL(nextUrl, "http://localhost").pathname);
      if (isLocale(locale)) return locale;
    }
  } catch {
    // headers() can throw in edge cases (non-requested contexts); fall back silently
  }

  // 2) Fallback to cookie
  try {
    const cookieStore = await cookies();
    const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
    if (isLocale(cookieLocale)) {
      return cookieLocale;
    }
  } catch {
    // cookies() may throw in non-request contexts; ignore
  }

  return DEFAULT_LOCALE;
}

export function getHreflangAlternates(pathname: string) {
  const enPath = translatePath(pathname, "en");
  const dePath = translatePath(pathname, "de");
  return {
    [LOCALE_META.en.hrefLang]: `${SITE_URL}${enPath}`,
    [LOCALE_META.de.hrefLang]: `${SITE_URL}${dePath}`,
  };
}

export function getCanonical(pathname: string, locale: Locale) {
  const localizedPath = translatePath(pathname, locale);
  return `${SITE_URL}${localizedPath}`;
}

export function getLocaleFromPathname(pathname: string): { locale: Locale; cleanedPath: string } {
  const { locale, segments } = stripLocaleFromPath(pathname);
  const cleanedPath = segments.length ? `/${segments.join("/")}` : "/";
  return { locale, cleanedPath };
}
