// lib/sdr/qualify.ts
//
// Qualifies an ecommerce store for outreach from its public pages only:
// platform, a rough catalog size from the sitemap, checkable SEO issues on the
// homepage and one product page, and a public contact email.
//
// Deterministic on purpose. The SDR used to ask Gemini for a store's "flaws"
// and then email them to the owner; nothing checked that the flaws were real.
// Every finding here is something the owner can verify by opening their own
// page, and each one records exactly what was seen.

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36";

export type FindingKey =
  | "shopify_collection_urls"
  | "no_product_schema"
  | "no_meta_desc_home"
  | "long_title_product"
  | "short_title_home"
  | "no_h1_home"
  | "long_title_home"
  | "multi_h1_home"
  | "no_meta_desc_product";

export interface Finding {
  key: FindingKey;
  text: string;
  /** The number the sentence quotes, when there is one. */
  count?: number;
}

export interface Qualification {
  ok: boolean;
  error?: string;
  checkedAt: string;
  origin?: string;
  platform?: string;
  /** Product URLs in the first product sitemap times the number of product sitemaps. Rough; never quoted to the store. */
  productsEstimate?: number | null;
  homeTitle?: string;
  productUrl?: string;
  findings: Finding[];
  email?: string;
  contactPage?: string;
}

async function get(url: string, ms = 8000): Promise<{ status: number; url: string; body: string }> {
  try {
    const r = await fetch(url, {
      headers: { "user-agent": UA, accept: "text/html,application/xml" },
      redirect: "follow",
      signal: AbortSignal.timeout(ms),
    });
    return { status: r.status, url: r.url, body: r.ok ? await r.text() : "" };
  } catch {
    return { status: 0, url, body: "" };
  }
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&ndash;/g, "–").replace(/\s+/g, " ").trim();

const attr = (html: string, re: RegExp) => decode(html.match(re)?.[1] ?? "");

const titleOf = (html: string) => attr(html, /<title[^>]*>([^<]*)<\/title>/i);

const metaDescriptionOf = (html: string) =>
  attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
  attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);

export function platformOf(html: string): string {
  if (/cdn\.shopify\.com|Shopify\.theme|shopify-section/i.test(html)) return "Shopify";
  if (/woocommerce/i.test(html)) return "WooCommerce";
  if (/cdn\d*\.bigcommerce\.com|bigcommerce/i.test(html)) return "BigCommerce";
  if (/Magento|mage\/|static\/version\d+/i.test(html)) return "Magento";
  if (/wp-content/i.test(html)) return "WordPress";
  return "Other";
}

