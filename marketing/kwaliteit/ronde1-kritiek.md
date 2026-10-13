# CellarMentor launch creative: critique

Reviewer stance: a creative director at a consumer-app growth team. I judged only what is visible in the files. The bar is the 12-criterion rubric in `research/02-reference-apps-quality-bar.md`: ship at an average of 4.0 or higher, no criterion below 3, and gates 1, 3 and 10 at 4 or higher.

**What I looked at**
- All 24 nl-nl statics (6 concepts × sq/p45/st/ls).
- All en-uk squares, plus en-uk wanneer at full size.
- All nl-be p45s, plus nl-be wanneer-sq, vanavond-st and erbij-ls.
- Frames from `film-nl-nl-st.mp4` and `film-en-uk-sq.mp4` every 1.5 s, plus extra frames at 0.0, 4.0, 5.0, 6.5 and 9.0 s.
- `/start/` and `/en/` at 390×844 and at 1440×900, each in light and dark, scrolled screen by screen.
- `og.png`.

**Short verdict:** the product UI is better than the marketing around it. The craft in the PWA (typography, the Horizon chart, "Waar komt dit venster vandaan?") would hold its own next to Flighty. The ads frame that UI in a single repeated template and never show the one moment the brand is built on: a label going in and a drink window coming out. Nothing ships yet. Every touchpoint fails gate 10, and the ads and film also fail gate 3 and/or gate 1.

---

## (a) Score table

Scale is 1 to 5; n/a means the criterion does not apply to that format. Gates are criteria 1, 3 and 10, which must each score 4 or higher.

Criteria: 1 Clarity (gate) · 2 Owned attribute · 3 Real product (gate) · 4 Magic moment · 5 Motion · 6 Sound-off/legibility · 7 Set narrative · 8 Type and whitespace · 9 System consistency · 10 Proof (gate) · 11 CTA · 12 Voice

| Touchpoint | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | **Avg** | Gates 1/3/10 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ad: wanneer ("Scan het etiket. Weet wanneer je 'm opent.") | 4 | 5 | 3 | 2 | n/a | 4 | 3 | 4 | 4 | 3 | 3 | 3 | **3.45** | pass / FAIL / FAIL |
| Ad: specifiek ("Op dronk sinds 2025. En nog tot 2060.") | 3 | 5 | 4 | 3 | n/a | 4 | 2 | 4 | 4 | 2 | 3 | 4 | **3.45** | FAIL / pass / FAIL |
| Ad: kelder ("Je hele kelder in één middag.") | 4 | 2 | 4 | 2 | n/a | 4 | 3 | 4 | 4 | 3 | 3 | 4 | **3.36** | pass / pass / FAIL |
| Ad: erbij ("Lamsrack vanavond? Dit is je fles.") | 4 | 3 | 3 | 3 | n/a | 4 | 3 | 3 | 4 | 3 | 3 | 4 | **3.36** | pass / FAIL / FAIL |
| Ad: uiteten ("Uit eten? De wijnkaart leest mee.") | 3 | 3 | 3 | 3 | n/a | 4 | 3 | 4 | 4 | 3 | 3 | 3 | **3.27** | FAIL / FAIL / FAIL |
| Ad: vanavond ("Welke fles open je vanavond?") | 3 | 4 | 3 | 2 | n/a | 4 | 3 | 4 | 4 | 2 | 3 | 3 | **3.18** | FAIL / FAIL / FAIL |
| Film (nl-nl-st; en-uk-sq scores 1 lower on 3 and 9 because of Dutch UI) | 3 | 4 | 3 | 2 | 3 | 3 | 3 | 3 | 4 | 3 | 4 | 4 | **3.25** | FAIL / FAIL / FAIL |
| Landing NL `/start/` | 4 | 4 | 4 | 4 | n/a | n/a | 4 | 4 | 4 | 2 | 4 | 4 | **3.80** | pass / pass / FAIL |
| Landing EN `/en/` | 4 | 4 | 3 | 4 | n/a | n/a | 4 | 4 | 3 | 2 | 4 | 4 | **3.60** | pass / FAIL / FAIL |
| OG `og.png` | 4 | 5 | 4 | 4 | n/a | n/a | n/a | 4 | 5 | 3 | 3 | 4 | **4.00** | pass / pass / FAIL |

