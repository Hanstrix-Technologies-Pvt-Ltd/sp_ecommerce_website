// Product page frame: banner, product content and the sidebar.
// Rendered on the server: it used to be a client component that loaded its data in the
// browser after the page arrived, which flashed "Loading..." on every product page and
// delayed the sidebar. Only the interactive sidebar (lead form/modal) runs in the browser.

import { notFound } from "next/navigation";
import PageHeader from "@/app/[locale]/(site)/components/PageHeader";
import { translatePath, translateSegments } from "@/lib/i18n/slugMap";
import { isLocale } from "@/lib/i18n/config";
import { getFooterContent } from "@/lib/i18n/content";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import type { ProductCategory, ProductRecord } from "@/data/locale/en/Products";
import PortfolioSidebar from "./PortfolioSidebar";

type Params = { category: string; slug: string; locale: string };

const isValidCategory = (value: string): value is ProductCategory =>
  ["stack", "puzzle", "automatic", "bike"].includes(value);

const RIGHT_BUTTONS = [
  { key: "stack", label: { en: "Stack parking", de: "Stack-Parken" }, href: "/portfolios/stack/stack-parking" },
  { key: "puzzle", label: { en: "Puzzle parking", de: "Puzzle-Parken" }, href: "/portfolios/puzzle/puzzle-parking" },
  { key: "pit-puzzle", label: { en: "Pit Puzzle", de: "Gruben-Puzzle" }, href: "/portfolios/puzzle/pit-puzzle" },
  { key: "car-hoist", label: { en: "Car Hoist", de: "Autoaufzug" }, href: "/portfolios/automatic/car-hoist" },
  { key: "turn-table", label: { en: "Turn Table", de: "Drehteller" }, href: "/portfolios/automatic/turn-table" },
  { key: "cantilever", label: { en: "Cantilever parking", de: "Kragarm-Parken" }, href: "/portfolios/stack/cantilever-parking" },
  { key: "pit-stacker", label: { en: "Pit Stacker", de: "Gruben-Stacker" }, href: "/portfolios/stack/pit-stacker" },
  { key: "bs-01", label: { en: "Bike Stack Parking", de: "Bike Stack Parking" }, href: "/portfolios/bike/bs-01" },
] as const;

const VIDEO_MAP: Record<string, string> = {
  "stack-parking": "https://www.youtube.com/embed/G7oSn3dupYE?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "3-level-stack-parking":
    "https://www.youtube.com/embed/QIK5me0_vWE?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "pit-stacker":
    "https://www.youtube.com/embed/rVev3ghL2Kg?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "puzzle-parking":
    "https://www.youtube.com/embed/9spsJ1HbD0o?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "pit-puzzle":
    "https://www.youtube.com/embed/mFpquv9DAMc?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "3-level-pit-stacker":
    "https://www.youtube.com/embed/SHDX6QaORPo?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "cantilever-parking":
    "https://www.youtube.com/embed/0q-Mwte5S60?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "3-level-pit-puzzle":
    "https://www.youtube.com/embed/NQSZZy6WHJ0?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
  "turn-table":
    "https://www.youtube.com/embed/lmXFDIltkCE?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1",
};

const SOCIAL_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  youtube: "YouTube",
  facebook: "Facebook",
};

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) notFound();

  // Same lookup as page.tsx: accept English or German URL segments.
  const [baseCategory, baseSlug] = translateSegments([category, slug], locale, "en");
  if (!isValidCategory(baseCategory)) notFound();

  const [enProducts, localizedModule, footerModule, copy] = await Promise.all([
    import("@/data/locale/en/Products"),
    locale === "de" ? import("@/data/locale/de/Products") : import("@/data/locale/en/Products"),
    getFooterContent(locale),
    getPageCopy(locale),
  ]);

  const baseProduct = enProducts.getProduct(baseCategory, baseSlug);
  const localizedProduct: ProductRecord | null =
    locale === "en"
      ? baseProduct
      : (localizedModule.getProduct?.(baseCategory, baseSlug) as ProductRecord | null) ||
        (baseProduct
          ? (localizedModule.PRODUCTS as ProductRecord[]).find((p) => p.id === baseProduct.id) ?? null
          : null);

  const headerTitle = localizedProduct?.title ?? baseProduct?.title ?? "Product";
  const socialsSrc = footerModule.content.footer.contact.socials as Record<string, string | undefined>;
  const socials = (["linkedin", "instagram", "youtube", "facebook"] as const)
    .filter((key) => !!socialsSrc[key])
    .map((key) => ({ key, href: socialsSrc[key] as string, label: SOCIAL_LABELS[key] }));

  return (
    <>
      <PageHeader
        title={headerTitle}
        breadcrumbLabel={headerTitle}
        homeLabel={copy.common.homeLabel}
        imageSrc={copy.products.header.background}
        locale={locale}
      />

      <main className="bg-white">
        <section className="mx-auto max-w-[1450px] px-4 tablet:px-10 py-15 tablet:py-25">
          {/* Two columns from laptop up: at tablet width a fixed 420px sidebar left the product
              content ~228px wide and long German words overflowed the screen. */}
          <div className="grid grid-cols-1 gap-10 laptop:grid-cols-[minmax(0,1fr)_420px]">
            <div>{children}</div>

            <PortfolioSidebar
              heading={copy.products.sidebar?.heading ?? "Our Parking Systems"}
              buttons={RIGHT_BUTTONS.map((b) => ({
                label: b.label[locale] ?? b.label.en,
                href: translatePath(b.href, locale),
              }))}
              videoUrl={baseProduct?.slug ? VIDEO_MAP[baseProduct.slug] || "" : ""}
              productTitle={headerTitle}
              contactTitle={copy.contact.form.title ?? "Contact Now"}
              contactCopy={copy.contact.form}
              datasheetUrl={localizedProduct?.datasheetUrl || undefined}
              datasheetLabel={copy.productPage.labels.downloadDatasheet}
              followUsLabel={copy.products.sidebar?.followUs ?? "Follow Us On"}
              socials={socials}
            />
          </div>
        </section>
      </main>
    </>
  );
}
