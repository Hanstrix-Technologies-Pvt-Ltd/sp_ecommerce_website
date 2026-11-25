"use client";

/* eslint-disable @next/next/no-img-element -- YouTube thumbnails: plain <img> avoids adding
   i.ytimg.com to next/image's allowed hosts for an admin-only preview. */
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  adminFetch,
  Alert,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  Field,
  Input,
  PageTitle,
  scrollIntoViewSoon,
  useReorder,
  VisibilityBadge,
} from "../../components/ui";
import { DragHandle, SortableList } from "../../components/Sortable";
import { parseYouTubeId, youtubeThumbnail, youtubeWatchUrl } from "@/lib/cms/youtube";

type Testimonial = {
  id: string;
  title: string;
  youtubeId: string;
  active: boolean;
  sortOrder: number;
};

const emptyForm = { title: "", youtubeUrl: "", active: true };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const latestRequest = useRef(0);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    // Ignore responses from older requests, so a slow one can't overwrite newer results.
    const requestId = ++latestRequest.current;
    if (!opts?.silent) setLoading(true);
    setError("");
    try {
      const json = await adminFetch<{ items: Testimonial[] }>("/api/admin/testimonials");
      if (requestId !== latestRequest.current) return;
      setItems(json.items);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, []);

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

  function openEdit(item: Testimonial) {
    setEditing(item);
    setForm({ title: item.title, youtubeUrl: youtubeWatchUrl(item.youtubeId), active: item.active });
    setShowForm(true);
    setSuccess("");
    scrollIntoViewSoon(formRef);
  }

  const previewId = parseYouTubeId(form.youtubeUrl);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      if (!previewId) throw new Error("Paste a valid YouTube video link (e.g. https://youtu.be/…)");
      await adminFetch(editing ? `/api/admin/testimonials/${editing.id}` : "/api/admin/testimonials", {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(editing ? "Testimonial updated" : "Testimonial added");
      setShowForm(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(item: Testimonial) {
    setError("");
    setSuccess("");
    // Change the card at once; save in the background and undo if the save fails.
    setItems((list) => list.map((t) => (t.id === item.id ? { ...t, active: !item.active } : t)));
    try {
      await adminFetch(`/api/admin/testimonials/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !item.active }),
      });
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
      await adminFetch(`/api/admin/testimonials/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Testimonial deleted");
      await load();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  // Drag-and-drop: show the new order at once, save in the background (see useReorder).
  const reorder = useReorder<Testimonial>("/api/admin/testimonials", {
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

  const shown = items.filter((i) => i.active).length;

  return (
    <div>
      <PageTitle
        title="Testimonials"
        subtitle='YouTube videos in the "Real Stories. Real Satisfaction." section of the Clients page'
        action={<Button onClick={openCreate}>+ Add testimonial</Button>}
      />

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {showForm ? (
        <div ref={formRef} className="scroll-mt-4">
          <Card className="mb-5">
            <h3 className="mb-3 text-lg font-semibold text-[#1F1F1F]">
              {editing ? "Edit testimonial" : "New testimonial"}
            </h3>
            <form onSubmit={onSubmit} className="grid gap-4 laptop:grid-cols-2">
              <div className="space-y-4">
                <Field label="Name (client or project)">
                  <Input
                    required
                    maxLength={200}
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="e.g. TGN Lotus Elite Mall"
                  />
                </Field>
                <Field label="YouTube video link">
                  <Input
                    required
                    value={form.youtubeUrl}
                    onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
                    placeholder="https://youtu.be/… or https://www.youtube.com/watch?v=…"
                  />
                </Field>
                <p className="text-xs text-[#616161]">
                  On YouTube, click <span className="font-medium">Share</span> under the video and copy the link.
                  The video must be Public or Unlisted.
                </p>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                  />
                  Show on the website
                </label>
                <div className="flex gap-2">
                  <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
                  <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button>
                </div>
              </div>

              {/* Live preview: the same player visitors will see. */}
              <div>
                <p className="mb-1.5 text-sm font-medium text-[#1F1F1F]">Preview</p>
                {previewId ? (
                  <div className="aspect-video overflow-hidden border border-[#D2D2D2] bg-black">
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${previewId}`}
                      title="Preview"
                      allow="encrypted-media; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center border border-dashed border-[#D2D2D2] px-4 text-center text-sm text-[#616161]">
                    {form.youtubeUrl ? "That doesn't look like a YouTube video link." : "Paste a YouTube link to preview it here."}
                  </div>
                )}
              </div>
            </form>
          </Card>
        </div>
      ) : null}

      {loading ? (
        <Card>Loading testimonials…</Card>
      ) : items.length === 0 ? (
        <EmptyState title="No testimonials" body="Add a YouTube video to show it on the Clients page." />
      ) : (
        <>
          <p className="mb-3 text-sm text-[#616161]">
            {shown} of {items.length} shown on the website. Drag the ⠿ handle to change the order.
            {shown % 3 !== 0 ? " Tip: the website shows 3 videos per row, so a multiple of 3 fills the rows evenly." : ""}
          </p>
          <SortableList
            items={items}
            onReorder={reorder}
            className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-3"
            renderItem={(item, drag) => (
              <Card className={`h-full ${item.active ? "" : "opacity-60"}`}>
                <a
                  href={youtubeWatchUrl(item.youtubeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-video overflow-hidden border border-[#D2D2D2] bg-[#F5F5F5]"
                  title="Open on YouTube"
                >
                  <img
                    src={youtubeThumbnail(item.youtubeId)}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white">▶</span>
                  </span>
                </a>
                <p className="mt-3 truncate font-medium text-[#1F1F1F]" title={item.title}>{item.title}</p>
                <div className="mt-1"><VisibilityBadge shown={item.active} /></div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <DragHandle drag={drag} label={item.title} />
                  <Button type="button" variant="secondary" onClick={() => openEdit(item)}>Edit</Button>
                  <Button type="button" variant="secondary" onClick={() => toggleActive(item)}>
                    {item.active ? "Hide" : "Show"}
                  </Button>
                  <Button type="button" variant="danger" onClick={() => setDeleteId(item.id)}>Delete</Button>
                </div>
              </Card>
            )}
          />
        </>
      )}

      <ConfirmDialog
        open={Boolean(deleteId)}
        title="Delete testimonial?"
        body="The video is removed from the Clients page. The video itself stays on YouTube."
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
