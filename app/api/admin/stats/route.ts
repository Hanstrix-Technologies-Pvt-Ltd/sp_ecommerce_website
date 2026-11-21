import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const [gallery, projects, clients, publishedProjects, activeClients] = await Promise.all([
      prisma.galleryItem.count(),
      prisma.project.count(),
      prisma.client.count(),
      prisma.project.count({ where: { status: "published" } }),
      prisma.client.count({ where: { active: true } }),
    ]);
    return ok({ gallery, projects, clients, publishedProjects, activeClients });
  } catch (error) {
    return handleRouteError(error);
  }
}
