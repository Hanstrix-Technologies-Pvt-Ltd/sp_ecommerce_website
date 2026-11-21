import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok, parsePagination } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { nextSortOrder, SORT_ORDER } from "@/lib/cms/reorder";
import { applyMoveLocked } from "@/lib/cms/reorder-db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { galleryUpsertSchema, moveSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const { searchParams } = req.nextUrl;
    const { page, pageSize, skip, take } = parsePagination(searchParams);
    const q = (searchParams.get("q") || "").trim();
    const section = searchParams.get("section") || undefined;
    const category = searchParams.get("category") || undefined;
    const published = searchParams.get("published");

    const where = {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                { titleDe: { contains: q, mode: "insensitive" as const } },
                { category: { contains: q, mode: "insensitive" as const } },
                { altText: { contains: q, mode: "insensitive" as const } },
              ],
            }
          : {},
        section ? { section } : {},
        category ? { category } : {},
        published === "true" ? { published: true } : published === "false" ? { published: false } : {},
      ],
    };

    const [total, items] = await Promise.all([
      prisma.galleryItem.count({ where }),
      prisma.galleryItem.findMany({
        where,
        orderBy: SORT_ORDER,
        skip,
        take,
        include: { project: { select: { id: true, title: true } } },
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
    const body = await req.json();
    const data = galleryUpsertSchema.parse(body);

    if (data.projectId) {
      const exists = await prisma.project.findUnique({ where: { id: data.projectId } });
      if (!exists) return fail("Associated project not found", 400);
    }

    // Gallery order is per section, so "last" means last within the item's section.
    const { _max } = await prisma.galleryItem.aggregate({
      where: { section: data.section },
      _max: { sortOrder: true },
    });
    const item = await prisma.galleryItem.create({
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

    const current = await prisma.galleryItem.findUnique({ where: { id: move.id }, select: { section: true } });
    if (!current) return fail("Not found", 404);

    // Gallery order is per section. Locked so simultaneous reorders can't overwrite each other.
    const changed = await applyMoveLocked("GalleryItem", move, { section: current.section });
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

    const existing = await prisma.galleryItem.findUnique({ where: { id } });
    if (!existing) return fail("Gallery item not found", 404);

    await prisma.galleryItem.delete({ where: { id } });
    await deleteImageIfUnreferenced(existing.imageUrl);

    revalidatePublicSite();
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
