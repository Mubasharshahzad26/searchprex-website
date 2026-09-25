# SearchPrex — site audit and 30-day lead plan

Written 25 September 2026. Positioning this plan assumes: **an SEO agency run personally by
Mubashar Sharif, serving law firms, local businesses and technical SEO across US states.**

---

## 0. What 30 days can and cannot do

I am going to say this once, plainly, because the rest of the plan depends on it.

**Cannot happen in 30 days:** the homepage ranking for "SEO agency", "SEO company USA" or
"best SEO agency". Those SERPs are held by domains with thousands of referring domains and years of
history. Anyone promising that in 30 days is selling you the thing we tell clients not to buy.

**Can happen in 30 days, and is where this plan spends its time:**

| Lever | Why it is fast | Ceiling |
|---|---|---|
| **Homepage + audit-page CRO** | Needs no ranking at all. It multiplies traffic you already have, and it works the day it ships. | Limited by current traffic |
| **20 city pages that already exist and get ~0 impressions** | The pages are written. This is a discovery and internal-link problem, not a content problem. Long-tail "[city] law firm seo" is KD 2–9. | First rankings 2–6 weeks |
| **News desk** | News pages index in hours. Already proven on this site. | Brand + email, not direct buyers |
| **Directory profiles already "Registered" but empty** | Clutch / GoodFirms / DesignRush send referral traffic and buyer-intent visitors directly, no Google needed. | Days, not weeks |
| **Outbound with the free tear-down as the opener** | The offer is genuinely good and the proof is real screenshots. | Entirely effort-bound |

So: **leads in 30 days — realistic. Rankings for money-terms in 30 days — only the long-tail city
and practice-area terms.** Everything below is ordered by how fast it pays.

---

## 1. Audit — what is actually wrong

### 1.1 The internal-link hole (highest-impact finding)

The homepage body links to **zero of the 20 city pages**. The only links are in the footer and one
Services card. The homepage is the strongest URL on the domain and it passes almost none of that
strength to the pages that are supposed to win local searches.

That is the mechanism behind the symptom we already saw: every city page except Wichita had zero
impressions, while Wichita sat at position 6.3. Same content quality, different link position.

**Fix:** the Coverage block in the wireframe (block 05). Homepage to every state hub, state hub to
every city, city to its practice-area pages. That loop does not exist yet.

### 1.2 "All major USA states" is not true yet

Live coverage: **9 states, 20 cities.**

| State | Cities |
|---|---|
| Kansas | 8 (Kansas City, Wichita, Overland Park, Topeka, Lawrence, Shawnee, Lenexa, Manhattan) |
| Texas | 3 |
| Michigan | 2 |
| Louisiana | 2 |
| Ohio, Pennsylvania, California, Arizona, New Mexico | 1 each |

The homepage copy must say nine states until the pages exist. The expansion path is already correct
in `lib/city-pages.ts`: every entry carries `legalContext` — a fact true of that jurisdiction only
(Michigan no-fault, Louisiana civil code, Philadelphia mass tort program). That is what stops a
templated page from being doorway spam. **Do not mass-generate cities without that field filled by
hand.** 4 new cities per week with real jurisdiction content beats 40 templated ones.

### 1.3 The "Local Businesses" half of the positioning has one page

Law firms have a proper hub and spoke: `/services/law-firm-seo` plus 5 practice areas
(personal injury, family law, criminal defense, estate planning, mass torts).

Local businesses have **`/services/local-seo` and nothing else.** No page for HVAC, plumbing,
roofing, dental, med spa, auto repair, moving, landscaping — and the local case studies
(AAA Mobile Tyres, Door Doctor, HVAC Services Team) have no service page to sit under.

This is the biggest content gap on the site relative to the stated positioning.

### 1.4 Technical SEO has no spokes and no case study page

