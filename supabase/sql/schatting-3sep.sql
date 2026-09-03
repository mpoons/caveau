-- Meting scanner tegenover zoekagent (3 sep 2026). De app stuurt bij "Precies opzoeken" de
-- schatting van de scanner mee; de Edge Function `ai` bewaart die naast de gevonden prijs,
-- en de wekelijkse kostenmail rekent de mediaan uit. Zonder deze kolom valt de functie
-- terug op de oude rij, dus niets breekt, maar de meting blijft leeg.
-- Draaien in: Supabase dashboard → SQL Editor.
alter table public.wine_price_log add column if not exists schatting numeric;
