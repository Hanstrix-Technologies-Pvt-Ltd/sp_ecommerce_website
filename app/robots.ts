import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n/config";

// Single source for /robots.txt (the old public/robots.txt conflicted with this file and made
// /robots.txt fail). "/_next/" must stay crawlable: it serves the CSS/JS Google needs to render
// pages and every optimised image (/_next/image), so blocking it hid product images from
// Google Images and could make pages look broken to the crawler.
const DISALLOW = ["/api/", "/admin/", "/uploads/cms/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: ["/"], disallow: DISALLOW }],
    sitemap: [`${SITE_URL}/sitemap.xml`],
  };
}
