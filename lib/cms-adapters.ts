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
      throw new Error(`WordPress API error: ${response.statusText}`)
    }
    return response.json()
  }

  async publish(pageUrl: string, content: any): Promise<{ success: boolean; postId: string }> {
    const slug = pageUrl.split('/').filter(Boolean).pop()
    const pages = await this.fetch(`/pages?slug=${slug}&_fields=id`)
    if (pages.length === 0) throw new Error(`Page not found: ${pageUrl}`)

    const postId = pages[0].id
    const faqHtml = (content.faqs || [])
      .map((f: any) => `<h3>${f.question}</h3><p>${f.answer}</p>`)
      .join('\n')

    await this.fetch(`/pages/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        content: `${content.contentBody}\n\n<h2>FAQ</h2>\n${faqHtml}`,
        title: content.h1Title,
      }),
    })

    return { success: true, postId: String(postId) }
  }
}

export function getCMSAdapter(config: any): CMSAdapter {
  if (config.type === 'wordpress' || config.cmsType === 'wordpress') {
    return new WordPressAdapter(config.baseUrl, config.username, config.appPassword)
  }
  throw new Error(`Unknown CMS type: ${config.type || config.cmsType}`)
}