/**
 * Seed CMS database from existing static content modules.
 * Run: npx tsx scripts/seed-cms.ts
 */
import { PrismaClient } from "@prisma/client";
import { content as galleryEn } from "../data/locale/en/GalleryContent";
import { content as galleryDe } from "../data/locale/de/GalleryContent";
import { content as homeEn } from "../data/locale/en/HomeFooterContent";
import { content as homeDe } from "../data/locale/de/HomeFooterContent";

const prisma = new PrismaClient();

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const CLIENT_LOGOS = [
  "sattva", "brigade", "shriram", "purvankara", "phoenix", "kalyani", "sumadura",
  "vaishnavi", "confident", "bhartiya", "vamsiram", "suvarna", "indiqube", "manipal",
  "concorde", "pavani", "tamara", "ginger", "supreme", "divyasree", "gar", "swojas",
  "sapra", "cmr", "skav", "dmart", "lohia", "durga", "sparsh", "aragen", "apurupadeco",
  "taksh", "esic", "ushodaya", "nanik", "maavi",
] as const;

const JPG = new Set(["sumadura", "tamara", "apurupadeco"]);

async function seedClients() {
  const existing = await prisma.client.count();
  if (existing > 0) {
    console.log(`Clients already seeded (${existing}), skipping`);
    return;
  }
  let order = 0;
  for (const name of CLIENT_LOGOS) {
    await prisma.client.create({
      data: {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        logoUrl: `/assets/clients/${name}.${JPG.has(name) ? "jpg" : "webp"}`,
        sortOrder: order++,
        active: true,
      },
    });
  }
  console.log(`Seeded ${CLIENT_LOGOS.length} clients`);
}

async function seedProjects() {
  const existing = await prisma.project.count();
  if (existing > 0) {
    console.log(`Projects already seeded (${existing}), skipping`);
    return;
  }

  const deByName = new Map(
    (homeDe.footprint.projects as { name: string; spaces?: string }[]).map((p) => [p.name, p]),
  );

  let order = 0;
  for (const p of homeEn.footprint.projects as {
    id: number;
    name: string;
    image: string;
    location: string;
    spaces?: string;
    instagram?: string;
  }[]) {
    const de = deByName.get(p.name);
    let slug = slugify(p.name);
    const clash = await prisma.project.findUnique({ where: { slug } });
    if (clash) slug = `${slug}-${p.id}`;

    await prisma.project.create({
      data: {
        title: p.name,
        slug,
        location: p.location,
        spaces: p.spaces || "",
        spacesDe: de?.spaces || "",
        instagramUrl: p.instagram || "",
        coverImageUrl: p.image,
        status: "published",
        sortOrder: order++,
        featured: order <= 3,
      },
    });
  }
  console.log(`Seeded ${homeEn.footprint.projects.length} projects`);
}

async function seedGallery() {
  const existing = await prisma.galleryItem.count();
  if (existing > 0) {
    console.log(`Gallery already seeded (${existing}), skipping`);
    return;
  }

  const deConcepts = new Map(
    (galleryDe.concepts.items as { image: string; title: string }[]).map((i) => [i.image, i.title]),
  );

  let order = 0;
  for (const item of galleryEn.gallery.items as { id: number; image: string }[]) {
    await prisma.galleryItem.create({
      data: {
        section: "installation",
        title: `Installation ${item.id}`,
        altText: `Parking installation ${item.id}`,
        imageUrl: item.image,
        published: true,
        sortOrder: order++,
      },
    });
  }

  order = 0;
  for (const item of galleryEn.concepts.items as { id: number; image: string; title: string }[]) {
    await prisma.galleryItem.create({
      data: {
        section: "concept",
        title: item.title,
        titleDe: deConcepts.get(item.image) || item.title,
        category: item.title,
        altText: item.title,
        imageUrl: item.image,
        published: true,
        sortOrder: order++,
      },
    });
  }

  console.log(
    `Seeded gallery: ${galleryEn.gallery.items.length} installations, ${galleryEn.concepts.items.length} concepts`,
  );
}

async function main() {
  await seedClients();
  await seedProjects();
  await seedGallery();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("CMS seed complete");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
