# CellarMentor launch creative: critique, round 3

**Reviewer stance.** I reviewed this as an independent creative director from a consumer-app growth team (the Flighty, Linear and Arc launch bar), and I judged only what is in the files. The bar is the 12-criterion rubric in `onderzoek/02-reference-apps-quality-bar.md`, section 3.
- **Ship rule:** an average of 4.0 or higher, no criterion below 3, and gates 1 (clarity), 3 (real product) and 10 (truth/proof) each at 4 or higher.
- **How I scored gate 10:** one question only. Is anything shown untrue, unproven or misleading? A missing testimonial does not lower the score. The proof still to collect is listed separately in (e).

**What I looked at**
- **nl-nl statics:** all 24 at full resolution, with crops of the label, the subhead-to-phone gap, the uiteten phone edges and the footers.
- **en-uk statics:** all 24, in per-concept strips, plus `wanneer-p45` and `erbij-st` at full size.
- **nl-be statics:** `wanneer-st`, `kelder-sq`, `uiteten-st` and `nu-p45` at full size. I measured the warning band on 12 files.
- **OG images:** `og-nl.png` and `og-en.png`.
- **Films:** all nine had finished rendering and each is 17.0 s (checked with ffprobe).
  - `film-nl-nl-st`: frames every 0.5 s, plus finer frames at 0.25–2.75 s, 8.2–8.4 s, 11.3–11.5 s and 14.0–14.8 s, and full-resolution frames at 0.3, 1.2, 1.5, 2.2 and 6.5 s.
  - `film-en-uk-st`, `film-nl-be-st` and all three p45 cuts: sample frames.
  - `film-nl-nl-sq` and `film-en-uk-sq`: sample frames.
- **Landing pages:** `/start/` and `/en/` at 390×844 and 1440×900, each in light and dark, scrolled so lazy images load, with supabase.co blocked. I also logged failed requests and checked for horizontal scroll.
- **App behaviour behind two claims:** I read the source and ran the app at `localhost:8765/index.html` to call `estimateWindow()` and `ensureWindow()` on the demo wine. I also read `creatie/opname.mjs` to see how the scan result in the captures is produced.

**Short verdict.** The craft has improved again, and most of round 2's list is done:
- The film reaches the drink window at 1.5 s.
- The scanner shutter is visible.
- The NIX18 badge no longer sits on the phone in any static.
- The Belgian band is pinned to the bottom.
- The landing page has true dark-mode captures.
- The urgency strings are gone from ads and landing copy.
- Real producer names are gone.

**But the label rework opened a new truth hole.**
- The label lost "Grand Cru Classé", but the demo window stayed at **2025–2060**.
- The app's own rules give an unclassified Saint-Julien 2016 **2022–2047**. 2025–2060 is exactly what the rules give a Grand Cru Classé.
- That 2025–2060 number is the headline of `specifiek`. It is also in `wanneer`, `erbij`, the film, OG and landing Fig. 1. On `wanneer` it sits next to a caption saying the window "komt uit de jaargangtabel van de streek", which is false for that number.
- Collectors will also find an unclassified Saint-Julien that runs to 2060 hard to believe.

This one data error costs gate 10 on five touchpoints. It is also the cheapest fix in this report.

---

## (a) Score table

Scale 1–5; n/a means the criterion does not apply. Gates are criteria 1, 3 and 10.

Criteria: 1 Clarity (gate) · 2 Owned attribute · 3 Real product (gate) · 4 Magic moment · 5 Motion · 6 Sound-off / legibility · 7 Set narrative · 8 Type & whitespace · 9 System · 10 Truth / proof (gate) · 11 CTA · 12 Voice

