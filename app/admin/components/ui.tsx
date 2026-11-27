"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HEIC_ACCEPT, MAX_HEIC_MB, convertHeic, looksLikeHeic } from "./heic";

/**
 * Vercel rejects function request bodies over 4.5 MB before our code runs, so keep uploads
 * under that. Must match MAX_UPLOAD_BYTES' default in lib/cms/storage.ts.
 */
export const MAX_UPLOAD_MB = 4;

type ApiBody = { success?: boolean; message?: string; errors?: Record<string, string[] | undefined> };

function humanizeField(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

/**
 * fetch() for admin API calls: parses JSON safely, turns validation errors into a readable
 * message ("Instagram url: Invalid URL"), and sends the user back to login when the session
 * has expired instead of leaving the page stuck on "Unauthorized".
 */
export async function adminFetch<T>(input: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(input, init);
  } catch {
    throw new Error("Network error. Check your connection and try again.");
  }
  if (res.status === 401) {
    window.location.assign("/admin/login");
    throw new Error("Your session has expired. Please log in again.");
  }
  if (res.status === 413) {
    throw new Error(`File too large. Max ${MAX_UPLOAD_MB}MB.`);
  }
  const json = (await res.json().catch(() => null)) as (ApiBody & T) | null;
  if (!res.ok || !json?.success) {
    let message = json?.message || `Request failed (${res.status})`;
    const fieldErrors = Object.entries(json?.errors || {})
      .filter(([, msgs]) => msgs?.length)
      .map(([field, msgs]) => `${humanizeField(field)}: ${msgs![0]}`);
    if (fieldErrors.length) message = `${message}. ${fieldErrors.join("; ")}`;
    throw new Error(message);
  }
  return json;
}

/** Returns `value` once it has stopped changing for `delayMs` (used for search boxes). */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

/**
 * Drag-and-drop reorder handler for an admin list.
 *
 * Saves run strictly one after another: the server computes each move from the order stored in
 * the database, so two overlapping requests (fast successive drags) could otherwise both read
 * the old order and one move would be lost. The list is re-fetched only once the last pending
 * save has finished, so a refresh can't briefly undo a drag the user just made.
 */
export function useReorder<T>(
  endpoint: string,
  opts: {
    setItems: (items: T[]) => void;
    reload: () => Promise<void>;
    onSaved: () => void;
    onError: (message: string) => void;
  },
) {
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const pending = useRef(0);

  return async function reorder(id: string, overId: string, nextItems: T[]) {
    opts.setItems(nextItems);
    pending.current += 1;
    const save = queue.current.then(() =>
      adminFetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, overId }),
      }),
    );
    queue.current = save.catch(() => undefined);
    try {
      await save;
      opts.onSaved();
    } catch (e) {
      opts.onError(e instanceof Error ? e.message : "Failed to save the new order");
    } finally {
      pending.current -= 1;
      if (pending.current === 0) await opts.reload();
    }
  };
}

/** Scrolls an element into view on the next frame (after it has rendered). */
export function scrollIntoViewSoon(ref: React.RefObject<HTMLElement | null>) {
  requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
}

