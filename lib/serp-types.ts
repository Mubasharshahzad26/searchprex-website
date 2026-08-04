/**
 * Shared SERP-checker types + helpers.
 *
 * No `server-only` import here on purpose: the client component needs the types,
 * the feature metadata and `normalizeDomain` for optimistic input validation.
 * The DataForSEO call itself lives in app/api/serp-checker/route.ts.
 */

export type SerpFeature =
  | 'aiOverview'
  | 'featuredSnippet'
  | 'peopleAlsoAsk'
  | 'localPack'
  | 'topStories'
  | 'knowledgePanel'
  | 'video'
  | 'shopping'
  | 'image'
  | 'relatedSearches'

export interface SerpItem {
  rank: number
  url: string
  domain: string
  title: string
  snippet: string
}

export interface SerpKeywordResult {
  keyword: string
  location: string
  source: 'dataforseo' | 'estimated'
  /** Organic position in the top 100, or null when the domain never appears. */
  position: number | null
  found: boolean
  /** True when the domain is cited inside the AI Overview block. */
  isAiOverview: boolean
  yourDomain: string
  /** The user's own result, when they rank. */
  yourResult: SerpItem | null
  features: SerpFeature[]
  top10: SerpItem[]
  /** Domains appearing in the top 10, most frequent first. */
  competitors: Array<{ domain: string; count: number }>
  /** The AI Overview block, when Google returned one for this query. */
  aiOverview?: { title: string; url: string; domain: string; text: string }
  /** Total organic results parsed for this keyword (max 100). */
  totalResults: number
}

export interface SerpResponse {
  domain: string
  location: string
  source: 'dataforseo' | 'estimated'
  results: SerpKeywordResult[]
  checkedAt: string
}

export const MAX_KEYWORDS = 5
export const MAX_KEYWORD_LENGTH = 80

export const SERP_FEATURE_META: Record<
  SerpFeature,
  { label: string; hint: string; color: string; bg: string }
> = {
  aiOverview: {
    label: 'AI Overview',
    hint: "Google generates an AI answer above the results — being cited here matters more than position #1.",
    color: '#6b21a8',
    bg: '#f6eeff',
  },
  featuredSnippet: {
    label: 'Featured Snippet',
    hint: 'A "position zero" answer box is present. Winning it can double your clicks.',
    color: '#1e40af',
    bg: '#eff5ff',
  },
  peopleAlsoAsk: {
    label: 'People Also Ask',
    hint: 'An expandable question box — a fast way to earn extra visibility with FAQ content.',
    color: '#0f6e56',
    bg: '#e1f5ee',
  },
  localPack: {
    label: 'Local Pack',
    hint: 'A map with 3 local businesses. Your Google Business Profile decides whether you appear.',
    color: '#993c1d',
    bg: '#faece7',
  },
  topStories: {
    label: 'Top Stories',
    hint: 'A news carousel — this query has fresh-content intent.',
    color: '#854f0b',
    bg: '#faeeda',
  },
  knowledgePanel: {
    label: 'Knowledge Panel',
    hint: 'An entity panel on the right. Strong brand/entity signals drive this.',
    color: '#534ab7',
    bg: '#eeedfe',
  },
  video: {
    label: 'Video',
    hint: 'Video results are ranking — video content is a realistic way in.',
    color: '#c62828',
    bg: '#fdecec',
  },
  shopping: {
    label: 'Shopping',
    hint: 'Product listing ads are present, so this query carries buying intent.',
    color: '#166534',
    bg: '#eafbef',
  },
  image: {
    label: 'Image Pack',
    hint: 'An image row is present — optimised, descriptive image alt text can win space here.',
    color: '#185fa5',
    bg: '#e6f1fb',
  },
  relatedSearches: {
    label: 'Related Searches',
    hint: 'Google suggests follow-up queries — a free source of content ideas.',
    color: '#475569',
    bg: '#f1f5f9',
  },
}

/** Countries mirror lib/seo.ts COUNTRIES; location_name is what the SERP API expects. */
export const SERP_COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
]

/**
 * Reduce user input to a bare hostname: "https://www.Foo.com/blog?x=1" → "foo.com".
 * Returns null when the input can't be read as a domain.
 */
export function normalizeDomain(input: string): string | null {
  let raw = (input || '').trim().toLowerCase()
  if (!raw) return null

  // Strip scheme, credentials, path, query and fragment without needing a valid URL.
  raw = raw.replace(/^[a-z][a-z0-9+.-]*:\/\//, '')
  raw = raw.replace(/^[^/@]*@/, '')
  raw = raw.split(/[/?#]/)[0]
  raw = raw.replace(/:\d+$/, '')
  raw = raw.replace(/^www\./, '')
  raw = raw.replace(/\.$/, '')

  if (!raw) return null
  // Must look like host.tld — labels of letters/digits/hyphen, TLD of 2+ letters.
  if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(raw)) return null
  if (raw.length > 253) return null
  return raw
}

/** Hostname out of a full result URL, for comparing against the user's domain. */
export function domainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '').toLowerCase()
  } catch {
    return normalizeDomain(url) ?? ''
  }
}

/**
 * A domain matches if it is the same host or a subdomain of it —
 * "blog.foo.com" counts as a hit for "foo.com", "notfoo.com" does not.
 */
export function domainMatches(candidate: string, target: string): boolean {
  if (!candidate || !target) return false
  return candidate === target || candidate.endsWith(`.${target}`)
}

