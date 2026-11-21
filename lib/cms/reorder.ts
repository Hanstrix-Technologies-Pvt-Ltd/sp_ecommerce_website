/** Shared ordering used by admin lists, public pages and reordering. */
export const SORT_ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

/**
 * Given the full ordered list of ids, return the new order after moving `id` one place
 * in `direction`, or null if it can't move (not found / already at the edge).
 * The caller rewrites sortOrder as 0..N-1 for the whole list, so orders stay unique
 * regardless of which page or filter the admin was looking at.
 */
export function moveInOrder(ids: string[], id: string, direction: -1 | 1): string[] | null {
  const index = ids.indexOf(id);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= ids.length) return null;
  const next = [...ids];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}
