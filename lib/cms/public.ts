import { unstable_cache } from "next/cache";
import { prisma } from "./db";
import type { PublicClient, PublicGalleryItem, PublicProject } from "./types";
import { content as enGalleryFallback } from "@/data/locale/en/GalleryContent";
import { content as enHomeFallback } from "@/data/locale/en/HomeFooterContent";

function pickTitle(locale: string, en: string, de: string) {
  return locale === "de" && de ? de : en || de;
}

/**
 * Public pages wait at most this long for the database before showing the built-in content.
 * The CMS client retries slow connections for much longer (fine for the admin), but a visitor
 * shouldn't stare at a blank page while Neon wakes up or if the database is down.
 */
const PUBLIC_QUERY_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms = PUBLIC_QUERY_TIMEOUT_MS): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`CMS query timed out after ${ms}ms`)), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/*
 * When to show the built-in (static) content instead of the CMS:
 * - the database can't be reached in time, or
 * - the table has never had any content (fresh, unseeded database).
 * If content exists but the admin has hidden/unpublished all of it, that choice is respected
 * (the section is left empty) instead of the old static content silently coming back.
 */

/*
 * Caching (speed + fewer Neon wake-ups on the free plan):
 * The rows below are cached in Next's data cache under CMS_CACHE_TAG, so page views and link
 * prefetches don't query the database. Every admin create/update/delete/reorder calls
 * revalidatePublicSite(), which expires this tag immediately, so edits still appear on the
 * site right away. `revalidate` is only a safety net.
 * A failed query throws inside the cached function, and errors are never cached, so the
 * built-in fallback content is never stored; the next visit simply tries the database again.
 * Only plain fields are returned (no Date objects), because cached values are stored as JSON.
 */
export const CMS_CACHE_TAG = "public-cms";
const CMS_CACHE = { tags: [CMS_CACHE_TAG], revalidate: 3600 };

const loadGalleryRows = unstable_cache(
  async () => {
    const items = await prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { id: true, section: true, imageUrl: true, altText: true, title: true, titleDe: true, category: true },
    });
    const tableEmpty = !items.length && (await prisma.galleryItem.count()) === 0;
    return { items, tableEmpty };
  },
  ["public-gallery-v1"],
  CMS_CACHE,
);

const loadProjectRows = unstable_cache(
  async () => {
    const rows = await prisma.project.findMany({
      where: { status: "published" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true, title: true, coverImageUrl: true, location: true, spaces: true, spacesDe: true,
        instagramUrl: true, slug: true,
      },
    });
    const tableEmpty = !rows.length && (await prisma.project.count()) === 0;
    return { rows, tableEmpty };
  },
  ["public-projects-v1"],
  CMS_CACHE,
);

const loadClientRows = unstable_cache(
  async () => {
    const rows = await prisma.client.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { id: true, name: true, logoUrl: true, websiteUrl: true },
    });
    const tableEmpty = !rows.length && (await prisma.client.count()) === 0;
    return { rows, tableEmpty };
  },
  ["public-clients-v1"],
  CMS_CACHE,
);

/** Published gallery items for public carousels. */
export async function getPublicGallery(locale: string): Promise<{
  gallery: { title: string; items: PublicGalleryItem[] };
  concepts: { title: string; items: PublicGalleryItem[] };
}> {
  const staticTitles = locale === "de"
    ? await import("@/data/locale/de/GalleryContent").then((m) => m.content)
    : enGalleryFallback;
  const staticContent = {
    gallery: staticTitles.gallery as { title: string; items: PublicGalleryItem[] },
    concepts: staticTitles.concepts as { title: string; items: PublicGalleryItem[] },
  };

  try {
    const { items, tableEmpty } = await withTimeout(loadGalleryRows());
    if (tableEmpty) return staticContent;

    const installations = items
      .filter((i) => i.section === "installation")
      .map((i) => ({
        id: i.id,
        image: i.imageUrl,
        altText: i.altText || i.title || "Gallery image",
        category: i.category || undefined,
      }));

    const concepts = items
      .filter((i) => i.section === "concept")
      .map((i) => ({
        id: i.id,
        image: i.imageUrl,
        title: pickTitle(locale, i.title, i.titleDe),
        altText: i.altText || pickTitle(locale, i.title, i.titleDe) || "Concept image",
        category: i.category || undefined,
      }));

    return {
      gallery: { title: staticTitles.gallery.title, items: installations },
      concepts: { title: staticTitles.concepts.title, items: concepts },
    };
  } catch (error) {
    console.error("[cms] gallery unavailable, showing built-in content:", error instanceof Error ? error.message : error);
    return staticContent;
  }
}

/** Published key projects (Footprint carousel). */
export async function getPublicProjects(locale: string): Promise<PublicProject[]> {
  const staticProjects = (enHomeFallback.footprint.projects as unknown as PublicProject[]) ?? [];
  try {
    const { rows, tableEmpty } = await withTimeout(loadProjectRows());
    if (tableEmpty) return staticProjects;

    return rows.map((p) => ({
      id: p.id,
      name: p.title,
      image: p.coverImageUrl,
      location: p.location,
      spaces: pickTitle(locale, p.spaces, p.spacesDe) || undefined,
      instagram: p.instagramUrl || undefined,
      slug: p.slug,
    }));
  } catch (error) {
    console.error("[cms] projects unavailable, showing built-in content:", error instanceof Error ? error.message : error);
    return staticProjects;
  }
}

/** Active clients for logos. */
export async function getPublicClients(): Promise<PublicClient[]> {
  try {
    const { rows, tableEmpty } = await withTimeout(loadClientRows());
    if (tableEmpty) return fallbackClients();
    return rows.map((c) => ({
      id: c.id,
      name: c.name,
      logoUrl: c.logoUrl,
      websiteUrl: c.websiteUrl || undefined,
    }));
  } catch (error) {
    console.error("[cms] clients unavailable, showing built-in content:", error instanceof Error ? error.message : error);
    return fallbackClients();
  }
}

function fallbackClients(): PublicClient[] {
  const logos = [
    "sattva", "brigade", "shriram", "purvankara", "phoenix", "kalyani", "sumadura",
    "vaishnavi", "confident", "bhartiya", "vamsiram", "suvarna", "indiqube", "manipal",
    "concorde", "pavani", "tamara", "ginger", "supreme", "divyasree", "gar", "swojas",
    "sapra", "cmr", "skav", "dmart", "lohia", "durga", "sparsh", "aragen", "apurupadeco",
    "taksh", "esic", "ushodaya", "nanik", "maavi",
  ];
  const jpg = new Set(["sumadura", "tamara", "apurupadeco"]);
  return logos.map((name) => ({
    id: `static-${name}`,
    name,
    logoUrl: `/assets/clients/${name}.${jpg.has(name) ? "jpg" : "webp"}`,
  }));
}
