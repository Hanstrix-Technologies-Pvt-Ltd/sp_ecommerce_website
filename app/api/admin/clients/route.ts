import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok, parsePagination } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { nextSortOrder, SORT_ORDER } from "@/lib/cms/reorder";
import { applyMoveLocked } from "@/lib/cms/reorder-db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { clientUpsertSchema, moveSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const { searchParams } = req.nextUrl;
    const { page, pageSize, skip, take } = parsePagination(searchParams);
    const q = (searchParams.get("q") || "").trim();
    const active = searchParams.get("active");

    const where = {
      AND: [
        q
          ? {
              OR: [{ name: { contains: q, mode: "insensitive" as const } }, { description: { contains: q, mode: "insensitive" as const } }],
            }
          : {},
        active === "true" ? { active: true } : active === "false" ? { active: false } : {},
      ],
    };

    const [total, items] = await Promise.all([
      prisma.client.count({ where }),
      prisma.client.findMany({
        where,
        orderBy: SORT_ORDER,
        skip,
        take,
        include: { _count: { select: { projects: true } } },
      }),
    ]);

    return ok({ items, total, page, pageSize });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const data = clientUpsertSchema.parse(await req.json());
    const { _max } = await prisma.client.aggregate({ _max: { sortOrder: true } });
    const item = await prisma.client.create({
      data: { ...data, sortOrder: data.sortOrder ?? nextSortOrder(_max.sortOrder) },
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

    const exists = await prisma.client.findUnique({ where: { id: move.id }, select: { id: true } });
    if (!exists) return fail("Not found", 404);

    // Locked so simultaneous reorders (two admins / two tabs) can't overwrite each other.
    const changed = await applyMoveLocked("Client", move);
    if (changed) revalidatePublicSite();
    return ok({ message: changed ? "Order updated" : "Already at the edge" });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    requireAdmin(req);
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return fail("id is required");

    const existing = await prisma.client.findUnique({
      where: { id },
      include: { _count: { select: { projects: true } } },
    });
    if (!existing) return fail("Not found", 404);

    // Soft-safe: projects keep clientId null via onDelete SetNull
    await prisma.client.delete({ where: { id } });
    await deleteImageIfUnreferenced(existing.logoUrl);

    revalidatePublicSite();
    return ok({
      message: "Deleted",
      detachedProjects: existing._count.projects,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
