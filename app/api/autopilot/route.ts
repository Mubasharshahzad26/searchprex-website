import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { SEOAutopilot } from '@/lib/seo-autopilot'

export const dynamic = 'force-dynamic'
export const maxDuration = 120

export async function POST(req: Request) {
  try {
    const { clientId, dryRun } = await req.json()

    if (!clientId) {
      return NextResponse.json({ error: 'Missing clientId' }, { status: 400 })
    }

    const config = await db.autopilotConfig.findUnique({ where: { clientId } })
    if (!config) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 })
    }

    const gsc = await db.gSCConnection.findFirst({ where: { clientId } })
    const cms = await db.cMSConnection.findFirst({ where: { clientId } })

    if (!gsc || !cms) {
      return NextResponse.json({ error: 'Missing GSC or CMS connection' }, { status: 400 })
    }

    const run = await db.autopilotRun.create({
      data: {
        clientId,
        configId: config.id,
        status: 'running',
        pagesTargeted: config.maxPagesPerRun,
        dryRun: dryRun ?? config.dryRunMode,
      },
    })

    const autopilot = new SEOAutopilot(
      {
        clientId,
        siteUrl: gsc.siteUrl,
        serviceAccountJson: gsc.serviceAccountJson,
        cmsConfig: { cmsType: cms.cmsType, baseUrl: cms.baseUrl, ...(cms.credentials as any) },
        maxPagesPerRun: config.maxPagesPerRun,
        contentTier: config.contentTier,
        dryRun: dryRun ?? config.dryRunMode,
      },
      `${process.env.NEXT_PUBLIC_API_BASE || 'https://www.searchprex.com'}/api/generate-suite`,
    )

    const result = await autopilot.run()

    await db.autopilotRun.update({
      where: { id: run.id },
      data: {
        status: result.status,
        pagesGenerated: result.pagesGenerated,
        pagesPublished: result.pagesPublished,
        completedAt: new Date(),
        results: result as any,
      },
    })

    return NextResponse.json({ runId: run.id, ...result })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error' },
      { status: 500 },
    )
  }
}
