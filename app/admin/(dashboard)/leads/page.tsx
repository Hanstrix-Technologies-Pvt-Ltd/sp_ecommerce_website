"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Phone } from "lucide-react";
import {
  adminFetch,
  Alert,
  Button,
  Card,
  ConfirmDialog,
  EmptyState,
  Input,
  PageTitle,
  Select,
  useDebouncedValue,
} from "../../components/ui";

type Lead = {
  id: string;
  name: string;
  contactNumber: string;
  projectName: string;
  projectLocation: string;
  email: string;
  message: string;
  source: string;
  product: string;
  page: string;
  emailSent: boolean;
  createdAt: string;
};

const SOURCE_LABELS: Record<string, string> = {
  brochure_download: "Brochure",
  datasheet_download: "Datasheet",
  contact: "Contact form",
};

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

function SourceBadge({ lead }: { lead: Lead }) {
  const style =
    lead.source === "datasheet_download"
      ? "bg-[#F3E8FF] text-[#6B21A8]"
      : lead.source === "contact"
        ? "bg-[#ecfdf3] text-[#027a48]"
        : "bg-[#EAF3FD] text-[#006DDB]";
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium ${style}`}>
      {SOURCE_LABELS[lead.source] || lead.source}
    </span>
  );
}

function EmailBadge({ sent }: { sent: boolean }) {
  return sent ? (
    <span className="text-xs text-[#027a48]">Emailed</span>
  ) : (
    <span className="text-xs font-medium text-[#b54708]" title="The notification email to info@stelzparking.com was not sent">
      Email not sent
    </span>
  );
}

export default function AdminLeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [source, setSource] = useState("");
  const [days, setDays] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [busy, setBusy] = useState(false);
  const latestRequest = useRef(0);
  const debouncedQ = useDebouncedValue(q);
  const pageSize = 50;

  const filterParams = useCallback(() => {
    const params = new URLSearchParams();
    if (debouncedQ) params.set("q", debouncedQ);
    if (source) params.set("source", source);
    if (days) params.set("days", days);
    return params;
  }, [debouncedQ, source, days]);

  const load = useCallback(async () => {
    const requestId = ++latestRequest.current;
    setLoading(true);
    setError("");
    try {
      const params = filterParams();
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
      const json = await adminFetch<{ items: Lead[]; total: number }>(`/api/admin/leads?${params}`);
      if (requestId !== latestRequest.current) return;
      setItems(json.items);
      setTotal(json.total);
    } catch (e) {
      if (requestId !== latestRequest.current) return;
      setError(e instanceof Error ? e.message : "Failed to load leads");
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  }, [page, filterParams]);

  useEffect(() => {
    load();
  }, [load]);

  async function confirmDelete() {
    if (!deleteId) return;
    setBusy(true);
    setDeleteError("");
    try {
      await adminFetch(`/api/admin/leads/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      setSuccess("Lead deleted");
      await load();
    } catch (e) {
      setDeleteError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  const pages = Math.max(1, Math.ceil(total / pageSize));
  const exportHref = `/api/admin/leads/export?${filterParams()}`;
  const filtered = Boolean(debouncedQ || source || days);

  return (
    <div>
      <PageTitle
        title="Leads"
        subtitle="Contact form enquiries and brochure/datasheet requests from the website, newest first."
        action={
          <a
            href={exportHref}
            className="inline-flex items-center justify-center gap-2 bg-[#006DDB] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0a3a85]"
          >
            <Download size={16} aria-hidden />
            Export CSV{filtered ? " (filtered)" : ""}
          </a>
        }
      />

      <Card className="mb-4 flex flex-wrap gap-3">
        <Input
          placeholder="Search name, phone, email, project, message…"
          value={q}
          onChange={(e) => {
            setPage(1);
            setQ(e.target.value);
          }}
          className="max-w-sm"
        />
        <Select
          value={source}
          onChange={(e) => {
            setPage(1);
            setSource(e.target.value);
          }}
          className="max-w-[180px]"
          aria-label="Form type"
        >
          <option value="">All forms</option>
          <option value="brochure_download">Brochure</option>
          <option value="datasheet_download">Datasheet</option>
          <option value="contact">Contact form</option>
        </Select>
        <Select
          value={days}
          onChange={(e) => {
            setPage(1);
            setDays(e.target.value);
          }}
          className="max-w-[180px]"
          aria-label="Date range"
        >
          <option value="">All time</option>
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </Select>
      </Card>

      {error ? <div className="mb-3"><Alert tone="error">{error}</Alert></div> : null}
      {success ? <div className="mb-3"><Alert tone="success">{success}</Alert></div> : null}

      {!loading && items.length > 0 ? (
        <p className="mb-3 text-sm text-[#616161]">
          {total} lead{total === 1 ? "" : "s"}
          {filtered ? " match your filters" : ""}
        </p>
      ) : null}

      {loading ? (
        <Card>Loading leads…</Card>
      ) : items.length === 0 ? (
        <EmptyState
          title={filtered ? "No leads match your filters" : "No leads yet"}
          body={
            filtered
              ? "Try a different search or clear the filters."
              : "Contact form enquiries and brochure/datasheet requests will appear here."
          }
        />
      ) : (
        <>
          {/* Desktop: table */}
          <div className="hidden overflow-x-auto border border-[#E5E7EB] bg-white laptop:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-xs uppercase tracking-wide text-[#616161]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Project / message</th>
                  <th className="px-4 py-3 font-semibold">Form</th>
                  <th className="px-4 py-3 font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {items.map((lead) => (
                  <tr key={lead.id} className="align-top hover:bg-[#F9FAFB]">
                    <td className="whitespace-nowrap px-4 py-3 text-[#616161]">
                      {dateFmt.format(new Date(lead.createdAt))}
                      <div className="mt-1">
                        <EmailBadge sent={lead.emailSent} />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-[#1F1F1F]">{lead.name}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a href={`tel:${lead.contactNumber.replace(/[^\d+]/g, "")}`} className="text-[#006DDB] hover:underline">
                        {lead.contactNumber}
                      </a>
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} className="mt-1 block text-xs text-[#616161] hover:text-[#006DDB] hover:underline">
                          {lead.email}
                        </a>
                      ) : null}
                    </td>
                    <td className="max-w-md px-4 py-3">
                      {lead.source === "contact" ? (
                        <p className="whitespace-pre-line text-[#1F1F1F]">{lead.message}</p>
                      ) : (
                        <>
                          <p className="text-[#1F1F1F]">{lead.projectName}</p>
                          <p className="text-xs text-[#616161]">{lead.projectLocation}</p>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <SourceBadge lead={lead} />
                      {lead.product ? <p className="mt-1 text-xs text-[#616161]">{lead.product}</p> : null}
                      {lead.page ? <p className="mt-0.5 text-xs text-[#9CA3AF]">{lead.page}</p> : null}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button type="button" variant="ghost" onClick={() => setDeleteId(lead.id)} aria-label={`Delete lead from ${lead.name}`}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phone / tablet: cards */}
          <div className="space-y-3 laptop:hidden">
            {items.map((lead) => (
              <Card key={lead.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-[#1F1F1F]">{lead.name}</p>
                    <p className="text-xs text-[#616161]">{dateFmt.format(new Date(lead.createdAt))}</p>
                  </div>
                  <SourceBadge lead={lead} />
                </div>
                {lead.source === "contact" ? (
                  <>
                    <p className="mt-2 whitespace-pre-line text-sm text-[#1F1F1F]">{lead.message}</p>
                    {lead.email ? (
                      <a href={`mailto:${lead.email}`} className="mt-1 block text-xs text-[#006DDB]">{lead.email}</a>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className="mt-2 text-sm text-[#1F1F1F]">{lead.projectName}</p>
                    <p className="text-xs text-[#616161]">
                      {lead.projectLocation}
                      {lead.product ? ` · ${lead.product}` : ""}
                    </p>
                  </>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${lead.contactNumber.replace(/[^\d+]/g, "")}`}
                    className="inline-flex items-center gap-1.5 border border-[#D2D2D2] bg-white px-3 py-2 text-sm text-[#006DDB]"
                  >
                    <Phone size={14} aria-hidden />
                    {lead.contactNumber}
                  </a>
                  <Button type="button" variant="ghost" onClick={() => setDeleteId(lead.id)}>
                    Delete
                  </Button>
                  <span className="ml-auto">
                    <EmailBadge sent={lead.emailSent} />
                  </span>
                </div>
              </Card>
            ))}
          </div>
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
        title="Delete this lead?"
        body="Use this for spam or duplicates. The lead is removed permanently."
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
