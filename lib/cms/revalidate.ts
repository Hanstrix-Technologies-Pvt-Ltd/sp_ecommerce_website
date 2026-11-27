import { revalidatePath, revalidateTag } from "next/cache";
import { CMS_CACHE_TAG } from "./public";

/**
 * Refresh every public page after a CMS change.
 *
 * CMS content appears on several pages (home, gallery, clients, about, services) in both
 * locales (/en/..., /de/...). Revalidating individual paths missed some of them, so clear
 * the whole site from the root layout instead; the site is small, so this is cheap.
 *
 * The public pages also read the CMS through a data cache (see lib/cms/public.ts). Expire
 * that immediately ({ expire: 0 }), not stale-while-revalidate, so the very next page view
 * after an admin save already shows the change.
 */
export function revalidatePublicSite() {
  revalidateTag(CMS_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
}