**Averages**
- The six ad concepts average **3.35**. The best are wanneer and specifiek at 3.45; the worst is vanavond at 3.18.
- The film scores **3.25**.
- Landing NL scores **3.80** and landing EN **3.60**.
- The OG image scores **4.00**.
- Across all ten touchpoints the mean is **3.49**.
- **No touchpoint passes all three gates.**

**Notes behind the scores**
- **Gate 10 fails everywhere for the same reason:** there is no proof at all. Nothing is fabricated, which is good. But there is no named voice, no beta count and no press. The landing page also has truth problems (see section d).
- **Gate 3** fails on the ads for these reasons:
  - The "Scan het etiket" promise is never shown: there is no label and no scan.
  - Screens are clipped mid-flow:
    - erbij: the header "Wat eet je, of waar heb je zin in?" is cut by the bezel.
    - uiteten: the screen opens on "LEES DE KAART EN KIES / BEGIN OPNIEUW" buttons jammed into the notch.
  - The demo stats contradict each other.
  - The UK assets show Dutch UI.
- **Format-level defects lower every concept's score:**
  - All 12 nl-nl/nl-be p45 and st files have **no CTA and no URL**.
  - In all ls files **NIX18 sits on top of the phone screen**.
  - The same Saint-Julien detail sheet is used in wanneer, specifiek and OG, and again in the film.

---

## (b) Top 10 fixes, ranked by impact

**1. Show label in → window out, in the first 2 seconds of the film and in the wanneer statics.**

What is wrong now:
- `film-nl-nl-st.mp4` opens on 0.8 s of empty ivory with only the wordmark and NIX18. That empty frame is also the thumbnail.
- From 0.8 to 3.5 s it shows a static cellar list under "Welke fles open je vanavond?".
- At 3.5 s the "scan" is just the camera *button* screen ("Richt je camera op de fles"). It fades to white and jumps to the result sheet.
- No label is ever seen.

