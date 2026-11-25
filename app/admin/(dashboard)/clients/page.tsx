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

type Client = {
  id: string;
  name: string;
  logoUrl: string;
  active: boolean;
  sortOrder: number;
};

/*
 * Only what the website uses: the logo and the client's name (the logo's description for search
 * engines and screen readers). Website URL and description were never displayed, so they're no
 * longer asked for; values saved earlier are left untouched because they're simply not sent.
 */
const emptyForm = { name: "", logoUrl: "", active: true };

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<VisibilityFilterValue>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<Client | null>(null);
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
      const json = await adminFetch<{ items: Client[] }>(`/api/admin/clients?${params}`);
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

  function openEdit(item: Client) {
    setEditing(item);
    setForm({ name: item.name, logoUrl: item.logoUrl, active: item.active });
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
      if (!form.logoUrl) throw new Error("Please choose a logo first.");
      await adminFetch(editing ? `/api/admin/clients/${editing.id}` : "/api/admin/clients", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(editing ? "Saved." : "Client added.");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggle(item: Client) {
    setError("");
    setSuccess("");
    // Change the card at once; save in the background and undo if the save fails.
    setItems((list) => list.map((c) => (c.id === item.id ? { ...c, active: !item.active } : c)));
    try {
      await saveVisibility(`/api/admin/clients/${item.id}`, { active: !item.active });
      setSuccess(item.active ? "Hidden from the website." : "Now shown on the website.");
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
      await adminFetch(`/api/admin/clients/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Client deleted.");
      await load();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  // Drag-and-drop: show the new order at once, save in the background (see useReorder).
  const reorder = useReorder<Client>("/api/admin/clients", {
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

  const visible = items.filter((c) => (filter === "all" ? true : filter === "shown" ? c.active : !c.active));
  // Reordering a filtered or searched subset would make the rest of the list vanish from the
  // screen until the next reload, so dragging is only offered on the full list.
  const canReorder = filter === "all" && !q.trim();

  return (
    <div>
      <PageTitle
        title="Clients"
        subtitle="Client logos on the Clients page, the About page and the Services page (Services shows the first 7)."
        action={<Button onClick={openCreate}>+ Add client</Button>}
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Input placeholder="Search by name…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Tabs label="Filter" value={filter} onChange={setFilter} options={VISIBILITY_FILTERS} />
      </div>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {showForm ? (
        <div ref={formRef} className="scroll-mt-4">
          <Card className="mb-5">
            <h3 className="mb-4 text-lg font-semibold text-[#1F1F1F]">{editing ? "Edit client" : "Add client"}</h3>
            <form onSubmit={onSubmit} className="space-y-5">
              <ImageUploader
                folder="clients"
                label="Logo"
                spec={IMAGE_SPECS.clientLogo}
                value={form.logoUrl}
                onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
                onUploadingChange={setUploading}
              />
              <div className="max-w-xl">
                <Field label="Client name" hint="Not shown as text. It describes the logo to Google and to screen readers.">
                  <Input required maxLength={200} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Brigade Group" />
                </Field>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
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
          title={items.length ? "Nothing matches" : "No clients yet"}
          body={items.length ? "Clear the search or choose “All”." : "Click “+ Add client” to add the first logo."}
        />
      ) : (
        <>
          <p className="mb-3 text-sm text-[#616161]">
            {items.filter((c) => c.active).length} of {items.length} shown on the website.{" "}
            {canReorder ? "Drag ⠿ to change the order." : "To change the order, choose “All” and clear the search."}
          </p>
          <SortableList
            items={visible}
            onReorder={reorder}
            disabled={!canReorder}
            className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3"
            renderItem={(item, drag) => (
              <Card className={`h-full ${item.active ? "" : "opacity-70"}`}>
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-[#D2D2D2] bg-white">
                    <Image src={item.logoUrl} alt={item.name} fill sizes="64px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="truncate font-medium capitalize text-[#1F1F1F]">{item.name}</p>
                    <VisibilityBadge shown={item.active} />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DragHandle drag={drag} label={item.name} disabledReason="Choose “All” and clear the search to reorder" />
                  <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                  <Button type="button" variant="secondary" onClick={() => toggle(item)}>{item.active ? "Hide" : "Show"}</Button>
                  <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                </div>
              </Card>
            )}
          />
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete this client?"
        body="The logo will be removed from the website. To take it off the website but keep it here, use Hide instead."
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
