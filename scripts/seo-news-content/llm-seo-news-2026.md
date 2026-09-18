<div class="callout"><strong>Accuracy note:</strong> every date and figure on this page is taken from the primary announcement or from established trade coverage, linked in Sources at the foot of the article. Last verified August 27, 2026; the update log below was verified September 18, 2026. Where a number could not be traced to a named source, it is not published here.</div>

## LLM and answer engine update log

Reverse chronological. Every entry carries a date, a source, and a label saying how well established it is.

<div class="callout"><strong>How to read the labels.</strong> <strong>Confirmed</strong> — the company announced or stated it. <strong>Observed</strong> — the SEO community documented it and the company has not commented. <strong>Independent testing</strong> — a third party published its own methodology and results. Nothing enters this log without a date and a named source.</div>

### September 16, 2026 — ChatGPT ads can open a conversation with a sponsored agent

**Confirmed** by OpenAI, which is testing a format that lets people "start a conversation with a business-sponsored agent after clicking an ad in ChatGPT," and emailed advertisers about it alongside other ChatGPT ads changes. Paid placement in answer engines is becoming conversational: the ad is itself an agent that fields follow-up questions before anyone reaches the advertiser's site.

### August 14, 2026 — Gemini 3.7 Flash reaches AI Mode for paying subscribers

**Confirmed.** Robby Stein and Rajan Patel announced it on X: "Rolling out globally today in AI Mode for Google AI Pro & Ultra subscribers in English." Subscribers select it manually; Google did not describe it as a change to the default model announced at I/O.

### June 15, 2026 — Google puts its llms.txt position in writing

**Confirmed** — Search Central documentation changelog. Google added a note to its AI optimization guide to clarify "that while these files aren't needed for Google Search (and won't negatively or positively impact your visibility or rankings), it's fine if you want to maintain these files for other services or systems that use them." That settles, in Google's own documentation, the claim addressed below that llms.txt is a Google requirement.

### May 15, 2026 — Google publishes its own guide to optimizing for generative AI features

**Confirmed** — Search Central documentation changelog. The guide covers non-commodity content, local, shopping, image and video content, "mythbusting common "AEO/GEO" misconceptions," and initial guidance on AI agents. The same day Google clarified that its spam policies "also apply to generative AI responses in Google Search." The answer engine with the most users now publishes its own AEO guidance — worth reading before paying for anyone else's.

### March 4, 2026 — ChatGPT's default model switch narrowed the sites it cites

**Independent testing.** Search Engine Land published the analysis on May 14, 2026, by Olivier de Segonzac using Meteoria monitoring data across 400 daily prompts over 14 weeks. After ChatGPT switched its default model on March 4 from GPT-4o/5.2 to GPT-5.3 Instant, the average number of unique domains cited per response fell from 19 to 15, and unique URLs from 24 to 19. One prompt panel on one platform, so treat it as directional — but the direction is fewer sites sharing the same citation space.

### December 9, 2025 — OpenAI revises its crawler documentation

**Confirmed** — OpenAI documentation; Search Engine Roundtable reported the revision on December 9, 2025. As OpenAI's crawler page reads on September 18, 2026: "Sites that are opted out of OAI-SearchBot will not be shown in ChatGPT search answers, though can still appear as navigational links." It also says it "can take ~24 hours from a site's robots.txt update" for search results to adjust. This is the primary source for the training-versus-retrieval distinction explained below.

## Why this page is shorter on statistics than most

Search "LLM SEO statistics 2026" and you will find dozens of pages quoting precise referral shares, citation rates and traffic percentages. Trace those numbers and most lead to other blog posts rather than to a study, a platform disclosure or a named dataset. We publish the ones that trace to a named source and leave out the ones that do not — which makes this page less dramatic and more usable.

## What is documented about LLM search in 2026

### Google's answer engine, by Google's own numbers

At I/O 2026 Google confirmed AI Overviews passed 2.5 billion monthly users and AI Mode passed 1 billion, with AI Mode queries more than doubling each quarter since launch. Gemini 3.5 Flash became AI Mode's default model globally, and AI Overviews and AI Mode were merged into one continuous experience, live worldwide on desktop and mobile.

### Site owners got their first native AI visibility data

Search Console's Search Generative AI performance reports arrived June 3, 2026, covering AI Overviews, AI Mode and AI features in Discover — impressions, pages, countries and devices, with data starting May 18, 2026 and no backfill. No clicks, no CTR, no queries. Full detail in our [AI SEO deep-dive](/resources/news/ai-sge-seo-news).

### Opting out of AI features is separate from ranking

