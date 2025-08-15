# Fluxedita Uploads and Releases Guide

This guide documents how to upload private assets to Supabase Storage, register new package versions, grant user entitlements, and test downloads end-to-end.

## Buckets and Slugs

- Private buckets:
  - `pkg-landing`
  - `pkg-root`
  - `pkg-multi`
  - `pkg-premium`
- Package slugs (in `public.packages.slug`):
  - `landing`, `root`, `multi`, `premium`
- Slug → bucket mapping is defined in `lib/storage/buckets.ts`.

## Key concepts

- The DB column `public.package_versions.storage_key` is the object path inside the bucket (relative path, not including bucket name).
- Signed URLs are generated server-side by `/api/download-url` after RLS confirms the requesting user is entitled.

## 1) Upload the asset to the correct bucket

Choose a clear naming convention. Two supported patterns:

- Foldered per version (example for 1.0.0):
  - `landing/1.0.0/fluxedita-landing.zip`
  - `root/1.0.0/fluxedita-root.zip`
  - `multi/1.0.0/fluxedita-multi.zip`
  - `premium/1.0.0/fluxedita-premium.zip`
- Flat at bucket root (example for 1.8.0):
  - `landing_page_package-main-v1.8.zip`
  - `rootpage_package-main-v1.8.zip`
  - `multipage_package-main-v1.8.zip`
  - `premium_content_portfolio-v1.8.zip`

Upload via Supabase Dashboard → Storage → select the bucket → Upload. Copy the object path (excluding the bucket name). That path will be the `storage_key` in the DB.

## 2) Insert or update `package_versions`

Insert a version row with the exact `storage_key` for each package you’re releasing. Adjust version and storage_key to your actual upload.

```sql
-- Landing (example flat path for v1.8.0)
insert into public.package_versions (package_id, version, storage_key)
select p.id, '1.8.0', 'landing_page_package-main-v1.8.zip'
from public.packages p
where p.slug = 'landing'
on conflict do nothing;

-- Root
insert into public.package_versions (package_id, version, storage_key)
select p.id, '1.8.0', 'rootpage_package-main-v1.8.zip'
from public.packages p
where p.slug = 'root'
on conflict do nothing;

-- Multi
insert into public.package_versions (package_id, version, storage_key)
select p.id, '1.8.0', 'multipage_package-main-v1.8.zip'
from public.packages p
where p.slug = 'multi'
on conflict do nothing;

-- Premium
insert into public.package_versions (package_id, version, storage_key)
select p.id, '1.8.0', 'premium_content_portfolio-v1.8.zip'
from public.packages p
where p.slug = 'premium'
on conflict do nothing;

-- Verify the rows
select p.slug, pv.version, pv.storage_key
from public.package_versions pv
join public.packages p on p.id = pv.package_id
order by p.slug, pv.version;
```

To correct a `storage_key` typo:
```sql
update public.package_versions pv
set storage_key = 'multi/1.8.0/correct-file.zip'
from public.packages p
where p.id = pv.package_id and p.slug = 'multi' and pv.version = '1.8.0';
```

## 3) Grant entitlements (who can download)

We enforce entitlement via RLS. Create entitlements for users who should access a package.

- Enum labels:
  - `entitlement_type`: `one_time`, `subscription`
  - `entitlement_status`: `active`, `canceled`, `expired`
- Recommended unique index (already added):
```sql
create unique index if not exists entitlements_user_package_uidx
  on public.entitlements (user_id, package_id);
```

Grant entitlements (idempotent):
```sql
insert into public.entitlements (user_id, package_id, type, status)
select 'USER_UUID'::uuid, p.id, 'one_time'::entitlement_type, 'active'::entitlement_status
from public.packages p
where p.slug in ('landing','root','multi','premium')
on conflict (user_id, package_id) do nothing;

-- Verify
select e.user_id, p.slug, e.type, e.status, e.created_at
from public.entitlements e
join public.packages p on p.id = e.package_id
where e.user_id = 'USER_UUID'::uuid
order by p.slug;
```

Revoke (example):
```sql
delete from public.entitlements e
using public.packages p
where p.id = e.package_id
  and e.user_id = 'USER_UUID'::uuid
  and p.slug = 'premium';
```

## 4) Test downloads in the app

- Sign in as the entitled user.
- Navigate to `/account/downloads`.
- Enter the version string (e.g., `1.8.0`) and click a package button.
- Expected: a signed URL opens in a new tab, downloading the asset.

If you prefer using fetch manually in the browser console:
```js
await fetch('/api/download-url', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ packageSlug: 'multi', version: '1.8.0' })
}).then(r => r.json())
  .then(console.log)
```

## Common issues and fixes

- **403 Forbidden**: Entitlement missing or RLS denied. Ensure `public.entitlements` has a row for the user and package.
- **404 from Storage**: `storage_key` doesn’t match the object path in the bucket, or wrong bucket chosen for the slug.
- **Wrong slug**: Must be exactly one of `landing | root | multi | premium`.
- **Edge runtime warnings**: API route sets `export const runtime = "nodejs"` in `app/api/download-url/route.ts`.

## Operational tips

- Keep a consistent naming scheme for files and versions.
- Prefer adding a new version row rather than changing existing rows (immutability helps auditing).
- Signed URL expiry is short by default; you can add an optional `expiresIn` in requests if needed.
- Consider an Admin UI to upload, register versions, and manage entitlements.

## Related code paths

- Bucket mapping: `lib/storage/buckets.ts`
- Download API: `app/api/download-url/route.ts`
- Test UI page: `app/account/downloads/page.tsx`
- Middleware protection: `middleware.ts`
