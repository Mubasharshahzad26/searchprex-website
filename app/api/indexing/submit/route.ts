import { NextRequest, NextResponse } from 'next/server'
import { submitUrl, submitBatch, getIndexingStats } from '@/lib/indexing'

export const maxDuration = 300

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json(await getIndexingStats())
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    if (body.url) {
      return NextResponse.json(await submitUrl(body.url, body.type || 'new'))
    }
    if (Array.isArray(body.urls)) {
      return NextResponse.json(await submitBatch(body.urls, body.type || 'backlog'))
    }
    return NextResponse.json({ error: 'url or urls[] required' }, { status: 400 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 },
    )
  }
}