# Fluxedita Website

This is the Fluxedita Next.js app with Supabase authentication, private Storage, entitlements, and signed download URLs.

> You can deploy, manage, and host Fluxedita using any remote services that support Next.js. Pick the providers that fit your workflow.

## Docs

- Uploads and Releases guide: [docs/UPLOADS.md](./docs/UPLOADS.md)

## Dev

- Copy `.env.example` to `.env.local` and fill Supabase keys.
- Run dev: `npm run dev`
- Build: `npm run build`

## Admin

- Admin-only pages (require `profiles.role = 'admin'`):
  - `/admin` – hub
  - `/admin/versions` – manage package versions
  - `/admin/entitlements` – manage user entitlements
