## Your Launch Checklist (Owner Actions)

Follow these steps on your end to make the site live, indexed, and monitored.

1) Environment & secrets  
- Create `.env.local` with real values (keep it private):  
  - `NEXT_PUBLIC_SITE_URL="https://stelzparking.com"`  
  - `NEXT_PUBLIC_GA_ID="G-XXXXXXX"`  
- If you change domains, update `NEXT_PUBLIC_SITE_URL` and redeploy.

2) DNS & hosting  
- Point `stelzparking.com` and `www.stelzparking.com` to your hosting IP/hostname (A/AAAA or CNAME).  
- Enable HTTPS (certs via your host/Cloudflare/Let’s Encrypt).  
- After DNS propagates, verify both apex and www open the site.

3) Deployment  
- Build on your host/CI with `npm run build`.  
- Deploy the `.next` output or use your platform’s Next.js adapter.  
- Set NODE_ENV=production in the hosting environment.

4) SEO hygiene  
- Confirm `https://stelzparking.com/robots.txt` and `/sitemap.xml` are reachable after deploy.  
- In Google Search Console and Bing Webmaster Tools: add property, verify domain, submit `sitemap.xml`, request indexing for key pages.  
- If you add locales, resubmit the sitemap.

5) Analytics  
- Put your real GA4 ID in `.env.local`, redeploy.  
- In GA4 Realtime, confirm hits after visiting the live site.  
- If you need consent before tracking in your region, configure the consent mode text/UI in the analytics consent component.

6) Performance checks  
- Run Lighthouse (mobile, 4G) against the live domain; target ≥90.  
- If LCP is high, swap heavy hero images for lighter/blurred versions; ensure all images use next/image or optimized assets.  
- Keep third-party scripts minimal.

7) Monitoring & ops  
- Set up uptime monitoring (e.g., Pingdom/Better Stack).  
- Add error/perf monitoring if desired (e.g., Sentry) with DSN via env.  
- Enable Brotli/gzip and long-cache headers for static assets on your CDN/host.

8) Content and redirects  
- If you change URLs, add redirects at the host/CDN level.  
- Keep canonical URLs aligned with the final paths (about: `/about`, R&D: `/about/r-and-d`, contact: `/contact`, etc.).

9) Future locales  
- When adding a language, follow `docs/adding-a-language.md`, then redeploy and resubmit the sitemap.
