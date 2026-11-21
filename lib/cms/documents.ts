import { PRODUCTS } from "@/data/locale/en/Products";
import { prisma } from "./db";

/** The company brochure behind the site-wide "Download Brochure" button. */
export const BROCHURE_KEY = "/assets/brochure.pdf";

export type DocumentSlot = {
  /** The original bundled file's public path; also the id used to replace it. */
  key: string;
  kind: "brochure" | "datasheet";
  label: string;
  description: string;
  /** Download name when the original file is served. */
  defaultFileName: string;
};

/**
 * Every downloadable PDF the admin can replace: the brochure plus one datasheet per product
 * (taken from the product data, so a new product with a datasheet appears automatically).
 */
export function documentSlots(): DocumentSlot[] {
  const seen = new Set<string>();
  const datasheets: DocumentSlot[] = [];
  for (const p of PRODUCTS) {
    if (!p.datasheetUrl || seen.has(p.datasheetUrl)) continue;
    seen.add(p.datasheetUrl);
    const fileName = decodeURIComponent(p.datasheetUrl.split("/").pop() || "Datasheet.pdf");
    datasheets.push({
      key: p.datasheetUrl,
      kind: "datasheet",
      label: p.title,
      description: `Datasheet on the ${p.title} product page (${fileName.replace(/-?Data ?Sheet\.pdf$/i, "")})`,
      defaultFileName: fileName,
    });
  }
  return [
    {
      key: BROCHURE_KEY,
      kind: "brochure",
      label: "Company brochure",
      description: "Downloaded from the “Download Brochure” button on every page",
      defaultFileName: "STELZ-Multiparking-Brochure.pdf",
    },
    ...datasheets,
  ];
}

export function findDocumentSlot(key: unknown): DocumentSlot | undefined {
  return typeof key === "string" ? documentSlots().find((slot) => slot.key === key) : undefined;
}

/**
 * The file a visitor should get for a document: the admin's uploaded replacement if there is
 * one, otherwise the original file bundled with the site. Only known slots resolve, so the
 * value from the browser can never point anywhere else.
 */
export async function resolveDocument(key: unknown): Promise<{ url: string; fileName: string } | null> {
  const slot = findDocumentSlot(key);
  if (!slot) return null;
  const replacement = await prisma.document.findUnique({ where: { key: slot.key } }).catch((error) => {
    // If the database is unreachable, fall back to the original file rather than failing the download.
    console.error("[documents] lookup failed, serving the original file:", error);
    return null;
  });
  return replacement
    ? { url: replacement.url, fileName: replacement.fileName }
    : { url: slot.key, fileName: slot.defaultFileName };
}
