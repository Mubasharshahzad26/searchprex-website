import { NextRequest, NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { withRetry } from '@/lib/db-retry'

export const dynamic = 'force-dynamic'

const PERIOD_DAYS = { '7d': 7, '30d': 30, '90d': 90 } as const
type Period = keyof typeof PERIOD_DAYS

const DAY_MS = 24 * 60 * 60 * 1000

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

/** Everything measured over a window, so current and previous stay in step. */
interface WindowMetrics {
  generated: number
  published: number
  publishRate: number
  urlsIndexed: number
  indexingFailed: number
  runSuccessRate: number
  totalRuns: number
  cost: number
}

interface ReportsResponse extends WindowMetrics {
  period: Period
  clientId: string | null
  clientName: string | null
  generatedAt: string
  dateRange: { start: string; end: string }
  prevDateRange: { start: string; end: string }
  /** Same metrics for the window immediately before this one — powers real deltas. */
  previous: WindowMetrics
  /**
   * IndexingLog has no client relation, so indexed/failed counts are always
   * account-wide. The UI labels them as such when a client filter is active.
   */
  indexingScope: 'global' | 'client'
  backlogQueued: number
  backlogSubmitted: number
  dailyBreakdown: DailyPublish[]
  recentRuns: RecentRun[]
  topClients: { clientName: string; pagesPublished: number }[]
}

function startOfUtcDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
}

