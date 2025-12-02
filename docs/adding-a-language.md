# Adding a New Language

Follow these steps to add another locale (e.g., French) while keeping the unified `app/[locale]/(site)` routes.

1) **Add locale to config**
   - Edit `lib/i18n/config.ts` and add the new code (e.g., `"fr"`) to `SUPPORTED_LOCALES` and `LOCALE_META` (region, label, country, hrefLang). Set `DEFAULT_LOCALE` only if you want the new language as default.

2) **Provide locale content**
   - Create `data/locale/fr/` and add counterparts of the EN files:
     - `AboutContent.ts`
     - `BlogContent.ts`
     - `ContactContent.ts`
     - `GalleryContent.ts`
     - `HomeFooterContent.ts`
     - `NavContent.ts`
     - `PageCopy.ts`
     - `Products.ts` (and `ProductsContent.ts` if needed)
     - `R&DContent.ts`
     - `ServicesContent.ts`
   - Translate values; keep shapes identical to EN.

3) **Update slug translations (optional)**
   - In `lib/i18n/slugMap.ts`, add FR entries to `SEGMENT_MAP` if you want localized slugs. If not provided, slugs fall back to EN.

4) **Update the language switcher options**
   - In `components/layout/LanguageSwitcher.tsx`, add the new locale label/country to `OPTIONS`.

5) **Assets**
   - If you need locale-specific assets (e.g., brochure PDFs), add them under `public/assets/...` and reference them in the locale content files.

6) **Test**
   - Run `npm run lint` and `npx tsc --noEmit`.
   - Start locally and test `/fr/...` routes; verify metadata/canonicals/hreflang and footer/nav translations.

Notes:
- No new page files are required; `app/[locale]/…` routes reuse the same components and fetch the appropriate locale content.
