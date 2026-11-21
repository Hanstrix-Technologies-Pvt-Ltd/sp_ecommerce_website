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

type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  category: string;
  location: string;
  spaces: string;
  spacesDe: string;
  instagramUrl: string;
  coverImageUrl: string;
  clientId: string | null;
  completionYear: number | null;
  featured: boolean;
  status: "draft" | "published" | "archived";
  sortOrder: number;
  images?: { id?: string; imageUrl: string; altText: string; sortOrder: number }[];
  client?: { id: string; name: string } | null;
};

type ClientOption = { id: string; name: string };

const emptyForm = {
  title: "",
  slug: "",
  shortDescription: "",
  detailedDescription: "",
  category: "",
  location: "",
  spaces: "",
  spacesDe: "",
  instagramUrl: "",
  coverImageUrl: "",
  clientId: "",
  completionYear: "",
  featured: false,
  status: "published" as "draft" | "published" | "archived",
  sortOrder: 0,
  extraImages: [] as string[],
};

function slugify(v: string) {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const pageSize = 10;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (q) params.set("q", q);
      if (status) params.set("status", status);
      const [projRes, clientRes] = await Promise.all([
        fetch(`/api/admin/projects?${params}`),
        fetch("/api/admin/clients?pageSize=100&active=true"),
      ]);
      const projJson = await projRes.json();
      const clientJson = await clientRes.json();
      if (!projRes.ok || !projJson.success) throw new Error(projJson.message || "Failed to load");
      setItems(projJson.items);
      setTotal(projJson.total);
      if (clientJson.success) setClients(clientJson.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [page, q, status]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(item: Project) {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug,
      shortDescription: item.shortDescription,
      detailedDescription: item.detailedDescription,
      category: item.category,
      location: item.location,
      spaces: item.spaces,
      spacesDe: item.spacesDe,
      instagramUrl: item.instagramUrl,
      coverImageUrl: item.coverImageUrl,
      clientId: item.clientId || "",
      completionYear: item.completionYear ? String(item.completionYear) : "",
      featured: item.featured,
      status: item.status,
      sortOrder: item.sortOrder,
      extraImages: (item.images || []).map((i) => i.imageUrl),
    });
    setShowForm(true);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (!form.coverImageUrl) throw new Error("Cover image is required");
      const payload = {
        title: form.title,
        slug: form.slug || slugify(form.title),
        shortDescription: form.shortDescription,
        detailedDescription: form.detailedDescription,
        category: form.category,
        location: form.location,
        spaces: form.spaces,
        spacesDe: form.spacesDe,
        instagramUrl: form.instagramUrl,
        coverImageUrl: form.coverImageUrl,
        clientId: form.clientId || null,
        completionYear: form.completionYear ? Number(form.completionYear) : null,
        featured: form.featured,
        status: form.status,
        sortOrder: form.sortOrder,
        images: form.extraImages.map((url, index) => ({
          imageUrl: url,
          altText: form.title,
          sortOrder: index,
        })),
      };
      const res = await fetch(editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Save failed");
      setSuccess(editing ? "Project updated" : "Project created");
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
      const res = await fetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Delete failed");
      setDeleteId(null);
      setSuccess("Project deleted");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  async function move(id: string, direction: -1 | 1) {
    // The server moves the item within the full order (not just this page/filter), then we reload.
    setError("");
    try {
      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to reorder");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to reorder");
    }
    await load();
  }

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <PageTitle
        title="Key Projects"
        subtitle="Powers the home page STELZ Footprint carousel"
        action={<Button onClick={openCreate}>Add project</Button>}
      />

      <Card className="mb-4 flex flex-wrap gap-3">
        <Input
          placeholder="Search title, location, slug…"
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          className="max-w-xs"
        />
        <Select
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
          className="max-w-[180px]"
        >
          <option value="">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </Select>
      </Card>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {showForm ? (
        <Card className="mb-5">
          <h3 className="mb-3 text-lg font-semibold">{editing ? "Edit project" : "New project"}</h3>
          <form onSubmit={onSubmit} className="grid gap-4 laptop:grid-cols-2">
            <Field label="Title">
              <Input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: f.slug && editing ? f.slug : slugify(e.target.value),
                  }))
                }
              />
            </Field>
            <Field label="Slug" hint="URL-safe unique identifier">
              <Input required value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))} />
            </Field>
            <Field label="Location">
              <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
            </Field>
            <Field label="Category">
              <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </Field>
            <Field label="Car spaces (EN)">
              <Input value={form.spaces} onChange={(e) => setForm((f) => ({ ...f, spaces: e.target.value }))} />
            </Field>
            <Field label="Car spaces (DE)">
              <Input value={form.spacesDe} onChange={(e) => setForm((f) => ({ ...f, spacesDe: e.target.value }))} />
            </Field>
            <Field label="Instagram URL">
              <Input value={form.instagramUrl} onChange={(e) => setForm((f) => ({ ...f, instagramUrl: e.target.value }))} />
            </Field>
            <Field label="Completion year">
              <Input
                type="number"
                value={form.completionYear}
                onChange={(e) => setForm((f) => ({ ...f, completionYear: e.target.value }))}
              />
            </Field>
            <Field label="Client">
              <Select value={form.clientId} onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}>
                <option value="">None</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Field>
            <Field label="Status">
              <Select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Project["status"] }))}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </Select>
            </Field>
            <div className="laptop:col-span-2">
              <Field label="Short description">
                <TextArea rows={2} value={form.shortDescription} onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))} />
              </Field>
            </div>
            <div className="laptop:col-span-2">
              <Field label="Detailed description">
                <TextArea rows={4} value={form.detailedDescription} onChange={(e) => setForm((f) => ({ ...f, detailedDescription: e.target.value }))} />
              </Field>
            </div>
            <div className="laptop:col-span-2">
              <ImageUploader
                folder="projects"
                label="Cover image"
                value={form.coverImageUrl}
                onChange={(url) => setForm((f) => ({ ...f, coverImageUrl: url }))}
              />
            </div>
            <div className="laptop:col-span-2 space-y-2">
              <p className="text-sm font-medium">Additional photographs</p>
              <ImageUploader
                folder="projects"
                label="Add photograph"
                value=""
                onChange={(url) => setForm((f) => ({ ...f, extraImages: [...f.extraImages, url] }))}
              />
              <div className="flex flex-wrap gap-2">
                {form.extraImages.map((url) => (
                  <div key={url} className="relative h-20 w-28 overflow-hidden rounded border">
                    <Image src={url} alt="" fill className="object-cover" unoptimized />
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded bg-black/60 px-1 text-xs text-white"
                      onClick={() => setForm((f) => ({ ...f, extraImages: f.extraImages.filter((u) => u !== url) }))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
              Featured
            </label>
            <div className="flex gap-2 laptop:col-span-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      ) : null}

      {loading ? (
        <Card>Loading projects…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No projects yet" body="Add key projects to populate the home Footprint carousel." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-col gap-3 tablet:flex-row">
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-[#eef1f5] tablet:w-44">
                <Image src={item.coverImageUrl} alt={item.title} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0f2744]">{item.title}</p>
                <p className="text-xs text-[#5a6570]">
                  {item.status} · {item.location || "—"} · /{item.slug}
                  {item.client ? ` · ${item.client.name}` : ""}
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-[#5a6570]">{item.shortDescription || item.spaces}</p>
                <div className="mt-2 flex flex-wrap gap-2">
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
        title="Delete project?"
        body="This removes the project and its photo records. Uploaded files are removed only if unused elsewhere."
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  );
}
