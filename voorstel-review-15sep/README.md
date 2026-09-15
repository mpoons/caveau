# Review CellarMentor, 15 sep 2026: bugs, beveiliging en architectuur

Vier onafhankelijke reviews (serverkant, client-beveiliging, client-correctheid, architectuur) over
`mpoons/cellarmentor` op `main` (29852ef, "feat: Plus te koop"). Elke bevinding hieronder is daarna
door mij zelf in de code nagelezen; wat "nagespeeld" heet, is in headless Chromium uitgevoerd
(`tests-headless/`). Alles wat gerepareerd is staat als vijf patches in `patches/` (bron-bestanden,
geen `index.html`); de brug-repo zelf is niet aangeraakt. Niets is gedeployed.

## Toepassen

```sh
git am patches/000*.patch          # in de cellarmentor-checkout, op main
./build.sh && ./check.sh           # 26 tests, alles goed
supabase functions deploy ai stripe-webhook herinnering kosten --project-ref dbzgrkipcoebglacsqwe
# SQL met de hand in de SQL-editor: supabase/sql/rls-kelder-15sep.sql (en de curl-controle in dat bestand)
```

Patch 0004 is het eerdere voorstel "wijnen zonder voorraad" (zie `voorstel-voorraad-nul/`), hier
opnieuw gebaseerd op de andere fixes; 0003 is de sheet-geschiedenisbug uit datzelfde voorstel.
`sw.js` is gewijzigd maar het versienummer bewust niet opgehoogd (dat doet je andere chat bij het
uitrollen). `DECISIONS.md`, `CLAUDE.md` en `ARCHITECTURE.md` zijn niet aangeraakt; teksten daarvoor
staan onderaan.

## Gerepareerd

### Server (patch 0001)

1. **Gedeelde prijstabel te herschrijven door elke gebruiker, met prompt-injectie** (hoog).
   `appellation`, `region` en `country` gingen letterlijk de zoekopdracht in; op het pad met de
   webtool (`prijsdiep`, en `prijs` zodra Brave ontbreekt of het dagplafond bereikt is) kon een
   gebruiker het model een zelfgekozen prijs laten teruggeven en die met `refresh:true` in
   `wine_prices` zetten, voor iedereen. Nu: die velden ontdaan van aanhalingstekens en haken als
   data (`<herkomst>`), en een gevonden prijs vervangt de rij van een ander alleen binnen 0,4x tot
   2,5x, of als die rij ouder is dan 90 dagen (`prijsMagVervangen`). Eigen rijen mag je verversen.
2. **Afbreken van een stream vóór het eerste woord gaf de credit terug** terwijl Anthropic de
   beelden al had verwerkt: onbeperkt gratis rekenen door steeds af te breken. Alleen een netjes
   geëindigde stroom zonder tekst boekt nog terug.
3. **Grenzen**: bodygrootte in bytes (content-length en arrayBuffer) in plaats van tekens; beelden
   via url worden geweigerd (onmeetbaar); `prijs` zonder zoekagent telt beelden mee; sleutel van
   de prijstabel op 200 tekens per veld; `ai_fouten` opruimen bij één op de twintig.
4. **Gemeenschapsprijzen pas vanaf drie gebruikers**: bij twee waren `low` en `high` precies de
   twee individuele bedragen, dus niet "samengevoegd" zoals de privacytekst zegt.
5. **Stripe-webhook**: de volgordebewaking stond alleen vóór de update; nu ook in de update zelf
   (`plan_event_at` null of ouder), zodat twee gelijktijdige leveringen elkaar niet inhalen.
6. **Cron-secret in constante tijd vergeleken** (`herinnering`, `kosten`).
7. **SQL**: `wine_price_log.sql` maakte `user_id` nog aan (privacybelofte); nieuw bestand
   `rls-kelder-15sep.sql` legt de policies voor `cellars` en `photos` vast. Die stonden alleen in
   het dashboard en waren dus niet te controleren; de client stuurt `user_id` zelf mee in de
   upsert, dus zonder `with check` kan een gebruiker een rij voor een ander schrijven. Het bestand
   bevat een curl-controle. **Doe die controle** vóór en na het draaien.

### Client (patches 0002, 0003, 0005)

