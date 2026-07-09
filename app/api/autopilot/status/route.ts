import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withRetry } from '@/lib/db-retry'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    // Optional client filter (?clientId=xxx)
    const { searchParams } = new URL(req.url)
    const clientIdFilter = searchParams.get('clientId')

    // Runs fetch — with client info
    const runs = await withRetry(() =>
      db.autopilotRun.findMany({
        where: clientIdFilter ? { clientId: clientIdFilter } : {},
        orderBy: { startedAt: 'desc' },
        take: 50,
        include: {
          client: {
            select: { id: true, companyName: true, domain: true },
          },
        },
      })
    )

    // Sab clients ki list bhi de (dropdown ke liye)
    const clients = await withRetry(() =>
      db.client.findMany({
        select: { id: true, companyName: true, domain: true },
        orderBy: { companyName: 'asc' },
      })
    )

    return NextResponse.json({ runs, clients })
  } catch (err) {
    console.error('Status API error:', err)
    return NextResponse.json({
      runs: [],
      clients: [],
      error: err instanceof Error ? err.message : 'Database not connected',
    })
  }
}