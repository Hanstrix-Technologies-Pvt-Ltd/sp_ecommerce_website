import { Prisma } from "@prisma/client";
import { prisma, withConnectionRetry } from "./db";
import { applyMove, type MoveRequest } from "./reorder";

type OrderedTable = "GalleryItem" | "Project" | "Client";

// One advisory-lock key per list. Gallery installations and concepts have separate orders but
// share a key: reorders there are rare, so the simpler lock costs nothing noticeable.
const LOCK_KEYS: Record<OrderedTable, number> = {
  GalleryItem: 74_100_001,
  Project: 74_100_002,
  Client: 74_100_003,
};

/**
 * Apply a reorder safely when several requests arrive at once (two admins, or two tabs).
 *
 * The whole read-modify-write runs in one transaction holding a Postgres advisory lock for the
 * list, so concurrent reorders queue up and each one starts from the order the previous one
 * saved; without it, two requests could read the same old order and one move would be lost.
 * The new order is written in a single UPDATE (not one query per row) to keep the lock short.
 *
 * Returns false when nothing changed (dropped on itself / already at the edge).
 */
export async function applyMoveLocked(
  table: OrderedTable,
  move: MoveRequest,
  options: { section?: string } = {},
): Promise<boolean> {
  const tableSql = Prisma.raw(`"${table}"`); // fixed identifiers from the type above, never user input
  const scope = options.section ? Prisma.sql`WHERE "section" = ${options.section}` : Prisma.empty;

  return withConnectionRetry(() => prisma.$transaction(
    async (tx) => {
      // pg_advisory_xact_lock returns void, which Prisma can't read back, so run it as a statement.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(${LOCK_KEYS[table]})`;

      const rows = await tx.$queryRaw<{ id: string }[]>`
        SELECT "id" FROM ${tableSql} ${scope}
        ORDER BY "sortOrder" ASC, "createdAt" ASC`;

      const next = applyMove(
        rows.map((row) => row.id),
        move,
      );
      if (!next) return false;

      await tx.$executeRaw`
        UPDATE ${tableSql} AS t
        SET "sortOrder" = (v.ord - 1)::int
        FROM unnest(${next}::text[]) WITH ORDINALITY AS v(id, ord)
        WHERE t."id" = v.id`;
      return true;
    },
    // Neon may need a few seconds to wake up; don't let the default 5s transaction limit cut in.
    { maxWait: 15_000, timeout: 20_000 },
  ));
}
