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
  saveVisibility,
  scrollIntoViewSoon,
  Tabs,
  useDebouncedValue,
  useReorder,
  VISIBILITY_FILTERS,
  VisibilityBadge,
  type VisibilityFilterValue,
} from "../../components/ui";
import { DragHandle, SortableList } from "../../components/Sortable";

type Status = "draft" | "published" | "archived";

type Project = {
  id: string;
  title: string;
  location: string;
  spaces: string;
  spacesDe: string;
  instagramUrl: string;
  coverImageUrl: string;
  status: Status;
  sortOrder: number;
};

/*
 * Only what the Home page "STELZ Footprint" cards show: photo, name, location, car spaces and an
 * Instagram link. Slug, category, client, completion year and descriptions were never displayed,
 * so they're no longer asked for (the slug is made automatically; values saved earlier are left
 * untouched because they're simply not sent).
 */
const emptyForm = { title: "", location: "", spaces: "", spacesDe: "", instagramUrl: "", coverImageUrl: "", shown: true };

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<VisibilityFilterValue>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [uploading, setUploading] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const latestRequest = useRef(0);
  const debouncedQ = useDebouncedValue(q);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    // Ignore responses from older requests, so a slow one can't overwrite newer results.
    const requestId = ++latestRequest.current;
    if (!opts?.silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: "1", pageSize: "100" });
      if (debouncedQ) params.set("q", debouncedQ);
      const json = await adminFetch<{ items: Project[] }>(`/api/admin/projects?${params}`);
      if (requestId !== latestRequest.current) return;
      setItems(json.items);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [debouncedQ]);

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

  function openEdit(item: Project) {
    setEditing(item);
    setForm({
      title: item.title,
      location: item.location,
      spaces: item.spaces,
      spacesDe: item.spacesDe,
      instagramUrl: item.instagramUrl,
      coverImageUrl: item.coverImageUrl,
      shown: item.status === "published",
    });
    setShowForm(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
  }

  // Shown = published. Hidden keeps an existing "archived" as it was, otherwise "draft".
  const statusFor = (shown: boolean, current?: Status): Status =>
    shown ? "published" : current && current !== "published" ? current : "draft";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (!form.coverImageUrl) throw new Error("Please choose a photo first.");
      const { shown, ...fields } = form;
      // sortOrder isn't sent (edits keep their dragged position, new projects go last), and neither
      // is the slug: new projects get one made from the name, existing ones keep theirs.
      const payload = { ...fields, status: statusFor(shown, editing?.status) };
      await adminFetch(editing ? `/api/admin/projects/${editing.id}` : "/api/admin/projects", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSuccess(editing ? "Saved." : "Project added.");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggle(item: Project) {
    setError("");
    setSuccess("");
    const shown = item.status === "published";
    const status = statusFor(!shown, item.status);
    // Change the card at once; save in the background and undo if the save fails.
    setItems((list) => list.map((p) => (p.id === item.id ? { ...p, status } : p)));
    try {
      await saveVisibility(`/api/admin/projects/${item.id}`, { status });
      setSuccess(shown ? "Hidden from the website." : "Now shown on the website.");
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
      await adminFetch(`/api/admin/projects/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Project deleted.");
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
      setSuccess("Order saved.");
    },
    onError: (message) => {
      setSuccess("");
      setError(message);
    },
  });

  const isShown = (p: Project) => p.status === "published";
  const visible = items.filter((p) => (filter === "all" ? true : filter === "shown" ? isShown(p) : !isShown(p)));
  // Reordering a filtered or searched subset would make the rest of the list vanish from the
  // screen until the next reload, so dragging is only offered on the full list.
  const canReorder = filter === "all" && !q.trim();

  return (
    <div>
      <PageTitle
        title="Key Projects"
        subtitle="Project cards in the “STELZ Footprint” carousel on the Home page."
        action={<Button onClick={openCreate}>+ Add project</Button>}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Input placeholder="Search by name or location…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Tabs label="Filter" value={filter} onChange={setFilter} options={VISIBILITY_FILTERS} />
      </div>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {showForm ? (
        <div ref={formRef} className="scroll-mt-4">
          <Card className="mb-5">
            <h3 className="mb-4 text-lg font-semibold text-[#1F1F1F]">{editing ? "Edit project" : "Add project"}</h3>
            <form onSubmit={onSubmit} className="space-y-5">
              <ImageUploader
                folder="projects"
                label="Photo"
                spec={IMAGE_SPECS.projectCover}
                value={form.coverImageUrl}
                onChange={(url) => setForm((f) => ({ ...f, coverImageUrl: url }))}
                onUploadingChange={setUploading}
              />
              <div className="grid gap-4 laptop:grid-cols-2">
                <Field label="Project name">
                  <Input required maxLength={200} value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. NCC Urban Park View" />
                </Field>
                <Field label="Location">
                  <Input maxLength={200} value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Bengaluru" />
                </Field>
                <Field label="Car spaces, optional" hint="e.g. 120. Leave empty to hide this line.">
                  <Input maxLength={120} value={form.spaces} onChange={(e) => setForm((f) => ({ ...f, spaces: e.target.value }))} />
                </Field>
                <Field label="Car spaces (German), optional" hint="Only if the German text differs. Otherwise leave empty.">
                  <Input maxLength={120} value={form.spacesDe} onChange={(e) => setForm((f) => ({ ...f, spacesDe: e.target.value }))} />
                </Field>
                <div className="laptop:col-span-2">
                  <Field label="Instagram link, optional" hint="Adds an Instagram icon to the card that opens this post or reel.">
                    <Input type="url" placeholder="https://www.instagram.com/reel/…" value={form.instagramUrl} onChange={(e) => setForm((f) => ({ ...f, instagramUrl: e.target.value }))} />
                  </Field>
                </div>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.shown} onChange={(e) => setForm((f) => ({ ...f, shown: e.target.checked }))} />
                Show on the website
              </label>
              <div className="flex gap-2">
                <Button type="submit" disabled={busy || uploading}>
                  {busy ? "Saving…" : uploading ? "Waiting for upload…" : "Save"}
                </Button>
                <Button type="button" variant="secondary" disabled={uploading} onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}

      {loading ? (
        <Card>Loading…</Card>
      ) : visible.length === 0 ? (
        <EmptyState
          title={items.length ? "Nothing matches" : "No projects yet"}
          body={items.length ? "Clear the search or choose “All”." : "Click “+ Add project” to add the first one."}
        />
      ) : (
        <>
          <p className="mb-3 text-sm text-[#616161]">
            {items.filter(isShown).length} of {items.length} shown on the website.{" "}
            {canReorder ? "Drag ⠿ to change the order." : "To change the order, choose “All” and clear the search."}
          </p>
          <SortableList
            items={visible}
            onReorder={reorder}
            disabled={!canReorder}
            className="space-y-3"
            renderItem={(item, drag) => (
              <Card className={`flex flex-col gap-3 tablet:flex-row tablet:items-center ${isShown(item) ? "" : "opacity-70"}`}>
                <div className="relative h-28 w-full shrink-0 overflow-hidden bg-[#F5F5F5] tablet:w-44">
                  <Image src={item.coverImageUrl} alt={item.title} fill sizes="(min-width: 768px) 176px, 100vw" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-[#1F1F1F]">{item.title}</p>
                    <VisibilityBadge shown={isShown(item)} />
                  </div>
                  <p className="mt-0.5 text-sm text-[#616161]">
                    {item.location || "No location"}
                    {item.spaces ? ` · Car spaces: ${item.spaces}` : ""}
                    {item.instagramUrl ? " · Instagram link" : ""}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    <DragHandle drag={drag} label={item.title} disabledReason="Choose “All” and clear the search to reorder" />
                    <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                    <Button type="button" variant="secondary" onClick={() => toggle(item)}>{isShown(item) ? "Hide" : "Show"}</Button>
                    <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                  </div>
                </div>
              </Card>
            )}
          />
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete this project?"
        body="It will be removed from the Home page. To take it off the website but keep it here, use Hide instead."
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