| Touchpoint | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | **Avg** | Gates 1 / 3 / 10 | Ship? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Ad wanneer ("Scan het etiket. *Weet wanneer je 'm opent.*") | 5 | 5 | 3 | 4 | n/a | 4 | 4 | 4 | 4 | 3 | 5 | 4 | **4.09** | pass / FAIL / FAIL | no |
| Ad specifiek ("Op dronk sinds 2025. *En nog tot 2060.*") | 4 | 5 | 4 | 3 | n/a | 5 | 4 | 5 | 5 | 3 | 5 | 5 | **4.36** | pass / pass / FAIL | no (one data fix away) |
| Ad kelder ("*Je hele kelder erin.*") | 4 | 3 | 4 | 2 | n/a | 4 | 3 | 3 | 4 | 4 | 5 | 4 | **3.64** | pass / pass / pass | no (criterion 4 below 3) |
| Ad erbij ("Zeg wat je eet." + search field "eendenborst") | 4 | 3 | 4 | 3 | n/a | 5 | 4 | 4 | 4 | 3 | 5 | 4 | **3.91** | pass / pass / FAIL | no |
| Ad uiteten ("Uit eten? *CellarMentor leest de kaart mee.*") | 4 | 3 | 4 | 3 | n/a | 4 | 4 | 3 | 5 | 4 | 5 | 4 | **3.91** | pass / pass / pass | no (average below 4) |
| Ad nu ("Welke fles is nu op z'n best?") | 4 | 5 | 4 | 3 | n/a | 4 | 4 | 4 | 5 | 4 | 5 | 4 | **4.18** | pass / pass / pass | **yes** |
| Film (nl-nl-st scored; p45, sq, BE and UK noted) | 4 | 4 | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 3 | 5 | 4 | **3.83** | pass / FAIL / FAIL | no |
| Landing NL `/start/` | 5 | 4 | 4 | 4 | n/a | n/a | 4 | 4 | 4 | 3 | 5 | 4 | **4.10** | pass / pass / FAIL | no (one data fix away) |
| Landing EN `/en/` | 5 | 4 | 4 | 4 | n/a | n/a | 4 | 4 | 4 | 3 | 5 | 3 | **4.00** | pass / pass / FAIL | no |
| OG (`og-nl`, `og-en`) | 5 | 5 | 3 | 4 | n/a | n/a | n/a | 4 | 5 | 4 | 4 | 4 | **4.22** | pass / FAIL / pass | no |

**Averages**

| Group | Round 1 | Round 2 | Round 3 |
|---|---|---|---|
| Six ad concepts | 3.35 | 3.98 | **4.02** |
| Film | 3.25 | 3.58 | **3.83** |
| Landing NL | 3.80 | 4.10 | **4.10** |
| Landing EN | 3.60 | 4.00 | **4.00** |
| OG | 4.00 | 4.11 | **4.22** |
| **All ten touchpoints** | **3.49** | **3.97** | **4.02** |

**What ships now:** only **nu**.
- **specifiek** (4.36) and **Landing NL** (4.10) fail only gate 10, and only because of the 2025–2060 window. Fix 1 in (c) clears both.
- After fix 1, **Landing EN** also clears gate 10, but its average then sits exactly on 4.0. It ships, with no margin.
- **wanneer**, **the film** and **OG** stay blocked on gate 3 by the drawn label until the owner supplies real bottle footage.
- **kelder** fails on criterion 4.
- **erbij** and **uiteten** need roughly 0.1 more on their averages.

**What drives the scores**
- **Craft scores rose** in eight places:
  - film motion and timing
  - the BE band
  - NIX18 placement in the statics
  - dark-mode plates
  - headline variety on nu and erbij
  - copy truth on kelder
  - UK UI strings
  - the OG text block
- **Gate 10 fell** on wanneer, specifiek, the film and both landing pages. In every case the cause is the same: the window shown does not match the label shown (details in (e) 1). Without that error, the overall average would be about **4.10**.

---

## (b) Status of the round-2 fixes (section (c) of `ronde2-kritiek.md`)

