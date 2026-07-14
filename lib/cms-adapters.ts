export interface CMSAdapter {
  name: string
  publish(pageUrl: string, content: any): Promise<{ success: boolean; postId: string; onPage: string[] }>
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
 
  // Slug ko pehle pages mein, phir posts mein, phir WooCommerce product mein dhoondte hain
  private async findContent(
    slug: string,
  ): Promise<{ id: number; type: 'pages' | 'posts' | 'product' }> {
    // 1. Standard pages check
    const pages = await this.fetch(`/pages?slug=${slug}&_fields=id`)
    if (pages.length > 0) return { id: pages[0].id, type: 'pages' }
 
    // 2. Standard posts check
    const posts = await this.fetch(`/posts?slug=${slug}&_fields=id`)
    if (posts.length > 0) return { id: posts[0].id, type: 'posts' }
 
    // 3. WooCommerce product check — /wp/v2/product endpoint
    // Ye endpoint tab expose hota hai jab WooCommerce product post_type mein
    // show_in_rest: true ho (modern WooCommerce v3.5+ mein default hai)
    try {
      const products = await this.fetch(`/product?slug=${slug}&_fields=id`)
      if (products.length > 0) return { id: products[0].id, type: 'product' }
    } catch (err) {
      // Product endpoint site pe enabled nahi hai — silently skip aur error message
      // se user ko pata chal jayega
    }
 
    throw new Error(`Content not found in pages, posts, or products: ${slug}`)
  }
 
  async publish(
    pageUrl: string,
    content: any,
  ): Promise<{ success: boolean; postId: string; onPage: string[] }> {
    const slug = pageUrl.split('/').filter(Boolean).pop()
    if (!slug) throw new Error(`Invalid pageUrl: ${pageUrl}`)
 
    // Internal metadata publish nahi hota
    const { _keywordPack, ...c } = content
 
    const target = await this.findContent(slug)
    const onPage: string[] = []
 
    // ── 1. CONTENT BODY (naya heading structure included) ──
    let body = c.contentBody || c.htmlContent || c.html || c.description || ''
    if (!body) throw new Error(`No publishable content body found for ${slug}`)
    onPage.push('content+headings')
 
    // ── 2. FAQ section (visible HTML) ──
    const faqs = Array.isArray(c.faqs) ? c.faqs : []
    if (faqs.length > 0) {
      const faqHtml = faqs
        .map((f: any) => `<h3>${f.question}</h3><p>${f.answer}</p>`)
        .join('\n')
      body = `${body}\n\n<h2>Frequently Asked Questions</h2>\n${faqHtml}`
      onPage.push('faq-section')
    }
 
    // ── 3. SCHEMA MARKUP (JSON-LD script inject — FAQPage + jo bhi engine ne banaya) ──
    const schemas: string[] = []
    if (c.schemaMarkup && typeof c.schemaMarkup === 'string' && c.schemaMarkup.trim().startsWith('{')) {
      schemas.push(c.schemaMarkup.trim())
    }
    if (faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f: any) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
      schemas.push(JSON.stringify(faqSchema))
    }
    if (schemas.length > 0) {
      const schemaBlock = schemas
        .map((s) => `<script type="application/ld+json">${s}</script>`)
        .join('\n')
      body = `${body}\n\n${schemaBlock}`
      onPage.push(`schema-jsonld(${schemas.length})`)
    }
 
    // ── 4. CORE UPDATE: content + H1 title ──
    const updatePayload: any = { content: body }
    const title = c.h1Title || c.title
    if (title) updatePayload.title = title
 
    // ── 5. RANK MATH META (title, description, focus keyword) ──
    // Rank Math REST API se meta expose karta hai. Agar site pe field register
    // nahi hai to WP unknown meta ko silently ignore karta hai — publish nahi tootega.
    const meta: any = {}
    if (c.metaTitle) meta.rank_math_title = c.metaTitle
    if (c.metaDescription) meta.rank_math_description = c.metaDescription
    if (c.focusKeyword) meta.rank_math_focus_keyword = c.focusKeyword
    if (Object.keys(meta).length > 0) {
      updatePayload.meta = meta
      onPage.push('rankmath-meta')
    }
 
    // POST endpoint dynamically build hota hai:
    //   /pages/{id}     — pages ke liye
    //   /posts/{id}     — blog posts ke liye
    //   /product/{id}   — WooCommerce products ke liye (NEW)
    await this.fetch(`/${target.type}/${target.id}`, {
      method: 'POST',
      body: JSON.stringify(updatePayload),
    })
 
    return { success: true, postId: String(target.id), onPage }
  }
}
 
export function getCMSAdapter(config: any): CMSAdapter {
  if (config.type === 'wordpress' || config.cmsType === 'wordpress') {
    return new WordPressAdapter(config.baseUrl, config.username, config.appPassword)
  }
  throw new Error(`Unknown CMS type: ${config.type || config.cmsType}`)
}
 