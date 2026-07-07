import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const runId = req.nextUrl.searchParams.get('runId')
  if (!runId) return NextResponse.json({ error: 'runId required' }, { status: 400 })

  const insights = await db.auditInsight.findMany({
    where: { runId },
    orderBy: [{ category: 'asc' }, { priority: 'asc' }],
  })

  const grouped = {
    content_needs_improvement: insights.filter((i) => i.category === 'content_needs_improvement'),
    indexed_underperformer: insights.filter((i) => i.category === 'indexed_underperformer'),
    not_indexed: insights.filter((i) => i.category === 'not_indexed'),
  }

  return NextResponse.json({
    runId,
    counts: {
      content_needs_improvement: grouped.content_needs_improvement.length,
      indexed_underperformer: grouped.indexed_underperformer.length,
      not_indexed: grouped.not_indexed.length,
      total: insights.length,
    },
    lists: grouped,
  })
}