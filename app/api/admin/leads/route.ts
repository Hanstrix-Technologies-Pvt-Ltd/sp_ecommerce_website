import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { handleRouteError, ok, parsePagination } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { leadWhere } from "@/lib/cms/leads";

export const runtime = "nodejs";

/** Leads list for the admin, newest first. */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const { searchParams } = req.nextUrl;
    const { page, pageSize, skip, take } = parsePagination(searchParams);
    const where = leadWhere(searchParams);

    const [items, total] = await Promise.all([
      prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, skip, take }),
      prisma.lead.count({ where }),
    ]);
    return ok({ items, total, page, pageSize });
  } catch (error) {
    return handleRouteError(error);
  }
}