const isoDay = (d: Date) => d.toISOString().slice(0, 10)
const rate = (part: number, whole: number) =>
  whole > 0 ? Math.round((part / whole) * 100) / 100 : 0

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  // Without a configured secret every caller would authenticate against the
  // literal string "Bearer undefined", so a missing secret locks the route.
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const requested = url.searchParams.get('period') || '7d'
  if (!(requested in PERIOD_DAYS)) {
    return NextResponse.json(
      { error: `Unknown period "${requested}". Use 7d, 30d or 90d.` },
      { status: 400 },
    )
  }
  const period = requested as Period
  const days = PERIOD_DAYS[period]
  const clientId = url.searchParams.get('clientId') || null

  // Whole UTC days, so the totals and the daily chart cover the same span.
  const todayStart = startOfUtcDay(new Date())
  const currentStart = new Date(todayStart.getTime() - (days - 1) * DAY_MS)
  const currentEnd = new Date(todayStart.getTime() + DAY_MS) // exclusive
  const prevStart = new Date(currentStart.getTime() - days * DAY_MS)
  const prevEnd = currentStart // exclusive

  // AutopilotPage has no clientId of its own — it hangs off the run.
  const pageClientFilter = clientId ? { run: { clientId } } : {}
  const runClientFilter = clientId ? { clientId } : {}

  async function collect(start: Date, end: Date): Promise<WindowMetrics> {
    const [
      generated,
      published,
      urlsIndexed,
      indexingFailed,
      totalRuns,
      successfulRuns,
      costAgg,
    ] = await Promise.all([
      withRetry(() =>
        db.autopilotPage.count({
          where: { createdAt: { gte: start, lt: end }, ...pageClientFilter },
        }),
      ),
      withRetry(() =>
        db.autopilotPage.count({
          where: {
            status: 'published',
            publishedAt: { gte: start, lt: end },
            ...pageClientFilter,
          },
        }),
      ),
      withRetry(() =>
        db.indexingLog.count({
          where: { status: 'submitted', submittedAt: { gte: start, lt: end } },
        }),
      ),
      withRetry(() =>
        db.indexingLog.count({
          where: { status: 'failed', submittedAt: { gte: start, lt: end } },
        }),
      ),
      withRetry(() =>
        db.autopilotRun.count({
          where: { startedAt: { gte: start, lt: end }, ...runClientFilter },
        }),
      ),
      withRetry(() =>
        db.autopilotRun.count({
          where: {
            status: 'success',
            startedAt: { gte: start, lt: end },
            ...runClientFilter,
          },
        }),
      ),
      withRetry(() =>
        db.costLog.aggregate({
          _sum: { totalCost: true },
          where: { createdAt: { gte: start, lt: end }, ...runClientFilter },
        }),
      ),
    ])

    return {
      generated,
      published,
      publishRate: rate(published, generated),
      urlsIndexed,
      indexingFailed,
      totalRuns,
      runSuccessRate: rate(successfulRuns, totalRuns),
      cost: Math.round((costAgg._sum.totalCost ?? 0) * 100) / 100,
    }
  }

  try {
    // Scoping the daily chart by client needs the run join; with no filter the
    // join is skipped so the query stays a plain scan of AutopilotPage.
    const clientJoin = clientId
      ? Prisma.sql`JOIN "AutopilotRun" r ON r.id = p."runId" AND r."clientId" = ${clientId}`
      : Prisma.empty

    const [
      current,
      previous,
      generatedByDay,
      publishedByDay,
      backlogQueued,
      backlogSubmitted,
      recent,
      client,
    ] = await Promise.all([
      collect(currentStart, currentEnd),
      collect(prevStart, prevEnd),
      // One grouped query per series, replacing two counts per day in a loop.
      withRetry(() =>
        db.$queryRaw<Array<{ day: string; n: number }>>`
          SELECT to_char(p."createdAt", 'YYYY-MM-DD') AS day, COUNT(*)::int AS n
          FROM "AutopilotPage" p
          ${clientJoin}
          WHERE p."createdAt" >= ${currentStart} AND p."createdAt" < ${currentEnd}
          GROUP BY 1
        `,
      ),
      withRetry(() =>
        db.$queryRaw<Array<{ day: string; n: number }>>`
          SELECT to_char(p."publishedAt", 'YYYY-MM-DD') AS day, COUNT(*)::int AS n
          FROM "AutopilotPage" p
          ${clientJoin}
          WHERE p.status = 'published'
            AND p."publishedAt" >= ${currentStart} AND p."publishedAt" < ${currentEnd}
          GROUP BY 1
        `,
      ),
      // Backlog is a point-in-time queue depth, not a windowed count.
      withRetry(() =>
        db.indexingQueue.count({
          where: { status: 'queued', ...(clientId ? { clientId } : {}) },
        }),
      ),
      withRetry(() =>
        db.indexingQueue.count({
          where: { status: 'submitted', ...(clientId ? { clientId } : {}) },
        }),
      ),
      withRetry(() =>
        db.autopilotRun.findMany({
          take: 10,
          orderBy: { startedAt: 'desc' },
          where: { startedAt: { gte: currentStart, lt: currentEnd }, ...runClientFilter },
          include: { client: { select: { companyName: true } } },
        }),
      ),
      clientId
        ? withRetry(() =>
            db.client.findUnique({
              where: { id: clientId },
              select: { companyName: true },
            }),
          )
        : Promise.resolve(null),
    ])

    const genMap = new Map(generatedByDay.map((r) => [r.day, Number(r.n)]))
    const pubMap = new Map(publishedByDay.map((r) => [r.day, Number(r.n)]))

    const dailyBreakdown: DailyPublish[] = []
    for (let i = 0; i < days; i++) {
      const date = isoDay(new Date(currentStart.getTime() + i * DAY_MS))
      dailyBreakdown.push({
        date,
        generated: genMap.get(date) ?? 0,
        published: pubMap.get(date) ?? 0,
      })
    }

    const recentRuns: RecentRun[] = recent.map((r) => ({
      id: r.id,
      clientName: r.client?.companyName || 'Unknown',
      pages: r.pagesGenerated ?? 0,
      status: r.status,
      dryRun: r.dryRun,
      startedAt: r.startedAt.toISOString(),
    }))

    // Top clients by pages published inside the window.
    const clientBreakdown = await withRetry(() =>
      db.autopilotPage.groupBy({
        by: ['runId'],
        where: {
          status: 'published',
          publishedAt: { gte: currentStart, lt: currentEnd },
          ...pageClientFilter,
        },
        _count: { id: true },
      }),
    )

    const runIds = clientBreakdown.map((c) => c.runId)
    const runsWithClients =
      runIds.length > 0
        ? await withRetry(() =>
            db.autopilotRun.findMany({
              where: { id: { in: runIds } },
              select: { id: true, client: { select: { companyName: true } } },
            }),
          )
        : []

    const runToClient = new Map(
      runsWithClients.map((r) => [r.id, r.client?.companyName || 'Unknown']),
    )
    const clientPageMap = new Map<string, number>()
    for (const bucket of clientBreakdown) {
      const name = runToClient.get(bucket.runId) || 'Unknown'
      clientPageMap.set(name, (clientPageMap.get(name) || 0) + bucket._count.id)
    }

    const topClients = Array.from(clientPageMap.entries())
      .map(([clientName, pagesPublished]) => ({ clientName, pagesPublished }))
      .sort((a, b) => b.pagesPublished - a.pagesPublished)
      .slice(0, 5)

    const response: ReportsResponse = {
      ...current,
      period,
      clientId,
      clientName: client?.companyName ?? null,
      generatedAt: new Date().toISOString(),
      dateRange: { start: isoDay(currentStart), end: isoDay(todayStart) },
      prevDateRange: {
        start: isoDay(prevStart),
        end: isoDay(new Date(prevEnd.getTime() - DAY_MS)),
      },
      previous,
      indexingScope: 'global',
      backlogQueued,
      backlogSubmitted,
      dailyBreakdown,
      recentRuns,
      topClients,
    }

    return NextResponse.json(response)
  } catch (err) {
    console.error('Reports API error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to compute reports' },
      { status: 500 },
    )
  }
}
