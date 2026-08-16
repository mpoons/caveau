# Caveau — instructies voor Claude-sessies

Persoonlijke wijnkelder-PWA van Max. Live: **https://mpoons.github.io/caveau/** (GitHub Pages uit deze repo, `mpoons/caveau`). Alle communicatie en UI in het **Nederlands**.

## Architectuur
- **`caveau.html` is de enige bron** (één bestand: CSS + markup + alle JS in genummerde script-blokken). `index.html` wordt gegenereerd — nooit met de hand bewerken.
- Artifact-formaat: geen doctype/html/head/body-tags in caveau.html; `head.html` + `build.sh` wikkelen hem naar `index.html`.
- Data: localStorage (`caveau_v1`, object `S`) + IndexedDB voor foto's. Cloud-sync via Supabase (document-LWW op `S.rev`, foto's incrementeel). `save(true)` = technische write zonder rev-bump/cloud-push.
- Supabase-project: `https://dbzgrkipcoebglacsqwe.supabase.co` (publishable key staat in de code — by design). Tabellen: `cellars`, `photos`, `profiles`, `ai_usage` (RLS per gebruiker). Auth: e-mail+wachtwoord ("Confirm email" staat uit).
- AI-routering (`callClaude`): eigen API-sleutel in Instellingen → rechtstreeks Anthropic; anders ingelogd → Edge Function **`ai`** (`supabase/ai-function.ts`, secret `CAVEAU_ANTHROPIC_KEY`, telt acties in `ai_usage`; gratis 15/maand, plus 500, plan `unlimited` via dashboard → profiles). Sandbox (claude.ai-artifact) = AI uit, kelderregels (offline heuristiek) vangen alles op.

## Wijzigingen uitrollen
1. Bewerk `caveau.html` rechtstreeks.
2. Versienummer in `sw.js` ophogen (`caveau-vN`).
3. `./build.sh` (maakt index.html).
4. Syntax-check: script-blokken uitknippen en `node --check`; daarna controleren dat er **géén typografische aanhalingstekens** (“ ”) in attributen zitten — dat is eerder misgegaan.
5. Functioneel testen in de browser (file:// werkt; localStorage beschikbaar).
6. Commit + push (Co-Authored-By-regel gebruiken); Pages deployt vanzelf (±30 s — poll met curl op een codefragment).
7. Optioneel: artifact herpubliceren vanaf `caveau.html` (zelfde bestandspad = zelfde URL).

## Valkuilen
- **claude-sonnet-5/opus-5 denken standaard** (adaptive thinking) en dat telt mee in `max_tokens` → voor JSON-extractie `thinking:{type:"disabled"}` + ruim budget, anders afgekapte JSON ("Expected '}'").
- Git-identiteit van deze repo is bewust anoniem (`mpoons <…noreply…>`); niet globaal wijzigen.
- "Alles wissen" wist bij actieve sync óók de cloud; sync heeft een krimp-guard (>80% minder wijnen → keuzesheet) en lokale reservekopieën (`caveau_backup_daily`/`_prev`).
- API-sleutel en sessietokens nooit syncen/exporteren (zit zo in de code — zo houden).

## Status & vervolg
- Fase 1 (AI-proxy) app-kant staat live; Max' serverstappen: SQL (`supabase/schema-fase1.sql`) plakken, secret zetten, functie `ai` deployen via dashboard.
- Fase 2-plan: Stripe Checkout + webhook → `profiles.plan='plus'` (€1,99/mnd), klantportaal; daarna privacy/voorwaarden-pagina's. Supabase Pro pas bij betalende gebruikers.
- Wens-backlog: échte pushmeldingen (vergt berichtenserver), meertalige versie, AI-sommelier-kwaliteit verder onder de loep.
