import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const configs = await db.autopilotConfig.findMany({
      where: { enabled: true },
    })

    const results = []
    const base = process.env.NEXT_PUBLIC_API_BASE || 'https://www.searchprex.com'

    for (const config of configs) {
      const res = await fetch(`${base}/api/autopilot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: config.clientId }),
      })
      results.push({ clientId: config.clientId, status: res.status })
    }

    return NextResponse.json({ triggered: results.length, results })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Error' },
      { status: 500 },
    )
  }
}