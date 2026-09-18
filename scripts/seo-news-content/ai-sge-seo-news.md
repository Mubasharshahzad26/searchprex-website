<div class="callout"><strong>Accuracy note:</strong> every date and figure on this page is taken from the primary announcement or from established trade coverage, linked in Sources at the foot of the article. Last verified August 27, 2026; the update log below was verified September 18, 2026. Where a number could not be traced to a named source, it is not published here.</div>

## AI search update log

Reverse chronological. Every entry carries a date, a source, and a label saying how well established it is.

<div class="callout"><strong>How to read the labels.</strong> <strong>Confirmed</strong> — the company announced or stated it. <strong>Observed</strong> — the SEO community documented it and the company has not commented. <strong>Independent testing</strong> — a third party published its own methodology and results. Nothing enters this log without a date and a named source.</div>

### September 16, 2026 — Ahrefs measures what AI Overviews did to CTR in France

**Independent testing.** AI Overviews launched in France on July 22, 2026. Ahrefs compared 963 of the highest-traffic French domains across the 28 days before launch and the 9 days after, splitting out domains where more than 20% of queries trigger an AI Overview from a control group where fewer than 2% do. The most exposed domains lost 23.1% of their click-through rate, and 82.2% of them lost CTR. Ahrefs' own caveat is worth keeping attached to the number: "A slope is not a prediction." Nine days is a short window.

### September 15, 2026 — Google tests text-link ads inside AI Mode

**Observed.** Spotted by Sachin Patel: ads inside AI Mode rendered as ordinary text links with anchor text, labelled "Sponsored", sitting close to the look of the organic response. Google has not commented. If it ships, the citation you earn in an AI answer will sit beside paid links styled almost identically.

### August 28, 2026 — AI Overviews start opening fully expanded

**Confirmed**, as a test. For some queries AI Overviews now load at full length with no "Show more" click, and the follow-up box loads by default, pushing classic results further down the page. A Google spokesperson: "For some queries, AI Overviews may dynamically expand for topics where our systems determine it's most useful for people." Robby Stein added that the expansion stops if the user scrolls.

### August 26, 2026 — Link carousels for developing topics reach AI Mode

**Confirmed.** Robby Stein on X: "Now live in AI Mode (already in AI Overviews): link carousels for developing topics." Google's stated aim is to "make it easy to connect with original coverage and a range of perspectives" — for news publishers, a visible slot inside AI answers on breaking stories.

### August 20, 2026 — A custom "preferred source" button for your own site

**Confirmed** — Search Central documentation changelog. Site owners can now add a custom, interactive button that takes visitors through setting the site as a preferred source and returns them to where they left off. Preferred sources has applied to AI Overviews and AI Mode since May 27.

### August 17, 2026 — AI-generated images appear in AI Overviews, and Google pulls the test

**Confirmed.** Reported on August 17: AI Overviews for recipe queries began showing AI-generated step-by-step illustrations. Inspired Taste objected that it was trying to "replace creators who buy groceries for testing, photography, and filming recipe videos." Google then ended the test the following Monday; Robby Stein: "This was a small experiment we're no longer running." He distinguished it from Google's image-generation feature, which "only triggers when users explicitly ask to generate an image."

### August 14, 2026 — Gemini 3.7 Flash comes to AI Mode for paying subscribers

**Confirmed.** Robby Stein and Rajan Patel announced it on X: "Rolling out globally today in AI Mode for Google AI Pro & Ultra subscribers in English." It is selected manually by subscribers; Google did not describe it as a change to the default model announced at I/O, covered below.

### May 27, 2026 — Preferred sources extends to AI Overviews and AI Mode

**Confirmed** — Search Central documentation changelog. Google updated the feature's availability because preferred sources "is starting to roll out to AI Overviews and AI Mode."

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

- <a href="https://ahrefs.com/blog/ai-overviews-france-impact/" target="_blank" rel="noopener noreferrer">AI Overviews Cut CTR by 23.1% in France — Ahrefs, September 16, 2026</a>
- <a href="https://www.seroundtable.com/google-ai-mode-text-link-ads-42082.html" target="_blank" rel="noopener noreferrer">Google Testing Text Link Ads In Google AI Mode — Search Engine Roundtable, September 15, 2026</a>
- <a href="https://www.seroundtable.com/google-ai-overviews-push-ai-mode-responses-41974.html" target="_blank" rel="noopener noreferrer">Google Making AI Overviews Into AI Mode Responses — Search Engine Roundtable, August 28, 2026</a>
- <a href="https://www.seroundtable.com/google-ai-mode-link-carousels-41947.html" target="_blank" rel="noopener noreferrer">Google AI Mode Adds Link Carousels For Developing Topics — Search Engine Roundtable, August 26, 2026</a>
- <a href="https://www.seroundtable.com/ai-generated-images-google-ai-overviews-41872.html" target="_blank" rel="noopener noreferrer">AI-Generated Images In Google AI Overviews — Search Engine Roundtable, August 17, 2026</a>
- <a href="https://www.seroundtable.com/google-search-gemini-3-7-flash-41879.html" target="_blank" rel="noopener noreferrer">Google Search AI Mode Using Gemini 3.7 Flash — Search Engine Roundtable, August 17, 2026</a>
- <a href="https://developers.google.com/search/updates" target="_blank" rel="noopener noreferrer">Latest Google Search Documentation Updates — Google Search Central</a>
- <a href="https://blog.google/products-and-platforms/products/search/search-io-2026/" target="_blank" rel="noopener noreferrer">Google Search's I/O 2026 updates: AI agents and more — Google Blog</a>
- <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Introducing Search Generative AI performance reports in Search Console — Google Search Central</a>
- <a href="https://blog.google/products-and-platforms/products/search/new-controls-website-owners/" target="_blank" rel="noopener noreferrer">New opportunities, control and insights for website owners — Google Blog</a>
- <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">Google Search's AI features and your website — Google Search Central</a>
