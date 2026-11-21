import { NextRequest } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { findDocumentSlot } from "@/lib/cms/documents";
import { MAX_DOCUMENT_BYTES, presignDocumentUpload } from "@/lib/cms/storage";

export const runtime = "nodejs";

const schema = z.object({
  key: z.string().min(1),
  fileName: z.string().min(1).max(200),
  size: z.number().int().positive(),
  contentType: z.string(),
});

/**
 * Step 1 of a PDF upload: a short-lived signed link the admin's browser uploads the file to
 * directly (step 2), before confirming it with PUT /api/admin/documents (step 3).
 */
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const data = schema.parse(await req.json());
    if (!findDocumentSlot(data.key)) return fail("Unknown document", 400);
    if (data.contentType !== "application/pdf" || !/\.pdf$/i.test(data.fileName)) {
      return fail("Please choose a PDF file.", 400);
    }
    if (data.size > MAX_DOCUMENT_BYTES) {
      return fail(`File too large. Max ${MAX_DOCUMENT_BYTES / (1024 * 1024)} MB.`, 400);
    }
    return ok(await presignDocumentUpload(data.fileName));
  } catch (error) {
    return handleRouteError(error);
  }
}
