/** Shared ordering used by admin lists, public pages and reordering. */
export const SORT_ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

/** A reorder request: one step up/down, or drop onto another item (drag and drop). */
export type MoveRequest = { id: string; direction: -1 | 1 } | { id: string; overId: string };

/**
 * Given the full ordered list of ids, return the new order after the move, or null if nothing
 * changes (already at the edge / dropped on itself). The caller rewrites sortOrder as 0..N-1
 * for the whole list, so orders stay unique regardless of which page or filter the admin was
 * looking at.
 *
 * For a drop, the item takes the target's place in the full list: dragged downwards it lands
 * just after the target, upwards just before it, which matches what the admin saw on screen
 * even when the visible list is a filtered or paged subset.
 */
export function applyMove(ids: string[], move: MoveRequest): string[] | null {
  const from = ids.indexOf(move.id);
  if (from < 0) throw new Error("Item not found");

  let to: number;
  if ("overId" in move) {
    to = ids.indexOf(move.overId);
    if (to < 0) throw new Error("Items can only be reordered within the same list");
  } else {
    to = from + move.direction;
    if (to < 0 || to >= ids.length) return null;
  }
  if (from === to) return null;

  const next = [...ids];
  next.splice(to, 0, next.splice(from, 1)[0]);
  return next;
}

/** sortOrder for a newly created record: after everything that exists, so it appears last. */
export function nextSortOrder(currentMax: number | null | undefined): number {
  return (currentMax ?? -1) + 1;
}
