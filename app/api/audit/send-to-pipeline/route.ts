import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const SMK_CLIENT_ID = 'cmr6ly1kd0000l4ur3379olx1'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { runId, category, actionType } = await req.json()
    if (!runId || !category || !actionType) {
      return NextResponse.json({ error: 'runId, category, actionType required' }, { status: 400 })
    }

    // Jo insights us category ke hain aur abhi tak process nahe hue
    const insights = await db.auditInsight.findMany({
      where: { runId, category, actionTaken: null },
    })

    if (insights.length === 0) {
      return NextResponse.json({ processed: 0, message: 'Nothing to process' })
    }

    let processed = 0

    if (actionType === 'backlog') {
      // Not-indexed → IndexingQueue mein daalo (agar pehle se nahe hai)
      for (const insight of insights) {
        try {
          await db.indexingQueue.upsert({
            where: { url: insight.pageUrl },
            update: {},
            create: {
              url: insight.pageUrl,
              clientId: SMK_CLIENT_ID,
              priority: insight.priority === 1 ? 1 : 2,
              status: 'queued',
            },
          })
          await db.auditInsight.update({
            where: { id: insight.id },
            data: { actionTaken: 'sent_to_backlog' },
          })
          processed++
        } catch (err) {
          console.error('Backlog insert failed for', insight.pageUrl, err)
        }
      }
    } else if (actionType === 'content') {
      // Content pipeline → IndexingQueue mein priority 1 se daalo taake dual pipeline uthaye
      // (Yehi mechanism dual pipeline ne setup kiya hai — backlog queue se content generation)
      for (const insight of insights) {
        try {
          await db.indexingQueue.upsert({
            where: { url: insight.pageUrl },
            update: { priority: 1 }, // priority barha do — pehle uthega
            create: {
              url: insight.pageUrl,
              clientId: SMK_CLIENT_ID,
              priority: 1,
              status: 'queued',
            },
          })
          await db.auditInsight.update({
            where: { id: insight.id },
            data: { actionTaken: 'sent_to_content' },
          })
          processed++
        } catch (err) {
          console.error('Content pipeline queue failed for', insight.pageUrl, err)
        }
      }
    } else {
      return NextResponse.json({ error: 'Unknown actionType' }, { status: 400 })
    }

    return NextResponse.json({ processed, category, actionType })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 },
    )
  }
}