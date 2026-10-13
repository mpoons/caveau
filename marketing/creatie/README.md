# Creatie CellarMentor

Alle advertenties, de film en de schermen op de landingspagina komen uit de echte app: dezelfde code als cellarmentor.com, met de voorbeeldkelder. Er staan geen wijnmerken van derden in: herkomstnamen vervangen de producentnamen, en de opslagplek "Vintec" heet hier "Klimaatkast". **Niets in deze map is gepubliceerd.**

## Wat er ligt

| Bestand | Wat |
|---|---|
| `studio2.html` | Sjabloon voor alle statische advertenties: `?c=concept&f=sq\|p45\|st\|ls&l=nl\|en&m=nl\|be\|uk`. Zes concepten: wanneer, specifiek, kelder, erbij, uiteten, nu. Het extra concept `merk` levert de deelafbeelding |
| `render2.mjs` | Rendert 6 concepten × 4 formaten × 3 markten (72 stuks) naar `out2/` |
| `og2.mjs` | Deelafbeeldingen `out2/og-nl.png` en `og-en.png`. Kopieer ze naar `og.png` en `og-en.png` in de cellarmentor-repo |
| `film2.html` + `render-film2.mjs` | De film "zo werkt het": 17 s, 30 fps, zonder geluid, in 9:16, 4:5 en 1:1, per markt |
| `opname.mjs` | Neemt alle schermen opnieuw op uit de app (`ui2/`, licht en donker) en de beeldreeks van de scan (`reeks-ruw/`) |
| `etiket/` | Het getekende, merkloze Saint-Julien-etiket dat de scanner als camerabeeld krijgt |
| `ui2/`, `reeks/` | Opgenomen schermen en de beeldreeks voor de film |

## Markten

- **nl-nl** krijgt NIX18.
- **nl-be** krijgt de verplichte band "Alcoholmisbruik schaadt de gezondheid". Die staat onderaan over de volle breedte, op een contrasterende achtergrond, in Open Sans, met boven en onder een marge van de teksthoogte. In 9:16 staat de tekst boven de 340 px die Stories en Reels afdekken.
- **en-uk** is voorlopig. De app toont bedragen altijd in euro's, ook op een Britse wijnkaart. Gebruik deze set pas als de app valuta aankan (plan, sectie 7b).

## Opnieuw bouwen

1. Start de app: `python3 -m http.server 8765` in de map met de cellarmentor-repo.
2. Start deze map: `python3 -m http.server 8766` hier.
3. Maak het camerabeeld (580 MB, staat niet in git): `node etiket/maak.mjs` in `etiket/`, dan:

   ```
   ffmpeg -loop 1 -i etiket/etiket.png -vf "crop=1220:686:'30+14*sin(t*1.1)+5*sin(t*3.7)':'17+9*sin(t*1.5)+3*sin(t*4.3)',scale=1280:720,format=yuv420p" -t 8 -r 30 etiket/etiket.y4m
   ```

   De lichte beweging is een hand die de telefoon vasthoudt.
4. Neem de schermen op met `node opname.mjs nl`, `node opname.mjs en`, `node opname.mjs nl dark` en `node opname.mjs en dark`. Zet `reeks-ruw/` om naar `reeks/<taal>/000.jpg` en verder, op 780×1688.
5. Render met `node render2.mjs`, `node og2.mjs` en `node render-film2.mjs st nl nl`. Voor de film doe je dat per formaat en per markt.

## Vóór livegang

- **Echte fles (plan 0e).** Vervang het getekende etiket door een echte fles die door de echte scanner gaat. Dat kan een fles van Max zijn of van een tester, met toestemming. Tot die tijd zegt het onderschrift van "wanneer" eerlijk "Getekend etiket, echte scanner".
- **NIX18-logo.** Vervang het getypte NIX18 door het officiële logo van STIVA.
- **Checklist.** Loop elk bestand langs de checklist in `../plan/` (sectie 0d).
