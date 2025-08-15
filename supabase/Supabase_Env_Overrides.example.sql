-- Supabase_Env_Overrides.example.sql
-- Purpose: Environment-specific overrides that should NOT be committed with secrets.
-- Copy this file to Supabase_Env_Overrides.local.sql (gitignored) and adjust UUIDs/values.
-- All statements are idempotent and safe to re-run.

-- =============================
-- Admin role grants (per-environment)
-- =============================
-- Replace the placeholder UUIDs with real auth.user IDs for admins in this environment.
-- Example: grant 'admin' role in profiles if the profile exists.
-- Note: profiles are auto-created via the signup trigger in Supabase_DB_Schema.sql

do $$ begin
  -- Admin #1
  if exists (select 1 from public.profiles where id = '00000000-0000-0000-0000-000000000000') then
    update public.profiles set role = 'admin' where id = '00000000-0000-0000-0000-000000000000';
  end if;

  -- Admin #2 (optional)
  if exists (select 1 from public.profiles where id = '00000000-0000-0000-0000-000000000001') then
    update public.profiles set role = 'admin' where id = '00000000-0000-0000-0000-000000000001';
  end if;
end $$;

-- =============================
-- Default preferences (optional)
-- =============================
-- Example: set a default package slug for a specific user.
-- Replace UUID and slug as needed.

do $$ begin
  if exists (select 1 from public.profiles where id = '00000000-0000-0000-0000-000000000000') then
    update public.profiles set default_package_slug = 'premium' where id = '00000000-0000-0000-0000-000000000000';
  end if;
end $$;
