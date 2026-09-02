-- Logboek van de zoekagent: wat het model letterlijk terugstuurde, om te zien
-- waarom een prijs wel of niet gevonden werd. Alleen de Edge Function schrijft;
-- geen RLS-policies, dus de client kan er niet bij. Na een maand opruimen.
create table if not exists public.wine_price_log (
  id          bigserial primary key,
  user_id     uuid,
  key         text,
  model       text,
  status      int,
  text        text,
  value       numeric,
  error       text,
  tokens_in   int,
  tokens_out  int,
  created_at  timestamptz default now()
);
alter table public.wine_price_log enable row level security;