/** JSON-LD or microdata. Checking JSON-LD alone wrongly flagged themes that use microdata. */
export function hasProductSchema(html: string): boolean {
  return /schema\.org\/Product|"@type"\s*:\s*"(Product|ProductGroup)"|"@type"\s*:\s*\[\s*"Product"/i.test(html);
}

function emailsIn(html: string): string[] {
  const found = new Set<string>();
  for (const m of html.matchAll(/mailto:([^"'?>\s]+)/gi)) {
    try { found.add(decodeURIComponent(m[1]).toLowerCase()); } catch { /* malformed */ }
  }
  for (const m of html.matchAll(/\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/gi)) found.add(m[0].toLowerCase());
  return [...found].filter(
    (e) =>
      /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(e) &&
      !/\.(png|jpe?g|gif|webp|svg|js|css)$/.test(e) &&
      !/sentry|wixpress|example\.|domain\.com|email\.com|yourname|shopify|godaddy|@2x/.test(e)
  );
}

function pickEmail(list: string[], host: string): string | undefined {
  const bare = host.replace(/^www\./, "");
  const own = list.filter((e) => e.endsWith("@" + bare) || e.endsWith("." + bare));
  const pool = own.length ? own : list;
  const rank = (e: string) =>
    /^(owner|founder|marketing|hello|info|contact)@/.test(e) ? 0 : /^(sales|support|service|customerservice|help)@/.test(e) ? 1 : 2;
  return [...pool].sort((a, b) => rank(a) - rank(b))[0];
}

async function productSample(origin: string): Promise<{ estimate: number | null; sample: string[] }> {
  const idx = await get(origin + "/sitemap.xml");
  let locs = [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  if (!locs.length) {
    const yoast = await get(origin + "/sitemap_index.xml");
    locs = [...yoast.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  }
  const isIndex = locs.some((l) => /sitemap.*\.xml/i.test(l));
  const productMaps = isIndex ? locs.filter((l) => /product/i.test(l)) : [];
  let first: string[] = [];
  if (productMaps.length) {
    const pm = await get(productMaps[0]);
    first = [...pm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1])).filter((l) => !/\.(jpe?g|png|webp)/i.test(l));
  } else if (!isIndex) {
    first = locs.filter((l) => /\/products?\/|\/p\/|\.html$/i.test(l));
  }
  const estimate = first.length ? first.length * Math.max(productMaps.length, 1) : null;
  return { estimate, sample: first.slice(1, 4) };
}

function homeFindings(html: string, platform: string): Finding[] {
  const out: Finding[] = [];
  const title = titleOf(html);
  const h1 = (html.match(/<h1[\s>]/gi) || []).length;
  if (!metaDescriptionOf(html)) out.push({ key: "no_meta_desc_home", text: "no meta description on the homepage" });
  if (title.length > 70) out.push({ key: "long_title_home", text: `homepage title is ${title.length} characters`, count: title.length });
  if (title && title.length < 20) out.push({ key: "short_title_home", text: `homepage title is only "${title}"` });
  if (h1 === 0) out.push({ key: "no_h1_home", text: "no H1 heading in the homepage source" });
  if (h1 > 1) out.push({ key: "multi_h1_home", text: `${h1} H1 headings on the homepage`, count: h1 });
  if (platform === "Shopify") {
    const wrapped = (html.match(/href=["'][^"']*\/collections\/[^"'/]+\/products\//gi) || []).length;
    if (wrapped >= 3)
      out.push({ key: "shopify_collection_urls", text: `${wrapped} homepage links use /collections/…/products/ URLs`, count: wrapped });
  }
  return out;
}

function productFindings(html: string): Finding[] {
  const out: Finding[] = [];
  if (!hasProductSchema(html)) out.push({ key: "no_product_schema", text: "no Product structured data (JSON-LD or microdata) in the page source" });
  if (!metaDescriptionOf(html)) out.push({ key: "no_meta_desc_product", text: "no meta description on the product page" });
  const title = titleOf(html);
  if (title.length > 70) out.push({ key: "long_title_product", text: `product title tag is ${title.length} characters`, count: title.length });
  return out;
}

const CONTACT_PATHS = ["/pages/contact", "/pages/contact-us", "/contact", "/contact-us", "/contact.html", "/pages/about-us"];

export async function qualifyStore(websiteUrl: string): Promise<Qualification> {
  const checkedAt = new Date().toISOString();
  const url = /^https?:\/\//.test(websiteUrl) ? websiteUrl : `https://${websiteUrl}`;
  const home = await get(url, 10000);
  if (home.status !== 200 || !home.body) {
    return { ok: false, error: home.status ? `homepage returned ${home.status}` : "homepage unreachable", checkedAt, findings: [] };
  }

  const origin = new URL(home.url).origin;
  const platform = platformOf(home.body);
  const findings = homeFindings(home.body, platform);
  const { estimate, sample } = await productSample(origin);

  let productUrl: string | undefined;
  if (sample[0]) {
    const pr = await get(sample[0]);
    if (pr.status === 200 && pr.body) {
      productUrl = sample[0];
      findings.unshift(...productFindings(pr.body));
    }
  }

  const host = new URL(origin).hostname;
  let emails = emailsIn(home.body);
  let contactPage: string | undefined;
  if (!pickEmail(emails, host)) {
    for (const path of CONTACT_PATHS) {
      const c = await get(origin + path, 6000);
      if (c.status === 200 && c.body) {
        contactPage ??= origin + path;
        const found = emailsIn(c.body);
        if (found.length) {
          emails = found;
          contactPage = origin + path;
          break;
        }
      }
    }
  }

  return {
    ok: true,
    checkedAt,
    origin,
    platform,
    productsEstimate: estimate,
    homeTitle: titleOf(home.body),
    productUrl,
    findings,
    email: pickEmail(emails, host),
    contactPage,
  };
}
