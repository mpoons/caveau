# Lanceringsplan CellarMentor

*Open elke fles op z'n best.* Scan het etiket. CellarMentor zegt wanneer je hem opent, wat je erbij schenkt uit je eigen kelder, en leest in het restaurant de wijnkaart met je mee.

Plan van 13 oktober 2026. Elke sectie is los goed te keuren; status en voortgang staan in het dashboard.

## Geld

Nooit meer dan € 1.000 in de min, gerekend met netto-inkomsten na btw en Stripe-kosten. Uitgaveruimte = € 1.000 + netto-inkomsten tot nu toe − alle campagne-uitgaven tot nu toe. Een kanaal krijgt pas meer geld als het bewezen betalende gebruikers oplevert onder de grens per betaler (sectie 7a).

Aanname: de vaste lopende kosten die er al waren (Supabase Pro, domein) vallen buiten deze € 1.000. De AI-kosten die nieuwe gebruikers veroorzaken vallen er wel binnen, want die groeien mee met de campagne. Klopt dat niet, zeg het, dan reken ik het om.

| Post | Sectie | Envelop |
|---|---|---|
| AI-kosten van nieuwe gratis gebruikers | 0c | € 150 |
| Print: wijnjarenkaartje, hangtags, inlegkaart | 3g | € 150 |
| Makers (vergoedingen; liefst commissie) | 4a | € 250 |
| Flessen en prijzen voor podcasts en clubs | 3a | € 100 |
| Google Search leertest | 5a | € 150 |
| Meta leertest | 5b | € 200 |
| **Totaal** | | **€ 1000** |

| Wat een abonnee oplevert | |
|---|---|
| Plus per maand, bruto | € 2,99 |
| Na 21% btw | € 2,47 |
| Stripe (1,5% + € 0,25) en Billing (0,7%) | − € 0,31 |
| Netto per maandbetaling | ≈ € 2,16 |
| Jaarplan € 29,99, netto op dag 0 | ≈ € 23,90 |
| Waarde maandabonnee in jaar 1 (basiscurve) | ≈ € 10 |
| AI-kosten, gemeten: etiketscan | ≈ $ 0,008 |
| AI-kosten, gemeten: prijs opzoeken (1 credit) | ≈ $ 0,05 |

## Kerncijfers

- **CPC**: Advertentiekosten gedeeld door klikken, per kanaal.
- **CPA aanmelding**: Kosten gedeeld door nieuwe accounts uit dat kanaal.
- **CPA betalend**: Kosten gedeeld door nieuwe betalers uit dat kanaal. Het enige cijfer dat over opschalen beslist.
- **Conversie naar betaald**: Betalers gedeeld door aanmeldingen, per cohort van 30 dagen.
- **Activatie**: Aandeel aanmeldingen dat binnen een dag een etiket met de sommelier liet lezen.

## Fase 0 · Fundament

Eerst de lekken dicht en de meting aan. Vóór dit klaar is gaat er geen euro naar promotie.

### 0a · Trechter en meting live zetten

**Kosten:** € 0

Er was geen enkele meting tussen eerste bezoek en betaling, de AI-scan zat achter Meer → Account, en wie zonder tegoed zat kreeg alleen een verwijzing. Zonder dit is elke euro aan promotie blind en lekt de helft weg vóór de eerste scan.

**Al klaar of voorbereid**

- Eigen meting zonder cookies of derden: tabel events met trechter per week en per bron (SQL klaar, getest op een lokale database).
- Camera zonder account vraagt eerst om een gratis account, in één venster; "zonder account verder" blijft mogelijk.
- Tegoed op (402) opent meteen de betaalmuur, met jaarkeuze zodra die prijs bestaat.
- Herkomst (utm, ?via=code) reist mee van advertentie tot Stripe en terug als "betaald" in de meting.
- Taal uit de telefoon in plaats van een keuzevenster vooraf; ?demo=1 voor "bekijk een voorbeeldkelder".
- Privacyverklaring bijgewerkt (beloofde eerder "geen bezoekersstatistieken"); 18+-vermelding bij aanmelden.
- Service worker kan de app niet meer overschrijven met een landingspagina.

**Wat ik doe**

- Branch naar main zetten (productie), SQL draaien in Supabase, billing en stripe-webhook uitrollen.
- Een volledige testroute lopen en controleren dat elke stap in trechter_week verschijnt.

**Wat jij doet**

- Akkoord geven op livegang.
- Eén echte betaling van € 2,99 met je eigen kaart doen en daarna opzeggen; dat bewijst webhook, meting en terugkeer in één keer.

| Testcriterium | |
|---|---|
| Meten | Rijen in trechter_week voor de testroute: app_open, aanmeld_ok, scan, betaalmuur, afrekenen, betaald. |
| Opschalen bij | n.v.t. |
| Stoppen bij | Als een stap ontbreekt: terugdraaien is één git revert; de SQL heeft een down-regel. |
| Wat dit kan bewijzen | Bewijst dat de meting werkt. Bewijst niets over conversie. |

