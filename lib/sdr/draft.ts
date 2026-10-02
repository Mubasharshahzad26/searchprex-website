// lib/sdr/draft.ts
//
// First-touch email from a store's verified findings. Template, not a model:
// every specific claim in the email is a finding from lib/sdr/qualify.ts,
// which the recipient can check on their own page. The proof line restates the
// Michigan Outdoor Sports case study (app/case-studies/data.ts) word for word
// in substance; an earlier version credited another client with those figures.
//
// The draft carries no footer. The postal address and opt-out are added at send
// time from COMPANY_POSTAL_ADDRESS, so there is one source for them.

import type { Finding, FindingKey, Qualification } from "./qualify";

const SUPPORTED_PLATFORMS = new Set(["Shopify", "WooCommerce", "BigCommerce", "Magento"]);

/** The proof is an 11,549-page catalog; it does not speak to a small shop. */
const MIN_CATALOG = 300;

const strip = (u: string) => u.replace(/^https?:\/\//, "");

/** Openers in order of strength. Only findings the owner can verify in seconds. */
const OPENERS: Partial<Record<FindingKey, (domain: string, f: Finding, q: Qualification) => string>> = {
  shopify_collection_urls: (d, f) =>
    `I was looking at ${d} and noticed the homepage links to products through /collections/…/products/ URLs (${f.count} of them). On Shopify that gives each product several crawlable addresses, which spends crawl budget on duplicates before Google reaches the canonical page.`,
  no_product_schema: (d, _f, q) =>
    `I was looking at ${d} and couldn't find Product structured data in the page source of ${strip(q.productUrl ?? "")}. Without it, a product page usually can't get price, availability or review details in Google results.`,
  no_meta_desc_home: (d) =>
    `I was looking at ${d} and noticed the homepage has no meta description, so Google writes its own snippet for your most important page.`,
  long_title_product: (d, f, q) =>
    `I was looking at ${d} and noticed product title tags run long — ${strip(q.productUrl ?? "")} is ${f.count} characters, so Google cuts it off and the end of the product name never shows.`,
  short_title_home: (d, _f, q) =>
    `I was looking at ${d} and noticed the homepage title tag is just "${q.homeTitle}" — it doesn't say what you sell, which is the main thing Google matches your homepage against.`,
  no_h1_home: (d) =>
    `I was looking at ${d} and noticed the homepage source has no H1 heading, so nothing on the page tells Google in one line what the store is about.`,
};
const ORDER = Object.keys(OPENERS) as FindingKey[];

export type DraftResult =
  | { ok: true; subject: string; body: string; finding: Finding }
  | { ok: false; reason: string };

export function buildDraft(q: Qualification): DraftResult {
  if (!q.ok || !q.origin) return { ok: false, reason: q.error ?? "store could not be checked" };
  if (!q.email) return { ok: false, reason: "no public contact email found" };
  if (!q.platform || !SUPPORTED_PLATFORMS.has(q.platform)) return { ok: false, reason: `platform not covered (${q.platform ?? "unknown"})` };
  if (q.productsEstimate != null && q.productsEstimate < MIN_CATALOG) return { ok: false, reason: "catalog too small for this pitch" };

  const finding = ORDER.map((k) => q.findings.find((f) => f.key === k)).find(Boolean);
  if (!finding) return { ok: false, reason: "no verifiable finding to open with" };

  const domain = new URL(q.origin).hostname.replace(/^www\./, "");
  const opener = OPENERS[finding.key]!(domain, finding, q);
  const catalog =
    q.productsEstimate != null && q.productsEstimate >= MIN_CATALOG
      ? " On a catalog this size, the bigger question is usually how many product pages Google has actually indexed."
      : "";

  const body = [
    "Hi,",
    "",
    opener + catalog,
    "",
    "I'm Mubashar, an SEO specialist who works on large ecommerce catalogs. On one outdoor store I rebuilt after a de-indexing drop, indexed pages went from about 3,000 to 11,549 (+285%) and US organic clicks rose 83%, with no ad spend.",
    "",
    `If it's useful, I'll send you a free 24-hour tear-down of ${domain}: what's blocking indexing and rankings, in plain English, with the fixes in priority order. No call needed.`,
    "",
    "Want me to send it?",
    "",
    "Mubashar Sharif",
    "SearchPrex — searchprex.com",
  ].join("\n");

  return { ok: true, subject: `Quick SEO note on ${domain}`, body, finding };
}
