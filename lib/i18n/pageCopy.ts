import type { Locale } from "./config";

export async function getPageCopy(locale: Locale) {
  if (locale === "de") {
    return import("@/data/locale/de/PageCopy").then((m) => m.pageCopy);
  }
  return import("@/data/locale/en/PageCopy").then((m) => m.pageCopy);
}
