import { Prisma } from '@prisma/client'

export type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[]

export interface CMSAdapter {
  publish(pageUrl: string, content: JsonValue): Promise<void>
}

class WordPressAdapter implements CMSAdapter {
  private siteUrl: string
  private username: string
  private password: string

  constructor(config: { siteUrl: string; wpUser?: string; wpPassword?: string }) {
    this.siteUrl = config.siteUrl
    this.username = config.wpUser || process.env.WP_USERNAME || ''
    this.password = config.wpPassword || process.env.WP_PASSWORD || ''

    if (!this.username || !this.password) {
      console.warn('⚠️  WordPress credentials not configured')
    }
  }

  // Helper: Create Basic Auth header
  private getAuthHeader(): string {
    const credentials = `${this.username}:${this.password}`
    return `Basic ${Buffer.from(credentials).toString('base64')}`
  }

  // ⭐ SIMPLIFIED PUBLISH: No product verification
  async publish(pageUrl: string, content: JsonValue): Promise<void> {
    try {
      // Extract slug from URL
      const slug = this.extractSlug(pageUrl)
      if (!slug) {
        throw new Error(`Invalid URL format: ${pageUrl}`)
      }

      console.log(`📝 Publishing to WP: ${slug}`)

      // Prepare post data
      const postData = {
        title: this.getTitle(content),
        content: this.getContent(content),
        slug: slug,
        status: 'publish',
        post_type: 'post',
      }

      // Create/Update post via WordPress REST API
      const response = await fetch(`${this.siteUrl}/wp-json/wp/v2/posts`, {
        method: 'POST',
        headers: {
          'Authorization': this.getAuthHeader(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`WP API error (${response.status}): ${errorText}`)
      }

      const result = await response.json()
      console.log(`✅ Published successfully: ${result.id}`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error(`❌ Publish failed for ${pageUrl}: ${message}`)
      throw error
    }
  }

  // Helper: Extract product slug from URL
  private extractSlug(pageUrl: string): string {
    try {
      const url = new URL(pageUrl)
      const parts = url.pathname.split('/').filter(p => p)
      
      // Look for /product/slug-name format
      if (parts.includes('product') && parts.length > parts.indexOf('product') + 1) {
        return parts[parts.indexOf('product') + 1]
      }
      
      // Fallback: use last non-empty part
      return parts[parts.length - 1] || ''
    } catch {
      return ''
    }
  }

  // Helper: Extract title from content
  private getTitle(content: JsonValue): string {
    if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
      if ('title' in content && typeof content.title === 'string') {
        return content.title
      }
      if ('heading' in content && typeof content.heading === 'string') {
        return content.heading
      }
    }
    return 'Auto-Generated Content'
  }

  // Helper: Extract content/body
  private getContent(content: JsonValue): string {
    if (typeof content === 'string') {
      return content
    }
    
    if (typeof content === 'object' && content !== null && !Array.isArray(content)) {
      if ('content' in content && typeof content.content === 'string') {
        return content.content
      }
      if ('body' in content && typeof content.body === 'string') {
        return content.body
      }
      if ('text' in content && typeof content.text === 'string') {
        return content.text
      }
    }
    
    // Fallback: convert object to JSON string
    return JSON.stringify(content, null, 2)
  }
}

export function getCMSAdapter(config: any): CMSAdapter {
  const type = config?.type?.toLowerCase() || 'wordpress'

  if (type === 'wordpress') {
    return new WordPressAdapter(config)
  }

  throw new Error(`Unknown CMS type: ${type}`)
}