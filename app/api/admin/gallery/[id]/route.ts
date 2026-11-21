import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { galleryUpdateSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const item = await prisma.galleryItem.findUnique({
      where: { id },
      include: { project: { select: { id: true, title: true } } },
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
    const existing = await prisma.galleryItem.findUnique({ where: { id } });
    if (!existing) return fail("Not found", 404);

    const data = galleryUpdateSchema.parse(await req.json());
    if (data.projectId) {
      const exists = await prisma.project.findUnique({ where: { id: data.projectId } });
      if (!exists) return fail("Associated project not found", 400);
    }

    const oldUrl = existing.imageUrl;
    const item = await prisma.galleryItem.update({ where: { id }, data });

    if (data.imageUrl && data.imageUrl !== oldUrl) {
      await deleteImageIfUnreferenced(oldUrl);
    }

    revalidatePath("/gallery");
    revalidatePath("/en/gallery");
    revalidatePath("/de/gallery");
    return ok({ item });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const existing = await prisma.galleryItem.findUnique({ where: { id } });
    if (!existing) return fail("Not found", 404);

    await prisma.galleryItem.delete({ where: { id } });
    await deleteImageIfUnreferenced(existing.imageUrl);

    revalidatePath("/gallery");
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
