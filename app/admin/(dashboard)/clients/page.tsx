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

type Client = {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  sortOrder: number;
  active: boolean;
  _count?: { projects: number };
};

const emptyForm = {
  name: "",
  logoUrl: "",
  websiteUrl: "",
  description: "",
  active: true,
};

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [active, setActive] = useState("");
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
  // Large enough that all clients fit on one page, so any logo can be dragged anywhere.
  const pageSize = 100;

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    // Ignore responses from older requests, so a slow one can't overwrite newer results.
    const requestId = ++latestRequest.current;
    if (!opts?.silent) setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (debouncedQ) params.set("q", debouncedQ);
      if (active) params.set("active", active);
      const json = await adminFetch<{ items: Client[]; total: number }>(`/api/admin/clients?${params}`);
      if (requestId !== latestRequest.current) return;
      setItems(json.items);
      setTotal(json.total);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [page, debouncedQ, active]);

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
    setSuccess("");
    scrollIntoViewSoon(formRef);
    setForm({
      name: item.name,
      logoUrl: item.logoUrl,
      websiteUrl: item.websiteUrl,
      description: item.description,
      active: item.active,
    });
    setShowForm(true);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (!form.logoUrl) throw new Error("Logo is required");
      await adminFetch(editing ? `/api/admin/clients/${editing.id}` : "/api/admin/clients", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(editing ? "Client updated" : "Client created");
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
      const json = await adminFetch<{ detachedProjects?: number }>(`/api/admin/clients/${deleteId}`, {
        method: "DELETE",
      });
      setDeleteId(null);
      setSuccess(
        json.detachedProjects
          ? `Client deleted (${json.detachedProjects} linked project(s) unlinked)`
          : "Client deleted",
      );
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
        title="Client Management"
        subtitle="Logos for /clients, About partners, and Services partners"
        action={<Button onClick={openCreate}>Add client</Button>}
      />

      <Card className="mb-4 flex flex-wrap gap-3">
        <Input
          placeholder="Search clients…"
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          className="max-w-xs"
        />
        <Select
          value={active}
          onChange={(e) => {
            setPage(1);
            setActive(e.target.value);
          }}
          className="max-w-[180px]"
        >
          <option value="">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </Select>
      </Card>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {showForm ? (
        <div ref={formRef} className="scroll-mt-4">
        <Card className="mb-5">
          <h3 className="mb-3 text-lg font-semibold text-[#1F1F1F]">{editing ? "Edit client" : "New client"}</h3>
          <form onSubmit={onSubmit} className="grid gap-4 laptop:grid-cols-2">
            <Field label="Client name">
              <Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Website URL">
              <Input
                type="url"
                value={form.websiteUrl}
                onChange={(e) => setForm((f) => ({ ...f, websiteUrl: e.target.value }))}
                placeholder="https://"
              />
            </Field>
            <div className="laptop:col-span-2">
              <Field label="Description">
                <TextArea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </Field>
            </div>
            <div className="laptop:col-span-2">
              <ImageUploader
                folder="clients"
                label="Client logo"
                spec={IMAGE_SPECS.clientLogo}
                value={form.logoUrl}
                onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
                onUploadingChange={setUploading}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
              Active on public site
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

      {loading ? (
        <Card>Loading clients…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No clients" body="Add client logos to populate the clients and partners sections." />
      ) : (
        <>
          <p className="mb-3 text-sm text-[#616161]">
            Drag the ⠿ handle to change the order logos appear on the website.
          </p>
          <SortableList
            items={items}
            onReorder={reorder}
            className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3"
            renderItem={(item, drag) => (
              <Card className="h-full">
                <div className="flex items-center gap-3">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-[#D2D2D2] bg-white">
                    <Image src={item.logoUrl} alt={item.name} fill sizes="64px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-[#1F1F1F]">{item.name}</p>
                    <p className="text-xs text-[#616161]">
                      {item.active ? "active" : "inactive"}
                      {item._count ? ` · ${item._count.projects} projects` : ""}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DragHandle drag={drag} label={item.name} />
                  <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                  <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
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
        title="Delete client?"
        body="Linked projects will keep their data but lose the client association. Logos are removed from disk only if unused."
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
