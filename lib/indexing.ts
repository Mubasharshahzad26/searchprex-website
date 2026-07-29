import { google } from 'googleapis'
import { GoogleAuth } from 'google-auth-library'
import { db } from './db'
import { withRetry } from './db-retry'


function extractHostname(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

// Maps site hostname to the label prefix used in IndexingAccount rows.
// Allows multiple indexing accounts (rotator) per site, decoupled from GSC service account email.
function hostToLabelPrefix(hostname: string): string {
  const map: Record<string, string> = {
    'michigansportsoutdoor.com': 'Michigan Indexing',
    'smkstore.com': 'SMK Indexing',
    '4klivehdiptv.com': '4KLive Indexing',
  }
  return map[hostname] ?? ''
}

async function resetQuotasIfNeeded(accounts: any[]) {
  const now = new Date()
  for (const acc of accounts) {
    const lastReset = new Date(acc.lastResetAt)
    if (
      lastReset.getUTCDate() !== now.getUTCDate() ||
      lastReset.getUTCMonth() !== now.getUTCMonth()
    ) {
      await withRetry(() =>
        db.indexingAccount.update({
          where: { id: acc.id },
          data: { usedToday: 0, lastResetAt: now },
        })
      )
      acc.usedToday = 0
    }
  }
}

async function pickAccountForUrl(url: string) {
  const hostname = extractHostname(url)
  if (!hostname) throw new Error(`Invalid URL: ${url}`)

  const wwwHost = 'www.' + hostname
  const gsc = await withRetry(() =>
    db.gSCConnection.findFirst({
      where: {
        OR: [
          { siteUrl: { contains: hostname } },
          { siteUrl: { contains: wwwHost } },
        ],
      },
    })
  )
  if (!gsc) {
    throw new Error(`No GSC connection for hostname: ${hostname}`)
  }

  // NEW: pick accounts by label prefix (site-scoped), not by GSC service email.
  // This supports the pattern where 1 GSC service account reads data,
  // but multiple separate service accounts (e.g. 5 per site) submit URLs to Indexing API.
  const labelPrefix = hostToLabelPrefix(hostname)
  if (!labelPrefix) {
    throw new Error(`No indexing account label mapping for hostname: ${hostname}`)
  }

  const accounts = await withRetry(() =>
    db.indexingAccount.findMany({
      where: {
        active: true,
        label: { startsWith: labelPrefix },
      },
    })
  )
  if (accounts.length === 0) {
    throw new Error(`No active indexing accounts with label prefix "${labelPrefix}"`)
  }

  await resetQuotasIfNeeded(accounts)

  const available = accounts
    .filter((a) => a.usedToday < a.dailyQuota)
    .sort((a, b) => a.usedToday - b.usedToday)
  if (available.length === 0) {
    throw new Error(`Quota exhausted for all "${labelPrefix}" accounts`)
  }
  return available[0]
}

export async function submitUrl(
  url: string,
  type: 'new' | 'backlog' = 'new',
): Promise<{ success: boolean; account: string; message?: string }> {
  let account
  try {
    account = await pickAccountForUrl(url)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'account resolution failed'
    return { success: false, account: 'none', message: msg }
  }

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
    await withRetry(() =>
      db.indexingAccount.update({
        where: { id: account.id },
        data: { usedToday: { increment: 1 } },
      })
    )
    await withRetry(() =>
      db.indexingLog.create({
        data: {
          accountId: account.id,
          url,
          type,
          status: 'submitted',
          response: JSON.stringify(res.data).slice(0, 500),
        },
      })
    )
    return { success: true, account: account.label }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown indexing error'
    await withRetry(() =>
      db.indexingLog.create({
        data: {
          accountId: account.id,
          url,
          type,
          status: 'failed',
          response: msg.slice(0, 500),
        },
      })
    )
    return { success: false, account: account.label, message: msg }
  }
}

export async function submitBatch(urls: string[], type: 'new' | 'backlog' = 'backlog') {
  const results: any[] = []
  for (const url of urls) {
    try {
      results.push({ url, ...(await submitUrl(url, type)) })
    } catch (err) {
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
  const accounts = await withRetry(() =>
    db.indexingAccount.findMany({
      where: { active: true },
      select: { label: true, usedToday: true, dailyQuota: true },
    })
  )
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  const todayLogs = await withRetry(() =>
    db.indexingLog.count({
      where: { submittedAt: { gte: today } },
    })
  )
  const recentLogs = await withRetry(() =>
    db.indexingLog.findMany({
      orderBy: { submittedAt: 'desc' },
      take: 20,
      include: { account: { select: { label: true } } },
    })
  )

  const queued = await withRetry(() =>
    db.indexingQueue.count({ where: { status: 'queued' } })
  )
  const submitted = await withRetry(() =>
    db.indexingQueue.count({ where: { status: 'submitted' } })
  )

  return {
    accounts,
    submittedToday: todayLogs,
    recent: recentLogs,
    queue: { queued, submitted },
  }
}