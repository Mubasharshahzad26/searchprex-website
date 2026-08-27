<div class="callout"><strong>Accuracy note:</strong> every date and figure on this page is taken from the primary announcement or from established trade coverage, linked in Sources at the foot of the article. Last verified August 27, 2026. Where a number could not be traced to a named source, it is not published here.</div>

## May 7: FAQ rich results stopped appearing

FAQ rich results no longer appear in Google Search as of May 7, 2026. Google announced it only as a note at the top of the FAQ structured data documentation — *"FAQ rich results are no longer appearing in Google Search"* — with no blog post and no stated reason.

The tooling was withdrawn on a staged schedule that is now complete:

| Date | What was removed |
| --- | --- |
| May 7, 2026 | FAQ rich results stop appearing in Search |
| June 2026 | Search Console FAQ appearance filter, FAQ rich result report, Rich Results Test support |
| August 2026 | FAQ rich result data in the Search Console API |

<div class="callout"><strong>Check this today.</strong> Any Looker Studio dashboard, client report or internal script pulling FAQ appearance data from the Search Console API stopped returning data this month. It fails quietly — an empty panel, not an error — which is exactly how it survives unnoticed in a live client report.</div>

Google's documentation is explicit that FAQPage markup can stay in place: it remains valid schema.org, will not trigger a manual action and will not harm rankings. It simply earns nothing. The correct response is to stop counting it as a deliverable, not to run a removal project.

The wider context is a multi-year contraction. Google reduced FAQ rich result visibility in 2023, then limited it to well-known authoritative government and health sites in August 2023. The May 2026 change removed that last remaining eligibility. HowTo rich results were fully deprecated on desktop back in September 2023.

## The AI crawler mistake that costs sites their citations

This is the most consequential technical error we see in 2026, and it is almost always accidental.

**Training crawlers and retrieval crawlers are different things and need different rules.**

- **Training crawlers** — for example `GPTBot` and `Google-Extended` — collect content used in model training. Blocking them does not affect your Google rankings.
- **Retrieval crawlers** — for example `OAI-SearchBot` — fetch pages so they can be cited in live answers. Block these and you remove yourself from being cited as a source in that platform's search product.

A site that writes one broad block intending to protect its content from training frequently removes itself from answer-engine citations at the same time. If your position is "do not train on my content, but do cite me," those are two separate directives written for two separate user agents. Decide deliberately, per bot, and record why.

Google's opt-out control for its own generative AI features, shipped June 3, 2026, is a separate mechanism from robots.txt — and Google states it is not used as a ranking signal for search results outside those AI features.

## On llms.txt: what Google actually says

A great deal of 2026 commentary presents `llms.txt` as a requirement. It is not a standard, and Google does not use it.

- `robots.txt` controls crawling and is a genuine standard, formalised as <a href="https://www.rfc-editor.org/rfc/rfc9309.html" target="_blank" rel="noopener noreferrer">RFC 9309</a>.
- `llms.txt` is a proposed convention with no standards body behind it and no confirmed consumer among the major search engines.
- Google's guidance on its AI features states there are **no additional technical requirements and no special AI-specific files** needed to appear in them.

Publishing one is harmless and cheap. Selling one as a Google requirement is not accurate, and buying one on that basis means paying for something Google says is not required.

## Crawl budget under AI bot load

The practical technical pressure in 2026 is volume. The number of AI crawlers hitting the open web means even modest sites now see meaningful bot traffic, and origin load that used to be a large-site concern is no longer only that.

Worth checking in your server logs rather than assuming:

- **Which bots are actually hitting you, and at what rate.** Log analysis, not guesswork — the answer differs a lot between sites.
- **Whether AI crawlers are consuming budget on worthless URLs.** Faceted navigation, session parameters, internal search results and paginated archives are the usual offenders.
- **Whether your origin is absorbing traffic your CDN should cache.** The cheapest fix is usually caching, not blocking.

XML sitemaps remain essential for Google and Bing to discover indexable URLs — nothing about AI search has changed that.

## Fundamentals that did not change in 2026

Nothing Google shipped this year altered the technical baseline, and it is worth stating so nobody rebuilds a working stack on the strength of AI-search commentary:

- Core Web Vitals still govern real user experience and still matter.
- Crawlability, indexability and clean canonicalisation remain the foundation — AI surfaces are fed by the same index.
- Supported structured data still earns rich results; check what is actually supported in the <a href="https://developers.google.com/search/docs/appearance/structured-data/search-gallery" target="_blank" rel="noopener noreferrer">search gallery</a> rather than a blog post from a previous year.
- Server-rendered or reliably pre-rendered content is still the safe default for anything you need crawled.

## This week's checklist

1. **Find every report pulling FAQ data from the Search Console API** and fix or remove it — it went dark this month.
2. **Read your robots.txt with the training-versus-retrieval distinction in mind** and confirm the current rules are what you actually intended.
3. **Pull a log sample** and see which AI crawlers are hitting you and where the budget is going.
4. **Stop scoping FAQ schema as a deliverable.** Leave existing markup; remove it from the plan.
5. **Check the [2026 update timeline](/resources/news/google-algorithm-updates)** before attributing any traffic change to a technical cause.

[← Back to the SEO News hub](/resources/news) for the running algorithm tracker and every other deep-dive.

## Sources

- <a href="https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957" target="_blank" rel="noopener noreferrer">Google to no longer support FAQ rich results — Search Engine Land</a>
- <a href="https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/" target="_blank" rel="noopener noreferrer">Google Drops FAQ Rich Results From Search — Search Engine Journal</a>
- <a href="https://developers.google.com/search/blog/2023/08/howto-faq-changes" target="_blank" rel="noopener noreferrer">Changes to HowTo and FAQ rich results — Google Search Central</a>
- <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">Google Search's AI features and your website — Google Search Central</a>
- <a href="https://blog.google/products-and-platforms/products/search/new-controls-website-owners/" target="_blank" rel="noopener noreferrer">New opportunities, control and insights for website owners — Google Blog</a>
- <a href="https://www.rfc-editor.org/rfc/rfc9309.html" target="_blank" rel="noopener noreferrer">RFC 9309: Robots Exclusion Protocol</a>
