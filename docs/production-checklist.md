# Production Checklist (Things to set on your end)

1) **Environment variables**
   - Create `.env.local` with:
     - `NEXT_PUBLIC_SITE_URL="https://stelzparking.com"` (or your domain)
     - `NEXT_PUBLIC_GA_ID="G-XXXXXXX"` (real GA4 ID)

2) **Analytics verification**
   - Deploy and verify GA hits in GA4 Realtime.
   - If required, add consent handling before firing GA.

3) **Routing/locales**
   - Ensure the proxy/middleware is enabled (default) and `SUPPORTED_LOCALES` in `lib/i18n/config.ts` matches the languages you serve.

4) **Caching/CDN**
   - Enable gzip/brotli and long-cache headers for `/assets/**`; short-cache HTML.

5) **Lighthouse/PSI**
   - Run Lighthouse on mobile 4G; tune LCP/CLS if needed (e.g., blur placeholders on heavy hero images).

6) **Sitemaps/robots**
   - Confirm `/sitemap.xml` and `/robots.txt` are accessible and reflect your domain.

7) **Security/ops**
   - Add CSP if required.
   - Set up error/perf monitoring (e.g., Sentry) and uptime checks.
