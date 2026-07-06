import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

export interface KeywordInsight {
  query: string
  clicks: number
  impressions: number
  ctr: number
  position: number
  category: 'striking_distance' | 'ctr_gap' | 'emerging' | 'other'
  intent: 'informational' | 'commercial' | 'transactional'
}

export interface KeywordPack {
  primary: KeywordInsight | null
  secondary: KeywordInsight[]
  summary: string
}

// Simple rule-based intent classifier — fast, free, no extra API call
function classifyIntent(query: string): KeywordInsight['intent'] {
  const q = query.toLowerCase()
  if (/\b(buy|price|cheap|deal|discount|for sale|shop|order|near me)\b/.test(q))
    return 'transactional'
  if (/\b(best|top|review|vs|compare|comparison|under \$?\d+|alternative)\b/.test(q))
    return 'commercial'
  if (/\b(how|what|why|when|guide|tutorial|tips|meaning|difference)\b/.test(q))
    return 'informational'
  return 'commercial' // e-commerce default: product/brand queries are usually commercial
}

function categorize(row: {
  position: number
  impressions: number
  ctr: number
}): KeywordInsight['category'] {
  if (row.position >= 5 && row.position <= 20 && row.impressions >= 50)
    return 'striking_distance'
  if (row.position < 10 && row.ctr < 0.02 && row.impressions >= 50) return 'ctr_gap'
  if (row.position > 20 && row.position <= 50 && row.impressions >= 20) return 'emerging'
  return 'other'
}

// Fetch ALL queries for one specific page from GSC (not just top 1)
export async function getKeywordPackForPage(
  siteUrl: string,
  serviceAccountJson: string,
  pageUrl: string,
  daysBack = 90,
): Promise<KeywordPack> {
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJson),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const searchconsole = google.searchconsole('v1')
  const client = await auth.getClient()

  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const response = await searchconsole.searchanalytics.query({
    auth: client as any,
    siteUrl,
    requestBody: {
      startDate: fmt(new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)),
      endDate: fmt(new Date()),
      dimensions: ['query'],
      dimensionFilterGroups: [
        {
          filters: [{ dimension: 'page', operator: 'equals', expression: pageUrl }],
        },
      ],
      rowLimit: 100,
      searchType: 'web',
    },
  })

  const rows = (response.data.rows || [])
    .map((r: any) => ({
      query: r.keys[0] as string,
      clicks: r.clicks || 0,
      impressions: r.impressions || 0,
      ctr: r.ctr || 0,
      position: r.position || 0,
    }))
    // junk filter — same rules as engine
    .filter(
      (r) =>
        r.query &&
        !r.query.includes('site:') &&
        r.query.length < 80 &&
        r.impressions >= 10,
    )

  const insights: KeywordInsight[] = rows.map((r) => ({
    ...r,
    category: categorize(r),
    intent: classifyIntent(r.query),
  }))

  // Priority: striking distance (highest impressions) > ctr gap > emerging > rest
  const rank = { striking_distance: 0, ctr_gap: 1, emerging: 2, other: 3 }
  insights.sort(
    (a, b) => rank[a.category] - rank[b.category] || b.impressions - a.impressions,
  )

  const primary = insights[0] || null
  const secondary = insights.slice(1, 6)

  const summary = primary
    ? `PRIMARY: "${primary.query}" (pos ${primary.position.toFixed(1)}, ${primary.impressions} impressions, ${primary.category}, ${primary.intent} intent). SECONDARY: ${secondary.map((s) => `"${s.query}" (pos ${s.position.toFixed(1)}, ${s.intent})`).join('; ') || 'none'}.`
    : 'No significant query data for this page.'

  return { primary, secondary, summary }
}