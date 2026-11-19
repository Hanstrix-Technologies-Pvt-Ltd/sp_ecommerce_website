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
  sortOrder: 0,
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
  const pageSize = 24;

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (q) params.set("q", q);
      if (active) params.set("active", active);
      const res = await fetch(`/api/admin/clients?${params}`);
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Failed to load");
      setItems(json.items);
      setTotal(json.total);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [page, q, active]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(item: Client) {
    setEditing(item);
    setForm({
      name: item.name,
      logoUrl: item.logoUrl,
      websiteUrl: item.websiteUrl,
      description: item.description,
      sortOrder: item.sortOrder,
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
      const res = await fetch(editing ? `/api/admin/clients/${editing.id}` : "/api/admin/clients", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Save failed");
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
    try {
      const res = await fetch(`/api/admin/clients/${deleteId}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Delete failed");
      setDeleteId(null);
      setSuccess(
        json.detachedProjects
          ? `Client deleted (${json.detachedProjects} linked project(s) unlinked)`
          : "Client deleted",
      );
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
    [ordered[index], ordered[swap]] = [ordered[swap], ordered[index]];
    setItems(ordered);
    await fetch("/api/admin/clients", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds: ordered.map((i) => i.id) }),
    });
  }

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
        <Card className="mb-5">
          <h3 className="mb-3 text-lg font-semibold">{editing ? "Edit client" : "New client"}</h3>
          <form onSubmit={onSubmit} className="grid gap-4 laptop:grid-cols-2">
            <Field label="Client name">
              <Input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Website URL">
              <Input
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
                value={form.logoUrl}
                onChange={(url) => setForm((f) => ({ ...f, logoUrl: url }))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
              Active on public site
            </label>
            <div className="flex gap-2 laptop:col-span-2">
              <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </form>
        </Card>
      ) : null}

      {loading ? (
        <Card>Loading clients…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No clients" body="Add client logos to populate the clients and partners sections." />
      ) : (
        <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-white">
                  <Image src={item.logoUrl} alt={item.name} fill className="object-contain p-1" unoptimized />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-[#0f2744]">{item.name}</p>
                  <p className="text-xs text-[#5a6570]">
                    {item.active ? "active" : "inactive"}
                    {item._count ? ` · ${item._count.projects} projects` : ""}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                <Button type="button" variant="ghost" onClick={() => move(item.id, -1)}>↑</Button>
                <Button type="button" variant="ghost" onClick={() => move(item.id, 1)}>↓</Button>
                <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
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
        title="Delete client?"
        body="Linked projects will keep their data but lose the client association. Logos are removed from disk only if unused."
        onCancel={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        busy={busy}
      />
    </div>
  );
}
