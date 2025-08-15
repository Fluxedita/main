-- Ensure required extensions (usually pre-enabled on Supabase)
create extension if not exists "pgcrypto";
create extension if not exists "uuid-ossp";

-- Enums
do $$
begin
  if not exists (select 1 from pg_type where typname = 'entitlement_type') then
    create type entitlement_type as enum ('one_time', 'subscription');
  end if;

  if not exists (select 1 from pg_type where typname = 'entitlement_status') then
    create type entitlement_status as enum ('active', 'canceled', 'expired');
  end if;

  if not exists (select 1 from pg_type where typname = 'notification_visibility') then
    create type notification_visibility as enum ('public', 'entitled_only');
  end if;
end$$;

-- Add 'other_info' field for additional comments
do $$ begin
  if not exists (
    select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'other_info'
  ) then alter table public.profiles add column other_info text; end if;
end $$;

-- Packages
create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,                  -- 'landing' | 'root' | 'multi' | 'premium'
  title text not null,
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_packages() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists trg_touch_packages on public.packages;
create trigger trg_touch_packages
before update on public.packages
for each row execute function public.touch_packages();

-- Optional: parent includes child (e.g., premium includes multi/root/landing)
create table if not exists public.package_includes (
  parent_package_id uuid not null references public.packages(id) on delete cascade,
  child_package_id uuid not null references public.packages(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (parent_package_id, child_package_id),
  constraint no_self_include check (parent_package_id <> child_package_id)
);

-- Package versions (assets live in Supabase Storage, referenced by storage_key)
create table if not exists public.package_versions (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.packages(id) on delete cascade,
  version text not null,                       -- e.g. '1.0.0'
  changelog text,
  storage_key text not null,                   -- e.g. 'v1.0.0/asset.zip'
  checksum text,                               -- optional: sha256
  created_at timestamptz not null default now(),
  unique (package_id, version)
);

-- Entitlements (owned by a user to a package)
-- IMPORTANT: user_id references auth.users (Supabase Auth)
create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  package_id uuid not null references public.packages(id) on delete cascade,
  type entitlement_type not null,              -- one_time | subscription
  status entitlement_status not null default 'active',
  source text,                                 -- e.g., 'stripe'
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  current_period_end timestamptz,              -- for subscriptions
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_entitlements() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end$$;

drop trigger if exists trg_touch_entitlements on public.entitlements;
create trigger trg_touch_entitlements
before update on public.entitlements
for each row execute function public.touch_entitlements();

-- One active row constraint per (user, package) for ACTIVE status.
-- (Allows historical rows; enforces only one ACTIVE at a time)
drop index if exists uniq_active_entitlement_per_user_pkg;
create unique index uniq_active_entitlement_per_user_pkg
on public.entitlements (user_id, package_id)
where status = 'active';

-- Notifications (optionally scoped to package and visibility)
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references public.packages(id) on delete cascade,
  title text not null,
  body text not null,
  visibility notification_visibility not null default 'entitled_only',
  created_at timestamptz not null default now()
);

-- Download audit (server writes on signed URL issuance or download)
create table if not exists public.download_audit (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  package_id uuid not null references public.packages(id) on delete cascade,
  version_id uuid not null references public.package_versions(id) on delete cascade,
  ip inet,
  user_agent text,
  downloaded_at timestamptz not null default now()
);

-- View for currently effective entitlements (invoker security; respects RLS)
create or replace view public.active_entitlements
with (security_invoker = true)
as
select e.*
from public.entitlements e
where e.status = 'active'
  and (
    e.type = 'one_time'
    or (e.type = 'subscription' and (e.current_period_end is null or e.current_period_end > now()))
  );

-- RLS
alter table public.packages enable row level security;
alter table public.package_includes enable row level security;
alter table public.package_versions enable row level security;
alter table public.entitlements enable row level security;
alter table public.notifications enable row level security;
alter table public.download_audit enable row level security;

-- Policies

-- packages: allow public read of active packages (marketing pages may list them)
drop policy if exists packages_public_read on public.packages;
create policy packages_public_read
on public.packages for select
to anon, authenticated
using (active = true);

-- package_includes: readable to all (non-sensitive structure)
drop policy if exists package_includes_public_read on public.package_includes;
create policy package_includes_public_read
on public.package_includes for select
to anon, authenticated
using (true);

-- entitlements:
-- Owner can read their own entitlements
drop policy if exists entitlements_owner_read on public.entitlements;
create policy entitlements_owner_read
on public.entitlements for select
to authenticated
using (auth.uid() = user_id);

-- Insert/update/delete restricted to service role (Stripe webhooks) via service key
-- (No explicit policy needed; the service role bypasses RLS.)
-- If you want admin UI for staff users, add a role-based policy here.

-- package_versions: only visible to entitled users (direct or via inclusion)
-- We implement entitlement check with exists subqueries
drop policy if exists versions_read_entitled on public.package_versions;
create policy versions_read_entitled
on public.package_versions for select
to authenticated
using (
  exists (
    -- user has active entitlement to the same package
    select 1 from public.active_entitlements ae
    where ae.user_id = auth.uid()
      and ae.package_id = package_versions.package_id
  )
  or exists (
    -- or user is entitled to a parent that includes this package
    select 1
    from public.active_entitlements ae
    join public.package_includes inc on inc.parent_package_id = ae.package_id
    where ae.user_id = auth.uid()
      and inc.child_package_id = package_versions.package_id
  )
);

