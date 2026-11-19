import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok, parsePagination } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { galleryUpsertSchema, reorderSchema } from "@/lib/cms/validators";

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
                { title: { contains: q } },
                { titleDe: { contains: q } },
                { category: { contains: q } },
                { altText: { contains: q } },
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
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
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

    const item = await prisma.galleryItem.create({ data });
    revalidatePath("/");
    revalidatePath("/gallery");
    revalidatePath("/en/gallery");
    revalidatePath("/de/gallery");
    return ok({ item }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    requireAdmin(req);
    const body = await req.json();
    const parsed = reorderSchema.safeParse(body);
    if (!parsed.success) return fail("orderedIds required");

    await prisma.$transaction(
      parsed.data.orderedIds.map((id, index) =>
        prisma.galleryItem.update({ where: { id }, data: { sortOrder: index } }),
      ),
    );
    revalidatePath("/gallery");
    return ok({ message: "Order updated" });
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

    revalidatePath("/gallery");
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
