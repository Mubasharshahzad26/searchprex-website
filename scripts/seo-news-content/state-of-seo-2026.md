<div class="callout"><strong>Accuracy note:</strong> every date and figure on this page is taken from the primary announcement or from established trade coverage, linked in Sources at the foot of the article. Last verified August 27, 2026; the "since this review" log was verified September 18, 2026. Where a number could not be traced to a named source, it is not published here.</div>

## A review, not a forecast

The genre problem with "state of SEO" articles is that they are written as predictions and never revisited. This one is built the other way round: from the record of what Google confirmed and shipped between January 1 and August 27, 2026. Every claim is dated and sourced, and where the evidence does not support a popular narrative, we say so.

## Since this review: update log

The review below covers January 1 to August 27, 2026. This log records what has happened since, in brief — each entry links to the deep-dive that covers it in full.

<div class="callout"><strong>How to read the labels.</strong> <strong>Confirmed</strong> — the company announced or stated it. <strong>Observed</strong> — the SEO community documented it and the company has not commented. <strong>Independent testing</strong> — a third party published its own methodology and results. Nothing enters this log without a date and a named source.</div>

### September 16, 2026 — First measured CTR impact of AI Overviews in a new market

**Independent testing.** Ahrefs found that in France, the domains most exposed to AI Overviews lost 23.1% of their click-through rate in the nine days after AI Overviews launched there on July 22. Short window, clear direction. [Full entry in our AI SEO news log](/resources/news/ai-sge-seo-news).

### September 16, 2026 — Google widens agentic checkout through Merchant Center

**Confirmed.** Cart transfer and checkout testing arrive in the Merchant Center UCP integration hub, rolling out in the US first. [Full entry in our ecommerce SEO news log](/resources/news/ecommerce-seo-news-2026).

### September 15, 2026 — Ranking volatility, still unconfirmed

**Observed.** Widely reported ranking movement, with no confirmed update on the Search Status Dashboard as of September 18. [See the algorithm tracker](/resources/news/google-algorithm-updates).

### August 26, 2026 — Google routes result clicks through google.com/goto

**Confirmed.** A passthrough URL Google describes as a measure against abuse, which Search Engine Roundtable reads as anti-scraping. [Full entry in our SEO tools news log](/resources/news/seo-tools-news-2026).

### August 20, 2026 — Google explains which updates it announces

**Confirmed.** John Mueller said Google tries to announce "bigger / broader changes" so people can connect a jump in their metrics to them — worth reading alongside point 2 below, on where those announcements now appear. [See the algorithm tracker](/resources/news/google-algorithm-updates).

### August 14, 2026 — Gemini 3.7 Flash reaches AI Mode for paying subscribers

**Confirmed.** Announced by Google's Robby Stein and Rajan Patel for AI Pro and Ultra subscribers in English. [Full entry in our LLM SEO news log](/resources/news/llm-seo-news-2026).

## 1. Update cadence went up, and rollouts got shorter

Six confirmed updates in eight months: a Discover core update in February, spam updates in March, June and August, and core updates in March and May. Both core updates took 12 days. The March spam update took about 19 and a half hours — the shortest confirmed spam rollout on record.

The operational consequence is that the old habit of bundling a quarter of changes and shipping them together no longer works. With something landing roughly every six weeks, bundled changes become permanently unattributable. Change less at once, and date every change against the [confirmed update timeline](/resources/news/google-algorithm-updates).

## 2. Google stopped announcing things on the blog

Both 2026 core updates were announced and closed out through the Search Status Dashboard and Search Central's social accounts, with no blog post. The removal of FAQ rich results in May was communicated as a note on a documentation page — no post, no reason given.

If your process for staying current is watching the Search Central blog, you missed most of 2026. The dashboard and the documentation changelog are now the primary channels.

## 3. AI search became measurable — barely

At I/O 2026 Google put its own numbers on AI search: AI Overviews past 2.5 billion monthly users, AI Mode past 1 billion, AI Mode queries more than doubling every quarter. Gemini 3.5 Flash became AI Mode's default model globally, and AI Overviews and AI Mode merged into one continuous experience worldwide.

On June 3 site owners got their first native measurement: Search Console's generative AI performance reports, covering AI Overviews, AI Mode and AI features in Discover — **impressions only, no clicks, no queries, data starting May 18, 2026 with no backfill.**

So: AI visibility is now a real, separately-reported channel, and it is still not a measurable traffic source. Both halves of that sentence matter. Detail in our [AI SEO deep-dive](/resources/news/ai-sge-seo-news).

## 4. Discover became its own diagnostic surface

February's Discover core update — the first Discover-only update Google has announced — targeted locally relevant content from sites based in the user's country, reduced sensational content and clickbait, and favoured in-depth, original, timely content from sites with demonstrated expertise.

