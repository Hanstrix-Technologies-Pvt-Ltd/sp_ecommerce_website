import { prisma } from "./db";
import type { PublicClient, PublicGalleryItem, PublicProject } from "./types";
import { content as enGalleryFallback } from "@/data/locale/en/GalleryContent";
import { content as enHomeFallback } from "@/data/locale/en/HomeFooterContent";

function pickTitle(locale: string, en: string, de: string) {
  return locale === "de" && de ? de : en || de;
}

/** Published gallery items for public carousels. Falls back to static seed content if DB empty/unavailable. */
export async function getPublicGallery(locale: string): Promise<{
  gallery: { title: string; items: PublicGalleryItem[] };
  concepts: { title: string; items: PublicGalleryItem[] };
}> {
  const staticTitles = locale === "de"
    ? await import("@/data/locale/de/GalleryContent").then((m) => m.content)
    : enGalleryFallback;

  try {
    const items = await prisma.galleryItem.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (!items.length) {
      return {
        gallery: staticTitles.gallery as { title: string; items: PublicGalleryItem[] },
        concepts: staticTitles.concepts as { title: string; items: PublicGalleryItem[] },
      };
    }

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
      gallery: {
        title: staticTitles.gallery.title,
        items: installations.length
          ? installations
          : (staticTitles.gallery.items as PublicGalleryItem[]),
      },
      concepts: {
        title: staticTitles.concepts.title,
        items: concepts.length
          ? concepts
          : (staticTitles.concepts.items as PublicGalleryItem[]),
      },
    };
  } catch {
    return {
      gallery: staticTitles.gallery as { title: string; items: PublicGalleryItem[] },
      concepts: staticTitles.concepts as { title: string; items: PublicGalleryItem[] },
    };
  }
}

/** Published key projects (Footprint carousel). */
export async function getPublicProjects(locale: string): Promise<PublicProject[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { status: "published" },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (!rows.length) {
      return (enHomeFallback.footprint.projects as unknown as PublicProject[]) ?? [];
    }

    return rows.map((p) => ({
      id: p.id,
      name: p.title,
      image: p.coverImageUrl,
      location: p.location,
      spaces: pickTitle(locale, p.spaces, p.spacesDe) || undefined,
      instagram: p.instagramUrl || undefined,
      slug: p.slug,
    }));
  } catch {
    return (enHomeFallback.footprint.projects as unknown as PublicProject[]) ?? [];
  }
}

/** Active clients for logos. */
export async function getPublicClients(): Promise<PublicClient[]> {
  try {
    const rows = await prisma.client.findMany({
      where: { active: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    if (!rows.length) return fallbackClients();
    return rows.map((c) => ({
      id: c.id,
      name: c.name,
      logoUrl: c.logoUrl,
      websiteUrl: c.websiteUrl || undefined,
    }));
  } catch {
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
  return logos.map((name, i) => ({
    id: `static-${name}`,
    name,
    logoUrl: `/assets/clients/${name}.${jpg.has(name) ? "jpg" : "webp"}`,
  }));
}
