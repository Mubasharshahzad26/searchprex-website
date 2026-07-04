import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const runs = await db.autopilotRun.findMany({
      orderBy: { startedAt: 'desc' },
      take: 50,
    })
    return NextResponse.json({ runs })
  } catch (err) {
    return NextResponse.json({ runs: [], error: 'Database not connected' })
  }
}