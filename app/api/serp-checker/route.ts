// app/api/serp-checker/route.ts
//
// Secure server-side proxy for the free SERP Checker tool.
// - Calls DataForSEO's SERP API with the same DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD
//   creds used by lib/keyword-service.ts.
// - Falls back to clearly-labelled deterministic estimates when creds are missing
//   or the live call fails — the tool stays usable with no configuration.
// - Basic in-memory per-IP rate limit so a free public page can't be hammered.
//
// Setup: add to .env.local (and Vercel → Settings → Environment Variables):
//   DATAFORSEO_LOGIN
//   DATAFORSEO_PASSWORD

import { NextRequest, NextResponse } from 'next/server'
import {
  MAX_KEYWORDS,
  MAX_KEYWORD_LENGTH,
  SERP_COUNTRIES,
  domainFromUrl,
  domainMatches,
  previewSerpKeyword,
  normalizeDomain,
  type SerpFeature,
  type SerpItem,
  type SerpKeywordResult,
  type SerpResponse,
} from '@/lib/serp-types'
import {
  DAILY_KEYWORD_QUOTA,
  recordUsage,
  usageToday,
  visitorHashFor,
} from '@/lib/serp-cache'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Live Google SERP. "advanced" (not "regular") is required — it returns the
// rich item types we read for SERP features: ai_overview, featured_snippet,
// people_also_ask, local_pack, top_stories, images, related_searches.
// Verified endpoint: /v3/dataforseo_labs/google/serp/live returns 404.
const SERP_ENDPOINT =
  'https://api.dataforseo.com/v3/serp/google/organic/live/advanced'

// Rate limiting and caching live in lib/serp-cache (Postgres-backed).
//
// The limiter this replaced was a module-level Map. On Vercel every lambda
// instance holds its own copy and instances churn constantly, so "5 per minute
// per IP" was effectively unenforced in production — on a public endpoint that
// fans out to up to MAX_KEYWORDS paid DataForSEO calls per request.

type AiOverviewRef = {
  domain?: string
  url?: string
  title?: string
  text?: string
  source?: string
}

type AiOverviewRaw = {
  url?: string
  title?: string
  text?: string
  markdown?: string
  items?: unknown[]
  /** The sites Google cites in the AI Overview — where a domain "ranks". */
  references?: AiOverviewRef[]
}

type SerpItemRaw = {
  type?: string
  rank_organic?: number
  rank_absolute?: number
  url?: string
  title?: string
  description?: string
  text?: string
  domain?: string
  xpath?: string
  ai_overview?: AiOverviewRaw | null
  items?: unknown[]
}

const AI_OVERVIEW_TYPES = new Set(['ai_overview', 'ai_overview_block', 'ai_overview_item'])

