import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { prisma } from "@/lib/cms/db";
import { documentSlots, findDocumentSlot } from "@/lib/cms/documents";
import {
  deleteManagedDocument,
  isManagedDocumentUrl,
  managedObjectSize,
  MAX_DOCUMENT_BYTES,
  safePdfFileName,
} from "@/lib/cms/storage";

export const runtime = "nodejs";

/** All downloadable documents, with the uploaded replacement (if any) for each. */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);
    const replacements = await prisma.document.findMany();
    const byKey = new Map(replacements.map((r) => [r.key, r]));
    const items = documentSlots().map((slot) => {
      const r = byKey.get(slot.key);
      return {
        ...slot,
        replacement: r ? { url: r.url, fileName: r.fileName, size: r.size, updatedAt: r.updatedAt } : null,
      };
    });
    return ok({ items, maxBytes: MAX_DOCUMENT_BYTES });
  } catch (error) {
    return handleRouteError(error);
  }
}

const saveSchema = z.object({
  key: z.string().min(1),
  url: z.string().min(1).max(2048),
  fileName: z.string().min(1).max(200),
});

/** Confirm a finished upload and make it the file visitors download. */
export async function PUT(req: NextRequest) {
  try {
    requireAdmin(req);
    const data = saveSchema.parse(await req.json());
    const slot = findDocumentSlot(data.key);
    if (!slot) return fail("Unknown document", 400);
    if (!isManagedDocumentUrl(data.url)) return fail("The file must be uploaded through the admin", 400);

    // Check the file really arrived in storage (and isn't too big) before switching to it.
    const size = await managedObjectSize(data.url);
    if (size === null) return fail("The upload didn't finish. Please try again.", 400);
    if (size > MAX_DOCUMENT_BYTES) {
      await deleteManagedDocument(data.url);
      return fail(`File too large. Max ${MAX_DOCUMENT_BYTES / (1024 * 1024)} MB.`, 400);
    }

    const previous = await prisma.document.findUnique({ where: { key: slot.key } });
    const fileName = safePdfFileName(data.fileName);
    const saved = await prisma.document.upsert({
      where: { key: slot.key },
      create: { key: slot.key, url: data.url, fileName, size },
      update: { url: data.url, fileName, size },
    });
    if (previous && previous.url !== data.url) await deleteManagedDocument(previous.url);
    return ok({ item: saved });
  } catch (error) {
    return handleRouteError(error);
  }
}

/** Remove the uploaded replacement, so visitors get the original bundled file again. */
export async function DELETE(req: NextRequest) {
  try {
    requireAdmin(req);
    const slot = findDocumentSlot(req.nextUrl.searchParams.get("key"));
    if (!slot) return fail("Unknown document", 400);
    const existing = await prisma.document.findUnique({ where: { key: slot.key } });
    if (!existing) return ok({ message: "Already using the original file" });
    await prisma.document.delete({ where: { key: slot.key } });
    await deleteManagedDocument(existing.url);
    return ok({ message: "Restored the original file" });
  } catch (error) {
    return handleRouteError(error);
  }
}
