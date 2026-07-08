import * as cheerio from 'cheerio'
 
export interface CrawlResult {
  url: string
  statusCode: number | null
  title: string | null
  titleLength: number | null
  metaDescription: string | null
  metaLength: number | null
  h1Count: number
  h1Text: string | null
  wordCount: number
  internalLinksCount: number
  externalLinksCount: number
  imageCount: number
  imagesMissingAlt: number
  canonical: string | null
  hasSchema: boolean
  issues: string[]
  error?: string
}
 
// Common headers — Ngrok tunnel warning bypass ke liye + user-agent
const COMMON_HEADERS = {
  'User-Agent': 'SearchPrex Audit Bot/1.0',
  'ngrok-skip-browser-warning': 'true',
}
 
// Sitemap XML se URLs nikaalo (nested sitemap_index bhi handle karta hai)
export async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  const res = await fetch(sitemapUrl, {
    headers: COMMON_HEADERS,
  })
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
 
  // Sub-sitemaps? (index file)
  const subSitemapMatches = [...xml.matchAll(/<sitemap>\s*<loc>(.*?)<\/loc>/g)]
  if (subSitemapMatches.length > 0) {
    const subUrls = subSitemapMatches.map((m) => m[1])
    const all: string[] = []
    // Nested sitemaps — sab se URLs collect
    for (const sub of subUrls) {
      try {
        const subUrls = await fetchSitemapUrls(sub)
        all.push(...subUrls)
      } catch (err) {
        console.error('Sub-sitemap fail:', sub, err)
      }
    }
    return all
  }
 
  // Regular sitemap — URLs nikaalo
  const urlMatches = [...xml.matchAll(/<url>\s*<loc>(.*?)<\/loc>/g)]
  return urlMatches.map((m) => m[1])
}
 
// Ek page fetch + parse
export async function crawlPage(url: string, siteHost: string): Promise<CrawlResult> {
  const result: CrawlResult = {
    url,
    statusCode: null,
    title: null,
    titleLength: null,
    metaDescription: null,
    metaLength: null,
    h1Count: 0,
    h1Text: null,
    wordCount: 0,
    internalLinksCount: 0,
    externalLinksCount: 0,
    imageCount: 0,
    imagesMissingAlt: 0,
    canonical: null,
    hasSchema: false,
    issues: [],
  }
 
  try {
    const res = await fetch(url, {
      headers: COMMON_HEADERS,
      redirect: 'follow',
    })
    result.statusCode = res.status
    if (!res.ok) {
      result.issues.push(`http_${res.status}`)
      return result
    }
    const html = await res.text()
    const $ = cheerio.load(html)
 
    // Title
    const title = $('head title').first().text().trim()
    result.title = title || null
    result.titleLength = title.length || null
    if (!title) result.issues.push('title_missing')
    else if (title.length < 30) result.issues.push('title_too_short')
    else if (title.length > 60) result.issues.push('title_too_long')
 
    // Meta description
    const meta = $('meta[name="description"]').attr('content')?.trim() || ''
    result.metaDescription = meta || null
    result.metaLength = meta.length || null
    if (!meta) result.issues.push('meta_missing')
    else if (meta.length < 120) result.issues.push('meta_too_short')
    else if (meta.length > 160) result.issues.push('meta_too_long')
 
    // H1
    const h1s = $('h1')
    result.h1Count = h1s.length
    result.h1Text = h1s.first().text().trim() || null
    if (result.h1Count === 0) result.issues.push('h1_missing')
    else if (result.h1Count > 1) result.issues.push('h1_multiple')
 
    // Word count (main content — remove nav/footer/script)
    $('script, style, nav, footer, header').remove()
    const bodyText = $('body').text().replace(/\s+/g, ' ').trim()
    result.wordCount = bodyText.split(' ').filter(Boolean).length
    if (result.wordCount < 300) result.issues.push('thin_content')
 
    // Links
    const links = $('a[href]')
    links.each((_, el) => {
      const href = $(el).attr('href') || ''
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return
      try {
        const abs = new URL(href, url)
        if (abs.host === siteHost) result.internalLinksCount++
        else result.externalLinksCount++
      } catch {
        // relative link, treat as internal
        result.internalLinksCount++
      }
    })
    if (result.internalLinksCount < 3) result.issues.push('low_internal_links')
 
    // Images
    const imgs = $('img')
    result.imageCount = imgs.length
    imgs.each((_, el) => {
      const alt = $(el).attr('alt')
      if (!alt || !alt.trim()) result.imagesMissingAlt++
    })
    if (result.imagesMissingAlt > 0) result.issues.push('images_missing_alt')
 
    // Canonical
    result.canonical = $('link[rel="canonical"]').attr('href') || null
    if (!result.canonical) result.issues.push('canonical_missing')
 
    // Schema
    result.hasSchema = $('script[type="application/ld+json"]').length > 0
    if (!result.hasSchema) result.issues.push('schema_missing')
  } catch (err) {
    result.error = err instanceof Error ? err.message : 'crawl error'
    result.issues.push('fetch_error')
  }
 
  return result
}
 
// Concurrent crawler with rate limit (respectful — server ki jaan bachao)
export async function crawlBatch(
  urls: string[],
  siteHost: string,
  concurrency = 5,
  delayMs = 500,
  onProgress?: (done: number, total: number) => void,
): Promise<CrawlResult[]> {
  const results: CrawlResult[] = []
  let done = 0
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency)
    const batchResults = await Promise.all(batch.map((u) => crawlPage(u, siteHost)))
    results.push(...batchResults)
    done += batch.length
    onProgress?.(done, urls.length)
    if (i + concurrency < urls.length) {
      await new Promise((r) => setTimeout(r, delayMs))
    }
  }
  return results
}
 