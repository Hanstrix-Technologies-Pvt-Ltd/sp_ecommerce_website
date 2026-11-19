import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  cookieOptions,
  createSessionToken,
  getAdminSessionFromRequest,
  verifyAdminPassword,
} from "@/lib/admin/auth";
import { fail, ok } from "@/lib/cms/api";

export async function GET(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) return fail("Unauthorized", 401);
  return ok({ authenticated: true, username: session.sub });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");
    const expectedUser = process.env.ADMIN_USERNAME || "admin";

    if (!username || !password) {
      return fail("Username and password are required", 400);
    }
    if (username !== expectedUser || !verifyAdminPassword(password)) {
      return fail("Invalid credentials", 401);
    }

    const token = createSessionToken(username);
    const res = ok({ authenticated: true, username });
    res.cookies.set(ADMIN_COOKIE, token, cookieOptions());
    return res;
  } catch (error) {
    console.error("[admin/auth]", error);
    return fail(
      error instanceof Error && error.message.includes("ADMIN_SESSION_SECRET")
        ? "Server auth is not configured"
        : "Login failed",
      500,
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, message: "Logged out" });
  res.cookies.set(ADMIN_COOKIE, "", { ...cookieOptions(0), maxAge: 0 });
  return res;
}
