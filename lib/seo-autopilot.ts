import { fetchUnderperformingPagesFromGSC } from './gsc-client'
import { getCMSAdapter } from './cms-adapters'
import { db } from './db'
import { getKeywordPackForPage } from './keyword-intelligence'

export interface AutopilotConfigInput {
  clientId: string
  siteUrl: string
  serviceAccountJson: string
  cmsConfig: any
  maxPagesPerRun: number
  contentTier: string
  dryRun: boolean
  backlogPagesPerRun?: number
}

export class SEOAutopilot {
  private config: AutopilotConfigInput
  private generationEndpoint: string

  constructor(config: AutopilotConfigInput, generationEndpoint: string) {
    this.config = config
    this.generationEndpoint = generationEndpoint
  }

  // Generation call with 1 retry (transient Gemini/parse failures ke liye)
  private async generateWithRetry(body: string, retries = 1): Promise<any> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      const genRes = await fetch(this.generationEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if (genRes.ok) return genRes.json()
      if (attempt < retries) {
        // 3 second ruk kar dubara try
        await new Promise((r) => setTimeout(r, 3000))
        continue
      }
      throw new Error(`Generation failed: ${genRes.status}`)
    }
  }

  // Approval workflow: har page AutopilotPage table mein save
  private async savePage(
    runId: string,
    page: any,
    status: string,
    content: any = null,
    errorMessage: string | null = null,
  ) {
    try {
      await db.autopilotPage.upsert({
        where: { runId_pageUrl: { runId, pageUrl: page.url } },
        update: {
          status,
          generatedContent: content ?? undefined,
          gscImpressions: page.impressions ?? 0,
          gscClicks: page.clicks ?? 0,
          gscPosition: page.position ?? null,
          errorMessage,
        },
        create: {
          runId,
          pageUrl: page.url,
          gscImpressions: page.impressions ?? 0,
          gscClicks: page.clicks ?? 0,
          gscPosition: page.position ?? null,
          status,
          generatedContent: content ?? undefined,
          errorMessage,
        },
      })
    } catch (dbErr) {
      // DB save fail ho to run crash na ho — sirf log
      console.error('AutopilotPage save failed:', page.url, dbErr)
    }
  }

  async run(runId?: string) {
    const results = {
      status: 'success' as string,
      pagesFound: 0,
      pagesGenerated: 0,
      pagesPublished: 0,
      dryRun: this.config.dryRun,
      pages: [] as any[],
      errors: [] as string[],
    }

    try {
      const pages = await fetchUnderperformingPagesFromGSC(
        this.config.siteUrl,
        this.config.serviceAccountJson,
      )
      results.pagesFound = pages.length

      // FILTER: junk/scraper GSC queries skip
      const cleanPages = pages.filter(
        (p: any) =>
          p.keyword &&
          !p.keyword.includes('-site:') &&
          !p.keyword.includes('site:') &&
          p.keyword.length < 80,
      )

      // Duplicate guard: jo pages pehle se pending/approved hain unhe dubara na uthao
      const existingPages = await db.autopilotPage.findMany({
        where: { status: { in: ['pending', 'approved'] } },
        select: { pageUrl: true },
      })
      const existingUrls = new Set(existingPages.map((p) => p.pageUrl))
      const freshPages = cleanPages.filter((p: any) => !existingUrls.has(p.url))

      const targets: any[] = freshPages.slice(0, this.config.maxPagesPerRun)

      // ── PIPELINE 2: Backlog content (crawled-not-indexed) ──
      const backlogBudget = this.config.backlogPagesPerRun ?? 0
      if (backlogBudget > 0) {
        const backlogItems = await db.indexingQueue.findMany({
          where: {
            status: { in: ['queued', 'submitted'] },
            url: { notIn: [...existingUrls] },
          },
          orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
          take: backlogBudget,
        })
        for (const b of backlogItems) {
          targets.push({
            url: b.url,
            keyword: '',
            impressions: 0,
            clicks: 0,
            position: 0,
            _source: 'backlog',
            _queueId: b.id,
          } as any)
        }
      }

      for (const page of targets) {
        try {
          // Keyword Intelligence: is page ki saari GSC queries + categorization
          let keywordPack = null
          try {
            keywordPack = await getKeywordPackForPage(
              this.config.siteUrl,
              this.config.serviceAccountJson,
              page.url,
            )
          } catch (kwErr) {
            console.error('Keyword pack failed for', page.url, kwErr)
          }

          const body = JSON.stringify({
            item: page.url,
            contentType: 'Product/Category Page',
            depth: '1000-1500 words (Standard)',
            fieldNotes: keywordPack?.primary
              ? `KEYWORD INTELLIGENCE (GSC 90-day real data): ${keywordPack.summary} Use the PRIMARY keyword as your focusKeyword (fix typos only). Weave SECONDARY keywords naturally into H2/H3 headings and body. Match content angle to the PRIMARY keyword's intent type. GSC page stats: ${page.impressions} impressions, ${page.clicks} clicks — underperforming; optimize for CTR and rankings.`
              : page._source === 'backlog'
                ? `INDEXING RECOVERY PAGE: This page is stuck in Google's "Crawled - currently not indexed" due to thin/boilerplate content. Your mission: create genuinely unique, substantive content that gives Google a clear reason to index it. Focus on unique product/category value, specific technical details, and real user questions. Avoid any generic filler.`
                : `Target focus keyword: ${page.keyword}. GSC data: ${page.impressions} impressions, ${page.clicks} clicks — page is underperforming; optimize for CTR and rankings.`,
            projectData: {
              label: 'SMK Store',
              domain: 'smkstore.com',
              industry: 'Knives & Tactical Gear',
              brands: [],
              vertical: 'ecommerce',
            },
          })

          const genJson = await this.generateWithRetry(body)
          const content = genJson?.content ?? genJson
          // Keyword pack ko content ke saath store karo (dashboard display ke liye)
          if (content && keywordPack?.primary) {
            content._keywordPack = {
              primary: keywordPack.primary,
              secondary: keywordPack.secondary,
            }
          }
          results.pagesGenerated++

          if (!this.config.dryRun) {
            const adapter = getCMSAdapter(this.config.cmsConfig)
            await adapter.publish(page.url, content)
            results.pagesPublished++
          }

          // ✅ Save for approval workflow (pending = review ka intezar)
          if (runId) {
            await this.savePage(
              runId,
              page,
              this.config.dryRun ? 'pending' : 'published',
              content,
            )
          }

          // Backlog page tha to queue mein mark karo (double resubmission na ho)
          if (page._source === 'backlog' && page._queueId) {
            await db.indexingQueue.update({
              where: { id: page._queueId },
              data: { status: 'content_generated' },
            }).catch(() => {})
          }

          results.pages.push({
            url: page.url,
            keyword: keywordPack?.primary?.query ?? page.keyword,
            impressions: page.impressions,
            clicks: page.clicks,
            status: this.config.dryRun ? 'generated (dry-run)' : 'published',
            source: page._source ?? 'underperformer',
            content,
          })
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'error'
          results.errors.push(`${page.url}: ${msg}`)

          // ❌ Failed page bhi save — dashboard pe visible rahe
          if (runId) {
            await this.savePage(runId, page, 'failed', null, msg)
          }
        }
      }

      if (results.errors.length > 0 && results.pagesGenerated === 0) {
        results.status = 'error'
      }
    } catch (err) {
      results.status = 'error'
      results.errors.push(err instanceof Error ? err.message : 'Unknown error')
    }

    return results
  }
}