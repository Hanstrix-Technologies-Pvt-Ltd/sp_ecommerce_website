"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  adminFetch,
  Alert,
  Button,
  Card,
  ConfirmDialog,
  Field,
  ImageUploader,
  IMAGE_SPECS,
  Input,
  saveVisibility,
  scrollIntoViewSoon,
  useReorder,
  VisibilityBadge,
} from "../../components/ui";
import { DragHandle, SortableList } from "../../components/Sortable";

export type Section = "installation" | "concept";

type GalleryItem = {
  id: string;
  section: Section;
  title: string;
  titleDe: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
};

/*
 * The Gallery page has two carousels; each has its own admin page (installations / concepts)
 * built from this component, with its own images and its own "Add" button. Only what the website shows is asked for: the image, plus
 * a caption for 3D concepts (category, alt text and description were never displayed; values
 * saved earlier are left untouched because they're simply not sent).
 */
export const SECTIONS: Record<Section, { heading: string; where: string; add: string; noun: string; other: Section }> = {
  installation: {
    heading: "Installation photos",
    where: "Top carousel on the Gallery page, titled “Installations”. Photos of real STELZ parking systems. No caption is shown.",
    add: "+ Add installation photo",
    noun: "installation photo",
    other: "concept",
  },
  concept: {
    heading: "3D concepts",
    where: "Lower carousel on the Gallery page, titled “3D Concepts”. 3D renders, each shown with a caption underneath.",
    add: "+ Add 3D concept",
    noun: "3D concept",
    other: "installation",
  },
};

