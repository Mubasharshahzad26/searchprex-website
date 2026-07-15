import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withRetry } from '@/lib/db-retry'
 
export const dynamic = 'force-dynamic'
 
interface DailyPublish {
  date: string
  generated: number
  published: number
}
 
interface RecentRun {
  id: string
  clientName: string
  pages: number
  status: string
  dryRun: boolean
  startedAt: string
}
 
interface ReportsResponse {
  period: '7d' | '30d'
  generated: number
  published: number
  publishRate: number
  urlsIndexed: number
  indexingFailed: number
  backlogQueued: number
  backlogSubmitted: number
  runSuccessRate: number
  totalRuns: number
  dailyBreakdown: DailyPublish[]
  recentRuns: RecentRun[]
  topClients: { clientName: string; pagesPublished: number }[]
}
 
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
 
  const url = new URL(req.url)
  const periodParam = (url.searchParams.get('period') || '7d') as '7d' | '30d'
  const days = periodParam === '30d' ? 30 : 7
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  since.setHours(0, 0, 0, 0)
 
  try {
    // 1. Aggregate counts in parallel for speed
    const [
      pagesGenerated,
      pagesPublished,
      indexingSubmitted,
      indexingFailed,
      backlogQueued,
      backlogSubmitted,
      totalRuns,
      successfulRuns,
    ] = await Promise.all([
      withRetry(() =>
        db.autopilotPage.count({
          where: { createdAt: { gte: since } },
        }),
      ),
      withRetry(() =>
        db.autopilotPage.count({
          where: {
            status: 'published',
            publishedAt: { gte: since },
          },
        }),
      ),
      withRetry(() =>
        db.indexingLog.count({
          where: {
            status: 'submitted',
            submittedAt: { gte: since },
          },
        }),
      ),
      withRetry(() =>
        db.indexingLog.count({
          where: {
            status: 'failed',
            submittedAt: { gte: since },
          },
        }),
      ),
      withRetry(() =>
        db.indexingQueue.count({
          where: { status: 'queued' },
        }),
      ),
      withRetry(() =>
        db.indexingQueue.count({
          where: { status: 'submitted' },
        }),
      ),
      withRetry(() =>
        db.autopilotRun.count({
          where: { startedAt: { gte: since } },
        }),
      ),
      withRetry(() =>
        db.autopilotRun.count({
          where: {
            status: 'success',
            startedAt: { gte: since },
          },
        }),
      ),
    ])
 
    // 2. Daily breakdown — build day-by-day counts
    const dailyBreakdown: DailyPublish[] = []
    for (let i = days - 1; i >= 0; i--) {
      const dayStart = new Date()
      dayStart.setHours(0, 0, 0, 0)
      dayStart.setDate(dayStart.getDate() - i)
 
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayEnd.getDate() + 1)
 
      const [gen, pub] = await Promise.all([
        withRetry(() =>
          db.autopilotPage.count({
            where: {
              createdAt: { gte: dayStart, lt: dayEnd },
            },
          }),
        ),
        withRetry(() =>
          db.autopilotPage.count({
            where: {
              status: 'published',
              publishedAt: { gte: dayStart, lt: dayEnd },
            },
          }),
        ),
      ])
 
      dailyBreakdown.push({
        date: dayStart.toISOString().slice(0, 10),
        generated: gen,
        published: pub,
      })
    }
 
    // 3. Recent runs (last 10)
    const recent = await withRetry(() =>
      db.autopilotRun.findMany({
        take: 10,
        orderBy: { startedAt: 'desc' },
        include: {
          client: { select: { companyName: true } },
        },
      }),
    )
 
    const recentRuns: RecentRun[] = recent.map((r) => ({
      id: r.id,
      clientName: r.client?.companyName || 'Unknown',
      pages: r.pagesGenerated ?? 0,
      status: r.status,
      dryRun: r.dryRun,
      startedAt: r.startedAt.toISOString(),
    }))
 
    // 4. Top clients by published pages (period-scoped)
    const clientBreakdown = await withRetry(() =>
      db.autopilotPage.groupBy({
        by: ['runId'],
        where: {
          status: 'published',
          publishedAt: { gte: since },
        },
        _count: { id: true },
      }),
    )
 
    // Resolve runId → clientName and aggregate
    const runIds = clientBreakdown.map((c) => c.runId)
    const runsWithClients =
      runIds.length > 0
        ? await withRetry(() =>
            db.autopilotRun.findMany({
              where: { id: { in: runIds } },
              select: {
                id: true,
                client: { select: { companyName: true } },
              },
            }),
          )
        : []
 
    const clientPageMap = new Map<string, number>()
    for (const bucket of clientBreakdown) {
      const run = runsWithClients.find((r) => r.id === bucket.runId)
      const name = run?.client?.companyName || 'Unknown'
      clientPageMap.set(name, (clientPageMap.get(name) || 0) + bucket._count.id)
    }
 
    const topClients = Array.from(clientPageMap.entries())
      .map(([clientName, pagesPublished]) => ({ clientName, pagesPublished }))
      .sort((a, b) => b.pagesPublished - a.pagesPublished)
      .slice(0, 5)
 
    const publishRate =
      pagesGenerated > 0 ? Math.round((pagesPublished / pagesGenerated) * 100) / 100 : 0
 
    const runSuccessRate =
      totalRuns > 0 ? Math.round((successfulRuns / totalRuns) * 100) / 100 : 0
 
    const response: ReportsResponse = {
      period: periodParam,
      generated: pagesGenerated,
      published: pagesPublished,
      publishRate,
      urlsIndexed: indexingSubmitted,
      indexingFailed,
      backlogQueued,
      backlogSubmitted,
      runSuccessRate,
      totalRuns,
      dailyBreakdown,
      recentRuns,
      topClients,
    }
 
    return NextResponse.json(response)
  } catch (err) {
    console.error('Reports API error:', err)
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Failed to compute reports',
      },
      { status: 500 },
    )
  }
}
 