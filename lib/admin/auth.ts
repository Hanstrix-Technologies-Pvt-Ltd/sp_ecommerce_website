import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE = "stelz_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET must be set (min 16 characters).");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export type AdminSession = {
  sub: string;
  exp: number;
};

export function createSessionToken(username: string): string {
  const session: AdminSession = {
    sub: username,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  try {
    const expected = sign(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as AdminSession;
    if (!session?.sub || !session?.exp || session.exp < Date.now()) return null;
    return session;
  } catch {
    return null;
  }
}

export function verifyAdminPassword(password: string): boolean {
  const configured = process.env.ADMIN_PASSWORD || "";
  const username = process.env.ADMIN_USERNAME || "admin";
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
  return a.length === b.length && timingSafeEqual(a, b) && Boolean(username);
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
