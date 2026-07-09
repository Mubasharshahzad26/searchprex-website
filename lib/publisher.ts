import { db } from './db'
import { withRetry } from './db-retry'
import { getCMSAdapter } from './cms-adapters'
import { submitUrl } from './indexing'

export async function publishPage(pageId: string) {
  const page = await withRetry(() =>
    db.autopilotPage.findUnique({
      where: { id: pageId },
      include: { run: { include: { client: { include: { cmsConnections: true } } } } },
    })
  )
  if (!page) throw new Error('Page not found')
  if (page.status !== 'approved') throw new Error(`Page status is '${page.status}', must be 'approved'`)
  if (!page.generatedContent) throw new Error('No generated content stored')
  const cms = page.run.client.cmsConnections[0]
  if (!cms) throw new Error('No CMS connection for client')
  const creds = cms.credentials as any
  const adapter = getCMSAdapter({
    cmsType: cms.cmsType,
    baseUrl: cms.baseUrl,
    username: creds.username,
    appPassword: creds.appPassword,
  })
  try {
    const result = await adapter.publish(page.pageUrl, page.generatedContent)
    await withRetry(() =>
      db.autopilotPage.update({
        where: { id: pageId },
        data: { status: 'published', publishedAt: new Date(), errorMessage: null },
      })
    )
    // 🚀 Auto-submit to Google Indexing API (fail ho to publish phir bhi success)
    let indexing: any = { success: false, message: 'skipped' }
    try {
      indexing = await submitUrl(page.pageUrl, 'new')
    } catch (idxErr) {
      indexing = {
        success: false,
        message: idxErr instanceof Error ? idxErr.message : 'indexing error',
      }
    }
    return {
      pageUrl: page.pageUrl,
      status: 'published',
      postId: result.postId,
      indexing,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Publish failed'
    await withRetry(() =>
      db.autopilotPage.update({
        where: { id: pageId },
        data: { status: 'publish_failed', errorMessage: msg },
      })
    )
    throw new Error(msg)
  }
}

// Scheduled publishing: approved + publishAt due
export async function publishDuePages(limit = 10) {
  const due = await withRetry(() =>
    db.autopilotPage.findMany({
      where: { status: 'approved', publishAt: { not: null, lte: new Date() } },
      orderBy: { publishAt: 'asc' },
      take: limit,
    })
  )
  const results: any[] = []
  for (const page of due) {
    try {
      results.push(await publishPage(page.id))
    } catch (err) {
      results.push({
        pageUrl: page.pageUrl,
        status: 'failed',
        error: err instanceof Error ? err.message : 'Unknown',
      })
    }
  }
  return { due: due.length, results }
}