-- Gemeenschapsprijzen (6 sep 2026): wat gebruikers zelf betaalden, één regel per gebruiker per wijn.
-- Alleen gevuld als de gebruiker in Instellingen "Deel anoniem wat je betaalde" aanzet.
-- Lezen en schrijven gaat via de Edge Function `ai` (service role); de app zelf komt er niet bij,
-- en anderen zien alleen laag/midden/hoog bij twee of meer verschillende gebruikers.
-- Draaien in: Supabase dashboard → SQL Editor.
create table if not exists public.wine_paid (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  name text,
  producer text,
  vintage int,
  price numeric not null check (price > 0 and price < 100000),
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (key, user_id)
);
create index if not exists wine_paid_key on public.wine_paid(key);
alter table public.wine_paid enable row level security;
-- Geen policies: alleen de service role (Edge Function) mag erbij.
