// lib/woocommerce-checklist.ts
// The WooCommerce SEO checklist, as data. Rendered by components/ChecklistWorkbook
// at /resources/woocommerce-seo-checklist.
//
// Same rules as the law firm and Business Profile checklists:
//   1. Every check can be verified by the store owner, free, with Search
//      Console, the WooCommerce admin or Google's Rich Results Test.
//   2. No invented statistics and no client numbers in the checks.
//   3. Where WooCommerce or Google behaviour is described (default URL
//      parameters, noindex on cart/checkout/account, the built-in Product
//      JSON-LD, the permalink settings, paginated pages keeping their own
//      canonical), it is documented behaviour — re-check it after major
//      WooCommerce or Google changes.
//
// Both SearchPrex ecommerce case studies (SMK Store and Michigan Outdoor
// Sports) are WooCommerce stores; the order of these checks is the order that
// work was done in.

import type { ChecklistPillar } from "@/lib/law-firm-checklist";

export const WOO_CHECKLIST_PILLARS: ChecklistPillar[] = [
  {
    id: "indexing",
    name: "Indexing and crawl",
    icon: "Search",
    blurb:
      "Whether Google can find, crawl and keep your product pages at all. On a large catalogue this is where most lost revenue hides.",
    checks: [
      {
        id: "woo-1",
        title: "You know how many product pages are indexed — and why the rest are not",
        critical: true,
        how: "Search Console → Indexing → Pages. Look at “Crawled – currently not indexed” and “Discovered – currently not indexed”, then use URL Inspection on a sample of product URLs. A large gap between published products and indexed products is the first thing to fix.",
      },
      {
        id: "woo-2",
        title: "One XML sitemap source, submitted in Search Console",
        how: "WordPress has its own sitemap (wp-sitemap.xml) and SEO plugins such as Yoast or Rank Math replace it with theirs. Make sure only one is live, it is the one submitted in Search Console, and its product sitemap lists only published, indexable products.",
      },
      {
        id: "woo-3",
        title: "Filter, sort and add-to-cart URLs are not being crawled and indexed",
        critical: true,
        how: "WooCommerce creates URL parameters such as ?orderby=, ?min_price=, ?filter_colour= and ?add-to-cart=. Search Console's Pages report and a site: search show whether they are indexed. Canonical them to the clean category URL and keep crawlers out of ?add-to-cart= links.",
      },
      {
        id: "woo-4",
        title: "Cart, checkout and account pages are noindex",
        how: "WooCommerce marks these pages noindex by default. View the page source of /cart/, /checkout/ and /my-account/ and confirm a theme or plugin has not removed the robots noindex tag.",
      },
      {
        id: "woo-5",
        title: "Out-of-stock and discontinued products have a plan",
        how: "Products coming back keep their page, with availability shown. Products gone for good are redirected (301) to the closest replacement or their category. The “Hide out of stock items” setting only hides them from listings — the URLs still exist.",
      },
    ],
  },
  {
    id: "products",
    name: "Product pages",
    icon: "ShoppingCart",
    blurb: "The page Google decides to index or skip, and the page a buyer decides on.",
    checks: [
      {
        id: "woo-6",
        title: "Product descriptions are your own, not the manufacturer's copy",
        critical: true,
        how: "Paste a sentence from a product description into Google in quotes. If dozens of other stores show the same text, Google has little reason to index yours. Rewrite the products that matter most first — brand by brand works well on a large catalogue.",
      },
      {
        id: "woo-7",
        title: "Product titles name what people search: brand, model and the key attribute",
        how: "“Benchmade Bugout 535 Folding Knife” beats “Bugout”. Check how the SEO title looks in results with a SERP preview — the end is cut if it is too wide.",
      },
      {
        id: "woo-8",
        title: "Variations live on one product page",
        how: "Colours and sizes belong as variations of one variable product, not as separate near-identical products — unless each variation is searched for on its own and has something different to say.",
      },
      {
        id: "woo-9",
        title: "Images have descriptive file names and alt text, and are compressed",
        how: "“benchmade-bugout-535-grey.jpg”, not “IMG_2231.jpg”. WordPress supports WebP and AVIF uploads; WooCommerce generates its own thumbnail sizes, so upload one sharp, compressed original.",
      },
      {
        id: "woo-10",
        title: "Short and long descriptions both do a job",
        how: "The short description sits next to the price: key specs and why to buy. The long description answers the questions buyers ask — sizing, materials, care, compatibility.",
      },
    ],
  },
  {
    id: "schema",
    name: "Structured data",
    icon: "Code2",
    blurb: "What makes a product result show price, availability and reviews instead of a plain blue link.",
    checks: [
      {
        id: "woo-11",
        title: "Product structured data is valid, with price, currency and availability",
        critical: true,
        how: "WooCommerce outputs Product JSON-LD by default, and SEO plugins extend it. Run a product URL through Google's Rich Results Test and fix every error; check Search Console's product snippet and merchant listing reports.",
      },
      {
        id: "woo-12",
        title: "Review data comes only from real customer reviews",
        how: "WooCommerce includes product ratings in its structured data. Only genuine reviews left on your store should feed it — imported or invented reviews break Google's policies.",
      },
      {
        id: "woo-13",
        title: "Shipping and returns information is given to Google",
        how: "Through Merchant Center or through shipping and return policy structured data, so product results can show delivery and return details.",
      },
      {
        id: "woo-14",
        title: "Breadcrumbs are on product and category pages, with BreadcrumbList markup",
        how: "WooCommerce and most SEO plugins can output both. Breadcrumbs help buyers move up to the category and help Google understand the catalogue structure.",
      },
    ],
  },
  {
    id: "categories",
    name: "Categories and structure",
    icon: "Layers",
    blurb: "Category pages often rank for the broad searches — “folding knives”, “fixed blade knives” — that product pages cannot.",
    checks: [
      {
        id: "woo-15",
        title: "Main category pages have their own copy, not just a product grid",
        how: "A short introduction above the grid and buying advice below it, written for that category. A category that is only a grid looks the same as every competitor's.",
      },
      {
        id: "woo-16",
        title: "The product permalink base is settled — and changed only with redirects",
        critical: true,
        how: "Settings → Permalinks → Product permalinks. Any structure can work; changing it on a live store changes every product URL, so it needs a full set of 301 redirects planned before you switch.",
      },
      {
        id: "woo-17",
        title: "Paginated category pages keep their own canonical",
        how: "Page 2 of a category should canonical to itself, not to page 1 — otherwise Google may not crawl through to the products on later pages.",
      },
      {
        id: "woo-18",
        title: "Thin tag and attribute archives are noindexed or removed",
        how: "Product tags and attribute archives with a handful of products create many thin pages. Keep the ones you curate and noindex the rest.",
      },
    ],
  },
  {
    id: "speed",
    name: "Speed and technical health",
    icon: "Gauge",
    blurb: "WooCommerce sites slow down as plugins pile up. Speed decides whether a phone visitor stays long enough to buy.",
    checks: [
      {
        id: "woo-19",
        title: "Core Web Vitals pass for product and category templates",
        critical: true,
        how: "Search Console → Core Web Vitals. Look at groups of product and category URLs, not just the homepage. Fix the template once and every page on it improves.",
      },
      {
        id: "woo-20",
        title: "Unused plugins are removed and scripts load only where needed",
        how: "Deactivate plugins nobody uses. Check whether cart, slider or review scripts load on pages that do not need them, such as blog posts.",
      },
      {
        id: "woo-21",
        title: "Page caching is on, with cart and checkout excluded",
        how: "Hosting or plugin page caching speeds up category and product pages; cart, checkout and account pages must stay uncached so each customer sees their own basket.",
      },
      {
        id: "woo-22",
        title: "The site is on HTTPS with one version of every URL",
        how: "http, https, www and non-www should all redirect to one version, and trailing-slash variants should not both resolve.",
      },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring",
    icon: "Eye",
    blurb: "A large catalogue drifts. These checks catch it before revenue does.",
    checks: [
      {
        id: "woo-23",
        title: "Indexed products are compared with published products every month",
        how: "Note the number of published products in WooCommerce and indexed product URLs in Search Console. A widening gap is an early warning.",
      },
      {
        id: "woo-24",
        title: "404s from deleted products are redirected",
        how: "Search Console → Pages → Not found (404). Redirect removed products that still get links or traffic to the closest replacement or category.",
      },
      {
        id: "woo-25",
        title: "Plugin, theme and SEO settings changes are tested on staging first",
        how: "An update to the theme or SEO plugin can change canonicals, noindex tags or structured data site-wide. Check a product, a category and the sitemap after every update.",
      },
    ],
  },
];

export const WOO_TOTAL_CHECKS = WOO_CHECKLIST_PILLARS.reduce((n, p) => n + p.checks.length, 0);
export const WOO_CRITICAL_CHECKS = WOO_CHECKLIST_PILLARS.reduce(
  (n, p) => n + p.checks.filter((c) => c.critical).length,
  0,
);
