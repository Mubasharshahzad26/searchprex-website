import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
import { fetchSitemapUrls } from './audit/crawler'

// Page-level metrics from GSC Search Analytics
export interface PageMetric {
  url: string
  impressions: number
  clicks: number
  position: number
  ctr: number
}

// GSC Search Analytics se URLs with full metrics (impressions, clicks, position, ctr)
export async function fetchGSCPageMetrics(
  siteUrl: string,
  serviceAccountJson: string,
  daysBack = 90,
): Promise<PageMetric[]> {
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJson),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: (await auth.getClient()) as any,
  })

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  const metrics: PageMetric[] = []
  let startRow = 0
  const rowLimit = 25000

  // Pagination — 25K per query, multiple pages
  while (true) {
    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: fmt(startDate),
        endDate: fmt(endDate),
        dimensions: ['page'],
        rowLimit,
        startRow,
      },
    })

    const rows = res.data.rows || []
    for (const row of rows) {
      const page = row.keys?.[0]
      if (page) {
        metrics.push({
          url: page,
          impressions: row.impressions || 0,
          clicks: row.clicks || 0,
          position: row.position || 0,
          ctr: row.ctr || 0,
        })
      }
    }

    console.log(`[fetcher] Fetched ${metrics.length} URLs so far...`)

    if (rows.length < rowLimit) break // aakhri page tha
    startRow += rowLimit
    if (startRow > 100000) break // safety cap
  }

  return metrics
}

// GSC Search Analytics se saare URLs (backward compat — sirf URL set return)
async function fetchGSCVisibleUrls(
  siteUrl: string,
  serviceAccountJson: string,
  daysBack = 90,
): Promise<Set<string>> {
  const metrics = await fetchGSCPageMetrics(siteUrl, serviceAccountJson, daysBack)
  return new Set(metrics.map(m => m.url))
}

// URL Inspection API se ek URL ka indexing status
export async function inspectUrl(
  siteUrl: string,
  urlToInspect: string,
  serviceAccountJson: string,
): Promise<{
  coverageState: string
  verdict: string
  lastCrawlTime?: string
  isNotIndexed: boolean
}> {
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJson),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const searchconsole = google.searchconsole({
    version: 'v1',
    auth: (await auth.getClient()) as any,
  })

  const res = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl: urlToInspect,
      siteUrl,
    },
  })

  const result = res.data.inspectionResult
  const indexStatus = result?.indexStatusResult
  const coverageState = indexStatus?.coverageState || 'UNKNOWN'
  const verdict = indexStatus?.verdict || 'UNKNOWN'
  const isNotIndexed = coverageState.toLowerCase().includes('not indexed') || 
                       coverageState.toLowerCase().includes('crawled - currently not indexed')

  return {
    coverageState,
    verdict,
    lastCrawlTime: indexStatus?.lastCrawlTime || undefined,
    isNotIndexed,
  }
}

// APPROACH A: Sitemap - GSC diff = suspected not-indexed candidates
export async function fetchNotIndexedCandidates(
  siteUrl: string,
  sitemapUrl: string,
  serviceAccountJson: string,
): Promise<{
  sitemapTotal: number
  gscVisible: number
  candidates: string[]
}> {
  console.log('[fetcher] Fetching sitemap URLs...')
  const sitemapUrls = await fetchSitemapUrls(sitemapUrl)
  console.log(`[fetcher] Sitemap: ${sitemapUrls.length} URLs`)

  console.log('[fetcher] Fetching GSC visible URLs (90-day)...')
  const gscVisible = await fetchGSCVisibleUrls(siteUrl, serviceAccountJson, 90)
  console.log(`[fetcher] GSC visible: ${gscVisible.size} URLs`)

  // Sitemap URLs jo GSC mein nahe hain = suspected not-indexed
  const candidates: string[] = []
  for (const url of sitemapUrls) {
    if (!gscVisible.has(url)) {
      candidates.push(url)
    }
  }

  return {
    sitemapTotal: sitemapUrls.length,
    gscVisible: gscVisible.size,
    candidates,
  }
}