| # | Round-2 fix | Status | Evidence |
|---|---|---|---|
| 1 | Replace the illustrated label with a photographed bottle | **Partly** (owner item) | See note 1 |
| 2 | Re-cut the 9:16 film: scan visible, window by 3.0 s | **Mostly done** | See note 2 |
| 3 | Clean up format collisions | **Mostly done**, with new ones | See note 3 |
| 4 | Remove drinking urgency from paid and landing creative | **Mostly done** | See note 4 |
| 5 | Make the UK set British | **Partly** | See note 5 |
| 6 | Fix the last demo contradiction and the rigged score | **Partly** | See note 6 |
| 7 | Fix the misleading caption and the unproven claims | **Done as asked**, but a new problem appeared | See note 7 |
| 8 | BE band: house styling and placement | **Mostly done** | See note 8 |
| 9 | Break the headline formula on two more concepts; one Fig. numbering | **Done in statics**; film and landing lag | See note 9 |
| 10 | Landing polish | **Mostly done** | See note 10 |

**Notes on each fix**

1. **Photographed bottle (partly; owner item).**
   - Done:
     - "Grand Cru Classé" is gone.
     - The label now has paper grain, edge vignetting, a handheld wobble in the viewfinder and a cellar-rack background in the captured photo.
     - wanneer p45 and st carry "Getekend etiket, echte scanner."
   - Still not a photographed bottle. My judgement of the rework is in (d) 1.
   - The disclosure is missing on wanneer-sq, wanneer-ls, both OG images and every film cut. The template only renders it for non-sq formats (`studio2.html:113`), and ls shows no caption either.
2. **Film re-cut (mostly done).**
   - Done:
     - In st the phone is fully in frame, and the shutter, "galerij" and close controls are visible from 0.0 s.
     - The shutter fires at about 1.0 s.
     - The detail sheet with "Op dronk · venster 2025–2060" is up at **1.5 s**, and the caption "Weet wanneer je 'm opent." lands at 2.0 s.
     - The window bar gets a gold highlight at about 2.75 s.
     - The confirm form now shows for only about 0.3 s (1.0–1.4 s), and its placeholder reads "domaine / château" (Talbot is gone).
     - Light-to-dark is now fade to ivory, then a cut to dark (8.25 → 8.30 s), with no grey wash.
     - The end card fades out Horizon first (14.0–14.3 s), then fades in.
   - Not done: captions are about 80 px, not 96. In p45 and sq the phone is only about 25–35% of frame width, so the window bar is unreadable at feed size.
3. **Format collisions (mostly done; new collisions found).**
   - Fixed:
     - NIX18 in the statics (wanneer-sq and ls, both OG images).
     - nu-st and nu-p45 footer and last-row clipping.
     - The stray dot in nl-be-nu-p45.
     - kelder-sq Sancerre slicing (the row is gone).
     - The cap in nl-be-kelder.
     - The "BEGIN OPNIEUW" bar in all uiteten ads.
     - The black slab in uiteten-sq (it now fades).
     - The wanneer-st orphan.
   - Unchanged: the st files still keep roughly 250 px top and 340 px bottom free. These are platform safe zones, so I no longer score them down, but nothing bleeds into them.
   - New collisions are listed under fix 3 in (c).
4. **Drinking urgency (mostly done).**
   - Done:
     - The landing kicker is now "Nu" / "Right now".
     - The UI string is now "Zet op tafel, herinner me om af te strepen".
     - The Sancerre "vanavond is een mooi excuus" line is gone from every plate.
     - The Talbot placeholder is gone.
     - "Drink binnenkort" is out of the kelder ads.
     - "IK WIL IETS DRINKEN" became "WELKE FLES KIES IK?".
   - Remaining: **"Drink binnenkort · venster 2023–2027"** (Sancerre) is on screen in the film's erbij scene (5.5–8.2 s), in landing Fig. 4 and in Fig. 6. It is a product state, not "tonight", so it is soft. It is still the one urgency word left in paid creative.
5. **UK (partly).**
   - Done:
     - The backdrop reads "21 bottles".
     - nu hides € amounts.
     - "Order this", "Add to cellar", "Put away", "red with the right weight for duck", "classic grapes with duck" and "subscriptions from people who want more".
     - The closer reads "Scan your first bottle and see its window".
     - The pricing honestly says "billed in euros".
   - Remaining:
     - uiteten still shows €68, €59, €14 and "up to €70".
     - "I choose this one" became **"Picked"**, a past-tense label on an unpressed button.
     - New translationese is listed under fix 7 in (c).
     - The set is still provisional by plan.