For publishers this means Discover and Search now need separating in reporting. A Discover collapse and a Search ranking loss have different causes and different fixes, and reporting them as one "organic traffic" number hides both.

## 5. Structured data got smaller, not bigger

Against the widespread expectation that AI search would make markup more valuable, Google removed FAQ rich results entirely in May and dismantled the supporting tooling through June and August. HowTo went in 2023.

The lesson is to build on <a href="https://developers.google.com/search/docs/appearance/structured-data/search-gallery" target="_blank" rel="noopener noreferrer">currently supported</a> types and treat any single rich result as revocable. Our [technical roundup](/resources/news/technical-seo-news-2026) covers what broke and what to check.

## 6. Commerce started moving inside the answer

Google launched the Universal Commerce Protocol on January 11 with Shopify, Etsy, Wayfair and Target, putting agentic checkout inside AI Mode and the Gemini app, then expanded it through the year with Universal Cart and simplified Merchant Center onboarding.

When a purchase completes inside an AI surface, the product page never renders — which quietly promotes the product feed above the product page in priority. See our [ecommerce SEO news deep-dive](/resources/news/ecommerce-seo-news-2026).

## What did not change

Worth stating plainly, because a lot of 2026 commentary implies a clean slate:

- **Google's guidance on AI features is that it is still SEO** — useful content, clear technical structure, accurate detail, and explicitly no additional technical requirements or special AI files.
- **Crawlability and indexability** still underpin everything, AI surfaces included — they are fed by the same index.
- **Core Web Vitals** still govern the experience of every user who arrives.
- **Core updates still have no specific fix.** Google's guidance is unchanged, and the largest recoveries still tend to arrive with the next core update rather than between them.

## Where we would put effort for the rest of 2026

1. **Start banking AI impression data now.** There is no backfill before May 18, 2026 — the baseline you will want next year only exists if you export it weekly starting today.
2. **Split your reporting by surface** — Search, Discover, AI features, and social via platform properties. Blended "organic" numbers now hide four different stories.
3. **Publish something only you can publish.** Original data and first-hand results are what makes a source citable rather than substitutable, in both classic ranking and AI answers.
4. **Audit robots.txt for the training-versus-retrieval distinction.** This is the cheapest high-impact fix available right now.
5. **Fix the dashboards that went dark** when FAQ data left the Search Console API in August.

[← Back to the SEO News hub](/resources/news) for the running algorithm tracker and every other deep-dive.

## Sources

- <a href="https://ahrefs.com/blog/ai-overviews-france-impact/" target="_blank" rel="noopener noreferrer">AI Overviews Cut CTR by 23.1% in France — Ahrefs, September 16, 2026</a>
- <a href="https://blog.google/products-and-platforms/products/shopping/google-shopping-updates-holiday-shopping/" target="_blank" rel="noopener noreferrer">Boost your holiday sales with these agentic commerce updates — Google Blog, September 16, 2026</a>
- <a href="https://www.seroundtable.com/google-update-42091.html" target="_blank" rel="noopener noreferrer">Google Search Ranking Volatility Heating Up September 15th — Search Engine Roundtable, September 15, 2026</a>
- <a href="https://www.seroundtable.com/google-search-goto-tracking-41957.html" target="_blank" rel="noopener noreferrer">Google Search Rolling Out google.com/goto Tracking Parameters — Search Engine Roundtable, August 26, 2026</a>
- <a href="https://www.seroundtable.com/google-announces-some-updates-41903.html" target="_blank" rel="noopener noreferrer">Why Google Announces Some Updates But Not All — Search Engine Roundtable, August 20, 2026</a>
- <a href="https://www.seroundtable.com/google-search-gemini-3-7-flash-41879.html" target="_blank" rel="noopener noreferrer">Google Search AI Mode Using Gemini 3.7 Flash — Search Engine Roundtable, August 17, 2026</a>
- <a href="https://blog.google/products-and-platforms/products/search/search-io-2026/" target="_blank" rel="noopener noreferrer">Google Search's I/O 2026 updates: AI agents and more — Google Blog</a>
- <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Introducing Search Generative AI performance reports in Search Console — Google Search Central</a>
- <a href="https://searchengineland.com/google-february-2026-discover-core-update-is-now-complete-469450" target="_blank" rel="noopener noreferrer">Google February 2026 Discover core update is now complete — Search Engine Land</a>
- <a href="https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957" target="_blank" rel="noopener noreferrer">Google to no longer support FAQ rich results — Search Engine Land</a>
- <a href="https://searchengineland.com/google-universal-commerce-protocol-467290" target="_blank" rel="noopener noreferrer">Google launches Universal Commerce Protocol for agent-led shopping — Search Engine Land</a>
- <a href="https://developers.google.com/search/docs/appearance/core-updates" target="_blank" rel="noopener noreferrer">Google Search's core updates and your website — Google Search Central</a>
