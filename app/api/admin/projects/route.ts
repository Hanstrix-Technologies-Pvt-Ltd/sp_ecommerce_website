import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok, parsePagination, slugify } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { nextSortOrder, SORT_ORDER } from "@/lib/cms/reorder";
import { applyMoveLocked } from "@/lib/cms/reorder-db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { projectUpsertSchema, moveSchema } from "@/lib/cms/validators";

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
                { title: { contains: q, mode: "insensitive" as const } },
                { location: { contains: q, mode: "insensitive" as const } },
                { slug: { contains: q, mode: "insensitive" as const } },
                { shortDescription: { contains: q, mode: "insensitive" as const } },
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
        orderBy: SORT_ORDER,
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
    if (!raw.slug && raw.title) {
      // The admin form no longer asks for a slug (the site has no project pages; it's only an
      // internal id), so make a unique one from the title: "ncc-urban", "ncc-urban-2", ...
      const base = slugify(String(raw.title)) || "project";
      let candidate = base;
      for (let n = 2; await prisma.project.findUnique({ where: { slug: candidate }, select: { id: true } }); n++) {
        candidate = `${base}-${n}`.slice(0, 120);
      }
      raw.slug = candidate;
    }
    const data = projectUpsertSchema.parse(raw);

    const slugTaken = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (slugTaken) return fail("Slug already exists", 409);

    if (data.clientId) {
      const client = await prisma.client.findUnique({ where: { id: data.clientId } });
      if (!client) return fail("Client not found", 400);
    }

    const { images, ...projectData } = data;
    const { _max } = await prisma.project.aggregate({ _max: { sortOrder: true } });
    const item = await prisma.project.create({
      data: {
        ...projectData,
        sortOrder: projectData.sortOrder ?? nextSortOrder(_max.sortOrder),
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

    const exists = await prisma.project.findUnique({ where: { id: move.id }, select: { id: true } });
    if (!exists) return fail("Not found", 404);

    // Locked so simultaneous reorders (two admins / two tabs) can't overwrite each other.
    const changed = await applyMoveLocked("Project", move);
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

    revalidatePublicSite();
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
