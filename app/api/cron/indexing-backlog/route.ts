import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { submitUrl } from '@/lib/indexing'

export const maxDuration = 300

const SAFETY_BUFFER = 10 // naye published pages ke liye quota bacha ke rakho

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Aaj kitna quota bacha hai (sab active accounts ka total)
  const accounts = await db.indexingAccount.findMany({ where: { active: true } })
  const remaining = accounts.reduce(
    (sum, a) => sum + Math.max(0, a.dailyQuota - a.usedToday),
    0,
  )
  const budget = Math.max(0, remaining - SAFETY_BUFFER)
  // Vercel 300s limit — ~150 submissions per run safe hai
  const batchSize = Math.min(budget, 150)

  if (batchSize === 0) {
    return NextResponse.json({ message: 'No quota remaining today', submitted: 0 })
  }

  // Priority order: 1 pehle, phir 2 — queue se utha lo
  const batch = await db.indexingQueue.findMany({
    where: { status: 'queued' },
    orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
    take: batchSize,
  })

  if (batch.length === 0) {
    return NextResponse.json({ message: 'Backlog queue empty 🎉', submitted: 0 })
  }

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
      result.success ? submitted++ : failed++
      if (!result.success && result.message?.includes('quota')) break
    } catch {
      break // quota khatam ya accounts nahe — kal continue
    }
  }

  const stillQueued = await db.indexingQueue.count({ where: { status: 'queued' } })
  return NextResponse.json({ submitted, failed, remaining: stillQueued })
}