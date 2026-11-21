import { revalidatePath } from "next/cache";

/**
 * Refresh every public page after a CMS change.
 *
 * CMS content appears on several pages (home, gallery, clients, about, services) in both
 * locales (/en/..., /de/...). Revalidating individual paths missed some of them, so clear
 * the whole site from the root layout instead; the site is small, so this is cheap.
 */
export function revalidatePublicSite() {
  revalidatePath("/", "layout");
}
