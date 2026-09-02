-- Beveiligingsronde 2 sep 2026. Draaien met: supabase db query --linked -f supabase/sql/beveiliging-2sep.sql
-- 1. Wie schreef welke prijs (herleidbaarheid van de gedeelde prijstabel)
alter table public.wine_prices add column if not exists user_id uuid;
-- 2. Het logboek bewaart geen gebruikers-id meer (privacyverklaring: inhoud van antwoorden niet aan een persoon koppelen)
alter table public.wine_price_log drop column if exists user_id;
-- 3. Volgorde van Stripe-gebeurtenissen bewaken
alter table public.profiles add column if not exists plan_event_at timestamptz;
-- 4. Credits boeken en controleren in één transactie, met een slot per gebruiker,
--    zodat veertig gelijktijdige verzoeken niet allemaal langs een tegoed van één credit glippen.
--    Geeft het id van de geboekte regel terug, of -1 (maand op) / -2 (daglimiet).
create or replace function public.boek_credits(p_user uuid, p_kind text, p_units int, p_limit int, p_day int, p_unlimited boolean)
returns text language plpgsql security definer set search_path = public as $$
declare m int; d int; nid text;
begin
  perform pg_advisory_xact_lock(hashtext(p_user::text));
  if not p_unlimited then
    select coalesce(sum(cost_units),0) into m from ai_usage where user_id = p_user and created_at >= date_trunc('month', now());
    select coalesce(sum(cost_units),0) into d from ai_usage where user_id = p_user and created_at >= date_trunc('day', now());
    if d + p_units > p_day then return '-2'; end if;
    if m + p_units > p_limit then return '-1'; end if;
  end if;
  insert into ai_usage(user_id, kind, cost_units) values (p_user, p_kind, p_units) returning id::text into nid;
  return nid;
end $$;
revoke all on function public.boek_credits(uuid, text, int, int, int, boolean) from public, anon, authenticated;
