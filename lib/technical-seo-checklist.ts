// lib/technical-seo-checklist.ts
// The technical SEO audit checklist, as data. Rendered by
// components/ChecklistWorkbook at /resources/technical-seo-checklist.
//
// Same rules as the other checklists:
//   1. Every check can be run free — Search Console, URL Inspection, the
//      Rich Results Test, PageSpeed Insights, a browser and robots.txt.
//   2. No invented statistics and no client numbers in the checks.
//   3. Limits and behaviours quoted are Google's documented ones, checked
//      28 Sep 2026: Core Web Vitals thresholds (LCP 2.5s, INP 200ms, CLS 0.1),
//      up to 10 redirect hops followed, 50,000 URLs / 50MB per sitemap,
//      robots.txt blocking crawling but not indexing, canonical as a hint,
//      Google-Extended not affecting Search. Re-check if Google changes them.
//
// Platform-agnostic on purpose: lib/woocommerce-checklist.ts covers the
// WooCommerce specifics.

import type { ChecklistPillar } from "@/lib/law-firm-checklist";

export const TECH_CHECKLIST_PILLARS: ChecklistPillar[] = [
  {
    id: "crawling",
    name: "Crawling",
    icon: "Search",
    blurb: "Whether Googlebot can reach the pages that matter — and does not waste its time on the ones that don't.",
    checks: [
      {
        id: "tech-1",
        title: "robots.txt does not block pages, CSS or JavaScript you need indexed",
        critical: true,
        how: "Open yoursite.com/robots.txt and read every Disallow line. Blocking a folder of important pages, or the CSS and JavaScript files pages need to render, hides content from Google. Search Console's robots.txt report shows what Google fetched.",
      },
      {
        id: "tech-2",
        title: "Pages you want out of Google use noindex, not a robots.txt block",
        how: "robots.txt stops crawling, not indexing — a blocked URL can still appear in results if other pages link to it. To keep a page out, let Google crawl it and serve a noindex meta tag or X-Robots-Tag header.",
      },
      {
        id: "tech-3",
        title: "XML sitemaps list only canonical, indexable URLs that return 200",
        how: "No redirects, 404s, noindexed or non-canonical URLs. Each sitemap holds at most 50,000 URLs or 50MB uncompressed; larger sites split them and submit a sitemap index in Search Console.",
      },
      {
        id: "tech-4",
        title: "Crawl traps are closed: filters, sort orders, calendars, session IDs",
        critical: true,
        how: "Parameter combinations and endless calendar or search pages can create millions of near-duplicate URLs. Search Console → Settings → Crawl stats shows what Googlebot is actually fetching; if most requests go to parameter URLs, fix the links and canonicals that create them.",
      },
      {
        id: "tech-5",
        title: "Server logs or Crawl stats checked for where Googlebot spends its time",
        how: "Crawl stats gives response codes, file types and purpose. On large sites, server logs show which sections Googlebot visits and which it ignores. Verify real Googlebot by reverse DNS — many bots fake the user agent.",
      },
    ],
  },
  {
    id: "indexing",
    name: "Indexing",
    icon: "FileText",
    blurb: "Whether the pages Google crawls are the ones it keeps — and the versions you intended.",
    checks: [
      {
        id: "tech-6",
        title: "The Pages report reasons are understood, section by section",
        critical: true,
        how: "Search Console → Indexing → Pages. Group the \"not indexed\" reasons by site section. \"Crawled – currently not indexed\" on important templates usually means thin or duplicate content; \"Discovered – currently not indexed\" usually means crawl priority.",
      },
      {
        id: "tech-7",
        title: "One version of every URL: https, one host, one trailing-slash style",
        how: "http, https, www and non-www should all 301 to one version, and /page and /page/ should not both return 200.",
      },
      {
        id: "tech-8",
        title: "Canonical tags agree with sitemaps and internal links",
        how: "Each indexable page has an absolute, self-referencing canonical. A canonical is a hint, not a command — if internal links and sitemaps point somewhere else, Google may pick its own canonical. URL Inspection shows the user-declared and Google-selected canonical.",
      },
      {
        id: "tech-9",
        title: "No important page carries a stray noindex",
        how: "Crawl the site and list every noindexed URL, from both meta tags and X-Robots-Tag headers. A template-level noindex left over from staging is one of the most common causes of sudden traffic loss.",
      },
      {
        id: "tech-10",
        title: "Empty and near-empty pages return 404 or are improved",
        how: "Search Console flags soft 404s: pages that return 200 but look empty, such as empty categories or search results with no matches. Return a real 404, add content or noindex them.",
      },
    ],
  },
  {
    id: "redirects",
    name: "Redirects and status codes",
    icon: "Link",
    blurb: "Every hop costs time and can lose signals. Migrations are where sites lose the most.",
    checks: [
      {
        id: "tech-11",
        title: "No redirect chains or loops",
        how: "Googlebot follows up to 10 redirect hops, but each hop slows crawling. Point every redirect straight at its final URL and fix any that loop.",
      },
      {
        id: "tech-12",
        title: "Internal links point to final URLs, not redirects",
        how: "Update navigation, footer and in-content links to the destination URL so crawlers and visitors skip the hop.",
      },
      {
        id: "tech-13",
        title: "Removed pages return 404 or 410, and moved pages 301",
        how: "Redirect removed pages only when there is a genuine replacement. Mass-redirecting everything to the homepage is treated like a soft 404.",
      },
      {
        id: "tech-14",
        title: "Any site migration has a full old-to-new redirect map",
        critical: true,
        how: "Before changing domains, platforms or URL structures, map every indexed and linked old URL to its new equivalent, test the map on staging, and keep the redirects in place long-term.",
      },
    ],
  },
  {
    id: "rendering",
    name: "Rendering and mobile",
    icon: "Code2",
    blurb: "Google indexes the mobile version of the page, as rendered. What a browser shows is not always what Google gets.",
    checks: [
      {
        id: "tech-15",
        title: "Main content and links appear in the rendered HTML Google sees",
        how: "URL Inspection → Test live URL → View tested page. The text, headings and links you care about should be in the rendered HTML. Links need to be real <a href> elements; Google does not follow links that only work with a click handler.",
      },
      {
        id: "tech-16",
        title: "The mobile page has the same content, links and structured data as desktop",
        how: "Google uses the mobile version for indexing. Content hidden or removed on mobile is content Google may not index.",
      },
      {
        id: "tech-17",
        title: "Lazy-loaded content loads without scrolling or clicking",
        how: "Googlebot does not scroll or click. Content that loads only on those actions — reviews, product details, \"load more\" lists — should use native lazy loading or load as it enters the viewport.",
      },
    ],
  },
  {
    id: "speed",
    name: "Page experience and speed",
    icon: "Gauge",
    blurb: "Core Web Vitals are measured on real visitors. Fix templates, not single URLs.",
    checks: [
      {
        id: "tech-18",
        title: "Core Web Vitals pass on real-user data for your main templates",
        critical: true,
        how: "Search Console → Core Web Vitals. Good means LCP within 2.5 seconds, INP within 200 milliseconds and CLS within 0.1, measured on real Chrome users. Lab tools like Lighthouse help find causes, but the field data is what counts.",
      },
      {
        id: "tech-19",
        title: "Images are sized, compressed and have width and height set",
        how: "Serve images at the size they display, in WebP or AVIF, with width and height attributes so the layout does not shift as they load. Do not lazy-load the main image at the top of the page.",
      },
      {
        id: "tech-20",
        title: "Third-party scripts are audited",
        how: "Chat widgets, tag managers, heatmaps and ad scripts are common causes of slow interactions. Remove what nobody uses and delay the rest until after the page is usable.",
      },
      {
        id: "tech-21",
        title: "Server response is fast and pages are cached",
        how: "A slow server response delays everything after it. PageSpeed Insights shows time to first byte; page caching and a CDN fix most of it.",
      },
    ],
  },
  {
    id: "signals",
    name: "Structured data and AI search",
    icon: "Bot",
    blurb: "How Google, AI Overviews and other answer engines understand what a page is — and whether they are allowed to read it.",
    checks: [
      {
        id: "tech-22",
        title: "Structured data is valid and matches what the page shows",
        how: "Test key templates in Google's Rich Results Test and check the enhancement reports in Search Console. Markup must describe content visible on the page; marking up things that are not there breaks Google's guidelines.",
      },
      {
        id: "tech-23",
        title: "Your site name and logo are declared",
        how: "WebSite structured data with your site name, and Organization structured data with your logo, help Google show the right name and image next to your results.",
      },
      {
        id: "tech-24",
        title: "AI crawler rules in robots.txt are a deliberate choice",
        how: "Blocking Googlebot removes you from Google Search, AI Overviews included. Google-Extended controls use of your content for Gemini models and does not affect Search. OpenAI separates OAI-SearchBot (ChatGPT search results) from GPTBot (model training), so you can allow one and block the other.",
      },
      {
        id: "tech-25",
        title: "hreflang is correct on multi-language or multi-country sites",
        how: "Each language version lists every alternate, including itself, and the alternates link back. Add x-default for the fallback page. Skip this check if the site is in one language for one country.",
      },
      {
        id: "tech-26",
        title: "Every release is checked for SEO regressions",
        how: "After a deploy, check robots.txt, a sample of canonicals and noindex tags, the sitemap and structured data on each main template. Most sudden drops trace back to a release, not an algorithm update.",
      },
    ],
  },
];

export const TECH_TOTAL_CHECKS = TECH_CHECKLIST_PILLARS.reduce((n, p) => n + p.checks.length, 0);
export const TECH_CRITICAL_CHECKS = TECH_CHECKLIST_PILLARS.reduce(
  (n, p) => n + p.checks.filter((c) => c.critical).length,
  0,
);
