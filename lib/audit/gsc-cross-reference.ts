import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
import { db } from '../db'

interface GSCPageData {
  clicks: number
  impressions: number
  ctr: number
  position: number
}

// Ek run ke saare pages ki GSC data ek call mein fetch karo (efficient)
export async function fetchGSCDataForUrls(
  siteUrl: string,
  serviceAccountJson: string,
  urls: string[],
  daysBack = 90,
): Promise<Map<string, GSCPageData>> {
  const auth = new GoogleAuth({
    credentials: JSON.parse(serviceAccountJson),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
  const searchconsole = google.searchconsole({ version: 'v1', auth: (await auth.getClient()) as any })

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - daysBack)
  const fmt = (d: Date) => d.toISOString().split('T')[0]

  // GSC page-level aggregate — sab pages ka data ek query
  const res = await searchconsole.searchanalytics.query({
    siteUrl,
    requestBody: {
      startDate: fmt(startDate),
      endDate: fmt(endDate),
      dimensions: ['page'],
      rowLimit: 25000,
    },
  })

  const map = new Map<string, GSCPageData>()
  const urlSet = new Set(urls)
  for (const row of res.data.rows || []) {
    const page = row.keys?.[0]
    if (!page || !urlSet.has(page)) continue
    map.set(page, {
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    })
  }
  return map
}

// Ek run ke pages ke liye "in-backlog-queue" status batao
export async function fetchQueueStatusForUrls(urls: string[]): Promise<Set<string>> {
  const items = await db.indexingQueue.findMany({
    where: { url: { in: urls } },
    select: { url: true },
  })
  return new Set(items.map((i) => i.url))
}