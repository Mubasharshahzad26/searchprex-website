<div class="callout"><strong>Accuracy note:</strong> every date and figure on this page is taken from the primary announcement or from established trade coverage, linked in Sources at the foot of the article. Last verified August 27, 2026. Where a number could not be traced to a named source, it is not published here.</div>

## Search Console had a bigger year than any third-party tool

Most "best SEO tools 2026" coverage is affiliate content comparing subscription suites. The more consequential story is that the free tool every site already has gained two entirely new report families and lost one — and all three changes alter what you can and cannot report on.

## June 3: Search Generative AI performance reports

Google introduced generative AI performance reports covering AI Overviews, AI Mode and AI features in Discover, broken down by page, country, device and date.

What you need to know before building a report on it:

- **Impressions only** — no clicks, no CTR, no query data in this version.
- **Data starts May 18, 2026**, with no historical backfill.
- It rolled out to a subset of UK sites first before widening.
- It shipped alongside a control to keep a site out of generative AI features, which Google states is not a ranking signal for results outside those features.

Because there is no backfill, year-on-year AI visibility comparisons will not be possible until May 2027 unless you are exporting and storing the data yourself now. Full analysis in our [AI SEO news deep-dive](/resources/news/ai-sge-seo-news).

## July 7 → July 29: platform properties for social and video

Search Console introduced a new property type on July 7, available to all users from July 29. Connect an **Instagram, TikTok, X or YouTube** account and you get reporting on how those posts perform in Google Search, Discover and Google News:

- **Performance** — clicks, impressions and the search terms leading people to your posts.
- **Insights** — traffic trends and top-performing posts.
- **Achievements** — click milestones across rolling 28-day periods.

The significant part is who it serves: creators with no website of their own can now use Search Console at all. For brands, it closes a real reporting gap — social posts have been ranking in Search for years with no first-party way to see it. If your brand's TikTok or YouTube presence competes for your own branded queries, this is the first time you can quantify that from Google's side rather than inferring it.

## May → August: the FAQ report is being dismantled

FAQ rich results stopped appearing in Google Search on May 7, 2026. The tooling followed on a staged schedule:

- **June 2026** — the FAQ search appearance filter, the FAQ rich result report and Rich Results Test support were removed.
- **August 2026** — FAQ rich result data was removed from the Search Console API.

<div class="callout"><strong>Check your dashboards.</strong> If you have a Looker Studio report, a client dashboard or an internal script pulling FAQ appearance data from the Search Console API, it broke this month. This is the change most likely to be silently producing empty panels in a live client report right now.</div>

Google announced the removal only as a note on the FAQ structured data documentation — no blog post and no stated reason. Existing FAQPage markup remains valid schema.org and causes no harm, but it earns nothing in Search.

## Third-party tooling: what is real, and what to check yourself

The clear direction of travel in 2026 is that the major SEO suites have added AI visibility tracking — measuring how often a brand appears and gets cited in AI answers across assistants including ChatGPT, Perplexity, Gemini, Copilot, AI Overviews and AI Mode. Both Semrush and Ahrefs now report on it, and MCP integrations have begun appearing that let AI assistants query SEO datasets directly in natural language.

We are deliberately not publishing feature-by-feature comparisons or pricing here. Those change monthly, most published comparisons are affiliate-driven, and the figures circulating for prompt-coverage volumes and plan costs rarely trace back to the vendor. Two things are worth verifying directly with any vendor before you buy:

- **How is visibility sampled?** These tools run prompt panels — they observe a sample of prompts, not your actual users. Ask how many prompts, how they are chosen, and how often they refresh.
- **Which surfaces are genuinely covered?** Coverage of AI Mode specifically differs from coverage of AI Overviews, and vendors do not always distinguish them in marketing copy.

Used as a competitive share-of-voice benchmark, these tools are genuinely useful. Used as a traffic measurement, they will mislead you — see the measurement section of our [LLM SEO news deep-dive](/resources/news/llm-seo-news-2026).

## The reporting stack we would run today

1. **Search Console** for organic performance, plus a weekly export of the generative AI impressions report so you have a baseline that Google will not backfill for you.
2. **Platform properties** connected for any social or video channel that carries brand search weight.
3. **An audit of every dashboard** touching FAQ appearance data, which stopped returning results this month.
4. **One AI visibility tracker**, read as competitive share of voice rather than as traffic.
5. **The Search Status Dashboard** for confirming whether a rollout has finished — see our [2026 algorithm update timeline](/resources/news/google-algorithm-updates).

[← Back to the SEO News hub](/resources/news) for the running algorithm tracker and every other deep-dive.

## Sources

- <a href="https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports" target="_blank" rel="noopener noreferrer">Introducing Search Generative AI performance reports in Search Console — Google Search Central</a>
- <a href="https://developers.google.com/search/blog/2026/07/search-console-social-video-platforms" target="_blank" rel="noopener noreferrer">See how content from social and video platforms performs on Google Search — Google Search Central</a>
- <a href="https://www.searchenginejournal.com/google-search-console-adds-social-video-platform-properties/581634/" target="_blank" rel="noopener noreferrer">Google Search Console Adds Reports For Social Posts — Search Engine Journal</a>
- <a href="https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957" target="_blank" rel="noopener noreferrer">Google to no longer support FAQ rich results — Search Engine Land</a>
