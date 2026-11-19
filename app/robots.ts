import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/admin/", "/uploads/cms/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/admin/", "/uploads/cms/"],
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: ["/"],
        disallow: ["/api/", "/_next/", "/admin/", "/uploads/cms/"],
        crawlDelay: 1,
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`],
    host: SITE_URL.replace(/\/$/, ""),
  };
}
