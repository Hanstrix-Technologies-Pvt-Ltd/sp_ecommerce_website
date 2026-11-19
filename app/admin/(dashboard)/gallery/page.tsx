"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  Field,
  ImageUploader,
  Input,
  PageTitle,
  Select,
  TextArea,
} from "../../components/ui";

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
  featured: false,
  published: true,
  sortOrder: 0,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 12;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
      if (q) params.set("q", q);
      if (section) params.set("section", section);
      const res = await fetch(`/api/admin/gallery?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to load");
      setItems(json.items);
      setTotal(json.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [page, q, section]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
    setSuccess("");
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
      featured: item.featured,
      published: item.published,
      sortOrder: item.sortOrder,
    });
    setShowForm(true);
    setSuccess("");
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
      const res = await fetch(editing ? `/api/admin/gallery/${editing.id}` : "/api/admin/gallery", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Save failed");
      setSuccess(editing ? "Gallery item updated" : "Gallery item created");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/gallery/${deleteId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Delete failed");
      setDeleteId(null);
      setSuccess("Gallery item deleted");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  async function move(id: string, direction: -1 | 1) {
    const index = items.findIndex((i) => i.id === id);
    const swap = index + direction;
    if (index < 0 || swap < 0 || swap >= items.length) return;
    const ordered = [...items];
    const tmp = ordered[index];
    ordered[index] = ordered[swap];
    ordered[swap] = tmp;
    setItems(ordered);
    await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: ordered.map((i) => i.id) }),
    });
  }

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
        <Card className="mb-5">
          <h3 className="mb-3 text-lg font-semibold text-[#0f2744]">
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
            <Field label="Sort order">
              <Input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) || 0 }))}
              />
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
                value={form.imageUrl}
                onChange={(url) => setForm((f) => ({ ...f, imageUrl: url }))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              />
              Published
            </label>
            <div className="flex gap-2 laptop:col-span-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      ) : null}

      {loading ? (
        <Card>Loading gallery…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No gallery items" body="Add installation or concept images to populate /gallery." />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden p-0">
              <div className="relative h-40 w-full bg-[#eef1f5]">
                <Image src={item.imageUrl} alt={item.altText || item.title || "Gallery"} fill className="object-cover" unoptimized />
              </div>
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-[#0f2744]">{item.title || "(untitled)"}</p>
                    <p className="text-xs text-[#5a6570]">
                      {item.section} · {item.published ? "published" : "draft"}
                      {item.category ? ` · ${item.category}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                  <Button type="button" variant="ghost" onClick={() => move(item.id, -1)}>↑</Button>
                  <Button type="button" variant="ghost" onClick={() => move(item.id, 1)}>↓</Button>
                  <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {pages > 1 ? (
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-[#5a6570]">Page {page} / {pages}</span>
          <Button variant="secondary" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      ) : null}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete gallery item?"
        body="This removes the record. Managed upload files are deleted only if nothing else references them."
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  );
}
