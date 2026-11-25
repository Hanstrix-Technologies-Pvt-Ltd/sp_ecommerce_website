import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { nextSortOrder, SORT_ORDER } from "@/lib/cms/reorder";
import { applyMoveLocked } from "@/lib/cms/reorder-db";
import { moveSchema, testimonialUpsertSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    // A short list (a handful of videos), so it's returned whole: no paging or search.
    const items = await prisma.testimonial.findMany({ orderBy: SORT_ORDER });
    return ok({ items, total: items.length });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const { youtubeUrl, ...data } = testimonialUpsertSchema.parse(await req.json());
    const { _max } = await prisma.testimonial.aggregate({ _max: { sortOrder: true } });
    const item = await prisma.testimonial.create({
      data: { ...data, youtubeId: youtubeUrl, sortOrder: data.sortOrder ?? nextSortOrder(_max.sortOrder) },
    });
    revalidatePublicSite();
    return ok({ item }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    requireAdmin(req);
    const parsed = moveSchema.safeParse(await req.json());
    if (!parsed.success) return fail("id and either overId or direction (-1 or 1) are required");
    const move = parsed.data;

    const exists = await prisma.testimonial.findUnique({ where: { id: move.id }, select: { id: true } });
    if (!exists) return fail("Not found", 404);

    // Locked so simultaneous reorders (two admins / two tabs) can't overwrite each other.
    const changed = await applyMoveLocked("Testimonial", move);
    if (changed) revalidatePublicSite();
    return ok({ message: changed ? "Order updated" : "Already at the edge" });
  } catch (error) {
    return handleRouteError(error);
  }
}
