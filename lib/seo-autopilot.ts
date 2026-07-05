import { fetchUnderperformingPagesFromGSC } from './gsc-client'
import { getCMSAdapter } from './cms-adapters'

export interface AutopilotConfigInput {
  clientId: string
  siteUrl: string
  serviceAccountJson: string
  cmsConfig: any
  maxPagesPerRun: number
  contentTier: string
  dryRun: boolean
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

  async run() {
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

      const targets = cleanPages.slice(0, this.config.maxPagesPerRun)

      for (const page of targets) {
        try {
          const body = JSON.stringify({
            item: page.url,
            contentType: 'Product/Category Page',
            depth: '1000-1500 words (Standard)',
            fieldNotes: `Target focus keyword: ${page.keyword}. GSC data: ${page.impressions} impressions, ${page.clicks} clicks — page is underperforming; optimize for CTR and rankings.`,
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
          results.pagesGenerated++

          if (!this.config.dryRun) {
            const adapter = getCMSAdapter(this.config.cmsConfig)
            await adapter.publish(page.url, content)
            results.pagesPublished++
          }

          results.pages.push({
            url: page.url,
            keyword: page.keyword,
            impressions: page.impressions,
            clicks: page.clicks,
            status: this.config.dryRun ? 'generated (dry-run)' : 'published',
            content,
          })
        } catch (err) {
          results.errors.push(
            `${page.url}: ${err instanceof Error ? err.message : 'error'}`,
          )
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