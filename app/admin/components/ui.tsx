"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function PageTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block h-3.5 w-3.5 bg-[#006DDB]" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#006DDB]">
            Admin
          </span>
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-[#1F1F1F]">{title}</h2>
        {subtitle ? <p className="mt-2 text-base text-[#616161]">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
}) {
  const styles = {
    primary: "bg-[#006DDB] text-white hover:bg-[#0a3a85]",
    secondary: "bg-white text-[#1F1F1F] border border-[#D2D2D2] hover:border-[#006DDB]",
    danger: "bg-[#b42318] text-white hover:opacity-90",
    ghost: "bg-transparent text-[#616161] hover:bg-[#F5F5F5]",
  }[variant];
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium disabled:opacity-50 ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-[#D2D2D2] bg-white px-3 py-2.5 text-[15px] text-[#616161] outline-none focus:border-[#006DDB] ${props.className || ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border border-[#D2D2D2] bg-white px-3 py-2.5 text-[15px] text-[#616161] outline-none focus:border-[#006DDB] ${props.className || ""}`}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-[#D2D2D2] bg-white px-3 py-2.5 text-[15px] text-[#616161] outline-none focus:border-[#006DDB] ${props.className || ""}`}
    />
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-[#1F1F1F]">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-[#616161]">{hint}</span> : null}
    </label>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-[#E5E5E5] bg-[#F5F5F5] p-4 ${className}`}>
      {children}
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="py-12 text-center">
      <p className="text-lg font-medium text-[#0f2744]">{title}</p>
      <p className="mt-1 text-sm text-[#5a6570]">{body}</p>
    </Card>
  );
}

export function Alert({
  tone = "info",
  children,
}: {
  tone?: "info" | "error" | "success";
  children: React.ReactNode;
}) {
  const colors = {
    info: "bg-[#eef4ff] text-[#0f2744] border-[#c9d8f0]",
    error: "bg-[#fef3f2] text-[#b42318] border-[#fecdca]",
    success: "bg-[#ecfdf3] text-[#027a48] border-[#a6f4c5]",
  }[tone];
  return <div className={`rounded-md border px-3 py-2 text-sm ${colors}`}>{children}</div>;
}

export function ConfirmDialog({
  open,
  title,
  body,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  busy,
}: {
  open: boolean;
  title: string;
  body: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  busy?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[#0f2744]">{title}</h3>
        <p className="mt-2 text-sm text-[#5a6570]">{body}</p>
        <div className="mt-5 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button type="button" variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ImageUploader({
  folder,
  value,
  onChange,
  label = "Image",
}: {
  folder: "gallery" | "projects" | "clients";
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>("");
  const [error, setError] = useState("");

  async function onFile(file: File | null) {
    if (!file) return;
    setError("");
    setProgress("Uploading…");
    setPreview(URL.createObjectURL(file));
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message || "Upload failed");
      onChange(json.url);
      setProgress("Uploaded");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setProgress("");
    }
  }

  const shown = preview || value;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-[#0f2744]">{label}</span>
        <Button type="button" variant="secondary" onClick={() => inputRef.current?.click()}>
          {value ? "Replace image" : "Upload image"}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] || null)}
      />
      {shown ? (
        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-[#d5dbe3] bg-[#f4f6f9]">
          <Image src={shown} alt="Preview" fill className="object-contain p-2" unoptimized />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-[#d5dbe3] text-sm text-[#5a6570]">
          No image selected
        </div>
      )}
      {progress ? <p className="text-xs text-[#5a6570]">{progress}</p> : null}
      {error ? <Alert tone="error">{error}</Alert> : null}
      {value ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/cms/..."
        />
      ) : null}
    </div>
  );
}
