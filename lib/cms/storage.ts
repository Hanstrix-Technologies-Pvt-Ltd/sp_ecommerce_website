import { createHash, randomUUID } from "crypto";
import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { prisma } from "./db";

export const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads", "cms");
export const UPLOAD_URL_PREFIX = "/uploads/cms";

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export const MAX_UPLOAD_BYTES = Number(process.env.CMS_MAX_UPLOAD_BYTES || 5 * 1024 * 1024);

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

export function isManagedUploadUrl(url: string | null | undefined): boolean {
  return Boolean(url && url.startsWith(`${UPLOAD_URL_PREFIX}/`));
}

export async function ensureUploadDir(subdir = ""): Promise<string> {
  const dir = path.join(UPLOAD_ROOT, subdir);
  await mkdir(dir, { recursive: true });
  return dir;
}

export async function saveUploadedImage(
  file: File,
  folder: "gallery" | "projects" | "clients",
): Promise<{ url: string; bytes: number }> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Unsupported image type. Use JPEG, PNG, WebP, or AVIF.");
  }
  if (file.size <= 0) {
    throw new Error("Empty file upload.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`File too large. Max ${Math.round(MAX_UPLOAD_BYTES / (1024 * 1024))}MB.`);
  }

  const ext = EXT_BY_MIME[file.type] || "bin";
  const hash = createHash("sha1").update(`${Date.now()}-${randomUUID()}`).digest("hex").slice(0, 12);
  const filename = `${Date.now()}-${hash}.${ext}`;
  const dir = await ensureUploadDir(folder);
  const absolute = path.join(dir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(absolute, buffer);

  return {
    url: `${UPLOAD_URL_PREFIX}/${folder}/${filename}`,
    bytes: buffer.length,
  };
}

function absoluteFromPublicUrl(url: string): string | null {
  if (!isManagedUploadUrl(url)) return null;
  const relative = url.replace(/^\//, "");
  return path.join(process.cwd(), "public", relative);
}

export async function countImageReferences(imageUrl: string): Promise<number> {
  const [gallery, projects, projectImages, clients] = await Promise.all([
    prisma.galleryItem.count({ where: { imageUrl } }),
    prisma.project.count({ where: { coverImageUrl: imageUrl } }),
    prisma.projectImage.count({ where: { imageUrl } }),
    prisma.client.count({ where: { logoUrl: imageUrl } }),
  ]);
  return gallery + projects + projectImages + clients;
}

/** Delete a managed upload only when nothing else references it. */
export async function deleteImageIfUnreferenced(
  imageUrl: string | null | undefined,
  options?: { ignoreSelfCount?: boolean },
): Promise<{ deleted: boolean; reason?: string }> {
  if (!imageUrl || !isManagedUploadUrl(imageUrl)) {
    return { deleted: false, reason: "not-managed" };
  }

  const refs = await countImageReferences(imageUrl);
  // After DB row is already deleted, refs should be 0. Before delete, ignoreSelfCount helps callers.
  const threshold = options?.ignoreSelfCount ? 1 : 0;
  if (refs > threshold) {
    return { deleted: false, reason: "still-referenced" };
  }

  const absolute = absoluteFromPublicUrl(imageUrl);
  if (!absolute) return { deleted: false, reason: "invalid-path" };

  try {
    await unlink(absolute);
    return { deleted: true };
  } catch {
    return { deleted: false, reason: "fs-error" };
  }
}
