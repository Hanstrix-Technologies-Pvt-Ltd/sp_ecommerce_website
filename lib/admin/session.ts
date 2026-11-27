// Session token signing/verification with no Next.js request APIs, so it can run in proxy.ts
// as well as in route handlers and server components.
import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "stelz_admin_session";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

// Env values pasted into a dashboard often pick up an invisible trailing newline/space,
// which would make an otherwise-correct password never match. Trim them once here.
export function env(name: string): string {
  return (process.env[name] || "").trim();
}

function getSecret(): string {
  const secret = env("ADMIN_SESSION_SECRET");
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
