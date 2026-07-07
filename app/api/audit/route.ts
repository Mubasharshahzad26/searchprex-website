import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { runAudit } from '@/lib/audit/runner'

export const maxDuration = 300
export const dynamic = 'force-dynamic'

// POST → start audit  { siteUrl, sitemapUrl, clientId?, sampleSize? }
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    if (!body.siteUrl || !body.sitemapUrl) {
      return NextResponse.json(
        { error: 'siteUrl and sitemapUrl required' },
        { status: 400 },
      )
    }
    const result = await runAudit({
      siteUrl: body.siteUrl,
      sitemapUrl: body.sitemapUrl,
      clientId: body.clientId,
      sampleSize: body.sampleSize,
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Audit failed' },
      { status: 500 },
    )
  }
}

// GET → run details  ?runId=xxx  (ya latest for a siteUrl)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const runId = req.nextUrl.searchParams.get('runId')
  const siteUrl = req.nextUrl.searchParams.get('siteUrl')

  if (!runId && !siteUrl) {
    // list all runs
    const runs = await db.auditRun.findMany({
      orderBy: { startedAt: 'desc' },
      take: 20,
    })
    return NextResponse.json({ runs })
  }

  const run = runId
    ? await db.auditRun.findUnique({ where: { id: runId } })
    : await db.auditRun.findFirst({
        where: { siteUrl: siteUrl! },
        orderBy: { startedAt: 'desc' },
      })

  if (!run) return NextResponse.json({ error: 'Run not found' }, { status: 404 })

  // Aggregate issue counts
  const pages = await db.auditPage.findMany({
    where: { runId: run.id },
    select: { issues: true },
  })
  const issueCounts: Record<string, number> = {}
  for (const p of pages) {
    for (const iss of (p.issues as string[]) || []) {
      issueCounts[iss] = (issueCounts[iss] || 0) + 1
    }
  }

  return NextResponse.json({ run, issueCounts })
}