New timeline for the film:
- **0.0–0.6 s:** real camera viewfinder over a photographed, unbranded Saint-Julien label, with caption "Scan het etiket."
- **0.6 s:** shutter.
- **0.6–1.8 s:** the result sheet slides up (use the app's own sheet easing).
- **1.8–3.5 s:** caption "Op dronk tot 2060." with the window bar highlighted.
- **End card:** cut it from 5.5 s (14.5–20 s) to 2.5 s, and use the 3 s you save for the scan.
- **Grey dip at about 9.0 s:** remove it. It is the muddy grey wash between the pairing screen and the dark wine-list screen. Dissolve straight from ivory to the dark screen, or cut.

Changes to the stills:
- Applies to `*-wanneer-*.png` and `og.png`.
- Add a cropped photo of the label in the scan frame (about 280×360 at sq), overlapping the top-left of the phone, with a thin bordeaux arrow into the window bar.

**2. Give every p45 and st a CTA, and stop NIX18 colliding with the UI.**

- **p45:** add the footer at y≈1230.
- **st:** add the footer at y≈1450. Keep it above the bottom 20% safe zone (y>1536). The phone can bleed under it.
- **Footer text:** change "GRATIS PROBEREN | CELLARMENTOR.COM" to the landing-page verb, "SCAN JE EERSTE FLES · cellarmentor.com". Right now ads and site use different CTAs, which breaks rubric criterion 11.
- **ls (all `*-ls.png`):** move NIX18 off the phone into the left column, next to the footer at x≈560, y≈545.
- **Phone shadow:** remove the lighter backing rectangle behind the badge in p45/st. It clips the phone's drop shadow.
- **nl-be:** the white "Alcoholmisbruik schaadt de gezondheid" bar in Open Sans cuts through the phone in the st files and over the gold frame in sq. Make it a full-width band in ivory #F4EFE7 with a 1px gold top rule, set in EB Garamond small caps at the same size. It stays legally present without looking pasted on.

**3. Localise the UK set properly.**

Every en-uk static and `film-en-uk-*` shows Dutch UI strings, including:
- "Op dronk · venster 2025–2060"
- "Saint-Julien · Bordeaux · Frankrijk"
- "Mijn kelder"
- "Vintec, zone onder"
- "Klassiek en gestructureerd, geduld wordt beloond."
- "een ruim bordeauxglas"
- "DRAAGT HET HELE MENU"
- "ZEEBAARS"
- "3 gangen · tot €70"

Prices are in € (€130, €1,473, €68).

The fix:
- Re-capture with the app in English, and either convert to £ or hide prices.
- `/en/` Fig. 1 to 5 have the same problem ("Decanter raadt…", "tempranillo en garnacha uit Rioja", "Mijn kelder"). Re-capture those too.

**4. Fix the demo-cellar contradictions that appear on screen.**

| Where | Problem | Fix |
|---|---|---|
| `*-vanavond-*`, landing Fig. 2, film 12–14.5 s | Horizon says "Nu: 10" but the tile says "Nu op dronk 21" out of 21 bottles | Make the tile 10 |
| wanneer, specifiek, OG, landing Fig. 1 | Window "2025–2060", but the axis ends at "2059" | End the axis at 2060 |
| `*-erbij-*` | Both suggestions score "10/10", which looks rigged | Use 9.5 and 8.5 |
| kelder list vs detail sheet | List says "Mogelijk topfles", detail says "Waarschijnlijk een topfles" | Use one wording |
| uiteten | Savennières 2019 "zes jaar fles" in 2026 | Change to "zeven jaar" |
| uiteten | "2027–2028" and "2046" rows both read "niets, tijd voor een topfles om weg te leggen" | Write two different lines |

**5. Make the landing-page microcopy true (`start/index.html`, `en/index.html`).**

The contradiction:
- Under the CTA the page says "Gratis. … zonder app store en zonder account."
- The pricing card and FAQ say scans need an account: "Met een gratis account: 20 scans per maand".

Under the primary "Scan je eerste fles" CTA, that is misleading. Two ways to fix it:
- Change the line to "Gratis. Je kelder en drinkvensters zonder account, 20 scans per maand met een gratis account."
- Or let the first scan work without an account.

Also:
- The FAQ says "de fles bij je eten [is] gratis", but the next sentence says "pairing 1 credit". Pick one.
- "Wijnkaarten lezen in elk restaurant" overclaims. Change it to "Wijnkaarten lezen, zo'n 35 per maand".

**6. Remove the drinking-urgency framing.**

These lines read as "drink tonight" in a cold feed:
- "Welke fles open je vanavond?" It is the vanavond ad headline (all markets, including "Which bottle will you open tonight?"), the film's opening line, and the landing-page closer.
- "Lamsrack vanavond? Dit is je fles."

Replacements:

| Current | New |
|---|---|
| Welke fles open je vanavond? | Welke fles is nu op z'n best? (owns *timing*, no urgency) |
| Lamsrack vanavond? Dit is je fles. | Lamsrack? Dit is je fles. |
| Which bottle will you open tonight? | Which bottle is at its best now? |

Two more changes:
- In the kelder ad, choose a list crop that does not show a "Drink binnenkort" bar as the second row.
- The "4 vragen aandacht" tile also nudges. Crop it or reword it.

**7. Take real producer names off the ads' landing destination.**

The ads were cleaned to "Saint-Julien Grand Cru Classé". The page they click through to shows:
- Château Léoville Barton (Fig. 1 caption: "Léoville Barton 2016, op dronk tot 2060")
- Domaine Vacheron Sancerre Les Romains
- La Rioja Alta Viña Ardanza
- Billecart-Salmon
- Olivier Leflaive
- Louis Michel Montée de Tonnerre
- Domaine du Closel Clos du Papillon
- Bachelet
- "Decanter raadt Château Léoville Barton aan…", which suggests a publication's endorsement

The fix:
- Use the same anonymised dataset as the ads on `/start/` and `/en/`, and swap the Fig. captions.
- Drop the Decanter line unless the claim is verified and licensed.

**8. Break the template.**

All six concepts use the same layout: wordmark, gold small-caps kicker, roman line, italic bordeaux second line, grey sans subhead, phone on the right at the same coordinates (x≈625, y≈118 in sq), and a gold hairline double frame. Put side by side, they look generated.

Keep the system (tokens, type, the frame) but vary the composition:
- **specifiek:** a type-only poster. "Op dronk sinds 2025. En nog tot 2060." at 140px, with the window bar enlarged to full width beneath it. No phone.
- **kelder:** a full-bleed crop of the list with no device frame, at 1.4× native.
- **erbij:** a real plate of lamb next to a real bottle in a real cellar, photographed, with the result card overlaid. This is the creator lane.
- **Duplication:** stop using the Saint-Julien sheet in wanneer, specifiek and OG. Give specifiek its own visual.
- **Landing hero:** drop the tilted second phone. It is a Dribbble trope. One straight phone is enough.

**9. Add one true proof point near every hero (gate 10).**

Proof belongs:
- directly under the CTA microcopy on the landing pages
- as a one-line footer above the URL in ads

Use only what exists:
- a named sommelier or journalist quote with name and city, or
- a dated beta count, for example "In gebruik bij [n] kelders sinds [maand] 2026".

Until there is one, every touchpoint fails gate 10. Right now "38 wijnstreken" is doing proof's job, and it is a product spec.

**10. Fix three lines of copy and one line break.**

| File | Current | New |
|---|---|---|
| `*-uiteten-*` | "De wijnkaart leest mee." (the wine list doesn't read; the app does) | "Uit eten? Wij lezen de kaart mee." |
| `*-wanneer-*` subhead | "Voor elke fles in je kelder, uit streek en jaargang." (stiff; "uit" is ambiguous) | "Berekend uit streek, jaargang en soort wijn." |
| `*-specifiek-*` subhead | "Dat weet CellarMentor van elke fles in je kelder." (overclaim) | "Zo staat het bij elke fles, met de bron erbij." |
| `/start/` H1 at 390px | Orphans "op" at the end of line 1 ("Open elke fles op / z'n best.") | Break before the italic, as desktop does: `Open elke fles<br><em>op z'n best.</em>` |

Also on `/start/`: the subhead is 27 words against the rubric's 20. Cut "en leest in het restaurant de wijnkaart met je mee".

Lower-priority fixes:
- **Film captions:** headline type is about 70px on a 1920-tall frame and sits in the top 25%, with a dead ivory band below. Increase it to 96px and make the phone 20% larger.
- **Film kicker:** the opening kicker "JE KELDER" does not match its line.
- **`/start/` end of page:** the sticky "Scan je eerste fles" bar stacks directly under the identical closing CTA. Hide the sticky bar when the final CTA is in view.
- **`og.png`:** in a square WhatsApp/iMessage crop (centre 630px), the headline loses "Open". Move the text block to x≥300, or ship a 1:1 variant.

---

## (c) What reads as template or AI-made, and why

1. **One headline formula everywhere.** Every headline across ads, film, landing and OG is "Roman statement. *Italic bordeaux payoff.*"
   - Variants include "Lamsrack vanavond? *Dit is je fles.*" and "Uit eten? *De wijnkaart leest mee.*"
   - Three or four uses of a pattern make it a system. Twenty-plus with no exception make it a generator.
2. **Identical layout.** All six concepts use the same grid and the same phone position and size. Only the words and the screenshot change, which is the "ten identical feature + phone frames" failure in criterion 7.
3. **Floating CSS phone with a soft drop shadow, inside a double gold hairline frame.** It reads like an off-the-shelf "app promo" template with a wine-menu skin.
4. **Tilted back phone on the landing hero.** It is the stock SaaS hero composition.
5. **Nothing physical.** There is no hand, no label, no bottle, no cellar and no glass. Every bottle is the app's vector icon. This is tell #4 in section 4 of the quality bar ("something is missing"). For a wine audience aged 60 and over it is the biggest trust gap.
6. **Template blocks on the landing page.** Below the fold it runs a three-column feature strip, a two-card pricing block and a seven-item FAQ accordion, which is the standard template sequence. The copy inside them is good (see e). The scaffolding is not.
7. **Grey system-sans subheads under every headline.** They are visually interchangeable with any 2025 SaaS ad.
8. **Reuse.** The same Saint-Julien screen appears in four places, so the set feels like it was made from one asset.

What does *not* read as AI: the in-app microcopy and the landing-page body copy (see e). I found no em dashes in ad or page copy, and no "niet X, maar Y" constructions.

---

## (d) Compliance and truthfulness

1. **Account claim (truth).**
   - The hero microcopy says "zonder account", next to a scan CTA.
   - The pricing card and FAQ say "Met een gratis account: 20 scans per maand".
   - Both are on `/start/` and `/en/`.
2. **Pairing: free or 1 credit?** The FAQ contradicts itself.
3. **Contradicting numbers inside the shown UI.**
   - "Nu op dronk 21" against Horizon "Nu 10".
   - Window to 2060 against an axis that ends at 2059.
   - Two 10/10 scores.
   - These appear in ads, the film and the landing page, so the product looks unreliable on its core promise.
4. **Overclaims.**
   - "Dat weet CellarMentor van elke fles in je kelder"
   - "Voor elke fles in je kelder"
   - "Wijnkaarten lezen in elk restaurant"
   - The site itself says there are 38 regions with vintage tables.
5. **Drinking urgency.**
   - "Welke fles open je vanavond?", which is the ad, film opener and landing closer in all three markets.
   - "Lamsrack vanavond? Dit is je fles."
   - UI cues "Drink binnenkort" and "4 vragen aandacht" in the ads.
6. **Real wine brands on the ads' landing page.** Léoville Barton, Vacheron, La Rioja Alta, Billecart-Salmon, Leflaive, Louis Michel, du Closel and Bachelet appear, plus a "Decanter raadt…" line that implies endorsement.
   - The ads themselves are clean.
7. **"AI" on screen.** The UI badge "SOMMELIER-AI" ("SOMMELIER AI" in EN) shows in every uiteten ad, the film and landing Fig. 4. It is small, but it puts "AI" in paid creative, which the quality bar rules out. Rename the in-app badge to "Sommelier", or crop it.
8. **NIX18 mark.**
   - It is present on every nl-nl static and the NL film.
   - It looks typeset rather than the official NIX18 artwork. Use the official asset.
   - Have someone check whether the STIVA code also requires "Geniet, maar drink met mate" on these ads. The landing footer carries it; the ads don't.
   - `og.png` shows a wine bottle with no NIX18. It is a share image, but it is promotional, so add the mark.
9. **Belgium.**
   - The band is present on all nl-be files checked.
   - Its placement across the phone in st looks like an afterthought (see fix 2).
   - The copy is unchanged from NL. "Lamsrack" and "op dronk" deserve a quick Flemish read.
10. **UK.**
    - Euro prices and Dutch UI in a UK ad is a truthfulness and quality problem, because it is not what a UK user will see if the app follows their language.
    - No age line. The CAP Code doesn't require one in copy, but make sure targeting is 18 and over, or 25 and over if a wine-led ad is aimed at a younger audience.
11. **CellarTracker and Vivino named in the kelder ads.** This is fine as nominative use if CSV import genuinely works for both. Do not add their logos.

---

## (e) What is strong and must be kept

- **The hero line "Open elke fles op z'n best." / "Open every bottle at its best."** It is 6 words, outcome-led, has no "AI" and owns timing. On desktop with the line break before the italic, it is the best thing in the set.
- **The in-app UI as a visual.** The Horizon chart, the window bar with "nu · 2026", "zelf ingevuld / gekocht voor € 95", "Waar komt dit venster vandaan?" and the Playfair/EB Garamond small-caps hierarchy are real craft. Show more of them, larger.
- **The uiteten dark ad.** Gold on aubergine, the "DRAAGT HET HELE MENU" tag, and wine-list prices that sit inside the stated budget. It is the most distinctive frame in the set, and the dark/gold split matches the system rule.
- **Specific, human body copy on the landing page:**
  - "een opgezochte prijs komt met winkel en datum, een schatting heet ook zo"
  - "Het scherm gaat vanzelf op donker, zodat je tafel er geen last van heeft."
  - "tot 'Kast onder, B3'"
  - "CellarMentor verdient aan één ding: het abonnement van wie meer wil."

  This is the voice the rubric asks for. Keep it, and bring it into the ads.
- **"Op dronk sinds 2025. En nog tot 2060."** It is a strong, concrete, dry-witted line. Give it its own visual (fix 8).
- **CTA pattern on the landing page.** "Scan je eerste fles" plus "Bekijk een voorbeeldkelder", repeated at the end. Make the ads use the same verb.
- **The Fig. caption device** ("Fig. 3 · Lamsrack met rozemarijn, uit je eigen kelder"). It is ownable and consistent. Extend it to the ads.
- **Discipline.**
  - One accent per frame.
  - Dark mode parity on the site (the gold CTA in dark is right).
  - No horizontal scroll at 390px.
  - NIX18 and the BE band present throughout.
  - No em dashes.
  - No "AI" in any headline.
  - Nothing fabricated in social proof.
- **Pricing clarity.** €0 / €2,99 with the credit maths spelled out ("een etiketscan of pairing kost 1 credit, een pagina van een wijnkaart 2"). Once the account contradiction is fixed, it builds trust.
