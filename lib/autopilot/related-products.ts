// lib/autopilot/related-products.ts
//
// Picks the products to show alongside a product.
//
// Not one product in the catalogue has an upsell or a cross-sell set — measured
// at 0 of 300 across three slices. That costs twice over: WooCommerce renders
// upsells on the product page, so every product page is a dead end with no
// internal link out, and the cart has nothing to suggest, so basket size is
// whatever the visitor arrived intending to buy.
//
// This is a ranking problem, not a writing problem, so there is no model call
// here. Brand, category, price and sales history are already in WooCommerce and
// say everything needed.

export interface IndexedProduct {
  id: number
  name: string
  price: number
  brandIds: number[]
  categoryIds: number[]
  inStock: boolean
  hasImage: boolean
  totalSales: number
}

/**
 * Categories too broad to mean "related".
 *
 * Half this catalogue sits in buckets like "New" and "Closeout", which say
 * when a product arrived rather than what it is. Treating those as a
 * similarity signal would pair a folding knife with a gun-cleaning wrench
 * purely because both were added the same week.
 */
export const GENERIC_CATEGORY_SLUGS = [
  'new',
  'closeout',
  'everything-else',
  'uncategorized',
  'sale',
  'clearance',
  'discount-bargain-pocket-knives',
]

export interface RelationConfig {
  /** Shown on the product page by WooCommerce — these carry the internal links. */
  upsellCount: number
  /** Shown in the cart — these carry the basket size. */
  crossSellCount: number
  /** How far a candidate's price may sit from the product's, as a multiplier. */
  priceBandLow: number
  priceBandHigh: number
}

export const DEFAULT_RELATIONS: RelationConfig = {
  upsellCount: 4,
  crossSellCount: 3,
  priceBandLow: 0.4,
  priceBandHigh: 2.5,
}

/**
 * A candidate has to be something a visitor can actually buy and see.
 *
 * The same reasoning as the publish gate: recommending an out-of-stock product
 * wastes the slot, and one with no photograph looks broken in a related-product
 * row where every other tile has an image.
 */
export function isEligibleTarget(p: IndexedProduct): boolean {
  return p.inStock && p.hasImage && p.price > 0
}

function shareAny(a: number[], b: number[]): number {
  let n = 0
  for (const x of a) if (b.includes(x)) n++
  return n
}

/**
 * Scores how well `candidate` belongs next to `product`.
 *
 * Brand outweighs category because a buyer looking at a Civivi is far more
 * likely to want another Civivi than another knife that happens to share the
 * "Locking Knives" bucket with fifteen thousand others. Sales history breaks
 * ties toward what actually sells rather than what happens to sort first.
 */
export function scoreCandidate(
  product: IndexedProduct,
  candidate: IndexedProduct,
  specificCategoryIds: Set<number>
): number {
  if (candidate.id === product.id) return -1
  if (!isEligibleTarget(candidate)) return -1

  let score = 0

  if (shareAny(product.brandIds, candidate.brandIds) > 0) score += 30

  const sharedSpecific = product.categoryIds.filter(
    id => specificCategoryIds.has(id) && candidate.categoryIds.includes(id)
  ).length
  score += sharedSpecific * 18

  //  Nothing in common beyond being in the same shop is not a relation.
  if (score === 0) return -1

  //  Price proximity, as a ratio rather than a difference — $20 apart means
  //  something different on a $30 knife than on a $900 sword.
  const ratio = candidate.price / product.price
  if (ratio < DEFAULT_RELATIONS.priceBandLow || ratio > DEFAULT_RELATIONS.priceBandHigh) {
    score -= 12
  } else {
    score += 10 * (1 - Math.abs(Math.log(ratio)) / Math.log(DEFAULT_RELATIONS.priceBandHigh))
  }

  //  A gentle nudge toward proven sellers; log so one runaway product cannot
  //  dominate every row in the catalogue.
  score += Math.min(8, Math.log10(candidate.totalSales + 1) * 4)

  return score
}

