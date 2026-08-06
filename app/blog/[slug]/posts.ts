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
    title:       "Crawl Budget Optimization: The Complete 2026 Guide for Large E-commerce Sites",
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
      <p>After fixing crawl budget issues, don't just wait. Submit your sitemap in GSC and use the URL Inspection tool to request indexing on your most important pages first. Batch submissions of 200-300 URLs per day gives the best results.</p>
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
    title:       "Google Indexing API: How to Submit 1,000 URLs/Day with Python",
    excerpt:     "The standard GSC submission is slow. This step-by-step guide shows you how to build a 5-account rotator system for mass URL submission.",
    readTime:    "18-minute read",
    date:        "May 10, 2026",
    stat:        { value: "1,000/day", label: "URL Submissions" },
    heroImage:   "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=85&auto=format&fit=crop",
    tags:        ["indexing api", "python", "google search console", "automation"],
    toc:         ["Why the standard GSC is too slow","Google Indexing API setup","Python script walkthrough","5-account rotator system","Rate limits & best practices","Results to expect"],
    content:     `<h2>Why the standard GSC is too slow</h2><p>Google Search Console's URL inspection tool limits you to a handful of submissions per day. For large e-commerce sites trying to get thousands of product pages indexed, this is completely impractical.</p><h2>Google Indexing API setup</h2><p>The Indexing API allows up to 200 URL submissions per day per service account — and you can use multiple accounts to scale this significantly.</p>`,
    author: { name: "Mubashar Shahzad", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
  {
    slug:        "ecommerce-product-page-seo",
    category:    "E-commerce SEO",
    subcategory: "Product Pages",
    title:       "Product Page SEO at Scale: How to Write Unique Content for 10,000+ SKUs",
    excerpt:     "Duplicate boilerplate content is the #1 reason e-commerce product pages fail to index.",
    readTime:    "15-minute read",
    date:        "May 5, 2026",
    stat:        { value: "+75%", label: "Revenue" },
    heroImage:   "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&auto=format&fit=crop",
    tags:        ["product pages", "e-commerce", "content", "indexing"],
    toc:         ["The duplicate content problem","Brand-by-brand strategy","Content template","Scaling with AI","Results"],
    content:     `<h2>The duplicate content problem</h2><p>Most e-commerce product pages are nearly identical — same boilerplate description, same spec table, same FAQ. Google sees these as duplicate content and refuses to index them.</p>`,
    author: { name: "Mubashar Shahzad", role: "Founder & SEO Expert", bio: "Mubashar is an SEO analyst with 5+ years specializing in large-scale e-commerce SEO." },
  },
];
 
export function getRelated(currentSlug: string, category: string) {
  return posts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 3);
}
 
export const styledContent = (html: string) =>
  html
    .replace(/<h2>/g, `<h2 style="font-size:1.5rem;font-weight:900;color:#0a0f2e;margin:2.5rem 0 1rem;padding-bottom:0.5rem;border-bottom:2px solid #e5e7eb">`)
    .replace(/<p>/g, `<p style="font-size:1.0625rem;color:#374151;margin-bottom:1.25rem;line-height:1.85">`)
    .replace(/<div class="callout">/g, `<div style="background:#EEEDFE;border-left:4px solid #534AB7;border-radius:8px;padding:1rem 1.25rem;margin:1.5rem 0;font-size:0.9375rem;color:#3C3489">`)
    .replace(/<code>/g, `<code style="background:#f1f5f9;border-radius:4px;padding:2px 6px;font-size:0.875rem;color:#0a0f2e">`);

export type Post = (typeof posts)[number];
