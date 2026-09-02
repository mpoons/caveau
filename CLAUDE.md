# Caveau, instructies voor Claude-sessies

Persoonlijke wijnkelder-PWA van Max. Live: **https://mpoons.github.io/caveau/** (GitHub Pages uit deze repo, `mpoons/caveau`). Alle communicatie en UI in het **Nederlands**.

## Architectuur
- **`caveau.html` is de enige bron** (één bestand: CSS + markup + alle JS in genummerde script-blokken). `index.html` wordt gegenereerd en mag je nooit met de hand bewerken.
- Artifact-formaat: geen doctype/html/head/body-tags in caveau.html; `head.html` + `build.sh` wikkelen hem naar `index.html`.
- Data: localStorage (`caveau_v1`, object `S`) + IndexedDB voor foto's. Cloud-sync via Supabase (document-LWW op `S.rev`, foto's incrementeel). `save(true)` = technische write zonder rev-bump/cloud-push.
- Supabase-project: `https://dbzgrkipcoebglacsqwe.supabase.co` (publishable key staat in de code, by design). Tabellen: `cellars`, `photos`, `profiles`, `ai_usage` (RLS per gebruiker). Auth: e-mail+wachtwoord ("Confirm email" staat uit).
- AI-routering (`callClaude`): eigen API-sleutel **alleen in de ontwikkelaarsstand** (`S.settings.devMode`, aan te zetten met zeven tikken op de titel in Instellingen; uitzetten wist de sleutel). `ownKey()` is de enige plek die hem teruggeeft; buiten die stand wordt een opgeslagen sleutel genegeerd, zodat niemand het tegoedmodel omzeilt. Met sleutel → rechtstreeks Anthropic; anders ingelogd → Edge Function **`ai`** (`supabase/functions/ai/index.ts`, secret `CAVEAU_ANTHROPIC_KEY`, telt acties in `ai_usage`; gratis 15/maand, plus 500, plan `unlimited` via dashboard → profiles). Sandbox (claude.ai-artifact) = AI uit, kelderregels (offline heuristiek) vangen alles op.

## Edge Functions
- Liggen in de CLI-indeling: `supabase/functions/<naam>/index.ts`, met `supabase/config.toml` voor de JWT-instelling per functie (`stripe-webhook` staat daar bewust op `verify_jwt = false`).
- Uitrollen: `supabase functions deploy <naam> --project-ref dbzgrkipcoebglacsqwe` (na `supabase login`).