-- notifications:
-- public can read public notifications (optionally for marketing)
drop policy if exists notifications_public_read on public.notifications;
create policy notifications_public_read
on public.notifications for select
to anon, authenticated
using (visibility = 'public');

-- entitled users can read entitled_only notifications for packages they have
drop policy if exists notifications_entitled_read on public.notifications;
create policy notifications_entitled_read
on public.notifications for select
to authenticated
using (
  visibility = 'entitled_only'
  and (
    exists (
      select 1 from public.active_entitlements ae
      where ae.user_id = auth.uid()
        and ae.package_id = notifications.package_id
    )
    or exists (
      select 1
      from public.active_entitlements ae
      join public.package_includes inc on inc.parent_package_id = ae.package_id
      where ae.user_id = auth.uid()
        and inc.child_package_id = notifications.package_id
    )
  )
);

-- download_audit:
-- Read own audit rows
drop policy if exists download_audit_owner_read on public.download_audit;
create policy download_audit_owner_read
on public.download_audit for select
to authenticated
using (auth.uid() = user_id);

-- Inserts should be done server-side (API route with service key).
-- If you prefer client-inserts, you can allow:
-- create policy download_audit_owner_insert on public.download_audit for insert
-- to authenticated with check (auth.uid() = user_id);

-- Seed base package rows (run once)
insert into public.packages (slug, title, description)
values
  ('landing',  'Landing Page Package', 'Single landing page package'),
  ('root',     'Root Page Package',    'Essentials with multi-page core'),
  ('multi',    'Multi Page Package',   'Advanced multi-page package'),
  ('premium',  'Premium Page Package', 'Fluxedita Premium SaaS')
on conflict (slug) do nothing;

-- Seed default inclusions: premium includes multi, root, landing
insert into public.package_includes (parent_package_id, child_package_id)
select p_parent.id, p_child.id
from (select id from public.packages where slug = 'premium') p_parent,
     (select id from public.packages where slug in ('multi','root','landing')) p_child
on conflict do nothing;

-- =============================
-- Storage buckets (idempotent)
-- =============================
-- Buckets are private; access via signed URLs from the server.
do $$ begin
  if not exists (select 1 from storage.buckets where id = 'pkg-landing') then
    insert into storage.buckets (id, name, public) values ('pkg-landing', 'pkg-landing', false);
  end if;
  if not exists (select 1 from storage.buckets where id = 'pkg-root') then
    insert into storage.buckets (id, name, public) values ('pkg-root', 'pkg-root', false);
  end if;
  if not exists (select 1 from storage.buckets where id = 'pkg-multi') then
    insert into storage.buckets (id, name, public) values ('pkg-multi', 'pkg-multi', false);
  end if;
  if not exists (select 1 from storage.buckets where id = 'pkg-premium') then
    insert into storage.buckets (id, name, public) values ('pkg-premium', 'pkg-premium', false);
  end if;
end $$;

-- =============================
-- Profiles and Account schema
-- =============================

-- Profiles table keyed to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  role text default 'user',
  stripe_customer_id text,
  default_package_slug text,
  preferred_currency text default 'USD',
  timezone text,
  marketing_opt_in boolean default false,
  last_seen_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- touch trigger for profiles
create or replace function public.touch_profiles() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end
$$;

drop trigger if exists trg_touch_profiles on public.profiles;
create trigger trg_touch_profiles
before update on public.profiles
for each row execute function public.touch_profiles();

-- RLS for profiles
alter table public.profiles enable row level security;

-- User can read their own profile
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles for select
to authenticated
using (auth.uid() = id);

-- User can update their own profile
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Prevent authenticated inserts (profiles are created by trigger/service role)
drop policy if exists profiles_insert_none on public.profiles;
create policy profiles_insert_none
on public.profiles for insert
to authenticated
with check (false);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', null),
    coalesce(new.raw_user_meta_data->>'avatar_url', null)
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Optional: subscription summary view for profile pages
create or replace view public.profile_subscription
with (security_invoker = true)
as
select
  p.id as user_id,
  p.role,
  p.stripe_customer_id,
  e.package_id,
  pk.slug as package_slug,
  e.type as entitlement_type,
  e.status as entitlement_status,
  e.current_period_end
from public.profiles p
left join public.active_entitlements e on e.user_id = p.id
  left join public.packages pk on pk.id = e.package_id;

-- Additional profile personalization fields
do $$ begin
  if not exists (
    select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'company'
  ) then alter table public.profiles add column company text; end if;

  if not exists (
    select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'sector'
  ) then alter table public.profiles add column sector text; end if;

  if not exists (
    select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'position'
  ) then alter table public.profiles add column position text; end if;

  if not exists (
    select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'website_url'
  ) then alter table public.profiles add column website_url text; end if;

  if not exists (
    select 1 from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name = 'bio'
  ) then alter table public.profiles add column bio text; end if;
end $$;