# Caveau — wijnkelder

Persoonlijke wijnkelder-app: etiketten scannen, voorraad en locaties bijhouden, drinkvensters volgen, spijs-wijnpairing twee kanten op, drink-historie met ratings, waarde-statistieken en een verlanglijst.

**App:** https://mpoons.github.io/caveau/ — open op je telefoon en kies "Zet op beginscherm".

## Hoe het werkt

- Alle gegevens (kelder, foto's, historie) staan **alleen op je eigen apparaat** (localStorage + IndexedDB). Back-up en overzetten via Instellingen → export/import. Iedereen die de link opent krijgt z'n eigen lege kelder.
- **AI-scannen:** plak je eigen Anthropic API-sleutel in Instellingen; Claude leest dan etiketfoto's uit (naam, druiven, drinkvenster, pairing). De sleutel blijft op het apparaat en gaat nooit mee in een back-up. Zonder sleutel werkt alles op ingebouwde sommelier-regels.
- Werkt offline dankzij een service worker (behalve de AI-functies).

## Bestanden

| Bestand | Rol |
|---|---|
| `caveau.html` | De bron (één bestand, hele app) — hieruit wordt alles gebouwd; ook de bron voor de Claude-artifactversie |
| `head.html` + `build.sh` | Wrapper en buildscript: `./build.sh` maakt `index.html` |
| `index.html` | De gehoste app (niet met de hand bewerken) |
| `sw.js` | Service worker — versienummer (`caveau-v1`) ophogen bij elke app-wijziging |

Gebouwd met Claude Code.
