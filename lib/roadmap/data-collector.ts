import { db } from '../db'
import { withRetry } from '../db-retry'

export async function collectRoadmapData(auditRunId: string, clientId?: string) {
  const auditRun = await withRetry(() =>
    db.auditRun.findUnique({ where: { id: auditRunId } })
  )
  if (!auditRun) throw new Error('Audit run not found')

  const pages = await withRetry(() =>
    db.auditPage.findMany({
      where: { runId: auditRunId },
      select: { url: true, issues: true, wordCount: true, hasSchema: true, statusCode: true },
    })
  )

  const issueCounts: Record<string, number> = {}
  for (const p of pages) {
    for (const iss of (p.issues as string[]) || []) {
      issueCounts[iss] = (issueCounts[iss] || 0) + 1
    }
  }
  const sampledPages = pages.length || 1
  const pct = (n: number) => Math.round((n / sampledPages) * 100)

  const insights = await withRetry(() =>
    db.auditInsight.findMany({ where: { runId: auditRunId } })
  )
  const insightCounts = {
    content_needs_improvement: insights.filter((i) => i.category === 'content_needs_improvement').length,
    indexed_underperformer: insights.filter((i) => i.category === 'indexed_underperformer').length,
    not_indexed: insights.filter((i) => i.category === 'not_indexed').length,
    total: insights.length,
  }

  let backlogCounts = { queued: 0, submitted: 0, total: 0 }
  let indexingAccounts = 0
  if (clientId) {
    const [queued, submitted, accounts] = await withRetry(() =>
      Promise.all([
        db.indexingQueue.count({ where: { clientId, status: 'queued' } }),
        db.indexingQueue.count({ where: { clientId, status: 'submitted' } }),
        db.indexingAccount.count({ where: { active: true } }),
      ])
    )
    backlogCounts = { queued, submitted, total: queued + submitted }
    indexingAccounts = accounts
  }

  const scaleFactor = auditRun.totalPages > 0 ? auditRun.totalPages / sampledPages : 1
  const projectedSiteIssues = {
    schema_missing: Math.round((issueCounts.schema_missing || 0) * scaleFactor),
    meta_issues: Math.round(
      ((issueCounts.meta_missing || 0) + (issueCounts.meta_too_short || 0) + (issueCounts.meta_too_long || 0)) * scaleFactor,
    ),
    title_issues: Math.round(
      ((issueCounts.title_too_short || 0) + (issueCounts.title_too_long || 0) + (issueCounts.title_missing || 0)) * scaleFactor,
    ),
    thin_content: Math.round((issueCounts.thin_content || 0) * scaleFactor),
    h1_issues: Math.round(((issueCounts.h1_missing || 0) + (issueCounts.h1_multiple || 0)) * scaleFactor),
  }

  return {
    siteUrl: auditRun.siteUrl,
    totalSitemapPages: auditRun.totalPages,
    sampledPages,
    scaleFactor: Math.round(scaleFactor * 10) / 10,
    sampleIssues: issueCounts,
    sampleIssuesPct: Object.fromEntries(
      Object.entries(issueCounts).map(([k, v]) => [k, `${pct(v)}%`]),
    ),
    projectedSiteIssues,
    insightCounts,
    backlogCounts,
    indexingCapacity: `${indexingAccounts * 200}/day (${indexingAccounts} accounts)`,
  }
}