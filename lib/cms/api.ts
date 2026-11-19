import { NextResponse } from "next/server";
import { AuthError } from "@/lib/admin/auth";
import { ZodError } from "zod";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, ...unwrap(data) }, init);
}

function unwrap(data: unknown): Record<string, unknown> {
  if (data && typeof data === "object" && !Array.isArray(data)) {
    return data as Record<string, unknown>;
  }
  return { data };
}

export function fail(message: string, status = 400, extra?: Record<string, unknown>) {
  return NextResponse.json({ success: false, message, ...extra }, { status });
}

export function handleRouteError(error: unknown) {
  if (error instanceof AuthError) {
    return fail(error.message, 401);
  }
  if (error instanceof ZodError) {
    return fail("Validation failed", 400, {
      errors: error.flatten().fieldErrors,
    });
  }
  if (error instanceof Error) {
    console.error("[cms]", error.message);
    return fail(error.message, 400);
  }
  console.error("[cms]", error);
  return fail("Unexpected server error", 500);
}

export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, Number(searchParams.get("page") || 1) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(searchParams.get("pageSize") || 20) || 20));
  const skip = (page - 1) * pageSize;
  return { page, pageSize, skip, take: pageSize };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
