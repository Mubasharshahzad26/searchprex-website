// app/blog/[slug]/posts.ts
// Server-safe post data. Extracted from page.tsx so that page.tsx can be a
// Server Component and export generateMetadata — a "use client" page cannot,
// which is why every blog post was serving the root layout default (the
// homepage title and description) to Google.

/* ── posts data ── */
export const posts = [
  {
    slug:        "keyword-research-for-law-firms",
    category:    "Content Strategy",
    subcategory: "Law Firms",
    title:       "Keyword Research for Lawyers and Law Firms",
    excerpt:     "Start with the matters you take and the places you serve. A step-by-step method using free data, and the words bar rules keep off your pages.",
    readTime:    "10-minute read",
    date:        "September 28, 2026",
    tags:        ["keyword research", "law firm seo", "legal seo", "search console"],
    stat:        { value: "4", label: "Free data sources" },
    /* Unsplash — law books / legal research */
    heroImage:   "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=85&auto=format&fit=crop",
    toc: [
      "Why keyword research is different for law firms",
      "Step 1 — Start with the matters you actually take",
      "Step 2 — Add the places you serve",
      "Step 3 — Sort every search by intent",
      "Step 4 — Get real search terms from free sources",
      "Step 5 — Map one topic to one page",
      "Step 6 — Look at the results before you write",
      "Step 7 — Keep bar rules in mind when you choose words",
      "Step 8 — Measure what the pages are found for",
      "Conclusion",
    ],
    content: `
      <h2>Why keyword research is different for law firms</h2>
      <p>Most keyword research advice is written for sites that want as much traffic as possible. A law firm does not. It wants the right person, in the area it can serve, with a matter it takes. A thousand visitors reading about a practice area you do not handle, or from a state where you are not licensed, are worth nothing. That changes the whole method: you start from the firm, not from a keyword tool.</p>
      <p>Legal searches also split into three very different moments. Someone searching <em>car accident lawyer in Plano</em> is ready to call today. Someone searching <em>how much does a divorce lawyer cost</em> is comparing. Someone searching <em>how is child custody decided</em> may be months from hiring anyone. Good law firm keyword research finds all three and gives each a different page.</p>

      <h2>Step 1 — Start with the matters you actually take</h2>
      <p>Write down every type of matter the firm handles, in the words a client would use, not the words on your letterhead. "Family law" is a practice area; people search for <em>divorce</em>, <em>child custody</em>, <em>child support</em>, <em>alimony</em> and <em>prenup</em>. "Personal injury" becomes <em>car accident</em>, <em>truck accident</em>, <em>slip and fall</em>, <em>dog bite</em> and <em>wrongful death</em>.</p>
      <p>Then cross out anything you would turn away. Keyword research that ignores intake criteria produces pages that bring calls you cannot take. This list — matters you want, in client language — is the backbone of everything that follows.</p>
      <div class="callout"><strong>Quick test:</strong> if a page on your site covers more than one of these matters, it is probably trying to rank for all of them and ranking for none. Our <a href="/services/law-firm-seo/family-law">family law SEO</a> page explains why each matter needs its own page.</div>

      <h2>Step 2 — Add the places you serve</h2>
      <p>Legal search is local. People add a city, a county, a neighbourhood or a courthouse — <em>divorce lawyer Fort Bend County</em>, <em>DUI attorney Tempe</em>. For each matter, list the places you genuinely serve: the city of each office, the counties whose courts you appear in, and the nearby towns clients come from.</p>
      <p>Two cautions. Do not stuff <em>near me</em> into titles and headings; Google already works out proximity from the searcher's location, and the phrase reads badly. And do not build pages for places you do not serve. Near-identical city pages with only the name swapped are what Google's spam policies call doorway pages, and they can hurt the whole site.</p>

      <h2>Step 3 — Sort every search by intent</h2>
      <p>Put each phrase into one of three groups, because each group belongs on a different kind of page:</p>
      <ul>
        <li><strong>Ready to hire</strong> — matter + lawyer/attorney + place (<em>child custody lawyer Grand Rapids</em>). These belong on practice-area and location pages, and they are what the map pack answers.</li>
        <li><strong>Comparing</strong> — cost, reviews, "best", "how to choose" (<em>how much does a probate lawyer cost</em>). These belong on the same practice pages as clear, honest answers, or on a dedicated cost page.</li>
        <li><strong>Researching</strong> — questions about the law or the process (<em>do I have to sell the house in a divorce</em>). These belong in guides that answer the question plainly and link to the practice page for when the reader is ready.</li>
      </ul>

      <h2>Step 4 — Get real search terms from free sources</h2>
      <p>You do not need to guess, and you do not need an expensive tool to start. Four free sources give you real phrases:</p>
      <ul>
        <li><strong>Google Search Console</strong> — the Queries report shows the exact searches your site already appears for, with impressions and position. It is the best keyword source a firm has, because it is your own data. Filter by page to see what each page is really being found for.</li>
        <li><strong>Google Business Profile</strong> — the Performance report's <a href="https://support.google.com/business/answer/9918094?hl=en" target="_blank" rel="noopener">searches breakdown</a> lists the terms people used when your profile appeared. For map pack visibility, this is the closest thing to a keyword report.</li>
        <li><strong>Google autocomplete and "People also ask"</strong> — type the start of a matter plus your city and note what Google suggests, then read the questions in the People also ask box. These are the questions to answer in guides.</li>
        <li><strong>Google Keyword Planner</strong> — free inside a Google Ads account. It often shows broad ranges rather than exact numbers, which is enough to compare phrases against each other.</li>
      </ul>
      <p>To speed up the grouping step, our free <a href="/tools/keyword-research">AI keyword research tool</a> takes a topic and returns keywords grouped by theme with the intent behind each and the page to build. It shows no search volumes, on purpose — volumes need a paid data source, and inventing them helps nobody.</p>

      <h2>Step 5 — Map one topic to one page</h2>
      <p>Give every page one main topic and a handful of close variations. Two pages chasing the same search split your signals and usually both lose. A simple map for a small family law firm might look like this:</p>
      <table>
        <thead><tr><th>Page</th><th>Main topic</th><th>Close variations</th></tr></thead>
        <tbody>
          <tr><td>Divorce</td><td>divorce lawyer + city</td><td>divorce attorney, uncontested divorce, contested divorce</td></tr>
          <tr><td>Child custody</td><td>child custody lawyer + city</td><td>custody attorney, parenting time, custody modification</td></tr>
          <tr><td>Child support</td><td>child support lawyer + city</td><td>support modification, back child support</td></tr>
          <tr><td>Guide</td><td>how is custody decided in [state]</td><td>best interests of the child, custody factors</td></tr>
        </tbody>
      </table>
      <p>Then write the title of each page for its main topic, with the place, and check how it will look in results with the <a href="/tools/serp-simulator">SERP simulator</a> — the end of a long title gets cut.</p>

      <h2>Step 6 — Look at the results before you write</h2>
      <p>Search each main topic yourself and look at what Google shows. If the map pack sits at the top, your Business Profile matters as much as the page. If the first results are Avvo, FindLaw and Justia, a specific, well-answered page can outrank a directory listing. If an AI Overview answers the question, write the answer plainly in the first paragraph so it can be quoted. The results tell you what kind of page Google thinks the search deserves.</p>

      <h2>Step 7 — Keep bar rules in mind when you choose words</h2>
      <p>Some of the most searched words are ones a lawyer cannot always use. Under <a href="https://www.americanbar.org/groups/professional_responsibility/publications/model_rules_of_professional_conduct/rule_7_2_advertising/" target="_blank" rel="noopener">ABA Model Rule 7.2(c)</a>, a lawyer may say they are certified as a specialist only when an approved organisation has certified them, and the organisation must be named. States adopt their own versions of the rules, and many are strict about words like <em>specialist</em>, <em>expert</em> and <em>best</em>. Target the search, not the claim: a page can answer what someone looking for "the best divorce lawyer" needs without calling the firm the best. When in doubt, check your state bar's advertising rules.</p>

      <h2>Step 8 — Measure what the pages are found for</h2>
      <p>Six to eight weeks after a page goes live, open Search Console, filter the Queries report by that page and compare what it is found for with what you planned. New phrases you did not expect are ideas for sections or new pages; phrases where you sit on page two are the ones to improve first. Keyword research for law firms is not done once — it is a quarterly check against your own data.</p>

      <h2>Conclusion</h2>
      <p>Start with the matters you take and the places you serve, sort every search by how close the person is to hiring, and give each group its own page. Use your own Search Console and Business Profile data before any paid tool, and choose words your state bar allows. To check the rest of the site against the same standard, run the free <a href="/resources/law-firm-seo-audit-checklist">law firm SEO audit checklist</a> — or see how we do it for firms on the <a href="/services/law-firm-seo">law firm SEO</a> page.</p>
    `,
    author: {
      name: "Mubashar Sharif",
      role: "Founder & SEO Expert",
      bio: "Mubashar is an SEO analyst with 5+ years of hands-on SEO, Semrush and HubSpot certified. He builds practice-area and location pages for US law firms and local businesses.",
    },
  },
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
      name: "Mubashar Sharif",
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
    author: { name: "Mubashar Sharif", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
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
    author: { name: "Mubashar Sharif", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
  {
    slug:        "fix-crawled-currently-not-indexed-ecommerce",
    category:    "E-commerce SEO",
    subcategory: "Indexing",
    title:       "How to Fix 'Crawled – Currently Not Indexed' on Product Pages: Ecommerce Recovery Guide",
    excerpt:     "Struggling with product pages deindexed in Search Console? Learn the 5 technical culprits behind mass ecommerce deindexing and our step-by-step recovery framework.",
    readTime:    "12-minute read",
    date:        "September 29, 2026",
    stat:        { value: "+202%", label: "Indexed SKUs" },
    heroImage:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
    tags:        ["crawled currently not indexed", "e-commerce seo", "product pages", "technical seo", "indexing recovery"],
    toc: [
      "What 'Crawled – Currently Not Indexed' actually means",
      "5 technical culprits behind mass product deindexing",
      "The 5-step indexing recovery framework",
      "Platform-specific fixes: Shopify vs WooCommerce",
      "Case study results: 35,000-SKU recovery",
      "Frequently asked questions",
      "Action checklist for this week",
    ],
    content: `
<div class="callout">
<strong>Direct Answer for AI Overviews & Searchers (TL;DR):</strong>
<em>"Crawled – currently not indexed"</em> in Google Search Console means Googlebot successfully visited and rendered your ecommerce product page, but evaluated its content and structural signals as falling below its indexing quality threshold. Mass ecommerce deindexing is typically caused by faceted navigation crawl traps, manufacturer boilerplate descriptions, orphan product pages with click depth &gt; 3, and conflicting canonical tags. To fix it, you must block junk filter parameters in <code>robots.txt</code>, segment dynamic XML sitemaps by category, inject unique buyer-focused specifications at scale, and rebuild internal link equity silos across your store.
</div>

<p>Seeing thousands of product pages drop from Google's index is the single most frustrating technical issue an online store owner or SEO team can face.</p>
<p>You launch 10,000+ products, submit your sitemap, and wait for organic traffic. But a few weeks later, Google Search Console (GSC) flags a steep drop in indexed pages. When you open the <strong>Page Indexing Report</strong>, thousands of your revenue-generating SKUs are dumped into one dreaded bucket: <strong>"Crawled — currently not indexed"</strong>.</p>
<p>When this happens, your products become invisible to Google Search, Google Shopping, and AI answer engines. Below is our complete breakdown of why Google deindexes ecommerce product pages, the 5 hidden culprits behind mass catalog drops, and the step-by-step recovery framework we used to lift a 35,000-SKU store's indexation rate from 32% to over 94%.</p>

<h2>What 'Crawled – Currently Not Indexed' actually means</h2>
<p>Before fixing the issue, you must understand how Google evaluates URLs in ecommerce catalogs. There is a critical difference between the two primary exclusion buckets:</p>

<table>
<thead>
<tr>
<th>GSC Status</th>
<th>What It Means</th>
<th>Root Cause</th>
<th>Primary Fix</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Discovered — currently not indexed</strong></td>
<td>Google knows the URL exists (via sitemap or link) but <em>has not crawled it yet</em>.</td>
<td>Crawl budget exhaustion, server overload, or weak site authority.</td>
<td>Optimize crawl paths via <a href="/blog/crawl-budget-optimization-guide">Crawl Budget Optimization</a> and reduce server response latency.</td>
</tr>
<tr>
<td><strong>Crawled — currently not indexed</strong></td>
<td>Googlebot <em>visited, rendered, and parsed the page</em>, but deliberately decided <strong>NOT</strong> to index it.</td>
<td>Low content value, duplicate boilerplate, or conflicting canonical signals.</td>
<td>Content differentiation, structural redesign, and internal link equity routing.</td>
</tr>
</tbody>
</table>

<div class="callout">
<strong>Key Rule of Thumb:</strong> If a URL is in <em>"Crawled — currently not indexed"</em>, re-submitting your sitemap or using third-party indexing tools will <strong>not</strong> fix it. Google has already seen the page and rejected it based on quality and architecture signals.
</div>

<figure class="my-8">
<img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop" alt="Large ecommerce warehouse catalog management" class="rounded-xl border border-[#e5e7eb] w-full" />
<figcaption class="mt-2 text-center text-xs text-[#6b7280]">Large e-commerce catalogs with thousands of SKUs require tight crawl hygiene and unique content to maintain 90%+ indexation rates.</figcaption>
</figure>

<h2>5 technical culprits behind mass product deindexing</h2>
<p>Through hundreds of <a href="/services/technical-seo">technical SEO audits</a> for stores on Shopify, WooCommerce, and Magento, we have found that 95% of deindexing cases trace back to these 5 structural flaws:</p>

<h3>1. Faceted Navigation &amp; Query Parameter Sprawl</h3>
<p>Faceted filters (sorting by color, size, price range, or brand) generate millions of virtual URLs (e.g., <code>store.com/shop?color=black&amp;size=xl&amp;sort=price_desc</code>). When Googlebot spends 80% of its resources crawling filter combinations, it exhausts your store's render budget before reaching your primary product URLs.</p>

<h3>2. Manufacturer Boilerplate &amp; Thin Descriptions</h3>
<p>If your store imports descriptions directly from manufacturer feeds, your text is identical to hundreds of other retail websites. Google applies a sitewide <strong>Quality Threshold</strong>. When thousands of SKUs carry 3 lines of manufacturer text and near-identical specs, Google treats them as low-value duplicates and drops them from the index. (See our breakdown on <a href="/blog/ecommerce-product-page-seo">Product Page SEO at Scale</a>).</p>

<h3>3. Out-of-Stock SKUs Generating "Soft 404s"</h3>
<p>When an item goes out of stock and the page displays "Product Unavailable" with no structured details, Googlebot flags it as a <strong>Soft 404</strong> and drops it from the index. If 30% of your catalog is out of stock, your store's overall indexation ratio collapses.</p>

<h3>4. Orphaned Products with Click Depth &gt; 3</h3>
<p>If a product page cannot be reached within 3 clicks from your homepage or primary category navigation, Googlebot considers it unimportant. Without strong internal links, the URL lacks the internal PageRank needed to stay in the index.</p>

<h3>5. Canonical Tag Mismatches</h3>
<p>When a product page's canonical tag points to a parent category, an HTTP version, or a variant that returns a 301 redirect, Google receives conflicting signals and ignores the page entirely.</p>

<h2>The 5-step indexing recovery framework</h2>
<p>This is the exact step-by-step framework used by <a href="/experts">SearchPrex's SEO Specialists</a> to recover deindexed product catalogs across multi-thousand SKU brands:</p>

<figure class="my-8">
<img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&auto=format&fit=crop" alt="Technical server and robots.txt architecture setup" class="rounded-xl border border-[#e5e7eb] w-full" />
<figcaption class="mt-2 text-center text-xs text-[#6b7280]">Restricting crawl access to low-value filter combinations frees up server and crawl capacity for primary product URLs.</figcaption>
</figure>

<h3>Step 1 — Block Crawl Traps in robots.txt</h3>
<p>Prevent Googlebot from wasting crawl cycles on non-indexable filter query strings. Add strict disallow directives to your <code>robots.txt</code>:</p>
<pre><code># Block Faceted Filter Traps
User-agent: *
Disallow: /*?*sort=
Disallow: /*?*price=
Disallow: /*?*filter*
Disallow: /*?*dir=
Disallow: /*?*limit=

# Allow Primary Clean Product &amp; Category URLs
Allow: /products/
Allow: /collections/
Allow: /shop/</code></pre>

<h3>Step 2 — Segment Dynamic XML Sitemaps by Brand &amp; Category</h3>
<p>Never submit a single massive sitemap containing 50,000 URLs. When indexation fails on a single massive file, GSC does not tell you <em>which</em> section of your inventory has quality problems.</p>
<p>Instead, chunk your XML sitemaps into clean, segmented files containing 2,000 to 5,000 URLs each (e.g., <code>sitemap-category-knives.xml</code>, <code>sitemap-category-optics.xml</code>). This isolates indexation bottlenecks immediately.</p>

<h3>Step 3 — Programmatic Content Differentiation</h3>
<p>To pass Google's indexation quality threshold, every product page must contain unique, searchable value. If you have 10,000 SKUs, manual rewriting is impossible. Use structured programmatic enhancement:</p>
<ul>
<li><strong>Feature Comparison Table:</strong> Add structured technical specs (Weight, Material, Dimensions, Compatibility).</li>
<li><strong>Dynamic Buyer Use-Cases:</strong> State clearly <em>who</em> the product is for (e.g., "Best for heavy-duty field dressing").</li>
<li><strong>Structured Schema Markup:</strong> Embed JSON-LD <code>Product</code> and <code>Offer</code> schema so Googlebot and LLM search engines can parse inventory and pricing instantly.</li>
</ul>

<h3>Step 4 — Rebuild Internal Link Equity (Click Depth &lt; 3)</h3>
<p>Google indexes pages that are structurally important to your website:</p>
<ul>
<li><strong>Implement Semantic Breadcrumbs:</strong> Use Schema-backed <code>BreadcrumbList</code> on every single SKU (<em>Home &gt; Hunting Gear &gt; Fixed Blade Knives &gt; Product Name</em>).</li>
<li><strong>Dynamic "Related SKUs" Modules:</strong> Place smart contextual internal links on every product page linking to complementary items within the same category silo.</li>
<li><strong>Topical Blog Interlinking:</strong> Link directly from top-performing guides to individual product pages.</li>
</ul>

<h3>Step 5 — Enforce Clean Self-Referential Canonicals</h3>
<p>Ensure every canonical product URL self-references its clean permalink without parameters, tracking tags (UTMs), or trailing slash variations.</p>

<h2>Platform-specific fixes: Shopify vs WooCommerce</h2>

<h3>For Shopify Stores</h3>
<p>By default, Shopify generates duplicate URLs for products inside collections (<code>/collections/apparel/products/t-shirt</code> instead of <code>/products/t-shirt</code>).</p>
<p>Update your theme's collection product grid template to ensure internal links always point directly to the canonical <code>/products/t-shirt</code> permalink.</p>

<h3>For WooCommerce Stores</h3>
<p>WooCommerce generates archives for every single product attribute (<code>/pa_color/black/</code>, <code>/pa_size/xl/</code>).</p>
<p>In your SEO plugin (Yoast / RankMath), set all attribute taxonomies (<code>pa_*</code>) to <strong><code>noindex, follow</code></strong> to keep your crawl budget 100% focused on real revenue pages.</p>

<h2>Case study results: 35,000-SKU recovery</h2>
<p>In our client case study for a large outdoor online store (<a href="/case-studies/ecommerce/michigan-outdoor-sports">Michigan Outdoor Sports</a>), over 20,000 SKUs were dropped into <em>"Crawled – currently not indexed"</em> following an unmanaged theme overhaul.</p>

<figure class="my-8">
<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop" alt="Search Console analytics and traffic growth dashboard" class="rounded-xl border border-[#e5e7eb] w-full" />
<figcaption class="mt-2 text-center text-xs text-[#6b7280]">Recovering indexation on high-margin product lines directly translates to sustained organic revenue growth.</figcaption>
</figure>

<p>By blocking 45,000+ faceted filter variations in <code>robots.txt</code>, programmatically generating unique technical spec tables across 150 brands, and rebuilding internal category silos, the results within 60 days were transformative:</p>
<ul>
<li><strong>Indexed Pages:</strong> Increased from <strong>11,200 to 33,850+ SKUs (+202% Indexation Rate)</strong>.</li>
<li><strong>Organic Search Clicks:</strong> Grew by <strong>+184% within 60 days</strong>.</li>
<li><strong>Zero Drop-off:</strong> GSC "Crawled — currently not indexed" dropped from 68% of the catalog to under 4%.</li>
</ul>
<p>A similar approach on <a href="/case-studies/ecommerce/smk-store">SMK Store</a> lifted indexation by 285% and drove a 75% US revenue increase within two months.</p>

<h2>Frequently asked questions</h2>

<h3>Can I use the Google Indexing API to force product page indexing?</h3>
<p><strong>No.</strong> Google's official documentation explicitly restricts the Google Indexing API to <code>JobPosting</code> and <code>BroadcastEvent</code> structured data. Submitting standard ecommerce product URLs through multi-service accounts violates Google's API Terms of Service and will not solve quality-based deindexing. (Read our deep dive: <a href="/blog/google-indexing-api-python">The Google Indexing API Is Not a Shortcut</a>).</p>

<h3>How long does it take for Google to re-index fixed product pages?</h3>
<p>Typically between <strong>2 to 6 weeks</strong>. The speed depends on your store's domain authority, crawl frequency, and how cleanly you submit your segmented sitemaps and internal link updates.</p>

<h3>Should I delete or noindex out-of-stock products?</h3>
<p>If the item is <strong>temporarily out of stock</strong>: Keep it live, show an email waitlist form, keep structured data active, and display relevant alternative products. If the item is <strong>permanently discontinued</strong>: 301 redirect it to the closest parent category or replacement SKU. If no equivalent exists, serve a clean 410 Gone status.</p>

<h2>Action checklist for this week</h2>
<ol>
<li>Export the Page Indexing report from Google Search Console and calculate what percentage of your catalog sits in "Crawled — currently not indexed".</li>
<li>Audit your <code>robots.txt</code> file and ensure faceted filter parameters (<code>?sort=</code>, <code>?price=</code>) are disallowed from burning crawl budget.</li>
<li>Chunk your sitemaps by brand and product category so you can pinpoint which inventory lines are underperforming.</li>
<li>If your store is losing organic revenue to indexing issues, get a free 24-hour technical audit from our team on the <a href="/free-audit">Free SEO Audit</a> page — or explore our full suite of <a href="/services/ecommerce-seo">Ecommerce SEO Services</a>.</li>
</ol>
`,
    author: { name: "Mubashar Sharif", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
];
 
export function getRelated(currentSlug: string, category: string) {
  return posts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 3);
}
 
// Article body rendering (Markdown -> styled HTML) lives in lib/render-article
// so the news routes can share it without importing this file's post data.

export type Post = (typeof posts)[number];
