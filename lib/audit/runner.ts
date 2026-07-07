import { db } from '../db'
import { fetchSitemapUrls, crawlBatch, CrawlResult } from './crawler'

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
  // Priority pehle, phir products se random sample
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

  // 1. Run record banao
  const run = await db.auditRun.create({
    data: { siteUrl, sitemapUrl, clientId, status: 'running' },
  })

  try {
    // 2. Sitemap fetch
    const allUrls = await fetchSitemapUrls(sitemapUrl)
    if (allUrls.length === 0) throw new Error('No URLs in sitemap')

    // 3. Sample select (priority + random)
    const sample = pickSample(allUrls, sampleSize)
    await db.auditRun.update({
      where: { id: run.id },
      data: { totalPages: allUrls.length, sampledPages: sample.length },
    })

    // 4. Crawl
    const siteHost = new URL(siteUrl).host
    const results = await crawlBatch(sample, siteHost, 5, 500)

    // 5. DB mein save (bulk)
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
    // createMany chunks (Neon connection limit ke liye safe)
    const chunkSize = 100
    for (let i = 0; i < pagesData.length; i += chunkSize) {
      await db.auditPage.createMany({
        data: pagesData.slice(i, i + chunkSize),
        skipDuplicates: true,
      })
    }

    // 6. Complete
    await db.auditRun.update({
      where: { id: run.id },
      data: { status: 'success', completedAt: new Date() },
    })

    return {
      runId: run.id,
      totalPages: allUrls.length,
      sampledPages: sample.length,
      crawled: results.length,
      issues: {
        thin_content: results.filter((r) => r.issues.includes('thin_content')).length,
        title_issues: results.filter((r) =>
          r.issues.some((i) => i.startsWith('title_')),
        ).length,
        meta_issues: results.filter((r) => r.issues.some((i) => i.startsWith('meta_'))).length,
        h1_issues: results.filter((r) => r.issues.some((i) => i.startsWith('h1_'))).length,
        no_schema: results.filter((r) => r.issues.includes('schema_missing')).length,
        no_canonical: results.filter((r) => r.issues.includes('canonical_missing')).length,
        fetch_errors: results.filter((r) => r.issues.includes('fetch_error')).length,
      },
    }
  } catch (err) {
    await db.auditRun.update({
      where: { id: run.id },
      data: {
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'Unknown',
        completedAt: new Date(),
      },
    })
    throw err
  }
}