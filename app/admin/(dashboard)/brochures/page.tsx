"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink, FileText, RotateCcw, Upload } from "lucide-react";
import { adminFetch, Alert, Button, Card, ConfirmDialog, PageTitle } from "../../components/ui";

type Replacement = { url: string; fileName: string; size: number; updatedAt: string };
type DocumentItem = {
  key: string;
  kind: "brochure" | "datasheet";
  label: string;
  description: string;
  defaultFileName: string;
  replacement: Replacement | null;
};

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" });
const mb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

/** PUT the file straight to storage with upload progress (fetch can't report upload progress). */
function putWithProgress(url: string, file: File, headers: Record<string, string>, onProgress: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    Object.entries(headers).forEach(([k, v]) => xhr.setRequestHeader(k, v));
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload failed (${xhr.status})`)));
    xhr.onerror = () => reject(new Error("Upload failed. Check your connection and try again."));
    xhr.send(file);
  });
}

function DocumentRow({
  item,
  maxBytes,
  originalMissing,
  onChanged,
  onRestore,
}: {
  item: DocumentItem;
  maxBytes: number;
  originalMissing: boolean;
  onChanged: (message: string) => void;
  onRestore: (item: DocumentItem) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const replaced = Boolean(item.replacement);
  const currentUrl = item.replacement?.url ?? item.key;

  async function upload(file: File | null) {
    if (!file) return;
    setError("");
    if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) {
      setError("Please choose a PDF file.");
      return;
    }
    if (file.size > maxBytes) {
      setError(`This file is ${mb(file.size)}. The maximum is ${mb(maxBytes)}.`);
      return;
    }
    setProgress(0);
    try {
      const signed = await adminFetch<{ uploadUrl: string; publicUrl: string; headers: Record<string, string> }>(
        "/api/admin/documents/upload-url",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: item.key, fileName: file.name, size: file.size, contentType: "application/pdf" }),
        },
      );
      await putWithProgress(signed.uploadUrl, file, signed.headers, setProgress);
      await adminFetch("/api/admin/documents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: item.key, url: signed.publicUrl, fileName: file.name }),
      });
      onChanged(`${item.label}: new file is live on the website`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setProgress(null);
    }
  }

  const uploading = progress !== null;

  return (
    <Card className="flex flex-col gap-4 laptop:flex-row laptop:items-center">
      <span className="hidden h-11 w-11 shrink-0 items-center justify-center bg-[#EAF3FD] text-[#006DDB] laptop:flex">
        <FileText size={22} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-semibold text-[#1F1F1F]">{item.label}</p>
          {replaced ? (
            <span className="bg-[#ecfdf3] px-2 py-0.5 text-xs font-medium text-[#027a48]">Uploaded version</span>
          ) : originalMissing ? (
            <span className="bg-[#fffaeb] px-2 py-0.5 text-xs font-medium text-[#b54708]">File missing: upload a PDF</span>
          ) : (
            <span className="bg-[#F3F4F6] px-2 py-0.5 text-xs font-medium text-[#4B5563]">Original file</span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-[#616161]">{item.description}</p>
        <p className="mt-1 truncate text-xs text-[#9CA3AF]">
          {replaced
            ? `${item.replacement!.fileName} · ${mb(item.replacement!.size)} · uploaded ${dateFmt.format(new Date(item.replacement!.updatedAt))}`
            : item.defaultFileName}
        </p>
        {uploading ? (
          <div className="mt-2" role="status" aria-label={`Uploading ${progress}%`}>
            <div className="h-2 w-full max-w-md bg-[#E5E7EB]">
              <div className="h-2 bg-[#006DDB] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-1 text-xs text-[#616161]">Uploading… {progress}%</p>
          </div>
        ) : null}
        {error ? <div className="mt-2"><Alert tone="error">{error}</Alert></div> : null}
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        {!originalMissing || replaced ? (
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-[#D2D2D2] bg-white px-4 py-2.5 text-sm font-medium text-[#1F1F1F] hover:border-[#006DDB]"
          >
            <ExternalLink size={15} aria-hidden /> View
          </a>
        ) : null}
        <Button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="gap-1.5">
          <Upload size={15} aria-hidden /> {uploading ? "Uploading…" : originalMissing && !replaced ? "Upload PDF" : "Replace PDF"}
        </Button>
        {replaced ? (
          <Button type="button" variant="secondary" onClick={() => onRestore(item)} disabled={uploading} className="gap-1.5">
            <RotateCcw size={15} aria-hidden /> Restore original
          </Button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            upload(e.target.files?.[0] || null);
            e.target.value = "";
          }}
        />
      </div>
    </Card>
  );
}

export default function AdminBrochuresPage() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [maxBytes, setMaxBytes] = useState(50 * 1024 * 1024);
  const [missing, setMissing] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [restoreItem, setRestoreItem] = useState<DocumentItem | null>(null);
  const [restoreError, setRestoreError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setError("");
    try {
      const json = await adminFetch<{ items: DocumentItem[]; maxBytes: number }>("/api/admin/documents");
      setItems(json.items);
      setMaxBytes(json.maxBytes);
      // Check which original files actually exist on the website (e.g. a datasheet never added).
      const checks = await Promise.all(
        json.items.map(async (i) => ({ key: i.key, ok: (await fetch(i.key, { method: "HEAD" }).catch(() => null))?.ok })),
      );
      setMissing(new Set(checks.filter((c) => !c.ok).map((c) => c.key)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmRestore() {
    if (!restoreItem) return;
    setBusy(true);
    setRestoreError("");
    try {
      await adminFetch(`/api/admin/documents?key=${encodeURIComponent(restoreItem.key)}`, { method: "DELETE" });
      setSuccess(`${restoreItem.label}: original file restored`);
      setRestoreItem(null);
      await load();
    } catch (e) {
      setRestoreError(e instanceof Error ? e.message : "Restore failed");
    } finally {
      setBusy(false);
    }
  }

  const brochure = items.filter((i) => i.kind === "brochure");
  const datasheets = items.filter((i) => i.kind === "datasheet");
  const row = (item: DocumentItem) => (
    <DocumentRow
      key={item.key}
      item={item}
      maxBytes={maxBytes}
      originalMissing={missing.has(item.key)}
      onChanged={async (message) => {
        setError("");
        setSuccess(message);
        await load();
      }}
      onRestore={(i) => {
        setRestoreError("");
        setRestoreItem(i);
      }}
    />
  );

  return (
    <div>
      <PageTitle
        title="Brochures & Datasheets"
        subtitle="Replace the PDFs visitors download after filling in the brochure or datasheet form."
      />

      <div className="mb-5 border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3 text-sm leading-6 text-[#4B5563]">
        <p>
          <span className="font-semibold text-[#1F1F1F]">File:</span> PDF only, max {Math.round(maxBytes / (1024 * 1024))} MB.
          Aim for under 10 MB so visitors on mobile data can download it quickly.
        </p>
        <p>
          A new upload goes live immediately. <span className="font-medium">Restore original</span> switches back to the
          file that came with the website.
        </p>
      </div>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {loading ? (
        <Card>Loading documents…</Card>
      ) : (
        <>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#616161]">Brochure</h3>
          <div className="space-y-3">{brochure.map(row)}</div>
          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-[#616161]">
            Product datasheets ({datasheets.length})
          </h3>
          <div className="space-y-3">{datasheets.map(row)}</div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(restoreItem)}
        title="Restore the original file?"
        body={`Visitors will get the original ${restoreItem?.label ?? ""} PDF again, and your uploaded version will be deleted.`}
        confirmLabel="Restore original"
        onCancel={() => setRestoreItem(null)}
        onConfirm={confirmRestore}
        busy={busy}
        error={restoreError}
      />
    </div>
  );
}
