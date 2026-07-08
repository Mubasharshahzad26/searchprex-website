import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { submitUrl } from '@/lib/indexing'

export const maxDuration = 300

const SAFETY_BUFFER = 10 // naye published pages ke liye reserve
const PER_CLIENT_MAX = 150 // ek run mein per client cap (Vercel 300s limit)

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Total remaining quota (all active accounts)
  const accounts = await db.indexingAccount.findMany({ where: { active: true } })
  const remaining = accounts.reduce(
    (sum, a) => sum + Math.max(0, a.dailyQuota - a.usedToday),
    0,
  )
  let budget = Math.max(0, remaining - SAFETY_BUFFER)

  if (budget === 0) {
    return NextResponse.json({ message: 'No quota remaining today', results: [] })
  }

  // Active clients dhoondo
  const clients = await db.client.findMany({
    where: { autopilotConfig: { enabled: true } },
    select: { id: true, companyName: true },
  })

  const clientResults: any[] = []

  for (const client of clients) {
    if (budget === 0) break

    // Per-client budget = min(budget, PER_CLIENT_MAX)
    const clientBudget = Math.min(budget, PER_CLIENT_MAX)

    const queued = await db.indexingQueue.count({
      where: { clientId: client.id, status: 'queued' },
    })
    if (queued === 0) {
      clientResults.push({ client: client.companyName, submitted: 0, message: 'queue empty' })
      continue
    }

    const batch = await db.indexingQueue.findMany({
      where: { clientId: client.id, status: 'queued' },
      orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
      take: clientBudget,
    })

    let submitted = 0
    let failed = 0
    for (const item of batch) {
      try {
        const result = await submitUrl(item.url, 'backlog')
        await db.indexingQueue.update({
          where: { id: item.id },
          data: {
            status: result.success ? 'submitted' : 'failed',
            submittedAt: new Date(),
          },
        })
        if (result.success) {
          submitted++
          budget-- // global budget consumed
        } else {
          failed++
          if (result.message?.includes('quota')) break
        }
      } catch {
        break
      }
    }

    const stillQueued = await db.indexingQueue.count({
      where: { clientId: client.id, status: 'queued' },
    })
    clientResults.push({
      client: client.companyName,
      submitted,
      failed,
      remaining: stillQueued,
    })
  }

  return NextResponse.json({ results: clientResults, budgetLeft: budget })
}