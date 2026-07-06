import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
import { db } from './db'

// Account picker: active + quota bacha ho, sab se kam used pehle (auto load-balance)
async function pickAccount() {
  const now = new Date()
  const accounts = await db.indexingAccount.findMany({ where: { active: true } })
  if (accounts.length === 0) throw new Error('No indexing accounts configured')

  for (const acc of accounts) {
    // UTC din badla to quota reset
    const lastReset = new Date(acc.lastResetAt)
    if (
      lastReset.getUTCDate() !== now.getUTCDate() ||
      lastReset.getUTCMonth() !== now.getUTCMonth()
    ) {
      await db.indexingAccount.update({
        where: { id: acc.id },
        data: { usedToday: 0, lastResetAt: now },
      })
      acc.usedToday = 0
    }
  }

  const available = accounts
    .filter((a) => a.usedToday < a.dailyQuota)
    .sort((a, b) => a.usedToday - b.usedToday)

  if (available.length === 0) throw new Error('All indexing accounts hit daily quota')
  return available[0]
}

export async function submitUrl(
  url: string,
  type: 'new' | 'backlog' = 'new',
): Promise<{ success: boolean; account: string; message?: string }> {
  const account = await pickAccount()

  try {
    const auth = new GoogleAuth({
      credentials: JSON.parse(account.credentialsJson),
      scopes: ['https://www.googleapis.com/auth/indexing'],
    })
    const client = await auth.getClient()
    const indexing = google.indexing({ version: 'v3', auth: client as any })

    const res = await indexing.urlNotifications.publish({
      requestBody: { url, type: 'URL_UPDATED' },
    })

    await db.indexingAccount.update({
      where: { id: account.id },
      data: { usedToday: { increment: 1 } },
    })
    await db.indexingLog.create({
      data: {
        accountId: account.id,
        url,
        type,
        status: 'submitted',
        response: JSON.stringify(res.data).slice(0, 500),
      },
    })
    return { success: true, account: account.label }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown indexing error'
    await db.indexingLog.create({
      data: {
        accountId: account.id,
        url,
        type,
        status: 'failed',
        response: msg.slice(0, 500),
      },
    })
    return { success: false, account: account.label, message: msg }
  }
}

export async function submitBatch(urls: string[], type: 'new' | 'backlog' = 'backlog') {
  const results: any[] = []
  for (const url of urls) {
    try {
      results.push({ url, ...(await submitUrl(url, type)) })
    } catch (err) {
      // Quota khatam ya accounts nahe — ruk jao, baqi kal
      results.push({
        url,
        success: false,
        message: err instanceof Error ? err.message : 'stopped',
      })
      break
    }
  }
  return { attempted: results.length, results }
}

export async function getIndexingStats() {
  const accounts = await db.indexingAccount.findMany({
    where: { active: true },
    select: { label: true, usedToday: true, dailyQuota: true },
  })
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const todayLogs = await db.indexingLog.count({
    where: { submittedAt: { gte: today } },
  })
  const recentLogs = await db.indexingLog.findMany({
    orderBy: { submittedAt: 'desc' },
    take: 20,
    include: { account: { select: { label: true } } },
  })
  return { accounts, submittedToday: todayLogs, recent: recentLogs }
}