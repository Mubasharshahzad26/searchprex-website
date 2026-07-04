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