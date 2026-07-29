import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd';
const REPORT_TOKEN = process.env.CLIENT_REPORT_TOKEN;

export async function GET(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get('authorization');
  const providedToken = authHeader?.replace('Bearer ', '').trim();

  if (!REPORT_TOKEN || providedToken !== REPORT_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 1. Executive Summary stats
    const [
      totalPublished,
      totalSubmitted,
      priority0Queued,
      priority0Cleared,
      last24hStats,
    ] = await Promise.all([
      // Total published lifetime
      db.autopilotPage.count({
        where: {
          status: 'published',
          runId: { in: await getMsoRunIds() },
        },
      }),
      // Total submitted to Google
      db.indexingQueue.count({
        where: {
          clientId: MSO_CLIENT_ID,
          status: 'submitted',
        },
      }),
      // Priority 0 remaining
      db.indexingQueue.count({
        where: {
          clientId: MSO_CLIENT_ID,
          priority: 0,
          status: 'queued',
        },
      }),
      // Priority 0 already processed
      db.indexingQueue.count({
        where: {
          clientId: MSO_CLIENT_ID,
          priority: 0,
          status: { in: ['submitted', 'published_not_submitted'] },
        },
      }),
      // Last 24h aggregate
      db.autopilotPage.groupBy({
        by: ['status'],
        where: {
          createdAt: {
            gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
          pageUrl: { contains: '/product/' },
        },
        _count: true,
      }),
    ]);

    const published24h = last24hStats.find(s => s.status === 'published')?._count ?? 0;
    const errors24h = last24hStats.find(s => s.status === 'error')?._count ?? 0;
    const total24h = published24h + errors24h;
    const successRate = total24h > 0 ? ((published24h / total24h) * 100).toFixed(1) : '0';

    // Estimated cost so far
    const costLifetime = (totalPublished * 0.0035).toFixed(2);

    // Projected days to 10K goal
    const remaining = 10000 - totalPublished;
    const daysToGoal = published24h > 0 ? Math.ceil(remaining / published24h) : 'N/A';

    // 2. Recent 100 published URLs
    const recentPublished = await db.autopilotPage.findMany({
      where: {
        status: 'published',
        runId: { in: await getMsoRunIds() },
      },
      orderBy: { publishedAt: 'desc' },
      take: 100,
      select: {
        pageUrl: true,
        publishedAt: true,
        generatedContent: true,
      },
    });

    const recentUrls = recentPublished.map(p => {
      const content = p.generatedContent as any;
      return {
        liveUrl: content?.liveUrl ?? p.pageUrl,
        publishedAt: p.publishedAt?.toISOString() ?? '',
        qualityScore: content?.quality?.score ?? 0,
        indexingStatus: content?.indexingSubmission?.success ? 'Submitted' : 'Failed',
        account: content?.indexingSubmission?.account ?? 'N/A',
      };
    });

    // 3. Daily summary last 30 days
    const dailyStatsRaw = await db.$queryRaw<Array<{
      date: string;
      total: bigint;
      published: bigint;
      errors: bigint;
    }>>`
      SELECT
        DATE("createdAt") AS date,
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'published') AS published,
        COUNT(*) FILTER (WHERE status = 'error') AS errors
      FROM "AutopilotPage"
      WHERE "createdAt" > NOW() - INTERVAL '30 days'
        AND "pageUrl" LIKE '%/product/%'
      GROUP BY DATE("createdAt")
      ORDER BY DATE("createdAt") DESC
    `;

    const dailyStats = dailyStatsRaw.map(r => ({
      date: r.date,
      attempted: Number(r.total),
      published: Number(r.published),
      errors: Number(r.errors),
      cost: (Number(r.published) * 0.0035).toFixed(3),
    }));

    return NextResponse.json({
      generatedAt: new Date().toISOString(),
      summary: {
        totalPublished,
        totalSubmitted,
        successRate24h: `${successRate}%`,
        priority0Remaining: priority0Queued,
        priority0Cleared,
        priority0Total: priority0Queued + priority0Cleared,
        costLifetime: `$${costLifetime}`,
        daysToGoal: `${daysToGoal} days`,
      },
      recentUrls,
      dailyStats,
    });
  } catch (err) {
    console.error('[mso-summary] Error:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// Helper — get all AutopilotRun IDs for MSO client
async function getMsoRunIds(): Promise<string[]> {
  const runs = await db.autopilotRun.findMany({
    where: { clientId: MSO_CLIENT_ID },
    select: { id: true },
  });
  return runs.map(r => r.id);
}