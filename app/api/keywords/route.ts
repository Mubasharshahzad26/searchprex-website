import { NextResponse } from 'next/server'
import { getKeywords } from '@/lib/keyword-service'

// Never run external-API routes on the edge runtime.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let payload: { keyword?: string; country?: string }
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const seed = payload.keyword?.trim()
  if (!seed) {
    return NextResponse.json(
      { error: 'A seed keyword is required.' },
      { status: 400 },
    )
  }

  try {
    const data = await getKeywords(seed, payload.country ?? 'US')
    return NextResponse.json(data)
  } catch (err) {
    console.log('[v0] /api/keywords error:', String(err))
    return NextResponse.json(
      { error: 'Failed to fetch keyword data. Please try again.' },
      { status: 500 },
    )
  }
}