**Bestanden:** [Code en SQL op de branch](https://github.com/mpoons/cellarmentor/blob/claude/optimistic-wozniak-2tlaqt/supabase/sql/meting-13okt.sql) · [Besluitenlog](https://github.com/mpoons/cellarmentor/blob/claude/optimistic-wozniak-2tlaqt/DECISIONS.md)


### 0b · E-mail die echt aankomt

**Kosten:** ± € 7 per jaar, vaste kosten buiten de envelop

Supabase bezorgt mail via zijn eigen server alleen aan leden van je team. Staat "Confirm email" aan, dan krijgt een vreemde die zich aanmeldt geen bevestiging en komt nooit binnen. Eén van de zeven accounts staat nu onbevestigd. Dit is de grootste blokkade voor de lancering.

**Al klaar of voorbereid**

- Bevestigd in de documentatie van Supabase (custom SMTP is nodig voor productie).

**Wat ik doe**

- Mailtemplates in huisstijl voor bevestiging en wachtwoordherstel.
- CONTACT_MAIL en MAIL_FROM omzetten naar het eigen domein; de wekelijkse herinneringsmail aanzetten.
- Testen met een adres buiten het team en met mail-tester.com (doel 9/10 of hoger).

**Wat jij doet**

- Controleren of "Confirm email" aanstaat (Supabase → Authentication → Providers → Email).
- Resend-account aanmaken (gratis tier) en de SPF/DKIM-records bij TransIP zetten.
- In Supabase → Authentication → SMTP de Resend-gegevens invullen.
- TransIP Doorstuurservice voor hallo@cellarmentor.com (± € 7 per jaar).

| Testcriterium | |
|---|---|
| Meten | Tijd tot de bevestigingsmail binnen is, spamscore, aandeel accounts dat binnen een dag bevestigd is. |
| Opschalen bij | n.v.t. |
| Stoppen bij | n.v.t. |
| Wat dit kan bewijzen | Bewijst dat aanmelden werkt voor vreemden. |


### 0c · Prijs, jaarplan en kostenrem

**Kosten:** € 150 (AI-kosten nieuwe gebruikers) · **na:** 0a

Op € 2,99 per maand blijft er ± € 2,16 over en is een abonnee in het eerste jaar ± € 10 waard. Betaalde advertenties kosten in onderzoek € 86 tot € 480 per betaler. Een jaarplan haalt het geld op dag 0 binnen en houdt mensen langer vast (48 tot 54% na een jaar tegen 12 tot 22% bij maand). Daarnaast kost prijs opzoeken nu 1 credit, terwijl het ± $ 0,05 kost: vijf keer het getal waarop de bundel van 300 is gerekend.

**Al klaar of voorbereid**

- Billing kent een jaarprijs (secret STRIPE_PRICE_PLUS_JAAR) en een proefperiode (PLUS_PROEF_DAGEN, standaard uit); de webhook verwerkt "trialing".
- De betaalmuur toont jaar en maand zodra PLUS_JAAR_PRIJS is ingevuld.

**Wat ik doe**

- PLUS_JAAR_PRIJS op "€ 29,99 per jaar" zetten met "16% voordeel" en uitrollen.
- Voorstel uitwerken: prijs opzoeken 3 credits (in plaats van 1), zodat een zware Plus-gebruiker geen verlies wordt.
- AI-kosten per week in het dashboard zetten uit ai_usage.

**Wat jij doet**

- Beslissen: jaarplan € 29,99 (mijn advies) of € 24,99.
- In Stripe een jaarprijs aanmaken op het bestaande product en de price-id als secret zetten.
- In Stripe Checkout iDEAL/Wero, Apple Pay en Google Pay aanzetten.
- Beslissen over 3 credits voor prijs opzoeken.

| Testcriterium | |
|---|---|
| Meten | Aandeel jaar onder nieuwe betalers; betaalmuur gezien → betaald, vier weken voor en na. |
| Opschalen bij | Jaarplan blijft als ≥ 25% van de betalers jaar kiest en de omzetting van betaalmuur naar betaald niet daalt. |
| Stoppen bij | Terug naar alleen maand als de omzetting meer dan de helft daalt over ≥ 40 betaalmuurweergaven. |
| Wat dit kan bewijzen | Met tientallen weergaven zie je alleen grote verschillen (factor twee). Kleine verschillen kan dit niet aantonen. |

**Later:** Na 50 betalers: € 3,99 per maand testen (Vivino vraagt € 4,99). Na 300 aanmeldingen: 10 in plaats van 20 gratis credits testen. Niet eerder: eerst moeten mensen de waarde kunnen voelen.

**Bestanden:** [Billing (jaar en proef)](https://github.com/mpoons/cellarmentor/blob/claude/optimistic-wozniak-2tlaqt/supabase/functions/billing/index.ts)


### 0d · Merk, NIX18 en juridische toets

**Kosten:** buiten de envelop, jouw besluit

Vóór de naam publiek wordt: het woordmerk vastleggen (staat al op je lijst, kl. 9, 35, 42). Advertenties met wijn erin vallen bij Meta, Google en de Nederlandse en Belgische codes in de praktijk onder alcoholreclame. Of de Reclamecode Alcohol (RVA) op een app van toepassing is, is een grijs gebied.

**Al klaar of voorbereid**

- Alle advertenties hebben een NL-versie met NIX18 en een BE-versie met de verplichte band; wijnmerken van derden zijn uit de beelden gehaald.

**Wat ik doe**

- Het officiële NIX18-logo in de sjablonen zetten zodra jij het hebt.
- Een vragenlijst voor de jurist opstellen (RVA-reikwijdte, BE, AI-content).

**Wat jij doet**

- Beslissen: Benelux-merk nu (tarief op boip.int controleren) en EU later uit inkomsten, of meteen EU.
- Het NIX18-logo downloaden (STIVA, gratis) en aanleveren.
- Optioneel: één uur reclamejurist; schatting € 150 tot € 250, niet geverifieerd.
- Herinnering: de Anthropic-serversleutel verloopt 31 december 2026.

**Bestanden:** [Onderzoek alcoholregels](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/03-alcohol-ad-rules.md)


### 0e · Echt bewijs verzamelen

**Kosten:** € 0

Twee verse critici gaven alle uitingen een onvoldoende op bewijs: er staat niets onwaars, maar ook niets dat laat zien dat echte mensen dit gebruiken. Topapps zetten één echte, benoemde stem naast de kop. Verzinnen mag nooit; verzamelen kan deze week.

**Al klaar of voorbereid**

- Op de landingspagina en in de advertenties is plek voor één citaat met naam en plaats; het blok verschijnt pas als er een echt citaat is.

**Wat ik doe**

- Een korte vraag opstellen voor de testers ("wat deed CellarMentor voor je kelder?") met toestemmingszin.
- Het citaatblok en een regel "In gebruik sinds [maand] bij [n] kelders" invoegen zodra jij de gegevens hebt.

**Wat jij doet**

- De zeven testers om één of twee zinnen vragen, met naam, woonplaats en toestemming.
- Eén sommelier of docent (bijvoorbeeld Dennis Koopman) vragen om een eerlijke zin na een week gebruik.
- Een foto van jezelf en één zin waarom je dit maakte.
- Tien seconden filmen met je iPhone: een echte fles uit je rek scannen. Dat vervangt het getekende etiket in de film.

**Bestanden:** [Kritiek ronde 1](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/kwaliteit/ronde1-kritiek.md) · [Kritiek ronde 2](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/kwaliteit/ronde2-kritiek.md)


## Fase 1 · Groei uit het product

Het goedkoopste kanaal: het moment waarop iemand de waarde voelt.

### 1a · Betaalmoment na de eerste waarde

**Kosten:** € 0 · **na:** 0a

De helft van de betalingen bij abonnementsapps valt op de eerste dag. Het aanbod hoort te komen als iemand net een etiket of wijnkaart heeft laten lezen.

**Al klaar of voorbereid**

- Tegoed op opent de betaalmuur zelf.

**Wat ik doe**

- Server stuurt het resterende tegoed mee; bij nog 5 credits één rustige melding met wat Plus toevoegt.
- Na de derde geslaagde scan eenmalig een kaart "Zo werkt Plus".
- Na een gelezen wijnkaart de betaalmuur aanbieden als het tegoed laag is.

**Wat jij doet**

- Akkoord.

| Testcriterium | |
|---|---|
| Meten | Betaalmuur gezien → afrekenen → betaald, per reden (tegoed_op, vijf_over, wijnkaart, account). |
| Opschalen bij | De reden met de hoogste omzetting krijgt de prominentste plek. |
| Stoppen bij | Een melding die zichtbaar meer afmeldingen of minder scans geeft dan ervoor: weg. |
| Wat dit kan bewijzen | Laat zien welk moment werkt; met weinig betalers alleen richting, geen precisie. |


### 1b · Geef een fles: doorverwijzen

**Kosten:** € 0 (AI-tegoed) · **na:** 0a, 0b

Wijnliefhebbers kennen andere wijnliefhebbers. Doorverwezen klanten zijn in onderzoek minstens 16% meer waard en zeggen minder vaak op. Vivino groeide naar eigen zeggen voor 95% organisch.

**Wat ik doe**

- Persoonlijke link per account (?via=code); de vriend en jij krijgen elk 20 extra credits bij aanmelding; betaalt de vriend, dan krijg jij een maand Plus.
- Deelknop met een kaartje voor WhatsApp.
- SQL voor de beloningen, met een maximum per maand tegen misbruik.

**Wat jij doet**

- Akkoord op de beloning (40 credits kost ± € 0,30 tot € 1 aan AI).

| Testcriterium | |
|---|---|
| Meten | Uitnodigingen per actieve gebruiker, aanmeldingen per uitnodiging, betalers via ?via=. |
| Opschalen bij | Bij ≥ 0,2 nieuwe aanmeldingen per actieve gebruiker per maand: beloning zichtbaarder maken. |
| Stoppen bij | Bij misbruik of minder dan 1 aanmelding per 50 actieve gebruikers na 6 weken: versimpelen. |
| Wat dit kan bewijzen | Werkt pas met een paar honderd gebruikers; daarvoor is het vooral voorbereiding. |


### 1c · Deelbare Kelder-APK-kaart

**Kosten:** € 0 · **na:** 0a

Flighty, Beli en Partiful groeiden op iets dat mensen zelf delen. Hier: een mooi kaartje "dit is op z'n best in mijn kelder deze maand", in de huisstijl, met de naam erop.

**Al klaar of voorbereid**

- De huisstijl en het sjabloon voor beelden staan (advertentiestudio).

**Wat ik doe**

- In de app een kaart genereren uit Horizon (afbeelding), deelbaar via het deelmenu van de telefoon, met een link met ?via=code.

**Wat jij doet**

- Akkoord.

| Testcriterium | |
|---|---|
| Meten | Gedeelde kaarten per week, bezoeken en aanmeldingen via die links. |
| Opschalen bij | Bij ≥ 1 aanmelding per 10 gedeelde kaarten: kaart ook na elke grote scan aanbieden. |
| Stoppen bij | Bij minder dan 1 aanmelding per 50 gedeelde kaarten na de kerst: laten staan, niet verder uitbouwen. |
| Wat dit kan bewijzen | Laat zien of delen iets oplevert; geen betrouwbaar cijfer voor betalers. |


### 1d · Welkomstmails

**Kosten:** € 0 (Resend gratis tier) · **na:** 0b

Wie zich aanmeldt en daarna niets doet, ziet nooit wat de app kan. Vijf korte mails met telkens één actie halen mensen terug.

**Al klaar of voorbereid**

- Teksten in voorbereiding (map teksten).

**Wat ik doe**

- Dag 0, 2, 7, bij 15 van 20 credits, en dag 25; versturen via Resend en pg_cron; afmelden met één tik.

**Wat jij doet**

- Akkoord; 0b moet eerst af.

| Testcriterium | |
|---|---|
| Meten | Open en klik per mail, activatie (eerste AI-scan) binnen 7 dagen met en zonder mail. |
| Opschalen bij | Mail die activatie zichtbaar verhoogt houden. |
| Stoppen bij | Mail met afmeldingen boven 2% per verzending: herschrijven of weg. |
| Wat dit kan bewijzen | Activatie wel, betalers pas bij honderden aanmeldingen. |

**Bestanden:** [Teksten](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/07-welkomstmails.md)


### 1e · Productverbeteringen uit de lancering

**Kosten:** € 0

Bij het opnemen van de schermen en het bouwen van de pagina's kwamen dingen boven die een nieuwe gebruiker ook ziet. Een deel is al gerepareerd op de branch, de rest is jouw keuze.

**Al klaar of voorbereid**

- As van het drinkvenster toonde 2059 bij een venster tot 2060: nu "tot 2060 →".
- Kelderlijst zei "Mogelijk topfles", het detail "Waarschijnlijk een topfles": nu één woord.
- Horizon herhaalde dezelfde zin bij twee lege periodes.
- Engelse stand: statuschip, jaargangchip, wijnkaartkop, "X en Y" in pairingredenen en "Waar komt dit venster vandaan?" waren Nederlands.

**Wat ik doe**

- Op jouw akkoord: de tegel "Nu op dronk" (21) en Horizon "Nu" (10) tellen iets anders zonder dat te zeggen; voorstel om de tegel "In hun venster" te noemen.
- De kelderregels geven vaak twee keer 10/10 en soms vreemde paren (ossobuco → Meursault 10/10); voorstel om de schaal te spreiden.
- De uitleg "Waar komt dit venster vandaan?" noemt twee niveaus van bronnen, de tabel kent er drie.
- CSV-import leest alleen UTF-8; een Excel-bestand in het oude Windows-formaat verminkt é en ü.
- Na import met een later venstereinde zegt de fles nog "uit het bestand".
- Beslissen: de chip "Sommelier-AI" in de app heet in advertenties "Sommelier"; de app zelf ook zo noemen?

**Wat jij doet**

- Per punt akkoord of niet.


## Fase 2 · Vindbaar worden

Een PWA heeft geen app store; Google is de winkel.

### 2a · Landingspagina’s en deelafbeelding live

**Kosten:** € 0 · **na:** 0a

cellarmentor.com was alleen de app: wie via een link kwam zag een lege kelder. Advertenties, pers en makers hebben een pagina nodig die in drie seconden zegt wat het is.

**Al klaar of voorbereid**

- cellarmentor.com/start/ (NL) en /en/ (EN), in de huisstijl, met de echte scanflow en merkloze schermen, licht en donker, één knop.
- Na twee kritiekrondes: eerlijke microcopy over account en credits, subkop onder 20 woorden, geen drinkdrang, plakknop die wijkt voor de slot-CTA.
- Deelafbeelding 1200×628 met etiket en venster; het app-icoon was het enige beeld.

**Wat ik doe**

- Live zetten met 0a.
- Na de eerste 100 bezoekers: koppen bijschaven op wat de meting laat zien.

**Wat jij doet**

- Akkoord.
- Een foto van jezelf en één zin over waarom je dit maakte, voor een stukje "gemaakt door" (echt bewijs werkt beter dan geen).

| Testcriterium | |
|---|---|
| Meten | Bezoek → klik op "Scan je eerste fles" (lp_cta), → aanmelding, per bron. |
| Opschalen bij | n.v.t. |
| Stoppen bij | Klikratio onder 15% na 300 bezoekers: hero herzien. |
| Wat dit kan bewijzen | Klikratio is na een paar honderd bezoekers redelijk betrouwbaar. |

**Bestanden:** [Landingspagina NL](https://github.com/mpoons/cellarmentor/blob/claude/optimistic-wozniak-2tlaqt/start/index.html) · [Landingspagina EN](https://github.com/mpoons/cellarmentor/blob/claude/optimistic-wozniak-2tlaqt/en/index.html)


### 2b · Gidsartikelen

**Kosten:** € 0 · **na:** 2a, 2d

De Nederlandse zoekresultaten over bewaren, wijnjaren en "op dronk" zijn dun: korte vraag-en-antwoordpagina's en app-overzichten uit 2009 tot 2024. Vivino haalt naar schatting 59% van zijn bezoek uit zoekmachines.

**Al klaar of voorbereid**

- Vier artikelen van ruim 1.000 woorden: wanneer is wijn op dronk; hoe lang wijn bewaren; wijn bewaren thuis; overstappen van CellarTracker of Vivino. Met gegevens voor zoekmachines en dezelfde meting als de landingspagina.
- Na te lezen: de exportstappen van Vivino komen uit een gids van een andere app (gemeld in de tekst).

**Wat ik doe**

- Elke week één nieuw artikel uit de lijst van vijftien (onder meer Kelder-APK, wat is mijn wijn waard, bewaarwijn voor een geboortejaar, beste wijnkelder-app).

**Wat jij doet**

- Akkoord; per artikel even nalezen op wijninhoud.

| Testcriterium | |
|---|---|
| Meten | Vertoningen, klikken en positie per pagina in Search Console; aanmeldingen met bron google. |
| Opschalen bij | Onderwerpen die na 8 weken in de top 10 staan krijgen vervolgartikelen. |
| Stoppen bij | Na 12 weken zonder vertoningen: herschrijven of samenvoegen. |
| Wat dit kan bewijzen | SEO duurt 3 tot 9 maanden; de eerste maand bewijst niets. |

**Bestanden:** [Gidsen (branch)](https://github.com/mpoons/cellarmentor/tree/claude/optimistic-wozniak-2tlaqt/gids)


### 2c · Wijnjaren per streek

**Kosten:** € 0 · **na:** 2a, 2d

Nederlanders zoeken "wijnjarentabel", "goede wijnjaren bordeaux" en "wijn op dronk". Niemand in het Nederlands heeft een gestructureerde tabel per streek; CellarMentor heeft er een van 68 streken.

**Al klaar of voorbereid**

- 41 pagina's (van 68 streken): alleen streken met minstens 5 jaren en minstens één jaar tegen bronnen gelegd; 19 streken die alleen eigen schatting zijn of elkaars kopie, blijven bewust weg (dubbele inhoud straft Google af).
- Vensters berekend met de functies uit de app zelf, gecontroleerd op 10.040 voorbeeldflessen: geen verschil.
- Geen puntenscores, geen citaten van uitgevers.

**Wat ik doe**

- In delen live zetten en de indexering volgen; later per streek en jaar ("Bordeaux 2015: op dronk?") alleen waar een pagina echt iets eigens zegt.

**Wat jij doet**

- Akkoord.

| Testcriterium | |
|---|---|
| Meten | Als 2b. |
| Opschalen bij | Bij vertoningen op streek+jaar: de pagina's per jaargang bouwen. |
| Stoppen bij | Pagina's zonder vertoningen na 12 weken op noindex. |
| Wat dit kan bewijzen | Als 2b. |

**Bestanden:** [Wijnjaren (branch)](https://github.com/mpoons/cellarmentor/tree/claude/optimistic-wozniak-2tlaqt/jaargangen)


### 2d · Search Console, sitemap en vermeldingen

**Kosten:** € 0 · **na:** 2a

Zonder Search Console zie je niet wat Google doet. En bestaande lijsten met wijnapps (iCulture, iPhoned, Androidworld) zijn gratis plekken waar mensen nu al zoeken.

**Al klaar of voorbereid**

- Concept-sitemap.

**Wat ik doe**

- sitemap.xml en robots.txt plaatsen; mails aan iCulture, iPhoned en Androidworld om opgenomen te worden.

**Wat jij doet**

- Domein verifiëren in Google Search Console (TXT-record bij TransIP).
- De mails vanuit je eigen adres versturen.


## Fase 3 · Gemeenschap, partners en pers

Waar wijnapps historisch hun gebruikers vonden.

### 3a · Podcasts

**Kosten:** € 100 (flessen en prijzen) · **na:** 0a, 0b, 2a

Nederlandse wijnpodcasts staan hoog in de Apple-hitlijst Eten (Klare Wijn #10, Het Wijngesprek #11, Le Club & Sommeljj #14, Wijn en Wijsheid #23). Hun luisteraars zijn precies de mensen met een kelder. Een gastplek kost niets.

**Al klaar of voorbereid**

- Pitch per podcast in voorbereiding, met een eigen luistercode.

**Wat ik doe**

- Pitches, gespreksonderwerpen ("wanneer is een wijn op dronk?"), een kaartje met de code.

**Wat jij doet**

- De pitches versturen en de gesprekken doen; jij bent het verhaal.

| Testcriterium | |
|---|---|
| Meten | Aanmeldingen en betalers per code binnen 14 dagen na uitzending. |
| Opschalen bij | Bij ≥ 10 aanmeldingen of ≥ 1 betaler per aflevering: de volgende vijf podcasts benaderen, ook EN. |
| Stoppen bij | Bij minder dan 3 aanmeldingen per aflevering na drie afleveringen: tijd naar 3b en 3c. |
| Wat dit kan bewijzen | Codes meten het directe effect; mond-tot-mond erna zie je als "direct". |

**Bestanden:** [Pitches](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/01-podcasts.md)


### 3b · Wijnclubs en opleidingen

**Kosten:** € 0 · **na:** 0a, 0b

Het Nederlands Wijngilde (12 afdelingen, maandelijkse proeverijen), de Verenigde Vinologen (± 600 afgestudeerden) en de WSET- en SDEN-scholen bereiken verzamelaars en studenten die elke week over jaargangen leren.

**Al klaar of voorbereid**

- Mails in voorbereiding.

**Wat ik doe**

- Ledenaanbod: 3 maanden Plus gratis via een clubcode; een praatje van 20 minuten "jaargangen en drinkvensters in de praktijk" met dia's.

**Wat jij doet**

- In Stripe een kortingscode per club aanmaken (100% korting, 3 maanden).
- Contact leggen en het praatje geven.

| Testcriterium | |
|---|---|
| Meten | Aanmeldingen per clubcode; hoeveel na 3 maanden doorbetalen. |
| Opschalen bij | Bij ≥ 20% doorbetalen na de gratis maanden: alle afdelingen en scholen. |
| Stoppen bij | Onder 5% doorbetalen: aanbod verkorten naar 1 maand. |
| Wat dit kan bewijzen | Doorbetalen is pas na 3 maanden te zien. |

**Bestanden:** [Mails](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/03-clubs-opleidingen.md)


### 3c · Handelspartners

**Kosten:** € 0 · **na:** 0a, 2a

Wie een wijnklimaatkast koopt, begint een kelder. Wie bij Grand Cru Wijnen koopt, denkt al in drinkvensters. Wie bij een veiling wil verkopen, wil weten wat zijn kelder waard is.

**Al klaar of voorbereid**

- Voorstellen en inlegkaart in voorbereiding.

**Wat ik doe**

- One-pagers voor Grand Cru Wijnen, Wijnklimaatkast.nl en Sylvie's; ontwerp inlegkaart en schapkaartje; een "laat taxeren"-knop als een veilinghuis meedoet.

**Wat jij doet**

- De gesprekken voeren; afspraken over codes of vergoeding.

| Testcriterium | |
|---|---|
| Meten | Aanmeldingen en betalers per partnercode per maand. |
| Opschalen bij | Een partner die ≥ 10 aanmeldingen per maand oplevert krijgt een eigen pagina en materiaal. |
| Stoppen bij | Na 3 maanden zonder aanmeldingen: afronden. |
| Wat dit kan bewijzen | Codes meten het volledig. |

**Bestanden:** [Voorstellen](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/04-partners.md)


### 3d · Pers

**Kosten:** € 0 · **na:** 0a, 0b, 2a, 0d

Kassa kraakte Vivino in 2014: Engelstalig en geen advies per gerecht. CellarMentor is Nederlands en adviseert uit je eigen kelder. Maandbladen sluiten hun decembernummer half oktober tot begin november.

**Al klaar of voorbereid**

- Persbericht en pitches in voorbereiding.

**Wat ik doe**

- Persbericht, perskit met beelden, een datastuk uit de jaargangtabel voor Perswijn, pitches voor iCulture, AD, De Standaard/Knack, Radar en DutchNews.

**Wat jij doet**

- Versturen vanuit je eigen naam, één exclusief tegelijk; interviews geven.

| Testcriterium | |
|---|---|
| Meten | Bezoek en aanmeldingen per verwijzer (ref in de meting). |
| Opschalen bij | Het type medium dat aanmeldingen geeft krijgt de volgende pitch. |
| Stoppen bij | n.v.t. |
| Wat dit kan bewijzen | Een artikel meet zich via de verwijzer; tv en papier niet. |

**Bestanden:** [Persbericht en pitches](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/02-pers.md)


### 3e · Online gemeenschappen

**Kosten:** € 0 · **na:** 2a

r/wine (324.000 leden), r/thenetherlands, het Vinejo-forum en Meetup Wine Lovers. Daar wordt gevraagd "wanneer drink ik deze fles?". Wie daar als maker eerlijk antwoordt, wint vertrouwen.

**Al klaar of voorbereid**

- Concepten voor posts in voorbereiding.

**Wat ik doe**

- Posts en antwoorden schrijven; vooraf de regels per forum lezen.

**Wat jij doet**

- Posten als jezelf, met de vermelding dat je de maker bent.

| Testcriterium | |
|---|---|
| Meten | Bezoek en aanmeldingen met ref reddit/forum. |
| Opschalen bij | n.v.t. |
| Stoppen bij | Bij één negatieve moderatorreactie: stoppen op dat forum. |
| Wat dit kan bewijzen | Klein en eerlijk; vooral feedback. |

**Bestanden:** [Posts](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/06-communities.md)


### 3f · Kelder-APK, 1 tot 20 december

**Kosten:** binnen 3a, 3g en 4a · **na:** 1c, 3a, 3d

Rond de kerst kijkt iedereen in de kast: wat is op z'n best voor het kerstdiner, wat mag blijven liggen. Eén verhaal voor pers, makers, clubs en de app.

**Al klaar of voorbereid**

- Concept in voorbereiding.

**Wat ik doe**

- In-app kaart (1c), artikel, posts, nieuwsbriefblok voor partners, persaanhaking.

**Wat jij doet**

- Akkoord en de pers- en makerscontacten.

| Testcriterium | |
|---|---|
| Meten | Aanmeldingen 1 tot 20 december tegen de weken ervoor, per bron. |
| Opschalen bij | Herhalen rond Pasen en de zomer als het ≥ 2× de basis geeft. |
| Stoppen bij | n.v.t. |
| Wat dit kan bewijzen | Seizoen en campagne zijn niet te scheiden; vergelijk per bron. |

**Bestanden:** [Campagne](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/08-kelder-apk.md)


### 3g · Print en guerrilla

**Kosten:** € 150 · **na:** 0a, 2a

Vivino begon met een kurkentrekker als prijs voor wie de meeste etiketten fotografeerde. Een wijnjarenkaartje op zak, een "op dronk"-hanger aan een cadeaufles en een kaartje in een nieuwe klimaatkast zijn goedkoop en blijven liggen.

**Wat ik doe**

- Ontwerp wijnjarenkaartje (portemonnee, QR), hangtag, inlegkaart, schapkaartje; drukklare pdf.

**Wat jij doet**

- Bestellen (± € 150 voor drie oplagen van 1.000) en uitdelen bij clubs, proeverijen en partners.

| Testcriterium | |
|---|---|
| Meten | Bezoeken met ?via=kaart, ?via=tag, ?via=kast. |
| Opschalen bij | Herdrukken wat ≥ 1 aanmelding per 50 stuks geeft. |
| Stoppen bij | Niet herdrukken wat minder geeft. |
| Wat dit kan bewijzen | Volledig meetbaar via de QR-code. |


## Fase 4 · Makers

Weinig, goed gekozen, betaald per resultaat waar het kan.

### 4a · Micro-makers

**Kosten:** € 250 (liefst commissie) · **na:** 0a, 0b, 0c, 2a, 0d

Bij een abonnee van ± € 10 per jaar moet een post van € 150 vijftien betalers opleveren om quitte te spelen. Daarom kiezen op passend publiek (verzamelaars, sommeliers) en liefst betalen per betaler.

**Al klaar of voorbereid**

- Brief en eerste berichten in voorbereiding. Gekozen: Dennis Koopman (sommelier, 14k), De Wijnwijven (26k), Dutch Wine Apprentice (fine wine, 18k), Klare Wijn (68k plus podcast).

**Wat ik doe**

- Brief, persoonlijke codes, overzicht per maker in het dashboard.

**Wat jij doet**

- Contact als oprichter; afspraak: gratis Plus plus commissie per betaler, of hoogstens € 150 vast voor 1 post en 3 stories.

**Regels:** Maker 25+ en ziet er zo uit; "Reclame" of #adv plus #NIX18; 18+-filter aan; geen TikTok in NL en BE; geen drinkdrang; alleen de echte app.

| Testcriterium | |
|---|---|
| Meten | Aanmeldingen en betalers per code, binnen 14 dagen na de post. |
| Opschalen bij | Kosten per aanmelding ≤ € 3 en ≥ 1 betaler per € 75: tweede ronde met dezelfde maker. |
| Stoppen bij | Daarboven: geen tweede ronde. |
| Wat dit kan bewijzen | Eén post per maker zegt weinig; twee rondes geven een redelijk beeld. |

**Bestanden:** [Brief en berichten](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/teksten/05-makers.md)


### 4b · Codes voor sommeliers en docenten

**Kosten:** € 0 · **na:** 0a, 3b

Een sommelier of WSET-docent staat elke week voor een zaal. Een code met 3 maanden Plus voor hun gasten en een gratis jaar voor henzelf maakt ze ambassadeur.

**Wat ik doe**

- Codes, kaartje, overzicht.

**Wat jij doet**

- De eerste vijf benaderen (Le Club des Vins, Dennis Koopman, Wijnacademie).

| Testcriterium | |
|---|---|
| Meten | Aanmeldingen per code. |
| Opschalen bij | Bij ≥ 10 per code per maand: meer docenten. |
| Stoppen bij | n.v.t. |
| Wat dit kan bewijzen | Volledig meetbaar. |


## Fase 5 · Betaalde advertenties

Kleine leertests met vaste stopregels, pas na fase 0.

### 5a · Google Search, hoge intentie

**Kosten:** € 150, hard plafond · **na:** 0a, 0b, 0c, 2a, 0d

Zoeken zet beter om dan sociale media, en een PWA heeft geen app store. Wie "wijnkelder app" of "wijn op dronk app" typt, zoekt precies dit.

**Al klaar of voorbereid**

- Landingspagina en meting (na 0a).

**Wat ik doe**

- Campagne opzetten: exact en phrase op wijnkelder app, wijn op dronk app, wijnvoorraad bijhouden app, vivino alternatief, cellartracker nederlands; maximaal CPC € 0,60; NL; naar /start/ met utm.
- Elke week de cijfers in het dashboard.

**Wat jij doet**

- Google Ads-account met je betaalmethode; akkoord op het plafond.

| Testcriterium | |
|---|---|
| Meten | CPC, klik → aanmelding, aanmelding → betaald, CPA aanmelding en CPA betalend. |
| Opschalen bij | CPA betalend ≤ € 8 over minstens 10 betalers: budget verdubbelen binnen de uitgaveruimte. |
| Stoppen bij | € 100 uit zonder betaler, of CPA aanmelding boven € 6 na 150 klikken: stoppen. |
| Wat dit kan bewijzen | Met € 150 krijg je ± 150 tot 250 klikken en ± 10 tot 20 aanmeldingen. Dat bewijst CPC en klik → aanmelding redelijk. Het bewijst geen CPA betalend: daarvoor verwacht je 0 tot 2 betalers. |


### 5b · Meta, leertest van drie haken

**Kosten:** € 200, hard plafond · **na:** 0a, 0b, 0c, 2a, 0d

Niet om op te schalen: het onderzoek rekent € 86 tot € 480 per betaler bij € 10 waarde. Wel om goedkoop te leren welke boodschap mensen het meest raakt: het etiket, de wijnkaart of het gerecht. Dat stuurt de pers, de makers en de site.

**Al klaar of voorbereid**

- Zes concepten in 1:1, 4:5, 9:16 en 1,91:1, voor NL (NIX18), BE (verplichte band) en VK, elk met een eigen compositie; het scanmoment komt uit de echte live-scanner.
- De film van 19 seconden in drie formaten en drie markten, opent op het scanmoment.
- Twee rondes onafhankelijke kritiek tegen de kwaliteitslat (map kwaliteit).

**Wat ik doe**

- Drie advertentiesets (wanneer, uit eten, erbij), elk met een beeld en de film, met de Engelse en Belgische varianten waar nodig; NL, 25 tot 65 jaar, interesse wijn en gastronomie; doel: weergaven van de landingspagina; geen pixel, meting via utm in de eigen tabel.

**Wat jij doet**

- Advertentieaccount met betaalmethode; pagina- en accountleeftijd op 18+ zetten; akkoord.

**Regels:** Leeftijd 25+; geen Audience Network; NIX18 op elk beeld; geen BE of NO zonder de juiste variant.

| Testcriterium | |
|---|---|
| Meten | CTR, CPC, CPA aanmelding per haak. |
| Opschalen bij | Er wordt hier niet opgeschaald. De winnende haak gaat naar de hero, de makersbrief en de pers. |
| Stoppen bij | Per haak stoppen na € 40 met CTR onder 0,8% of zonder aanmelding; de hele test stopt op € 200. |
| Wat dit kan bewijzen | Met € 200 krijg je ± 200 tot 300 klikken en ± 15 tot 25 aanmeldingen in totaal. Alleen een verschil van factor twee tussen haken is zichtbaar. Over betalers zegt dit niets. |

**Bestanden:** [Advertenties en film](https://github.com/mpoons/caveau/tree/claude/optimistic-wozniak-2tlaqt/marketing/creatie/out2) · [Sjabloon](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/creatie/studio2.html)


### 5c · Bewust niet nu

**Kosten:** € 0

TikTok-advertenties met wijn zijn in Nederland en België verboden (RVA art. 23 lid 7, Belgisch convenant art. 13). Apple Search Ads vereist een app in de App Store. YouTube-advertenties zijn duur bereik zonder meetbaar resultaat bij dit budget. Snapchat valt in België af.

**Wat ik doe**

- Niets.

**Wat jij doet**

- Bevestigen.


## Fase 6 · AI-content en AI-influencer

Een aparte, latere fase met de regels eerst.

### 6a · AI-gegenereerde gebruikersvideo’s

**Kosten:** pas uit inkomsten · **na:** 5b, 4a, 0d

Kan alleen als openlijk gedramatiseerde demo. Een AI-persoon als echte klant presenteren is in de EU, het VK en de VS altijd verboden (UCPD bijlage I 23c, BW 6:193g). Sinds 2 augustus 2026 eist de AI-verordening (art. 50) een zichtbaar label. Wijn maakt het alcoholreclame: iedereen in beeld 25+ en zo ogend. Onafhankelijk onderzoek ziet menselijke advertenties 14 tot 17% sterker.

**Al klaar of voorbereid**

- Regels, labelteksten en checklist uitgezocht.

**Wat ik doe**

- Pas na fase 5 en met echte makersvideo's als vergelijking: twee dramatiseringen met het label "Reclame · AI-gegenereerde persoon, geen echte klant" vanaf het eerste beeld, alleen de echte app in beeld; dossier per uiting.

**Wat jij doet**

- Toolkeuze met licentie die wijn en betaalde advertenties toestaat (Synthesia niet; HeyGen beperkt; Arcads met intrekbare acteurs).
- Eén uur jurist vóór livegang.

**Regels:** Nooit: een AI-persoon als klant, verzonnen sterren of aantallen, nepvolgers, iemand die jonger dan 25 lijkt, gezondheidsclaims, TikTok in NL en BE, deepfakes van echte mensen, het label weghalen.

| Testcriterium | |
|---|---|
| Meten | CPA aanmelding tegen menselijke makersvideo's bij gelijke besteding (€ 100 elk). |
| Opschalen bij | Alleen als CPA aanmelding ≤ die van mensen en er geen klacht is. |
| Stoppen bij | CPA ≥ 1,5× die van mensen, of één klacht bij de Reclame Code. |
| Wat dit kan bewijzen | Bij € 100 per kant alleen grote verschillen. |

**Bestanden:** [Onderzoek AI-content](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/04-ai-ugc-influencer-rules.md)


### 6b · AI-gids als personage

**Kosten:** pas uit inkomsten · **na:** 6a

Een openlijk virtueel personage ("de kelderassistent van CellarMentor") kan op Instagram en YouTube uitleg geven. Het bedrijf is dan zelf de influencer volgens de Reclamecode Social Media (RSM 2026).

**Al klaar of voorbereid**

- Bio- en postteksten met verplichte vermeldingen uitgezocht.

**Wat ik doe**

- Personage ontwerpen (ogend 30 tot 55, geen jeugdcultuur), 8 weken organisch op Instagram en YouTube met 18+-filter, label "AI-generated profile", "Reclame" bij elke promotiepost.

**Wat jij doet**

- Akkoord na 6a; menselijke controle op elke reactie.

**Regels:** Als 6a. Geen TikTok-wijncontent in NL en BE; geen geautomatiseerde reacties zonder dat ze zeggen AI te zijn.

| Testcriterium | |
|---|---|
| Meten | Volgers, bezoeken via de bio-link, aanmeldingen met ?via=gids, sentiment in reacties. |
| Opschalen bij | Bij ≥ 1 aanmelding per post na 8 weken: doorgaan. |
| Stoppen bij | Negatieve reacties over nep of minder dan 0,2 aanmelding per post. |
| Wat dit kan bewijzen | Acht weken organisch is een eerste richting. |


## Fase 7 · Opschalen

Alleen uit verdiend geld.

### 7a · Budgetregel en herverdeling

**Kosten:** uit inkomsten · **na:** 0a

Opschalen mag zodra de inkomsten het toelaten. De regel maakt dat mechanisch, zonder dat het saldo ooit onder − € 1.000 komt.

**Al klaar of voorbereid**

- Het dashboard rekent saldo en uitgaveruimte.

**Wat ik doe**

- Elke maand een voorstel: welk kanaal meer krijgt, op basis van CPA betalend.

**Wat jij doet**

- Het voorstel goedkeuren.

**Regels:** Een kanaal schaalt alleen als CPA betalend ≤ de helft van de waarde per betaler over 12 maanden (bij de gemeten mix van maand en jaar), over minstens 10 betalers.


### 7b · Engelstalige markt

**Kosten:** uit inkomsten · **na:** 7a

De app en een landingspagina zijn er al in het Engels. Eerst bewijzen in NL en BE, dan het VK en expats in NL.

**Al klaar of voorbereid**

- /en/ met Engelse schermen, Engelse advertenties (VK-variant), Engelse film.
- De grootste Engelse vertaalgaten in de app zijn gedicht (zie 1e).

**Wat ik doe**

- De rest van de Engelse vertaling nalopen (teksten van v87 tot v99), met een automatische telling van Nederlandse zinnen in de Engelse stand.
- Makers: The Wine Beast, Wine With Jimmy, No Sediment; DutchNews.

**Wat jij doet**

- Akkoord als NL werkt.


### 7c · In de app stores

**Kosten:** te onderzoeken · **na:** 7a

Google Play via een Trusted Web Activity kost $ 25 eenmalig en opent zoeken in de Play Store. Of Google dan Play Billing (15%) eist in plaats van Stripe, is niet geverifieerd. De App Store is een groter project en opent Apple Search Ads.

**Wat ik doe**

- Het Play-factureringsbeleid voor de EER uitzoeken en een voorstel met cijfers.

**Wat jij doet**

- Beslissen na het voorstel.


## Bronnen

| Wat | Waarde | Bron |
|---|---|---|
| Download → betaald, freemium | 2,1% (harde betaalmuur 10,7%) | [RevenueCat State of Subscription Apps 2026](https://www.revenuecat.com/state-of-subscription-apps) |
| Betalingen op dag 0 | 50,6% | [RevenueCat 2026](https://www.revenuecat.com/state-of-subscription-apps) |
| Behoud na een jaar: jaar tegen maand | 48 tot 54% tegen 12 tot 22% | [RevenueCat 2025](https://revenuecat.com/state-of-subscription-apps-2025) |
| Meta CPC Nederland | ± 0,86 (valuta niet vermeld) | [Superads, jul 2025 tot jul 2026](https://www.superads.ai/facebook-ads-costs/cpc-cost-per-click/netherlands) |
| Klik → aanmelding (leadcampagnes) | 8,5% (VS) | [LocaliQ, sep 2026](https://localiq.com/blog/facebook-advertising-benchmarks/) |
| Vivino: organische groei | 95% (eigen opgave) | [Retail TouchPoints, 2020](https://retailtouchpoints.com/topics/digital-commerce/e-commerce-experience/covid-19-has-transformed-wine-shopping-heres-how-vivino-is-adapting) |
| Vivino Premium NL | € 4,99 per maand, ± € 45 tot € 48 per jaar | [App Store NL, okt 2026](https://apps.apple.com/nl/app/vivino-koop-de-juiste-wijn/id414461255) |
| CellarTracker: verlengingen | boven 90% (eigen opgave) | [US Chamber, apr 2026](https://uschamber.com/co/good-company/the-leap/cellartracker-ai-user-growth) |
| Doorverwezen klanten | ≥ 16% meer waard | [Schmitt, Skiera & Van den Bulte, Journal of Marketing 2011](https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf) |
| Nederlanders tegen AI in reclame | 44% (60+: 53%) | [Norstat via Emerce, okt 2025](https://www.emerce.nl/wire/jongeren-kritisch-bijna-helft-vindt-ai-reclames-ok) |
| Alcoholreclame op TikTok in NL | verboden | [Reclamecode Alcohol (RVA) art. 23 lid 7](https://www.reclamecode.nl/) |
| AI-label verplicht (deepfakes, synthetische personen) | sinds 2 aug 2026 | [EU AI-verordening art. 50(4)](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) |

Volledige rapporten: [Kanalen en benchmarks](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/01-channels-benchmarks.md) · [Referentie-apps en kwaliteitslat](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/02-reference-apps-quality-bar.md) · [Alcoholregels per platform](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/03-alcohol-ad-rules.md) · [AI-content en AI-influencers](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/04-ai-ugc-influencer-rules.md) · [Nederland en Vlaanderen: makers, partners, pers, SEO](https://github.com/mpoons/caveau/blob/claude/optimistic-wozniak-2tlaqt/marketing/onderzoek/05-nl-wine-gtm.md)
