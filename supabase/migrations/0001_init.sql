-- =========================================================================
-- NOVERE  ·  Initial schema, RLS, triggers
-- Run this whole file in Supabase → SQL Editor → New query → Run.
-- Idempotent: safe to re-run; existing policies are dropped before recreate.
-- =========================================================================

create extension if not exists pgcrypto;

-- =========================================================================
-- Tables
-- =========================================================================

create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  phone       text,
  role        text not null default 'client' check (role in ('client', 'admin')),
  created_at  timestamptz not null default now()
);

create table if not exists public.properties (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  price        numeric(14,2) not null check (price >= 0),
  type         text not null check (type in ('villa', 'penthouse', 'apartment')),
  deal_type    text not null check (deal_type in ('sale', 'rent')),
  location     text not null,
  area         numeric(10,2) not null check (area >= 0),
  bedrooms     integer not null default 0 check (bedrooms >= 0),
  bathrooms    integer not null default 0 check (bathrooms >= 0),
  images       text[] not null default '{}',
  featured     boolean not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists properties_type_idx       on public.properties (type);
create index if not exists properties_deal_type_idx  on public.properties (deal_type);
create index if not exists properties_featured_idx   on public.properties (featured) where featured;
create index if not exists properties_price_idx      on public.properties (price);

create table if not exists public.favorites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  property_id uuid not null references public.properties (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, property_id)
);

create index if not exists favorites_user_idx on public.favorites (user_id);

create table if not exists public.viewing_requests (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.profiles (id) on delete cascade,
  property_id     uuid not null references public.properties (id) on delete cascade,
  preferred_date  timestamptz,
  message         text,
  status          text not null default 'new' check (status in ('new', 'confirmed', 'cancelled')),
  created_at      timestamptz not null default now()
);

create index if not exists viewing_requests_user_idx     on public.viewing_requests (user_id);
create index if not exists viewing_requests_status_idx   on public.viewing_requests (status);

-- =========================================================================
-- Helper: is_admin() — security definer to bypass RLS on profiles
-- =========================================================================

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- =========================================================================
-- Trigger: auto-create a profile row when a new auth.users row is inserted
-- =========================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', null))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table public.profiles         enable row level security;
alter table public.properties       enable row level security;
alter table public.favorites        enable row level security;
alter table public.viewing_requests enable row level security;

-- ---- profiles -----------------------------------------------------------

drop policy if exists profiles_select_own        on public.profiles;
drop policy if exists profiles_select_admin      on public.profiles;
drop policy if exists profiles_update_own        on public.profiles;
drop policy if exists profiles_insert_self       on public.profiles;

create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);

create policy profiles_select_admin on public.profiles
  for select using (public.is_admin());

create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id)
  with check (
    auth.uid() = id
    AND role = (select p.role from public.profiles p where p.id = auth.uid())
  );

create policy profiles_insert_self on public.profiles
  for insert with check (auth.uid() = id);

-- ---- properties ---------------------------------------------------------

drop policy if exists properties_select_all   on public.properties;
drop policy if exists properties_admin_write  on public.properties;

create policy properties_select_all on public.properties
  for select using (true);

create policy properties_admin_write on public.properties
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- favorites ----------------------------------------------------------

drop policy if exists favorites_select_own on public.favorites;
drop policy if exists favorites_insert_own on public.favorites;
drop policy if exists favorites_delete_own on public.favorites;

create policy favorites_select_own on public.favorites
  for select using (auth.uid() = user_id);

create policy favorites_insert_own on public.favorites
  for insert with check (auth.uid() = user_id);

create policy favorites_delete_own on public.favorites
  for delete using (auth.uid() = user_id);

-- ---- viewing_requests ---------------------------------------------------

drop policy if exists viewing_requests_select_own    on public.viewing_requests;
drop policy if exists viewing_requests_select_admin  on public.viewing_requests;
drop policy if exists viewing_requests_insert_own    on public.viewing_requests;
drop policy if exists viewing_requests_update_own    on public.viewing_requests;
drop policy if exists viewing_requests_update_admin  on public.viewing_requests;
drop policy if exists viewing_requests_delete_own    on public.viewing_requests;

create policy viewing_requests_select_own on public.viewing_requests
  for select using (auth.uid() = user_id);

create policy viewing_requests_select_admin on public.viewing_requests
  for select using (public.is_admin());

create policy viewing_requests_insert_own on public.viewing_requests
  for insert with check (auth.uid() = user_id);

-- user can cancel their own request (status change to 'cancelled')
create policy viewing_requests_update_own on public.viewing_requests
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- admin can change status (new → confirmed/cancelled) on any request
create policy viewing_requests_update_admin on public.viewing_requests
  for update using (public.is_admin()) with check (public.is_admin());

create policy viewing_requests_delete_own on public.viewing_requests
  for delete using (auth.uid() = user_id or public.is_admin());

-- =========================================================================
-- Done. Run supabase/seed.sql next to populate test properties.
-- =========================================================================
