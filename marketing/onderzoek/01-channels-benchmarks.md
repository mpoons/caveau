# CellarMentor: acquisition channels and conversion benchmarks (research, 13 Oct 2026)

**Scope.** This file covers six questions for CellarMentor: where paying subscribers come from, funnel benchmarks, paid-media costs for the Netherlands and Western Europe, wine-app comparables, payback math, and which channels to prioritise. For context, CellarMentor is a Dutch-first wine-cellar PWA. Its paid plan, Plus, costs €2.99/month including VAT, is sold through Stripe and has no annual plan and no trial. The owner's budget limit is a cumulative loss of no more than €1,000.

**How to read this.** Every number has its source and date next to it. If I could not find a sourced number, I say so. Numbers marked **[A]** are my own arithmetic or assumptions and are labelled as such. Most subscription benchmarks come from app-store apps with RevenueCat or Adapty SDKs, not from web apps or PWAs. They are useful for orders of magnitude only. Section 7 lists the main comparability problems.

---

## 0. Bottom line (TL;DR)

1. **Paid ads cannot pay back a €2.99 monthly plan.** Net revenue is about €2.16–2.18/month. On the base churn curve, a paying subscriber is worth roughly €10 in year 1 and about €7 within six months **[A]**. Dutch Meta traffic costs about 0.86/click (Superads, Jul 2025–Jul 2026; currency not labelled). Typical click→signup is about 7–9% (Unbounce, LocaliQ), and freemium download→paid is about 2% (RevenueCat 2026). Together that implies roughly **€100–500 of ad spend per paying subscriber [A]**. That is 10–50× what a subscriber is worth. A €1,000 test would probably produce only 2–12 paying subscribers **[A]**.
2. **Nearly all comparable wine apps grew organically.** Vivino says 95% of its user growth was organic (company claim, 2020), and Similarweb attributes 59% of vivino.com desktop visits to organic search (Sep 2026). CellarTracker was self-funded and grew organically for about two decades, with renewal rates "above 90%" (US Chamber, Apr 2026). None of the wine apps I researched shows evidence of being built on paid acquisition.
3. **Most conversion happens on day 0.** About 50% of paid conversions happen on the install day (RevenueCat SOSA 2026), and 80–90% of trials start on day 0 (RevenueCat 2025, Adapty 2026). For CellarMentor, the upgrade prompt should appear at the moment the user first gets value, for example right after the first label scan or wine-list read. A monthly email is the wrong moment.
4. **Pricing structure matters more than channel choice at this budget.**
   - Annual plans keep 48–54% of subscribers after one year, against 12–22% for monthly plans (RevenueCat SOSA 2025).
   - An annual price of €24.99–29.99 nets €19.85–23.88 upfront **[A]**. That is about twice the year-1 value of a monthly subscriber, and it removes the cash-flow risk.
   - Stripe's fixed €0.25 fee takes about 10% of every €2.99 charge, so annual billing also cuts fees.
   - Adding a discounted annual plan next to monthly is the most consistently reported pricing win, although the evidence is vendor case studies (Superwall).
   - Hard paywalls convert about 5× better than freemium (10.7% vs 2.1% download→paid at day 35, RevenueCat 2026). CellarMentor's free AI credits make it freemium. A tighter free credit allowance, or a short trial of Plus, is worth testing.
5. **Recommended channel order** (detail in section 6):
   1. The in-product upgrade moment and a referral loop.
   2. Dutch SEO and programmatic content: drinking windows, food pairing, vintage charts.
   3. Partnerships with wine merchants, wine clubs and wine courses.
   4. Wine communities and PR in Dutch and Belgian media.
   5. Nano and micro wine creators, ideally paid by affiliate commission.
   6. Small high-intent Google Search tests.
   7. Meta only as a capped €150–300 learning test, and only once an annual plan exists.

   I do not recommend TikTok, YouTube ads, or app-store ads for CellarMentor (it is not in the stores).

---

## 1. Where do paying conversions come from (by acquisition source)?