/**
 * Words that distinguish one listing from another without distinguishing the
 * product — colourways, finishes and scale materials. This catalogue lists
 * every variant as its own product, so "Vosteed Raccoon Crossbar Black" and
 * "Vosteed Raccoon Crossbar Green" are two rows describing one knife.
 */
const VARIANT_WORDS = new Set([
  'black', 'blue', 'green', 'red', 'orange', 'grey', 'gray', 'white', 'purple',
  'pink', 'yellow', 'brown', 'tan', 'fde', 'od', 'bronze', 'copper', 'brass',
  'titanium', 'ti', 'carbon', 'cf', 'g10', 'micarta', 'wood', 'bone', 'stag',
  'satin', 'stonewash', 'stonewashed', 'blackwash', 'dlc', 'pvd', 'damascus',
  'sw', 'bw', 'blk', 'grn', 'org', 'gry', 'plain', 'serrated', 'combo',
])

/**
 * A key that collapses colourways of one model onto each other.
 *
 * Without this a related-products row fills with four shades of the same knife,
 * which tells a buyer nothing and reads as a broken widget. Three significant
 * words is enough to separate a Raccoon from a Vombat while still grouping
 * every Raccoon finish together.
 */
export function modelKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !VARIANT_WORDS.has(w) && !/^\d+$/.test(w))
    .slice(0, 3)
    .join(' ')
}

export interface Relations {
  upsellIds: number[]
  crossSellIds: number[]
}

/**
 * Chooses upsells and cross-sells for one product.
 *
 * Upsells lean to the same price or above, because WooCommerce renders them on
 * the product page where a step up is the useful suggestion. Cross-sells lean
 * cheaper — they appear at the cart, where the realistic addition is a
 * sharpener rather than a second knife.
 *
 * `candidates` should be pre-narrowed to the product's brand and categories;
 * scoring every product in a 36,000-item catalogue for every product is an
 * hour of CPU for the same answer.
 */
export function pickRelations(
  product: IndexedProduct,
  candidates: IndexedProduct[],
  specificCategoryIds: Set<number>,
  config: RelationConfig = DEFAULT_RELATIONS
): Relations {
  const scored = candidates
    .map(c => ({ p: c, score: scoreCandidate(product, c, specificCategoryIds) }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)

  const upsells: number[] = []
  const crossSells: number[] = []
  const used = new Set<number>()

  //  One listing per model across both rows. The catalogue carries every
  //  colourway as its own product, so without this a row fills with four
  //  shades of the same knife — which is what the first dry run produced.
  //  The source product's own model is seeded in, because showing a buyer the
  //  thing they are already looking at is the worst slot of the four.
  const seenModels = new Set<string>([modelKey(product.name)])

  const take = (list: number[], priceTest: (p: IndexedProduct) => boolean) => {
    for (const { p } of scored) {
      if (list.length >= (list === upsells ? config.upsellCount : config.crossSellCount)) break
      if (used.has(p.id)) continue
      const key = modelKey(p.name)
      if (seenModels.has(key)) continue
      if (!priceTest(p)) continue
      list.push(p.id)
      used.add(p.id)
      seenModels.add(key)
    }
  }

  //  Upsells first: WooCommerce renders them on the product page, so they get
  //  the best-scoring candidates. A step up in price is the useful suggestion
  //  there.
  take(upsells, p => p.price >= product.price * 0.9)
  //  A product at the top of its range has nothing above it; fill from the rest
  //  rather than leaving the page with no links out.
  take(upsells, () => true)

  //  Cross-sells appear at the cart, where the realistic addition is cheaper
  //  than what is already in the basket.
  take(crossSells, p => p.price <= product.price * 1.1)
  take(crossSells, () => true)

  return { upsellIds: upsells, crossSellIds: crossSells }
}

/** Same ids in the same order — used to skip products that need no write. */
export function sameIds(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((x, i) => x === b[i])
}
