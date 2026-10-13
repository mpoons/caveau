# Creatie CellarMentor

Alle advertenties en de film worden gebouwd uit echte schermen van de app (`ui/`, vastgelegd met de voorbeeldkelder, wijnmerken vervangen door herkomstnamen zodat er geen merken van derden in advertenties staan). Niets in deze map is gepubliceerd.

| Bestand | Wat |
|---|---|
| `studio.html` | Sjabloon voor alle statische advertenties: `?c=concept&f=formaat&l=taal&m=markt` |
| `render.mjs` | Rendert alle concepten × formaten (1:1, 4:5, 9:16, 1,91:1) × markten (nl-nl met NIX18, nl-be met de verplichte band, en-uk) naar `out/` |
| `film.html` + `render-film.mjs` | De film "zo werkt het", 20 s, 30 fps, zonder geluid, in 9:16, 4:5 en 1:1 en per markt |
| `og.mjs` | De deelafbeelding (1200×630) voor cellarmentor.com |
| `out/` | De gerenderde bestanden |

Opnieuw renderen: `npx http-server -p 8766 -s .` in deze map, dan `node render.mjs` en `node render-film.mjs st nl nl`.

Vóór livegang: het tekstmerk NIX18 vervangen door het officiële NIX18-logo (STIVA), en elk bestand langs de checklist in `../plan/` (sectie 3).
