// app/(site)/(pages)/portfolios/[category]/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductBody from "../../components/ProductBody";
import { buildLocalizedMetadata } from "@/lib/i18n/metadata";
import { getPageCopy } from "@/lib/i18n/pageCopy";
import { translateSegments } from "@/lib/i18n/slugMap";
import { isLocale, type Locale } from "@/lib/i18n/config";

type Params = { locale: string; category: string; slug: string };

function asCategory(s: string): "stack" | "puzzle" | "automatic" | null {
  return s === "stack" || s === "puzzle" || s === "automatic" ? s : null;
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

export function generateStaticParams() {
  const locales: Locale[] = ["en", "de"];
  return import("@/data/locale/en/Products").then((m) =>
    locales.flatMap((locale) =>
      m.allProductParams().map(({ category, slug }) => {
        const [cat, translatedSlug] = translateSegments([category, slug], "en", locale);
        return { locale, category: cat, slug: translatedSlug };
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    brand: { "@type": "Brand", name: "STELZ Multiparking" },
    url: `https://stelzparking.com${product.path}`,
    image: `https://stelzparking.com${product.hero.src}`,
    offers: { "@type": "AggregateOffer", availability: "https://schema.org/InStock", priceCurrency: "INR" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://stelzparking.com" },
      { "@type": "ListItem", position: 2, name: "Products", item: "https://stelzparking.com/products" },
      {
        "@type": "ListItem",
        position: 3,
        name: product.category.charAt(0).toUpperCase() + product.category.slice(1),
        item: `https://stelzparking.com/products/${product.category}`,
      },
      { "@type": "ListItem", position: 4, name: product.title, item: `https://stelzparking.com${product.path}` },
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