One page, no sub-pages, and the strongest technical proof on the whole site — the
3,000 to 11,549 indexed-pages recovery — lives in a homepage section rather than a page that can
rank for "de-indexed pages fix" or "site migration seo". Needed spokes: de-indexing recovery,
site migration, Core Web Vitals, crawl budget / faceted URLs, JavaScript rendering.

### 1.5 No phone number anywhere

Not in the header, not in the schema. Two consequences: the `ProfessionalService` / `Organization`
markup is missing its most important local signal, and every visitor who would rather call — which
for law firm owners is most of them — has no way to.

### 1.6 Trust signals are asserted, not earned

Six of the eight hero badges say "Registered" and are not clickable. A Clutch profile with no
reviews is worth nothing on the page and worth a lot filled in — those directories are where agency
buyers shortlist, and they are referral traffic that needs no ranking.

### 1.7 One honesty problem to remove

`components/TrustBar.tsx` renders **"2 Spots Remaining This Month"**. Nothing in the codebase
decrements it. On a site whose entire argument is "my numbers are real screenshots", a manufactured
countdown is the one thing that undermines every real number next to it. The exclusivity claim
(one client per city) is true and does the same job.

### 1.8 What is already in good shape

- Sitemap: per-request, honest lastmod, 91 URLs, image sitemap, news sitemap, all three in robots.txt.
- Schema: single `@graph`, no duplicated entities, proof images marked up as `ImageObject` with dates.
- One offer, one destination (`lib/offer.ts`) — this was five competing CTAs and is now one.
- 10 case studies with unedited screenshots. This is the asset most agencies do not have.
- News autopilot with a quality gate that blocks unsourced figures.
- Title/H1/description all aligned on the same keywords.

### 1.9 What I could not verify

**Backlinks and competitor keyword data.** I have no Ahrefs or Search Console API access in this
session. The Ahrefs and Similarweb connectors are installed but unauthorized — if you authorize them
(claude.ai connector settings), I can pull referring domains, anchor profile, and the exact keyword
gaps in one pass instead of guessing. Until then, treat "off-page" below as a plan shape, not a
data-driven target. **Off-page is almost certainly the real ceiling on this domain**, and it is the
one thing the 30-day window cannot fix.

---

## 2. The 30-day plan

Each item: what, why it earns its slot, and how you know it is done.

### Week 1 (Sep 25 – Oct 1) — conversion and the link loop

Nothing here needs a ranking. It all pays on the traffic you already have.

1. **Ship the homepage wireframe.** 15 blocks to 9, hero form 4 fields to 2, persona tabs gone,
   proof in one row, offer last.
   *Done when:* the offer is visible on a 375x812 screen without scrolling.
2. **Add the Coverage block** (homepage to 9 state hubs to 20 cities).
   *Done when:* every city page is reachable from the homepage in two clicks.
3. **Add the phone number** to the header, the sticky bar, the close block, and the
   `Organization` / `ProfessionalService` schema in `lib/site-schema.ts`.
4. **Remove the "2 Spots Remaining" bar.**
5. **Reciprocal links city to practice area.** Each city page already lists its practice demand —
   link those labels to the 5 practice pages, and link each practice page back to the cities that
   demand it. `findPracticePage()` in `lib/locations.ts` already does the matching.
6. **Instrument the funnel.** Events on: hero form submit, call click, phone click, tear-down
   delivered. Without this, week 4 is a guess.
   *Done when:* you can state the homepage conversion rate as a number.

### Week 2 (Oct 2 – Oct 8) — the pages the positioning promises

7. **Six local-business service pages** under `/services/local-seo/`: HVAC, plumbing, roofing,
   dental, auto repair, med spa. Each one gets the client you actually served where you have one
   (HVAC Services Team, Door Doctor, AAA Mobile Tyres) — real named proof beats a generic page.
8. **Three technical SEO spokes:** de-indexing recovery, site migration, Core Web Vitals. The
   de-indexing page gets the 11,549-page GSC screenshot as its centrepiece.
9. **Four new city pages**, jurisdiction content written by hand. Pick by evidence, not by
   population: cities where Search Console already shows impressions at position 11–20.
