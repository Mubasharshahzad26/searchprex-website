// app/services/technical-seo/data.ts
//
// The questions and answers on /services/technical-seo, in one place.
//
// Every figure below is backed by a named case study or a dated screenshot:
// Michigan Outdoor Sports, approximately 3,000 indexed pages in mid-May 2026 to
// 11,549 on 25 July 2026 (public/images/proof/mso-gsc-indexing-full.png); Remit
// Choice, 113K clicks and 5.76M impressions in 2024.

export interface QA {
  q: string;
  a: string;
}

/** Always-visible answer capsules near the top — the unit AI answers lift. */
export const CAPSULES: QA[] = [
  {
    q: "What does a technical SEO service actually fix for US websites?",
    a: "Technical SEO fixes the architectural reasons Googlebot and AI crawlers cannot find, render, or keep your pages: crawl budget wasted on faceted parameter URLs, pages stuck in “Crawled – currently not indexed”, broken canonicals and redirect chains, slow Core Web Vitals (INP, LCP, CLS), and missing JSON-LD or llms.txt entity architecture.",
  },
  {
    q: "How do I know if my site has a technical SEO and indexing problem?",
    a: "Open Google Search Console → Pages. If “Not indexed” is growing faster than “Indexed”, or thousands of URLs sit under “Crawled – currently not indexed” or “Discovered – currently not indexed”, Google is choosing not to keep your pages. That is a template and crawl-budget problem before it is a content problem.",
  },
  {
    q: "How long do technical SEO fixes take to show in Search Console?",
    a: "Indexing and Core Web Vitals changes usually appear in Search Console two to four weeks after Googlebot recrawls the fixed templates. On Michigan Outdoor Sports, indexed pages rose from about 3,000 to 11,549 (+285%) with +83% US organic clicks in roughly ten weeks between May and July 2026.",
  },
];

/** The collapsible FAQ further down. */
export const FAQS: QA[] = [
  {
    q: "How do you optimize technical SEO for ChatGPT, Perplexity, and Google AI Overviews?",
    a: "AI retrieval crawlers (OAI-SearchBot, GPTBot, PerplexityBot, and Google-Extended) have stricter timeout budgets than Googlebot and do not execute heavy client-side JavaScript reliably. We ensure server-side rendered HTML, sub-200ms INP responsiveness, validated @graph JSON-LD schema, and a structured /llms.txt manifest so answer engines index and cite your pages accurately.",
  },
  {
    q: "Why are engineering and marketing teams exhausted by traditional SEO agencies?",
    a: "Most agencies hand you a 100-page automated Screaming Frog PDF full of minor warnings, sell useless Domain Authority (DA/PA) backlink metrics, and never ship a single template fix. At SearchPrex, you work directly with Founder Mubashar Sharif (5+ years mastery, #1 ranked Cleveland OH local SEO authority), get template-level implementation or developer-ready tickets, and can test our work with a 7-Day Free Trial.",
  },
  {
    q: "My site has 10,000+ pages — can you handle large-scale indexing recovery?",
    a: "Yes. Large catalogues and high-page-count sites are where most of our work has been done: Michigan Outdoor Sports went from about 3,000 to 11,549 indexed pages (+285%) between May and July 2026, and Remit Choice generated 113K organic clicks and 5.76M impressions in 2024—both verified in Google Search Console.",
  },
  {
    q: "What are Core Web Vitals (INP, LCP, CLS) and how do you fix them?",
    a: "Interaction to Next Paint (INP) replaced FID as Google's responsiveness metric alongside Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS). Instead of patching pages one by one, we fix main-thread script blocking, image priority, and layout shifts at the template level.",
  },
  {
    q: "Do you work with Next.js, Shopify, WooCommerce, and WordPress sites across the USA?",
    a: "Yes. Next.js and React apps often suffer from hydration, canonical, and SSR/CSR mismatches; Shopify brings duplicate collection-path URLs; WordPress and WooCommerce bring plugin bloat and parameter crawl traps. We diagnose and fix all four across US markets.",
  },
  {
    q: "How much does a technical SEO audit cost, and how does the 7-Day Free Trial work?",
    a: "Your initial 24-hour tear-down and limited-time 7-Day Free Trial are free: we inspect your Search Console indexing exclusions, crawl waste, and Core Web Vitals and deliver a prioritized engineering plan. Full implementation is then quoted transparently as a project based on affected templates, with optional month-to-month monitoring afterward.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Technical SEO has a clear audit-and-fix phase scoped as a project, and any ongoing monitoring is month to month with zero long-term lock-in.",
  },
];

/**
 * Search Console statuses people actually search for. Each is a real report
 * label, so a reader who has just seen it in their own GSC can match it here.
 */
export const SYMPTOMS: Array<{ status: string; means: string; costs: string }> = [
  {
    status: "Crawled – currently not indexed",
    means: "Google fetched the page and decided it was not worth keeping in the index.",
    costs: "Usually thin or near-duplicate templates. The page exists for visitors and not for Google Search or AI Overviews.",
  },
  {
    status: "Discovered – currently not indexed",
    means: "Google knows the URL exists in your sitemap but has not spent crawl budget on it.",
    costs: "A crawl-budget bottleneck: junk URLs, faceted filters or weak internal links are eating the visits your money pages need.",
  },
  {
    status: "Duplicate without user-selected canonical",
    means: "Several URLs render the same content and none declares which is the authoritative canonical.",
    costs: "Google picks a canonical for you—often the wrong parameter URL—splitting ranking signals across duplicates.",
  },
  {
    status: "Core Web Vitals: Poor URLs (INP / LCP / CLS)",
    means: "Real US Chrome users (CrUX) are experiencing slow loading, laggy main-thread input (INP > 200ms) or layout shifts.",
    costs: "Hurts both organic rankings and conversion rates — mobile visitors bounce before the page responds.",
  },
];
