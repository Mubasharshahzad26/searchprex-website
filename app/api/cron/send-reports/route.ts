import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateReport } from '@/lib/report-generator'
import { Resend } from 'resend'

export const maxDuration = 300

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const utcHour = now.getUTCHours()
  const utcWeekday = now.getUTCDay() === 0 ? 7 : now.getUTCDay()
  const utcMonthDay = now.getUTCDate()

  const configs = await db.reportConfig.findMany({ where: { enabled: true } })
  const results: any[] = []

  for (const config of configs) {
    const dayMatch =
      config.frequency === 'monthly'
        ? config.sendDay === utcMonthDay
        : config.sendDay === utcWeekday
    const hourMatch = config.sendHourUTC === utcHour
    const recentlySent =
      config.lastSentAt &&
      now.getTime() - config.lastSentAt.getTime() < 20 * 60 * 60 * 1000

    if (!dayMatch || !hourMatch || recentlySent) continue

    try {
      const report = await generateReport(config.clientId)
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error } = await resend.emails.send({
        from: 'SearchPrex Reports <onboarding@resend.dev>',
        to: [config.recipientEmail],
        cc: config.ccEmails ? config.ccEmails.split(',').map((e) => e.trim()) : undefined,
        subject: report.subject,
        html: report.html,
      })
      if (error) throw new Error(error.message)

      await db.reportConfig.update({
        where: { id: config.id },
        data: { lastSentAt: now },
      })
      results.push({ clientId: config.clientId, status: 'sent', to: config.recipientEmail })
    } catch (err) {
      results.push({
        clientId: config.clientId,
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown',
      })
    }
  }

  return NextResponse.json({ checked: configs.length, sent: results })
}