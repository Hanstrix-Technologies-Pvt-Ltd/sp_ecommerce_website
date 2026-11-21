import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

/** Delete a lead (e.g. spam or a duplicate). */
export async function DELETE(req: NextRequest, ctx: Ctx) {
  try {
    requireAdmin(req);
    const { id } = await ctx.params;
    const existing = await prisma.lead.findUnique({ where: { id }, select: { id: true } });
    if (!existing) return fail("Not found", 404);
    await prisma.lead.delete({ where: { id } });
    return ok({ message: "Deleted" });
  } catch (error) {
    return handleRouteError(error);
  }
}