8. **Sessie uit een link werd blind aangenomen** (hoog, nagespeeld). Iemand kon zijn eigen
   Supabase-tokens in `https://cellarmentor.com/#access_token=…&type=signup` zetten; wie de link
   opende belandde stil in dat account en de eerste sync stuurde zijn hele kelder daarheen (bij
   een lege lokale kelder: het vergiftigde document van de ander werd overgenomen, zie 9). Nu
   geeft een bevestigingslink alleen een sessie op het apparaat dat de aanmelding startte
   (`caveau_auth_pending`); elders is de mail bevestigd en logt de gebruiker in met zijn
   wachtwoord (e-mailadres staat klaar). Een herstel-link houdt het token, maar een kelder die nog
   aan geen account hangt gaat pas na een vraag met het e-mailadres in beeld naar dat account
   (`koppelOfSync`, "Ja, koppelen" / "Nee, uitloggen"). Let op: dit verandert de UX van de
   bevestigingsmail op een ánder apparaat of in Safari naast de PWA: daar staat nu "log in met je
   wachtwoord" in plaats van een automatische login. Dat is juist het punt.
9. **Stored XSS en crash via het cloud-document of een reservekopie** (hoog, nagespeeld).
   `pairCache`, `recipeCache` en `tonight` kwamen ongecontroleerd binnen; `score` en `persons`
   stonden zonder `esc()` in de opmaak; `"tonight":"x"` liet de kelder bij elke start crashen.
   `schoonDoc` normaliseert nu het hele document (vaste velden, types en grenzen); `adoptDoc` en
   "Reservekopie terugzetten" gebruiken dat; `loadState` bewaakt de structuur.
10. **`TYPES["constructor"]`** telde als geldig type en `WEG["constructor"]` als reden; een
    gedeeld back-upbestand met zo'n waarde liet de historiepagina blijvend crashen. `eigenSleutel`.
11. **"Geen beoordeling" werd 0 sterren ("die was niks")** bij elke sync en back-upimport
    (`Number(null)` is 0). Betekenisverlies in gebruikersdata, niet terug te draaien. Gerepareerd
    met test.
12. **Sync-ijkpunt klopte niet** (hoog). `syncedRev` werd gezet op de stand van ná de upload; een
    wijziging tijdens het uploaden van foto's (seconden) lag dan vóór op de cloud en de volgende
    sync haalde het oude document terug over die wijziging heen. Het ijkpunt is nu de gepushte
    stand; een wijziging tijdens een pull maakt er een botsing van (keuzescherm); na een keuze in
    het krimpscherm worden ijkpunt én tellingen gezet (die tellingen bleven eerder staan, met een
    herhaald krimpscherm als gevolg).
13. **Accountwissel**: `rev`, `syncedRev`, `syncedTel` worden nu altijd gereset, ook als de vorige
    kelder leeg was (anders kon een toevallig gelijk revisienummer de cloudkelder van de nieuwe
    gebruiker stil overschrijven); verlanglijst en locaties tellen mee.
14. **Een lopende scan vulde een bewerkvenster van een andere fles** (hoog). Alle formulieren
    delen de veld-ids `f_name` enz.; open je tijdens het lezen een fles en Bewerken, dan kwam het
    etiket van de scan in dat formulier en na Bewaren over die fles heen. Nu alleen het
    scanformulier in `#view`.
15. **Wijnobjecten van vóór een `await`** (`scanMerge`, `prijsZoek`, `prijsBulk`, ongedaan-knop
    van afboeken): na een cloud-pull op de achtergrond zijn dat losse objecten; de bijgeboekte
    flessen of de betaalde prijs kwamen nergens terecht. Nu opnieuw opzoeken vóór het schrijven.
16. **Robuustheid**: `render()` vangt een fout in een view en toont een noodscherm met back-up,
    reservekopieën en de foutregel (eerder: leeg scherm, ook Instellingen onbereikbaar);
    onbehandelde fouten geven een toast; een onleesbare `caveau_v1` blijft bewaard als
    `caveau_v1_kapot` met een melding; de taalkeuze sluit alleen zichzelf (sloot eerder ook
    "Nieuw wachtwoord"); `check.sh` en de tests splitsen alleen op een regel die precies
    `<script>` is.
17. **Klein**: cloud-document begrensd op 4 miljoen tekens (één te groot document blokkeerde
    anders elk opslaan op dat apparaat blijvend); cloudfoto's moeten `data:image` zijn; betaallink
    alleen naar stripe.com; verlanglijstfoto's gaan ook uit de cloud; de service worker bewaart
    alleen een echte app-navigatie als offline-vangnet (een top-level link naar een icoon kwam als
    `index.html` in de cache); `valueAt` moet een datum zijn ("Invalid Date" op het scherm);
    prijstabelronde ook voor meer dan 100 flessen (de rest werd stil overgeslagen).
