import type { Locale } from "./types";

export async function loadLocale(locale: Locale) {
  return locale === "de" ? import("./de") : import("./en");
}
