import type { Metadata, Viewport } from "next";
import { SITE_URL } from "@/lib/i18n/config";
import { content } from "@/data/locale/en/HomeFooterContent";

const baseUrl = SITE_URL;
const defaultOgImage = content.meta.ogImage;
const companyName = "STELZ MULTIPARKING PVT LTD";

/**
 * Enhanced viewport configuration for better mobile performance and accessibility
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
  viewportFit: "cover",
};

/**
 * Generate comprehensive page metadata with SEO best practices
 * Supports canonical URLs, OG tags, Twitter cards, and more
 */
export function generatePageMetadata(
  title: string,
  description: string,
  options?: {
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    noFollow?: boolean;
    type?: "website" | "article" | "blog";
    publishedTime?: Date;
    modifiedTime?: Date;
    authors?: string[];
    alternateLinks?: Array<{ hrefLang: string; href: string }>;
  }
): Metadata {
  const ogImage = options?.ogImage || defaultOgImage;
  const canonicalUrl = options?.canonicalUrl || `${baseUrl}`;
  const ogType = (options?.type === "blog" ? "article" : options?.type || "website") as "website" | "article";

  return {
    title: {
      template: "%s | STELZ Multiparking",
      default: title,
      absolute: title,
    },
    description,
    keywords: options?.keywords || [],
    alternates: {
      canonical: canonicalUrl,
      languages: options?.alternateLinks?.reduce(
        (acc, alt) => ({
          ...acc,
          [alt.hrefLang]: alt.href,
        }),
        {}
      ),
    },
    robots: {
      index: !options?.noIndex,
      follow: !options?.noFollow,
      googleBot: {
        index: !options?.noIndex,
        follow: !options?.noFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      nocache: false,
    },
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url: canonicalUrl,
      siteName: "STELZ Multiparking",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/webp",
        },
        {
          url: ogImage.replace(".webp", ".jpg"),
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
      publishedTime: options?.publishedTime?.toISOString(),
      modifiedTime: options?.modifiedTime?.toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@stelzparking",
      site: "@stelzparking",
    },
    authors: options?.authors?.map((author) => ({ name: author })) || [
      { name: companyName },
    ],
    creator: companyName,
    publisher: companyName,
    applicationName: "STELZ Multiparking",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "STELZ Multiparking",
    },
  };
}

// Schema.org structured data generators
export function generateBreadcrumbSchema(
  items: Array<{
    name: string;
    url: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  url: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  ratingValue?: number;
  reviewCount?: number;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${baseUrl}${product.image}`,
    url: `${baseUrl}${product.url}`,
  };

  if (product.price && product.priceCurrency) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency: product.priceCurrency,
      price: product.price,
      availability: product.availability || "https://schema.org/InStock",
    };
  }

  if (product.ratingValue && product.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue,
      reviewCount: product.reviewCount,
    };
  }

  return schema;
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  image?: string;
  areaServed?: string[];
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${baseUrl}${service.url}`,
    image: service.image ? `${baseUrl}${service.image}` : undefined,
    areaServed: service.areaServed || ["IN"],
    serviceType: service.serviceType || "Parking Solutions",
    provider: {
      "@type": "Organization",
      name: "STELZ MULTIPARKING PVT LTD",
      url: baseUrl,
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image: string;
  url: string;
  publishedTime: Date;
  modifiedTime?: Date;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.description,
    image: `${baseUrl}${article.image}`,
    url: `${baseUrl}${article.url}`,
    datePublished: article.publishedTime.toISOString(),
    dateModified: article.modifiedTime?.toISOString() || article.publishedTime.toISOString(),
    author: {
      "@type": "Organization",
      name: article.author || "STELZ MULTIPARKING PVT LTD",
    },
    publisher: {
      "@type": "Organization",
      name: "STELZ MULTIPARKING PVT LTD",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/assets/Logo.jpg`,
      },
    },
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": baseUrl,
    name: "STELZ MULTIPARKING PVT LTD",
    image: `${baseUrl}/assets/Logo.webp`,
    url: baseUrl,
    telephone: content.footer.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: content.footer.office.address,
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560098",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "13.1939",
      longitude: "77.6245",
    },
    sameAs: [
      content.footer.contact.socials.linkedin,
      content.footer.contact.socials.facebook,
      content.footer.contact.socials.instagram,
      content.footer.contact.socials.youtube,
    ].filter(Boolean),
  };
}

/**
 * Generate WebSite schema with search action support
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": baseUrl,
    name: "STELZ Multiparking",
    url: baseUrl,
    description:
      "Innovative automated parking solutions for modern urban spaces",
    image: `${baseUrl}/assets/Logo.webp`,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      query_input: "required name=search_term_string",
    },
  };
}

/**
 * Generate comprehensive Organization schema with multiple properties
 */
export function generateEnhancedOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": baseUrl,
    name: "STELZ MULTIPARKING PVT LTD",
    alternateName: "STELZ Multiparking",
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/Logo.webp`,
      width: 250,
      height: 250,
    },
    image: `${baseUrl}/assets/Logo.webp`,
    description:
      "Leading provider of innovative automated parking solutions in India",
    slogan: "Engineering Tomorrow's Parking",
    address: {
      "@type": "PostalAddress",
      streetAddress: content.footer.office.address,
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560098",
      addressCountry: "IN",
    },
    telephone: content.footer.contact.phone,
    email: content.footer.contact.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: content.footer.contact.phone,
      contactType: "Customer Service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    sameAs: [
      content.footer.contact.socials.linkedin,
      content.footer.contact.socials.facebook,
      content.footer.contact.socials.instagram,
      content.footer.contact.socials.youtube,
    ].filter(Boolean),
    foundingDate: "2020",
    founderName: "STELZ Team",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    knowsAbout: [
      "Automated Parking Systems",
      "Puzzle Parking",
      "Stack Parking",
      "Mechanical Parking",
      "Smart City Solutions",
      "Urban Mobility",
    ],
  };
}

/**
 * Generate rich video schema for embedded videos
 */
export function generateVideoSchema(video: {
  url: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  uploadDate: Date;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    url: video.url,
    thumbnailUrl: video.thumbnailUrl,
    name: video.title,
    description: video.description,
    uploadDate: video.uploadDate.toISOString(),
    duration: video.duration || "PT5M",
  };
}

/**
 * Generate FAQ schema in bulk
 */
export function generateEnhancedFAQSchema(
  faqs: Array<{
    question: string;
    answer: string;
    keywords?: string[];
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      keywords: faq.keywords,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Product/Service collection schema
 */
export function generateCollectionSchema(collection: {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
    image?: string;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: collection.name,
    description: collection.description,
    url: `${baseUrl}${collection.url}`,
    mainEntity: collection.items.map((item) => ({
      "@type": "Thing",
      name: item.name,
      url: `${baseUrl}${item.url}`,
      image: item.image ? `${baseUrl}${item.image}` : undefined,
    })),
  };
}

/**
 * Generate breadcrumb schema with JSON structure
 */
export function generateEnhancedBreadcrumbSchema(
  items: Array<{
    name: string;
    url: string;
  }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