18. **Sheet-geschiedenis** (patch 0003, nagespeeld): "Verwijderen" via het detail stuurde de
    browser te ver terug, uit de app als die via een link was geopend.

## Gevonden, niet gerepareerd (jouw keuze)

Gerangschikt op wat ik eerst zou doen.

- **Open signup zonder captcha** (al bekend). Elke limiet per gebruiker is met wegwerpaccounts te
  vermenigvuldigen; het is de basis onder de resterende serverpunten. Dashboard-instelling.
- **Brave-plafond valt terug op de dure webtool**: bij 400 zoekopdrachten per dag (of een
  Brave-storing) loopt `prijs` (1 credit) door naar de `web_search`-agent van ± $0,06 per keer.
  Het plafond beschermt het Brave-tegoed van $5 door tien keer zoveel bij Anthropic uit te geven.
  Voorstel: dan `{value:null, note:'zoeklaag vandaag vol'}` teruggeven en terugboeken; de client
  biedt al "Dieper zoeken · 5 credits" aan bij `value:null`. Niet gedaan omdat het een bewuste
  keuze ("zodat de app blijft werken") omdraait.
- **Geen globaal dagplafond op Anthropic-verbruik** behalve `DAY_CREDITS` per gebruiker en het
  uitgavenplafond bij Anthropic; `unlimited` heeft geen plafond. Eén SQL-telling per dag over alle
  gebruikers in `boek_credits` zou volstaan.
- **Cron-mails zijn onzichtbaar**: `kosten` en `herinnering` geven zonder Resend een JSON of 500
  terug aan pg_cron, dat niemand leest. De sleutelbewaking van december hangt daaraan. Voorstel:
  het vinkje "Mail mij als een fles op dronk komt" achter een constante tot Resend staat, en de
  functies bij ontbrekende configuratie een regel in `ai_fouten` (kind `cron`) laten schrijven.
- **Kostenmail zonder paginering**: PostgREST knipt op 1000 rijen; boven 1000 AI-acties per twee
  weken rapporteert de mail te weinig zonder waarschuwing. Eén SQL-functie met `group by kind`.
- **CSP met `'unsafe-inline'`**: elke injectie draait gewoon. De app gebruikt geen inline
  handlers, dus `build.sh` kan per scriptblok een sha256 uitgeven en `'unsafe-inline'` laten
  vallen. Dan blokkeert de browser wat 9 nu al voorkomt. `frame-ancestors` kan niet via `<meta>`
  (GitHub Pages zet geen headers): de app is inframebaar; laag.
- **Twee tabbladen** (desktop, of Chrome + Android-PWA) overschrijven elkaars localStorage; bij
  rotatie van het refresh-token logt het andere tabblad stil uit. Een `storage`-listener die
  minstens `settings.cloud` en `rev`/`syncedRev` overneemt.
- **Eerste sync met een eigen kelder én een gevulde cloud**: het hoogste nummer wint zonder vraag
  (bewuste keuze). Voorstel: bij `syncedRev == null` en beide kanten niet leeg altijd `'botsing'`.
- **Push zonder compare-and-set**: twee apparaten die binnen dezelfde seconden pushen, de
  verliezer merkt niets. Een voorwaardelijke PATCH op `data->>rev`, of een trigger op `cellars`.
- **IndexedDB**: een gesloten verbinding (iPhone na lang op de achtergrond) laat `pSet` gooien
  midden in `scanAdd`; het formulier blijft staan en een tweede tik geeft een dubbele fles. En
  bij een mislukte IDB (privémodus) verdwijnen foto's stil en haalt elke sync alle foto's opnieuw
  op. `onclose`/`onversionchange`, transacties in try/catch, `mislukt++`, en één melding.
  `navigator.storage.persist()` wordt nergens gevraagd (Safari mag opslag na zeven dagen wissen).
- **Datums in UTC**: afboeken om 00:30 krijgt de datum van gisteren; op 1 januari telt het onder
  het vorige jaar. Eén helper voor de lokale datum.
- **Offline met verlopen token heet "Sessie verlopen"**; de gebruiker logt onnodig opnieuw in.
- **Scan**: een nieuwe foto tijdens een lopende leesbeurt laat antwoord 1 in formulier 2 landen
  (een `scan.seq`-teller lost het op); pairing deelt de globale `cellarIdx` tussen twee
  gelijktijdige aanvragen (verkeerde flessen in `pairCache`, dat synct mee).
- **`fotoOpnieuw`** leeft alleen in het geheugen: een vervangen foto die vóór de push verloren
  gaat bereikt de cloud nooit meer.
