# 04 — AI UGC ads and AI influencers: legal and platform rules (NL/BE, then UK/US, wine context)

**For:** CellarMentor (cellarmentor.com), Ponsen Polutropon B.V. (NL). This covers a later marketing phase.
**Research date:** 13 October 2026.
**Status:** This is a research memo, not legal advice. Before launch, have an advertising lawyer (NL) review it, plus UK/US counsel before entering those markets.

**How sources are marked:**
- **[P]** I read the primary source myself (law text, regulator page, self-regulatory code, or platform policy).
- **[S]** I verified it only through secondary sources such as law firms or the press.
- **[UNVERIFIED]** I could not confirm it.

---

## 0. Summary (one page)

1. **The EU AI Act's labelling duty already applies.** Article 50(4) has applied since **2 August 2026**. It requires deployers to disclose deepfakes. The Commission's guidelines treat a *realistic synthetic person who does not exist* as a deepfake. So every photorealistic AI "customer", AI voice-over-with-face, or AI influencer post must carry a visible AI disclosure at first exposure. The Digital Omnibus delay (to 2 December 2026) covers only *providers'* machine-readable watermarking under Article 50(2). It does not cover your labelling duty. Fines run up to €15M or 3% of turnover; for SMEs, the lower of the two applies.
2. **Presenting an AI person as a real customer is blacklisted in the EU, UK and US.** In the EU it is a per-se unfair practice (UCPD Annex I point 23c; Dutch BW 6:193g(aa)). In the UK it is banned under DMCC Act Sch. 20 para 13. In the US it breaches FTC 16 CFR 465.2. You cannot fix this with small print. The fix is to stop presenting the person as a customer: make it unmistakably a dramatisation by an AI-generated person.
3. **Dutch self-regulation already covers your format.** The RSM 2026 (in force 1 July 2026):
   - names UGC creators and virtual influencers as "Verspreiders";
   - makes the company behind a virtual influencer account responsible;
   - says AI use and virtual influencers "mogen niet misleidend zijn" (art. 4(e));
   - requires "AD/Reclame"-type labels on every promotional post.

   The Stichting Reclame Code (SRC) gives this exact example: an AI person saying they are happy with a product can wrongly suggest a real user experience.
4. **Wine makes this an alcohol-advertising campaign in practice.** Under the Dutch RvA:
   - persons shown in staged or influencer ads must be, and look, **25+**;
   - **NIX18** is required;
   - an **18+ age filter** must be used on platforms;
   - **no alcohol advertising on TikTok** in NL;
   - no health claims, no social or sexual success, no excessive drinking.

   Belgium's convention and the UK CAP Code s.18 have similar 25+ rules. Treat any creative that *shows or refers to wine* as alcohol advertising.
5. **Platforms enforce on their own.**
   - TikTok requires an AI label for realistic AI people and removes unlabelled content. It bans AI depictions of public figures endorsing products.
   - Instagram demotes accounts built around photorealistic AI people that do not use the **"AI-generated profile"** label.
   - YouTube requires disclosure of realistic synthetic scenes.
   - Meta treats ads that depict alcohol consumption as alcohol ads (18+).
6. **Tool licences are a hidden blocker.**
   - **Synthesia** forbids alcohol promotion. It also forbids using stock avatars in paid social ads or endorsements without written consent.
   - **HeyGen** lists alcohol as restricted.
   - **Arcads** forbids misleading advertising and lets actors restrict uses or withdraw them. Customers must then delete the videos, with a contractual €500k-per-breach indemnity.
7. **Performance evidence is thin and mixed.** No independent head-to-head test of *AI UGC versus real UGC* on CPA was found.
   - Ipsos/Syracuse (May 2026) found human-made ads 14–17% stronger on its effectiveness indices.
   - A Facebook field experiment found AI avatars got 38% fewer clicks than a human spokesperson.
   - Disclosure labels reduced engagement or CTR in several studies but not in all.
   - Vendor ROAS claims are anecdotal and in one case internally inconsistent.

**Bottom line:** An AI UGC ad or AI influencer can be lawful in NL/EU only as an **openly synthetic brand character or dramatisation**. Even then it must show the real app UI, make only substantiated claims, use alcohol-compliant creative, and carry layered disclosure. A "fake happy customer" can never be made compliant.

---

## 1. EU AI Act, Article 50 (transparency for synthetic content)

### 1.1 The obligations that matter to CellarMentor

