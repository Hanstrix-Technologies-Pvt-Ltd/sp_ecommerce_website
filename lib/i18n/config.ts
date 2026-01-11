export const SUPPORTED_LOCALES = ["en", "de"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META = {
  en: {
    region: "IN",
    label: "English",
    country: "India",
    hrefLang: "en-IN",
  },
  de: {
    region: "DE",
    label: "Deutsch",
    country: "Germany",
    hrefLang: "de-DE",
  },
} as const satisfies Record<Locale, { region: string; label: string; country: string; hrefLang: string }>;

export function isLocale(input: string | null | undefined): input is Locale {
  return SUPPORTED_LOCALES.includes((input ?? "") as Locale);
}

export function normalizeLocale(input?: string | null): Locale {
  if (isLocale(input)) return input;
  return DEFAULT_LOCALE;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stelzparking.com";
