// app/admin/components/heic.ts
// Turns iPhone HEIC/HEIF photos into WebP (or JPEG) in the browser before upload.
// The server only stores JPEG/PNG/WebP/AVIF, and sharp's prebuilt binaries can't read HEIC,
// so the conversion has to happen here. The ~3 MB decoder is loaded only when a HEIC is picked.

export const HEIC_ACCEPT = [".heic", ".heif", "image/heic", "image/heif"];

/** Largest HEIC we'll try to convert (phone photos are usually 1–6 MB). */
export const MAX_HEIC_MB = 25;

/** Longest edge after conversion: bigger than any size the website shows, so nothing looks soft. */
const MAX_EDGE = 2560;

export function looksLikeHeic(file: File): boolean {
  // Windows often reports an empty type for .heic files, so check the name too.
  return /^image\/hei[cf]/i.test(file.type) || /\.hei[cf]$/i.test(file.name);
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function convertHeic(file: File): Promise<File> {
  const { heicTo } = await import("heic-to");
  const bitmap = await heicTo({ blob: file, type: "bitmap" });

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser can't convert HEIC photos. Save the photo as JPEG and try again.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  // WebP is smallest; browsers that can't encode it (older Safari) hand back PNG, so fall back to JPEG.
  let blob = await canvasToBlob(canvas, "image/webp", 0.85);
  if (!blob || blob.type !== "image/webp") blob = await canvasToBlob(canvas, "image/jpeg", 0.85);
  if (!blob) throw new Error("Couldn't convert this HEIC photo. Save it as JPEG and try again.");

  const ext = blob.type === "image/webp" ? "webp" : "jpg";
  const name = file.name.replace(/\.hei[cf]$/i, "") + "." + ext;
  return new File([blob], name, { type: blob.type });
}