6. **Demo contradiction and score (partly).**
   - Done:
     - The header is "21 flessen · €1.473" everywhere.
     - Rioja scores 8/10 in both NL and EN.
     - "Waarschijnlijk een topfles" is used everywhere in NL.
     - The reason line is fixed: "cabernet sauvignon en merlot uit Bordeaux: klassieke druiven bij eend."
   - Not done: the lone **10/10** is still the top card in every erbij file, the film and landing Fig. 4.
7. **Caption and claims (done as asked).**
   - Done:
     - The caption is honest about the label.
     - "in één middag" is gone (`grep` finds nothing).
     - "Er gaat niets naar een server" became "zonder account staat je hele kelder alleen op je eigen telefoon".
   - New problem: the second half of the caption, "Het venster komt uit de jaargangtabel van de streek", is false for the 2025–2060 shown. See (e) 1.
8. **BE band (mostly done).**
   - Done:
     - The band is pinned to the canvas bottom on every format.
     - It is full width, Open Sans, dark with a gold hairline, and inverted to light on the dark uiteten statics.
     - Measured on sq and p45: ink height 34 px with 42 / 36 px padding, so it meets ≥32 px and padding ≈ text height.
     - ls: 24 px ink in a 79 px band, which is fine scaled to 628 px.
     - st: the text sits 42 px into a 418 px band and leaves a 340 px empty slab under it, so the text clears the reply bar.
     - Nothing above the band is clipped any more.
   - Not done:
     - The official NIX18 artwork (owner).
     - In the BE film's dark uiteten scene the band is the same near-black as the scene, separated only by a hairline. It is not a contrasting band there.
9. **Headline formula and Fig. numbering (done in statics).**
   - Done:
     - nu is roman only.
     - erbij is "Zeg wat je eet." in roman, with the real search field ("eendenborst") as the input.
     - Fig. numbers now agree between ads and landing (1 label/detail, 3 Horizon, 4 erbij, 5 uit eten, 6 kelder).
   - Lagging: the film still uses the old "Zeg wat je eet. *Dit is je fles.*", and the landing uses "Zeg wat je eet. *De fles staat bovenaan.*". The same concept now has three headlines.
10. **Landing polish (mostly done).**
    - Done:
      - Every Fig. plate has a `-dark` capture served under dark mode (verified for all six).
      - The closer is "Scan je eerste fles en je ziet het venster."
      - At 390 px the closer breaks as "nu op / z'n best?", which is acceptable.
    - Not done:
      - OG is still not safe in a square crop: a centre 628² crop cuts "Open elke fles".
      - Landing Fig. 5 still has the clipped gold "LEES DE KAART EN KIES" bar and "BEGIN OPNIEUW", which the ads lost in round 2.
      - Fig. 4 opens on a paragraph clipped mid-line ("…vaag mag: 'iets met kip'…").

---

## (c) Remaining fixes, ranked by impact

### Designer / developer: can be done now

1. **Make the demo window match the label (clears gate 10 on specifiek, wanneer, erbij, the film and both landing pages).**
   - **File:** `marketing/creatie/opname.mjs:67`. The mocked label reading passes `drink_from: 2025, drink_to: 2060`.
   - **What is wrong:**
     - `ensureWindow()` keeps that window with `drink_src: 'ai'`.
     - The app's rules (`estimateWindow`, run in the app) give "Saint-Julien" 2016 without a classification **2022–2047**.
     - 2025–2060 is what the rules give "Saint-Julien Grand Cru Classé".
   - **The fix:** drop `drink_from` and `drink_to` from the mock, or set them to 2022 and 2047. The window then comes from the rules (`drink_src: 'regels'`), and the caption "komt uit de jaargangtabel van de streek" becomes true.
   - **Then re-render:**
     - `ui2/*` captures, `render2.mjs`, `og2.mjs` and `render-film2.mjs`
     - the landing plates (`/img/start/v2-*-detail*`, `*-pairing*`, `*-horizon*`)
     - the Horizon buckets, because the Saint-Julien row moves
     - the specifiek headline in `studio2.html`: "Op dronk sinds 2022. *En nog tot 2047.*" The joke still works.
   - **Also check** that "Waar komt dit venster vandaan?" then says "kelderregels / jaargangtabel" on the detail plate.
