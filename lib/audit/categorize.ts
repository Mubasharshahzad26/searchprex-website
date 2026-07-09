import { db } from '../db'
import { withRetry } from '../db-retry'
import { fetchGSCDataForUrls, fetchQueueStatusForUrls } from './gsc-cross-reference'

export async function categorizeAuditRun(runId: string, opts: {
  siteUrl: string
  serviceAccountJson: string
}) {
  // 1. Sab audit pages nikaalo
  const pages = await withRetry(() =>
    db.auditPage.findMany({
      where: { runId },
      select: { url: true, issues: true, wordCount: true, hasSchema: true, titleLength: true, metaLength: true, h1Count: true },
    })
  )
  const urls = pages.map((p) => p.url)

  // 2. GSC + Backlog queue enrichment
  const [gscData, inQueue] = await Promise.all([
    fetchGSCDataForUrls(opts.siteUrl, opts.serviceAccountJson, urls),
    fetchQueueStatusForUrls(urls),
  ])

  // 3. Purane insights delete karo (idempotent)
  await withRetry(() =>
    db.auditInsight.deleteMany({ where: { runId } })
  )

  const insights: any[] = []

  for (const p of pages) {
    const issues = (p.issues as string[]) || []
    const gsc = gscData.get(p.url)
    const isInBacklog = inQueue.has(p.url)

    // Categorization rules (priority order — pehla match jeetega)
    let category: string | null = null
    let priority = 2
    let reason = ''

    // A. NOT INDEXED — GSC mein zero impressions ya backlog queue mein
    if (!gsc || gsc.impressions === 0 || isInBacklog) {
      category = 'not_indexed'
      priority = isInBacklog ? 1 : 2
      reason = isInBacklog
        ? 'In indexing backlog queue (crawled-not-indexed)'
        : 'No GSC impressions in 90 days'
    }
    // B. INDEXED UNDERPERFORMER — GSC data hai, position > 10, decent impressions
    else if (gsc.position > 10 && gsc.impressions >= 50) {
      category = 'indexed_underperformer'
      priority = gsc.impressions >= 200 ? 1 : 2
      reason = `Position ${gsc.position.toFixed(1)}, ${gsc.impressions} impressions, ${gsc.clicks} clicks`
    }
    // C. CONTENT NEEDS IMPROVEMENT — thin ya major on-page issues
    else if (
      issues.includes('thin_content') ||
      issues.includes('h1_missing') ||
      issues.includes('h1_multiple') ||
      issues.includes('title_missing') ||
      issues.includes('meta_missing') ||
      (p.wordCount ?? 999) < 500
    ) {
      category = 'content_needs_improvement'
      priority = issues.includes('thin_content') ? 1 : 2
      reason = `On-page issues: ${issues.slice(0, 3).join(', ')}`
    }

    if (category) {
      insights.push({
        runId,
        pageUrl: p.url,
        category,
        priority,
        reason,
      })
    }
  }

  // Bulk insert
  if (insights.length > 0) {
    await withRetry(() =>
      db.auditInsight.createMany({ data: insights })
    )
  }

  // Counts return
  const counts = {
    content_needs_improvement: insights.filter((i) => i.category === 'content_needs_improvement').length,
    indexed_underperformer: insights.filter((i) => i.category === 'indexed_underperformer').length,
    not_indexed: insights.filter((i) => i.category === 'not_indexed').length,
    total: insights.length,
  }

  return counts
}