- **Prestaties bij een grote kelder**: elke toets in de zoekbalk rendert alle kaarten en decodeert
  alle foto's; in de Engelse stand loopt elke tekstknoop door ± 100 regexen; `save()` per
  input-event serialiseert de hele stand (smaakschuifjes, naam, sleutel). Debounce, lazy foto's,
  en `dishCache` uit de reservekopieën halen.
- **Geen versie op het cloud-document en het API-contract**; de brug (oude code) kan nieuwe
  velden uit de cloud laten vallen. `v` in `cloudDoc`, en `adoptDoc` dat bij een hogere versie
  wel adopteert maar niet meer pusht.
- **Waarde-semantiek**: sorteren op "Waarde" telt de AI-indicatie mee (tegen `bronWaarde` in);
  `waardeVan` en `prijsOnzeker` zijn dood. Kleine opruimronde.
- **Build**: `index.html` bevat twee `<title>`s en viewports (head.html én de bron); onschadelijk.
  `brug.sh`: de sed op `sw.js` faalt stil als de regel ooit anders wordt gequote, en
  `BRUG = /\/caveau\/?$/` mist `/caveau/index.html` (geen verhuisbanner daar).
- **Blok 4 en 6 draaien in geen enkele test**; een verkeerd gespelde functienaam in een
  `ACT`-handler valt pas bij een gebruiker op. De headless-tests hier dekken nu een deel; een
  rooktest die `render()` per tab draait met de demoflessen zou in `tests/` passen.
- **Stripe API-versieverschil**: naar de code te oordelen geen breuk (alle gelezen velden bestaan
  in beide versies); log `event.api_version` bij de eerste echte betaling.

## Getest

- `./check.sh`: 6 blokken, geen typografische aanhalingstekens, index.html actueel, 26 tests
  (22 bestaand + 4 nieuw: rating null, prototype-sleutels, schoonDoc, valueAt).
- Edge Functions: syntax via esbuild (`deno check` is hier niet beschikbaar, dus de typen zijn
  onverified; draai `deno check supabase/functions/*/index.ts` op de Mac).
- Headless Chromium (`tests-headless/`): `sec.js` (vergiftigd document rendert zonder script,
  `weg:"constructor"`, noodscherm, vreemde bevestigingslink geeft geen sessie, eigen aanmelding wel
  met koppelvraag, "Nee, uitloggen"), `flow.js` (29 controles opruimen/achteraf), `oud.js`
  (sheet-geschiedenis, op main verlaat Verwijderen de app, hierna niet). Alles groen, geen
  console- of paginafouten.
- Niet getest: telefoon en aanraking, echte Supabase-sessie en sync tussen twee apparaten, de
  Stripe-webhook (geen testomgeving), de RLS-controle uit `rls-kelder-15sep.sql` (vereist twee
  accounts en hun tokens).

## Teksten voor DECISIONS.md

## 15 sep 2026 · Een sessie uit een link geldt alleen op het apparaat dat de aanmelding startte
Supabase zet na een bevestigingsmail de tokens in het adres. Dat is niet te onderscheiden van een link die iemand met zijn eigen tokens heeft gemaakt, en wie zo'n link opent zou stil in het account van de ander belanden en zijn kelder daarheen syncen. Daarom telt een bevestigingslink alleen als het adres uit de mail hetzelfde is als de aanmelding op dit apparaat; elders logt de gebruiker in met zijn wachtwoord. Een herstel-link houdt het token, maar een losse kelder gaat pas na een vraag met het e-mailadres in beeld naar een account. Afgewezen: de PKCE-flow van Supabase (schoner, maar vereist een codewissel op hetzelfde apparaat en dus dezelfde beperking, met meer werk).

## 15 sep 2026 · Alles wat als document binnenkomt gaat door één normalisatie
Cloud-document, back-up en reservekopie lopen door `schoonDoc`: vaste velden, vaste types, grenzen op aantallen en tekstlengtes, ook voor de caches en de tafel. De renderers vertrouwen daarop en tonen getallen als getallen. Afgewezen: normaliseren bij het renderen (dan blijft de rommel in de opslag en in de sync).

## 15 sep 2026 · De gedeelde prijstabel neemt geen prijs over die ver van de bestaande ligt
Een nieuw gevonden prijs vervangt de rij van een ander alleen binnen 0,4x tot 2,5x, of als die rij ouder is dan 90 dagen; eigen rijen mag je altijd verversen. De herkomstvelden gaan als afgebakende data in de zoekopdracht. Afgewezen: `refresh` helemaal weghalen (dan is een foute prijs voor iedereen definitief).
