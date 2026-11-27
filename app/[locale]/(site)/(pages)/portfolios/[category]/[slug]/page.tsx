// app/(site)/(pages)/portfolios/[category]/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductBody from "../../components/ProductBody";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { translatePath, translateSegments } from "@/lib/i18n/slugMap";
import { isLocale, SITE_URL, type Locale } from "@/lib/i18n/config";

type Params = { locale: string; category: string; slug: string };

function asCategory(s: string): "stack" | "puzzle" | "automatic" | "bike" | null {
  return s === "stack" || s === "puzzle" || s === "automatic" || s === "bike" ? s : null;
}

async function loadProducts(locale: Locale) {
  if (locale === "de") {
    return import("@/data/locale/de/Products");
  }
  return import("@/data/locale/en/Products");
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) notFound();

  const [baseCategory, baseSlug] = translateSegments([category, slug], locale, "en");
  const cat = asCategory(baseCategory);
  if (!cat) {
    return { title: "Product Not Found | STELZ Multiparking", description: "The requested product could not be found." };
  }

  const productsModule = await loadProducts(locale);
  const enProducts = await import("@/data/locale/en/Products");
  const baseProduct = enProducts.getProduct(cat, baseSlug);
  const product =
    locale === "en"
      ? baseProduct
      : productsModule.getProduct(cat, baseSlug) ||
        (baseProduct
          ? productsModule.PRODUCTS.find((p) => p.id === baseProduct.id) ?? null
          : null);
  if (!product) {
    return { title: "Product Not Found | STELZ Multiparking", description: "The requested product could not be found." };
  }

  const productSeo = product.seo;
  const title = product.title;
  const description = productSeo?.description || product.summary.substring(0, 160);
  const ogImage = productSeo?.image || product.hero.src;

  return buildLocalizedMetadata(locale, {
    title,
    description,
    keywords: productSeo?.keywords || [product.title, "parking system", "mechanical parking"],
    images: [ogImage],
    pathname: product.path,
  });
}

// Only the product URLs listed below exist. Anything else (wrong category, typo, made-up slug)
// gets a real 404 status. Without this the page showed "not found" text but answered 200,
// which search engines treat as a "soft 404" and may index.
export const dynamicParams = false;

export function generateStaticParams() {
  const locales: Locale[] = ["en", "de"];
  return import("@/data/locale/en/Products").then((m) =>
    locales.flatMap((locale) =>
      m.allProductParams().flatMap(({ category, slug }) => {
        const [cat, translatedSlug] = translateSegments([category, slug], "en", locale);
        const localized = { locale, category: cat, slug: translatedSlug };
        // proxy.ts rewrites German URLs to the English segment shape before routing
        // (/de/referenzen/stapel/... -> /de/portfolios/stack/...), so list that form too.
        const base = { locale, category, slug };
        return localized.category === category && localized.slug === slug ? [base] : [localized, base];
      })
    )
  );
}

export default async function PortfolioPage({ params }: { params: Promise<Params> }) {
  const { locale, category, slug } = await params;
  if (!isLocale(locale)) notFound();
  const copy = await getPageCopy(locale);
  const [baseCategory, baseSlug] = translateSegments([category, slug], locale, "en");
  const cat = asCategory(baseCategory);
  if (!cat) notFound();

  const productsModule = await loadProducts(locale);
  const enProducts = await import("@/data/locale/en/Products");
  const baseProduct = enProducts.getProduct(cat, baseSlug);
  const product =
    locale === "en"
      ? baseProduct
      : productsModule.getProduct(cat, baseSlug) ||
        (baseProduct
          ? productsModule.PRODUCTS.find((p) => p.id === baseProduct.id) ?? null
          : null);
  if (!product) notFound();

  // Structured data uses this page's real (localised) URLs. The old breadcrumb pointed to
  // /products/<category>, which doesn't exist, and German pages used English URLs/labels.
  const SITE = SITE_URL;
  const pageUrl = `${SITE}${translatePath(`/portfolios/${baseCategory}/${baseSlug}`, locale)}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    brand: { "@type": "Brand", name: "STELZ Multiparking" },
    url: pageUrl,
    image: `${SITE}${product.hero.src}`,
    inLanguage: locale,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "de" ? "Startseite" : "Home", item: `${SITE}${translatePath("/", locale)}` },
      { "@type": "ListItem", position: 2, name: locale === "de" ? "Produkte" : "Products", item: `${SITE}${translatePath("/products", locale)}` },
      { "@type": "ListItem", position: 3, name: product.title, item: pageUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductBody p={product} labels={copy.productPage.labels} />
    </>
  );
}