## Wijzigingen uitrollen
1. Bewerk `caveau.html` rechtstreeks.
2. Versienummer in `sw.js` ophogen (`caveau-vN`).
3. `./build.sh` (maakt index.html).
4. Syntax-check: script-blokken uitknippen en `node --check`; daarna controleren dat er **géén typografische aanhalingstekens** (“ ”) in attributen zitten; dat is eerder misgegaan.
5. Functioneel testen in de browser (file:// werkt; localStorage beschikbaar).
6. Commit + push (Co-Authored-By-regel gebruiken); Pages deployt vanzelf (±30 s; poll met curl op een codefragment).
7. Optioneel: artifact herpubliceren vanaf `caveau.html` (zelfde bestandspad = zelfde URL).

## Valkuilen
- **claude-sonnet-5/opus-5 denken standaard** (adaptive thinking) en dat telt mee in `max_tokens` → voor JSON-extractie `thinking:{type:"disabled"}` + ruim budget, anders afgekapte JSON ("Expected '}'").
- Git-identiteit van deze repo is bewust anoniem (`mpoons <…noreply…>`); niet globaal wijzigen.
- "Alles wissen" wist bij actieve sync óók de cloud; sync heeft een krimp-guard (>80% minder wijnen → keuzesheet) en lokale reservekopieën (`caveau_backup_daily`/`_prev`).
- API-sleutel en sessietokens nooit syncen/exporteren (zit zo in de code, zo houden).

## Status & vervolg (2 sep 2026)
- **Serverkant staat volledig live.** Fase 1 + 2 SQL gedraaid, alle drie de Edge Functions uitgerold en nagelopen: `ai` geeft 401, `billing` 401 "Niet ingelogd", `stripe-webhook` 400 "Ongeldige handtekening" (dus geen JWT ervoor en de handtekeningcontrole werkt). Secrets staan onder de juiste namen. Project draait in `eu-west-1` (Ierland), relevant voor de privacyverklaring.
- ⚠️ **De Anthropic-serversleutel verloopt 31 december 2026.** Loopt hij af, dan valt etiket- en wijnkaartlezen stil voor álle gebruikers. Half december vervangen en opnieuw zetten als `CAVEAU_ANTHROPIC_KEY`. Er staat een geplande herinnering voor 10 december.
- **Plus staat nog niet te koop:** `PLUS_TE_KOOP = false` in caveau.html. Stripe draait in testmodus, en een testafrekenpagina met een oranje TEST MODE-balk wil je geen eerste gebruiker laten zien. Tegoed geven doe je zolang met SQL (`bonus_credits`, of `plan = 'unlimited'`). Live gaan is die constante op `true`, plus in Stripe live-modus opnieuw product met belastingcode (`txcd_10103000`), prijs, webhook, klantportaal en sleutels.
- Stripe testmodus: account `acct_1UAm7oL0f2iIgWz0` (NL, onboarding niet af), product `prod_VB8SYtxqKYfPps`, prijs `price_1UAmBrL0f2iIgWz0Xc4PnL29` (€2,99/mnd, btw inbegrepen) = `STRIPE_PRICE_PLUS`.
- **Supabase staat op het gratis plan** en pauzeert na zeven dagen zonder verkeer. Bewust uitgesteld zolang het alleen familie is; Pro (~$25/mnd) is nodig voordat er iemand betaalt, ook voor de dagelijkse back-ups.

## Wat er sinds 1 sep is bijgekomen
- **Streamen.** `callClaude(content, maxTokens, kind, onText)` met `readSSE()`; de Edge Function laat de stroom ongewijzigd door en boekt het verbruik pas als er echt tekst gelezen is. Het scanformulier staat er meteen en vult zich onderweg (`scanPartial`/`vulFormLive`); velden die de gebruiker aanraakt komen in `scanTouched` en winnen van het antwoord (`behoudEigenInvoer`).
- **Scannen bij weinig licht.** De auto-vangst mat scherpte met een vaste drempel, waardoor de sluiter in een donker restaurant nooit klikte. Scherpte en beweging worden nu afgezet tegen de helderheid van het beeld zelf. Plus een zaklampknop waar de camera het aankan (Android; iOS Safari kan dit niet), `liftDark()` die donkere foto's opentrekt, en één compressieronde in plaats van twee (1400 px).
- **`matchWine` herschreven.** Naam en producent wegen apart: twee cuvées van hetzelfde domein zijn niet dezelfde wijn. Huiswoorden staan in `HUISWOORDEN`. Een andere jaargang is een andere fles.
- **Sync veiliger.** `S.syncedRev` houdt bij wat er als laatste geslaagd is gesynchroniseerd; de beslissing gaat over wie er iets veranderde, niet over welk revisienummer hoger is. Bij wijziging aan twee kanten volgt een keuzescherm (`askShrink` met stand `botsing`). `S.rev` is een teller in plaats van `Date.now()`. Uitloggen bewaart de uid, zodat een ánder account op hetzelfde apparaat niet de kelder van de vorige meeneemt. Twee reservekopieën, `krimpErgens()` weegt ook historie en verlanglijst, en mislukte fotouploads worden gemeld in plaats van weggeslikt.
- **Voorwaarden en privacy** onder Meer, met eigen adressen `#voorwaarden` en `#privacy` (hash-routering). `AANBIEDER`, `CONTACT_MAIL` en `LEGAL_DATUM` staan als constanten bij elkaar voor als er een eenmanszaak of BV achter komt. Voor het afrekenen een scherm met prijs en een verplicht vinkje voor de directe levering.
- **Op je beginscherm.** `installBanner()` verschijnt meteen, ook bij een lege kelder, en verdwijnt na wegklikken of installeren. `beforeinstallprompt` geeft op Android één tik; op iOS staan de Safari-stappen uitgeschreven.
- **Meerdere flessen tegelijk** (Meer, `viewImport`/`aiImport`, kind `import`): lijst plakken of tot 4 foto's van een lijst of staande flessen. Eén aanroep levert een reeks wijnen, de gebruiker vinkt aan wat mee mag. Drinkvensters komen van `estimateWindow`, niet van de AI. Dubbelen worden gemarkeerd en staan uit. Tik op een rij om bij te werken (hergebruikt `formFields`/`readForm`), en een veld boven de lijst zet de locatie op alle aangevinkte. Liggende flessen in een rek hebben geen zin, dat staat ook zo op het scherm.
- **Vensters en geschiedenis.** Een sheet sluit ook met een veeg naar beneden (alleen als `.sheet-in` bovenaan staat, anders is het scrollen). Elke sheet is een `pushState`-stap; de terugknop en de Safari-randveeg sluiten het venster (`popstate`; `sheetSkipPops`/`sheetNaPop` vangen de asynchrone `history.go` op). Een veeg vanaf de linkerrand (`wireSwipeBack`) sluit het bovenste venster, ook in de iPhone-app.
- **`readForm(root)` en `wireSeg(id, root)` kijken binnen één sheet.** Een sluitende sheet blijft 300 ms in de DOM, en met vaste veld-ids las `readForm` anders de velden van het verkeerde formulier.

## Schrijfstijl
Geen gedachtestreepjes en geen "niet X, maar Y". Geldt voor de app, voor dit bestand en voor antwoorden in de chat. `STIJLREGELS` gaat via `styleNote()` mee in élke AI-prompt, anders komt het via de gegenereerde tekst weer binnen. Een los `—` als "geen waarde" in een tabelcel en getalbereiken zoals `16–18 °C` blijven.

## Nog open
- Supabase Pro en Stripe live vóór er vreemden bij komen; uitgavenplafond bij Anthropic.
- Kostprijs per credit meten met `ai_usage` (`tokens_in`/`tokens_out`). Blijft het onder $0,010, dan klopt de bundel van 300 voor €2,99.
- Positionering: Caveau beantwoordt "welke fles moet vanavond open", Vivino "moet ik deze kopen". Echte concurrent is CellarTracker, niet Vivino.

### Niveau van een fles: gebouwd als "Plek in je kelder" (2 sep 2026)
Gebouwd volgens de regels hieronder. `plekInKelder(w)` rekent relatief aan de eigen kelder (minstens zes wijnen met een prijs; top = bovenste 10% of drie stuks én ≥1,5× de mediaan; "duurder" = bovenste kwart én ≥1,25× de mediaan; daaronder stilte). `verdict(w)` is de ene zin "bewaren of openen", zonder gok naar de gelegenheid. `klasse(w)` herkent classificaties in `appellation`/naam (`KLASSEN`). Prijzen dragen een bron: `valueSrc` is `ai` (schatting), `zoek` (zoekagent, met `valueBron` {name,url,vintage}) of `eigen` (zelf ingevuld); `valueAt` is de datum. "Je topfles" alleen bij een prijs met bron, anders "waarschijnlijk". Kaart: ◆ (bron) of ◇ (schatting) bij topflessen. Scoreveld `score` (vrije tekst, sorteerbaar); de scanner vult `score_seen` alleen als het letterlijk op de foto staat.

**Zoekagent (kind `prijs`, 5 credits):** `aiPrijs(w)` stuurt `web:true` + `wine` mee; de Edge Function zet de server-side `web_search_20260209` erbij en kijkt eerst in `wine_prices` (SQL in `supabase/sql/wine_prices.sql`, een jaar geldig, cache-hit = gratis en geen `ai_usage`-rij; het letterlijke modelantwoord staat per zoekopdracht in `wine_price_log`). Knop "Prijs opzoeken" in het detail, bulkknop in Instellingen (`prijsBulk`: ouder dan acht jaar of aan de bovenkant), na een scan nooit ongevraagd: bij een tabel-miss een toast met één tik "Zoek op · 5 credits" (`prijsNaScan`). De zoekagent draait op Haiku 4.5 (`MODEL_BY_KIND.prijs`) met de basiszoekfunctie `web_search_20250305`, hoogstens twee zoekrondes en een vaste sitelijst (`PRIJS_SITES`); Haiku krijgt geen `thinking`-veld. Eerste geslaagde Haiku-zoekopdracht (2 sep, Quarts de Chaume 2014): €58 via iDealwine, jaargang 2011, 31k tokens in, ± $0,06. Les: een klein model heeft genummerde regels nodig, anders geeft het null zodra de exacte jaargang ontbreekt. De prompt vraagt sinds v46 ook de flesmaat (`size_seen`) en omrekening naar 75 cl, omdat zoete wijnen vaak per 50 cl gaan. De prijsprompts vragen sinds 2 sep om de marktwaarde van díe jaargang nu, met brede band bij oude wijnen. Eerste echte aanroep gemeten (2 sep): 43.768 invoertokens, 1.477 uit, ± $0,14 per fles; daarom 5 credits en hoogstens drie zoekopdrachten. Gratis tabelpad: `kind:'prijscache'` met `wines[]` (geen AI, geen credit); de app vraagt het na elke scan (`prijsNaScan`) en één keer per dag voor de hele kelder (`prijsTabelRonde`, `S.settings.prijsRondeOp`). Gemeten op Max' kelder: jonge en bekende wijnen kloppen, oude lopen beide kanten op (Quarts de Chaume 2014 2,5× te laag, Anthonic 2010 te hoog), vandaar de agent.

### De ontwerpregels (blijven gelden)
Mensen krijgen wijn cadeau en weten niet of het een fles voor vanavond is of een om te bewaren. Vivino lost dat op met community-scores; die database hebben wij niet en gaan we niet inhalen. De vraag is dus: hoe laat je niveau zien zonder reviewdatabase?

Wat we al hebben of gratis kunnen krijgen: de geschatte waarde (`value_eur` met bandbreedte), de classificatie in `appellation` (Grand Cru Classé, DOCG, Riserva, VDP Grosse Lage; openbare structuurkennis waar een taalmodel betrouwbaar in is), en de reputatie van producent en jaargang (kwalitatief, zonder cijfer).

Twee harde randvoorwaarden, allebei uit een fout die al gemaakt is:
1. **Relatief aan de eigen kelder, nooit absolute prijsklassen.** Veel mensen hebben alles tussen €5 en €20. Voor hen is die fles van €19 de bijzondere. Een vaste schaal noemt die "doordeweeks" en heeft het mis. "Een van je duurdere flessen" klopt bij elke kelder.
2. **Nooit neerbuigend over een fles die iemand bezit of cadeau kreeg.** Zeg waar een wijn goed tot z'n recht komt, niet waar hij te min voor is. "Prima bij het koken" is precies de zin die niet moet.

Over externe scores (Parker, Hamersma, Decanter): **nooit uit het geheugen van de AI laten komen.** Die getallen worden overtuigend verzonnen, ze hangen per jaargang, en het is redactioneel eigendom van anderen. Wel goed: een vrij veld waarin de gebruiker zelf noteert wat hij gezien heeft ("92 Parker", "8,5 Hamersma"), sorteerbaar; en de scanner mag een score overnemen die echt op de foto staat (schapkaartje, halslabel), met de bron erbij.

Wat we wél hebben en Vivino niet: het oordeel van de gebruiker zelf over flessen die hij echt heeft opgedronken (sterren in de historie, smaakprofiel). Aggregeren over gebruikers heen raakt de privacyverklaring, die nu zegt dat we niets delen. Iets voor bij schaal, niet nu.
- Wens-backlog: gedeelde kelder voor twee mensen, échte pushmeldingen (vergt berichtenserver), meertalige versie.
- **Smaakprofiel (gebouwd 2 sep).** Meer → Jouw smaak (`viewSmaak`): druiven, streken, vijf schuifjes (midden = geen voorkeur), kleur; opgeslagen in `S.settings.smaak`. `smaakGeleerd()` leert uit sterren in de historie (vanaf vijf beoordelingen; druif hoog/laag bij n≥2, streek of type laag pas bij n≥3); `drinkSave` bewaart sinds nu druiven en streek in het historie-item. `smaakNote()`/`smaakPrompt()` gaan mee in `aiDish`, `aiMenu` en `aiAsk`; `smaakMatch(w)` (+1/0/−1) telt 0,8 punt mee in `scoreWines` en toont "♥ Past bij je smaak" bij Vanavond, op de wijnkaart en na een scan.
- **Naam.** Caveau botst met een EU-beeldmerk uit 2025 (Caveau Ltd, o.a. klasse 9, 33 en 42, een lifestyle- en swingersclubmerk) en caveau.nl/.com zijn bezet; hernoemen vóór domein en advertenties. Brief: een chic woord, herkenbaar in NL/FR/EN/IT, dat "eigen kelder" en "persoonlijke sommelier" uitdrukt. Afgevallen: Sommelo (één letter van de app Sommelio), Vintro, Cuvéo, Cellaro, Apogée, Maturo, Caviste, Sommo. Vrij qua domeinen en zoekmachines: Vinsavant, Maitrecave, Vinmoment, Vindow (.com bezet). TMview is te bevragen via POST tmdn.org/tmview/api/search/results met {page,pageSize,criteria:'C',basicSearch}.
- **Verhuizing naar eigen domein** (plan staat, wacht op de naam): nieuwe repo voor de app, het oude adres wordt een brug (sync als verhuiswagen, overdracht via URL-fragment zonder foto's als noodweg, laatste service worker die zichzelf afmeldt), Supabase-auth-URL's bijwerken.
