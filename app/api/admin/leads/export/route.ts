import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { handleRouteError } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { LEAD_SOURCE_LABELS, leadWhere } from "@/lib/cms/leads";

export const runtime = "nodejs";

/**
 * CSV value: quoted, with quotes doubled. Values starting with = + - @ are prefixed with ' so
 * a spreadsheet doesn't run them as formulas (visitors type these fields, so treat them as untrusted).
 */
function csvCell(value: unknown): string {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

/** Download the (filtered) leads as a CSV file that opens in Excel / Google Sheets. */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const where = leadWhere(req.nextUrl.searchParams);
    const rows = await prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 10_000 });

    const header = ["Date (IST)", "Name", "Contact number", "Email", "Project name", "Project location", "Message", "Form", "Product", "Page", "Email sent"];
    const fmt = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false,
    });
    const lines = rows.map((r) =>
      [
        fmt.format(r.createdAt),
        r.name,
        r.contactNumber,
        r.email,
        r.projectName,
        r.projectLocation,
        r.message,
        LEAD_SOURCE_LABELS[r.source] || r.source,
        r.product,
        r.page,
        r.emailSent ? "Yes" : "No",
      ]
        .map(csvCell)
        .join(","),
    );
    // BOM so Excel opens UTF-8 (e.g. names with accents) correctly.
    const csv = "﻿" + [header.map(csvCell).join(","), ...lines].join("\r\n");
    const date = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="stelz-leads-${date}.csv"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
