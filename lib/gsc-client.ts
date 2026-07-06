import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'

export async function fetchUnderperformingPagesFromGSC(
  siteUrl: string,
  serviceAccountJson: string,
  daysBack = 90,
) {
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJson),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })

  const searchconsole = google.searchconsole('v1')
  const client = await auth.getClient()

  const response = await searchconsole.searchanalytics.query({
    auth: client as any,
    siteUrl,
    requestBody: {
      startDate: new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      dimensions: ['page', 'query'],
      rowLimit: 25000,
      searchType: 'web',
    },
  })

  const rows = response.data.rows || []

  const scoredPages = rows
    .reduce((acc: any[], row: any) => {
      const existing = acc.find((p) => p.url === row.keys[0])
      if (existing) {
        existing.clicks += row.clicks || 0
        existing.impressions += row.impressions || 0
        existing.ctr = existing.clicks / (existing.impressions || 1)
      } else {
        acc.push({
          url: row.keys[0],
          keyword: row.keys[1],
          clicks: row.clicks || 0,
          impressions: row.impressions || 0,
          ctr: (row.clicks || 0) / (row.impressions || 1),
          position: row.position || 0,
        })
      }
      return acc
    }, [])
    .filter((p) => p.impressions >= 100 && p.clicks < 10 && p.ctr < 0.1)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 500)

  return scoredPages.map((p) => ({
    ...p,
    automationScore:
      p.impressions > 500 && p.position > 8
        ? 'high'
        : p.impressions > 200
          ? 'medium'
          : 'low',
  }))
}

export async function testGSCConnection(siteUrl: string, serviceAccountJson: string) {
  try {
    const pages = await fetchUnderperformingPagesFromGSC(siteUrl, serviceAccountJson, 30)
    return { status: 'connected', pageCount: pages.length }
  } catch (err) {
    return {
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

// ─── SITE-WIDE KPIs FOR CLIENT REPORTS ───────────────────────────
// Current period vs previous period comparison (clicks, impressions, CTR, position)

export interface PeriodKPIs {
  clicks: number
  impressions: number
  ctr: number
  position: number
  topPages: { url: string; clicks: number; impressions: number }[]
  topQueries: { query: string; clicks: number; impressions: number }[]
}

async function queryPeriod(
  siteUrl: string,
  serviceAccountJson: string,
  startDate: string,
  endDate: string,
): Promise<PeriodKPIs> {
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJson),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const searchconsole = google.searchconsole('v1')
  const client = await auth.getClient()

  const totals = await searchconsole.searchanalytics.query({
    auth: client as any,
    siteUrl,
    requestBody: { startDate, endDate, searchType: 'web' },
  })
  const t: any = totals.data.rows?.[0] || {}

  const pagesRes = await searchconsole.searchanalytics.query({
    auth: client as any,
    siteUrl,
    requestBody: {
      startDate, endDate, dimensions: ['page'], rowLimit: 5, searchType: 'web',
    },
  })

  const queriesRes = await searchconsole.searchanalytics.query({
    auth: client as any,
    siteUrl,
    requestBody: {
      startDate, endDate, dimensions: ['query'], rowLimit: 10, searchType: 'web',
    },
  })

  return {
    clicks: t.clicks || 0,
    impressions: t.impressions || 0,
    ctr: t.ctr || 0,
    position: t.position || 0,
    topPages: (pagesRes.data.rows || []).map((r: any) => ({
      url: r.keys[0], clicks: r.clicks || 0, impressions: r.impressions || 0,
    })),
    topQueries: (queriesRes.data.rows || [])
      .filter((r: any) => r.keys[0] && !r.keys[0].includes('site:') && r.keys[0].length < 80)
      .slice(0, 5)
      .map((r: any) => ({
        query: r.keys[0], clicks: r.clicks || 0, impressions: r.impressions || 0,
      })),
  }
}

export async function fetchSiteKPIs(
  siteUrl: string,
  serviceAccountJson: string,
  periodDays: number, // 7 for weekly, 30 for monthly
) {
  // GSC data lags ~3 days — end the window 3 days ago
  const day = 24 * 60 * 60 * 1000
  const fmt = (d: Date) => d.toISOString().split('T')[0]
  const end = new Date(Date.now() - 3 * day)
  const start = new Date(end.getTime() - (periodDays - 1) * day)
  const prevEnd = new Date(start.getTime() - day)
  const prevStart = new Date(prevEnd.getTime() - (periodDays - 1) * day)

  const [current, previous] = await Promise.all([
    queryPeriod(siteUrl, serviceAccountJson, fmt(start), fmt(end)),
    queryPeriod(siteUrl, serviceAccountJson, fmt(prevStart), fmt(prevEnd)),
  ])

  return {
    current,
    previous,
    dateRange: { start: fmt(start), end: fmt(end) },
    prevDateRange: { start: fmt(prevStart), end: fmt(prevEnd) },
  }
}