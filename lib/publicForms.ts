import { prisma } from "@/lib/cms/db";

/** Best-effort visitor IP (Vercel sets x-forwarded-for; the first entry is the client). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] || request.headers.get("x-real-ip") || "unknown").trim();
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

/**
 * Simple flood protection for the public forms: at most 5 submissions per visitor (IP) per
 * 10 minutes, per form. It's in memory, so it resets when a server instance restarts and each
 * instance counts separately; that's enough to stop a script hammering the form (and filling
 * the database / inbox) without blocking real visitors.
 */
export function isRateLimited(form: string, ip: string): boolean {
  const key = `${form}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  // Keep the map from growing forever on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, times] of hits) if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

/**
 * The same lead submitted again within a few minutes (double-click, or the visitor retrying
 * after a slow response). Returns its id so the caller can reuse it instead of saving and
 * emailing a duplicate.
 */
export async function findRecentDuplicate(where: {
  source: string;
  contactNumber: string;
  projectName?: string;
  email?: string;
  message?: string;
}): Promise<string | null> {
  try {
    const row = await prisma.lead.findFirst({
      where: { ...where, createdAt: { gte: new Date(Date.now() - 5 * 60 * 1000) } },
      select: { id: true },
      orderBy: { createdAt: "desc" },
    });
    return row?.id ?? null;
  } catch {
    return null; // never block a submission because the duplicate check failed
  }
}

/**
 * The visitor's name for the acknowledgement greeting, only if it looks like a real name.
 * The acknowledgement goes to whatever address was typed into the form, so anything else
 * (links, long text) is replaced with "Sir/Madam" to stop the form being used to send spam.
 */
export function safeGreetingName(name: string): string {
  const trimmed = name.trim().replace(/\s+/g, " ");
  const looksLikeName =
    /^[\p{L}][\p{L} .'-]{0,59}$/u.test(trimmed) &&
    // a dot may only end an initial ("J. Smith"), never sit inside a word like "spam.example"
    !/\.\p{L}/u.test(trimmed) &&
    // real names are a few words; spam sentences are longer
    trimmed.split(" ").length <= 5;
  return looksLikeName ? trimmed : "";
}
