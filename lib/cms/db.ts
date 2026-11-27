import { Prisma, PrismaClient } from "@prisma/client";

// Neon suspends idle compute (always on the free plan); waking it can take several seconds,
// longer than Prisma's default 5s connect_timeout, so the first request after a quiet period
// failed with "Can't reach database server". Give connections more headroom unless the URL
// already sets its own values.
function databaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL;
  if (!raw) return undefined;
  try {
    const url = new URL(raw);
    if (!url.searchParams.has("connect_timeout")) url.searchParams.set("connect_timeout", "20");
    if (!url.searchParams.has("pool_timeout")) url.searchParams.set("pool_timeout", "20");
    return url.toString();
  } catch {
    return raw;
  }
}

const READ_OPERATIONS = new Set([
  "findUnique",
  "findUniqueOrThrow",
  "findFirst",
  "findFirstOrThrow",
  "findMany",
  "count",
  "aggregate",
  "groupBy",
]);
const MAX_RETRIES = 2;

/**
 * Whether a failed query is safe to run again.
 * - P1001 "can't reach database server" / init errors: the query never reached Postgres
 *   (typically Neon waking up), so retrying is safe even for writes.
 * - P1017 "server closed the connection": Neon drops idle pooled connections when it suspends.
 *   A write might already have been applied, so only reads are retried.
 */
function isRetryable(error: unknown, operation: string): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) return true;
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P1001") return true;
    if (error.code === "P1017") return READ_OPERATIONS.has(operation);
  }
  return false;
}

function createClient() {
  return new PrismaClient({
    datasourceUrl: databaseUrl(),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  }).$extends({
    query: {
      async $allOperations({ operation, args, query }) {
        for (let attempt = 0; ; attempt++) {
          try {
            return await query(args);
          } catch (error) {
            if (attempt >= MAX_RETRIES || !isRetryable(error, operation)) throw error;
            await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
          }
        }
      },
    },
  });
}

/**
 * Retry a whole transaction when the database connection fails (Neon waking up, or a burst of
 * new connections being reset). Opening an interactive transaction doesn't go through the
 * per-query retry above, and retrying the transaction is always safe: if it failed, Postgres
 * rolled it back completely, so nothing was half-applied.
 */
export async function withConnectionRetry<T>(run: () => Promise<T>): Promise<T> {
  // P1001 can't reach server, P1017 connection closed, P2028 transaction couldn't start/expired
  const retryable = (e: unknown) =>
    e instanceof Prisma.PrismaClientInitializationError ||
    (e instanceof Prisma.PrismaClientKnownRequestError && ["P1001", "P1017", "P2028"].includes(e.code));
  for (let attempt = 0; ; attempt++) {
    try {
      return await run();
    } catch (error) {
      if (attempt >= MAX_RETRIES || !retryable(error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
}

type CmsPrismaClient = ReturnType<typeof createClient>;
const globalForPrisma = globalThis as unknown as { prisma?: CmsPrismaClient };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
