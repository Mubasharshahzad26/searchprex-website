// lib/autopilot/quality-gate.ts
//
// Decide whether a product deserves a page, before anything is spent on it.
//
// The autopilot used to publish whatever the queue handed it. On this
// catalogue that meant 24% of recently published products had no photograph at
// all and 31% could not be bought, and Google has answered: 27,510 pages
// crawled and then declined, against 13,200 indexed.
//
// A page with no image, no price and no way to buy cannot convert and gives
// Google no reason to index it. Generating one spends a Gemini call, an
// Indexing API slot out of a finite daily 2,000, and a share of the crawl
// budget — to produce a page that makes the site's indexed ratio worse.
//
// NicheSEO Pro runs the identical rules in server/mso-quality-gate.ts. Both
// engines work the same catalogue, so the two must move together.

export interface CommerceFacts {
  name: string
  imageCount: number
  stockStatus: string
  attributeCount: number
  price: string
  description: string
  shortDescription: string
}

export interface GateConfig {
  requireImage: boolean
  requireInStock: boolean
  requireAttributes: boolean
  requirePrice: boolean
  minAttributes: number
}

export const DEFAULT_GATE: GateConfig = {
  requireImage: true,
  requireInStock: true,
  requireAttributes: true,
  requirePrice: true,
  minAttributes: 1,
}

export interface GateResult {
  pass: boolean
  /** False when the facts could not be read — see the fail-open note below. */
  checked: boolean
  reasons: string[]
}

/** Reads gate settings from the environment so they can change without a deploy. */
export function gateConfigFromEnv(): GateConfig {
  const flag = (key: string, dflt: boolean) => {
    const v = process.env[key]
    return v === undefined ? dflt : v === 'true' || v === '1'
  }
  return {
    requireImage: flag('GATE_REQUIRE_IMAGE', DEFAULT_GATE.requireImage),
    requireInStock: flag('GATE_REQUIRE_IN_STOCK', DEFAULT_GATE.requireInStock),
    requireAttributes: flag('GATE_REQUIRE_ATTRIBUTES', DEFAULT_GATE.requireAttributes),
    requirePrice: flag('GATE_REQUIRE_PRICE', DEFAULT_GATE.requirePrice),
    minAttributes: Number(process.env.GATE_MIN_ATTRIBUTES ?? DEFAULT_GATE.minAttributes) || 1,
  }
}

/**
 * Reads the commerce facts the gate needs.
 *
 * Uses wc/v3 because stock status, images, attributes and price simply are not
 * on the wp/v2 product object.
 */
export async function fetchCommerceFacts(
  postId: number,
  baseUrl: string,
  creds: { username: string; appPassword: string },
  timeoutMs = 10_000
): Promise<CommerceFacts | null> {
  try {
    const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')
    const res = await fetch(`${baseUrl}/wp-json/wc/v3/products/${postId}`, {
      headers: { Authorization: `Basic ${auth}` },
      signal: AbortSignal.timeout(timeoutMs),
    })
    if (!res.ok) return null

    const p = (await res.json()) as any
    return {
      name: p?.name ?? '',
      imageCount: Array.isArray(p?.images) ? p.images.length : 0,
      stockStatus: p?.stock_status ?? 'instock',
      attributeCount: Array.isArray(p?.attributes) ? p.attributes.length : 0,
      price: String(p?.price ?? ''),
      description: p?.description ?? '',
      shortDescription: p?.short_description ?? '',
    }
  } catch {
    return null
  }
}

/**
 * Applies the gate.
 *
 * Fails open on purpose: when the facts could not be read the product is let
 * through with `checked: false`. This origin returns 520 under load, and a
 * transient failure should not quietly park a healthy product.
 */
export function evaluateGate(
  facts: CommerceFacts | null,
  config: GateConfig = DEFAULT_GATE
): GateResult {
  if (!facts) return { pass: true, checked: false, reasons: [] }

  const reasons: string[] = []

  if (config.requireImage && facts.imageCount === 0) reasons.push('no_image')
  if (config.requireInStock && facts.stockStatus !== 'instock') {
    reasons.push(`stock_${facts.stockStatus}`)
  }
  if (config.requireAttributes && facts.attributeCount < config.minAttributes) {
    reasons.push(`attributes_${facts.attributeCount}`)
  }
  if (config.requirePrice && (!facts.price || Number(facts.price) === 0)) {
    reasons.push('no_price')
  }

  return { pass: reasons.length === 0, checked: true, reasons }
}

/** Human-readable tally for the run log and the client report. */
export function summariseGateReasons(all: string[][]): string {
  const counts = new Map<string, number>()
  for (const reasons of all) {
    for (const r of reasons) counts.set(r, (counts.get(r) ?? 0) + 1)
  }
  if (counts.size === 0) return 'none'
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([r, n]) => `${r}=${n}`)
    .join(' ')
}
