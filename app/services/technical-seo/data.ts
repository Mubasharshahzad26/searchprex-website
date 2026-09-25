// app/services/technical-seo/data.ts
//
// The questions and answers on /services/technical-seo, in one place.
//
// Kept out of TechnicalSEOClient ("use client") so page.tsx can build the
// FAQPage schema from the same arrays the page renders. It used to be typed out
// separately in page.tsx: three of the six visible questions, with answers that
// had already drifted from the visible ones. Markup that disagrees with the
// page it describes is worse than no markup.
//
// Every figure below is backed by a named case study or a dated screenshot:
// Michigan Outdoor Sports, approximately 3,000 indexed pages in mid-May 2026 to
// 11,549 on 25 July 2026 (public/images/proof/mso-gsc-indexing-full.png). The
// previous copy said "from near-zero to 12K+", which the screenshot contradicts
// on both ends.

export interface QA {
  q: string;
  a: string;
}

/** Always-visible answer capsules near the top — the unit AI answers lift. */
export const CAPSULES: QA[] = [
  {
    q: "What does a technical SEO service actually fix?",
    a: "The reasons Google cannot find, render or keep your pages: crawl budget spent on junk URLs, pages stuck in “crawled – currently not indexed”, broken canonicals and redirect chains, slow Core Web Vitals, and missing structured data. Content cannot rank from a page Google has dropped.",
  },
  {
    q: "How do I know if my site has a technical SEO problem?",
    a: "Open Search Console → Pages. If “Not indexed” is growing faster than “Indexed”, or large groups sit under “Discovered – currently not indexed”, Google is choosing not to keep your pages. That is a technical problem before it is a content one.",
  },
  {
    q: "How long do technical SEO fixes take to show?",
    a: "Indexing changes usually appear in Search Console two to four weeks after Googlebot recrawls the fixed pages. On Michigan Outdoor Sports, indexed pages went from about 3,000 to 11,549 in roughly ten weeks, May to July 2026.",
  },
];

/** The collapsible FAQ further down. */
export const FAQS: QA[] = [
  {
    q: "How is a technical SEO audit different from a general SEO audit?",
    a: "A technical audit looks only at how the site is built — crawlability, indexability, speed, structured data and architecture. Technical issues are often the root cause of ranking problems even when the content is good.",
  },
  {
    q: "My site has thousands of pages — can you handle that?",
    a: "Yes. Large catalogues are where most of this work has been done: Michigan Outdoor Sports went from about 3,000 to 11,549 indexed pages (+285%) between May and July 2026, verified in Search Console.",
  },
  {
    q: "What are Core Web Vitals and do they affect rankings?",
    a: "Core Web Vitals — LCP, INP and CLS — measure loading, responsiveness and visual stability for real users. They are a confirmed Google ranking signal, though a modest one; their larger effect is on conversion.",
  },
  {
    q: "Do you only write the audit, or fix things too?",
    a: "Both. The free tear-down is a written diagnosis; paid work is implementation — sitemaps, canonicals, redirects, schema, internal linking and page templates — or a prioritised ticket list for your developers if you would rather keep changes in-house.",
  },
  {
    q: "Do you work with Shopify, WordPress and custom sites?",
    a: "Yes. Shopify brings faceted-navigation and duplicate-URL problems, WordPress plugin bloat and archive sprawl, custom builds rendering and routing issues. The diagnosis is the same; the fixes differ by platform.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No. Technical SEO has a clear audit-and-fix phase, so it is scoped as a project; ongoing monitoring is optional and month to month.",
  },
];

/**
 * Search Console statuses people actually search for. Each is a real report
 * label, so a reader who has just seen it in their own GSC can match it here.
 */
export const SYMPTOMS: Array<{ status: string; means: string; costs: string }> = [
  {
    status: "Crawled – currently not indexed",
    means: "Google fetched the page and decided it was not worth keeping.",
    costs: "Usually thin or near-duplicate templates. The page exists for visitors and not for search.",
  },
  {
    status: "Discovered – currently not indexed",
    means: "Google knows the URL but has not spent the crawl on it.",
    costs: "A crawl-budget signal: junk URLs, facets or weak internal links are eating the visits your real pages need.",
  },
  {
    status: "Duplicate without user-selected canonical",
    means: "Several URLs show the same content and none says which is the original.",
    costs: "Google picks one for you, often the wrong one, and the signals are split across the rest.",
  },
  {
    status: "Core Web Vitals: Poor URLs",
    means: "Real Chrome users are measuring slow loading, laggy input or layout shift.",
    costs: "A modest ranking signal and a large conversion one — visitors leave before the page settles.",
  },
];
