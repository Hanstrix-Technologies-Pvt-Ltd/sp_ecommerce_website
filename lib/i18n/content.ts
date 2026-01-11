import type { Locale } from "./config";

type ModuleLoaders = {
  nav: () => Promise<typeof import("@/data/locale/en/NavContent")>;
  footer: () => Promise<typeof import("@/data/locale/en/HomeFooterContent")>;
};

const EN_MODULES: ModuleLoaders = {
  nav: () => import("@/data/locale/en/NavContent"),
  footer: () => import("@/data/locale/en/HomeFooterContent"),
};

const DE_MODULES: ModuleLoaders = {
  nav: () => import("@/data/locale/de/NavContent"),
  footer: () => import("@/data/locale/de/HomeFooterContent"),
};

const localeLoaders: Record<Locale, ModuleLoaders> = {
  en: EN_MODULES,
  de: DE_MODULES,
};

export async function getNavContent(locale: Locale) {
  return localeLoaders[locale].nav();
}

export async function getFooterContent(locale: Locale) {
  return localeLoaders[locale].footer();
}

export async function getContent(locale: Locale) {
  const [nav, footer] = await Promise.all([getNavContent(locale), getFooterContent(locale)]);
  return { nav, footer };
}