export async function POST(req: NextRequest) {
  // 1. Identify the caller for quota purposes (hashed, never stored raw)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const visitor = visitorHashFor(ip)

  // 2. Parse + validate
  let body: { domain?: unknown; keywords?: unknown; country?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const domain = normalizeDomain(typeof body.domain === 'string' ? body.domain : '')
  if (!domain) {
    return NextResponse.json(
      { error: 'Enter a valid domain, e.g. searchprex.com' },
      { status: 400 },
    )
  }

  const countryCode = typeof body.country === 'string' ? body.country.toUpperCase() : 'US'
  const country = SERP_COUNTRIES.find((c) => c.code === countryCode) ?? SERP_COUNTRIES[0]

  const rawKeywords = Array.isArray(body.keywords) ? body.keywords : []
  const keywords = rawKeywords
    .filter((k): k is string => typeof k === 'string')
    .map((k) => k.trim().replace(/\s+/g, ' '))
    .filter(Boolean)
  const unique = [...new Set(keywords.map((k) => k.toLowerCase()))].slice(0, MAX_KEYWORDS)

  if (unique.length === 0) {
    return NextResponse.json(
      { error: 'Add at least one keyword to check.' },
      { status: 400 },
    )
  }
  const tooLong = unique.find((k) => k.length > MAX_KEYWORD_LENGTH)
  if (tooLong) {
    return NextResponse.json(
      { error: `Keep keywords under ${MAX_KEYWORD_LENGTH} characters — "${tooLong.slice(0, 40)}…" is too long.` },
      { status: 400 },
    )
  }

  const checkedAt = new Date().toISOString()

  // 3. Check for API Credentials (SERPER_API_KEY as primary, DataForSEO as fallback)
  const serperKey = process.env.SERPER_API_KEY?.trim() || 'd936abf7a3d3f01032c3fd290d079069f2494ac0'
  const login = process.env.DATAFORSEO_LOGIN?.trim()
  const password = process.env.DATAFORSEO_PASSWORD?.trim()

  if (!serperKey && (!login || !password)) {
    return NextResponse.json(
      buildPreview(domain, unique, country.name, checkedAt),
    )
  }

  // 4. Spend the caller's remaining daily quota.
  const spent = await usageToday(visitor)
  const remaining = Math.max(0, DAILY_KEYWORD_QUOTA - spent)

  if (remaining === 0) {
    return NextResponse.json(
      {
        error: `You've used today's ${DAILY_KEYWORD_QUOTA} free checks. They reset at midnight UTC — or get a free founder-reviewed audit instead.`,
      },
      { status: 429 },
    )
  }

  const toFetch = unique.slice(0, remaining)
  const fetched = new Map<string, SerpKeywordResult>()

  const live = await Promise.all(
    toFetch.map((keyword) => {
      if (serperKey) {
        return fetchLiveSerperResult(serperKey, domain, keyword, country.name, country.code)
      }
      return fetchLiveResult(login!, password!, domain, keyword, country.name)
    }),
  )

  let billable = 0
  live.forEach((result, i) => {
    fetched.set(toFetch[i], result)
    if (result.source !== 'preview') billable += 1
  })
  await recordUsage(visitor, billable)

  const results = unique.map(
    (keyword) =>
      fetched.get(keyword) ??
      previewSerpKeyword(domain, keyword, country.name),
  )

  const hasLive = results.some((r) => r.source !== 'preview')
  const overallSource = hasLive
    ? (serperKey ? 'serper' : 'dataforseo')
    : 'preview'

  return NextResponse.json({
    domain,
    location: country.name,
    source: overallSource,
    results,
    checkedAt,
  } satisfies SerpResponse)
}

function buildPreview(
  domain: string,
  keywords: string[],
  location: string,
  checkedAt: string,
): SerpResponse {
  return {
    domain,
    location,
    source: 'preview',
    results: keywords.map((k) => previewSerpKeyword(domain, k, location)),
    checkedAt,
  }
}

async function fetchLiveSerperResult(
  apiKey: string,
  domain: string,
  keyword: string,
  location: string,
  countryCode: string,
): Promise<SerpKeywordResult> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20_000)

  try {
    const gl = countryCode.toLowerCase()
    const res = await fetch('https://google.serper.dev/search', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: keyword,
        gl: gl !== 'global' ? gl : undefined,
        num: 10,
      }),
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!res.ok) throw new Error(`Serper HTTP ${res.status}`)
    const data = await res.json()

    const organicItems: SerpItem[] = []
    const rawOrganic = Array.isArray(data.organic) ? data.organic : []

    for (let i = 0; i < rawOrganic.length; i++) {
      const r = rawOrganic[i]
      if (!r.link) continue
      organicItems.push({
        rank: i + 1,
        url: r.link,
        domain: domainFromUrl(r.link),
        title: r.title ?? '',
        snippet: r.snippet ?? '',
      })
    }

    // If user's domain is not in the first 10, scan pages 2-5 (positions 11-50) concurrently
    let foundResult = organicItems.find((r) => domainMatches(r.domain, domain)) ?? null
    let totalScanned = organicItems.length

    if (!foundResult) {
      try {
        const extraPages = await Promise.all(
          [2, 3, 4, 5].map(async (pageIndex) => {
            const extraRes = await fetch('https://google.serper.dev/search', {
              method: 'POST',
              headers: {
                'X-API-KEY': apiKey,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                q: keyword,
                page: pageIndex,
                gl: gl !== 'global' ? gl : undefined,
              }),
              signal: controller.signal,
              cache: 'no-store',
            })
            if (!extraRes.ok) return []
            const extraData = await extraRes.json()
            return Array.isArray(extraData.organic) ? extraData.organic : []
          })
        )

        let currentRank = organicItems.length + 1
        for (const pageList of extraPages) {
          for (const item of pageList) {
            totalScanned++
            const itemDomain = domainFromUrl(item.link)
            if (!foundResult && domainMatches(itemDomain, domain)) {
              foundResult = {
                rank: currentRank,
                url: item.link,
                domain: itemDomain,
                title: item.title ?? '',
                snippet: item.snippet ?? '',
              }
            }
            currentRank++
          }
        }
      } catch {}
    }

    // Detect SERP features from Serper payload
    const features = detectSerperFeatures(data)

    // AI Overview or Featured Snippet Answer Box
    let aiOverview: { title: string; url: string; domain: string; text: string } | undefined
    if (data.answerBox) {
      const ab = data.answerBox
      const abUrl = ab.link || ''
      const abDomain = abUrl ? domainFromUrl(abUrl) : ''
      aiOverview = {
        title: ab.title || 'Featured Answer',
        url: abUrl,
        domain: abDomain,
        text: (ab.snippet || ab.answer || '').slice(0, 400),
      }
    }

    const isAiOverview = !!aiOverview && domainMatches(aiOverview.domain, domain)
    const position = foundResult?.rank ?? null

    // Competitors: top 10 domains frequency
    const tally = new Map<string, number>()
    for (const r of organicItems.slice(0, 10)) {
      tally.set(r.domain, (tally.get(r.domain) ?? 0) + 1)
    }
    const competitors = [...tally.entries()]
      .map(([d, count]) => ({ domain: d, count }))
      .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain))

    return {
      keyword,
      location,
      source: 'serper',
      position,
      found: position !== null,
      isAiOverview,
      yourDomain: domain,
      yourResult: foundResult,
      features,
      top10: organicItems.slice(0, 10),
      competitors,
      totalResults: Math.max(totalScanned, organicItems.length),
      ...(aiOverview ? { aiOverview } : {}),
    }
  } catch {
    return previewSerpKeyword(domain, keyword, location)
  } finally {
    clearTimeout(timeout)
  }
}

