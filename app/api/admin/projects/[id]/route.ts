import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma, withConnectionRetry } from "@/lib/cms/db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { projectUpdateSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const item = await prisma.project.findUnique({
      where: { id },
      include: {
        client: true,
        images: { orderBy: { sortOrder: "asc" } },
      },
    });
    if (!item) return fail("Not found", 404);
    return ok({ item });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const existing = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existing) return fail("Not found", 404);

    const data = projectUpdateSchema.parse(await req.json());

    if (data.slug && data.slug !== existing.slug) {
      const taken = await prisma.project.findUnique({ where: { slug: data.slug } });
      if (taken) return fail("Slug already exists", 409);
    }
    if (data.clientId) {
      const client = await prisma.client.findUnique({ where: { id: data.clientId } });
      if (!client) return fail("Client not found", 400);
    }

    const { images, ...projectData } = data;
    const oldCover = existing.coverImageUrl;
    const oldImageUrls = existing.images.map((i) => i.imageUrl);

    // Retried as a whole on connection failures (safe: a failed transaction is fully rolled back).
    const item = await withConnectionRetry(() => prisma.$transaction(async (tx) => {
      if (images) {
        await tx.projectImage.deleteMany({ where: { projectId: id } });
        if (images.length) {
          await tx.projectImage.createMany({
            data: images.map((img, index) => ({
              projectId: id,
              imageUrl: img.imageUrl,
              altText: img.altText || "",
              sortOrder: img.sortOrder ?? index,
            })),
          });
        }
      }

      return tx.project.update({
        where: { id },
        data: projectData,
        include: { images: { orderBy: { sortOrder: "asc" } }, client: true },
      });
    }));

    if (data.coverImageUrl && data.coverImageUrl !== oldCover) {
      await deleteImageIfUnreferenced(oldCover);
    }
    if (images) {
      const keep = new Set(images.map((i) => i.imageUrl));
      for (const url of oldImageUrls) {
        if (!keep.has(url)) await deleteImageIfUnreferenced(url);
      }
    }

    revalidatePublicSite();
    return ok({ item });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const existing = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });
    if (!existing) return fail("Not found", 404);

    await prisma.project.delete({ where: { id } });
    for (const url of [existing.coverImageUrl, ...existing.images.map((i) => i.imageUrl)]) {
      await deleteImageIfUnreferenced(url);
    }
    revalidatePublicSite();
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