export default function GallerySection({ section }: { section: Section }) {
  const info = SECTIONS[section];
  const isConcept = section === "concept";
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ title: "", titleDe: "", imageUrl: "", published: true });
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const latestRequest = useRef(0);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    // Ignore responses from older requests, so a slow one can't overwrite newer results.
    const requestId = ++latestRequest.current;
    if (!opts?.silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: "1", pageSize: "100", section });
      const json = await adminFetch<{ items: GalleryItem[] }>(`/api/admin/gallery?${params}`);
      if (requestId !== latestRequest.current) return;
      setItems(json.items);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm({ title: "", titleDe: "", imageUrl: "", published: true });
    setShowForm(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({ title: item.title, titleDe: item.titleDe, imageUrl: item.imageUrl, published: item.published });
    setShowForm(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (!form.imageUrl) throw new Error("Please choose an image first.");
      if (isConcept && !form.title.trim()) throw new Error("Please add a caption.");
      // Installation photos have no caption on the website, so only the image is sent for them.
      const payload = isConcept
        ? { section, ...form }
        : { section, imageUrl: form.imageUrl, published: form.published };
      await adminFetch(editing ? `/api/admin/gallery/${editing.id}` : "/api/admin/gallery", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSuccess(editing ? "Saved." : `${info.noun[0].toUpperCase()}${info.noun.slice(1)} added.`);
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  // For an image added to the wrong carousel.
  async function moveToOther() {
    if (!editing) return;
    setBusy(true);
    setError("");
    // 3D concepts are shown with a caption; a photo without one would show an empty caption,
    // so it arrives hidden until a caption is added there.
    const needsCaption = info.other === "concept" && !editing.title.trim();
    try {
      await adminFetch(`/api/admin/gallery/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(needsCaption ? { section: info.other, published: false } : { section: info.other }),
      });
      setShowForm(false);
      setSuccess(
        needsCaption
          ? `Moved to ${SECTIONS[info.other].heading} as hidden, because it has no caption yet. Open it there, add a caption and tick “Show on the website”.`
          : `Moved to ${SECTIONS[info.other].heading}. You can find it on that page now.`,
      );
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Move failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggle(item: GalleryItem) {
    setError("");
    setSuccess("");
    // Change the card at once; save in the background and undo if the save fails.
    setItems((list) => list.map((g) => (g.id === item.id ? { ...g, published: !item.published } : g)));
    try {
      await saveVisibility(`/api/admin/gallery/${item.id}`, { published: !item.published });
      setSuccess(item.published ? "Hidden from the website." : "Now shown on the website.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      await load({ silent: true });
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setBusy(true);
    setDeleteError("");
    try {
      await adminFetch(`/api/admin/gallery/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Deleted.");
      await load();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  // Drag-and-drop: show the new order at once, save in the background (see useReorder).
  const reorder = useReorder<GalleryItem>("/api/admin/gallery", {
    setItems,
    reload: () => load({ silent: true }),
    onSaved: () => {
      setError("");
      setSuccess("Order saved.");
    },
    onError: (message) => {
      setSuccess("");
      setError(message);
    },
  });

  const shown = items.filter((i) => i.published).length;

  return (
    <section aria-labelledby={`gallery-${section}`} className="border border-[#E5E7EB] bg-white">
      {/* Section header: what it is, where it shows, and its own Add button */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-4 tablet:px-5">
        <div className="min-w-0 max-w-2xl">
          <h3 id={`gallery-${section}`} className="text-lg font-semibold text-[#1F1F1F]">
            {info.heading}
            {!loading ? (
              <span className="ml-2 text-sm font-normal text-[#616161]">
                {shown} of {items.length} shown on the website
              </span>
            ) : null}
          </h3>
          <p className="mt-1 text-sm text-[#616161]">{info.where}</p>
        </div>
        <Button onClick={openCreate}>{info.add}</Button>
      </div>

      <div className="space-y-4 p-4 tablet:p-5">
        {error ? <Alert tone="error">{error}</Alert> : null}
        {success ? <Alert tone="success">{success}</Alert> : null}

        {showForm ? (
          <div ref={formRef} className="scroll-mt-4 border border-[#006DDB] bg-[#F5F9FF] p-4">
            <h4 className="mb-4 font-semibold text-[#1F1F1F]">
              {editing ? `Edit ${info.noun}` : `Add ${info.noun}`}
            </h4>
            <form onSubmit={onSubmit} className="space-y-5">
              <ImageUploader
                folder="gallery"
                label="Image"
                spec={isConcept ? IMAGE_SPECS.galleryConcept : IMAGE_SPECS.galleryInstallation}
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                onUploadingChange={setUploading}
              />
              {isConcept ? (
                <div className="grid gap-4 laptop:grid-cols-2">
                  <Field label="Caption (English)" hint="Shown under the image, e.g. “2-Level Puzzle Parking”.">
                    <Input required maxLength={200} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                  </Field>
                  <Field label="Caption (German), optional" hint="Used on German pages. If empty, the English caption is shown.">
                    <Input maxLength={200} value={form.titleDe} onChange={(e) => setForm((f) => ({ ...f, titleDe: e.target.value }))} />
                  </Field>
                </div>
              ) : null}
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} />
                Show on the website
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <Button type="submit" disabled={busy || uploading}>
                  {busy ? "Saving…" : uploading ? "Waiting for upload…" : "Save"}
                </Button>
                <Button type="button" variant="secondary" disabled={uploading} onClick={() => setShowForm(false)}>Cancel</Button>
                {editing ? (
                  <button
                    type="button"
                    disabled={busy || uploading}
                    onClick={moveToOther}
                    className="ml-auto text-sm text-[#006DDB] underline-offset-2 hover:underline disabled:opacity-50"
                  >
                    Wrong carousel? Move to {SECTIONS[info.other].heading}
                  </button>
                ) : null}
              </div>
            </form>
          </div>
        ) : null}

        {loading ? (
          <p className="py-6 text-center text-sm text-[#616161]">Loading…</p>
        ) : items.length === 0 ? (
          <button
            type="button"
            onClick={openCreate}
            className="flex w-full flex-col items-center justify-center gap-1 border border-dashed border-[#9CA3AF] py-10 text-sm text-[#616161] hover:border-[#006DDB] hover:text-[#006DDB]"
          >
            <span className="text-2xl leading-none" aria-hidden>+</span>
            No {info.noun}s yet. Click to add the first one.
          </button>
        ) : (
          <>
            <p className="text-sm text-[#616161]">Drag ⠿ to change the order they appear in the carousel.</p>
            <SortableList
              items={items}
              onReorder={reorder}
              className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4"
              renderItem={(item, drag) => (
                <Card className={`h-full overflow-hidden p-0 ${item.published ? "" : "opacity-70"}`}>
                  <div className={`relative w-full bg-[#F5F5F5] ${isConcept ? "aspect-square" : "aspect-[16/10]"}`}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title || info.noun}
                      fill
                      sizes="(min-width: 1280px) 280px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={isConcept ? "object-contain p-2" : "object-cover"}
                    />
                  </div>
                  <div className="space-y-2.5 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {isConcept ? (
                        <p className="min-w-0 truncate text-sm font-medium text-[#1F1F1F]" title={item.title}>
                          {item.title || "(no caption)"}
                        </p>
                      ) : null}
                      <VisibilityBadge shown={item.published} />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <DragHandle drag={drag} label={item.title || info.noun} />
                      <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                      <Button type="button" variant="secondary" onClick={() => toggle(item)}>{item.published ? "Hide" : "Show"}</Button>
                      <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                    </div>
                  </div>
                </Card>
              )}
            />
          </>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title={`Delete this ${info.noun}?`}
        body="It will be removed from the website. To take it off the website but keep it here, use Hide instead."
        onCancel={() => {
          setDeleteId(null);
          setDeleteError("");
        }}
        onConfirm={confirmDelete}
        busy={busy}
        error={deleteError}
      />
    </section>
  );
}