function detectSerperFeatures(data: any): SerpFeature[] {
  const features = new Set<SerpFeature>()
  if (data.answerBox) {
    features.add('featuredSnippet')
  }
  if (data.peopleAlsoAsk && Array.isArray(data.peopleAlsoAsk) && data.peopleAlsoAsk.length > 0) {
    features.add('peopleAlsoAsk')
  }
  if (data.places && Array.isArray(data.places) && data.places.length > 0) {
    features.add('localPack')
  }
  if (data.news || data.topStories) {
    features.add('topStories')
  }
  if (data.knowledgeGraph) {
    features.add('knowledgePanel')
  }
  if (data.videos && Array.isArray(data.videos) && data.videos.length > 0) {
    features.add('video')
  }
  if (data.shopping && Array.isArray(data.shopping) && data.shopping.length > 0) {
    features.add('shopping')
  }
  if (data.images && Array.isArray(data.images) && data.images.length > 0) {
    features.add('image')
  }
  if (data.relatedSearches && Array.isArray(data.relatedSearches) && data.relatedSearches.length > 0) {
    features.add('relatedSearches')
  }
  return [...features]
}

async function fetchLiveResult(
  login: string,
  password: string,
  domain: string,
  keyword: string,
  location: string,
): Promise<SerpKeywordResult> {
  const auth = Buffer.from(`${login}:${password}`).toString('base64')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)

  try {
    const res = await fetch(SERP_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          keyword,
          location_name: location,
          language_code: 'en',
          device: 'desktop',
          // The SERP endpoint pages by `depth` (not `limit`): 100 = top 100.
          depth: 100,
        },
      ]),
      signal: controller.signal,
      cache: 'no-store',
    })

    if (!res.ok) throw new Error(`DataForSEO HTTP ${res.status}`)

    const json = await res.json()
    const task = json?.tasks?.[0]
    if (!task || task.status_code !== 20000) {
      throw new Error(task?.status_message ?? 'DataForSEO task error')
    }

    const items: SerpItemRaw[] = task.result?.[0]?.items ?? []
    if (!Array.isArray(items) || items.length === 0) return fallback()

    return mapSerpItems(items, domain, keyword, location)
  } catch {
    return fallback()
  } finally {
    clearTimeout(timeout)
  }

  function fallback(): SerpKeywordResult {
    return previewSerpKeyword(domain, keyword, location)
  }
}

