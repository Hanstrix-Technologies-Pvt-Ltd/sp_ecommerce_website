# STELZ CMS Admin Guide

## What this CMS manages

| Admin module | Public website impact |
|---|---|
| Gallery | `/gallery` installations + concepts carousels |
| Key Projects | Home **STELZ Footprint** carousel |
| Clients | `/clients` grid, About partners, Services partners |

## Setup

1. Copy `.env.example` values into `.env.local` and set strong secrets:

```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-strong-password
ADMIN_SESSION_SECRET=long-random-secret-at-least-16-chars
```

2. Initialize database and seed from existing static content:

```bash
npm run cms:setup
```

3. Start the app and open `/admin/login`.

## Security notes

- All `/api/admin/*` mutations require an httpOnly session cookie.
- `/admin` routes are auth-gated in the dashboard layout.
- Never commit `.env.local` or the SQLite file with production credentials.
- Uploaded images are stored under `public/uploads/cms/` with unique filenames.
- Managed uploads are deleted only when no other CMS record references them.
- Existing `/assets/...` seed images are left in place (not deleted).

## Deployment notes

- **Local / VPS with persistent disk:** SQLite (`file:./dev.db`) works.
- **Vercel / ephemeral filesystem:** switch `DATABASE_URL` to Postgres or Turso, and move uploads to object storage (e.g. S3 / Vercel Blob). The current upload helper writes to local disk and is intended for persistent hosts.

## Scripts

- `npm run db:generate` — Prisma client
- `npm run db:push` — apply schema
- `npm run db:seed` — import current Gallery / Footprint / Clients content
- `npm run cms:setup` — generate + push + seed
