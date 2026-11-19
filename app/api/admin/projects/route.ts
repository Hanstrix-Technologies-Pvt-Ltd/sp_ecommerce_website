import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok, parsePagination, slugify } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { projectUpsertSchema, reorderSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const { searchParams } = req.nextUrl;
    const { page, pageSize, skip, take } = parsePagination(searchParams);
    const q = (searchParams.get("q") || "").trim();
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;

    const where = {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q } },
                { location: { contains: q } },
                { slug: { contains: q } },
                { shortDescription: { contains: q } },
              ],
            }
          : {},
        status ? { status } : {},
        category ? { category } : {},
      ],
    };

    const [total, items] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        skip,
        take,
        include: {
          client: { select: { id: true, name: true } },
          images: { orderBy: { sortOrder: "asc" } },
        },
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
    const raw = await req.json();
    if (!raw.slug && raw.title) raw.slug = slugify(String(raw.title));
    const data = projectUpsertSchema.parse(raw);

    const slugTaken = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (slugTaken) return fail("Slug already exists", 409);

    if (data.clientId) {
      const client = await prisma.client.findUnique({ where: { id: data.clientId } });
      if (!client) return fail("Client not found", 400);
    }

    const { images, ...projectData } = data;
    const item = await prisma.project.create({
      data: {
        ...projectData,
        images: images?.length
          ? {
              create: images.map((img, index) => ({
                imageUrl: img.imageUrl,
                altText: img.altText || "",
                sortOrder: img.sortOrder ?? index,
              })),
            }
          : undefined,
      },
      include: { images: true, client: true },
    });

    revalidatePath("/");
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
        prisma.project.update({ where: { id }, data: { sortOrder: index } }),
      ),
    );
    revalidatePath("/");
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

    const existing = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existing) return fail("Not found", 404);

    await prisma.project.delete({ where: { id } });

    const urls = [existing.coverImageUrl, ...existing.images.map((i) => i.imageUrl)];
    for (const url of urls) {
      await deleteImageIfUnreferenced(url);
    }

    revalidatePath("/");
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