function mapSerpItems(
  items: SerpItemRaw[],
  domain: string,
  keyword: string,
  location: string,
): SerpKeywordResult {
  const organic: SerpItem[] = []
  let aiOverview: { title: string; url: string; domain: string; text: string } | null = null

  for (const raw of items) {
    const type = raw?.type ?? ''
    const rank = raw?.rank_organic ?? raw?.rank_absolute ?? 0

    // AI Overview: a dedicated block, or an item whose payload carries ai_overview.
    if (AI_OVERVIEW_TYPES.has(type) || (type === 'featured_snippet' && raw?.ai_overview)) {
      const payload: AiOverviewRaw = raw?.ai_overview ?? raw
      const refs = Array.isArray(payload.references) ? payload.references : []

      // Prefer the citation belonging to the user's domain — that's the whole
      // point of the flag. Otherwise keep the first citation as context.
      const mine = refs.find((ref) => {
        const d = ref.domain ?? (ref.url ? domainFromUrl(ref.url) : '')
        return d ? domainMatches(d.replace(/^www\./, '').toLowerCase(), domain) : false
      })
      const chosen = mine ?? refs[0]

      if (chosen?.url || chosen?.title) {
        const url = chosen.url ?? ''
        aiOverview = {
          title: chosen.title ?? chosen.source ?? 'AI Overview',
          url,
          domain: (chosen.domain ?? domainFromUrl(url)).replace(/^www\./, '').toLowerCase(),
          text: (chosen.text ?? payload.text ?? payload.markdown ?? '').slice(0, 400),
        }
      } else if (payload.url && payload.title) {
        // Older/simpler shape: the block itself carries a single source.
        aiOverview = {
          title: payload.title,
          url: payload.url,
          domain: domainFromUrl(payload.url),
          text: (payload.text ?? payload.markdown ?? '').slice(0, 400),
        }
      }
      continue
    }

    if (type !== 'organic' || !raw?.url) continue
    organic.push({
      rank: organic.length + 1,
      url: raw.url,
      domain: domainFromUrl(raw.url),
      title: raw.title ?? '',
      snippet: raw.description ?? '',
    })
  }

  const features = detectFeatures(items)
  const yourResult = organic.find((r) => domainMatches(r.domain, domain)) ?? null
  const position = yourResult?.rank ?? null
  const isAiOverview = !!aiOverview && domainMatches(aiOverview.domain, domain)

  // Competitors: domains in the top 10, most frequent first.
  const tally = new Map<string, number>()
  for (const r of organic.slice(0, 10)) {
    tally.set(r.domain, (tally.get(r.domain) ?? 0) + 1)
  }
  const competitors = [...tally.entries()]
    .map(([d, count]) => ({ domain: d, count }))
    .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain))

  return {
    keyword,
    location,
    source: 'dataforseo',
    position,
    found: position !== null,
    isAiOverview,
    yourDomain: domain,
    yourResult,
    features,
    top10: organic.slice(0, 10),
    competitors,
    totalResults: organic.length,
    ...(aiOverview ? { aiOverview } : {}),
  }
}

function detectFeatures(items: SerpItemRaw[]): SerpFeature[] {
  const features = new Set<SerpFeature>()
  const types = new Set(items.map((i) => i?.type ?? '').filter(Boolean))
  const xpath = items.map((i) => i?.xpath ?? '').join(' ')

  if ([...types].some((t) => AI_OVERVIEW_TYPES.has(t))) {
    features.add('aiOverview')
  }
  if (types.has('featured_snippet') || xpath.includes('snippet')) features.add('featuredSnippet')
  if (types.has('people_also_ask') || xpath.includes('also_ask')) features.add('peopleAlsoAsk')
  if (types.has('local_pack') || types.has('maps')) features.add('localPack')
  if (types.has('top_stories') || xpath.includes('news')) features.add('topStories')
  if (types.has('knowledge_graph') || types.has('knowledge_panel')) features.add('knowledgePanel')
  if (types.has('video') || xpath.includes('video')) features.add('video')
  if (types.has('shopping') || xpath.includes('shopping')) features.add('shopping')
  if (types.has('images') || xpath.includes('image')) features.add('image')
  if (types.has('related_searches')) features.add('relatedSearches')

  return [...features]
}
