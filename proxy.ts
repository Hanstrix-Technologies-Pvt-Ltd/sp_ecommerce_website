import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./lib/i18n/config";
import { translateSegments } from "./lib/i18n/slugMap";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const locale: Locale = isLocale(maybeLocale) ? maybeLocale : DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

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
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets/).*)"],
};
