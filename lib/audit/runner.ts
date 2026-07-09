import { db } from '../db'
import { withRetry } from '../db-retry'
import { fetchSitemapUrls, crawlBatch, CrawlResult } from './crawler'
import { categorizeAuditRun } from './categorize'

const SAMPLE_SIZE = 500

// Priority: brand/category/blog pages pehle, phir products
function pickSample(urls: string[], size: number): string[] {
  const priority: string[] = []
  const rest: string[] = []
  for (const u of urls) {
    if (
      u.includes('/manufacturer/') ||
      u.includes('/category/') ||
      u.includes('/blog/') ||
      u.match(/\.com\/?$/) // homepage
    ) {
      priority.push(u)
    } else {
      rest.push(u)
    }
  }
  const shuffledRest = rest.sort(() => Math.random() - 0.5)
  return [...priority, ...shuffledRest].slice(0, size)
}

export async function runAudit(params: {
  siteUrl: string
  sitemapUrl: string
  clientId?: string
  sampleSize?: number
}) {
  const { siteUrl, sitemapUrl, clientId, sampleSize = SAMPLE_SIZE } = params

  const run = await withRetry(() =>
    db.auditRun.create({
      data: { siteUrl, sitemapUrl, clientId, status: 'running' },
    })
  )

  try {
    // 1. Sitemap fetch
    const allUrls = await fetchSitemapUrls(sitemapUrl)
    if (allUrls.length === 0) throw new Error('No URLs in sitemap')

    // 2. Sample select
    const sample = pickSample(allUrls, sampleSize)
    await withRetry(() =>
      db.auditRun.update({
        where: { id: run.id },
        data: { totalPages: allUrls.length, sampledPages: sample.length },
      })
    )

    // 3. Crawl
    const siteHost = new URL(siteUrl).host
    const results = await crawlBatch(sample, siteHost, 5, 500)

    // 4. DB mein save (bulk chunks)
    const pagesData = results.map((r: CrawlResult) => ({
      runId: run.id,
      url: r.url,
      statusCode: r.statusCode,
      title: r.title,
      titleLength: r.titleLength,
      metaDescription: r.metaDescription,
      metaLength: r.metaLength,
      h1Count: r.h1Count,
      h1Text: r.h1Text,
      wordCount: r.wordCount,
      internalLinksCount: r.internalLinksCount,
      externalLinksCount: r.externalLinksCount,
      imageCount: r.imageCount,
      imagesMissingAlt: r.imagesMissingAlt,
      canonical: r.canonical,
      hasSchema: r.hasSchema,
      issues: r.issues,
    }))
    const chunkSize = 100
    for (let i = 0; i < pagesData.length; i += chunkSize) {
      await withRetry(() =>
        db.auditPage.createMany({
          data: pagesData.slice(i, i + chunkSize),
          skipDuplicates: true,
        })
      )
    }

    // 5. GSC cross-reference + 3 lists categorization (crawl + save ke BAAD)
    let insightCounts = {
      content_needs_improvement: 0,
      indexed_underperformer: 0,
      not_indexed: 0,
      total: 0,
    }
    if (clientId) {
      try {
        const gsc = await withRetry(() =>
          db.gSCConnection.findFirst({ where: { clientId } })
        )
        if (gsc) {
          insightCounts = await categorizeAuditRun(run.id, {
            siteUrl: gsc.siteUrl,
            serviceAccountJson: gsc.serviceAccountJson,
          })
        }
      } catch (err) {
        console.error('Categorization failed:', err)
      }
    }

    // 6. Complete
    await withRetry(() =>
      db.auditRun.update({
        where: { id: run.id },
        data: { status: 'success', completedAt: new Date() },
      })
    )

    return {
      runId: run.id,
      totalPages: allUrls.length,
      sampledPages: sample.length,
      crawled: results.length,
      issues: {
        thin_content: results.filter((r) => r.issues.includes('thin_content')).length,
        title_issues: results.filter((r) => r.issues.some((i) => i.startsWith('title_'))).length,
        meta_issues: results.filter((r) => r.issues.some((i) => i.startsWith('meta_'))).length,
        h1_issues: results.filter((r) => r.issues.some((i) => i.startsWith('h1_'))).length,
        no_schema: results.filter((r) => r.issues.includes('schema_missing')).length,
        no_canonical: results.filter((r) => r.issues.includes('canonical_missing')).length,
        fetch_errors: results.filter((r) => r.issues.includes('fetch_error')).length,
      },
      insights: insightCounts,
    }
  } catch (err) {
    await withRetry(() =>
      db.auditRun.update({
        where: { id: run.id },
        data: {
          status: 'error',
          errorMessage: err instanceof Error ? err.message : 'Unknown',
          completedAt: new Date(),
        },
      })
    )
    throw err
  }
}