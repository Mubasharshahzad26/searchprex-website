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

      const targets = pages.slice(0, this.config.maxPagesPerRun)

      for (const page of targets) {
        try {
          const genRes = await fetch(this.generationEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              url: page.url,
              keyword: page.keyword,
              tier: this.config.contentTier,
            }),
          })

          if (!genRes.ok) throw new Error(`Generation failed: ${genRes.status}`)
          const content = await genRes.json()
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