2. **Fix the new collisions.**
   - **en-uk-erbij-st:** the card covers the subhead ("The bottles from your own cellar that suit it, best first, each…" is cut at "each"). The EN subhead runs to two lines in st while the card position is fixed. Push the card below the measured subhead bottom plus 48 px (`studio2.html`, erbij layout), or shorten the EN subhead.
   - **film-nl-nl-sq (and the other sq cuts):** NIX18 sits on the phone's top-right corner in every app scene (0.3, 2.2 and 9.5 s). Give it its own corner with ≥24 px clearance, or move the phone down and left (`film2.html`, sq layout).
   - **wanneer-st (NL and EN):** the subhead descenders sit **8 px** above the phone bezel. Allow ≥40 px, or drop the phone by 40 px.
   - **uiteten-st and uiteten-p45:** the phone fades into the footer, and the Savennières row ends 25–30 px above "SCAN JE EERSTE FLES". End the crop after the Chablis card in st. In p45, stop the capture 60 px higher.
   - **uiteten-sq and ls:** the floating Scan button covers "…bij de morilles toch rood…" (also on landing Fig. 5 and Fig. 4, "Zit in het laatste de[el]…"). Crop above the tab bar, or capture with the list scrolled so no text sits under the button.
   - **uiteten phone frame:** the bezel stops at the top, so the screen meets the frame edge in a "tombstone" shape. Either show the full top bezel or crop the frame square at the top.
3. **Disclose the drawn label wherever it appears, or stop showing it where it is not needed.**
   - The caption is missing on wanneer-sq, wanneer-ls, `og-nl`, `og-en` and all nine films (`studio2.html:113` skips sq; ls has no caption).
   - **Film:** add a small Fig.-style line under the phone for 0.0–1.5 s: "Getekend etiket, echte scanner." / "Drawn label, real scanner."
   - **OG:** the label tile adds little at 1200×628. Replace it with the Horizon plate or the specifiek bar, which needs no disclosure and shows no fake bottle.
4. **Make the captured photo match the viewfinder.**
   - At 0.3–0.9 s the viewfinder shows a tilted close-up that fills the label frame.
   - At 1.2 s the confirm screen (and landing Fig. 2) shows a different picture: the whole bottle, straight-on, centred in a rack.
   - A viewer who watches the shutter fire expects to see the frame they just saw.
   - **The fix:** feed the shot from the end of the viewfinder sequence to `scan.photo` in `opname.mjs`. Then the "photo" is a crop of what was on screen.
5. **Give erbij a believable top score.**
   - The 10/10 is still a scripted-looking perfect score.
   - **Option 1:** show 9/10 (app scoring permitting).
   - **Option 2:** crop to show the top two cards (9 and 8) so the ranking is the point, not the perfect mark.
6. **Unify the erbij headline across film, statics and landing.**
   - Statics: "Zeg wat je eet."
   - Film (`film2.html`): "Zeg wat je eet. *Dit is je fles.*"
   - Landing: "Zeg wat je eet. *De fles staat bovenaan.*"
   - Pick the statics version, which is roman and lets the input field carry the story.
   - Do the same in EN, where the ads say "Say what you're eating." and the landing says "Say what you eat." The landing version is also unidiomatic.
