// app/blog/[slug]/posts.ts
// Server-safe post data. Extracted from page.tsx so that page.tsx can be a
// Server Component and export generateMetadata — a "use client" page cannot,
// which is why every blog post was serving the root layout default (the
// homepage title and description) to Google.

/* ── posts data ── */
export const posts = [
  {
    slug:        "crawl-budget-optimization-guide",
    category:    "Technical SEO",
    subcategory: "Crawl Optimization",
    title:       "Crawl Budget Optimization: The 2026 Guide",
    excerpt:     "If Google isn't crawling your most important pages, they won't rank. Here's exactly how to audit and fix crawl budget issues at scale.",
    readTime:    "12-minute read",
    date:        "May 15, 2026",
    tags:        ["crawl budget", "indexing", "technical seo", "e-commerce"],
    stat:        { value: "+285%", label: "Indexing Rate" },
    /* Unsplash — server room / tech */
    heroImage:   "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
    toc: [
      "What is crawl budget?",
      "Why it matters for e-commerce",
      "How to audit your crawl budget",
      "Fix #1 — Remove low-value URLs",
      "Fix #2 — Improve page speed",
      "Fix #3 — Fix internal linking",
      "GSC resubmission strategy",
      "Conclusion",
    ],
    content: `
      <h2>What is crawl budget?</h2>
      <p>Crawl budget is the number of pages Googlebot will crawl on your site within a given timeframe. For large e-commerce sites with 10,000+ pages, this becomes a critical ranking factor — if Google can't crawl your pages, they simply won't rank.</p>
      <p>There are two components: <strong>crawl rate limit</strong> (how fast Googlebot crawls to avoid overloading your server) and <strong>crawl demand</strong> (how much Google wants to crawl based on popularity and freshness).</p>
      <div class="callout"><strong>Pro tip:</strong> Use Google Search Console's Crawl Stats report to see exactly how many pages Googlebot crawls per day on your site. If it's less than 10% of your total pages, you have a crawl budget problem.</div>
      <h2>Why it matters for e-commerce</h2>
      <p>E-commerce sites generate enormous amounts of duplicate or near-duplicate URLs through faceted navigation, session IDs, sorting parameters, and product variants. A 50,000-product site can easily generate 500,000+ URLs — most of which are worthless to Google.</p>
      <p>When Google wastes crawl budget on these low-value URLs, your important product pages and category pages get crawled less frequently — or not at all.</p>
      <h2>How to audit your crawl budget</h2>
      <p>Start with a Screaming Frog crawl to identify all URLs being generated. Then compare this against your GSC coverage report to see which pages are indexed vs crawled vs discovered.</p>
      <p>Look for these red flags: faceted navigation URLs without canonical tags, paginated pages beyond page 3, internal search result pages, and thin content pages with fewer than 200 words.</p>
      <div class="callout"><strong>Tool stack:</strong> Screaming Frog + GSC Crawl Stats + Log file analysis = complete picture of your crawl budget situation.</div>
      <h2>Fix #1 — Remove low-value URLs</h2>
      <p>Add <code>noindex</code> to thin pages, consolidate faceted navigation with canonical tags, and block internal search result pages via robots.txt. This alone can reduce crawlable URLs by 60-80% on most e-commerce sites.</p>
      <h2>Fix #2 — Improve page speed</h2>
      <p>Googlebot crawls faster when your server responds faster. Aim for TTFB under 200ms on product pages. Use a CDN, optimize images, and enable server-side caching.</p>
      <h2>Fix #3 — Fix internal linking</h2>
      <p>Orphan pages — pages with no internal links pointing to them — rarely get crawled. Run a crawl to find all orphan pages and add them to relevant category pages or your XML sitemap.</p>
      <h2>GSC resubmission strategy</h2>
      <p>After fixing crawl budget issues, don't just wait. Submit an updated sitemap in Search Console — that is the mechanism built for volume, and the one Google actually reads at scale.</p>
      <p>Then use <strong>URL Inspection → Request indexing</strong> for your few most important pages only. Manual requests are capped at roughly 10–12 per day per property, so it is a scalpel for a handful of URLs, not a way to push a catalogue. The URL Inspection API has a much larger quota but is read-only: it reports status, it does not submit anything.</p>
      <div class="callout"><strong>Not a shortcut:</strong> the Indexing API does not fill this gap either — it is restricted to job postings and livestream pages, and Google's docs name multi-account rotation as circumvention. See <a href="/blog/google-indexing-api-python">The Google Indexing API Is Not a Shortcut</a>.</div>
      <h2>Conclusion</h2>
      <p>Crawl budget optimization is not a one-time fix — it's an ongoing process. Set up monthly crawl stats monitoring in GSC and re-audit every time you add a major new product category or site section.</p>
    `,
    author: {
      name: "Mubashar Shahzad",
      role: "Founder & SEO Expert",
      bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO. He has managed 40,000+ page sites and solved mass non-indexing issues for brands including smkstore.com and michigansportsoutdoor.com.",
    },
  },
  {
    slug:        "google-indexing-api-python",
    category:    "Technical SEO",
    subcategory: "Indexing",
    title:       "The Google Indexing API Is Not a Shortcut",
    excerpt:     "It only works for job postings and livestreams, and Google's own documentation names multi-account rotation as abuse. Here is what actually gets 10,000 product pages indexed.",
    readTime:    "9-minute read",
    date:        "August 27, 2026",
    stat:        { value: "200/day", label: "Actual API quota" },
    heroImage:   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=85&auto=format&fit=crop",
    tags:        ["indexing api", "indexing", "google search console", "technical seo"],
    toc:         ["What the Indexing API actually does","Why the multi-account trick is a bad trade","Why the myth is so persistent","What actually gets pages indexed at scale","What that looked like on a 35,000-page store","Do this week"],
    content: `
      <div class="callout"><strong>Correction, 27 August 2026:</strong> an earlier version of this article described building a five-account rotator to push around 1,000 URLs a day through the Indexing API. That advice was wrong, and following it risks losing API access. Google's documentation restricts the API to two content types and explicitly names multi-account rotation as circumvention. The article has been rewritten. We would rather correct this in public than quietly delete it.</div>
      <h2>What the Indexing API actually does</h2>
      <p>Google's documentation is not ambiguous about this. In its own words: <em>"The Indexing API can only be used to crawl pages with either JobPosting or BroadcastEvent embedded in a VideoObject."</em></p>
      <p>That is the whole permitted surface. Job posting pages, and livestream event pages. Not product pages, not category pages, not blog posts. The API exists because those two content types expire — a job closes, a stream ends — and Google wanted a way to be told quickly rather than waiting for a recrawl.</p>
      <p>The default quota is <strong>200 publish requests per day, per project</strong>. That number is the source of most of the confusion: it looks like a rate limit to be engineered around, when it is really a limit on a feature that was never meant for your catalogue.</p>
      <h2>Why the multi-account trick is a bad trade</h2>
      <p>The "rotator" approach — several service accounts, requests spread across them — is not a clever workaround. It is the specific behaviour Google's documentation calls out:</p>
      <blockquote>Don't circumvent our submission limits, such as by using multiple accounts.</blockquote>
      <p>And, on the same page:</p>
      <blockquote>Our spam policies apply to content submitted with the Indexing API.</blockquote>
      <p>So the trade is: you spend real engineering time building something that, at best, submits URLs Google has said this endpoint does not crawl — and at worst puts your project's API access and your site's standing at risk. There is no version of that trade that pays.</p>
      <p>This matters more in 2026 than it did a few years ago. Google has confirmed three spam updates this year, in March, June and August. If you are going to spend a week on indexing work, spend it on something that cannot be read as circumvention.</p>
      <h2>Why the myth is so persistent</h2>
      <p>Because people try it and their pages get indexed, so the API gets the credit.</p>
      <p>In practice, nobody runs an indexing script in isolation. The same week, they also submit a sitemap, fix a broken canonical, add internal links from a category page, or prune a few thousand thin URLs that were eating crawl budget. Pages then get indexed — and the most novel-looking thing in that list takes the credit.</p>
      <p>If you want to know whether the API did anything, you would have to run it with no other changes, on a site with no other movement. We have never seen that test done, and we would not spend a client's month on running it.</p>
      <h2>What actually gets pages indexed at scale</h2>
      <p>Indexing is not a queue you can jump. It is a judgement Google makes about whether a page is worth storing. The work is making that judgement easy:</p>
      <ol>
        <li><strong>Fix the reason Google declined.</strong> Open Search Console's Pages report and read the actual reason. "Crawled — currently not indexed" and "Discovered — currently not indexed" mean different things and need different fixes. Most large stores find near-identical boilerplate across thousands of SKUs, which is a content problem no API can solve. See <a href="/blog/ecommerce-product-page-seo">Product Page SEO at Scale</a>.</li>
        <li><strong>Stop wasting the crawl you already get.</strong> Faceted URLs, session parameters and internal search results routinely consume most of a large site's crawl budget. Our <a href="/blog/crawl-budget-optimization-guide">crawl budget guide</a> covers the audit.</li>
        <li><strong>Submit clean XML sitemaps</strong>, split logically, containing only canonical, indexable, 200-status URLs. A sitemap full of redirects and noindexed pages teaches Google to trust it less.</li>
        <li><strong>Link to the pages internally.</strong> An orphan page with no internal links is rarely crawled, whatever you submit. This is the highest-leverage and most-skipped step.</li>
        <li><strong>Use URL Inspection for genuinely urgent pages.</strong> It is meant for a handful of important URLs, not a catalogue — but for those few, it is the supported route.</li>
        <li><strong>Then wait, and re-measure in batches.</strong> Indexing at scale moves over weeks. Changing five things at once means you will never know which one worked.</li>
      </ol>
      <h2>What that looked like on a 35,000-page store</h2>
      <p>SMK Store had over 35,000 product pages that were barely indexed. The cause was not submission volume — it was thin, near-identical boilerplate descriptions tripping duplicate-content filters, plus failing Core Web Vitals.</p>
      <p>We rewrote product content brand by brand, optimised crawl budget, implemented product schema, fixed Core Web Vitals, and resubmitted in batches through Search Console. Indexing rate rose 285%, more than 12,000 product pages were indexed and began ranking, and US revenue grew 75% within two months with no additional ad spend — all verified in Search Console. The full write-up is in the <a href="/case-studies/ecommerce/smk-store">SMK Store case study</a>.</p>
      <p>The honest version of a second project is worth including too. <a href="/case-studies/ecommerce/michigan-outdoor-sports">Michigan Outdoor Sports</a> peaked at +476% organic clicks in March 2026, then lost ground to a gradual de-indexing before we rebuilt it to 11,549 indexed pages and +83% US organic clicks by July. Indexing is not a one-time unlock, and anyone selling it as one is overselling.</p>
      <h2>Do this week</h2>
      <ol>
        <li>Export the Pages report from Search Console and group the exclusion reasons by count. That list, not a script, tells you what to fix.</li>
        <li>Pick the largest group and fix its root cause on a sample of 200 pages.</li>
        <li>Re-measure in three weeks before touching anything else.</li>
        <li>If you have a rotator script in production, retire it. It is buying you nothing and risking API access.</li>
      </ol>
      <h2>Sources</h2>
      <ul>
        <li><a href="https://developers.google.com/search/apis/indexing-api/v3/using-api" target="_blank" rel="noopener noreferrer">How to use the Indexing API — Google Search Central</a></li>
        <li><a href="https://developers.google.com/search/apis/indexing-api/v3/quota-pricing" target="_blank" rel="noopener noreferrer">Indexing API quota and pricing — Google Search Central</a></li>
        <li><a href="https://developers.google.com/search/docs/essentials/spam-policies" target="_blank" rel="noopener noreferrer">Google Search spam policies</a></li>
      </ul>
    `,
    author: { name: "Mubashar Shahzad", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
  {
    slug:        "ecommerce-product-page-seo",
    category:    "E-commerce SEO",
    subcategory: "Product Pages",
    title:       "Product Page SEO at Scale: 10,000+ SKUs",
    excerpt:     "Near-identical boilerplate is the most common reason large catalogues fail to index. Here is the brand-by-brand rewriting method we used to lift one 35,000-page store's indexing rate by 285%.",
    readTime:    "11-minute read",
    date:        "August 27, 2026",
    stat:        { value: "+285%", label: "Indexing rate" },
    heroImage:   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop",
    tags:        ["product pages", "e-commerce", "content", "indexing"],
    toc:         ["The duplicate content problem","Brand-by-brand, not page-by-page","The content template","Where AI fits, and where it gets you hurt","What the results looked like","Do this week"],
    content: `
      <h2>The duplicate content problem</h2>
      <p>Most e-commerce product pages are nearly identical — the same boilerplate description, the same spec table, the same FAQ block, with a model number swapped. Google does not owe you an index slot for each one, and on large catalogues it stops granting them.</p>
      <p>You can see this in Search Console before you see it in revenue. Open the Pages report and look for <strong>"Crawled — currently not indexed"</strong>. On a big catalogue that bucket often holds more URLs than the indexed one. It means Googlebot fetched the page, evaluated it, and decided storing it added nothing to what it already had.</p>
      <p>That is a content judgement, not a technical fault. No sitemap, submission script or API changes it — a point worth making because the workaround industry around indexing is large. We wrote about that in <a href="/blog/google-indexing-api-python">The Google Indexing API Is Not a Shortcut</a>.</p>
      <div class="callout"><strong>Quick diagnostic:</strong> take twenty product URLs from the same category and paste their descriptions into a diff tool. If the only differences are the product name and a couple of numbers, you have found your indexing problem.</div>
      <h2>Brand-by-brand, not page-by-page</h2>
      <p>The instinct on a 35,000-SKU catalogue is to start at SKU 1 and work down. That fails on arithmetic — at ten minutes a page it is over a year of work — and it produces the wrong output anyway, because a writer working alphabetically has no context for what makes a product different from its siblings.</p>
      <p>Work one brand at a time instead. Everything you learn researching a brand — its range, its materials, who buys it, how it differs from the brand next to it on the shelf — applies to every product you write under it. The first page in a brand takes an hour. The thirtieth takes ten minutes and is better, because by then you know what the buyer is actually choosing between.</p>
      <p>It also gives you a natural release unit. Finish a brand, push it, watch indexing for that segment, and you learn whether the approach is working before you have committed the whole catalogue to it.</p>
      <p>Sequence brands by commercial value, not alphabetically: revenue first, then search volume, then how badly the current pages are indexed.</p>
      <h2>The content template</h2>
      <p>A template that produces genuinely different pages constrains structure, not sentences. Ours has five parts:</p>
      <ol>
        <li><strong>What it is, in two sentences.</strong> Written for someone who has landed from search and does not yet know if they are on the right page.</li>
        <li><strong>Who it suits, and who it does not.</strong> The part almost nobody writes, and the part that is genuinely unique per product. Naming who should buy something else builds more trust than another paragraph of praise.</li>
        <li><strong>How it differs from the nearest alternative</strong> — usually the next model up or down in the same range. This is impossible to write generically, which is exactly why it works.</li>
        <li><strong>Specifications</strong>, as structured data and a table. Machine-readable, not prose.</li>
        <li><strong>The two or three questions buyers actually ask</strong>, taken from support tickets and reviews rather than from a keyword tool.</li>
      </ol>
      <p>Note what the template does not do: it does not specify sentence patterns or an opening formula. A template that dictates phrasing recreates the boilerplate you are trying to escape, just with fresher wording.</p>
      <p>Length is not the target. Three hundred words that answer the buyer's actual question beat a thousand words of padding, and Google has been explicit that word count is not a ranking factor.</p>
      <h2>Where AI fits, and where it gets you hurt</h2>
      <p>Google's position is about value, not method: content is not spam because a model helped write it, and it is not acceptable because a human typed it. What the <a href="https://developers.google.com/search/docs/essentials/spam-policies" target="_blank" rel="noopener noreferrer">spam policies</a> describe is scaled content abuse — generating pages at volume primarily to manipulate rankings rather than to help anyone.</p>
      <p>The practical line we work to:</p>
      <ul>
        <li><strong>Reasonable:</strong> drafting from a real spec sheet you supply, restructuring existing copy, generating first passes a subject-matter reviewer then corrects, writing the spec table from structured data.</li>
        <li><strong>Not reasonable:</strong> generating thousands of descriptions from product names alone and publishing them unreviewed. That is the exact pattern that produced the boilerplate problem in the first place — it just produces it faster and in more fluent prose.</li>
      </ul>
      <p>The test we apply before publishing: does this page contain at least one thing that could only have been written by someone who has handled the product or talked to a buyer? If not, it is a rewrite of the same page you already have.</p>
      <p>Budget for review. On the projects where this worked, review time was roughly a third of total effort — and it is the third that produces the "who it does not suit" and "how it differs" sections that carry the whole approach.</p>
      <h2>What the results looked like</h2>
      <p>Two projects, reported honestly, including the one that went backwards before it went forwards.</p>
      <p><strong>SMK Store</strong> — over 35,000 product pages, barely indexed, with thin near-identical descriptions tripping duplicate-content filters and failing Core Web Vitals. We rewrote brand by brand, optimised crawl budget, implemented product schema and fixed Core Web Vitals, resubmitting in batches. Indexing rate rose 285%, more than 12,000 product pages were indexed and began ranking, and US revenue grew 75% within two months with no additional ad spend, verified in Search Console. Full detail in the <a href="/case-studies/ecommerce/smk-store">SMK Store case study</a>.</p>
      <p><strong>Michigan Outdoor Sports</strong> — brand pages never properly submitted, thin content causing mass non-indexing, crawl budget wasted. Organic clicks peaked at +476% in March 2026, then <em>lost ground to a gradual de-indexing</em> before we rebuilt to 11,549 indexed pages, up from roughly 3,000, and +83% US organic clicks by July. Written up in the <a href="/case-studies/ecommerce/michigan-outdoor-sports">Michigan Outdoor Sports case study</a>.</p>
      <p>That second trajectory is the more useful one to plan around. Indexing gains are held, not won — if the underlying content stays thin in places, pages drop back out.</p>
      <h2>Do this week</h2>
      <ol>
        <li>Export the Pages report from Search Console and count how many URLs sit in "Crawled — currently not indexed".</li>
        <li>Diff twenty descriptions from one category. Confirm the cause before committing to a rewrite.</li>
        <li>Pick your highest-revenue brand and rewrite its full range against the five-part template.</li>
        <li>Push that brand alone and watch its indexing for three weeks. Do not start brand two until you know brand one worked.</li>
      </ol>
    `,
    author: { name: "Mubashar Shahzad", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
];
 
export function getRelated(currentSlug: string, category: string) {
  return posts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 3);
}
 
// Article body rendering (Markdown -> styled HTML) lives in lib/render-article
// so the news routes can share it without importing this file's post data.

export type Post = (typeof posts)[number];
