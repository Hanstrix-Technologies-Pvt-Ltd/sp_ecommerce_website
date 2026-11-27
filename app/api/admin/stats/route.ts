import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [
      gallery, projects, clients, publishedProjects, activeClients, leads, leadsLast30Days,
      testimonials, activeTestimonials,
    ] = await Promise.all([
      prisma.galleryItem.count(),
      prisma.project.count(),
      prisma.client.count(),
      prisma.project.count({ where: { status: "published" } }),
      prisma.client.count({ where: { active: true } }),
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: last30Days } } }),
      prisma.testimonial.count(),
      prisma.testimonial.count({ where: { active: true } }),
    ]);
    return ok({
      gallery, projects, clients, publishedProjects, activeClients, leads, leadsLast30Days,
      testimonials, activeTestimonials,
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
