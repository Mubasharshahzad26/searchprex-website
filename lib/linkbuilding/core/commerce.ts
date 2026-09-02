// ═══════════════════════════════════════════════════════════
//  core/commerce.ts — does this page belong to a shop?
//
//  PORTABLE: pure function over HTML. No database, no network.
//
//  Qualification scored 51 of Michigan Sports Outdoor's 88 prospects
//  as contactable, and roughly half of those were other knife shops'
//  blogs — thejamesbrand.com/blogs/stories, urbanedc.com/blogs/…,
//  vosteed.com/blogs/guides/…. Every signal the scorer had said they
//  were excellent: on topic, well written, few outbound links. They
//  are also the client's competitors, and a competitor does not link
//  to a competitor. Nothing in the scorer could see that, because
//  "sells the same things we do" is not a quality signal — it is a
//  relationship, and it needs its own reading of the page.
//
//  This detects the storefront, not the competitor. Whether a shop is
//  a *rival* depends on the client, so score.ts combines what is found
//  here with topical relevance to decide. A camping blog that sells
//  three t-shirts is a storefront and not a competitor; a knife shop
//  writing about knives is both.
// ═══════════════════════════════════════════════════════════

import { resolveHref, sameSite } from './normalize';

export type CommercePlatform =
  | 'shopify'
  | 'woocommerce'
  | 'bigcommerce'
  | 'magento'
  | 'squarespace'
  | 'wix';

export interface CommerceSignals {
  /**
   * The page is part of a storefront.
   *
   * Deliberately conservative — see `readCommerceSignalsFromHtml` for the
   * evidence bar. A false positive here costs the client a real prospect and
   * is invisible unless someone audits the rejects, so the failure mode is
   * chosen to be "misses a shop" rather than "drops a publisher".
   */
  isStorefront: boolean;
  /** Storefront platform, when its fingerprint is unambiguous. */
  platform: CommercePlatform | null;
  /** Every marker that fired, in the order checked. For the audit trail. */
  markers: string[];
}

/**
 * Platform fingerprints. Each is something the platform itself emits — an asset
 * host, a generated class name, a global — never a word an author could type.
 * A blog post *about* Shopify must not read as a Shopify store.
 */
const PLATFORM_FINGERPRINTS: ReadonlyArray<readonly [CommercePlatform, RegExp]> = [
  ['shopify', /cdn\.shopify\.com|\/cdn\/shop\/|Shopify\.theme|shopify-section|myshopify\.com/i],
  ['woocommerce', /woocommerce-page|wp-content\/plugins\/woocommerce|wc-block-|wc_add_to_cart/i],
  ['bigcommerce', /cdn\d*\.bigcommerce\.com|bigcommerce\.com\/s-/i],
  ['magento', /Magento_[A-Z]|\/static\/version\d+\/frontend\/|mage\/cookies/i],
  ['squarespace', /static1\.squarespace\.com.*commerce|sqs-block-product/i],
  ['wix', /wixstores|wix-stores|_wixCIDX.*stores/i],
];

/**
 * Cart and checkout endpoints. Matched as link targets rather than as text, so
 * an article describing a checkout flow does not count as having one.
 */
const CART_PATHS = /^\/(cart|checkout|basket|panier|warenkorb|carrito)(\/|$|\?)/i;

/** Shopify and WooCommerce form actions, which only a real product page has. */
const ADD_TO_CART_MARKUP =
  /(action|href)=["'][^"']*\/(cart\/add|\?add-to-cart=)|name=["']add-to-cart["']|data-product-id=|<form[^>]+\/cart\/add/i;

/** Product listing and detail paths, as a weaker corroborating signal. */
const PRODUCT_PATHS = /^\/(collections|products|product|shop|store|product-category)(\/|$)/i;

/**
 * Product structured data carrying a price. Schema.org `Product` alone is not
 * enough — review sites mark up the things they review — so an `offers` block
 * or a price field has to be present alongside it.
 */
function hasPricedProductSchema(html: string): boolean {
  if (!/"@type"\s*:\s*"?\[?\s*"?Product/i.test(html)) return false;
  return /"offers"\s*:|"price"\s*:|"priceCurrency"\s*:|itemprop=["']price["']/i.test(html);
}

/**
 * Reads storefront evidence from a fetched page.
 *
 * The bar for `isStorefront` is a platform fingerprint plus one corroborating
 * commerce signal, or — for a shop on a platform this does not recognise — two
 * independent commerce signals. One signal alone is never enough: a lone
 * `/shop` link in a nav is how an editorial site points at its merch, and a
 * lone `cdn.shopify.com` reference is how a blog embeds an image.
 *
 * @param html   the page as fetched
 * @param pageUrl  URL after redirects, for resolving relative hrefs
 */
export function readCommerceSignalsFromHtml(html: string, pageUrl: string): CommerceSignals {
  const markers: string[] = [];

  let platform: CommercePlatform | null = null;
  for (const [name, pattern] of PLATFORM_FINGERPRINTS) {
    if (pattern.test(html)) {
      platform = name;
      markers.push(`platform_${name}`);
      break;
    }
  }

  //  Cart links and product paths are read from hrefs on the page's own host.
  //  An affiliate link to somebody else's checkout says nothing about whether
  //  *this* site sells anything, and gear blogs are full of them.
  let hasCartLink = false;
  let hasProductPath = false;

  for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    if (hasCartLink && hasProductPath) break;

    const resolved = resolveHref(match[1], pageUrl);
    if (!resolved || !sameSite(resolved, pageUrl)) continue;

    let path: string;
    try {
      path = new URL(resolved).pathname;
    } catch {
      continue;
    }

    if (!hasCartLink && CART_PATHS.test(path)) {
      hasCartLink = true;
      markers.push('cart_link');
    }
    if (!hasProductPath && PRODUCT_PATHS.test(path)) {
      hasProductPath = true;
      markers.push('product_path');
    }
  }

  const hasAddToCart = ADD_TO_CART_MARKUP.test(html);
  if (hasAddToCart) markers.push('add_to_cart_markup');

  const hasProductSchema = hasPricedProductSchema(html);
  if (hasProductSchema) markers.push('priced_product_schema');

  const corroborating = [hasCartLink, hasProductPath, hasAddToCart, hasProductSchema].filter(
    Boolean
  ).length;

  const isStorefront = platform !== null ? corroborating >= 1 : corroborating >= 2;

  return { isStorefront, platform, markers };
}