export function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  // The page banner above already shows the title, so it's kept for screen readers only.
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="sr-only">{title}</h2>
        {subtitle ? <p className="text-base text-[#616161]">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const styles = {
    primary: "bg-[#006DDB] text-white hover:bg-[#0a3a85]",
    secondary: "bg-white text-[#1F1F1F] border border-[#D2D2D2] hover:border-[#006DDB]",
    danger: "bg-[#b42318] text-white hover:opacity-90",
    ghost: "bg-transparent text-[#616161] hover:bg-[#F5F5F5]",
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium disabled:opacity-50 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-[#D2D2D2] bg-white px-3 py-2.5 text-[15px] text-[#616161] outline-none focus:border-[#006DDB] ${props.className || ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border border-[#D2D2D2] bg-white px-3 py-2.5 text-[15px] text-[#616161] outline-none focus:border-[#006DDB] ${props.className || ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-[#D2D2D2] bg-white px-3 py-2.5 text-[15px] text-[#616161] outline-none focus:border-[#006DDB] ${props.className || ""}`}
    />
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-[#1F1F1F]">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-[#616161]">{hint}</span> : null}
    </label>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-[#E5E7EB] bg-white p-4 ${className}`}>
      {children}
    </div>
  );
}

/** Green "Shown on website" / grey "Hidden" label, the same on every admin list. */
export function VisibilityBadge({ shown }: { shown: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium ${
        shown ? "bg-[#ecfdf3] text-[#027a48]" : "bg-[#F3F4F6] text-[#616161]"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${shown ? "bg-[#12b76a]" : "bg-[#9CA3AF]"}`} aria-hidden />
      {shown ? "Shown on website" : "Hidden"}
    </span>
  );
}

/** A row of tab-like buttons (one is always selected). */
export function Tabs<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="inline-flex flex-wrap border border-[#D2D2D2] bg-white">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`px-4 py-2 text-sm font-medium transition ${
              active ? "bg-[#006DDB] text-white" : "text-[#4B5563] hover:bg-[#F3F4F6]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

export type VisibilityFilterValue = "all" | "shown" | "hidden";
export const VISIBILITY_FILTERS: { value: VisibilityFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "shown", label: "Shown on website" },
  { value: "hidden", label: "Hidden" },
];

/** Hide/Show from a list card: saves one field, then reloads the list. */
export async function saveVisibility(url: string, body: Record<string, unknown>) {
  await adminFetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="py-12 text-center">
      <p className="text-lg font-medium text-[#1F1F1F]">{title}</p>
      <p className="mt-1 text-sm text-[#616161]">{body}</p>
    </Card>
  );
}


export function Alert({
  tone = "info",
  children,
}: {
  tone?: "info" | "error" | "success" | "warning";
  children: React.ReactNode;
}) {
  const colors = {
    warning: "bg-[#fffaeb] text-[#93370d] border-[#fedf89]",
    info: "bg-[#eef4ff] text-[#1F1F1F] border-[#c9d8f0]",
    error: "bg-[#fef3f2] text-[#b42318] border-[#fecdca]",
    success: "bg-[#ecfdf3] text-[#027a48] border-[#a6f4c5]",
  }[tone];
  return (
    <div className={`border px-3 py-2 text-sm ${colors}`} role={tone === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  busy,
  error,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
  /** Shown inside the dialog, so a failed action isn't hidden behind the overlay. */
  error?: string;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      onKeyDown={(e) => {
        if (e.key === "Escape" && !busy) onCancel();
      }}
    >
      <div className="w-full max-w-md bg-white p-5 shadow-xl">
        <div className="-mx-5 -mt-5 mb-4 h-[4px] bg-[#b42318]" aria-hidden />
        <h3 className="text-lg font-semibold text-[#1F1F1F]">{title}</h3>
        <p className="mt-2 text-sm text-[#616161]">{body}</p>
        {error ? (
          <div className="mt-3">
            <Alert tone="error">{error}</Alert>
          </div>
        ) : null}
        <div className="mt-5 flex justify-end gap-2">
          {/* Focus Cancel (the safe choice) when the dialog opens, so Escape/Enter work from the keyboard. */}
          <Button type="button" variant="secondary" onClick={onCancel} disabled={busy} autoFocus>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

const UPLOAD_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

export type ImageSpec = {
  /** Shape description shown to the user, e.g. "landscape 16:10". */
  shape: string;
  width: number;
  height: number;
  /** Below this the image will look blurry on large screens (warned, not blocked). */
  minWidth: number;
  minHeight: number;
  /** "cropped": fills the frame and edges may be cut off. "whole": always shown in full. */
  fit: "cropped" | "whole";
  tip?: string;
};

/**
 * Recommended image sizes, matched to how each image is displayed on the public website
 * (and to the existing images there).
 */
export const IMAGE_SPECS = {
  // Gallery page "Installations" carousel: landscape cards, cropped to fill (existing: 1734×1080)
  galleryInstallation: {
    shape: "landscape 16:10", width: 1600, height: 1000, minWidth: 1200, minHeight: 750, fit: "cropped",
    tip: "Keep the main subject in the centre, as the edges may be trimmed.",
  },
  // Gallery page "3D Concepts" carousel: square, shown whole (existing: 2560×2560)
  galleryConcept: {
    shape: "square 1:1", width: 2000, height: 2000, minWidth: 1200, minHeight: 1200, fit: "whole",
    tip: "Use a plain white or light background, like the existing concept renders.",
  },
  // Home page "STELZ Footprint" carousel: 4:3 cards, cropped to fill
  projectCover: {
    shape: "landscape 4:3", width: 1600, height: 1200, minWidth: 1200, minHeight: 900, fit: "cropped",
    tip: "Keep the building in the centre, as the edges may be trimmed.",
  },
  // Clients page / partner logos: square tiles, shown whole (existing: 300×300)
  clientLogo: {
    shape: "square 1:1", width: 500, height: 500, minWidth: 300, minHeight: 300, fit: "whole",
    tip: "Use a PNG or WebP with a transparent or white background, with little empty space around the logo.",
  },
} satisfies Record<string, ImageSpec>;

/** Reads an image file's pixel size in the browser (null if it can't be decoded). */
async function readImageSize(objectUrl: string): Promise<{ width: number; height: number } | null> {
  try {
    const img = new window.Image();
    img.src = objectUrl;
    await img.decode();
    return { width: img.naturalWidth, height: img.naturalHeight };
  } catch {
    return null;
  }
}

/** Recommended size + file limits, shown above every uploader. */
function UploadGuidance({ spec }: { spec?: ImageSpec }) {
  return (
    <div className="border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 text-xs leading-5 text-[#4B5563]">
      {spec ? (
        <>
          <p>
            <span className="font-semibold text-[#1F1F1F]">Recommended size:</span> {spec.width} × {spec.height} px (
            {spec.shape}), at least {spec.minWidth} × {spec.minHeight} px.{" "}
            {spec.fit === "cropped"
              ? "The image is cropped to fill its frame on the website."
              : "The whole image is always shown on the website."}
          </p>
          {spec.tip ? <p>{spec.tip}</p> : null}
        </>
      ) : null}
      <p>
        <span className="font-semibold text-[#1F1F1F]">File:</span> JPEG, PNG, WebP or AVIF, max {MAX_UPLOAD_MB} MB.
        iPhone HEIC photos are converted automatically. Under 500 KB is best for fast pages (WebP is usually smallest).
      </p>
    </div>
  );
}

export function ImageUploader({
  folder,
  value,
  onChange,
  onUploadingChange,
  label = "Image",
  spec,
}: {
  folder: "gallery" | "projects" | "clients";
  value?: string;
  onChange: (url: string) => void;
  /** Lets the parent form disable Save while a file is still uploading. */
  onUploadingChange?: (uploading: boolean) => void;
  label?: string;
  /** Recommended dimensions for this image (see IMAGE_SPECS). */
  spec?: ImageSpec;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  async function onFile(picked: File | null) {
    if (!picked) return;
    setError("");
    setWarning("");
    setProgress("");
    let file = picked;

    // iPhone HEIC/HEIF photos: convert to WebP/JPEG in the browser first.
    if (looksLikeHeic(file)) {
      if (file.size > MAX_HEIC_MB * 1024 * 1024) {
        setError(`File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max ${MAX_HEIC_MB}MB for HEIC photos.`);
        return;
      }
      setUploading(true);
      onUploadingChange?.(true);
      setProgress("Converting HEIC photo…");
      try {
        file = await convertHeic(file);
      } catch (e) {
        setError(
          e instanceof Error && e.message.includes("JPEG")
            ? e.message
            : "Couldn't read this HEIC photo. Save it as JPEG and try again.",
        );
        setProgress("");
        setUploading(false);
        onUploadingChange?.(false);
        return;
      }
      setUploading(false);
      onUploadingChange?.(false);
      setProgress("");
    }

    // Check before uploading, so the user gets a clear message instead of a failed request.
    if (!UPLOAD_TYPES.includes(file.type)) {
      setError("Unsupported image type. Use JPEG, PNG, WebP, AVIF or HEIC.");
      return;
    }
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setError(`File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max ${MAX_UPLOAD_MB}MB.`);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Warn (don't block) when the image is smaller than recommended: it would look blurry.
    if (spec) {
      const size = await readImageSize(objectUrl);
      if (size && (size.width < spec.minWidth || size.height < spec.minHeight)) {
        setWarning(
          `This image is ${size.width} × ${size.height} px, smaller than the recommended minimum of ` +
            `${spec.minWidth} × ${spec.minHeight} px, so it may look blurry on large screens. ` +
            `You can still use it, but a larger version will look sharper.`,
        );
      }
    }

    setUploading(true);
    onUploadingChange?.(true);
    setProgress("Uploading…");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const json = await adminFetch<{ url: string }>("/api/admin/upload", { method: "POST", body: form });
      onChange(json.url);
      setProgress("Uploaded");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setProgress("");
    } finally {
      // Show the saved image (or the previous one, if the upload failed), not the local preview.
      setPreview(null);
      URL.revokeObjectURL(objectUrl);
      setUploading(false);
      onUploadingChange?.(false);
    }
  }

  const shown = preview || value;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[#1F1F1F]">{label}</span>
        <Button
          type="button"
          variant="secondary"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={[...UPLOAD_TYPES, ...HEIC_ACCEPT].join(",")}
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files?.[0] || null);
          // Allow picking the same file again after an error.
          e.target.value = "";
        }}
      />
      <UploadGuidance spec={spec} />
      {shown ? (
        <div className="relative h-40 w-full overflow-hidden border border-[#D2D2D2] bg-[#F5F5F5]">
          <Image src={shown} alt="Preview" fill className="object-contain p-2" unoptimized />
        </div>
      ) : (
        // The empty box is itself a button, so there's one obvious place to click.
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex h-40 w-full flex-col items-center justify-center gap-1 border border-dashed border-[#9CA3AF] text-sm text-[#616161] transition hover:border-[#006DDB] hover:bg-[#F5F9FF] hover:text-[#006DDB]"
        >
          <span className="text-2xl leading-none" aria-hidden>+</span>
          Click to choose an image
        </button>
      )}
      {progress ? <p className="text-xs text-[#616161]">{progress}</p> : null}
      {warning ? <Alert tone="warning">{warning}</Alert> : null}
      {error ? <Alert tone="error">{error}</Alert> : null}
    </div>
  );
}
