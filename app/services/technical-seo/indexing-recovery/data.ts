// app/services/technical-seo/indexing-recovery/data.ts
//
// Copy for the indexing recovery spoke, kept out of the client component so
// page.tsx builds the FAQPage schema from the same arrays the page renders.
//
// Competitor pages for this search (checked 3 Oct 2026) sell "indexed in 6 to
// 48 hours" through proprietary indexer tools. This page says plainly why that
// does not last: Google limits its Indexing API to job postings and livestream
// videos (see /blog/google-indexing-api-python), and a page Google judged not
// worth keeping drops out again unless the reason is fixed.
//
// Figures, each readable in a screenshot on this page or its case study:
// Michigan Outdoor Sports about 3,000 → 11,549 indexed pages (May–Jul 2026);
// about 4,000 at the end of May → 12.2K on 21 Aug 2026; US clicks 224 → 322
// (1 Apr–12 Jun vs 13 Jun–29 Aug 2026). No technical retainer exists, so no
// price or money-back guarantee is shown.

export interface QA {
  q: string;
  a: string;
}

export const META = {
  title: "Indexing Recovery: Fix Pages Not Indexed by Google | SearchPrex",
  description:
    "Pages stuck in “Crawled – currently not indexed” or “Discovered – currently not indexed”? I find why Google won’t index them and fix the cause — no indexer tricks. Free 24-hour tear-down.",
  h1: "Indexing Recovery Services",
  accent: "for pages Google won’t index",
};

/** Search Console statuses, what each means, and the usual fix. */
export const STATUSES: Array<{ status: string; means: string; fix: string }> = [
  {
    status: "Crawled – currently not indexed",
    means: "Google read the page and decided it was not worth keeping.",
    fix: "Usually thin or near-duplicate templates. Make each page genuinely different, or merge and remove the ones that aren’t.",
  },
  {
    status: "Discovered – currently not indexed",
    means: "Google knows the URL but hasn’t spent a crawl on it.",
    fix: "A crawl-budget signal. Stop junk URLs eating the crawl and link to the real pages from pages Google already visits.",
  },
  {
    status: "Duplicate without user-selected canonical",
    means: "Several URLs show the same content and none says which one is the original.",
    fix: "Set one canonical per page and point filters, sort orders and tracking parameters at it.",
  },
  {
    status: "Excluded by ‘noindex’ tag",
    means: "The page tells Google not to index it.",
    fix: "Often left behind by a theme, plugin or staging site. Remove it from every page you want found.",
  },
  {
    status: "Blocked by robots.txt",
    means: "Google is not allowed to crawl the page at all.",
    fix: "Check the rules line by line — one wildcard can block a whole category of products.",
  },
  {
    status: "Soft 404",
    means: "The page loads but looks empty or broken to Google.",
    fix: "Typical of out-of-stock products and empty categories. Give them real content or a proper status code.",
  },
];

/** How the recovery is done — the "What I do" list. */
export const METHOD: string[] = [
  "Every sitemap URL compared with what Search Console says is indexed",
  "Unindexed URLs sorted by the reason Google gives, then by revenue",
  "Fixes made at the template, so one change repairs thousands of pages",
  "Internal links added to orphaned pages Google can’t reach",
  "Resubmitted through Search Console in batches, never all at once",
  "Each batch re-measured before the next one goes out",
];

/** Who the recovery is set up for. */
export const WHO: Array<{ title: string; body: string; href: string }> = [
  { title: "Online stores", body: "Shopify and WooCommerce catalogs where thousands of products sit in the sitemap and nowhere in Google.", href: "/services/ecommerce-seo" },
  { title: "Sites after a migration", body: "A new platform, theme or URL structure that left old pages redirecting nowhere and new ones unindexed.", href: "/services/technical-seo/technical-seo-audit" },
  { title: "Local service sites", body: "Service and city pages that never made it into Google, so the searches they were written for find someone else.", href: "/services/local-seo" },
];

export const CAPSULES: QA[] = [
  {
    q: "Why are my pages not indexed by Google?",
    a: "Usually because Google found them and decided they are not worth keeping, or hasn’t spent a crawl on them yet. Common causes are near-duplicate or thin templates, filter and parameter URLs wasting crawl budget, pages no internal link reaches, a stray noindex tag or robots.txt rule, and slow or broken rendering. Search Console’s Pages report gives the reason for each URL.",
  },
  {
    q: "What does “Crawled – currently not indexed” mean?",
    a: "Google fetched the page and chose not to add it to the index. It is a quality and duplication signal more than a technical error: resubmitting rarely helps. Making the page genuinely different and useful — or merging or removing it — does.",
  },
  {
    q: "What results has SearchPrex got in indexing recovery?",
    a: "Michigan Outdoor Sports, a WooCommerce store, lost ground to a gradual de-indexing. After the fixes, indexed pages went from about 3,000 to 11,549 between May and July 2026, and reached 12.2K by 21 August, in Search Console. US clicks went from 224 to 322 (1 April–12 June against 13 June–29 August 2026). Each figure has its screenshot on the case study.",
  },
];

export const FAQS: QA[] = [
  {
    q: "What does “Discovered – currently not indexed” mean?",
    a: "Google knows the URL exists but has not crawled it yet. On a large site it usually means crawl budget is going to other URLs — filters, parameters, duplicates — or the page has too few internal links for Google to treat it as important.",
  },
  {
    q: "How long does it take Google to index pages after the fixes?",
    a: "Changes usually appear in Search Console two to four weeks after Googlebot recrawls the fixed pages. A full recovery on a big catalog takes longer: on Michigan Outdoor Sports, indexed pages went from about 3,000 to 11,549 in roughly ten weeks.",
  },
  {
    q: "Can you get my pages indexed in 24 hours?",
    a: "No one can honestly promise that for a page Google has judged not worth keeping. A tool can push a URL in front of Google, but if the reason it was dropped is still there, it drops out again. The free tear-down tells you the reason within 24 hours; the fix is what makes indexing last.",
  },
  {
    q: "Should I use the Google Indexing API or an indexing tool?",
    a: "Not for normal pages. Google limits its Indexing API to pages with job postings and livestream videos, and using it for anything else goes against its guidelines. Fix why the pages were dropped, then resubmit through Search Console.",
  },
  {
    q: "Does “Request indexing” in Search Console help?",
    a: "For a handful of urgent pages, yes — it asks Google to recrawl a URL, and there is a daily limit. It does not fix the reason a page was excluded, so it is the last step, not the first.",
  },
  {
    q: "My whole site disappeared from Google. Is it a penalty?",
    a: "Check Search Console’s Manual actions report first. If it is empty, the cause is almost always technical — a sitewide noindex, a robots.txt rule, a broken migration or a server error — and is fixable without a reconsideration request.",
  },
  {
    q: "How much does indexing recovery cost?",
    a: "The diagnosis is free: a written tear-down of why your pages aren’t indexed, within 24 hours. The fixes are quoted as a project, because the price depends on how many templates and pages are affected — you see the scope before paying anything.",
  },
  {
    q: "Do you fix indexing on Shopify and WooCommerce?",
    a: "Yes. Both case-study stores run on WooCommerce. Shopify’s duplicate collection URLs and app scripts are fixed in the theme and apps instead of plugins; the diagnosis is the same.",
  },
];
