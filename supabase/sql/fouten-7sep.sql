-- Logboek van mislukte AI-aanroepen (7 sep 2026). Hoort bij supabase/functions/ai/index.ts (logFout)
-- en de wekelijkse kostenmail (supabase/functions/kosten/index.ts).
-- Waarom: een mislukte aanroep verwijdert zijn eigen regel uit ai_usage, dus zonder dit logboek
-- ziet de kostenmail een stille week terwijl elke gebruiker "Fout bij de AI" krijgt. Een verlopen
-- sleutel (status 401) of een gepauzeerd project is hier het eerst te zien.
-- Geen gebruikers-id, geen inhoud van vragen; alleen soort, status en de eerste 300 tekens van
-- de foutmelding van Anthropic. De Edge Function ruimt regels ouder dan 90 dagen op.
-- Draaien in: Supabase dashboard → SQL Editor. Veilig opnieuw te draaien.
create table if not exists public.ai_fouten (
  id          bigserial primary key,
  kind        text,
  status      int,
  tekst       text,
  created_at  timestamptz not null default now()
);
create index if not exists ai_fouten_time on public.ai_fouten (created_at);
alter table public.ai_fouten enable row level security;
-- Geen policies: alleen de service role (de Edge Functions) leest en schrijft.

-- Terugweg (down): drop table if exists public.ai_fouten;
