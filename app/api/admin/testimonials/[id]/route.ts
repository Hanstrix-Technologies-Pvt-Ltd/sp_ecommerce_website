import { NextRequest } from "next/server";
import { revalidatePublicSite } from "@/lib/cms/revalidate";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { testimonialUpdateSchema } from "@/lib/cms/validators";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const item = await prisma.testimonial.findUnique({ where: { id } });
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
    const existing = await prisma.testimonial.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return fail("Not found", 404);

    const { youtubeUrl, ...data } = testimonialUpdateSchema.parse(await req.json());
    const item = await prisma.testimonial.update({
      where: { id },
      data: { ...data, ...(youtubeUrl ? { youtubeId: youtubeUrl } : {}) },
    });

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
    const existing = await prisma.testimonial.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return fail("Not found", 404);

    await prisma.testimonial.delete({ where: { id } });
    revalidatePublicSite();
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
