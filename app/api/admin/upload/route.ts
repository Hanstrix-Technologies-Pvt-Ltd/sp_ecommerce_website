import { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { fail, handleRouteError, ok } from "@/lib/cms/api";
import { saveUploadedImage } from "@/lib/cms/storage";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);
    const form = await req.formData();
    const file = form.get("file");
    const folderRaw = String(form.get("folder") || "gallery");
    const folder =
      folderRaw === "projects" || folderRaw === "clients" ? folderRaw : "gallery";

    if (!(file instanceof File)) {
      return fail("file is required");
    }

    const saved = await saveUploadedImage(file, folder);
    return ok({ url: saved.url, bytes: saved.bytes });
  } catch (error) {
    return handleRouteError(error);
  }
}
