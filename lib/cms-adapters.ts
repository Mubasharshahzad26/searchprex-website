export interface CMSAdapter {
  name: string
  publish(pageUrl: string, content: any): Promise<{ success: boolean; postId: string }>
}

export class WordPressAdapter implements CMSAdapter {
  name = 'WordPress'
  private baseUrl: string
  private username: string
  private appPassword: string

  constructor(baseUrl: string, username: string, appPassword: string) {
    this.baseUrl = baseUrl
    this.username = username
    this.appPassword = appPassword
  }

  private async fetch(endpoint: string, options: RequestInit = {}) {
    const auth = Buffer.from(`${this.username}:${this.appPassword}`).toString('base64')
    const response = await fetch(`${this.baseUrl}/wp-json/wp/v2${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw new Error(`WordPress API ${response.status} ${response.statusText}: ${body.slice(0, 200)}`)
    }
    return response.json()
  }

  // Page pehle "pages" mein dhoondo, na mile to "posts" mein
  private async findContent(slug: string): Promise<{ id: number; type: 'pages' | 'posts' }> {
    const pages = await this.fetch(`/pages?slug=${slug}&_fields=id`)
    if (pages.length > 0) return { id: pages[0].id, type: 'pages' }
    const posts = await this.fetch(`/posts?slug=${slug}&_fields=id`)
    if (posts.length > 0) return { id: posts[0].id, type: 'posts' }
    throw new Error(`Content not found in pages or posts: ${slug}`)
  }

  async publish(pageUrl: string, content: any): Promise<{ success: boolean; postId: string }> {
    const slug = pageUrl.split('/').filter(Boolean).pop()
    if (!slug) throw new Error(`Invalid pageUrl: ${pageUrl}`)

    const target = await this.findContent(slug)

    // Field mapping — generate-suite ke mukhtalif output shapes handle karo
    const body = content.contentBody || content.htmlContent || content.html || content.description || ''
    const title = content.h1Title || content.title || undefined
    if (!body) throw new Error(`No publishable content body found for ${slug}`)

    const faqHtml = (content.faqs || [])
      .map((f: any) => `<h3>${f.question}</h3><p>${f.answer}</p>`)
      .join('\n')

    await this.fetch(`/${target.type}/${target.id}`, {
      method: 'POST',
      body: JSON.stringify({
        content: faqHtml ? `${body}\n\n<h2>FAQ</h2>\n${faqHtml}` : body,
        ...(title ? { title } : {}),
      }),
    })

    return { success: true, postId: String(target.id) }
  }
}

export function getCMSAdapter(config: any): CMSAdapter {
  if (config.type === 'wordpress' || config.cmsType === 'wordpress') {
    return new WordPressAdapter(config.baseUrl, config.username, config.appPassword)
  }
  throw new Error(`Unknown CMS type: ${config.type || config.cmsType}`)
}