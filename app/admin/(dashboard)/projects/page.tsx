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

type ClientOption = { id: string; name: string; active: boolean };

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
  status: "published" as "draft" | "published" | "archived",
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
  const [deleteError, setDeleteError] = useState("");
  const [uploadingCount, setUploadingCount] = useState(0);
  // Once the slug is typed by hand, stop regenerating it from the title.
  const [slugEdited, setSlugEdited] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const latestRequest = useRef(0);
  const debouncedQ = useDebouncedValue(q);
  // Large enough that all projects fit on one page, so any project can be dragged anywhere.
  const pageSize = 50;
  const onUploadingChange = useCallback(
    (uploading: boolean) => setUploadingCount((n) => Math.max(0, n + (uploading ? 1 : -1))),
    [],
  );

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    // Ignore responses from older requests, so a slow one can't overwrite newer results.
    const requestId = ++latestRequest.current;
    if (!opts?.silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (debouncedQ) params.set("q", debouncedQ);
      if (status) params.set("status", status);
      const [projJson, clientJson] = await Promise.all([
        adminFetch<{ items: Project[]; total: number }>(`/api/admin/projects?${params}`),
        // All clients, not only active ones: a project linked to an inactive client must still
        // show (and keep) that client in the dropdown.
        adminFetch<{ items: ClientOption[] }>("/api/admin/clients?pageSize=100").catch(() => null),
      ]);
      if (requestId !== latestRequest.current) return;
      setItems(projJson.items);
      setTotal(projJson.total);
      if (clientJson) setClients(clientJson.items);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [page, debouncedQ, status]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setSlugEdited(false);
    setShowForm(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
  }

  function openEdit(item: Project) {
    setEditing(item);
    setSlugEdited(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
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
      status: item.status,
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
        status: form.status,
        // sortOrder is not sent: edits keep the dragged position, new projects go last.
        // images (extra photographs) is not sent either: the website only shows the cover image,
        // and leaving the field out keeps any photos saved earlier instead of deleting them.
      };
      await adminFetch(editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
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
    setDeleteError("");
    try {
      await adminFetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Project deleted");
      await load();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  // Drag-and-drop: show the new order at once, save in the background (see useReorder).
  const reorder = useReorder<Project>("/api/admin/projects", {
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
        <div ref={formRef} className="scroll-mt-4">
        <Card className="mb-5">
          <h3 className="mb-3 text-lg font-semibold text-[#1F1F1F]">{editing ? "Edit project" : "New project"}</h3>
          <form onSubmit={onSubmit} className="grid gap-4 laptop:grid-cols-2">
            <Field label="Title">
              <Input
                required
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: slugEdited ? f.slug : slugify(e.target.value),
                  }))
                }
              />
            </Field>
            <Field label="Slug" hint="URL-safe unique identifier">
              <Input
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugEdited(true);
                  setForm((f) => ({ ...f, slug: slugify(e.target.value) }));
                }}
              />
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
              <Input
                type="url"
                placeholder="https://www.instagram.com/…"
                value={form.instagramUrl}
                onChange={(e) => setForm((f) => ({ ...f, instagramUrl: e.target.value }))}
              />
            </Field>
            <Field label="Completion year">
              <Input
                type="number"
                min={1950}
                max={2100}
                value={form.completionYear}
                onChange={(e) => setForm((f) => ({ ...f, completionYear: e.target.value }))}
              />
            </Field>
            <Field label="Client">
              <Select value={form.clientId} onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value }))}>
                <option value="">None</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.active ? "" : " (inactive)"}
                  </option>
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
                spec={IMAGE_SPECS.projectCover}
                value={form.coverImageUrl}
                onChange={(url) => setForm((f) => ({ ...f, coverImageUrl: url }))}
                onUploadingChange={onUploadingChange}
              />
            </div>
            <div className="flex gap-2 laptop:col-span-2">
              <Button type="submit" disabled={busy || uploadingCount > 0}>
                {busy ? "Saving…" : uploadingCount > 0 ? "Waiting for upload…" : "Save"}
              </Button>
              <Button type="button" variant="secondary" disabled={uploadingCount > 0} onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
        </div>
      ) : null}

      {loading ? (
        <Card>Loading projects…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No projects yet" body="Add key projects to populate the home Footprint carousel." />
      ) : (
        <>
          <p className="mb-3 text-sm text-[#616161]">
            Drag the ⠿ handle to change the order projects appear in the home page carousel.
          </p>
          <SortableList
            items={items}
            onReorder={reorder}
            className="space-y-3"
            renderItem={(item, drag) => (
              <Card className="flex flex-col gap-3 tablet:flex-row tablet:items-center">
                <div className="hidden tablet:block">
                  <DragHandle drag={drag} label={item.title} />
                </div>
                <div className="relative h-28 w-full shrink-0 overflow-hidden bg-[#F5F5F5] tablet:w-44">
                  <Image src={item.coverImageUrl} alt={item.title} fill sizes="(min-width: 768px) 176px, 100vw" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#1F1F1F]">{item.title}</p>
                  <p className="text-xs text-[#616161]">
                    {item.status} · {item.location || "—"} · /{item.slug}
                    {item.client ? ` · ${item.client.name}` : ""}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#616161]">{item.shortDescription || item.spaces}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <div className="tablet:hidden">
                      <DragHandle drag={drag} label={item.title} />
                    </div>
                    <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                    <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                  </div>
                </div>
              </Card>
            )}
          />
        </>
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
        title="Delete project?"
        body="This removes the project and its photo records. Uploaded files are removed only if unused elsewhere."
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
