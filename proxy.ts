import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./lib/i18n/config";
import { translateSegments } from "./lib/i18n/slugMap";
import { ADMIN_COOKIE, verifySessionToken } from "./lib/admin/session";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const locale: Locale = isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  requestHeaders.set("x-pathname", pathname);

  // Admin auth gate: redirect here, before any page render, so /admin doesn't wait on a
  // full server render (and a cold start) just to discover the visitor isn't logged in.
  // The dashboard layout still verifies the session as a second line of defence.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const loggedIn = Boolean(verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value));
    const onLogin = pathname === "/admin/login";
    if (!loggedIn && !onLogin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (loggedIn && onLogin) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Keep admin and uploaded CMS assets outside locale rewriting
  if (pathname.startsWith("/admin") || pathname.startsWith("/uploads")) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // If no locale prefix, prepend the default locale and keep the remaining path
  if (!isLocale(maybeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }

  // Normalize localized slugs to the base (English) route shape while preserving the locale prefix
  const rest = segments.slice(1);
  const normalizedSegments = translateSegments(rest, locale, DEFAULT_LOCALE);
  const normalizedPath = normalizedSegments.length ? `/${normalizedSegments.join("/")}` : "/";
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export const config = {
  // Skip files (any path with a dot: robots.txt, sitemap.xml, icons, manifest...). They were
  // being rewritten to /en/robots.txt etc. and answered 404, so search engines found neither
  // the robots file nor the sitemap. Site and admin page URLs never contain a dot.
  matcher: ["/((?!api|_next/static|_next/image|assets/|uploads/|.*\\..*).*)"],
};
