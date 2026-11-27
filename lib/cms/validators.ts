import { z } from "zod";
import { isManagedUploadUrl } from "./storage";
import { parseYouTubeId } from "./youtube";

/**
 * Image URLs must be either a bundled static asset (`/assets/...`, used by seeded content)
 * or an object in our Neon storage bucket. Anything else (arbitrary external hosts) would make
 * next/image throw and break public pages.
 */
export function isAllowedImageUrl(url: string): boolean {
  if (url.includes("..") || url.includes("\\")) return false;
  if (/^\/assets\/[^\s?#]+$/.test(url)) return true;
  return isManagedUploadUrl(url);
}

const imageUrl = (message = "Image is required") =>
  z.string().min(1, message).max(2048).refine(isAllowedImageUrl, {
    message: "Image must be uploaded through the CMS",
  });

const slug = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug");

const optionalUrl = z.union([z.string().url(), z.literal("")]);

/*
 * Create schemas apply defaults. Update schemas are written out separately WITHOUT defaults:
 * with Zod 4, `.partial()` on a field that has `.default()` still fills in the default, so a
 * partial PUT would silently reset fields that weren't sent (and wipe project images).
 */

// ---------- Gallery ----------
const galleryFields = {
  section: z.enum(["installation", "concept"]),
  title: z.string().max(200),
  titleDe: z.string().max(200),
  description: z.string().max(2000),
  altText: z.string().max(300),
  category: z.string().max(120),
  imageUrl: imageUrl(),
  projectId: z.string().nullable(),
  featured: z.boolean(),
  published: z.boolean(),
  sortOrder: z.number().int(),
};

export const galleryUpsertSchema = z.object({
  ...galleryFields,
  title: galleryFields.title.optional().default(""),
  titleDe: galleryFields.titleDe.optional().default(""),
  description: galleryFields.description.optional().default(""),
  altText: galleryFields.altText.optional().default(""),
  category: galleryFields.category.optional().default(""),
  projectId: galleryFields.projectId.optional(),
  featured: galleryFields.featured.optional().default(false),
  published: galleryFields.published.optional().default(true),
  sortOrder: galleryFields.sortOrder.optional(), // omitted -> placed last (see nextSortOrder)
});

export const galleryUpdateSchema = z.object(galleryFields).partial();

// ---------- Projects ----------
const projectImageSchema = z.object({
  id: z.string().optional(),
  imageUrl: imageUrl(),
  altText: z.string().max(300).optional().default(""),
  sortOrder: z.number().int().optional(),
});

const projectFields = {
  title: z.string().min(1).max(200),
  slug,
  shortDescription: z.string().max(500),
  detailedDescription: z.string().max(10000),
  category: z.string().max(120),
  location: z.string().max(200),
  spaces: z.string().max(120),
  spacesDe: z.string().max(120),
  instagramUrl: optionalUrl,
  coverImageUrl: imageUrl("Cover image is required"),
  clientId: z.string().nullable(),
  completionYear: z.number().int().min(1950).max(2100).nullable(),
  featured: z.boolean(),
  status: z.enum(["draft", "published", "archived"]),
  sortOrder: z.number().int(),
  images: z.array(projectImageSchema).max(50),
};

export const projectUpsertSchema = z.object({
  ...projectFields,
  shortDescription: projectFields.shortDescription.optional().default(""),
  detailedDescription: projectFields.detailedDescription.optional().default(""),
  category: projectFields.category.optional().default(""),
  location: projectFields.location.optional().default(""),
  spaces: projectFields.spaces.optional().default(""),
  spacesDe: projectFields.spacesDe.optional().default(""),
  instagramUrl: projectFields.instagramUrl.optional().default(""),
  clientId: projectFields.clientId.optional(),
  completionYear: projectFields.completionYear.optional(),
  featured: projectFields.featured.optional().default(false),
  status: projectFields.status.optional().default("published"),
  sortOrder: projectFields.sortOrder.optional(), // omitted -> placed last (see nextSortOrder)
  images: projectFields.images.optional().default([]),
});

export const projectUpdateSchema = z.object(projectFields).partial();

// ---------- Clients ----------
const clientFields = {
  name: z.string().min(1).max(200),
  logoUrl: imageUrl("Logo is required"),
  websiteUrl: optionalUrl,
  description: z.string().max(2000),
  sortOrder: z.number().int(),
  active: z.boolean(),
};

export const clientUpsertSchema = z.object({
  ...clientFields,
  websiteUrl: clientFields.websiteUrl.optional().default(""),
  description: clientFields.description.optional().default(""),
  sortOrder: clientFields.sortOrder.optional(), // omitted -> placed last (see nextSortOrder)
  active: clientFields.active.optional().default(true),
});

export const clientUpdateSchema = z.object(clientFields).partial();

// ---------- Testimonials ----------
const youtubeVideo = z
  .string()
  .min(1, "YouTube link is required")
  .max(500)
  .transform((value, ctx) => {
    const id = parseYouTubeId(value);
    if (!id) {
      ctx.addIssue({ code: "custom", message: "Paste a valid YouTube video link (e.g. https://youtu.be/…)" });
      return z.NEVER;
    }
    return id;
  });

const testimonialFields = {
  title: z.string().trim().min(1, "Name is required").max(200),
  youtubeUrl: youtubeVideo, // stored as youtubeId
  sortOrder: z.number().int(),
  active: z.boolean(),
};

export const testimonialUpsertSchema = z.object({
  ...testimonialFields,
  sortOrder: testimonialFields.sortOrder.optional(), // omitted -> placed last (see nextSortOrder)
  active: testimonialFields.active.optional().default(true),
});

export const testimonialUpdateSchema = z.object(testimonialFields).partial();

// ---------- Reordering ----------
/**
 * Reorder within the full (unpaged, unfiltered) order: either one step up/down, or drop the
 * record onto another record's position (drag and drop).
 */
export const moveSchema = z.union([
  z.object({ id: z.string().min(1), overId: z.string().min(1) }),
  z.object({ id: z.string().min(1), direction: z.union([z.literal(-1), z.literal(1)]) }),
]);