### What exists
- **I found no credible public dataset that splits paid subscribers by acquisition source for small or indie consumer subscription apps.** Search results were vendor blogs with unsourced percentages. That includes the "65–70% of iOS installs come from App Store search" figures repeated by ASO tools such as trysonar.app, which name no primary study.
- **Apple's own claim:** about 70% of App Store visitors use search to discover apps, and almost 65% of downloads happen directly after a search ([Apple Ads](https://searchads.apple.com/advanced); a long-running claim, cited since at least 2019–2021). **This does not apply to CellarMentor**, which is a PWA outside the stores. It is still a reminder that *intent search* is the dominant discovery route for apps. For a PWA, the equivalent is Google web search.
- **Google/Ipsos research:** "one in four app users discover apps through a search engine" ([Think with Google, Mobile App Marketing Insights PDF](https://thinkwithgoogle.com/_qs/documents/2922/mobile-app-marketing-insights_5.pdf); older study, c. 2016, US).
- **Paid vs organic share of installs (not revenue)**, from AppsFlyer, "State of Subscriptions for Marketers 2026" (data Oct 2024–Feb 2026, [link](https://www.appsflyer.com/resources/reports/subscription-marketing-report/)):
  - Android paid share of installs rose from 43% to 51%.
  - iOS paid share rose from 30% to 34%.
  - Utility & Productivity, North America iOS: paid share rose from 33% to 51%.
  - **Interpretation:** across all subscription apps on AppsFlyer, roughly 50–66% of installs are still organic. AppsFlyer's customers are paid-UA spenders, so the real organic share for small apps is likely higher. That is a survivorship and selection bias.
- **Wine-specific evidence that organic channels dominate:**
  - Vivino: "95% of its user growth has been organic" (CEO Heini Zachariassen to Retail TouchPoints, 2020, [link](https://retailtouchpoints.com/topics/digital-commerce/e-commerce-experience/covid-19-has-transformed-wine-shopping-heres-how-vivino-is-adapting); repeated in a [Harvard Digit case](https://d3.harvard.edu/platform-digit/submission/vivino-or-how-i-tricked-my-friends-into-thinking-im-a-sommelier/)). This is company-reported and unaudited.
  - Vivino "spent very little on marketing to date" (TechCrunch, 3 Feb 2021, [link](https://techcrunch.com/2021/02/03/vivino-raises-155-million-for-wine-recommendation-and-marketplace-app)).
  - Similarweb (Sep 2026, [vivino.com](https://www.similarweb.com/website/vivino.com/)): organic search is 59.06% of desktop visits. Of keyword traffic, 95.26% is organic and 4.74% paid. These are estimates.
  - CellarTracker (Similarweb, Sep 2026, [link](https://www.similarweb.com/website/cellartracker.com/)): direct is 56% of desktop visits and organic search is #2. That fits a loyal-user, word-of-mouth product.
- **Referral quality, the only rigorous study I found:** Schmitt, Skiera & Van den Bulte, *Journal of Marketing* 75 (Jan 2011) ([PDF](https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf)):
  - Referred customers are worth **at least 16% more** than comparable non-referred customers.
  - A 2013 follow-up summary reports about **18% lower churn** ([GfK MIR 2014](https://reference-global.com/download/article/10.2478/gfkmir-2014-0020.pdf)).
  - Caveat: the data is from a German bank, not an app. The app-specific referral statistics on vendor sites (GrowSurf, Cello, Talkable: "+37% D30 retention" and similar) are unsourced or circular, so I have not used them.

### Web-based funnels (web2app or web checkout) vs store
- **FunnelFox, State of Web2App 2026** (Jan 2026, 2025 data, [link](https://funnelfox.com/state-of-web2app-2026)):
  - Web funnels convert at 3.0% final conversion vs 1.5% in-app, which FunnelFox reports as "2×".
  - Only 13% of web-funnel users reach the paywall.
  - Europe accounts for about 14.2% of web2app revenue.
  - **Netherlands price index is 1.62× the US.** Dutch web funnels charge more.
  - Revenue mix by plan length: 1-month plans 48.8%, 1-year plans 12.2%.
  - Revenue mix by offer: no-trial offers 56.8%, paid trial 28.9%, free trial 14.3%.
  - Monthly-plan retention is about 10% at month 12.
  - **Vendor bias:** FunnelFox sells web funnels.
- **Adapty SOIS 2026** (2025 data, 16k apps, [link](https://adapty.io/state-of-in-app-subscriptions-report/)):
  - Install→paid is **1.60% in-app vs 1.10% on web**, so web is lower here, contradicting FunnelFox.
  - US web paywalls retain better at month 1 (64.5% vs 46.2%) but worse at month 6 (20% vs 30%).
  - LTV is $35.8 on web vs $40.1 in-app.
- **RevenueCat controlled test** on one app, Dipsea (US, May 2025, about 12.5k users, [link](https://www.revenuecat.com/blog/growth/iap-vs-web-purchases-conversion-test)):
  - Initial conversion: 27.0% for IAP-only vs 18.1% for web-only.
  - Conversion to paying: 6.3% vs 5.3%.
  - Web-only kept about **93¢ per IAP dollar** after the 30% store fee.
  - Most of the drop-off was at the payment step: 70.9% of CTA taps converted with IAP vs 44.4% on web.
- **RevenueCat SOSA 2026:** web revenue is **3.2% of total** globally and 4.9% in North America. 41% of top-tier apps sell on the web vs 1.3% of the smallest apps ([SaaStr summary, Mar 2026](https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth); [RevenueCat report page](https://www.revenuecat.com/state-of-subscription-apps)).
- **Implication for CellarMentor:** CellarMentor is web-only already, so it pays no 15–30% store fee and keeps about 88% of the ex-VAT price. The cost is friction at payment. The Dipsea test shows the card or checkout step loses about 25–45% of buyers relative to Apple Pay IAP.
  - Offer **iDEAL/Wero** (Dutch default, €0.29 per payment at Stripe), Apple Pay and Google Pay in Stripe Checkout.
  - Keep checkout to a single screen.
  - FunnelFox reports that 60% of web2app payments are Apple Pay.

---

## 2. Funnel benchmarks

### 2a. Download or visit → paid (RevenueCat SOSA 2026, 2025 data, 115k apps, [report page](https://www.revenuecat.com/state-of-subscription-apps), [utilities page](https://www.revenuecat.com/state-of-subscription-apps-2026-utilities/), [RC blog 19 Mar 2026](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026.md))

| Segment | D30 download→trial | D35 download→paid | Trial→paid |
|---|---|---|---|
| All apps (median) | ~5–6% (most non-gaming categories) | 2.0% | — |
| **Western Europe** | **5.0%** | **2.0%** | **29.7%** |
| North America | 7.1% | 2.8% | 34.2% |
| Health & Fitness (closest consumer category with data) | 6.9% | 2.9% (top quartile 6.2%) | 37.7% |
| Utilities | 6.5% | n/a in visible text | — |
| **Hard paywall** | — | **10.7%** (top quartile 20.0%; 12.1% in 2025 edition) | — |
| **Freemium** | — | **2.1%** (2.18% in 2025 edition) | — |
| High-priced apps | 8.9% | 2.8% | — |
| Low-priced apps | 4.4% | 1.4% | — |

- **Food & Drink and Social & Lifestyle:** RevenueCat does not publish category figures for these in its public text. The PDF has 11 category breakouts. **No sourced figure is available.**
- **Adapty Lifestyle** (blog, 9 Apr 2026, [link](https://adapty.io/blog/lifestyle-app-subscription-benchmarks/)):
  - Monthly and annual *direct* conversion is below 4% across all price tiers.
  - Lifestyle install-to-paid with no trial is quoted as "18–38%" in Adapty's 2025 summary. **This is not a download→paid rate.** It appears to be paywall-view→paid or similar, so treat it as suspect.
  - Median one-year install LTV in Lifestyle is $0.70, 7th of 8 categories.
  - The top 10% of Lifestyle apps capture 97.9% of category revenue.
- **Adapty SOIS 2026 global funnel:** install→trial 11.2%, trial→paid 27.8% ([link](https://adapty.io/state-of-in-app-subscriptions-report/)).
- **AppsFlyer Lifestyle** (data Oct 2024–Feb 2026): install→trial 3.9%, trial→paid 41% ([link](https://www.appsflyer.com/resources/reports/subscription-marketing-report/)).
- **Web/SaaS proxies:**
  - Unbounce: median landing-page conversion is **6.6%** across industries. Food & beverage ecommerce pages reach about 7.1% (newer Unbounce benchmark report; exact year not shown; [link](https://unbounce.com/conversion-benchmark-report/ecommerce-conversion-rate/)).
  - B2B freemium→paid: 3.7% average (First Page Sage, via [Userpilot](https://userpilot.com/blog/freemium-saas/)). Mostly B2B, so a weak proxy.

### 2b. Hard paywall vs freemium
- **RevenueCat 2026:**
  - Hard paywall download→paid is 10.7% vs 2.1% for freemium, about 5×.
  - Revenue per install at day 60 is **$3.09 vs $0.38**, about 8×.
  - 1-year retention of yearly subscribers is about equal: 27% (hard paywall) vs 28% (freemium).
  - ([RC blog, 19 Mar 2026](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026.md))
- **RevenueCat 2025:**
  - Monthly-plan retention after 1 year: hard paywall 12.8% vs freemium 9.3%.
  - Refund rate: 5.8% vs 3.4% ([SOSA 2025 page](https://revenuecat.com/state-of-subscription-apps-2025)).
- **Adapty 2026:** median one-year LTV is $24 for hard paywalls vs $20 for soft paywalls ([link](https://adapty.io/blog/lifestyle-app-subscription-benchmarks/)).
- **Bias warning:** hard-paywall apps self-select. They are usually apps with strong paid-UA funnels and high-intent users. The 5× gap is correlation, not a guaranteed effect.

### 2c. Trials (length and impact)
- **RevenueCat 2026 trial→paid by trial length:**
  - 17–32 days: 42.5%.
  - 5–9 days: 37.4%.
  - 4 days or less: 25.5%.
  - 46.5% of apps now use trials of 4 days or less.
  - ([report utilities page](https://www.revenuecat.com/state-of-subscription-apps-2026-utilities/))
- **Day-0 cancellations (RevenueCat 2026):** 55.4% of 3-day-trial cancellations happen on day 0. The day-0 share is 39.8% for 7-day trials and 35.7% for 14-day trials ([SaaStr summary](https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth)).
- **Adapty 2025:** "direct paywalls lead to higher conversion than trials in most categories," but trial users show **up to 64% higher LTV** (16 Jul 2025, [link](https://adapty.io/blog/state-of-in-app-subscriptions-2025-in-10-minutes/)).
- **Adapty 2026:**
  - Trials raise first-renewal rates by 8–60% depending on plan.
  - **In Lifestyle, trial users are about 21% *less* valuable than direct buyers.**
  - About 90% of trial starts happen on day 0.
  - 7 in 10 apps offer trials.
- **FunnelFox (web):** 56.8% of web2app revenue comes from no-trial offers.
- **Read-across for CellarMentor:**
  - Trial evidence is mixed for lifestyle apps.
  - A short trial is mostly valuable as a way to show Plus value on day 0.
  - CellarMentor already gives 20 free AI credits, which works as a usage-based trial.
  - The bigger lever is *when* the upgrade is offered.

### 2d. Day-0 conversion share
- **RevenueCat 2026:**
  - **50.6% of paid conversions happen on day 0.**
  - Productivity: 71.9%. Education: 28.5%.
  - North America: 44.2%.
  - ([report page](https://www.revenuecat.com/state-of-subscription-apps); one section of the page also says "about one-third," which is an internal inconsistency).
- **Trial starts on day 0:**
  - 82% (RevenueCat 2025 commentary, [link](https://revenuecat.com/state-of-subscription-apps-2025)).
  - 89.4% (Adapty 2026, [link](https://adapty.io/blog/lifestyle-app-subscription-benchmarks/)).

### 2e. Plan mix (annual vs monthly)
- **RevenueCat 2026:**
  - Overall: 42% monthly, 34% yearly.
  - **Western Europe: 41% monthly, 35% yearly.**
  - Annual's share of subscriptions fell from 41.4% to 33.6% year on year.
  - ([utilities page](https://www.revenuecat.com/state-of-subscription-apps-2026-utilities/))
- **Adapty 2026:**
  - Weekly plans are 55.5% of App Store subscription revenue.
  - Lifestyle: 31% weekly, 29% monthly, 26% one-time.
  - A median annual plan costs about 3× a median monthly plan.
- **FunnelFox web (2025):** 1-month plans are 48.8% of web2app revenue; 1-year plans are 12.2%.

### 2f. Churn and retention, monthly vs annual
| Metric | Value | Source |
|---|---|---|
| 1-yr retention, annual plans | 53.7% (low-priced), 48.3% (high-priced) | RevenueCat SOSA 2025 |
| 1-yr retention, monthly plans | 22.5% (low-priced), 16.4% (mid-priced), 12.2% (high-priced) | RevenueCat SOSA 2025 |
| 12-mo retention, monthly (non-AI vs AI apps) | 9.5% vs 6.1% | RevenueCat SOSA 2026 via [TechCrunch 10 Mar 2026](https://techcrunch.com/2026/03/10/ai-powered-apps-struggle-with-long-term-retention-new-report-shows) |
| 12-mo retention, annual (non-AI vs AI) | 30.7% vs 21.1% | same |
| Monthly plan, day-90 / 1-yr retention | 43% / 17% | Adapty, 16 Jul 2025 |
| Day-380 retention, annual / monthly / weekly | 19.9% / 14.2% / 5.5% | Adapty 2026 Lifestyle blog |
| Monthly (web2app) retention at month 12 | ~10% | FunnelFox, Jan 2026 |
| Share of annual cancellations in month 1 | ~30% (2025); 35% (2026) | RevenueCat 2025 / 2026 |
| Wine-specific: CellarTracker renewal | "historically above 90%" (annual, voluntary payers) | [US Chamber, 15 Apr 2026](https://uschamber.com/co/good-company/the-leap/cellartracker-ai-user-growth) |

- **CellarMentor is an AI app.** RevenueCat 2026 says AI apps churn about 30% faster and have 36% worse 12-month retention, while monetising better early (+41% year-1 realized LTV, the revenue actually collected per payer) ([RC blog](https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026.md)).
- On the other hand, the CellarTracker figure suggests wine collectors with an inventory, a "sticky" data asset, churn far less than average app users. That figure comes from a single company and is self-reported.

### 2g. Prices (median, Europe, lifestyle)
- **RevenueCat 2026:**
  - Monthly median is about $8–10 (the page states both).
  - Yearly median is $34.80, up from $31.60.
  - Western Europe weekly median is $7.03 and yearly about $39.44.
  - Typical bands: $7.99–9.99 monthly, $29.99–39.99 yearly.
  - Western Europe annual LTV per payer is $26.64, vs $26.07 in North America.
- **Adapty 2025:**
  - Europe averages: weekly $8.3, **monthly $13.3**, annual $42.
  - Refund rate in Europe is about 2.3%.
- **Adapty 2026:**
  - European prices rose 18% year on year.
  - Europe is now the most expensive region for weekly, monthly and annual plans, up to 40% above North America.
  - **No Europe-specific Lifestyle or Food & Drink median price is published in the text.** No sourced number.
- **FunnelFox:** Netherlands web price index is 1.62 (US = 1.00).
- **RevenueCat 2026 pricing effect:** high-priced apps reach $62.19 year-1 realized LTV per payer vs $10.69 for low-priced apps. High-priced apps also have *higher* download→trial (8.9% vs 4.4%).
  - **Caveat:** this is selection, not causation. Strong apps price higher.
- **Implication:** at €2.99/month, CellarMentor sits at roughly a quarter to a third of the European monthly median. Price is not the barrier. Awareness and the value moment are.

---

## 3. Paid acquisition cost benchmarks (Netherlands and Western Europe, 2025–2026)

**Important:** almost all public "cost per trial / cost per subscriber" data is for **app-install campaigns** (CPI). CellarMentor would run **web-traffic or web-conversion** campaigns, so CPC or CPM plus its own funnel is the relevant input.

| Channel / metric | Value | Source & date | Notes |
|---|---|---|---|
| Meta CPM, NL, all industries | avg ~14.2; monthly range 7.2 (Jul 2025) – 29.5 (Jul 2026) | [Superads NL CPM](https://www.superads.ai/facebook-ads-costs/cpm-cost-per-mille/netherlands), window Jul 2025–Jul 2026 | Currency not labelled (likely USD). Global baseline ~20.6. Vendor dataset (>$3B spend, ecommerce-heavy). |
| Meta CPC, NL, all industries | avg ~0.86; 0.33–1.53 | [Superads NL CPC](https://www.superads.ai/facebook-ads-costs/cpc-cost-per-click/netherlands), same window | "Local currency" (EUR?). Global ~1.04. |
| Meta CPM / CPC projections NL / BE / DE | NL $9.20 / $1.35; BE $8.40 / $1.20; DE $10.05 / $1.45 | [AdAmigo 2026](https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026) | Projections, not measured. Low reliability. |
| Meta global CPM | $14.19 (2025, +20% YoY) | [Triple Whale](https://www.triplewhale.com/blog/facebook-ads-benchmarks) | Ecommerce brands. |
| Meta traffic campaigns, CTR / CPC | 1.93% / $0.60 (Restaurants & Food: 2.68% / $0.45) | [LocaliQ, updated 23 Sep 2026](https://localiq.com/blog/facebook-advertising-benchmarks/) | US SMB advertisers. |
| Meta lead campaigns, CVR / CPL | 8.54% / $27.39 | same | US. Use as a proxy for click→signup. |
| Meta CPI, subscription Health & Fitness / Productivity (iOS median) | $7.80 / $6.20 | [RocketShip HQ, 29 Mar 2026](https://www.rocketshiphq.com/meta-cost-benchmarks-mobile-app-installs/) | App installs, Tier-1 (US-like). Western Europe "20–40% lower". Unsourced "industry + client" data. |
| Meta cost per trial (anecdote) | $40 per trial at $8 CPI | [RevenueCat Meta Ads masterclass notes](https://marcuscnslt.substack.com/p/revenuecat-meta-ads-masterclass) | One advertiser, not a benchmark. |
| Meta learning phase | ~50 optimisation events per ad set per week | [Adapty blog, 22 Jun 2026](https://adapty.io/blog/meta-ads-subscription-apps/) (citing Meta guidance) | At €1k total budget you can **never** optimise for purchases. |
| CPI, Western Europe, all apps | iOS $3.40 / Android $1.85 (worldwide $2.24 / $1.12) | [The Social Outline, 21 Jun 2026](https://thesocialoutline.com/blog/mobile-app-cpi-benchmarks-2026), citing a Searchlab 2026 compilation of Adjust/AppsFlyer data | Secondary, and not verified against the primary sources. App installs, so not directly relevant to a PWA. |
| TikTok CPM / CPC, NL | $4.60–8.80 / $0.38–0.95 | [Stackmatix, 2026](https://stackmatix.com/blog/tiktok-ads-cost-by-country-2026) | Undated, no methodology. Low reliability. |
| TikTok global CPM | $13.26 (2025) vs $11.43 (2024) | [Influee](https://influee.co/blog/tiktok-ads-benchmarks) | Influencer-platform vendor. |
| Google Search CPC, NL all industries | €0.95 | [CodeDesign "Google Ads cost Europe" (2025 guide)](https://codedesign.org/google-ads-cost-europe-your-complete-guide/) | No source named. A Dutch agency ([Searchlab](https://searchlab.nl/statistieken/google-ads-benchmarks-per-branche-2026)) says no traceable Dutch benchmarks exist. |
| Google Search, Restaurants & Food: CPC / CVR / CPL | $2.05 / 8.05% / $30.57 | [LocaliQ, updated 1 Jun 2026](https://localiq.com/blog/search-advertising-benchmarks/) | US. All-industry: $5.42 CPC, 8.18% CVR. |
| Google Search, UK food & drink CPC | £1.84 (2025) → £2.18 (2026) | [Visionary Marketing](https://visionary-marketing.co.uk/blog/google-ads-benchmarks-2026) | UK survey. |
| Google Search CPC for "wine app" / "wijn app" / "wijnkelder app" | **No sourced number found** | — | Must be checked in Google Keyword Planner (free with a Google Ads account). Expect low volumes. |
| YouTube CPV | $0.03–0.30 | [Kontentino glossary (nl-BE)](https://www.kontentino.com/nl-BE/social-media-urban-dictionary/cpv-betekenis/) | Wide, unsourced range. $0.02–0.10 for ecommerce ([TopGrowth 2026](https://topgrowthmarketing.com/?p=45139)). |
| Apple Search Ads cost per tap, Health & Fitness | $1.20–3.00 | [Admiral Media](https://admiral.media/apple-search-ads-benchmarks/) | N/A: CellarMentor is not in the App Store. |
| Influencers, NL (Instagram feed post) | nano (1–10k followers) €50–250; micro (10–100k) €250–2,500 | [Searchlab 2026](https://searchlab.nl/kosten/wat-kost-influencer-marketing) | Indicative agency price list. Shopify NL quotes micro at €100–500. |
| Meta ad reach NL | Facebook 7.50M (40.8%), Instagram 8.15M (44.4%) at end 2025 | DataReportal via [Searchlab](https://searchlab.nl/statistieken/social-media-statistieken-nederland-2026) | Secondary. Meta ad-reach estimates are not active users. |

**Cost per paying subscriber for European subscription apps:** **No public sourced benchmark found.** Adapty, AppsFlyer and Liftoff do not publish a European cost per subscriber in their public summaries. The most recent Liftoff EMEA figure I found is from 2022 (dating apps: $116.51 per purchase in Europe, [Liftoff 2022 Dating Apps Report](https://content.liftoff.io/hubfs/aaa_Reports/2022/2022%20Dating%20Apps%20Report%20-%20EN.pdf)). It is outdated and a different vertical.

**Derived web-funnel cost per payer for CellarMentor [A]:**
- Pessimistic: €0.86 CPC ÷ (8.5% click→account × 2.1% account→paid) ≈ **€480 per payer**.
- Optimistic: €0.86 ÷ (20% × 5%) ≈ **€86 per payer**.
- Sources for the inputs: LocaliQ lead CVR 8.54%, RevenueCat freemium D35 2.1%, Superads NL CPC.
- The optimistic case assumes the top-quartile freemium rate (4.5%, RevenueCat 2026) and a strong landing page. **A €1,000 budget therefore buys about 2–12 paying monthly subscribers.**

---

## 4. Wine-app comparables

| App | Users / scale | Premium price | Model | How they acquired users (evidence) |
|---|---|---|---|---|
| **Vivino** (DK, 2010) | 77.7M+ users, 3.51B labels scanned ([vivino.com/about](https://www.vivino.com/about), © 2026). NL App Store text: "65 miljoen gebruikers/app-downloads". 50M in Feb 2021, 29M in 2018 ([TechCrunch 2021](https://techcrunch.com/2021/02/03/vivino-raises-155-million-for-wine-recommendation-and-marketplace-app)). 13M→29M in 2016–2018 ([VentureBeat, 14 Feb 2018](https://venturebeat.com/ai/wine-discovery-app-vivino-raises-20-million-as-its-ecommerce-business-takes-off)) | **NL App Store IAP: €4.99 and €4.69 (likely monthly); €45.00–€47.90 (likely annual); €59.99** ([apps.apple.com/nl](https://apps.apple.com/nl/app/vivino-koop-de-juiste-wijn/id414461255), fetched Oct 2026; durations not labelled) | Freemium plus marketplace (about $250M in sales in 2020) | **Label scanning as the habit hook.** "95% of user growth organic" (CEO, 2020; company claim). "Spent very little on marketing" (TechCrunch 2021). SEO: 59% of desktop visits from organic search; 95% of keyword traffic organic (Similarweb, Sep 2026; estimates). Funding $221M total (2021). |
| **CellarTracker** (US, 2003–04) | ~10M users worldwide; ~$21B of wine tracked; paying subscribers tripled "over the past few years" ([US Chamber, 15 Apr 2026](https://uschamber.com/co/good-company/the-leap/cellartracker-ai-user-growth)). App Store claims 8.8M+ users. Older figures (47k active, 11k payers; 120k active, about 1/6 paying) are undated and unverified. | Suggested annual amounts by cellar size: **$40 (≤100 bottles), $60, $80, $160, $320, $500 (2,500+)**; pay-what-you-want. $4.99/month via Apple ([CT support, updated 16 Dec 2025](https://support.cellartracker.com/article/25-voluntary-payment)) | Strong free tier; paid tier unlocks valuations, enhanced drink windows, alerts and AI (CellarChat) | Organic growth over about 20 years, self-funded until 2020; community tasting-note database (13M+ notes); integration with Wine-Searcher. Renewal rate above 90%. Similarweb: 56% direct traffic, 59% of traffic from the US. Is building a restaurant wine-list tool (a direct overlap with CellarMentor). |
| **InVintory** (CA/US) | No user count disclosed | **Premium $149.99/yr** (USD; free trial, length unstated); Elite custom ([invintory.com/pricing](https://invintory.com/pricing/), Oct 2026). Launch pricing 2021: Prestige $9.99/mo or $99/yr ([Wine Industry Advisor, 7 Oct 2021](https://wineindustryadvisor.com/2021/10/07/wine-app-invintory-launches/)) | Free unlimited tracking plus premium 3D cellar ("VinLocate") | **Raised $1.5M (Oct 2022) and a $2.3M seed (Nov 2024), "led by users"** ([press page](https://invintory.com/press)). Tactics: celebrity/NBA athlete investors and ambassadors; Decanter wine-club free memberships (May 2023); luxury and lifestyle PR (Robb Report, goop gift guide, Sharp); sponsored content; B2B hospitality and storage; Superyacht wine-club partnership (Jun 2026). |
| **VinoCell** (iOS) | n/a | **One-time €9.99 / $9.99, no IAP** ([App Store DE](https://apps.apple.com/DE/app/id521577043); [App Pricing Lab](https://apppricinglab.com/app/apple/521577043)) | Paid app | App Store search (no data). |
| **Cellar Book / CellarBook** | n/a (a v1.0 iOS app found, [mwm.ai](https://mwm.ai/apps/cellarbook-wine-cellar/6789513114)) | **No sourced price found** | Local and iCloud storage | — |
| **Hello Vino** (US, 2009) | n/a | Free; **no premium price found** | Free app; later a DTC wine subscription | Press reviews (old). |
| **Delectable** | 1M+ downloads, 120k monthly users **in 2016**, when acquired by Vinous/Antonio Galloni ([AppDeveloperMagazine, Dec 2016](https://appdevelopermagazine.com/vinous-acquires-delectable-and-banquet-wine-apps/)) | Free | Critic and sommelier social network; funnel into Vinous subscriptions | Expert and sommelier community. |
| **Wine-Searcher** (NZ/UK) | ~20M listings ([12x75, Jul 2026](https://www.12x75.com/best-wine-apps/)) | **Pro from US$9.49/month** ([CellarTracker support](https://support.cellartracker.com/article/77-integration-with-wine-searcher)); older annual £72.99 / $73.99 / €82.99 ([Circle of Wine Writers](https://www.circleofwinewriters.org/the-benefit-of-going-pro-on-wine-searcher/), c. 2023) | Free plus Pro; ads; merchant listings | SEO on wine names and prices (no quantified data found). |
| **Caviste** (FR, Android `fr.caviste.app`) | **100+ downloads** on Google Play; updated 5 Oct 2026 ([Play Store](https://play.google.com/store/apps/details?id=fr.caviste.app), fetched 13 Oct 2026) | **IAP €2.99–€24.99** (Play); free tier capped at 30 bottles and 20 scans | Freemium | Very new and very small. **Closest feature clone of CellarMentor**: label scan pre-fill, drinking windows for 120+ appellations, "Drink now" urgency view, CSV import from CellarTracker/Vivino. A different "Caviste" at thecaviste.xyz covers wine and spirits. |
| Other cellar apps (for price context) | — | "My wines cellar": $3.99/mo, $34.99/yr ([App Store](https://apps.apple.com/us/app/id1547090471)). Pocket Wine: $0.99/mo, $5.99/yr, $19.99 lifetime ([App Store](https://apps.apple.com/us/app/-/id373322732)) | — | — |

**Takeaways from the comparables:**
- **Price:** €2.99/month is at the low end of the market. Vivino Premium is €4.99/month and about €45–48/year in NL. CellarTracker is $40+/year, InVintory $150/year and Wine-Searcher Pro about $9.49/month. The market supports an annual plan in the €25–49 range.
- **Payment structure:** every serious comparable offers an annual plan, and CellarTracker is *annual-first*. Its fixed price tiers by cellar size are a clean value metric that collectors understand.
- **Acquisition:** every comparable grew through product loops (scanning), search and community, or through PR and partnerships (InVintory). I found no evidence that any of them was built on paid social.

---

## 5. Payback math for CellarMentor

**Net revenue per monthly payment [A]:**
- €2.99 ÷ 1.21 = €2.471 ex-VAT.
- Stripe standard EEA card fee is 1.5% + €0.25 = €0.295.
- Stripe Billing fee is 0.7% = €0.021.
- That leaves **€2.155 net**, or €2.18 without the Billing fee. Premium EEA cards (2.8% + €0.25) reduce it to about €2.12.
- Fee source: [stripe.com/nl/pricing](https://stripe.com/nl/pricing) (fetched Oct 2026). The €0.25 fixed fee is about 10% of the gross price, which is a structural argument for annual billing.

**Annual-plan net [A], same fee structure:**
- €24.99/yr → €19.85 net.
- €29.99/yr → €23.88 net.
- €34.99/yr → €27.90 net.
- All of it is collected on day 0.

**Expected value of one monthly subscriber (net €2.18 per payment) [A]:**

| Retention scenario (basis) | Cumulative net by month 3 | by month 6 | by month 12 |
|---|---|---|---|
| Low: about 2 payments in year 1 (implied by RevenueCat 2026 non-AI *monthly* year-1 realized LTV of $13.59 per payer ÷ ~$8 median price) | €3.8 | €4.3 | €4.4 |
| Base: Adapty monthly curve (43% at day 90, 17% at 1 year; interpolated) | €4.6 | €7.1 | **€10.1** |
| Optimistic: 22.5% 1-yr retention (RevenueCat 2025 low-priced monthly), geometric decay | €5.8 | €9.6 | €13.8 |
| Wine-collector upside (CellarTracker >90% annual renewal) | not modelled; would be much higher | | |

**Payback norms used by growth teams (sources are agency or practitioner opinion, not data):**
- LTV:CAC ≥ 3:1 with payback under 12 months. Healthy subscription apps usually land at **6–12 months**, the best at 5–7 months ([Admiral Media](https://admiral.media/cac-payback-period-mobile-apps/)).
- Published payback targets range from **60 days to 12 months**. A target should never exceed the cohort age for which you have real retention data ([The Social Outline](https://thesocialoutline.com/blog/cac-payback-period-subscription-apps)).
- RevenueCat argues against LTV:CAC for apps. It recommends revenue snapshots at D0/D7/D30/D90/D365 instead ([RevenueCat blog](https://www.revenuecat.com/blog/growth/ltv-cac-subscription-apps-alternatives)).
- About 10% of the 100+ apps one consultant talked to reach 2–3× ROAS ([Adapty blog, Jun 2026](https://adapty.io/blog/meta-ads-subscription-apps/)).

**Sustainable CPA per *paying* subscriber, monthly plan [A]:**
- 3-month payback: ≤ **€4–6**.
- 6-month payback: ≤ **€4–10**.
- 12-month payback: ≤ **€4–14**. With a 3:1 margin on the base 12-month value, this drops to ≤ **€3.4**.
- Given the realistic **€86–480** paid-social cost per payer from section 3, paid acquisition does **not** pay back on the monthly plan under any norm.
- If ~25% of buyers took a €29.99 annual plan, blended day-0 cash per payer would be ~€7.6 (0.75×€2.18 + 0.25×€23.88) **[A]**. That still does not make Meta viable. It does make Google Search on very high-intent long-tail terms potentially break-even, *if* CPCs are under about €0.30 and click→paid is about 2% or more **[A]**. This is unverified and must be tested.

**Budget implication for the €1,000 cap:** keep paid media to about €300–400 in total, split into learning tests, and put the rest into zero-cash-burn channels. Budget items such as Stripe Tax, the domain and AI inference costs per credit are outside this research.

**A reality check on outcomes:**
- Of apps launched recently, 17.3% reach $1k MRR within two years and 4.6% reach $10k MRR (RevenueCat SOSA 2026 via [SaaStr](https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth)).
- €1k MRR at €2.18 net is about 460 paying subscribers **[A]**.

---

## 6. Conclusions: ranked channels for CellarMentor

Ranking criterion: expected *paying* users per euro and per hour, for an affluent Dutch/Belgian 35–70 audience, with a ≤ €1k cash limit.

1. **In-product conversion moment plus a referral loop.** Cost: €0, plus development time.
   - **Evidence:** 50.6% of paid conversions happen on day 0 (RevenueCat 2026). Referred customers are worth ≥16% more with about 18% lower churn (Schmitt et al., 2011). Vivino's label scan is a social, visible act in shops and restaurants ("what app is that?"), and the company reports 95% organic growth.
   - **Actions:**
     - Show the Plus offer right after the first successful scan or wine-list read, framed as "you have X credits left".
     - Give credits for referrals on both sides: a friend who signs up gives both people +20 credits, and a friend who pays gives the referrer a free month.
     - Add "Share this drinking window / pairing" cards that carry the brand into WhatsApp. WhatsApp is the dominant Dutch messenger; I found no sourced 2026 figure for this.
2. **Dutch-language SEO and programmatic content.** Cost: €0, slow (3–9 months).
   - **Evidence:** Vivino gets 59% of desktop visits from organic search and 95% of its keyword traffic is organic (Similarweb, Sep 2026). One in four app users discover apps via search engines (Google/Ipsos). A PWA's only "store" is Google.
   - **Pages to build:** "Wanneer drinken: [wijn/appellation] [jaargang]", "Welke wijn bij [gerecht]", Dutch vintage charts, and "wijnkaart lezen in restaurant".
   - **Search volumes:** no sourced Dutch volumes exist. Check Google Keyword Planner and Search Console.
3. **Partnerships with wine merchants (wijnhandels/slijterijen), wine clubs, wine courses and wine societies.** Cost: €0 to low; rev-share or affiliate.
   - **Evidence:** InVintory's growth tactics were Decanter wine-club memberships, hospitality and storage B2B, and a superyacht wine-club partnership. Vivino's model is built on retailer partners. CellarTracker integrates with Wine-Searcher.
   - **Conversion data:** none found. Treat this channel as untested.
   - **Offer:** a merchant gives buyers of cellar-worthy wine a code for one free month of Plus or extra credits. That puts the app in front of exactly the "home cellar" persona.
4. **Communities and earned PR (NL/BE).** Cost: €0–100.
   - **Evidence:** InVintory's press trail shows lifestyle and luxury press driving its visibility. CellarTracker's 56% direct traffic shows word-of-mouth stickiness among collectors.
   - **Quantified conversion:** none found. Vendor estimates of "effective CPI $0–0.50" for community seeding are unsourced ([Sonar](https://trysonar.app/blog/mobile-app-promotion-channels-ranked-by-cpi.md)).
   - **Targets:** Dutch wine media such as Perswijn and the culinary sections of national newspapers; Dutch tech and app sites; wine Facebook groups and forums; the r/wine community.
5. **Nano and micro wine creators (Instagram/YouTube), ideally paid by affiliate commission instead of fees.**
   - **Cost:** nano €50–250 per post, micro €250–2,500 per post in NL (Searchlab 2026).
   - **Viability:** at a ~€10 year-1 value per payer, a €150 post needs about 15 paying subscribers to break even **[A]**. That is only plausible with a niche wine audience, so prefer commission deals: for example, 50% of the first year paid out on paid conversions.
6. **Google Search ads on high-intent long-tail terms.** Test budget about €100–200.
   - **Evidence:** search converts better than social. LocaliQ Restaurants & Food: 8.05% CVR, $2.05 CPC (US). NL all-industry CPC is about €0.95 (unsourced methodology).
   - **Gap:** no sourced CPC for "wijn app" or "wijnkelder app".
   - **Plan:** run only after an annual plan exists, and stop if cost per *paying* user exceeds about €20.
7. **Meta (Facebook/Instagram).** Learning test only, capped at about €150–300.
   - **Why it is in the list:** NL CPMs (~7–16 most months) and CPCs (~0.86) are below the global average, and Facebook skews to the 35–70 target audience.
   - **Why it ranks low:**
     - The modelled cost per payer is €86–480 against a ~€10 year-1 value.
     - Meta needs about 50 conversion events per ad set per week to optimise, which a €1k budget cannot provide.
   - **Best use:** messaging and creative tests (which hook gets the cheapest *signups*: label scan, drinking window or wine-list reading), not scaling.

Not recommended:
- **TikTok:** the audience is younger, the CPM data is low quality, and the creative cost is high.
- **YouTube ads:** CPVs are wide and unsourced, and the format is awareness-only.
- **Apple Search Ads and app-install campaigns:** CellarMentor is not in the stores.
- **A Google Play listing via a Trusted Web Activity** could open store search for only a one-time **US$25** registration fee ([Google Play Console Help](https://support.google.com/googleplay/android-developer/answer/6112435)). However, I could not verify whether Play's billing policy would then require Google Play Billing (15% fee on subscriptions) instead of Stripe for in-app digital purchases. Check this before acting.

### What the data says about pricing structure
- **Add an annual plan. This is the strongest single recommendation.**
  - Annual plans keep 48–54% of subscribers after one year vs 12–22% for monthly (RevenueCat 2025).
  - Annual cash is collected upfront, which removes the payback problem.
  - Stripe's fixed-fee drag falls from about 10% to about 2–3% **[A]**.
  - Western Europe's mix is 35% yearly and 41% monthly (RevenueCat 2026).
  - Every serious wine comparable sells annual: Vivino about €45–48, CellarTracker from $40, InVintory $150.
  - Suggested test: **€24.99–29.99/yr** next to monthly, framed as "2 months free" or more. One Superwall customer case reports that adding a discounted annual plan alongside monthly raised proceeds per user by 80% ([Superwall](https://superwall.com/solutions/price-testing-optimization); vendor testimonial, no sample size).
- **The monthly price could rise.**
  - €2.99 is far below the European monthly averages of $13.3 (Adapty 2025) and $8–10 (RevenueCat 2026), and below Vivino at €4.99.
  - Higher-priced apps show 6× the year-1 realized LTV, although that is correlation (RevenueCat 2026).
  - Test €3.99–4.99 monthly. A higher monthly price also makes the annual plan look better value.
- **Trial:** the evidence is mixed for lifestyle apps.
  - Adapty 2026 finds Lifestyle trial users are 21% *less* valuable than direct buyers.
  - Trial→paid is highest for 17–32 day trials (42.5%) and worst for trials of 4 days or less (25.5%) (RevenueCat 2026).
  - Recommendation: keep the free credits as a usage-based trial. If a time-based trial is tested, use 7 days or more rather than 3, because 55% of 3-day-trial cancellations happen on day 0.
- **Paywall strictness:**
  - Freemium converts at about 2% vs 10.7% for hard paywalls (download→paid, RevenueCat 2026).
  - Twenty free AI credits per month may be generous enough to remove the need to pay.
  - Test lower free credits (for example 5–10) or a capability gate. Examples: wine-list reading Plus-only after 1–2 free uses, or cellar-wide pairing Plus-only.
  - Keep local cellar features free, because the cellar data is the retention moat (CellarTracker model).
- **Payment methods:** add iDEAL/Wero (€0.29 per payment at Stripe), Apple Pay and Google Pay to reduce the checkout drop-off seen in web flows (Dipsea: 44% vs 71% tap→purchase).

---

## 7. Skepticism and comparability flags

- **App-store vs PWA:** RevenueCat and Adapty data is almost entirely native mobile apps with store billing. "Download→paid" is not "visit→paid": a download already contains intent. Expect a PWA's visit→paid to be well below 2%.
- **Vendor interest:**
  - FunnelFox sells web funnels, so its "web converts 2×" claim is suspect, and Adapty's data says the opposite.
  - Superwall, Superads, Influee, AdAmigo, Sonar, Cello and Talkable sell tools.
  - RevenueCat and Adapty sell paywall infrastructure, so they have an interest in hard paywalls and trials.
- **US-only or US-heavy numbers:**
  - LocaliQ/WordStream benchmarks (US SMB).
  - RevenueCat's Dipsea web test (US).
  - Adapty's web-paywall retention (US).
  - RocketShip CPIs (Tier-1).
- **Survivorship bias:**
  - RevenueCat and Adapty samples are apps that integrated a monetisation SDK.
  - AppsFlyer samples paid-UA spenders.
  - Hard-paywall and high-price advantages are partly selection effects.
- **Self-reported company numbers:** Vivino (95% organic; 77.7M users; downloads and users conflated), CellarTracker (10M users; >90% renewal), InVintory press.
- **Internal inconsistencies in sources:**
  - RevenueCat 2026's page gives both "50.6%" and "one-third" for day-0 conversion.
  - The same page gives a monthly median of $8 and of $10.
  - Health & Fitness is labelled both "68% monthly" and "68% annual".
  - Superads' date window is inconsistent.
  - FunnelFox has placeholder zeros on its page.
- **Missing data (explicitly not found):**
  - A paid-subscriber split by acquisition source for indie apps.
  - RevenueCat Food & Drink and Lifestyle category medians (behind the PDF).
  - Lifestyle or Food & Drink median prices for Europe.
  - A European cost per paying subscriber.
  - Google CPCs for Dutch wine-app keywords.
  - Measured Dutch Meta CTR.
  - Premium prices for Cellar Book and Hello Vino.
  - Current Delectable user numbers.

---

## 8. Master table of numbers

| # | Metric | Value | Source URL | Date | Comparability notes |
|---|---|---|---|---|---|
| 1 | Download→paid D35, median all apps | 2.0% | https://www.revenuecat.com/state-of-subscription-apps-2026-utilities/ | SOSA 2026 (2025 data), Mar 2026 | Mobile, store billing |
| 2 | Download→paid D35, Western Europe | 2.0% | same | 2026 | Mobile |
| 3 | Download→trial D30, Western Europe | 5.0% | same | 2026 | Mobile |
| 4 | Trial→paid, Western Europe | 29.7% | same | 2026 | Mobile |
| 5 | Download→paid, hard paywall / freemium | 10.7% / 2.1% (2025 ed.: 12.11% / 2.18%) | https://www.revenuecat.com/blog/growth/subscription-app-trends-benchmarks-2026.md ; https://revenuecat.com/state-of-subscription-apps-2025 | 19 Mar 2026; Mar 2025 | Selection bias |
| 6 | Revenue per install D60, hard paywall vs freemium | $3.09 vs $0.38 | RC blog (above) | Mar 2026 | Mobile |
| 7 | Download→paid D35, Health & Fitness | 2.9% (Q3 6.2%) | RC report page | 2026 | Closest consumer category |
| 8 | Download→trial, high- vs low-priced apps | 8.9% vs 4.4% | RC utilities page | 2026 | Correlation |
| 9 | Download→paid, high- / mid- / low-priced apps | 2.8% / 2.0% / 1.4% | same | 2026 | Correlation |
| 10 | Trial→paid by trial length (17–32d / 5–9d / ≤4d) | 42.5% / 37.4% / 25.5% | same | 2026 | 2025 ed.: 45.7% for 17–32d |
| 11 | Share of apps using trials ≤4 days | 46.5% (42.1% prior year) | RC blog | 2026 | — |
| 12 | Day-0 share of 3-day trial cancellations | 55.4% (7d 39.8%; 14d 35.7%) | https://saastr.com/the-top-10-learnings-from-revenuecats-state-of-subscription-apps-how-115000-mobile-apps-deliver-16b-in-revenue-whats-working-whats-quietly-killing-growth | Mar 2026 | Secondary summary of RC |
| 13 | Paid conversions on day 0 | 50.6% | https://www.revenuecat.com/state-of-subscription-apps | 2026 | Page also says "one-third" |
| 14 | Trial starts on day 0 | 82% (RC 2025); 89.4% (Adapty 2026) | RC 2025 page; https://adapty.io/blog/lifestyle-app-subscription-benchmarks/ | 2025; 9 Apr 2026 | — |
| 15 | Plan mix overall / Western Europe | 42% monthly, 34% yearly / 41% monthly, 35% yearly | RC utilities page | 2026 | — |
| 16 | Annual share of subscriptions | 41.4% → 33.6% YoY | same | 2026 | — |
| 17 | Median prices (monthly / yearly) | ~$8–10 / $34.80 | RC report page | 2026 | Page inconsistent on monthly |
| 18 | Western Europe yearly median; annual LTV per payer | ~$39.44; $26.64 | RC report page | 2026 | — |
| 19 | 1-yr retention, annual plans (low / high price) | 53.7% / 48.3% | https://revenuecat.com/state-of-subscription-apps-2025 | 2025 | — |
| 20 | 1-yr retention, monthly plans (low / mid / high price) | 22.5% / 16.4% / 12.2% | same | 2025 | — |
| 21 | 12-mo retention monthly, non-AI vs AI | 9.5% vs 6.1% | https://techcrunch.com/2026/03/10/ai-powered-apps-struggle-with-long-term-retention-new-report-shows | 10 Mar 2026 | — |
| 22 | 12-mo retention annual, non-AI vs AI | 30.7% vs 21.1% | same | 2026 | — |
| 23 | Year-1 realized LTV, monthly, non-AI vs AI | $13.59 vs $18.92 | same | 2026 | Gross |
| 24 | Median refund rate, non-AI vs AI | 3.5% vs 4.2% | same | 2026 | — |
| 25 | Refund rate, hard paywall vs freemium | 5.8% vs 3.4% | RC 2025 page | 2025 | — |
| 26 | Share of annual cancellations in month 1 | ~30% (2025); 35% (2026) | RC 2025 page; RC blog 2026 | 2025/2026 | — |
| 27 | Web revenue share of total | 3.2% global, 4.9% NA | RC report page | 2026 | — |
| 28 | Apps with web revenue (top vs bottom tier) | 41% vs 1.3% | same | 2026 | — |
| 29 | New apps reaching $1k / $10k MRR within 2 years | 17.3% / 4.6% | SaaStr summary | 2026 | — |
| 30 | Europe avg price weekly / monthly / annual | $8.3 / $13.3 / $42 | https://adapty.io/blog/state-of-in-app-subscriptions-2025-in-10-minutes/ | 16 Jul 2025 | Adapty sample (11k apps) |
| 31 | Monthly plan retention day 90 / 1 yr | 43% / 17% | same | 2025 | — |
| 32 | Trial users' LTV uplift | up to +64% | same | 2025 | — |
| 33 | Refund rate Europe/MEA | ~2.3% | same | 2025 | — |
| 34 | Global funnel: install→trial / trial→paid | 11.2% / 27.8% | https://adapty.io/state-of-in-app-subscriptions-report/ | 2026 (2025 data) | Chart-read |
| 35 | Install→paid, in-app vs web | 1.60% vs 1.10% | same | 2026 | Contradicts FunnelFox |
| 36 | US web paywall retention, month 1 / month 6 (web vs in-app) | 64.5% vs 46.2% / 20% vs 30% | same | 2026 | US only |
| 37 | European price change YoY | +18% | same | 2026 | — |
| 38 | Lifestyle: trial users vs direct buyers' value | −21% | same; Adapty Lifestyle blog | 2026 | — |
| 39 | Lifestyle median 1-yr install LTV | $0.70 | https://adapty.io/blog/lifestyle-app-subscription-benchmarks/ | 9 Apr 2026 | — |
| 40 | Lifestyle plan mix weekly / monthly / one-time | 31% / 29% / 26% | same | 2026 | — |
| 41 | Day-380 retention, annual / monthly / weekly | 19.9% / 14.2% / 5.5% | same | 2026 | — |
| 42 | Lifestyle install→trial / trial→paid | 3.9% / 41% | https://www.appsflyer.com/resources/reports/subscription-marketing-report/ | 2026 (Oct 2024–Feb 2026 data) | AppsFlyer clients |
| 43 | Paid share of installs, Android / iOS | 51% / 34% | same | 2026 | Installs, not revenue |
| 44 | Web vs in-app final conversion | 3.0% vs 1.5% | https://funnelfox.com/state-of-web2app-2026 | Jan 2026 | Vendor |
| 45 | Users reaching the paywall in a web2app flow | 13% | same | Jan 2026 | Vendor |
| 46 | NL web price index (US = 1) | 1.62 | same | Jan 2026 | Vendor |
| 47 | Web2app revenue split by plan (1m / 1w / 1y / 3m) | 48.8% / 30.5% / 12.2% / 8.4% | same | Jan 2026 | Vendor |
| 48 | Web2app revenue by trial type (none / paid / free) | 56.8% / 28.9% / 14.3% | same | Jan 2026 | Vendor |
| 49 | Web2app payment methods (Apple Pay / cards / PayPal) | 60% / 20% / 18% | same | Jan 2026 | US-heavy (63.7% of revenue) |
| 50 | IAP-only vs web-only initial conversion; paying | 27.0% vs 18.1%; 6.3% vs 5.3% | https://www.revenuecat.com/blog/growth/iap-vs-web-purchases-conversion-test | 28 May 2025 | One US app |
| 51 | Web proceeds per IAP dollar | ~93¢ (at 30% fee) | same | May 2025 | — |
| 52 | Apple: visitors using search / downloads after search | ~70% / ~65% | https://searchads.apple.com/advanced | long-running claim | N/A for PWA |
| 53 | App users discovering apps via search engine | 1 in 4 | https://thinkwithgoogle.com/_qs/documents/2922/mobile-app-marketing-insights_5.pdf | c. 2016 | Old, US |
| 54 | Referred customer value uplift; churn | ≥16% higher; ~18% lower churn | https://faculty.wharton.upenn.edu/wp-content/uploads/2012/04/Schmitt-Skiera-vandenBulte-2011-Referral-Programs-Customer-Value.pdf ; https://reference-global.com/download/article/10.2478/gfkmir-2014-0020.pdf | 2011; 2014 | German bank |
| 55 | Meta CPM NL (avg; range) | ~14.2; 7.2–29.5 | https://www.superads.ai/facebook-ads-costs/cpm-cost-per-mille/netherlands | Jul 2025–Jul 2026 | Currency unlabelled; vendor |
| 56 | Meta CPC NL (avg; range) | ~0.86; 0.33–1.53 | https://www.superads.ai/facebook-ads-costs/cpc-cost-per-click/netherlands | same | "Local currency" |
| 57 | Meta CPM / CPC projections NL / BE / DE | $9.20 / $1.35; $8.40 / $1.20; $10.05 / $1.45 | https://www.adamigo.ai/blog/meta-ads-cpm-cpc-benchmarks-by-country-2026 | 2026 | Projections |
| 58 | Meta global CPM | $14.19 (2025) | https://www.triplewhale.com/blog/facebook-ads-benchmarks | 2025–26 | Ecommerce |
| 59 | Meta traffic CTR / CPC (all; Restaurants & Food) | 1.93% / $0.60; 2.68% / $0.45 | https://localiq.com/blog/facebook-advertising-benchmarks/ | upd. 23 Sep 2026 | US |
| 60 | Meta lead CVR / CPL | 8.54% / $27.39 | same | 2026 | US |
| 61 | Meta CPI iOS median, subscription H&F / Productivity | $7.80 / $6.20 | https://www.rocketshiphq.com/meta-cost-benchmarks-mobile-app-installs/ | 29 Mar 2026 | Tier-1; WEur 20–40% lower |
| 62 | Meta CPM blended, subscription H&F / Productivity | $10.20 / $9.30 | same | 2026 | — |
| 63 | Meta learning-phase threshold | ~50 events per ad set per week | https://adapty.io/blog/meta-ads-subscription-apps/ | 22 Jun 2026 | Meta guidance, secondary |
| 64 | Mandatory signup wall funnel loss | up to 40% | same | 2026 | Anecdotal |
| 65 | Cross-industry download→paid within 30 days | ~1.7% | same | 2026 | Secondary |
| 66 | Meta cost per trial (anecdote) | $40 at $8 CPI | https://marcuscnslt.substack.com/p/revenuecat-meta-ads-masterclass | 2025–26 | One advertiser |
| 67 | TikTok CPM / CPC NL | $4.60–8.80 / $0.38–0.95 | https://stackmatix.com/blog/tiktok-ads-cost-by-country-2026 | 2026 | No methodology |
| 68 | TikTok global CPM | $13.26 (2025) | https://influee.co/blog/tiktok-ads-benchmarks | 2026 | Vendor |
| 69 | Google Search CPC NL all industries | €0.95 | https://codedesign.org/google-ads-cost-europe-your-complete-guide/ | 2025 | No method |
| 70 | Google Search Restaurants & Food CPC / CVR / CPL | $2.05 / 8.05% / $30.57 | https://localiq.com/blog/search-advertising-benchmarks/ | upd. 1 Jun 2026 | US |
| 71 | Google Search all-industry CPC / CVR | $5.42 / 8.18% | same | 2026 | US |
| 72 | Google Search UK food & drink CPC | £1.84 → £2.18 | https://visionary-marketing.co.uk/blog/google-ads-benchmarks-2026 | 2025 → 2026 | UK |
| 73 | YouTube CPV | $0.03–0.30 | https://www.kontentino.com/nl-BE/social-media-urban-dictionary/cpv-betekenis/ | undated | Unsourced range |
| 74 | Influencer IG post NL, nano / micro | €50–250 / €250–2,500 | https://searchlab.nl/kosten/wat-kost-influencer-marketing | 2026 | Indicative |
| 75 | Meta ad reach NL, FB / IG | 7.50M / 8.15M | https://searchlab.nl/statistieken/social-media-statistieken-nederland-2026 | end 2025 | DataReportal, secondary |
| 76 | Landing-page median conversion (all; F&B ecommerce) | 6.6%; ~7.1% | https://unbounce.com/conversion-benchmark-report/ecommerce-conversion-rate/ | undated (recent ed.) | Unbounce customers |
| 77 | Stripe NL: EEA standard / premium card; iDEAL; Billing | 1.5%+€0.25 / 2.8%+€0.25; €0.29; 0.7% | https://stripe.com/nl/pricing | fetched Oct 2026 | Primary |
| 78 | Payback norm | 6–12 months typical (best 5–7); LTV:CAC ≥ 3:1 | https://admiral.media/cac-payback-period-mobile-apps/ | 2025–26 | Agency opinion |
| 79 | Payback target range | 60 days – 12 months | https://thesocialoutline.com/blog/cac-payback-period-subscription-apps | 2026 | Opinion |
| 80 | Vivino users / labels scanned | 77.7M+ / 3.51B+ | https://www.vivino.com/about | 2026 | Self-reported |
| 81 | Vivino NL App Store Premium IAPs | €4.99, €4.69, €45.00–47.90, €59.99 | https://apps.apple.com/nl/app/vivino-koop-de-juiste-wijn/id414461255 | fetched Oct 2026 | Durations unlabelled |
| 82 | Vivino users 2018 → 2021; funding | 29M → 50M; $155M Series D, $221M total | https://techcrunch.com/2021/02/03/vivino-raises-155-million-for-wine-recommendation-and-marketplace-app | 3 Feb 2021 | — |
| 83 | Vivino share of growth organic | 95% | https://retailtouchpoints.com/topics/digital-commerce/e-commerce-experience/covid-19-has-transformed-wine-shopping-heres-how-vivino-is-adapting | 2020 | CEO claim |
| 84 | vivino.com desktop organic search share; organic keyword share | 59.06%; 95.26% | https://www.similarweb.com/website/vivino.com/ | Sep 2026 | Estimate, desktop |
| 85 | CellarTracker users; renewal rate | ~10M; >90% | https://uschamber.com/co/good-company/the-leap/cellartracker-ai-user-growth | 15 Apr 2026 | Self-reported |
| 86 | CellarTracker suggested pricing | $40–$500/yr by cellar size; $4.99/mo (Apple) | https://support.cellartracker.com/article/25-voluntary-payment | upd. 16 Dec 2025 | Pay-what-you-want |
| 87 | cellartracker.com direct traffic share; US share | 56%; 58.87% | https://www.similarweb.com/website/cellartracker.com/ | Sep 2026 | Estimate |
| 88 | InVintory Premium | $149.99/yr | https://invintory.com/pricing/ | fetched Oct 2026 | — |
| 89 | InVintory funding | $1.5M (Oct 2022); $2.3M seed (Nov 2024) | https://invintory.com/press | 2022–2024 | Company page |
| 90 | InVintory launch pricing | $9.99/mo or $99/yr | https://wineindustryadvisor.com/2021/10/07/wine-app-invintory-launches/ | 7 Oct 2021 | Old |
| 91 | VinoCell price | €9.99 / $9.99 one-time | https://apps.apple.com/DE/app/id521577043 ; https://apppricinglab.com/app/apple/521577043 | 2026 | — |
| 92 | Wine-Searcher Pro | from $9.49/mo; older £72.99 / $73.99 / €82.99 per yr | https://support.cellartracker.com/article/77-integration-with-wine-searcher ; https://www.circleofwinewriters.org/the-benefit-of-going-pro-on-wine-searcher/ | 2025–26; c. 2023 | — |
| 93 | Delectable downloads / monthly users at acquisition | 1M+ / 120k | https://appdevelopermagazine.com/vinous-acquires-delectable-and-banquet-wine-apps/ | Dec 2016 | Old |
| 94 | Caviste (fr.caviste.app) downloads; IAP range | 100+; €2.99–24.99 | https://play.google.com/store/apps/details?id=fr.caviste.app | fetched 13 Oct 2026 (updated 5 Oct 2026) | Android only |
| 95 | "My wines cellar" pricing | $3.99/mo; $34.99/yr | https://apps.apple.com/us/app/id1547090471 | 2026 | — |
| 96 | Superwall case: annual plan with 60% discount added next to monthly | +80% proceeds per user; +22% trial conversion | https://superwall.com/solutions/price-testing-optimization | undated | Vendor testimonial |
| 97 | Google Play developer registration | US$25 one-time | https://support.google.com/googleplay/android-developer/answer/6112435 | current | Primary |
| 98 | Liftoff dating apps Europe cost per purchase | $116.51 | https://content.liftoff.io/hubfs/aaa_Reports/2022/2022%20Dating%20Apps%20Report%20-%20EN.pdf | 2022 | Old, other vertical |
| D1 | **[A]** Net per €2.99 monthly payment | €2.155 (€2.18 without Billing) | derived from #77 | — | Arithmetic |
| D2 | **[A]** Net per annual €24.99 / €29.99 / €34.99 | €19.85 / €23.88 / €27.90 | derived from #77 | — | Arithmetic |
| D3 | **[A]** Year-1 net value per monthly payer | €4.4 (low) / €10.1 (base) / €13.8 (high) | derived from #20, #23, #31 | — | Model |
| D4 | **[A]** Meta web-funnel cost per payer, NL | €86–480 | derived from #56, #60, #5 | — | Model; needs a real test |
