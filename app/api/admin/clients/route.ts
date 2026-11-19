import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok, parsePagination } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { clientUpsertSchema, reorderSchema } from "@/lib/cms/validators";

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
              OR: [{ name: { contains: q } }, { description: { contains: q } }],
            }
          : {},
        active === "true" ? { active: true } : active === "false" ? { active: false } : {},
      ],
    };

    const [total, items] = await Promise.all([
      prisma.client.count({ where }),
      prisma.client.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
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
    const item = await prisma.client.create({ data });
    revalidatePath("/clients");
    revalidatePath("/about");
    revalidatePath("/services");
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
        prisma.client.update({ where: { id }, data: { sortOrder: index } }),
      ),
    );
    revalidatePath("/clients");
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

    const existing = await prisma.client.findUnique({
      where: { id },
      include: { _count: { select: { projects: true } } },
    });
    if (!existing) return fail("Not found", 404);

    // Soft-safe: projects keep clientId null via onDelete SetNull
    await prisma.client.delete({ where: { id } });
    await deleteImageIfUnreferenced(existing.logoUrl);

    revalidatePath("/clients");
    revalidatePath("/about");
    revalidatePath("/services");
    return ok({
      message: "Deleted",
      detachedProjects: existing._count.projects,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