The control Google shipped alongside those reports lets a site stay out of AI Overviews, AI Mode and AI Overviews in Discover. Google states it is not used as a ranking signal for search results outside those generative AI features. Opting out forfeits AI traffic without, on Google's account, affecting organic position.

## The distinction that actually governs your AI visibility

The single most consequential technical decision in AEO is one many sites make by accident in `robots.txt`: **training crawlers and retrieval crawlers are not the same thing.**

- **Training crawlers** (for example `GPTBot`, `Google-Extended`) gather content used in model training. Blocking them does not affect your Google rankings.
- **Retrieval crawlers** (for example `OAI-SearchBot`) fetch pages to cite in live answers. Block these and you remove yourself from being cited as a source in that platform's search product.

Sites regularly block both with a single broad rule, intending to protect content from training, and quietly delete themselves from answer-engine citations in the process. If you want to be cited but not trained on, those are two different directives and they must be written separately. Our [technical SEO news roundup](/resources/news/technical-seo-news-2026) covers the implementation.

## What AEO practice comes down to

Stripped of the jargon, the durable techniques are unglamorous:

- **Lead with the answer.** A direct two-to-three sentence response immediately under the heading, before context and nuance. Synthesised answers lift self-contained passages; a paragraph that only makes sense after 400 words of preamble cannot be lifted.
- **Own a fact.** Original data, first-hand testing, documented client results. If five sources say the same thing, a model has no reason to cite any particular one. If one source has the number, citing it is unavoidable.
- **Be consistently identifiable.** Same organisation name, same author identity, same core claims across your site and off it. Answer engines resolve entities; ambiguity gets you skipped.
- **Structure for extraction.** Descriptive headings that match real questions, short paragraphs, tables for comparisons, lists for sequences.
- **Stay crawlable to the bots you want.** All of the above is void if a retrieval crawler cannot fetch the page.

<div class="callout"><strong>Worth saying plainly:</strong> Google's own guidance states there are no additional technical requirements and no special AI-specific files needed to appear in its AI features. Any agency selling an "<code>llms.txt</code> package" as a Google requirement is selling something Google says is not required.</div>

## What still cannot be measured honestly

- AI Mode and AI Overviews clicks arrive in analytics bundled into `google / organic`. There is no native split.
- Search Console's AI reports give impressions without clicks, so AI-surface CTR cannot be derived from Google's data.
- Third-party trackers sample prompts to estimate share of voice. That is a legitimate directional signal and a reasonable way to benchmark competitors — it is not a measurement of your traffic.

Treat AEO reporting the way you would treat brand tracking: directionally valuable, not a substitute for a traffic number.

[← Back to the SEO News hub](/resources/news) for the running algorithm tracker and every other deep-dive.

## Sources

- <a href="https://www.seroundtable.com/openai-chatgpt-sponsored-agents-42104.html" target="_blank" rel="noopener noreferrer">OpenAI ChatGPT Ads For Sponsored Agents — Search Engine Roundtable, September 16, 2026</a>
- <a href="https://www.seroundtable.com/google-search-gemini-3-7-flash-41879.html" target="_blank" rel="noopener noreferrer">Google Search AI Mode Using Gemini 3.7 Flash — Search Engine Roundtable, August 17, 2026</a>
- <a href="https://developers.google.com/search/updates" target="_blank" rel="noopener noreferrer">Latest Google Search Documentation Updates — Google Search Central</a>
- <a href="https://searchengineland.com/inside-chatgpt-search-web-run-fan-out-queries-ai-visibility-477339" target="_blank" rel="noopener noreferrer">Inside ChatGPT Search: how web.run and fan-out queries shape AI visibility — Search Engine Land, May 14, 2026</a>
- <a href="https://developers.openai.com/api/docs/bots" target="_blank" rel="noopener noreferrer">Overview of OpenAI Crawlers — OpenAI</a>
- <a href="https://www.seroundtable.com/openai-chatgpt-crawler-oai-searchbot-update-40558.html" target="_blank" rel="noopener noreferrer">OpenAI Updates Its ChatGPT Crawler OAI-SearchBot — Search Engine Roundtable, December 9, 2025</a>
- <a href="https://blog.google/products-and-platforms/products/search/search-io-2026/" target="_blank" rel="noopener noreferrer">Google Search's I/O 2026 updates: AI agents and more — Google Blog</a>
- <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Introducing Search Generative AI performance reports in Search Console — Google Search Central</a>
- <a href="https://blog.google/products-and-platforms/products/search/new-controls-website-owners/" target="_blank" rel="noopener noreferrer">New opportunities, control and insights for website owners — Google Blog</a>
- <a href="https://developers.google.com/search/docs/appearance/ai-features" target="_blank" rel="noopener noreferrer">Google Search's AI features and your website — Google Search Central</a>