10. **Fill the directory profiles** — Clutch, GoodFirms, DesignRush, G2, BBB: description, services,
    the 10 case studies, portfolio images. Then ask three past clients for a review on Clutch and
    Trustpilot on the same day.
    *Done when:* every badge on the homepage is clickable and leads to a populated profile.

### Week 3 (Oct 9 – Oct 15) — demand capture and outbound

11. **Four news articles** through the autopilot, one per week-day cluster, each sourced and dated.
    Target the queries people search the day a Google change lands — that is a window you can win in
    hours and nobody else on the domain is competing for.
12. **One informational cluster piece per service**, targeting the question the buyer asks *before*
    they search for an agency: "why is my law firm not in the map pack", "why did Google deindex my
    product pages", "how much does law firm SEO cost". Each ends in the tear-down offer.
13. **Outbound, 20 per day, using the tear-down as the opener.** Pick firms in the 9 states where
    you already have a city page — you can open with a specific finding about their site and a link
    to a city page that proves you know their jurisdiction. This is the single most likely source of
    a signed client inside 30 days, and it is not a ranking play.
14. **Ask for the first links that matter:** the 3 clients whose screenshots are on the site
    (a case-study mention with a link), your local bar association or chamber listings, and
    one guest piece on a legal-marketing site. Three real referring domains beats thirty directories.

### Week 4 (Oct 16 – Oct 25) — measure, then double down on what moved

15. **Read the numbers, not the feelings.** Homepage conversion rate before vs after, impressions on
    the 20 city pages (the honest metric here is *impressions*, not position — position moves later),
    tear-down requests, calls, and which page each lead landed on first.
16. **Kill and scale.** Whichever of {city pages, local service pages, news, outbound, directories}
    produced a lead, put week 5 into it. Whichever produced nothing after being live 3 weeks,
    stop paying it attention.
17. **Then, and only then, spend on links.** Once you know which pages convert, buying or earning
    links for *those* pages is worth it. Doing it before you know is how agencies waste budget.

---

## 3. Keyword targets, mapped to a page that exists

Homepage is not the ranking vehicle for any of these — each has its own URL. That is the point of a
hub and spoke.

| Intent | Query shape | Page |
|---|---|---|
| Money, local | `[city] law firm seo`, `seo for lawyers [city]` | `/locations/[state]/[city]` |
| Money, vertical | `personal injury seo`, `family law seo` | `/services/law-firm-seo/[area]` |
| Money, local business | `hvac seo`, `seo for plumbers`, `dental seo` | `/services/local-seo/[industry]` — **to build** |
| Money, technical | `deindexed pages fix`, `site migration seo` | `/services/technical-seo/[topic]` — **to build** |
| Money, brand-adjacent | `founder led seo agency`, `one client per city seo` | Homepage — genuinely winnable, low competition |
| Research | `why is my law firm not in the map pack` | Blog, links to the service page |
| News | whatever Google changed this week | `/resources/news/[slug]` |
| **Not targeted** | `seo agency`, `best seo company` | Nothing. Deliberate. |

That second-to-last row is worth a sentence: "founder-led", "one client per city", "you talk to the
person doing the work" are low-volume, near-zero-competition, and describe exactly the buyer who
will not be happy with an agency. That is the homepage's realistic organic win inside 30 days.

---

## 4. Order of work, if you only do five things

1. Coverage block on the homepage — unblocks 20 pages that are already written.
2. Hero down to 2 fields, form always visible, phone number added.
3. Six local-business service pages — the positioning currently has a hole where half the market is.
4. Directory profiles filled and 3 reviews requested — referral traffic in days, no Google involved.
5. 20 outbound touches a day using the tear-down. The offer is good; it just needs to be put in front
   of people.

Numbers 1, 2 and 3 I can implement in this repo. Numbers 4 and 5 are yours — and honestly, they are
the two most likely to produce the signed client inside 30 days.
