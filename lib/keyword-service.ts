import 'server-only'
import {
  COUNTRIES,
  type Intent,
  type KeywordRow,
  type KeywordResponse,
} from '@/lib/seo'

const DFS_ENDPOINT =
  'https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live'

const VALID_INTENTS: Intent[] = [
  'informational',
  'navigational',
  'commercial',
  'transactional',
]

function normalizeIntent(raw: unknown): Intent {
  const v = String(raw ?? '').toLowerCase()
  return (VALID_INTENTS.find((i) => i === v) ?? 'informational') as Intent
}

function buildTrend(
  monthly: Array<{ search_volume?: number }> | undefined,
): number[] {
  if (!monthly || monthly.length === 0) return Array(12).fill(0)
  const slice = monthly.slice(0, 12).map((m) => Number(m.search_volume ?? 0))
  return slice.reverse()
}

/* ----------------------------- Live DataForSEO ---------------------------- */

async function fetchFromDataForSEO(
  seed: string,
  locationCode: number,
): Promise<KeywordRow[] | null> {
  const login = process.env.DATAFORSEO_LOGIN
  const password = process.env.DATAFORSEO_PASSWORD
  if (!login || !password) return null

  const auth = Buffer.from(`${login}:${password}`).toString('base64')

  const body = [
    {
      keyword: seed,
      location_code: locationCode,
      language_code: 'en',
      include_serp_info: false,
      include_seed_keyword: true,
      limit: 100,
      order_by: ['keyword_info.search_volume,desc'],
    },
  ]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)

  try {
    const res = await fetch(DFS_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!res.ok) throw new Error(`DataForSEO HTTP ${res.status}`)

    const json = await res.json()
    const task = json?.tasks?.[0]
    if (!task || task.status_code !== 20000) {
      throw new Error(task?.status_message ?? 'DataForSEO task error')
    }

    const items: any[] = task.result?.[0]?.items ?? []
    if (items.length === 0) return []

    return items
      .map((item): KeywordRow | null => {
        const ki = item.keyword_info ?? {}
        const kp = item.keyword_properties ?? {}
        const keyword = item.keyword
        if (!keyword) return null
        return {
          keyword,
          intent: normalizeIntent(item.search_intent_info?.main_intent),
          volume: Number(ki.search_volume ?? 0),
          difficulty: Math.round(Number(kp.keyword_difficulty ?? 0)),
          cpc: Number(ki.cpc ?? 0),
          competition: Number(ki.competition ?? 0),
          trend: buildTrend(ki.monthly_searches),
          results: Number(item.serp_info?.se_results_count ?? 0),
        }
      })
      .filter((r): r is KeywordRow => r !== null)
  } finally {
    clearTimeout(timeout)
  }
}

/* --------------------- Deterministic estimated fallback -------------------- */

function hash(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

const MODIFIERS = [
  '', 'best', 'cheap', 'buy', 'online', 'reviews', 'for women', 'for men',
  'near me', 'vs competitors', 'how to choose', 'wholesale',
  'with free shipping', 'sale', 'discount', 'premium', 'sustainable',
  'comparison', 'price', 'top rated', 'guide', 'alternatives', 'brands',
  'where to buy',
]

function intentFor(phrase: string): Intent {
  if (/\b(buy|order|shop|sale|discount|shipping|price|cheap)\b/.test(phrase))
    return 'transactional'
  if (/\b(best|top|reviews|vs|comparison|alternatives|brands|rated)\b/.test(phrase))
    return 'commercial'
  if (/\b(login|website|official|brand|near me)\b/.test(phrase))
    return 'navigational'
  return 'informational'
}

function estimateKeywords(seed: string): KeywordRow[] {
  const base = hash(seed)
  return MODIFIERS.map((mod, idx) => {
    const phrase = mod ? `${seed} ${mod}`.trim() : seed
    const seedHash = hash(phrase)
    const rank = idx
    const volume = Math.max(
      40,
      Math.round((18000 / (rank + 1)) * (0.6 + (seedHash % 80) / 100)),
    )
    const difficulty = (seedHash % 96) + (mod === '' ? 4 : 0)
    const cpc = Number(((seedHash % 850) / 100 + 0.15).toFixed(2))
    const competition = Number(((seedHash % 100) / 100).toFixed(2))
    const trend = Array.from({ length: 12 }, (_, m) => {
      const wave = Math.sin((m / 12) * Math.PI * 2 + (base % 6))
      return Math.max(
        0,
        Math.round(volume * (0.75 + 0.25 * wave + ((m * seedHash) % 7) / 50)),
      )
    })
    return {
      keyword: phrase,
      intent: intentFor(phrase),
      volume,
      difficulty: Math.min(99, difficulty),
      cpc,
      competition,
      trend,
      results: volume * (120 + (seedHash % 400)),
    }
  }).sort((a, b) => b.volume - a.volume)
}

/* --------------------------------- Public --------------------------------- */

export async function getKeywords(
  seed: string,
  countryCode: string,
): Promise<KeywordResponse> {
  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0]

  let keywords: KeywordRow[] | null = null
  let source: KeywordResponse['source'] = 'estimated'

  try {
    keywords = await fetchFromDataForSEO(seed, country.locationCode)
    if (keywords && keywords.length > 0) source = 'dataforseo'
  } catch (err) {
    console.log(
      '[v0] DataForSEO fetch failed, using estimated data:',
      String(err),
    )
    keywords = null
  }

  if (!keywords || keywords.length === 0) {
    keywords = estimateKeywords(seed)
    source = 'estimated'
  }

  const totalVolume = keywords.reduce((s, k) => s + k.volume, 0)
  const avgDifficulty = Math.round(
    keywords.reduce((s, k) => s + k.difficulty, 0) / keywords.length,
  )
  const avgCpc = Number(
    (keywords.reduce((s, k) => s + k.cpc, 0) / keywords.length).toFixed(2),
  )

  return {
    seed,
    location: country.name,
    source,
    total: keywords.length,
    summary: { totalVolume, avgDifficulty, avgCpc },
    keywords,
  }
}
