// app/services/ecommerce-seo/product-page-seo/data.ts
//
// Copy for the product page SEO spoke, kept out of the client component so
// page.tsx builds the FAQPage schema from the same arrays the page renders.
//
// Competitor pages for "product page seo services" (checked 3 Oct 2026) are
// either agencies quoting large percentage gains with no screenshots, or
// freelancers selling descriptions ten at a time. This page is about product
// pages at catalog scale, with the two stores' own dashboards as proof.
//
// Figures, each readable in a screenshot on this page or its case study:
// SMK Store net sales $5,832 (April 2026) → $19,100 (June 2026), WooCommerce
// dashboard — total store revenue, not attributed to SEO alone; Michigan
// Outdoor Sports about 3,000 → 11,549 indexed pages (May–Jul 2026).

import { RETAINER_PLANS, formatRange } from "@/lib/pricing";

export interface QA {
  q: string;
  a: string;
}

const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");

export const META = {
  title: "Product Page SEO Services for Ecommerce Stores | SearchPrex",
  description:
    "Product page SEO for US Shopify and WooCommerce stores: unique product copy at catalog scale, titles, Product schema, images and internal links — measured in Search Console. Free store tear-down.",
  h1: "Product Page SEO Services",
  accent: "for catalogs too big to write by hand",
};

/** Why product pages don't rank — six checks an owner can run. */
export const PROBLEMS: Array<{ title: string; check: string; costs: string }> = [
  {
    title: "The manufacturer’s description, word for word",
    check: "Copy a sentence from one of your product pages and search it in quotes. How many other stores show up?",
    costs: "Google indexes one version of duplicate copy and skips the rest. If yours isn’t the one it picks, the page earns nothing.",
  },
  {
    title: "Titles that are just the product name",
    check: "Look at your product title tags. Do they say what the product is and who it’s for, or just a model number?",
    costs: "Shoppers search “waterproof hiking boots for men”, not “XR-200”. The title is where the match is made.",
  },
  {
    title: "No Product structured data",
    check: "Paste a product URL into Google’s Rich Results Test. Does it find Product and Offer markup?",
    costs: "Without it, competitors get price, stock and rating details in the results while your listing is a plain blue link.",
  },
  {
    title: "Products no page links to",
    check: "Pick a product. Can you reach it from a category or brand page in two clicks?",
    costs: "Pages buried deep in pagination or reachable only through search get crawled rarely and indexed late.",
  },
  {
    title: "Images without names or alt text",
    check: "Right-click a product photo. Is the file called IMG_4021.jpg and the alt text empty?",
    costs: "Google Images reads file names and alt text; blank ones give it nothing to match.",
  },
  {
    title: "Out-of-stock pages that look empty",
    check: "Open a sold-out product. Is there still a description, alternatives and a back-in-stock option?",
    costs: "Empty pages get treated as soft 404s and dropped — taking the rankings they had built with them.",
  },
];

/** What the work covers — the dark band. */
export const INCLUDED: Array<{ title: string; body: string }> = [
  { title: "Unique copy at catalog scale", body: "A description written for each product — what it is, who it’s for, how it compares — instead of the manufacturer’s boilerplate." },
  { title: "Titles & meta descriptions", body: "Written around how shoppers search: product type, key feature, brand and use, within the length Google shows." },
  { title: "Product & Offer schema", body: "Structured data built from the price, stock and details the page already shows — no fabricated ratings." },
  { title: "Images that can rank", body: "Descriptive file names, alt text and compressed sizes, so photos help in image search and don’t slow the page." },
  { title: "Internal links", body: "Products linked from their category, brand and related items, so Google reaches them in a click or two." },
  { title: "Out-of-stock handling", body: "Sold-out and discontinued products kept useful or redirected properly, so their rankings aren’t thrown away." },
];

/** How the copy is produced at scale — the "What I do" list. */
export const METHOD: string[] = [
  "Products grouped by brand and type, highest revenue first",
  "A copy template per product type, built from the questions shoppers ask",
  "Unique details filled in from your product data for every item",
  "Published in batches, never the whole catalog at once",
  "Each batch measured in Search Console before the next goes out",
  "Pages that don’t move get rewritten, merged or removed",
];

export const CAPSULES: QA[] = [
  {
    q: "What is product page SEO?",
    a: "The work of making each product page findable and worth indexing: a unique description, a title that matches how shoppers search, Product structured data, named and compressed images, and internal links from categories and brands. On a large store it is done by template and in batches, not page by page.",
  },
  {
    q: "Is it bad to use manufacturer product descriptions?",
    a: "It is the most common reason product pages don’t rank. When hundreds of stores publish the same description, Google indexes one version and filters out the rest. A description written for your store — what the product is, who it suits and how it compares — gives Google a reason to keep and show your page.",
  },
  {
    q: "What results has product page work produced for SearchPrex clients?",
    a: "On SMK Store, a WooCommerce store with more than 35,000 products, thin product and brand copy was rewritten at scale alongside indexing and speed fixes; monthly net sales went from $5,832 in April 2026 to $19,100 in June 2026 on the store’s WooCommerce dashboard. On Michigan Outdoor Sports, indexed pages went from about 3,000 to 11,549 between May and July 2026. Each figure has its screenshot on the case study.",
  },
];

export const FAQS: QA[] = [
  {
    q: "How much does product page SEO cost?",
    a: ECOM_PLAN
      ? `It is part of ecommerce SEO, which runs ${formatRange(ECOM_PLAN)} a month depending on catalog size, technical scope and content volume. It starts with a free store tear-down, and it is month to month.`
      : "It is part of ecommerce SEO, priced by catalog size, technical scope and content volume. It starts with a free store tear-down, and it is month to month.",
  },
  {
    q: "Can you write unique descriptions for thousands of products?",
    a: "Yes — that is what this work is built for. Products are grouped by type, a copy template is built from what shoppers ask about each type, and every product gets its own details from your product data. It is published in batches and measured, so nothing goes live across the whole catalog untested.",
  },
  {
    q: "Is AI-written product copy safe for SEO?",
    a: "Google’s guidance is that how content is made matters less than whether it is helpful and original. Copy that repeats a template with the product name swapped in is not; copy that gives each product real, accurate detail is. Every batch is measured in Search Console, and what doesn’t earn its place gets rewritten or removed.",
  },
  {
    q: "How long until product pages start ranking?",
    a: "Rewritten pages are usually recrawled within weeks, and indexing changes show in Search Console soon after. Rankings and sales follow more slowly and depend on competition — on SMK Store the revenue change came over about two months.",
  },
  {
    q: "Do you also optimize category pages?",
    a: "Yes. Category and collection pages often rank for broader, higher-volume searches than single products, so they get buying-guide copy, comparison details and FAQs alongside the product work.",
  },
  {
    q: "Do you work on Shopify and WooCommerce?",
    a: "Both. The two case-study stores run on WooCommerce. On Shopify the same work is done through the theme, metafields and apps instead of plugins.",
  },
  {
    q: "What happens to products that go out of stock?",
    a: "If the product is coming back, the page stays live with its description, alternatives and a back-in-stock option. If it is gone for good, it redirects to the closest replacement or its category, so the ranking it built isn’t lost.",
  },
  {
    q: "Is there a contract?",
    a: "No. Month to month, with the free store tear-down first so you can see what the work would focus on before paying anything.",
  },
];
