# Caveau — instructies voor Claude-sessies

Persoonlijke wijnkelder-PWA van Max. Live: **https://mpoons.github.io/caveau/** (GitHub Pages uit deze repo, `mpoons/caveau`). Alle communicatie en UI in het **Nederlands**.

## Architectuur
- **`caveau.html` is de enige bron** (één bestand: CSS + markup + alle JS in genummerde script-blokken). `index.html` wordt gegenereerd — nooit met de hand bewerken.
- Artifact-formaat: geen doctype/html/head/body-tags in caveau.html; `head.html` + `build.sh` wikkelen hem naar `index.html`.
- Data: localStorage (`caveau_v1`, object `S`) + IndexedDB voor foto's. Cloud-sync via Supabase (document-LWW op `S.rev`, foto's incrementeel). `save(true)` = technische write zonder rev-bump/cloud-push.
- Supabase-project: `https://dbzgrkipcoebglacsqwe.supabase.co` (publishable key staat in de code — by design). Tabellen: `cellars`, `photos`, `profiles`, `ai_usage` (RLS per gebruiker). Auth: e-mail+wachtwoord ("Confirm email" staat uit).
- AI-routering (`callClaude`): eigen API-sleutel in Instellingen → rechtstreeks Anthropic; anders ingelogd → Edge Function **`ai`** (`supabase/functions/ai/index.ts`, secret `CAVEAU_ANTHROPIC_KEY`, telt acties in `ai_usage`; gratis 15/maand, plus 500, plan `unlimited` via dashboard → profiles). Sandbox (claude.ai-artifact) = AI uit, kelderregels (offline heuristiek) vangen alles op.

## Edge Functions
- Liggen in de CLI-indeling: `supabase/functions/<naam>/index.ts`, met `supabase/config.toml` voor de JWT-instelling per functie (`stripe-webhook` staat daar bewust op `verify_jwt = false`).
- Uitrollen: `supabase functions deploy <naam> --project-ref dbzgrkipcoebglacsqwe` (na `supabase login`).

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
- Fase 1 + 2 SQL **gedraaid** en alle drie de Edge Functions **live** (1 sep 2026). Gecontroleerd: `ai` → 401, `billing` → 401 "Niet ingelogd", `stripe-webhook` → 400 "Ongeldige handtekening" (dus geen JWT ervoor, handtekeningcontrole werkt). Secrets staan onder de juiste namen. Project draait in `eu-west-1` (Ierland) — relevant voor de privacyverklaring.
- ⚠️ **De Anthropic-serversleutel verloopt 31 december 2026.** Loopt hij af, dan valt etiket- en wijnkaartlezen stil voor álle gebruikers. Half december vervangen in de console en opnieuw zetten als `CAVEAU_ANTHROPIC_KEY`.
- Stripe **testmodus** (account `acct_1UAm7oL0f2iIgWz0`, NL, onboarding nog niet af): product `prod_VB8SYtxqKYfPps`, prijs `price_1UAmBrL0f2iIgWz0Xc4PnL29` (€2,99/mnd, btw inbegrepen) = `STRIPE_PRICE_PLUS`. Klantportaal en webhook-endpoint moeten nog door Max in het dashboard.
- AI-antwoorden **streamen**: `callClaude(content, maxTokens, kind, onText)`; `readSSE()` in de app, doorgeefluik met verbruiksboeking in `functions/ai/index.ts`. Zonder `onText` blijft alles werken zoals eerst.
- Wijnkaart-scan (restaurant): Pairing → derde stand "Wijnkaart" (`viewMenu`/`runMenu`/`aiMenu`, kind `wijnkaart`, tot 4 foto's, alleen in het geheugen — nooit in IndexedDB of cloud). Laatste advies leeft in `S.menuLast` (12 uur zichtbaar). Zonder AI: `menuGuideHtml` (FOODS-regels) als kaartgids.
- Fase 2 (app-kant klaar, server nog niet): **gewogen credits** i.p.v. acties — `creditsFor()` in `functions/ai/index.ts` en `creditCost()` in caveau.html moeten gelijk blijven (etiket/tekst = 1, wijnkaart = 2 per foto). Gratis 20 credits/mnd, Plus 300 voor €2,99. Stripe direct (btw regelt Max zelf later): `functions/billing/index.ts` (Checkout + portaal, JWT aan) en `functions/stripe-webhook/index.ts` (**JWT uit**, handtekening via `constructEventAsync`). SQL: `schema-fase2.sql`.
- Nog te doen na fase 2: privacy/voorwaarden-pagina's, Supabase Pro bij echte gebruikers, daarna marketingplan.
- Wens-backlog: échte pushmeldingen (vergt berichtenserver), meertalige versie, AI-sommelier-kwaliteit verder onder de loep.
