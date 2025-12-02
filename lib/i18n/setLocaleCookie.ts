export function setLocaleCookie(locale: string) {
  try {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  } catch {
    // no-op in non-browser environments
  }
}
