import { timingSafeEqual, scryptSync, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { ADMIN_COOKIE, SESSION_TTL_MS, env, verifySessionToken, type AdminSession } from "./session";

export { ADMIN_COOKIE, createSessionToken, verifySessionToken, type AdminSession } from "./session";

export function getAdminUsername(): string {
  return env("ADMIN_USERNAME") || "admin";
}

export function verifyAdminPassword(password: string): boolean {
  const configured = env("ADMIN_PASSWORD");
  if (!configured) return false;

  // Support either plain comparison (dev) or scrypt hash "scrypt$salt$hash"
  if (configured.startsWith("scrypt$")) {
    const [, salt, hash] = configured.split("$");
    if (!salt || !hash) return false;
    const derived = scryptSync(password, salt, 64).toString("hex");
    const a = Buffer.from(derived);
    const b = Buffer.from(hash);
    return a.length === b.length && timingSafeEqual(a, b);
  }

  const a = Buffer.from(password);
  const b = Buffer.from(configured);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function hashAdminPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt$${salt}$${hash}`;
}

export async function getAdminSessionFromCookies(): Promise<AdminSession | null> {
  const jar = await cookies();
  return verifySessionToken(jar.get(ADMIN_COOKIE)?.value);
}

export function getAdminSessionFromRequest(req: NextRequest): AdminSession | null {
  return verifySessionToken(req.cookies.get(ADMIN_COOKIE)?.value);
}

export function requireAdmin(req: NextRequest): AdminSession {
  const session = getAdminSessionFromRequest(req);
  if (!session) {
    throw new AuthError("Unauthorized");
  }
  return session;
}

export class AuthError extends Error {
  status = 401;
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AuthError";
  }
}

export function cookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
