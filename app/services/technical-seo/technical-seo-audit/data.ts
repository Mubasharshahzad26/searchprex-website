// app/services/technical-seo/technical-seo-audit/data.ts
//
// Copy for the technical SEO audit spoke, kept out of the client component so
// page.tsx builds the FAQPage schema from the same arrays the page renders.
//
// Honesty notes:
//   - Technical work has no retainer in lib/pricing. The first audit is free;
//     the fixes are quoted as a project. No price or money-back guarantee is
//     shown on this page, matching /services/technical-seo.
//   - Figures, each readable in a screenshot on this page or its case study:
//     Michigan Outdoor Sports about 3,000 → 11,549 indexed pages (May–Jul
//     2026) and US clicks 224 → 322 (1 Apr–12 Jun vs 13 Jun–29 Aug 2026);
//     Remit Choice 113K clicks in 2024 and #1 for "free of cost money transfer
//     to Pakistan from uk".

export interface QA {
  q: string;
  a: string;
}

export const META = {
  title: "Technical SEO Audit Services | SearchPrex",
  description:
    "Technical SEO audit services for US websites and online stores: crawling, indexing, Core Web Vitals, schema and site structure — a ranked fix list, founder-led. Free 24-hour tear-down.",
  h1: "Technical SEO Audit Services",
  accent: "with a fix list, not a 200-page PDF",
};

/** Signs a site needs an audit, in an owner's words. */
export const SIGNS: Array<{ title: string; body: string }> = [
  { title: "Traffic fell after a redesign or migration", body: "New URLs, lost redirects or a theme that blocks crawling — the most common reason a site drops overnight." },
  { title: "Pages that never get indexed", body: "Search Console shows “Crawled – currently not indexed” or “Discovered – currently not indexed” growing faster than “Indexed”." },
  { title: "Slow on a phone", body: "Real Chrome users report poor Core Web Vitals, and visitors leave before the page settles." },
  { title: "Good content that doesn’t rank", body: "Pages answer the question better than competitors but sit on page three — often a canonical, crawl-depth or rendering problem." },
];

/** The areas the audit covers — the dark "what I audit" band. */
export const AREAS: Array<{ title: string; body: string }> = [
  { title: "Crawlability", body: "robots.txt, crawl traps, faceted and parameter URLs, and where Googlebot actually spends its visits." },
  { title: "Indexing", body: "Every URL in Search Console’s Pages report sorted by the reason Google gives, and the fix for each reason." },
  { title: "Core Web Vitals", body: "LCP, INP and CLS from real-user data, traced to the template that causes them." },
  { title: "Structured data", body: "Product, Article, FAQ, Breadcrumb and Organization schema validated against what the page actually shows." },
  { title: "Site architecture", body: "Crawl depth, orphan pages and internal links, so the pages that earn money are reached first." },
  { title: "Redirects & canonicals", body: "Redirect chains, wrong canonicals and duplicate URLs that split your signals." },
  { title: "Rendering & JavaScript", body: "Whether Google sees the same content a visitor does, on mobile, with scripts running." },
  { title: "International & hreflang", body: "Country and language versions that point at each other correctly, where a site has them." },
];

/** What the client receives. */
export const DELIVERABLES: string[] = [
  "Every URL crawled, plus server logs where they are available",
  "Search Console’s Pages report sorted by reason, with the cause of each",
  "Core Web Vitals traced to the templates behind them",
  "Every issue ranked by what it costs in traffic, highest first",
  "A fix list your developer can work from — or I implement the fixes",
  "A re-check after the fixes go live, so you can see what changed",
];

/** Who the audit is set up for. */
export const WHO: Array<{ title: string; body: string; href: string }> = [
  { title: "Online stores", body: "Shopify and WooCommerce catalogs with thousands of products, filters and duplicate URLs.", href: "/services/ecommerce-seo" },
  { title: "Local service businesses", body: "Service and city pages that Google never indexed, or a site too slow for a customer on a phone.", href: "/services/local-seo" },
  { title: "Law firm websites", body: "Practice-area pages, attorney schema and sites rebuilt on a new theme without the old redirects.", href: "/services/law-firm-seo" },
];

export const CAPSULES: QA[] = [
  {
    q: "What is a technical SEO audit?",
    a: "A check of how your site is built rather than what it says: whether Google can crawl it, render it, index it and load it fast. It finds the reasons good pages don’t rank — crawl waste, pages left out of the index, wrong canonicals, slow templates, broken structured data — and ranks them by what they cost you.",
  },
  {
    q: "What does a technical SEO audit include?",
    a: "Crawlability, indexing, Core Web Vitals, structured data, site architecture and internal links, redirects and canonicals, JavaScript rendering, and hreflang where a site has country versions. The output is a ranked fix list, not just a list of warnings from a tool.",
  },
  {
    q: "What results has a SearchPrex technical audit led to?",
    a: "On Michigan Outdoor Sports, a WooCommerce store, indexed pages went from about 3,000 to 11,549 between May and July 2026 after the fixes, and US clicks went from 224 to 322 (1 April–12 June against 13 June–29 August 2026) in Search Console. Remit Choice, an international money-transfer site, had 113K Search Console clicks in 2024. Each figure has its screenshot on the case study.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How much does a technical SEO audit cost?",
    a: "The first audit is free: a written tear-down of your crawling, indexing and speed problems within 24 hours. The fixes are then quoted as a project, because the price depends on how many pages and templates are affected — you see the scope before paying anything.",
  },
  {
    q: "How long does a technical SEO audit take?",
    a: "The free tear-down comes back within 24 hours. A full crawl and written findings usually take about a week; on a large catalog the crawl itself takes longer. First fixes are typically live within four weeks.",
  },
  {
    q: "Is a technical SEO audit different from a general SEO audit?",
    a: "Yes. A technical audit looks only at how the site is built — crawlability, indexability, speed, structured data and architecture. A general audit adds content and links. Technical issues are often the root cause even when the content is good.",
  },
  {
    q: "Will a technical audit improve my rankings?",
    a: "Only once the fixes are live — an audit on its own changes nothing. What it does is show which problems are holding pages back, so the work goes where it moves traffic first.",
  },
  {
    q: "Do you only write the audit, or fix things too?",
    a: "Both. Paid work is implementation — sitemaps, canonicals, redirects, schema, internal linking and page templates — or a prioritized ticket list for your developers if you would rather keep changes in-house.",
  },
  {
    q: "Do you need access to Google Search Console?",
    a: "Not for the free tear-down, which works from your public site. For the full audit, read access to Search Console (and server logs, if you have them) shows what Google itself reports.",
  },
  {
    q: "Do you audit Shopify, WordPress and custom sites?",
    a: "Yes. Shopify brings duplicate collection URLs and app scripts, WordPress plugin weight and archive sprawl, custom builds rendering and routing issues. The diagnosis is the same; the fixes differ by platform.",
  },
  {
    q: "How often should a site be audited?",
    a: "Always before and after a redesign, a migration or a platform change, and whenever Search Console shows indexed pages falling. Otherwise, a large site benefits from a check every few months; a small site rarely needs one more than once a year.",
  },
];