7. **EN copy that still reads translated.** Visible in `/en/`, en-uk-wanneer-ls, `og-en` and the EN film.

   | Current | Suggested |
   |---|---|
   | "Can be opened. Ready until 2060, and you have 6." | "Ready now, and good until 2047. You have six." |
   | "Picked" (unpressed button) | "Pick this" |
   | "an estimate is called one" | "and an estimate says so" |
   | "THE OTHER WAY" (row label) | "IN REVERSE" or "FROM THE BOTTLE" |
   | "Your whole cellar in, bottle by bottle or all at once." | "Bring your whole cellar, bottle by bottle or all at once." (matches the ad) |
   | "Scan barcode / It is on the back. Shops list that number…" | Crop it out of OG and the EN detail plates; it is help text, not a selling point |

   - **€ in the UK uiteten ad:** hide the prices, or show them in £ once billing allows.
8. **Push the film's magic moment harder in p45 and sq.**
   - At 1.5–4.5 s, scale the detail sheet so the window bar spans at least 70% of frame width. A crop or zoom-in on the real capture at native pixel density is fine, and a slow dissolve-zoom is within the dissolve-only rule.
   - At present the bar is about 390 px wide in st and much less in p45 and sq. The one thing the brand owns is the smallest element on screen.
   - Raise the captions from about 80 to 96 px in st.
9. **kelder still has no magic moment (criterion 4 = 2).**
   - It is a tidy inventory, but four identical "Op dronk" rows with near-empty bars show no timing.
   - Show the list in the Horizon sort, or with the "OVER TIJD" filter so bars and years differ per row.
   - Or pair the headline with one row expanded to its window.
   - Fix the list sitting at 55% width with a dead right column in st and p45: scale it to the content column.
   - In sq the top rule is grey and the bottom one gold. Pick one.
10. **Landing leftovers.**
    - **Fig. 5:** re-capture uiteten from the "SOMMELIER · 3 gangen" row, as the ads do, so "LEES DE KAART EN KIES" and "BEGIN OPNIEUW" are gone.
    - **Fig. 4:** start the capture at the search field, not mid-paragraph.
    - **`en/index.html:27`:** preloads `/img/start/en-detail-light.webp`, which returns **404**. Point it at the real file (`v2-en-detail.webp` or similar).
    - **OG:** ship a 1:1 variant (`og-sq.png`), or move the text block so a centre square keeps "Open elke fles".
    - **BE film, dark uiteten scene:** invert the band to ivory as the statics do.
    - **FAQ ("Hoe weet CellarMentor…"):** add one honest clause, because scanned bottles keep the label-reading model's window unless the rules say it is 5+ years too short (`ensureWindow`). For example: "Bij een gescand etiket doet de sommelier een voorstel; de kelderregels rekken het op als het te kort is."

### Owner: needs real material or a decision

1. **One real bottle through the real scanner.** This is the only way to get gate 3 to 4 on wanneer, the film and OG. My judgement of the current label is in (d) 1.
   - Use a tester's bottle, with permission, or a real bottle whose label is out of focus enough that no producer is legible.
   - Shoot handheld in a real cellar, through the PWA's live scanner, as a screen recording plus a phone-in-hand B-roll.
   - Keep the drawn label only as a fallback, always with the disclosure.
2. **Proof near the hero.** None is needed for gate 10 to pass, but it is the largest gap against Flighty, Partiful and Arc. See the list in (e).
3. **The official NIX18 artwork,** and a STIVA check of whether paid social needs "Geniet, maar drink met mate" as well. Today it is only in the landing footer.
4. **UK currency decision:** £ billing, or keep "billed in euros" and remove € amounts from the UK ads.

---

## (d) AI and template tells still present

