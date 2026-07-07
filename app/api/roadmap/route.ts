import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateRoadmap } from '@/lib/roadmap/generator'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

// POST → generate  { auditRunId, clientId?, industry? }
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    if (!body.auditRunId) {
      return NextResponse.json({ error: 'auditRunId required' }, { status: 400 })
    }
    const result = await generateRoadmap({
      auditRunId: body.auditRunId,
      clientId: body.clientId,
      industry: body.industry,
    })
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 },
    )
  }
}

// GET → fetch plan  ?id=xxx  OR  ?auditRunId=xxx (latest)  OR  no params (list)
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const id = req.nextUrl.searchParams.get('id')
  const auditRunId = req.nextUrl.searchParams.get('auditRunId')

  if (id) {
    const plan = await db.roadmapPlan.findUnique({ where: { id } })
    if (!plan) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(plan)
  }
  if (auditRunId) {
    const plan = await db.roadmapPlan.findFirst({
      where: { auditRunId, status: 'success' },
      orderBy: { generatedAt: 'desc' },
    })
    if (!plan) return NextResponse.json({ error: 'No plan found' }, { status: 404 })
    return NextResponse.json(plan)
  }
  const plans = await db.roadmapPlan.findMany({
    orderBy: { generatedAt: 'desc' },
    take: 20,
  })
  return NextResponse.json({ plans })
}