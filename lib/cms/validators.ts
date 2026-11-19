import { z } from "zod";

export const galleryUpsertSchema = z.object({
  section: z.enum(["installation", "concept"]),
  title: z.string().max(200).optional().default(""),
  titleDe: z.string().max(200).optional().default(""),
  description: z.string().max(2000).optional().default(""),
  altText: z.string().max(300).optional().default(""),
  category: z.string().max(120).optional().default(""),
  imageUrl: z.string().min(1, "Image is required"),
  projectId: z.string().nullable().optional(),
  featured: z.boolean().optional().default(false),
  published: z.boolean().optional().default(true),
  sortOrder: z.number().int().optional().default(0),
});

export const galleryUpdateSchema = galleryUpsertSchema.partial().extend({
  imageUrl: z.string().min(1).optional(),
});

export const projectUpsertSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  shortDescription: z.string().max(500).optional().default(""),
  detailedDescription: z.string().max(10000).optional().default(""),
  category: z.string().max(120).optional().default(""),
  location: z.string().max(200).optional().default(""),
  spaces: z.string().max(120).optional().default(""),
  spacesDe: z.string().max(120).optional().default(""),
  instagramUrl: z.union([z.string().url(), z.literal("")]).optional().default(""),
  coverImageUrl: z.string().min(1, "Cover image is required"),
  clientId: z.string().nullable().optional(),
  completionYear: z.number().int().min(1950).max(2100).nullable().optional(),
  featured: z.boolean().optional().default(false),
  status: z.enum(["draft", "published", "archived"]).optional().default("published"),
  sortOrder: z.number().int().optional().default(0),
  images: z
    .array(
      z.object({
        id: z.string().optional(),
        imageUrl: z.string().min(1),
        altText: z.string().max(300).optional().default(""),
        sortOrder: z.number().int().optional().default(0),
      }),
    )
    .optional()
    .default([]),
});

export const projectUpdateSchema = projectUpsertSchema.partial().extend({
  title: z.string().min(1).max(200).optional(),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .optional(),
  coverImageUrl: z.string().min(1).optional(),
});

export const clientUpsertSchema = z.object({
  name: z.string().min(1).max(200),
  logoUrl: z.string().min(1, "Logo is required"),
  websiteUrl: z.union([z.string().url(), z.literal("")]).optional().default(""),
  description: z.string().max(2000).optional().default(""),
  sortOrder: z.number().int().optional().default(0),
  active: z.boolean().optional().default(true),
});

export const clientUpdateSchema = clientUpsertSchema.partial().extend({
  name: z.string().min(1).max(200).optional(),
  logoUrl: z.string().min(1).optional(),
});

export const reorderSchema = z.object({
  orderedIds: z.array(z.string().min(1)).min(1),
});