1. **The drawn label.** It is better, but a wine audience still reads it as drawn.
   - **What works now:** at feed size (sq thumbnail, the film at phone size) it passes as a photo of a plain négociant-style label. The paper grain, vignetting, slight perspective and handheld motion help, and losing "Grand Cru Classé" removes the most obvious impossibility.
   - **What still gives it away at full size or to a collector:**
     - It is set in the app's own faces: EB Garamond small caps and a Didone "2016" in the brand bordeaux, with brand-gold rules. The label is in CellarMentor's house style, which no producer's label would be.
     - There is no producer and no bottler: "Mis en bouteille à Saint-Julien" with no "par …". There is no "Produit de France", no "contient des sulfites", no pregnancy pictogram and no lot number. Collectors know a Saint-Julien label without an estate or négociant name is unusual.
     - The rack behind the captured bottle is a perfectly regular dot grid with even lighting, which reads as CG.
     - The captured photo does not match the viewfinder framing (fix 4 in (c)).
   - **Cost:** it holds gate 3 at **3** on wanneer, the film and OG. That is the only remaining gate-3 blocker on those three, worth roughly 0.1 on each average. With the disclosure on every format, the truth side is covered. The rubric's "real and photographed" is not.
2. **One wine everywhere.** The Saint-Julien 2016 is the scan, the detail, the specifiek poster, the erbij winner, the Horizon row, the kelder first row, OG and landing Fig. 1 and Fig. 2. It is still the strongest single-asset tell.
   - Use the Meursault 2020 or the Rioja in at least one hero frame (erbij is the natural place, because a Rioja "8/10, right weight for duck" is more believable than a 10/10).
3. **The headline formula is now limited to three places:** wanneer, uiteten and OG/hero ("roman line, *italic payoff*"). That is acceptable. Do not let it creep back into erbij through the film and landing versions.
4. **Floating card or phone with a soft drop shadow** on erbij and wanneer. It is the off-the-shelf promo-template look. erbij would be stronger as a bare, edge-to-edge crop with no card shadow.
5. **Landing scaffolding** is unchanged: zig-zag phone/text sections, a three-column fact strip, two pricing cards and an FAQ accordion. The copy inside is human; the skeleton is still the 2025 SaaS median.
6. **Identical vertical rhythm in every 9:16 still.** Every st file uses the same top band, headline, plate, footer and dead band. specifiek-st proves 9:16 can be designed for the format (type fills the height). The others are scaled templates.
7. **Nothing physical or human.** There is no hand, glass, plate, cellar or person anywhere in the set, which is tell 4 ("something is missing"). This is the owner item above.

**Clean on the project rules**
- **Em dashes:** none in `studio2.html`, `film2.html`, `start/index.html` or `en/index.html` (`grep` count 0).
- **"niet X, maar Y":** none in either landing page. The only "maar" is the mandated "Geniet, maar drink met mate".
- **"AI" in headlines or badges:** none.
- **Real producers in ads or on the landing page:** none.

---

## (e) Truth and compliance

1. **The window does not match the label. This is new and the most serious item.**
   - **The shown window comes from a scripted answer.** The mocked label reading in `opname.mjs:67` returns `drink_from: 2025, drink_to: 2060` (`drink_src: 'ai'`).
   - **The app's own rules disagree.** I ran `estimateWindow()` in the app:
     - "Saint-Julien" 2016 without a classification: **2022–2047**.
     - "Saint-Julien Grand Cru Classé" 2016: **2025–2060**.
   - So the number on screen belongs to the label the creative removed.
   - **Two claims are false as shown:**
     - The caption "Het venster komt uit de jaargangtabel van de streek" (wanneer p45/st).
     - The landing line "Elke fles krijgt een drinkvenster uit streek, jaargang en soort wijn", next to Fig. 1 "Saint-Julien 2016, op dronk tot 2060".
   - **Where it appears:** wanneer, specifiek (the headline itself), erbij, the film, OG, landing Fig. 1, 2 and 4, and indirectly the Horizon "2034–2045" bucket.
   - **It is also implausible on its face** to a collector: a generic Saint-Julien held to 2060, 44 years after the vintage.
   - Fix 1 in (c) solves all of this.
2. **The scripted scan and menu results are fine as demo content, but say so once.**
   - The label reading and the wine-list picks in the captures come from a mocked model call (`opname.mjs`). The UI, the pairing ranking, Horizon and the scanner are real.
   - That is normal for demo captures. Once fix 1 lands, nothing shown is beyond what the app produces.
   - Keep the "voorbeeldkelder" framing on the landing page so nobody reads the demo cellar as a real user's.
