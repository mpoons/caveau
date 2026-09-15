# Voorstel: wijnen zonder voorraad opruimen en achteraf vastleggen

Uitgewerkt tegen `mpoons/cellarmentor` op `main` (2517a65, 15 sep 2026). Niets is gedeployed; de
bron-repo is vanuit deze sessie alleen leesbaar. Deze map staat op een zijtak van de brug-repo en
raakt de gebouwde bestanden niet.

## Toepassen (in de cellarmentor-checkout)

```sh
git am patches/0001-*.patch patches/0002-*.patch   # of alleen 0002 als 0001 al ergens anders zit
./build.sh && ./check.sh
```

De patches raken alleen `cellarmentor.html`; `index.html` komt uit `./build.sh`. Versienummer in
`sw.js`, `DECISIONS.md` en `CLAUDE.md` zijn bewust niet aangeraakt om botsingen met lopend werk te
vermijden; een besluitentekst staat onderaan.

## Wat verandert er (patch 0002)

- **Kelderlijst:** boven de lijst staat "N wijnen zonder voorraad · Opruimen ›". De opruimsheet
  toont die wijnen op naam met per wijn **Gedronken** (afboeksheet in de achteraf-stand: datum,
  sterren, notitie; daarna verlaat de wijn de kelder) of de **prullenbak** (weg zonder regel).
  Onderaan "Verwijder alle N". De sheet ververst zichzelf na elke actie, in plaats van sluiten en
  heropenen. Tik op de naam opent het detail, voor wie een wijn op ×0 wil laten staan.
- **Achteraf-stand van de afboeksheet:** bij voorraad ×0, of via de toast hieronder. Titel
  "Achteraf vastleggen", voorraad blijft staan, alleen de historie krijgt een regel. Cadeau,
  verkocht en kapot blijven mogelijk (tellen dan niet als gedronken, zoals nu).
- **Min-knop bij Voorraad in het detail:** na de tik verschijnt "Fles eraf, voorraad ×N ·
  Gedronken?". Eén tik op Gedronken? en de fles staat alsnog in de historie zonder dat de voorraad
  nog een keer omlaag gaat. Niets doen = correctie, zoals nu.
- **Detail bij ×0:** de grijze knop "Drink een fles" heet nu "Achteraf vastleggen" en werkt. De
  kaart in de lijst toont de drinkknop gedimd in plaats van verborgen.
- **Ongedaan** op de toast zet de historie-regel en (vanuit Opruimen) de wijn terug. De foto gaat
  pas 6 s later weg als de wijn dan echt weg is; een losse foto gaat nooit naar de cloud, want
  `pushPhotos` kijkt alleen naar `S.wines`.
- Verwijderen zit nu in `wijnWeg(w)`, gedeeld door detail en opruimsheet. Engelse vertalingen erbij.
- Geen wijziging aan opslagformaat, historie-velden, sync of de servercode.

## Gevonden bug, los te nemen (patch 0001)

`closeSheet` berekende het aantal terugstappen in de browsergeschiedenis uit `history.state`, maar
`history.go` is asynchroon. Sluit een bevestigingssheet zichzelf en doet de actie daarna
`closeSheet(true)` (zoals **Verwijderen** in het detail, al op `main`), dan telt de eerste
terugstap nog eens mee. Nagespeeld in headless Chromium (`tests-headless/oud.js`): wie de app via
een link opent, staat na Verwijderen op de vorige pagina; als app op het beginscherm komt de
terugstap nooit aan en slikt de terugknop daarna één keer. Patch 0001 telt wat nog onderweg is
mee. De opruimflow raakt dit vaker, dus 0002 gaat ervan uit dat 0001 erin zit.

## Getest

`./check.sh`: alles goed, 22 tests. De schermflows zijn nagespeeld in headless Chromium
(`tests-headless/flow.js`, 29 controles, geen console- of paginafouten): opruimen → gedronken →
ongedaan, prullenbak met bevestiging, min-knop → toast → achteraf, cadeau bij ×0, gewone
afboeking, "gedronken dit jaar" telt de achteraf-regels zonder reden mee, en de terugknop sluit
het detail zonder de app te verlaten. Draaien:

```sh
npm i playwright-core@1.55.0            # in een losse map; Chromium via executablePath
python3 -m http.server 8765 --bind 127.0.0.1   # in de cellarmentor-checkout (na ./build.sh)
python3 -m http.server 8766 --bind 127.0.0.1   # in de caveau-checkout, als "vorige pagina" en oude build
node flow.js; node oud.js
```

Niet getest: telefoon, aanraken, sync met een echt account, donkere stand op een scherm.

## Nog te overwegen

- Het detail toont in "Plek in je kelder" na de min-knop nog het oude aantal ("je hebt er 3");
  bestaand gedrag, de sheet wordt pas na sluiten ververst.
- Wie een wijn op ×0 bewust bewaart (om terug te kopen) ziet de opruimregel elke keer. Als dat
  stoort: een vinkje "bewaren" op de wijn, of de verlanglijst als plek daarvoor.
- De intro-tekst in de opruimsheet is aan de lange kant; korter kan.

## Besluitentekst (voor DECISIONS.md, als je hem overneemt)

## 15 sep 2026 · Wijnen op ×0 blijven staan, maar zijn met één sheet op te ruimen
Een wijn zonder voorraad blijft in de kelder (voor wie hem terugkoopt: venster, pairing, foto), maar
de lijst meldt hoeveel er op ×0 staan en een opruimsheet biedt per wijn Gedronken (alsnog in de
historie, dan uit de kelder) of verwijderen. De afboeksheet heeft een achteraf-stand die de voorraad
niet raakt; de min-knop biedt die meteen aan. Afgewezen: ×0 automatisch verbergen (dan verdwijnt
informatie zonder dat je het ziet) en de laatste fles automatisch verwijderen (de historie-regel
mist de foto en de pairing).