/* --------------------- Deterministic estimated fallback -------------------- */
// Same FNV-1a approach as lib/keyword-service.ts: identical input always yields
// identical output, so the demo never "re-rolls" a user's ranking on refresh.

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

const FILLER_DOMAINS = [
  'wikipedia.org',
  'linkedin.com',
  'youtube.com',
  'reddit.com',
  'forbes.com',
  'clutch.co',
  'yelp.com',
  'semrush.com',
  'ahrefs.com',
  'hubspot.com',
  'medium.com',
  'quora.com',
]

const TITLE_SHAPES = [
  (k: string, d: string) => `${titleCase(k)} — Complete Guide | ${brand(d)}`,
  (k: string, d: string) => `Best ${titleCase(k)} Services in 2026 | ${brand(d)}`,
  (k: string, d: string) => `${titleCase(k)}: What You Need to Know — ${brand(d)}`,
  (k: string, d: string) => `Top 10 ${titleCase(k)} Providers | ${brand(d)}`,
  (k: string, d: string) => `${brand(d)} | ${titleCase(k)} Experts`,
]

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase())
}

function brand(domain: string): string {
  const label = domain.split('.')[0] ?? domain
  return titleCase(label.replace(/[-_]/g, ' '))
}

function slug(s: string): string {
  return s.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const ALL_FEATURES: SerpFeature[] = [
  'aiOverview',
  'featuredSnippet',
  'peopleAlsoAsk',
  'localPack',
  'topStories',
  'knowledgePanel',
  'video',
  'shopping',
  'image',
  'relatedSearches',
]

function estimateOne(
  domain: string,
  keyword: string,
  location: string,
): SerpKeywordResult {
  const seed = hash(`${domain}::${keyword}::${location}`)

  // Roughly two-thirds of demo checks "rank" somewhere in the top 100.
  const found = seed % 3 !== 0
  const position = found ? (seed % 97) + 1 : null
  const isAiOverview = found && seed % 11 === 0

  const features: SerpFeature[] = ALL_FEATURES.filter(
    (_, i) => (seed >> i) % 4 === 0,
  )
  if (features.length === 0) features.push('relatedSearches')
  if (isAiOverview && !features.includes('aiOverview')) features.unshift('aiOverview')

  const kwSlug = slug(keyword) || 'page'

  const top10: SerpItem[] = Array.from({ length: 10 }, (_, i) => {
    const rank = i + 1
    // Place the user's own domain in the top 10 when that's where it landed.
    const isYou = found && position === rank
    const filler = FILLER_DOMAINS[(seed + i * 7) % FILLER_DOMAINS.length]
    const d = isYou ? domain : filler
    const shape = TITLE_SHAPES[(seed + i) % TITLE_SHAPES.length]
    return {
      rank,
      url: `https://www.${d}/${kwSlug}`,
      domain: d,
      title: shape(keyword, d),
      snippet: `A representative result for "${keyword}" — connect DataForSEO to replace this with the live Google SERP for ${location}.`,
    }
  })

  const yourResult =
    found && position !== null && position <= 10
      ? (top10.find((r) => domainMatches(r.domain, domain)) ?? null)
      : found && position !== null
        ? {
            rank: position,
            url: `https://www.${domain}/${kwSlug}`,
            domain,
            title: TITLE_SHAPES[seed % TITLE_SHAPES.length](keyword, domain),
            snippet: `Your page for "${keyword}" — estimated placement, not a live Google reading.`,
          }
        : null

  const tally = new Map<string, number>()
  for (const r of top10) tally.set(r.domain, (tally.get(r.domain) ?? 0) + 1)
  const competitors = [...tally.entries()]
    .map(([d, count]) => ({ domain: d, count }))
    .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain))

  return {
    keyword,
    location,
    source: 'estimated',
    position,
    found,
    isAiOverview,
    yourDomain: domain,
    yourResult,
    features,
    top10,
    competitors,
    totalResults: 100,
  }
}

/**
 * Deterministic stand-in used when DataForSEO credentials are absent or the
 * live call fails. The UI labels this clearly — it is illustrative, not real.
 */
export function estimateSerpResults(
  domain: string,
  keywords: string[],
  location: string,
  checkedAt: string,
): SerpResponse {
  return {
    domain,
    location,
    source: 'estimated',
    results: keywords.map((k) => estimateOne(domain, k, location)),
    checkedAt,
  }
}

/** Single-keyword estimate, used when one live call fails inside a larger run. */
export function estimateSerpKeyword(
  domain: string,
  keyword: string,
  location: string,
): SerpKeywordResult {
  return estimateOne(domain, keyword, location)
}

/* ------------------------------ UI helpers -------------------------------- */

/** Colour band for a ranking position, mirroring the kdBand() idea in lib/seo.ts. */
export function positionBand(position: number | null): {
  label: string
  color: string
  bg: string
} {
  if (position === null)
    return { label: 'Not in top 100', color: '#c62828', bg: 'rgba(229,72,77,0.12)' }
  if (position <= 3)
    return { label: 'Top 3', color: '#166534', bg: 'rgba(46,125,50,0.14)' }
  if (position <= 10)
    return { label: 'Page 1', color: '#2e7d32', bg: 'rgba(46,125,50,0.10)' }
  if (position <= 20)
    return { label: 'Page 2', color: '#b58900', bg: 'rgba(245,166,35,0.16)' }
  if (position <= 50)
    return { label: 'Pages 3–5', color: '#d35400', bg: 'rgba(255,100,45,0.14)' }
  return { label: 'Deep in top 100', color: '#993c1d', bg: 'rgba(153,60,29,0.12)' }
}
