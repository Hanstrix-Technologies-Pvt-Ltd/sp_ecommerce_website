"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  adminFetch,
  Alert,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  Field,
  ImageUploader,
  IMAGE_SPECS,
  Input,
  PageTitle,
  scrollIntoViewSoon,
  Select,
  TextArea,
  useDebouncedValue,
  useReorder,
} from "../../components/ui";
import { DragHandle, SortableList } from "../../components/Sortable";

type GalleryItem = {
  id: string;
  section: "installation" | "concept";
  title: string;
  titleDe: string;
  description: string;
  altText: string;
  category: string;
  imageUrl: string;
  projectId: string | null;
  featured: boolean;
  published: boolean;
  sortOrder: number;
};

const emptyForm = {
  section: "installation" as "installation" | "concept",
  title: "",
  titleDe: "",
  description: "",
  altText: "",
  category: "",
  imageUrl: "",
  projectId: "",
  published: true,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  // Order is per section, so start on a section (drag and drop needs one selected).
  const [section, setSection] = useState("installation");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const latestRequest = useRef(0);
  const debouncedQ = useDebouncedValue(q);
  // Large enough that a whole section fits on one page, so any image can be dragged anywhere.
  const pageSize = 60;

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    // Ignore responses from older requests, so a slow one can't overwrite newer results.
    const requestId = ++latestRequest.current;
    if (!opts?.silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (debouncedQ) params.set("q", debouncedQ);
      if (section) params.set("section", section);
      const json = await adminFetch<{ items: GalleryItem[]; total: number }>(`/api/admin/gallery?${params}`);
      if (requestId !== latestRequest.current) return;
      setItems(json.items);
      setTotal(json.total);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [page, debouncedQ, section]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
  }

  function openEdit(item: GalleryItem) {
    setEditing(item);
    setForm({
      section: item.section,
      title: item.title,
      titleDe: item.titleDe,
      description: item.description,
      altText: item.altText,
      category: item.category,
      imageUrl: item.imageUrl,
      projectId: item.projectId || "",
      published: item.published,
    });
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
      if (!form.imageUrl) throw new Error("Image is required");
      const payload = {
        ...form,
        projectId: form.projectId || null,
      };
      await adminFetch(editing ? `/api/admin/gallery/${editing.id}` : "/api/admin/gallery", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSuccess(editing ? "Gallery item updated" : "Gallery item created");
      setShowForm(false);
      if (section && section !== form.section) {
        // Saved into the other section: switch the list there (this reloads it), otherwise the
        // item would seem to have disappeared.
        setPage(1);
        setSection(form.section);
      } else {
        await load();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setBusy(true);
    setDeleteError("");
    try {
      await adminFetch(`/api/admin/gallery/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Gallery item deleted");
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
      setSuccess("Order saved");
    },
    onError: (message) => {
      setSuccess("");
      setError(message);
    },
  });

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <PageTitle
        title="Gallery Management"
        subtitle="Installations and 3D concept images shown on /gallery"
        action={<Button onClick={openCreate}>Add image</Button>}
      />

      <Card className="mb-4 flex flex-wrap gap-3">
        <Input
          placeholder="Search title, category, alt…"
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          className="max-w-xs"
        />
        <Select
          value={section}
          onChange={(e) => {
            setPage(1);
            setSection(e.target.value);
          }}
          className="max-w-[200px]"
        >
          <option value="">All sections</option>
          <option value="installation">Installations</option>
          <option value="concept">Concepts</option>
        </Select>
      </Card>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {showForm ? (
        <div ref={formRef} className="scroll-mt-4">
        <Card className="mb-5">
          <h3 className="mb-3 text-lg font-semibold text-[#1F1F1F]">
            {editing ? "Edit gallery item" : "New gallery item"}
          </h3>
          <form onSubmit={onSubmit} className="grid gap-4 laptop:grid-cols-2">
            <Field label="Section">
              <Select
                value={form.section}
                onChange={(e) =>
                  setForm((f) => ({ ...f, section: e.target.value as "installation" | "concept" }))
                }
              >
                <option value="installation">Installation</option>
                <option value="concept">Concept</option>
              </Select>
            </Field>
            <Field label="Category">
              <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </Field>
            <Field label="Title (EN)">
              <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </Field>
            <Field label="Title (DE)">
              <Input value={form.titleDe} onChange={(e) => setForm((f) => ({ ...f, titleDe: e.target.value }))} />
            </Field>
            <Field label="Alt text">
              <Input value={form.altText} onChange={(e) => setForm((f) => ({ ...f, altText: e.target.value }))} />
            </Field>
            <div className="laptop:col-span-2">
              <Field label="Description">
                <TextArea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                />
              </Field>
            </div>
            <div className="laptop:col-span-2">
              <ImageUploader
                folder="gallery"
                spec={form.section === "concept" ? IMAGE_SPECS.galleryConcept : IMAGE_SPECS.galleryInstallation}
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
                onUploadingChange={setUploading}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published (visible on the website; untick to keep as a draft)
            </label>
            <div className="flex gap-2 laptop:col-span-2">
              <Button type="submit" disabled={busy || uploading}>
                {busy ? "Saving…" : uploading ? "Waiting for upload…" : "Save"}
              </Button>
              <Button type="button" variant="secondary" disabled={uploading} onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
        </div>
      ) : null}

      {!loading && items.length > 0 ? (
        <p className="mb-3 text-sm text-[#616161]">
          {section
            ? "Drag the ⠿ handle to change the order images appear on the website."
            : "Choose Installations or Concepts above to reorder images (each section has its own order)."}
        </p>
      ) : null}

      {loading ? (
        <Card>Loading gallery…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No gallery items" body="Add installation or concept images to populate /gallery." />
      ) : (
        <SortableList
          items={items}
          onReorder={reorder}
          disabled={!section}
          className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3"
          renderItem={(item, drag) => (
            <Card className="h-full overflow-hidden p-0">
              <div className="relative h-40 w-full bg-[#F5F5F5]">
                <Image src={item.imageUrl} alt={item.altText || item.title || "Gallery"} fill sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div className="space-y-2 p-3">
                <div>
                  <p className="font-medium text-[#1F1F1F]">{item.title || "(untitled)"}</p>
                  <p className="text-xs text-[#616161]">
                    {item.section} · {item.published ? "published" : "draft"}
                    {item.category ? ` · ${item.category}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <DragHandle
                    drag={drag}
                    label={item.title || "image"}
                    disabledReason="Choose a section to reorder"
                  />
                  <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                  <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          )}
        />
      )}

      {pages > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-[#616161]">Page {page} / {pages}</span>
          <Button variant="secondary" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete gallery item?"
        body="This removes the record. Managed upload files are deleted only if nothing else references them."
        onCancel={() => {
          setDeleteId(null);
          setDeleteError("");
        }}
        onConfirm={confirmDelete}
        busy={busy}
        error={deleteError}
      />
    </div>
  );
}
