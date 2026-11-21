import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { deleteImageIfUnreferenced } from "@/lib/cms/storage";
import { clientUpdateSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const item = await prisma.client.findUnique({
      where: { id },
      include: { _count: { select: { projects: true } } },
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
    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) return fail("Not found", 404);

    const data = clientUpdateSchema.parse(await req.json());
    const oldLogo = existing.logoUrl;
    const item = await prisma.client.update({ where: { id }, data });

    if (data.logoUrl && data.logoUrl !== oldLogo) {
      await deleteImageIfUnreferenced(oldLogo);
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
    const existing = await prisma.client.findUnique({
      where: { id },
      include: { _count: { select: { projects: true } } },
    });
    if (!existing) return fail("Not found", 404);

    await prisma.client.delete({ where: { id } });
    await deleteImageIfUnreferenced(existing.logoUrl);

    revalidatePublicSite();
    return ok({ message: "Deleted", detachedProjects: existing._count.projects });
  } catch (error) {
    return handleRouteError(error);
  }
}
