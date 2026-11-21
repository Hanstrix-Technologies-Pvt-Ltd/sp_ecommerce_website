import type { Prisma } from "@prisma/client";

export const LEAD_SOURCES = ["brochure_download", "datasheet_download", "contact"] as const;

export const LEAD_SOURCE_LABELS: Record<string, string> = {
  brochure_download: "Brochure",
  datasheet_download: "Datasheet",
  contact: "Contact form",
};

/** Filter for the admin Leads list/export: free-text search plus optional form type and date range. */
export function leadWhere(searchParams: URLSearchParams): Prisma.LeadWhereInput {
  const q = (searchParams.get("q") || "").trim();
  const source = searchParams.get("source") || "";
  const days = Number(searchParams.get("days") || 0);

  const and: Prisma.LeadWhereInput[] = [];
  if (q) {
    const contains = { contains: q, mode: "insensitive" as const };
    and.push({
      OR: [
        { name: contains },
        { contactNumber: contains },
        { projectName: contains },
        { projectLocation: contains },
        { product: contains },
        { email: contains },
        { message: contains },
      ],
    });
  }
  if ((LEAD_SOURCES as readonly string[]).includes(source)) and.push({ source });
  if (days > 0) and.push({ createdAt: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) } });
  return and.length ? { AND: and } : {};
}
