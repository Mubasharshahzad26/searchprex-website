import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { submitUrl } from '@/lib/indexing'
import { getMsoQuota } from '@/lib/autopilot/mso-daily-limit'

export const maxDuration = 300

//  Reserve ke liye ek sabit 10 kaafi nahi tha. Indexing quota 2,000/din hai
//  aur autopilot roz 1,000 naye page publish karta hai — agar backlog subah
//  chal kar 1,990 kha jaye to din bhar ke naye pages Google ko submit hi nahi
//  honge. Backlog purana kaam hai, naya page aaj ka waada; is liye reserve ab
//  us din ke bache hue publish target ke barabar hai.
const MIN_SAFETY_BUFFER = 10
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
  //  Aaj ke bache hue publish target ke barabar quota alag rakho.
  const quota = await getMsoQuota()
  const reserve = Math.max(MIN_SAFETY_BUFFER, quota.remainingToday)
  let budget = Math.max(0, remaining - reserve)

  if (budget === 0) {
    return NextResponse.json({
      message: "No spare quota — what is left is reserved for today's new pages",
      remaining,
      reserved: reserve,
      results: [],
    })
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