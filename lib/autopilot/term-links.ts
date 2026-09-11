// lib/autopilot/term-links.ts
//
// The real URL of a category or brand, asked for rather than assumed.
//
// The prompt used to build internal links by concatenation —
// `https://{domain}/product-category/{slug}/` — and on this store that path
// redirects to the home page. 19,294 published pages carry those links, which
// is 87% of everything published: every internal link the autopilot has ever
// written lands a visitor on the front page and tells Google nothing about the
// product it came from. Not one page carries the real `/collections/` or
// `/brand/` path.
//
// WordPress reports the canonical permalink for every term, so there is no
// reason to guess. A permalink structure is a site setting that can change at
// any time, and a guessed URL fails silently — it still looks like a link.

export interface TermLink {
  slug: string
  name: string
  link: string
  count: number
}

interface TermCache {
  bySlug: Map<string, TermLink>
  loadedAt: number
}

const CACHE_TTL_MS = 30 * 60 * 1000
const caches = new Map<string, TermCache>()

async function fetchAllTerms(
  baseUrl: string,
  taxonomy: string,
  auth: string
): Promise<TermLink[]> {
  const out: TermLink[] = []
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/${taxonomy}?per_page=100&page=${page}&orderby=count&order=desc`,
      { headers: { Authorization: `Basic ${auth}` }, signal: AbortSignal.timeout(30_000) }
    )
    if (!res.ok) break
    const batch = (await res.json()) as any[]
    for (const t of batch) {
      if (t?.slug && t?.link) {
        out.push({ slug: t.slug, name: t.name ?? t.slug, link: t.link, count: t.count ?? 0 })
      }
    }
    if (batch.length < 100) break
  }
  return out
}

/**
 * Slug to canonical permalink, for categories and brands together.
 *
 * Cached for half an hour: a batch of eight products would otherwise re-read
 * several hundred terms eight times over, against an origin that returns 520
 * under load.
 */
export async function loadTermLinks(
  baseUrl: string,
  creds: { username: string; appPassword: string }
): Promise<Map<string, TermLink>> {
  const cached = caches.get(baseUrl)
  if (cached && Date.now() - cached.loadedAt < CACHE_TTL_MS) return cached.bySlug

  const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')
  const bySlug = new Map<string, TermLink>()

  for (const taxonomy of ['product_cat', 'product_brand']) {
    try {
      for (const t of await fetchAllTerms(baseUrl, taxonomy, auth)) {
        //  Categories win a slug collision: they are the more useful
        //  destination from a product page, and collisions are rare.
        if (taxonomy === 'product_cat' || !bySlug.has(t.slug)) bySlug.set(t.slug, t)
      }
    } catch (err) {
      console.warn(`[term-links] ${taxonomy} lookup failed:`, (err as Error).message)
    }
  }

  if (bySlug.size > 0) {
    caches.set(baseUrl, { bySlug, loadedAt: Date.now() })
    console.log(`[term-links] ${bySlug.size} category and brand permalinks cached.`)
  }
  return bySlug
}

/**
 * Turns the slugs a product carries into links that actually resolve.
 *
 * A slug with no matching term is dropped rather than guessed at. An invented
 * URL is worse than one fewer link: it looks like a working link to the model
 * writing the copy, to the reader, and to Googlebot, and only fails once
 * somebody clicks it.
 */
export function resolveTermLinks(
  slugs: string[],
  bySlug: Map<string, TermLink>,
  limit = 4
): TermLink[] {
  const seen = new Set<string>()
  const out: TermLink[] = []
  for (const slug of slugs) {
    const term = bySlug.get(slug)
    if (!term || seen.has(term.link)) continue
    seen.add(term.link)
    out.push(term)
    if (out.length >= limit) break
  }
  return out
}
