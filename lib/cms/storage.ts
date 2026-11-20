import { createHash, randomUUID } from "crypto";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { prisma } from "./db";

/**
 * CMS uploads live in a Neon Object Storage bucket (S3-compatible, declared in neon.ts).
 * Credentials/endpoint/region come from the AWS_* env vars that `neon deploy` / `neon env pull` write.
 * The bucket is `public_read`, so objects are served directly at `${AWS_ENDPOINT_URL_S3}/<bucket>/<key>`.
 */
export const CMS_BUCKET = process.env.CMS_BUCKET || "assets";
const KEY_PREFIX = "cms";

let s3Client: S3Client | null = null;
function s3(): S3Client {
  if (!process.env.AWS_ENDPOINT_URL_S3) {
    throw new Error("Object storage is not configured (AWS_ENDPOINT_URL_S3 missing). Run `neon env pull`.");
  }
  // Neon requires path-style addressing. Credentials are passed explicitly so an ambient
  // AWS_PROFILE (e.g. a developer's personal AWS config) can't take precedence over Neon's keys.
  s3Client ??= new S3Client({
    forcePathStyle: true,
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });
  return s3Client;
}

function publicBaseUrl(): string {
  return `${(process.env.AWS_ENDPOINT_URL_S3 || "").replace(/\/$/, "")}/${CMS_BUCKET}/`;
}

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
  return Boolean(url && process.env.AWS_ENDPOINT_URL_S3 && url.startsWith(publicBaseUrl()));
}

function keyFromPublicUrl(url: string): string | null {
  if (!isManagedUploadUrl(url)) return null;
  return decodeURIComponent(url.slice(publicBaseUrl().length));
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
  const key = `${KEY_PREFIX}/${folder}/${Date.now()}-${hash}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  await s3().send(
    new PutObjectCommand({
      Bucket: CMS_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      // Keys are unique per upload, so objects are safe to cache forever.
      CacheControl: "public, max-age=31536000, immutable",
    }),
  );

  return { url: `${publicBaseUrl()}${key}`, bytes: buffer.length };
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

  const key = keyFromPublicUrl(imageUrl);
  if (!key) return { deleted: false, reason: "invalid-path" };

  try {
    await s3().send(new DeleteObjectCommand({ Bucket: CMS_BUCKET, Key: key }));
    return { deleted: true };
  } catch {
    return { deleted: false, reason: "storage-error" };
  }
}
