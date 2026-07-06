import { NextRequest, NextResponse } from 'next/server'
import { publishPage, publishDuePages } from '@/lib/publisher'

export const maxDuration = 300

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    // { pageId } = single publish now | { mode: "due" } = sab due pages
    if (body.pageId) {
      const result = await publishPage(body.pageId)
      return NextResponse.json({ success: true, ...result })
    }
    if (body.mode === 'due') {
      const result = await publishDuePages()
      return NextResponse.json({ success: true, ...result })
    }
    return NextResponse.json({ error: 'pageId or mode:"due" required' }, { status: 400 })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Publish failed' },
      { status: 500 },
    )
  }
}