3. **The drawn label** is disclosed on 2 of the 4 wanneer formats, and not on OG or any film (fix 3).
4. **NIX18.**
   - It is present on every nl-nl static and the NL films, and no longer overlaps UI in the statics.
   - **It overlaps the phone in every scene of `film-nl-nl-sq`.**
   - It is still a typeset badge rather than the official artwork.
   - Whether STIVA wants "Geniet, maar drink met mate" on social ads is still unchecked.
5. **Belgium.**
   - The band meets the stated spec on sq, p45 and ls.
   - st is acceptable: full width, at the bottom, readable above the reply bar.
   - In the BE film's dark scene the band is not contrasting; it is near-black on near-black with a hairline.
6. **Drinking urgency.** "Vanavond" and "Tonight" are gone from ads and landing copy. "Drink binnenkort" is still visible in the film's erbij scene and landing Fig. 4 and Fig. 6. It is low risk, but it is the last urgency wording in paid creative.
7. **UK.**
   - uiteten shows € prices.
   - `/en/` honestly says "billed in euros".
   - The set is provisional by plan. Target ads at ages 18 and over (25 and over if the creative skews young).
8. **Third-party names.**
   - CellarTracker and Vivino are named in kelder. That is nominative use, and CSV import exists.
   - Vintec is gone ("Klimaatkast, onder").
   - No real producers appear in any ad or on the landing page.
9. **Claims verified as now true:**
   - "zonder account staat je hele kelder alleen op je eigen telefoon"
   - "Fles voor fles of in één keer" (CSV import exists)
   - "68 wijnstreken… per jaar staat erbij of hij tegen bronnen is gelegd", with the qualifier attached
   - the free / Plus split and the credit costs
   - "billed in euros"

**Proof the owner must collect (not scored against the craft)**
- **A dated beta line** is true today: "In gebruik bij 7 kelders sinds augustus 2026". It is better than nothing above the fold.
- **Two or three named tester quotes** about the drink window, each with first name, town and cellar size.
- **One sommelier or wine-writer quote,** with name and restaurant or publication.
- **One real tester bottle on film** through the real scanner. This doubles as the gate-3 fix.

---

## (f) What is strong

- **The film finally works as a hook.**
  - The label is in the viewfinder at 0.0 s, the shutter fires at 1.0 s, the window is on screen at 1.5 s, the caption lands at 2.0 s and the bar is pulsed at 2.75 s.
  - Transitions are fades and cuts only, and the light/dark change no longer washes to grey.
  - The end card is clean: "Open elke fles *op z'n best.*" with a single CTA.
  - This is now within the rubric's 3-second rule. What remains is scale, not structure.
- **specifiek is still the best frame in the set.** It becomes shippable the moment its numbers are true.
- **nu ships.**
  - The roman-only question reads more confident than the old italic payoff.
  - The Horizon plate is clean in every format.
  - Every total adds up (10 + 0 + 5 + 6 + 0 = 21 bottles; €388 + €305 + €780 = €1.473).
- **erbij's new structure is right.** The real search field with "eendenborst" is the headline's proof, and the reason lines are now correct Dutch and correct wine sense.
- **Compliance craft improved visibly.**
  - The NIX18 badge has its own zone in the statics.
  - The BE band is a proper bottom band at the specified size and padding.
  - The urgency strings and the Talbot placeholder are gone.
- **The landing page in dark mode** is now coherent from top to bottom: dark plates, a gold CTA and the uiteten frame belonging to the page. It is a real differentiator, and it backs up the page's own claim that the app goes dark.
- **The body copy still carries the brand:**
  - "Wat jij invult, wint altijd."
  - "een schatting heet ook zo"
  - "CellarMentor verdient aan één ding: het abonnement van wie meer wil."
  - "Zo gaat die ene dure fles niet te vroeg open…"
- **The label rework is real craft.** It no longer reads as a vector illustration at feed size. Removing "Grand Cru Classé" was the right call; the window simply has to follow it.
