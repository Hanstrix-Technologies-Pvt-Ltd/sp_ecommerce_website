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
    const items = await withTimeout(
      prisma.galleryItem.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    );
    if (!items.length && (await withTimeout(prisma.galleryItem.count())) === 0) return staticContent;

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
    const rows = await withTimeout(
      prisma.project.findMany({
        where: { status: "published" },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    );
    if (!rows.length && (await withTimeout(prisma.project.count())) === 0) return staticProjects;

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
    const rows = await withTimeout(
      prisma.client.findMany({
        where: { active: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    );
    if (!rows.length && (await withTimeout(prisma.client.count())) === 0) return fallbackClients();
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
