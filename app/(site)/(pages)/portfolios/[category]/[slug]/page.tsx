// app/(site)/(pages)/portfolios/[category]/[slug]/page.tsx
import { use } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductBody from "../../components/ProductBody";
import { getProduct, allProductParams, type ProductCategory } from "@/data/Products";

/** Narrow string -> ProductCategory */
function asCategory(s: string): ProductCategory | null {
  return s === "stack" || s === "puzzle" || s === "automatic" ? s : null;
}

type Params = { category: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const cat = asCategory(category);

  if (!cat) {
    return {
      title: "Product Not Found | STELZ Multiparking",
      description: "The requested product could not be found.",
    };
  }

  const product = getProduct(cat, slug);

  if (!product) {
    return {
      title: "Product Not Found | STELZ Multiparking",
      description: "The requested product could not be found.",
    };
  }

  const productSeo = product.seo;
  const title = productSeo?.title || `${product.title} | STELZ Multiparking`;
  const description = productSeo?.description || product.summary.substring(0, 160);
  const canonicalUrl = `https://stelzparking.com${product.path}`;
  const ogImage = productSeo?.image || product.hero.src;

  return {
    title,
    description,
    keywords: productSeo?.keywords || [product.title, "parking system", "mechanical parking"],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `https://stelzparking.com${ogImage}`,
          width: 1200,
          height: 630,
          alt: product.title,
        },
      ],
      siteName: "STELZ Multiparking",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://stelzparking.com${ogImage}`],
    },
  };
}

export function generateStaticParams() {
  // Ensure we return plain strings (what Next expects)
  return allProductParams().map(({ category, slug }) => ({
    category: String(category),
    slug: String(slug),
  }));
}

export default function PortfolioPage({ params }: { params: Promise<Params> }) {
  const { category, slug } = use(params); // page components receive a Promise for params
  const cat = asCategory(category);
  if (!cat) {
    console.error("Invalid category in route params:", { category, slug });
    notFound();
  }

  const p = getProduct(cat, slug);
  if (!p) {
    console.error("Product not found for", { category: cat, slug });
    notFound();
  }

  // Product Schema for rich snippets
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.summary,
    brand: {
      "@type": "Brand",
      name: "STELZ Multiparking",
    },
    url: `https://stelzparking.com${p.path}`,
    image: `https://stelzparking.com${p.hero.src}`,
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://stelzparking.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://stelzparking.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: p.category.charAt(0).toUpperCase() + p.category.slice(1),
        item: `https://stelzparking.com/products/${p.category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: p.title,
        item: `https://stelzparking.com${p.path}`,
      },
    ],
  };

  return (
    <>
      {/* Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <ProductBody p={p} />
    </>
  );
}