**Art. 50(4), deployers and deep fakes [P].** Deployers of an AI system that generates or manipulates image, audio or video content that is a deep fake "shall disclose that the content has been artificially generated or manipulated".
- For content that is part of an "evidently artistic, creative, satirical, fictional or analogous work", the duty is limited. You must still disclose, but "in an appropriate manner that does not hamper the display or enjoyment of the work".
- Source: [AI Act Art. 50 (consolidated reading)](https://artificialintelligenceact.eu/article/50/); [Commission quick facts](https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems).

**Art. 50(5), timing and form [P].** The information must be given "in a clear and distinguishable manner at the latest at the time of the first interaction or exposure", and must meet accessibility requirements. ([Art. 50](https://artificialintelligenceact.eu/article/50/))

**Art. 3(60), definition of a deep fake [P].** AI-generated or manipulated image, audio or video content "that resembles existing persons, objects, places, entities or events and would falsely appear to a person to be authentic or truthful". ([Commission quick facts](https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems))

**Does a synthetic person who doesn't exist count?** Yes, according to the Commission guidelines [S].
- Greenberg Traurig's summary of the draft guidelines quotes: *"A realistic synthetic depiction of a fictitious but natural-looking person would therefore constitute a deepfake."* The label applies "even if no deception was intended and even if no real individual is depicted."
- Clearly unrealistic or fantastical content (for example, dragons or humans flying unaided) is outside the definition.
- Sources: [GT Law, June 2026](https://www.gtlaw.com/en/insights/2026/6/deepfakes-chatbots-ai-generated-text-european-commission-details-transparency-obligations-under-the-ai-act); [Orrick, Aug 2026](https://www.orrick.com/en/Insights/2026/08/EU-AI-Act-Transparency-Obligations-for-AI-Generated-Content-Article-50).
- **Practical consequence:** a photorealistic AI "user" or influencer counts as a deep fake, so a label is mandatory. A clearly stylised, illustrated or cartoon mascot probably falls outside Art. 50(4). Consumer law (section 2) still applies to it.

**Who is the deployer [S].** The deployer is the party that takes responsibility for the decision to deploy and for how the outputs are used (Guidelines §12, per Orrick).
- A brand that only commissions an agency may not be the deployer. The agency that decides how AI is used may be instead.
- **But if CellarMentor generates content itself, CellarMentor is the deployer.**

**What does *not* satisfy the duty [S]:**
- A notice only in the T&Cs.
- Metadata or watermarks alone, including the tool's own C2PA marks.
- End credits alone.
- A platform label alone. The draft guidelines say "Platform-side labels may complement, but cannot replace, the operator's own disclosure" (GT Law summary).
- For video, disclosure should appear at the start, after interruptions and at intervals. For audio, use a short spoken disclaimer at the start (Orrick summary of the Guidelines).

**Art. 50(1), AI that interacts with people [P].** If the AI influencer will reply to DMs or comments through a chatbot that CellarMentor builds or configures, people must be told they are interacting with AI, unless that is obvious. Strictly this duty sits with the *provider*. If CellarMentor puts its own persona-bot into service under its own name, it may count as the provider. Treat it as applicable. Belgian sector principle 3 says the same: avatars must "zich vanaf het begin identificeren als niet-menselijk" (section 3.6).

### 1.2 Dates (including the Omnibus)

- **2 August 2026:** Art. 50 applies, including the 50(4) deployer labelling duty [P] ([Commission quick facts](https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems)).
- **Content published before 2 August 2026:** no retroactive labelling is required, though it is encouraged [P] (same source).
- **Digital Omnibus on AI:**
  - A provisional deal was reached on 7 May 2026.
  - It gives **providers** of generative AI systems that were already on the market before 2 August 2026 a grace period until **2 December 2026** for the Art. 50(2) machine-readable marking duty.
  - The Commission page mentions this grace period only for 50(2), not for 50(4) [P/S].
  - Sources: [Commission quick facts](https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems); [William Fry](https://www.williamfry.com/knowledge/eu-ai-act-omnibus-deal-reached-postponed-deadlines-watermarking-compromise-and-the-nudificiation-prohibition/); [Bird & Bird](https://www.twobirds.com/en/insights/2026/digital-omnibus-on-ai-provisional-agreement-reached-at-the-may-trilogue).
  - **[UNVERIFIED]:** I could not confirm the Official Journal publication date of the Omnibus.
  - William Fry suggests deployers plan for 2 December 2026 "for the Article 50 labelling and watermarking obligations". The Commission's own page shows no delay for 50(4). **Assume labelling is required now.**

### 1.3 Code of Practice on Transparency of AI-generated Content (2026 status)

- The **final Code was published on 10 June 2026** [P] ([Commission news](https://digital-strategy.ec.europa.eu/en/news/commission-publishes-code-practice-marking-and-labelling-ai-generated-content); [Code page](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content)).
  - **Section 1:** providers' marking and detection, under 50(2).
  - **Section 2:** deployers' labelling of deepfakes and public-interest text, under 50(4).
- **Adequacy assessment [S/P]:** on 8–9 July 2026 the Commission found the Code adequate for Art. 50(2), (4) and (5). The AI Board endorsed this, and the Commission published its opinion on 9 July 2026 ([Commission opinion](https://digital-strategy.ec.europa.eu/en/library/commission-opinion-assessment-code-practice-transparency-ai-generated-content)).
  - Signing is voluntary, and adherence "does not constitute conclusive evidence of compliance".
  - About 190 signatories had signed by end of July 2026 (per the AI Office resources page, via search).
- **Commission Guidelines on Art. 50 [S]:** adopted 20 July 2026 (C(2026) 5054), with another report giving 22 July. They are non-binding but will guide market-surveillance authorities. The guidelines page was last updated 6 August 2026 ([page](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations)). **[UNVERIFIED: exact adoption date; I could not read the guidelines' full text.]**
- **EU icons for labelling [P]** ([EU icons](https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content)). These are free and optional. There are three:
  - a **basic AI icon**, used with a text label;
  - **"Fully AI-generated"**;
  - **"Partially AI-modified"**.

  Placement rules:
  - visible at first exposure;
  - not covered by other elements;
  - embedded in the content so it survives re-shares;
  - accessible (alt text, enough display time).

  "Using the icons does not by itself establish compliance."
- **Recommendation:** use the **"AI GENERATED" icon plus a plain-language text label** burned into the video.

### 1.4 Penalties and enforcement

- **Fines:** up to **€15M or 3% of worldwide annual turnover** for breaches of Art. 50 (Art. 99(4)). For SMEs, the *lower* of the two applies, and proportionality is required [P] ([Commission quick facts](https://digital-strategy.ec.europa.eu/en/factpages/quick-facts-transparency-rules-ai-systems); [GT Law](https://www.gtlaw.com/en/insights/2026/6/deepfakes-chatbots-ai-generated-text-european-commission-details-transparency-obligations-under-the-ai-act)).
- **NL enforcer [S][UNVERIFIED]:**
  - The draft *Uitvoeringswet AI-verordening* was consulted on from 20 April to 1 June 2026.
  - It proposes ten market-surveillance authorities, with the **AP and RDI coordinating**, and the AP as residual supervisor.
  - I could not confirm which authority will enforce Art. 50(4) in NL, or whether the law is in force ([Stibbe](https://www.stibbe.com/nl/publications-and-insights/nederlands-voorstel-voor-ai-toezicht-hybride-samenwerking-tussen-markttoezichtautoriteiten); [Binnenlands Bestuur](https://www.binnenlandsbestuur.nl/juridisch/nederlands-toezicht-op-ai-verordening-bekend)).

---

## 2. EU and Dutch consumer law (UCPD, Omnibus, DSA, BW 6:193)

### 2.1 Blacklisted practices (banned in all circumstances, no materiality test)

UCPD Annex I, as amended by the Omnibus Directive (EU) 2019/2161. Dutch implementation is in **BW 6:193g**, in force since 28 May 2022. The Dutch text below was read on wetten.overheid.nl [P]. **EUR-Lex blocked automated access, so the English wording comes from the Directive as known and cross-checked against the Dutch text.**

**Point 23b → BW 6:193g(z):** "beweren dat beoordelingen van producten zijn ingediend door consumenten die het product daadwerkelijk hebben gebruikt of aangekocht, zonder dat de handelaar redelijke en proportionele stappen heeft genomen om na te gaan of deze beoordelingen daadwerkelijk afkomstig zijn van dergelijke consumenten".

**Point 23c → BW 6:193g(aa):** "het plaatsen of doen plaatsen van valse beoordelingen of aanbevelingen van consumenten of op misleidende wijze voorstellen van consumentenbeoordelingen of sociale media-aanbevelingen, teneinde producten te promoten".
- EN: *submitting or commissioning another person to submit false consumer reviews or endorsements, or misrepresenting consumer reviews or social endorsements, in order to promote products.*

**Point 22 → BW 6:193g(v):** "op bedrieglijke wijze beweren of de indruk wekken dat de handelaar niet optreedt ten behoeve van zijn handel … of zich op bedrieglijke wijze voordoen als consument".

**Point 11 → BW 6:193g(k):** advertorial. Paid editorial content that does not make clear it is an advertisement.

**Material information:** under Art. 7(6) UCPD, BW 6:193e(3) and BW 6:193d(3), information on whether and how you check that reviews are genuine is "essentieel". Not making the commercial intent clear ("het commerciële oogmerk … niet laat blijken") is a misleading omission.

Source: [BW Boek 6, Afd. 3A](https://wetten.overheid.nl/BWBR0005289/2025-01-01/0/Boek6/Titeldeel3/Afdeling3A/Artikel193g).

### 2.2 Is an AI "testimonial" presented as a user experience banned?

**Yes, if it is presented, explicitly or by its overall impression, as a real customer's experience.**

1. A synthetic person saying "I've used CellarMentor for months and it changed how I manage my cellar" is a **false consumer endorsement**. It falls under point 23c / 6:193g(aa).
   - It is created ("doen plaatsen") by the trader to promote its product.
   - It purports to reflect a consumer's experience that never happened.
   - Because it is blacklisted, no proof of consumer harm is needed.
2. Even if 23c were argued not to apply, it would be a **misleading action** under BW 6:193c, through the overall presentation of the endorser's identity and experience. It could also be a **misleading omission** under 6:193d(3).
3. **The ACM's own guidance gives this case as an example [P].** *Leidraad Bescherming Online Consument* (May 2024 version, §4.1.3.2, "reviews van personen die niet bestaan"): quotes from satisfied "consumers" that are not real buyer experiences are "misleiding en mag niet".
   - The review rules "gelden ook als u beoordelingen van influencers of testimonials toont" (§4.1).
   - Recommendations: "Plaats alleen aanbevelingen van consumenten die het product echt hebben gekocht of hebben gebruikt" (§4.2.1).
   - The ACM defines an influencer as "een natuurlijk **of virtueel** persoon" (§6).
   - Source: [ACM Leidraad PDF](https://www.acm.nl/system/files/documents/leidraad-bescherming-online-consument-2024.pdf).
4. **The SRC says the same [P]** (29 July 2026, updated 7 August 2026): "Een door AI gegenereerde persoon die verklaart tevreden te zijn met een product, kan … ten onrechte de indruk wekken dat sprake is van een echte gebruikerservaring." An AI disclosure "maakt misleidende reclame niet toelaatbaar" ([SRC](https://www.reclamecode.nl/nieuws-agenda/nieuws/nieuwe-europese-regels-voor-ai-content-in-reclame/)).

### 2.3 What disclosure makes it lawful

**This is my analysis, built on the sources above.** The UGC *format* (selfie camera, "I" statements, lo-fi look) itself signals "real customer". The disclosure must overturn that overall impression. It does not just add a footnote.

A disclosed AI UGC ad is defensible when **all** of the following hold:

1. **It doesn't claim to be a customer.**
   - Do not say "customer", "user", "review" or "★★★★★".
   - Do not invent biographies such as "Mark, 54, collector from Utrecht".
   - Do not show testimonial captions with names or quote marks.
   - Frame it as a dramatised demo or brand character.
2. **The AI nature is shown at first exposure.**
   - On screen from the first frame and persistent, or repeated.
   - Spoken in the audio where the content is a talking-head video.
   - In the first line of the caption.
   - With the EU icon or the platform AI label as an additional layer (section 1.1).
3. **It is labelled as an ad.** Use "Reclame/AD" (RSM art. 3; Annex I pt 11; BW 6:193g(k)).
4. **The claims are true and can be substantiated.**
   - Anything the AI character "experiences" must match what the app actually does.
   - Show the real UI, not mock-ups that look better than the product.
   - Statements of results (time saved, bottles tracked, money saved) need evidence and must be typical. The FTC's "typical results" logic (section 4.2) is a good benchmark, and BW 6:193c covers this in the EU.
5. **It does not borrow real social proof misleadingly.** For example, do not pair an AI face with real App Store reviews as if they were that person's review.

**Optional and safest:** base scripts on *real*, verified customer feedback, presented as "based on feedback from real CellarMentor users, voiced by an AI-generated presenter". Keep the evidence file. Note: if this is presented as a *review*, 23b-type verification and BW 6:193e(3) information duties apply.

### 2.4 The Digital Services Act (relevance)

- **Art. 26(2):** platforms must let users declare that content is a commercial communication. In practice this is the "paid partnership" or "commercial content" toggles. Use them. The RSM also refers to them (NB2) [P].
- **Art. 35(1)(k):** VLOPs must make deepfakes distinguishable through prominent markings as a risk-mitigation measure. This explains the platform AI labels (section 5). It does not replace your own duty.
- **Art. 28:** protection of minors on platforms. This links to the alcohol age-gating in section 3.4.
- The DSA mostly binds platforms, not advertisers. Its practical effect is that platforms will enforce labelling and remove non-compliant content.

### 2.5 What's coming

- The **Digital Fairness Act** is listed for Q4 2026 in the Commission work programme. The EP legislative train shows "Announced". Influencer marketing is a named topic.
- **[UNVERIFIED]:** whether it has been tabled as of 13 October 2026, and whether it addresses AI or virtual influencers specifically ([EP Legislative Train](https://www.europarl.europa.eu/legislative-train/theme-protecting-our-democracy-upholding-our-values/file-digital-fairness-act)).

### 2.6 Enforcement in NL

- **ACM** enforces BW 6:193a–j under the Whc. It can impose fines and orders subject to periodic penalty (*lasten onder dwangsom*). Examples in the Leidraad §4.2.6: a *last onder dwangsom* on an influencer for fake likes and followers.
- **[UNVERIFIED]:** the exact current maximum fine. The Omnibus framework allows fines of up to at least 4% of turnover for widespread infringements. Check the Whc text.
- **Civil claims:** competitors and consumer collectives can sue under 6:193j/6:194 and class actions (WAMCA).

---

## 3. Dutch and Belgian self-regulation and the Mediawet

### 3.1 RSM 2026 (Reclamecode Social Media & Influencer Marketing), in force 1 July 2026 [P]

Source: [RSM text](https://www.reclamecode.nl/nederlandse-reclame-code/bijzondere-reclamecodes/reclamecode-social-media-influencer-marketing-rsm/); [SRC update news](https://www.reclamecode.nl/nieuws-agenda/nieuws/update-regels-voor-influencers-en-online-content-creators/).

**Virtual influencers are expressly covered.**
- Toelichting art. 2(d): Verspreiders include "User Generated Content (UGC)-creators en virtuele influencers. **Bij accounts van virtuele influencers worden de eigenaren/het bedrijf achter het account aangemerkt als Verspreider.**"
- CellarMentor B.V. would therefore be both the *Adverteerder* and the *Verspreider*.

**Art. 4(e):** "De toepassing van technieken zoals kunstmatige intelligentie in reclame en/of het gebruik van virtuele influencers mogen niet misleidend zijn."

**Art. 4(d):** no systematic or bulk creation or use of false or non-existent identities to post about a product, and no fake likes or followers.
- The NB clarifies that virtual influencers and characters are *not* banned where "duidelijk is dat het om een niet-bestaand persoon gaat".
- **This is the key line: a persona is allowed if it is clearly non-existent.** A network of AI "fans" or "customers" commenting is banned.

**Art. 4(a)–(c):** no misleading editing of posts. If you show selected UGC (for example only positive comments), say so.

**Art. 3, disclosure:**
- Model labels for paid ads: "AD/ad", "Reclame", "Advertentie", "Advertorial", "(Betaald) partnerschap", "(Betaalde) promotie", "(Betaalde) samenwerking", or the platform feature, combined with tagging or naming the advertiser.
- For **own-brand** content: "AD/ad", "Reclame", "Advertentie" or "Advertorial".
- **Placement:**
  - visible "in één oogopslag";
  - the first word or sentence of every text block;
  - in videos, at the start or during the promotion, or continuously as text, **and** first in the description;
  - every Story frame labelled separately;
  - every platform labelled.
- A label only in the bio is insufficient.
- "#adv" and "#spon" are *not* listed as model labels in RSM 2026. Use **"Reclame"** or **"AD"** instead.

**Art. 6, advertiser duty of care:** inform, contractually bind, actively monitor and act. A contract clause alone is not enough. This was confirmed in RCC 2026/00028 (Tylko, 10 March 2026), where an "@" tag plus discount codes was ruled not a sufficient disclosure ([ruling](https://www.reclamecode.nl/uitspraak/?uitspraakId=610262)).

**Art. 7:** the NRC (arts. 7–8 misleading, 11 recognisability) and the special codes, including the **RvA**, apply alongside the RSM.

### 3.2 SRC rulings on AI or virtual influencers

- **No RCC ruling specifically on an AI-generated testimonial persona or a virtual influencer was found [UNVERIFIED].**
- Closest precedent [S]: **RCC 2024/00613** (around February 2025). Website reviews were presumed not to come from real customers because the advertiser did not dispel the doubt. AI-made songs were wrongly described as personally composed. Both breached NRC art. 7 ([Lexology summary](https://www.lexology.com/library/detail.aspx?g=cad35a68-296c-485c-9624-6f73582426a9)).
- The **burden of proof sits with the advertiser** in practice. Keep evidence.
- The SRC published sample AI disclosure texts on 29 July 2026 [P] (see section 7).

### 3.3 Mediawet (video-uploaders)

Source: [SRC Mediawet-uploader](https://www.reclamecode.nl/mediawet-uploader/); [CvdM news](https://www.cvdm.nl/nieuws/commissariaat-voor-de-media-start-toezicht-op-video-uploaders/).

**Cumulative criteria [P/S].** An account is under active CvdM supervision if:
1. it is on YouTube, Instagram and/or TikTok;
2. it posted at least 24 videos in the last 12 months;
3. it earns money or other benefit from them;
4. the benefit goes to a KvK-registered company.

Further points:
- The 500k-follower threshold was dropped on **16 June 2025**. Registration with the CvdM (*meldplicht*) applies from **100k followers**.
- Uploaders that advertise must join the SRC.
- Rules include recognisable advertising and sponsorship, protection of minors, and alcohol rules under the Mediawet/AVMSD.
- **[UNVERIFIED]:** whether a brand-owned AI persona account promoting the company's own app meets criterion 3. Run the CvdM *registratiecheck* if the persona posts at least 24 videos a year.

### 3.4 Reclamecode voor Alcoholhoudende Dranken (RvA, last amended 1 April 2024) [P]

Source: same reclamecode.nl page as above (RvA section).

**Scope.** "Reclame voor alcoholhoudende drank" means "iedere openbare en/of systematische directe dan wel indirecte aanprijzing van alcoholhoudende drank door een adverteerder of geheel of deels ten behoeve van deze".
- CellarMentor sells software, not drink. But creatives showing people enjoying, pouring or "discovering" wine can be argued to be *indirect* promotion of alcohol.
- **[UNVERIFIED: no ruling on a cellar or wine-app case found.]**
- **Recommendation: treat any creative that shows wine consumption, wine as a lifestyle reward, or calls to drink as in scope.** UI-only or inventory-only creatives are lower risk.

**Persons shown, art. 11:**
- In general, no one under 18 or who evidently looks under 18.
- In staged scenes with scripts or models hired by the advertiser, and in collaborations: **no one who is under 25 or "evident jonger lijken dan 25 jaar"**.
- Influencers used for payment: also **25+ and looking 25+**.

**Influencers, art. 23(6):** "Verspreiders die een relevante relatie hebben met een adverteerder dienen minimaal 25 jaar oud te zijn en te lijken." Posts must carry "#Ad, #advertentie" or another RSM label.

**Virtual or AI persons [analysis, UNVERIFIED by any ruling]:** the code does not mention AI persons. The test "evident jonger lijken dan 25" is about **appearance**, which fits a synthetic person directly. Design every AI person to look clearly over 25. Aim for an apparent age of 30–55 to leave margin, since the ASA *Absolut* case shows regulators judge perceived age even when real IDs show 25+.

**Social media, art. 23:**
- **NIX18** logo in the image of every internet image ad (art. 23(2), art. 32). Influencers may instead put "NIX18" or "#NIX18" in the description or image (art. 32(5)).
- **18+ age filter** where the platform offers one, for both organic content and ads (art. 23(3)(c)). The code names YouTube, Instagram, Facebook and X.
- Comments from users must be 18+ verified or self-declared (art. 23(3)(d)–(e)).
- No liking or reposting of accounts not shown to be 18+.
- Targeting must use 18+ as a selection criterion (art. 23(4)).
- **TikTok: "Het is niet toegestaan om reclame voor alcoholhoudende dranken te maken op het platform TikTok"**, including via Verspreiders (art. 23(7)).

**Reach, art. 20:** no medium whose audience is more than 25% minors. **[UNVERIFIED]:** the "at least 75% of followers 18+" figure in the brief. It appears only as reported *industry practice* in a government-commissioned study, not as a code clause ([officielebekendmakingen blg-990920](https://zoek.officielebekendmakingen.nl/blg-990920.pdf)). Art. 20's "no more than 25% minors" is the codified equivalent.

**Content rules:**
- art. 1: no excessive drinking;
- art. 2: no negative portrayal of abstinence;
- **art. 6: no health or performance claims**;
- art. 7: no drinking at work;
- **art. 8: no social or sexual success**, including "before/after" social-success storylines;
- art. 9: not aimed at pregnant women;
- art. 10: nothing appealing to minors, such as youth language or teen idols;
- art. 13: no risky behaviour;
- art. 17: no traffic;
- art. 19: no "gratis" alcohol and no alcohol as prizes.

### 3.5 Belgium (BE launch)

**Alcohol convention ("version 2.0"), signed 9 October 2024, in effect January 2025 [S]:**
- Persons are or look 25+.
- Sponsored influencers are 25+ and look it.
- **No alcohol ads on social networks without age-gating, e.g. TikTok and Snapchat.**
- Educational slogan: "Alcoholmisbruik schaadt de gezondheid" / "L'abus d'alcool nuit à la santé".
- The convention binds only its signatories, but the JEP applies it ([Andersen BE](https://be.andersen.com/en/news/new-soft-law-rules-for-alcohol-advertising)).

**2026 government measures [S][UNVERIFIED legal status and date].** The federal government approved stricter rules around March 2026 ([Brussels Times](https://www.brusselstimes.com/belgium/2306891/belgium-is-changing-how-alcohol-is-marketed-will-it-change-drinking-habits)):
- a mandatory "alcohol schaadt de gezondheid" warning;
- an ad ban in media with at least 30% minor audience;
- restrictions on influencers mainly followed by minors.

**Influencer bill [S]:** Bill 56K1706 on digital commercial influence was introduced 24 August 2026 and is pending.

### 3.6 Belgian sector principles "AI in Reclame — 12 duidelijke principes" (Raad voor de Reclame, 7 August 2025) [P]

Source: [PDF](https://raadvoorreclame.be/app/uploads/2025/08/RvR25-AIinAdvertising-NL.pdf); [news](https://raadvoorreclame.be/raad-voor-reclame-lanceert-12-richtlijnen-voor-ethisch-ai-gebruik/). The JEP monitors principles **3 and 8** in particular.

**Principle 3:**
- Clear disclosure when content is AI-generated, "vooral bij afbeeldingen van echte personen en virtuele interacties".
- "chatbots, avatars of AI-assistenten moeten zich vanaf het begin identificeren als niet-menselijk".
- Suggested labels: "AI-gegenereerde afbeelding", "Gemaakt met AI-ondersteuning", "Dit is een AI-assistent".

**Principle 8:** respect personality rights, "inclusief beeld, stem en gelijkenis". Get contractual consent before imitating a recognisable person's likeness, voice or persona.

**Principle 5:** no targeting or influencing of children or vulnerable people.

---

## 4. UK and US

### 4.1 UK: ASA/CAP and the DMCC Act 2024

**There are no AI-specific CAP rules. Existing rules apply in full** [P] ([CAP, 29 May 2025, "Disclosure of AI in advertising"](https://www.asa.org.uk/news/disclosure-of-ai-in-advertising-striking-the-balance-between-creativity-and-responsibility.html)).
- "No blanket legal requirement in the UK to disclose the use of AI in ads."
- **Disclosure will not cure a misleading message.** Example: AI cosmetic results.
- Making clear that an influencer is AI-generated *may* remove an otherwise misleading impression.

**June 2026 ASA guidance "AI and deepfakes: four things advertisers need to know" [S]** ([Lewis Silkin](https://www.lewissilkin.com/insights/2026/06/18/asa-warns-on-ai-generated-content-and-deepfakes-102n4o1); [ASA](https://www.asa.org.uk/news/ai-and-deepfakes-four-things-advertisers-need-to-know-before-they-hit-run.html)):
- Deepfakes of real people must not suggest a genuine endorsement.
- The advertiser stays responsible for AI and automated output (*Stripe & Stare*).
- AI imagery is judged for harm and offence like any other (*Polyverse*).

**CAP Code testimonials [P]** ([CAP Code s.3](https://www.asa.org.uk/type/non_broadcast/code_section/03.html)):
- **3.45:** incentivised reviews must be disclosed.
- **3.46:** reviews must not be published misleadingly.
- **3.47:** "Marketers must hold documentary evidence that a testimonial or endorsement … is genuine, **unless it is obviously fictitious**", plus contact details.
- 3.49: factual claims in testimonials must not mislead.
- 3.50: permission is needed.
- **So an AI testimonial is only possible if it is "obviously fictitious".**

**CAP Code s.18, alcohol [P]** ([s.18](https://www.asa.org.uk/type/non_broadcast/code_section/18.html)):
- It applies to marketing communications that "feature or refer to alcoholic drinks". **A wine-cellar app ad showing wine is in scope.**
- 18.14: must not appeal particularly to under-18s.
- 18.15: no medium with more than 25% under-18 audience.
- **18.16: "People shown drinking or playing a significant role must neither be nor seem to be under 25."** The ASA judges perceived age (*Absolut*, *Southern Comfort*).
- **18.17:** no health, fitness or weight-control claims.

**DMCC Act 2024, Sch. 20 (consumer provisions in force 6 April 2025) [P]** ([legislation.gov.uk](https://www.legislation.gov.uk/ukpga/2024/13/schedule/20); [CMA208 fake reviews guidance](https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf)):
- **para 13(1):** banned to submit or commission "a fake consumer review".
  - A "consumer review" is "a review of a product, a trader or any other matter relevant to a transactional decision".
  - A "**fake consumer review**" is one "that purports to be, but is not, based on a person's genuine experience".
- **para 25:** banned to falsely represent oneself as a consumer.
- **para 12:** advertorial.
- **Penalties [S]:** the CMA can fine directly, up to 10% of global turnover. The CMA's soft-landing period ended around mid-2025.

### 4.2 US: FTC

**Rule on the Use of Consumer Reviews and Testimonials, 16 CFR Part 465.** Announced 14 August 2024, effective 21 October 2024 [P] ([FTC press release](https://www.ftc.gov/news-events/news/press-releases/2024/08/federal-trade-commission-announces-final-rule-banning-fake-reviews-testimonials); [§465.1](https://www.law.cornell.edu/cfr/text/16/465.1); [§465.2](https://www.law.cornell.edu/cfr/text/16/465.2)).
- A **"consumer testimonial"** is "an advertising or promotional message … that consumers are likely to believe reflects the opinions, beliefs, or experiences of a consumer" who used the product.
- **§465.2(a):** it is unfair or deceptive for a business to "write, create, or sell" a testimonial that materially misrepresents "**that the reviewer or testimonialist exists**", that they used the product, or their experience.
- **§465.2(b):** disseminating one that the business knew or should have known was fake is also covered.
- The FTC said the rule targets "AI-generated fake reviews".
- **Civil penalties:** up to **$53,088 per violation**. The 2025 level is unchanged for 2026 [S] ([16 CFR 1.98](https://www.federal-regs.com/title/16/part-1/1.98/)).

**Endorsement Guides, 16 CFR Part 255 (revised 2023) [P/S]** ([§255.0](https://www.law.cornell.edu/cfr/text/16/255.0); [§255.2](https://www.law.cornell.edu/cfr/text/16/255.2); [FTC 2023 release](https://www.ftc.gov/news-events/news/press-releases/2023/06/federal-trade-commission-announces-updated-advertising-guides-combat-deceptive-reviews-endorsements)):
- The definition of endorsement was broadened to reach **virtual influencers** and fake reviews.
- **§255.2(c):** an ad presenting endorsements by what appear to be "actual consumers" "should utilize actual consumers in both the audio and video, **or clearly and conspicuously disclose** that the persons … are not actual consumers".
- **"Clear and conspicuous" (§255.0(f)):**
  - for video, in both the visual and audible portions;
  - on social media, "unavoidable";
  - not contradicted by other content.
- **Typical results:** §255.2(b) applies.

**New York synthetic performer law [S]:** GBL §396-b as amended (S.8420-A/A.8887-B), **in effect 9 June 2026** ([Cooley](https://www.cooley.com/news/insight/2026/2026-01-29-new-york-enacts-synthetic-performer-disclosure-law-for-advertisements-including-those-using-generative-ai); [Ashurst Perkins Coie](https://www.ashurstperkinscoie.com/en/insights/new-york-requires-disclosure-of-synthetic-performers-in-ads/); [McDermott](https://www.mcdermottlaw.com/insights/new-yorks-synthetic-performer-disclosure-law-what-advertisers-need-to-know/)).
- Ads must **conspicuously disclose a "synthetic performer"**, meaning an AI-generated digital asset that appears to be a human performer but is not an identifiable real person, where the advertiser has actual knowledge.
- Audio-only ads are excluded.
- Penalties: $1,000 for a first violation, then $5,000.
- **This applies directly to AI UGC actors in US ads reaching New York.**

**US alcohol context [analysis]:** TTB advertising rules (27 CFR Part 4) bind industry members, not a software company. Platform alcohol policies still apply (Meta and TikTok in the US use **21+**). **[UNVERIFIED]:** the Wine Institute code's model-age rule. It is relevant only as a benchmark.

---

## 5. Platform rules

### 5.1 Meta (Facebook, Instagram)

**Organic AI content:**
- Meta "will require people to use this disclosure and label tool when they post organic content with a photorealistic video or realistic-sounding audio that was digitally created or altered, and we may apply penalties if they fail to do so" [P] ([Meta, Feb 2024](https://about.fb.com/news/2024/02/labeling-ai-generated-images-on-facebook-instagram-and-threads/)).
- The label is "AI info" [P] ([Labeling AI content](https://transparency.meta.com/governance/tracking-impact/labeling-ai-content/)).

**Ads [P]** ([Meta help, AI in ads](https://www.meta.com/en-gb/help/artificial-intelligence/355108217670024/); [Meta, Feb 2025](https://about.fb.com/news/2025/02/gen-ai-transparency-metas-ads-products/)):
- Ads made or materially edited with Meta's generative tools get "AI info".
- **If the image includes "an AI-generated photorealistic human", the label shows next to "Sponsored".**
- Third-party AI ads are detected through industry signals such as C2PA and labelled in "About this ad".
- Mandatory advertiser self-disclosure is formally required only for social-issue, election and political ads.
- **[UNVERIFIED]:** vendor-blog claims that a mandatory disclosure toggle for *all* commercial ads exists in 2026. I found no Meta primary page confirming it.

**AI persona accounts on Instagram:**
- Instagram's recommendation guidelines say it avoids recommending accounts that "repeatedly and recently shared content that prominently features a photorealistic AI-generated person, **unless the account has disclosed this by adding the AI-generated profile label**" [P, via help-centre snippet] ([Instagram Help: Recommendations](https://help.instagram.com/313829416281232/)).
- The label was renamed from "AI creator" to "AI-generated profile" on about 31 August 2026 [S] ([MediaPost](https://www.mediapost.com/publications/article/417580/instagram-limits-reach-for-creator-profiles-withou.html)).

**Branded content:** use the paid partnership label or the platform's branded content tool. The RSM accepts the platform feature as a label, and RvA age-gating often only works through it (RSM NB2) [P].
- **[UNVERIFIED]:** I found no Meta primary policy page on whether *virtual creators* qualify for the branded content tool.

**Alcohol [P]** ([Meta alcohol ad policy](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/alcohol)):
- Ads depicting "alcohol consumption", alcohol brands or logos count as alcohol promotion.
- They must follow local law and target 18+ (21+ in the US).
- **CellarMentor ads showing wine drinking fall under this.**

### 5.2 TikTok

**Community Guidelines, "Edited Media and AI-Generated Content (AIGC)" (2026 H2 version) [P]** ([guidelines](https://www.tiktok.com/community-guidelines/en/integrity-authenticity)):
- "We **require** creators to label AI-generated or significantly edited content that shows realistic-looking scenes or people. Unlabeled content may be removed, restricted, or labeled by our team."
- Labelling can be done via the AIGC label or a clear caption, sticker or watermark.
- Disclosure is not needed for anime-style art or generic TTS that is not a recognisable voice.

**Not allowed:**
- "Using the likeness of private figures without consent".
- AIGC showing "**a public figure … supporting products … they haven't actually addressed**".
- AI images of youth in adult clothing or poses.
- Anything breaking impersonation or misinformation rules.

**Branded content:** disclosure is required when "Posting branded content, including reviews or endorsements, and receiving any kind of incentive" [P] (same page).

**Symphony AI avatars:** TikTok says content made with Symphony is automatically labelled as AI-generated [S] ([TikTok newsroom](https://newsroom.tiktok.com/en-us/tiktok-symphony-updates)). **[UNVERIFIED]:** the exact Ads Manager "AI disclosure" toggle mechanics.

**Alcohol [P/S]:**
- TikTok's ad policy requires featured people to be **25+**, no excessive drinking, a responsible-drinking disclaimer, and market-specific approval ([TikTok alcohol ad policy](https://ads.tiktok.com/help/article/tiktok-ads-policy-alcohol)).
- The **branded content policy reportedly prohibits creators promoting alcohol** [S] ([Harper's](https://harpers.co.uk/news/fullstory.php/aid/33148/TikTok_opens_doors_to_alcohol_advertising_in_the_US.html)).
- **Decisive for NL/BE:** RvA art. 23(7) bans alcohol advertising on TikTok, and the BE convention bans it on non-age-gated networks. **On TikTok, CellarMentor creatives must contain no wine consumption or promotion.** At most, show UI and inventory shots, or skip TikTok for wine-led creatives.

### 5.3 YouTube and Google Ads

**YouTube altered or synthetic content [P]** ([YouTube Help](https://support.google.com/youtube/answer/14328491)):
- Creators must disclose realistic content that is generated or meaningfully altered, including content that "generates a realistic scene that didn't actually occur".
- Labels go on the player for sensitive topics, otherwise in the description.
- YouTube may auto-label (C2PA or detection).
- Repeat non-disclosure can lead to penalties, including removal from YPP.

**Google Ads Misrepresentation [P]** ([policy](https://support.google.com/adspolicy/answer/6020955)):
- "Manipulating media to deceive, defraud, or mislead others is not allowed."
- No false implied backing by brands or organisations.
- No omitting material information about your identity.

**Google Ads Alcohol [P]** ([policy](https://support.google.com/adspolicy/answer/6012382)):
- NL, BE, UK and US allowed with targeting restrictions.
- No minors drinking, no health benefits, no social or sexual success.

**[UNVERIFIED]:** a general Google Ads synthetic-content disclosure duty for *commercial* ads. The formal requirement covers election ads.

### 5.4 Platform summary

| | AI label required for realistic AI person | Ad or partnership label | Alcohol constraint for wine-themed creative |
|---|---|---|---|
| Meta/IG | Organic: yes (photorealistic video/audio). Ads: auto "AI info". Persona: "AI-generated profile" or reach is demoted | Paid partnership tool | 18+ targeting (21+ US); RvA 18+ filter, NIX18 |
| TikTok | Yes, removal risk | Commercial content toggle | **NL/BE: do not advertise wine at all** |
| YouTube | Yes ("realistic scene") | Paid promotion checkbox | 18+ age-restriction (RvA art. 23(3)(c)) |

---

## 6. AI UGC tools: commercial terms and likeness rights

| Tool | Relevant terms found | Status |
|---|---|---|
| **Synthesia** | AUP (last updated 23 February 2024) bans "Using the Services to promote or advertise age restricted goods, services or venues, **including alcohol**". Stock avatars may not be used to make viewers think the real actor holds or endorses your opinions, except on enterprise plans. Stock avatars may not appear in "promoted", "boosted" or "paid" social ads **without Synthesia's written consent**. The licensing table lists paid ads on FB, IG, YT and TikTok as not allowed for stock avatars. Custom avatars need the person's consent. | [P] [AUP](https://www.synthesia.io/legal/acceptable-use-policy); [licensing](https://help.synthesia.io/en/articles/6341928-synthesia-video-licensing) |
| **HeyGen** | Moderation policy lists **alcohol** under restricted goods and services. Avatars may not display "deceptive imagery, including through likenesses". Custom avatars and avatars of real people need explicit consent, and the actor can request removal of their likeness. Impersonation leads to account removal. | [P] [moderation policy](https://www.heygen.com/moderation-policy) |
| **Arcads** (FRESHR SAS, Paris) | Videos are licensed, not assigned. Edits are limited to a fixed list. Customers may not "carry out misleading or deceptive advertising" or use content that "infringes the rules of ads platforms" or "the rules of influence". Users may not clone the Creator or modify their image or voice. **Creators may restrict their Video Model to certain fields of activity.** On a Creator withdrawal request, the customer must delete the videos everywhere, with €100 per day for delay. Uncured breach: **€500,000 lump-sum indemnity per breach**. The TikTok integration makes the customer responsible for the commercial and AI-label toggles. | [P] [terms](https://www.arcads.ai/terms) (fetched 13 October 2026; no version date visible) |
| **Creatify** | Terms (effective 23 September 2024) forbid content that is "deceptive, fraudulent", infringes "right of publicity", or "impersonates". Customer indemnifies Creatify. No alcohol clause found in the ToS. A separate moderation policy exists but was not reviewed. | [P] [terms](https://creatify.ai/terms); **[UNVERIFIED: moderation policy]** |
| **Captions** (Mirage) | Terms reviewed: generic. Inputs and outputs may be used to improve services. Mirage won't commercialise your voice standalone without permission. No alcohol or testimonial clause found. | [P] [terms](https://www.captions.ai/terms) (partial review) |

**Likeness rights of the actors behind avatars [analysis]:**
- Stock "AI actors" are real people licensed through the vendor. Your rights are only as wide as the vendor licence.
- If the actor's image is used outside their consent scope (for example alcohol, endorsements or paid ads where excluded), you face several risks:
  - **portrait-right claims** (NL Auteurswet art. 21; reasonable interest, especially with commercial exploitation);
  - GDPR claims (face and voice are personal data);
  - takedown under the vendor contract.
- Belgian principle 8 and TikTok's "likeness of private figures without consent" ban point the same way.
- **Prefer a fully synthetic, never-real face designed in-house, or a custom avatar of a contracted adult 30+ performer.** Use a written release covering alcohol context, paid social, AI modification, territories, duration and withdrawal.
- **Never clone a real customer's face or voice** without a specific written release, and label it as AI-voiced.

---

## 7. Recommended disclosure wording (NL / EN)

The SRC's example texts [P] ([SRC 29 July 2026](https://www.reclamecode.nl/nieuws-agenda/nieuws/nieuwe-europese-regels-voor-ai-content-in-reclame/)):
- "De persoon in deze reclame is met behulp van AI gegenereerd"
- "Deze stem is met behulp van AI gegenereerd of gemanipuleerd"
- "Deze video bevat door AI gegenereerde beelden"

The SRC warns that vague labels such as "gemaakt met technologie" or "digitally created" may be insufficient.

### 7.1 AI UGC ad (video)

**On-screen, from frame 1 and persistent (or at least the first 3 seconds and again at the CTA), plus the EU "AI GENERATED" icon:**
- NL: **`Reclame · AI-gegenereerde persoon – geen echte klant`**
- EN: **`Ad · AI-generated person – not a real customer`**

**Spoken at the start, in the AI voice or a neutral VO:**
- NL: *"Dit is een reclame van CellarMentor. Ik ben een AI-gegenereerde presentator, geen echte gebruiker."*
- EN: *"This is an ad for CellarMentor. I'm an AI-generated presenter, not a real user."*

**Caption, first line:**
- NL: `Reclame | Gedramatiseerde demo met een AI-gegenereerde persoon en stem. Getoonde schermen zijn de echte CellarMentor-app. #NIX18`
- EN: `Ad | Dramatised demo with an AI-generated person and voice. Screens shown are the real CellarMentor app. 18+ only.`

**If the script is based on real feedback:**
- NL: `Gebaseerd op feedback van echte gebruikers, ingesproken door een AI-presentator.`
- EN: `Based on real user feedback, presented by an AI-generated presenter.`

**BE:** add `Alcoholmisbruik schaadt de gezondheid` where alcohol is shown. Check the new legal warning text **[UNVERIFIED status]**, likely "Alcohol schaadt de gezondheid".

**US (incl. NY GBL 396-b):**
`Ad. This video features an AI-generated synthetic performer, not an actual customer.`

### 7.2 AI influencer (persistent persona)

**Bio:**
- NL: `Virtueel AI-personage van CellarMentor (Ponsen Polutropon B.V.). Geen echt persoon. Mijn posts over CellarMentor zijn reclame. 18+ #NIX18`
- EN: `AI-generated virtual character by CellarMentor. Not a real person. My posts about CellarMentor are ads. 18+ only.`

Also switch on Instagram's **"AI-generated profile"** label, the TikTok/YouTube AI labels and the platform paid-partnership label.

**Each promotional post, first line:**
- NL: `Reclame | AI-personage van @cellarmentor`
- EN: `Ad | AI character by @cellarmentor`

**Persona speaking about the app** (no fake experience claims; it is a guide or character, not a user):
- NL: *"Ik ben Vera, de AI-gids van CellarMentor. Ik laat je zien hoe je je kelder bijhoudt."*
- EN: *"I'm Vera, CellarMentor's AI guide. Let me show you how to track your cellar."*

**DM or comment auto-replies:**
- NL: `Je chat met een AI-assistent van CellarMentor.`
- EN: `You're chatting with CellarMentor's AI assistant.`

---

## 8. Go-live checklist (NL/EU, wine context)

**A. Governance**
- [ ] Name an owner and a reviewer: a 4-eyes legal and brand review of every asset and script.
- [ ] Keep an evidence file per asset:
  - prompt and log;
  - tool and licence version;
  - the actor or avatar licence scope;
  - claim substantiation;
  - real-feedback source if used;
  - screenshots of disclosures as published.
- [ ] Record whether CellarMentor or an agency is the **AI Act deployer**. Contractually require the agency to label (Art. 50(4)) and to comply with the RSM and RvA (RSM art. 6 duty of care).
- [ ] Use a tool whose licence allows **alcohol-adjacent content, paid social ads and an endorsement-style script**. Get written confirmation from the vendor.
  - Synthesia stock avatars: **not usable** (alcohol and paid-ads bans).
  - HeyGen: alcohol is restricted, so get written clearance.
  - Arcads: check each Creator's field restrictions and plan for withdrawals.

**B. Content: AI UGC ads**
- [ ] The person is clearly synthetic-by-disclosure (section 7.1), not presented as a customer. No names, ages, locations or "verified buyer" cues.
- [ ] Disclosure is visible at first exposure (frame 1), audible in talking-head videos, first in the caption, and backed by the EU icon. Use the platform AI label in addition, not instead.
- [ ] "Reclame/AD" label plus the platform commercial-content toggle.
- [ ] Only real app UI. No exaggerated mock-ups.
- [ ] Every factual claim (features, time saved, bottles, prices, ratings) is substantiated and typical.
- [ ] No star ratings, review counts or "#1" claims unless real, current and verified (BW 6:193g(z), (aa)).
- [ ] Apparent age of everyone shown: **clearly over 25**. Target an apparent age of 30+, checked by 2 or more reviewers.
- [ ] No drinking scenes on TikTok (NL/BE). Elsewhere, wine shown only moderately: standard glass, no "emptying in one go", no social or sexual success, no health claims, no driving or work. NIX18 in the image.
- [ ] Targeting 18+ (EU/UK), 21+ (US). Exclude youth-skewed placements (RvA art. 20 / CAP 18.15).
- [ ] UK version: obviously fictitious (CAP 3.47), CAP s.18 compliant. US version: §255.2(c) "not actual consumers" disclosure plus the NY synthetic-performer disclosure.

**C. AI influencer**
- [ ] The persona is designed as a **brand character** (for example "AI sommelier-guide"), with no fake life story implying real consumption experiences.
- [ ] Apparent age 30–55. Not youth-coded: no teen slang, school or festival-youth aesthetics, or Sinterklaas-style themes (RvA art. 10).
- [ ] Bio disclosure, Instagram "AI-generated profile" label, and an "AD/Reclame" label on every promotional post and every Story frame.
- [ ] **The 18+ age filter is ON** for the account on YouTube, Instagram and Facebook (RvA art. 23(3)(c)). Comments are limited to 18+ where possible.
- [ ] No TikTok wine content in NL/BE.
- [ ] No fake followers, likes, comment armies or other AI "fans" (RSM art. 4(d); BW 6:193g(aa); FTC 16 CFR 465.8).
- [ ] Any AI chat or DM replies identify as AI at the start.
- [ ] Mediawet check: if the account posts at least 24 videos a year, run the CvdM *registratiecheck*. Register with the CvdM at 100k or more followers, and join the SRC if required.
- [ ] Moderation plan: escalation for minors in comments and for misinformation about wine and health.

**D. Before each market**
- [ ] BE: check the status of the 2026 alcohol measures and the warning text. Check JEP AI principles 3 and 8.
- [ ] UK: CAP s.18 and s.3 review, and DMCC check.
- [ ] US: FTC Part 465/255 review, NY GBL 396-b, and other state laws **[UNVERIFIED: other states]**.

---

## 9. Red lines (never do)

1. **Never present a synthetic person as a real customer, user, sommelier or collector.** No "real review", "verified user", named testimonial or "I've been using it for 6 months" from an AI person (UCPD 23c / BW 6:193g(aa); DMCC Sch 20 para 13; 16 CFR 465.2).
2. **No fake or AI-written star ratings, review counts, app-store screenshots or "X happy users" claims** without verified data (23b/23c; BW 6:193g(z)).
3. **No AI "comment armies", fake followers or likes, or sock-puppet accounts** (RSM 4(d); ACM Leidraad §4.2; 16 CFR 465.8).
4. **No fake before/after**, whether social success through wine (RvA art. 8) or fabricated app results and screens.
5. **No persona or actor that is, or looks, under 25** in anything showing or referring to wine (RvA art. 11, 23(6); CAP 18.16; BE convention; TikTok 25+).
6. **No health or benefit claims about wine** (for example antioxidants, heart, relaxation or sleep). No performance or "better at work" claims (RvA art. 6–7; CAP 18.17; Google Alcohol).
7. **No excessive or irresponsible drinking.** No drinking with driving, sport or work. No pregnancy. No "gratis" alcohol or alcohol prizes (RvA arts. 1, 9, 13, 17, 19).
8. **No wine advertising on TikTok in NL/BE.** No youth-skewed channels (RvA art. 20, 23(7)).
9. **No deepfakes of real people:** celebrities, sommeliers, wine critics or customers. No voice clones without a specific written release. Do not imply endorsement by real wineries or critics (TikTok AIGC rules; ASA deepfake guidance; Google Misrepresentation; portrait rights).
10. **Never hide or remove the AI disclosure** (cropping, re-uploading without labels, stripping C2PA). The Code of Practice also expects providers to forbid users from removing marks.
11. **No use of stock avatars outside the licence**: alcohol, paid ads, endorsements.

---

## 10. Risk assessment

**Likelihood (L) and impact (I) scale:** H = high, M = medium, L = low. Ratings assume **no** mitigation versus **with** the checklist.

| Risk | Without controls (L/I) | With checklist (L/I) | Notes |
|---|---|---|---|
| **Legal: blacklisted fake endorsement** (ACM, SRC, competitors) | H/H | L/M | Per-se ban. SRC complaints are cheap for competitors or NGOs. The ACM explicitly targets non-existent reviewers. |
| **Legal: AI Act Art. 50(4) non-labelling** | H/M | L/L | Fines are theoretical early on (NL enforcer still being set up) but reputationally linked. |
| **Legal: alcohol self-regulation breach** (RvA, STIVA monitoring) | M/M | L/L | STIVA monitors influencer alcohol ads; it reported 97% compliance in 2024 [S]. A wine-app falls into a grey area of scope. |
| **Legal: UK DMCC / US FTC** | M/H | L/M | DMCC fines up to 10% of turnover. FTC $53,088 per violation. NY $1k–5k. |
| **Contract: AI tool licence** | M/H | L/M | Synthesia alcohol and paid-ad bans. Arcads €500k per breach plus takedown on withdrawal. |
| **Platform: removal, reach demotion, account strikes** | H/M | L/L | TikTok removes unlabelled realistic AIGC. Instagram demotes unlabelled AI persona accounts. Meta and TikTok alcohol targeting rules. |
| **Platform: ad account suspension** (misrepresentation, alcohol misconfiguration) | M/H | L/M | A single ad account is a concentration risk for a small B.V. |
| **Reputational: "fake people selling wine software"** backlash among a trust-sensitive, older, affluent audience | M/H | M/M | IAB 2026: consumers more likely than executives to see AI-using brands as "manipulative" (20% vs 10%) and "unethical" (16% vs 7%). |
| **Brand: authenticity erosion** | M/M | M/L | Mitigate by mixing in real customer UGC, keeping the persona as an openly fictional guide, and showing the founder or human team. |
| **Reputational: AI persona errors** (wrong wine facts, health hallucinations in auto-replies) | M/M | L/M | Human review of all replies, and no autonomous posting. |

**Overall:** AI UGC as *disclosed dramatisation* is **medium-low risk**. A *disguised fake customer* is **high risk and unfixable**. An *AI influencer* is **medium risk**: a long-running exposure surface, alcohol age rules, platform labels and audience trust. Pilot it on Instagram and YouTube (18+ gated) before scaling.

---

## 11. Evidence: AI UGC versus real UGC performance

**I found no independent, controlled head-to-head study of AI UGC versus real creator UGC on CPA or ROAS.** The best available evidence is indirect:

| Source | Design | Finding | Bias / caveats |
|---|---|---|---|
| **Ipsos and Syracuse Univ., 18 May 2026** [P] ([Ipsos](https://www.ipsos.com/en-us/ai-ads-are-good-enough-and-thats-problem)) | 10 human brand ads versus 10 AI remakes (Gemini plus Sora 2); 3,000 US consumers | Human ads **+14%** short-term Creative Effect Index and **+17%** long-term Equity Effect Index. Only 25% of viewers were confident an AI ad was AI. 79% want companies to disclose AI. | Vendor-authored; proprietary metrics; brand TV-style ads, not UGC; one toolchain; US only |
| **IAB and Sonata Insights, 15 January 2026** [P] ([IAB](https://www.iab.com/insights/the-ai-ad-gap-widens/)) | Survey of 505 US Gen Z and Millennials plus 104 ad executives | 45% of consumers positive on AI ads versus 82% of executives who think they are. Gen Z 39% negative. 73% say knowing AI was used would increase purchase likelihood or make no difference. More than half want disclosure of fully AI ads. | Survey, not behaviour; US; younger cohort (CellarMentor's audience is likely older) |
| **Field experiment on Facebook, JTAER 2026, vol. 21(10):337** [S] ([DOI](https://doi.org/10.3390/jtaer21100337)) | 2×2 test (AI avatar versus human spokesperson × authorship disclosure); 384 ads; fixed budget | AI avatar: **+25% video plays, −13% reach, −38% clicks**. Disclosure had **no significant effect**. | Algorithmic delivery, not fully randomised. **Full text not accessible (403); figures from abstract via search.** |
| **NYU and Emory (Lee et al.), reported 20 December 2025** [S] ([The Decoder](https://the-decoder.com/telling-consumers-an-ad-is-ai-generated-cuts-clicks-by-31-percent-study-finds/)) | Google Display field test plus survey | Fully AI-generated ads **+19% CTR** versus human. AI disclosure cut CTR by about **31.5%**. | **Primary paper not located [UNVERIFIED]**; banner ads, not UGC |
| **Carney, Riveros & Tully (USC), JCR forthcoming** [S] ([SSIR](https://ssir.org/articles/entry/ai-disclosures-social-media-disengagement)) | About 1M TikTok posts before and after TikTok's 2023 AI-label rule, plus experiments | AI disclosures reduce engagement through lower perceived creator effort and weaker parasocial bonds. Effort-signalling, specific labels reduce the penalty. | No effect size in the summary; working paper |
| **Patil & Rice, J. Business Research, June 2026** [S] ([MediaCat](https://mediacat.uk/ai-disclosure-when-it-does-and-doesnt-hurt-brands/amp/)) | 8 studies including Meta data | AI disclosure **−2.23 pp CTR**. The penalty is stronger for "handmade" or craft framing and weaker when machine efficiency fits the product. | Secondary report. **Relevant:** a *tech product* like a cellar app may suffer less than a craft product. |
| **Vendor claims, Arcads** [S] ([Motion talk](https://motionapp.com/library/talk/generate-100s-of-winning-ai-ads-for-facebook-discover-how/)) | Co-founder case studies | "$0→$800k MRR with only AI UGC"; "2.28× ROAS" | **Strong vendor bias. The ROAS figure is internally inconsistent** (its listed values average about 4.1×). Anecdotal. |
| **Vendor claims, Billo** [P] ([Billo blog](https://billo.app/blog/ai-generated-ads-performance/)) | Literature roundup | Argues human UGC wins | **Sells human UGC, so it has the opposite bias** |

**Takeaways for CellarMentor:**
1. AI UGC's real advantage is **speed and creative volume for testing hooks**, not proven better conversion.
2. Since disclosure is **mandatory** in the EU anyway, the relevant comparison is *disclosed AI UGC versus real UGC*. Some studies show a disclosure penalty and others none.
3. Specific, effort-signalling labels perform better than generic "made with AI" labels. For example: "AI presenter, real app, scripted from real user feedback".
4. A tech-utility product is the best case for AI acceptance (Patil & Rice; NIM: AI ads fare better for tech-oriented products [S]).
5. **Run your own holdout test:** real-customer UGC versus disclosed AI UGC, the same hook, 18+ targeted. Judge on CPA and trial-to-paid, not CTR.

---

## 12. Things I could not verify (consolidated)

- The Official Journal publication of the AI Omnibus, and whether any change touches Art. 50(4) dates. The Commission page indicates none.
- The exact adoption date (20 versus 22 July 2026) and full text of the Commission's Art. 50 guidelines. I relied on law-firm summaries.
- Which Dutch authority enforces Art. 50(4), and the status of the Uitvoeringswet AI-verordening.
- Current ACM maximum fine amounts under the Whc.
- Any RCC/SRC ruling on an AI persona or virtual influencer. None was found.
- The "at least 75% of followers 18+" alcohol influencer rule. It is not in the RvA text; it is only reported as industry practice. The RvA uses "no more than 25% minors" and the 18+ filter.
- Whether the RvA applies to a non-drinks advertiser (an app) whose ads show wine. My recommendation to treat it as applicable is a conservative judgement.
- Whether a brand-owned AI persona is a "video-uploader" under the Mediawet.
- The legal status, effective date and exact health-warning wording of the 2026 Belgian alcohol measures.
- Whether Meta has a mandatory AI disclosure toggle for all commercial ads, and whether virtual creators are eligible for the branded content tool.
- TikTok's branded content alcohol ban (secondary sources only) and its Ads Manager AI-disclosure mechanics.
- Creatify's moderation policy (not reviewed), and Captions' full AUP.
- The primary NYU/Emory paper, and the full text of the JTAER field experiment.
- US state laws beyond New York (for example California), and the Wine Institute code model-age rule.
