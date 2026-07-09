import { fetchUnderperformingPagesFromGSC } from './gsc-client'
import { getCMSAdapter } from './cms-adapters'
import { db } from './db'
import { withRetry } from './db-retry'
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

// Client-specific project profile (Gemini prompt mein use hoga)
interface ClientProfile {
  label: string
  domain: string
  industry: string
  brands: string[]
  vertical: 'ecommerce' | 'local' | 'lawfirm' | 'digital'
}

// Domain-based profile map. Naye client add karne pe yahan entry add karo.
// Fallback: agar match nahi mila to Client.companyName + Client.domain use hoga.
const CLIENT_PROFILES: Record<string, Partial<ClientProfile>> = {
  'smkstore.com': {
    label: 'SMK Store',
    industry: 'Knives & Tactical Gear',
    vertical: 'ecommerce',
  },
  'michigansportsoutdoor.com': {
    label: 'Michigan Sports Outdoor',
    industry: 'Knives, Hunting, Fishing & Outdoor Gear',
    vertical: 'ecommerce',
  },
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
        await new Promise((r) => setTimeout(r, 3000))
        continue
      }
      throw new Error(`Generation failed: ${genRes.status}`)
    }
  }

  // Client profile resolve karo — DB + static map ka combo
  private async resolveClientProfile(): Promise<ClientProfile> {
    // DB se client fetch
    const client = await withRetry(() =>
      db.client.findUnique({
        where: { id: this.config.clientId },
        select: { companyName: true, domain: true },
      })
    )
    if (!client) {
      throw new Error(`Client ${this.config.clientId} not found in DB`)
    }

    // Domain normalize
    const domainKey = client.domain.toLowerCase().replace(/^www\./, '').replace(/\/$/, '')

    // Static override
    const override = CLIENT_PROFILES[domainKey] || {}

    return {
      label: override.label ?? client.companyName,
      domain: override.domain ?? domainKey,
      industry: override.industry ?? 'E-commerce Retail',
      brands: override.brands ?? [],
      vertical: override.vertical ?? 'ecommerce',
    }
  }

  private async savePage(
    runId: string,
    page: any,
    status: string,
    content: any = null,
    errorMessage: string | null = null,
  ) {
    try {
      await withRetry(() =>
        db.autopilotPage.upsert({
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
      )
    } catch (dbErr) {
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
      // ⭐ Client profile resolve pehle — Gemini ko sahi context mile
      const projectData = await this.resolveClientProfile()
      console.log(`[Autopilot] Running for: ${projectData.label} (${projectData.domain}) — vertical: ${projectData.vertical}`)

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

      // Duplicate guard: same client ke pending/approved pages skip
      const existingPages = await withRetry(() =>
        db.autopilotPage.findMany({
          where: {
            status: { in: ['pending', 'approved'] },
            run: { clientId: this.config.clientId },
          },
          select: { pageUrl: true },
        })
      )
      const existingUrls = new Set(existingPages.map((p) => p.pageUrl))
      const freshPages = cleanPages.filter((p: any) => !existingUrls.has(p.url))

      const targets: any[] = freshPages.slice(0, this.config.maxPagesPerRun)

      // ── PIPELINE 2: Backlog content (crawled-not-indexed) ──
      const backlogBudget = this.config.backlogPagesPerRun ?? 0
      if (backlogBudget > 0) {
        const backlogItems = await withRetry(() =>
          db.indexingQueue.findMany({
            where: {
              clientId: this.config.clientId,
              status: { in: ['queued', 'submitted'] },
              url: { notIn: [...existingUrls] },
            },
            orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
            take: backlogBudget,
          })
        )
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
            projectData, // ⭐ Ab dynamic hai — client ke basis pe
          })

          const genJson = await this.generateWithRetry(body)
          const content = genJson?.content ?? genJson
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

          if (runId) {
            await this.savePage(
              runId,
              page,
              this.config.dryRun ? 'pending' : 'published',
              content,
            )
          }

          if (page._source === 'backlog' && page._queueId) {
            await withRetry(() =>
              db.indexingQueue.update({
                where: { id: page._queueId },
                data: { status: 'content_generated' },
              })
            ).catch(() => {})
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