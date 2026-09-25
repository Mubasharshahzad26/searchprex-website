// app/services/ecommerce-seo/data.ts
//
// Questions and answers on /services/ecommerce-seo, in one place, so page.tsx
// builds the FAQPage schema from what the page renders.
//
// That was more broken here than on any other service page: the schema's six
// questions were not the page's six questions at all — "Is there a contract?"
// and "Is your content aligned with Google's 2026 core updates?" were marked up
// but never shown. Google's rules for structured data are that it describes
// content visible on the page.
//
// Figures: Michigan Sports & Outdoor from Search Console (about 3,000 indexed
// pages in mid-May 2026 to 11,549 on 25 July 2026 — the capsule said "March",
// which the screenshot contradicts); SMK Store from the client's WooCommerce
// dashboard ($5,832 in April 2026 to $19,100 in June 2026). Pricing from
// lib/pricing — the FAQ used to say retainers "typically start at $2,500",
// while /pricing and lib/pricing say $1,500–$4,000.

import { RETAINER_PLANS, formatRange } from "@/lib/pricing";

export interface QA {
  q: string;
  a: string;
}

const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");

export const CAPSULES: QA[] = [
  {
    q: "Why are my product pages not indexed by Google?",
    a: "Usually because Google found the pages and decided they are not worth indexing. Common causes are near-duplicate manufacturer descriptions, thin boilerplate, filter and sort URLs wasting crawl budget, and products with no price, image or stock. Search Console reports these as \"Crawled - currently not indexed\". Resubmitting rarely helps; improving or removing the pages does.",
  },
  {
    q: "What results has ecommerce SEO produced for SearchPrex clients?",
    a: "On Michigan Outdoor Sports, a WooCommerce catalogue, indexed pages rose from about 3,000 to 11,549 between May and July 2026, with US organic clicks up 83% in Google Search Console. On SMK Store, total monthly revenue went from $5,832 to $19,100 between April and June 2026, per the client's WooCommerce dashboard.",
  },
  {
    q: "Is Shopify or WooCommerce better for SEO?",
    a: "Neither ranks better by default; they fail in different places. Shopify fixes URL prefixes such as /products/ and /collections/ and can expose the same product under collection paths. WooCommerce gives full control, but filter, sort and attribute parameters multiply URLs, and hosting or plugins can slow it down. The comparison below shows where each breaks.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How long before we see results?",
    a: "Indexing and Core Web Vitals fixes usually show in Search Console within two to four weeks of Googlebot recrawling. Category and product content takes longer to move rankings, and revenue follows rankings. On Michigan Outdoor Sports the indexing recovery took about ten weeks, May to July 2026.",
  },
  {
    q: "Do you work on Shopify, WooCommerce, or custom platforms?",
    a: "All three. The case studies on this page are WooCommerce stores (SMK Store, Michigan Sports & Outdoor); Shopify and custom builds get the same diagnosis with platform-specific fixes, and implementation is handled with a development partner where needed.",
  },
  {
    q: "What if my products have thin content and I can't write for all of them?",
    a: "That's most of what we do. We build programmatic content pipelines — unique HTML per product, FAQ schema, meta descriptions, internal links — published in batches and re-measured in Search Console before the next one goes out.",
  },
  {
    q: "How do you handle indexing at scale?",
    a: "By fixing the reason Google declined each URL rather than resubmitting harder. Sitemap ↔ GSC diffing runs daily and sorts unindexed URLs by the reason in Search Console's Pages report — crawled-not-indexed is usually thin or duplicate content, discovered-not-indexed is usually crawl budget or missing internal links. High-revenue URLs are fixed first, resubmitted in batches, and URL Inspection is kept for the handful that are genuinely urgent.",
  },
  {
    q: "Do you touch conversion rate, or just SEO?",
    a: "Primary focus is organic acquisition, but we handle CRO adjacent to SEO — product page structure, category page templates, breadcrumbs and related products. Full CRO programs are a separate scope.",
  },
  {
    q: "What's the pricing?",
    a: ECOM_PLAN
      ? `Ecommerce retainers run ${formatRange(ECOM_PLAN)} a month, depending on catalogue size, technical scope and content volume. Every engagement starts with the free tear-down — no commitment, month to month.`
      : "Pricing depends on catalogue size, technical scope and content volume. Every engagement starts with the free tear-down — no commitment.",
  },
];
