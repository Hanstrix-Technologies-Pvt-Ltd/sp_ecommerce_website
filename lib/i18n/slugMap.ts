import { DEFAULT_LOCALE, type Locale, SUPPORTED_LOCALES, isLocale } from "./config";

type SegmentMap = Record<string, Partial<Record<Locale, string>>>;

/**
 * Base (English) -> localized segments.
 * Keep values 1:1 by default; override where German slug must differ.
 */
const SEGMENT_MAP: SegmentMap = {
  "": { de: "" },
  about: { de: "uber-uns" },
  "r-and-d": { de: "forschung-und-entwicklung" },
  blog: { de: "blog" },
  services: { de: "dienstleistungen" },
  products: { de: "produkte" },
  portfolios: { de: "referenzen" },
  clients: { de: "kunden" },
  gallery: { de: "galerie" },
  contact: { de: "kontakt" },
  stack: { de: "stapel" },
  puzzle: { de: "puzzle" },
  automatic: { de: "automatik" },
  // Product slugs
  "stack-parking": { de: "stack-parkieren" },
  "3-level-stack-parking": { de: "3-eben-stack-parkieren" },
  "pit-stacker": { de: "gruben-stapler" },
  "3-level-pit-stacker": { de: "3-eben-gruben-stapler" },
  "cantilever-parking": { de: "kragarm-parkierung" },
  "puzzle-parking": { de: "puzzle-parkierung" },
  "3-level-pit-puzzle": { de: "3-eben-gruben-puzzle" },
  "op-01": { de: "op-01" },
  "car-hoist": { de: "auto-aufzug" },
  rotary: { de: "rotations-parkhaus" },
  "turn-table": { de: "drehplattform" },
};

const toLocalized = new Map<Locale, Map<string, string>>();
const toBase = new Map<Locale, Map<string, string>>();

SUPPORTED_LOCALES.forEach((locale) => {
  toLocalized.set(locale, new Map<string, string>());
  toBase.set(locale, new Map<string, string>());
});

Object.entries(SEGMENT_MAP).forEach(([base, localizedMap]) => {
  SUPPORTED_LOCALES.forEach((locale) => {
    const translated = localizedMap[locale];
    if (translated) {
      toLocalized.get(locale)!.set(base, translated);
      toBase.get(locale)!.set(translated, base);
    } else {
      // fall back to same segment
      toLocalized.get(locale)!.set(base, base);
      toBase.get(locale)!.set(base, base);
    }
  });
});

function translateSegment({
  segment,
  from,
  to,
}: {
  segment: string;
  from: Locale;
  to: Locale;
}): string {
  if (from === to) return segment;

  // Normalize into base (English), then to target
  const base = from === DEFAULT_LOCALE ? segment : toBase.get(from)!.get(segment) ?? segment;
  if (to === DEFAULT_LOCALE) return base;
  return toLocalized.get(to)!.get(base) ?? base;
}

/**
 * Translate any pathname between locales while preserving/adding the locale prefix.
 * Examples:
 *  - /about -> /de/uber-uns
 *  - /de/referenzen/stapel/stack-parkieren -> /portfolios/stack/stack-parking
 */
export function translatePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = isLocale(maybeLocale ?? "");
  const fromLocale: Locale = hasLocale ? (maybeLocale as Locale) : DEFAULT_LOCALE;
  const rest = hasLocale ? segments.slice(1) : segments;

  const translatedSegments = rest.map((segment) => translateSegment({ segment, from: fromLocale, to: targetLocale }));

  const prefix = targetLocale === DEFAULT_LOCALE ? "" : `/${targetLocale}`;
  const path = translatedSegments.join("/");
  return path ? `${prefix}/${path}` : prefix || "/";
}

export function stripLocaleFromPath(pathname: string): { locale: Locale; segments: string[] } {
  const parts = pathname.split("/").filter(Boolean);
  const maybeLocale = parts[0];
  const hasLocale = isLocale(maybeLocale ?? "");
  const locale: Locale = hasLocale ? (maybeLocale as Locale) : DEFAULT_LOCALE;
  const segments = hasLocale ? parts.slice(1) : parts;
  return { locale, segments };
}

export function translateSegments(
  segments: string[],
  from: Locale,
  to: Locale
): string[] {
  return segments.map((segment) => translateSegment({ segment, from, to }));
}
