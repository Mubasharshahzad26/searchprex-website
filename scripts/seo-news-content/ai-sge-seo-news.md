<div class="callout"><strong>Accuracy note:</strong> every date and figure on this page is taken from the primary announcement or from established trade coverage, linked in Sources at the foot of the article. Last verified August 27, 2026. Where a number could not be traced to a named source, it is not published here.</div>

## The numbers Google confirmed at I/O 2026

For two years, AI search adoption was argued over with third-party estimates. At I/O 2026 in May, Google published its own figures:

- **AI Overviews:** more than 2.5 billion monthly users.
- **AI Mode:** more than 1 billion monthly users.
- **AI Mode query volume:** more than doubling every quarter since launch.

Google also made **Gemini 3.5 Flash** the default model in AI Mode globally, and merged AI Overviews and AI Mode into a single continuous AI Search experience — a user can move from a question, to a results page with an AI Overview, to a follow-up in AI Mode without breaking stride. That experience went live worldwide across desktop and mobile.

The strategic point for site owners is not the size of the numbers. It is that being *cited inside the answer* has become a visibility channel in its own right, running parallel to the ranked link — and until June, one you had no native way to measure.

## June 3: Search Console starts reporting AI visibility

Google introduced Search Generative AI performance reports in Search Console on June 3, 2026. They cover AI Overviews, AI Mode and AI features in Discover, broken down by page, country, device and date.

Two limitations decide how you can actually use this data, and both are easy to miss:

- **Impressions only.** There are no clicks, no CTR and no query data in this version. You can see that a page surfaced in an AI answer; you cannot see what was asked, or whether anyone clicked through.
- **No historical backfill.** Data starts on May 18, 2026. There is no way to reconstruct what your AI visibility looked like before that date.

It rolled out first to a subset of UK sites before widening. Alongside it, Google shipped a control letting owners keep their content out of generative AI features — and stated plainly that this control **is not used as a ranking signal for search results outside those generative AI features**. Opting out costs you AI traffic; on Google's own account, it does not cost you organic rankings.

<div class="callout"><strong>What to do with it now:</strong> export impressions weekly from May 18 onward and build your own baseline. Because there is no backfill and no query data, the comparison you will want in six months only exists if you start recording it today.</div>

## What "optimising for AI answers" actually means in 2026

Google's position is consistent and worth taking at face value: optimising for generative AI features is still SEO. Its guidance for AI features points at the same fundamentals — useful content, a clear technical structure a crawler can parse, accurate details — and states there are no additional technical requirements and no special AI-specific files needed to appear in those features.

That last point is worth being blunt about, because a large amount of 2026 commentary claims otherwise. There is no Google-sanctioned `llms.txt` requirement. We cover the actual state of AI crawler control in our [technical SEO news deep-dive](/resources/news/technical-seo-news-2026).

What does hold up in practice:

- **Answer the question in the first two or three sentences under the heading**, then expand. Extractable, self-contained passages are what a synthesised answer can lift and attribute.
- **Publish things that only you can publish.** Original data, first-hand testing, real case results. A model summarising five sources that all say the same thing has no reason to cite any one of them; a source with a number nobody else has is citable by necessity.
- **Make entities unambiguous.** Consistent organisation and author identity, clean internal linking, and <a href="https://developers.google.com/search/docs/appearance/structured-data/search-gallery" target="_blank" rel="noopener noreferrer">supported structured data</a> — note that FAQ markup no longer earns anything, as covered in our [technical roundup](/resources/news/technical-seo-news-2026).
- **Keep pages crawlable and fast.** The AI surfaces are fed by the same index as everything else.

## The honest state of measurement

Being straight about what cannot currently be measured is more useful than pretending otherwise:

- Google does not separately attribute AI Mode or AI Overviews referrals in analytics — those clicks arrive bundled into `google / organic` alongside ordinary search traffic.
- Search Console's new reports give impressions but no clicks, so AI-surface CTR is not calculable from Google's own data.
- Third-party AI visibility trackers sample prompts rather than observing your actual users, so they estimate share of voice — a genuinely useful directional signal, but not a traffic measurement. See our [SEO tools news roundup](/resources/news/seo-tools-news-2026) for where that tooling stands.

Anyone quoting you a precise "AI traffic" figure for your site today is modelling, not measuring. That will change as Google extends the reports; it has not changed yet.

[← Back to the SEO News hub](/resources/news) for the running algorithm tracker and every other deep-dive.

## Sources

- <a href="https://blog.google/products-and-platforms/products/search/search-io-2026/" target="_blank" rel="noopener noreferrer">Google Search's I/O 2026 updates: AI agents and more — Google Blog</a>
- <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Introducing Search Generative AI performance reports in Search Console — Google Search Central</a>
- <a href="https://blog.google/products-and-platforms/products/search/new-controls-website-owners/" target="_blank" rel="noopener noreferrer">New opportunities, control and insights for website owners — Google Blog</a>
- <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">Google Search's AI features and your website — Google Search Central</a>
