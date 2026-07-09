// scripts/build-mso-links.ts
// MSO ke sitemap se automatically verified links pool build karta hai
// Chalane ka tareeka: npx tsx scripts/build-mso-links.ts

import * as fs from 'fs'
import * as path from 'path'

const SITEMAP_INDEX = 'https://www.michigansportsoutdoor.com/sitemap_index.xml'
const OUT_FILE = path.join(process.cwd(), 'lib', 'verified-links.ts')

// Kis type ke sitemaps process karne hain
const INCLUDE_SITEMAPS = [
  'product_cat',    // WooCommerce product categories
  'product_tag',    // Product tags (sometimes useful)
  'page',           // WordPress pages (About, Shipping, etc.)
  'post',           // Blog posts
  'category',       // Blog categories
  'brand',          // If separate brand sitemap
]

// Product sitemap SKIP — thin content, indexing issues
const EXCLUDE_SITEMAPS = ['product-sitemap', 'wpseo_product']

// URL patterns to exclude (author archives, feed, etc.)
const EXCLUDE_URL_PATTERNS = [
  /\/author\//,
  /\/feed\//,
  /\/wp-json\//,
  /\/wp-admin\//,
  /\?/, // Query params
  /\/cart\/?$/,
  /\/checkout\/?$/,
  /\/my-account\//,
  /\/wishlist\//,
]

interface CategorizedLinks {
  categories: string[]
  brands: string[]
  pages: string[]
  posts: string[]
  other: string[]
}

async function fetchXML(url: string): Promise<string> {
  console.log(`  → Fetching: ${url}`)
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SearchPrexBot/1.0)' },
  })
  if (!res.ok) throw new Error(`Failed: ${res.status} ${url}`)
  return res.text()
}

function extractLocs(xml: string): string[] {
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || []
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim())
}

function shouldIncludeSitemap(sitemapUrl: string): boolean {
  const lower = sitemapUrl.toLowerCase()
  if (EXCLUDE_SITEMAPS.some((ex) => lower.includes(ex))) return false
  return INCLUDE_SITEMAPS.some((inc) => lower.includes(inc))
}

function shouldIncludeUrl(url: string): boolean {
  return !EXCLUDE_URL_PATTERNS.some((rx) => rx.test(url))
}

function categorizeUrl(url: string): keyof CategorizedLinks {
  const lower = url.toLowerCase()
  if (lower.includes('/product-category/') || lower.includes('/category/')) return 'categories'
  if (lower.includes('/product-brand/') || lower.includes('/brand/') || lower.includes('/manufacturer/')) return 'brands'
  if (lower.match(/\/(blog|news|articles|guides)\//)) return 'posts'
  if (lower.match(/\/(about|contact|shipping|returns|faq|policy|terms|privacy)/)) return 'pages'
  // Homepage
  if (lower.match(/^https?:\/\/[^/]+\/?$/)) return 'pages'
  return 'other'
}

async function main() {
  console.log('\n=== MSO Verified Links Builder ===\n')

  // 1. Sitemap index fetch
  console.log('[1/5] Sitemap index fetch...')
  const indexXml = await fetchXML(SITEMAP_INDEX)
  const subSitemaps = extractLocs(indexXml)
  console.log(`      ✅ ${subSitemaps.length} sub-sitemaps mile`)
  subSitemaps.forEach((s) => console.log(`         - ${s}`))

  // 2. Filter sitemaps
  console.log('\n[2/5] Relevant sitemaps filter...')
  const relevantSitemaps = subSitemaps.filter(shouldIncludeSitemap)
  const skippedSitemaps = subSitemaps.filter((s) => !shouldIncludeSitemap(s))
  console.log(`      ✅ ${relevantSitemaps.length} include, ${skippedSitemaps.length} skip`)
  if (skippedSitemaps.length > 0) {
    console.log(`      Skipped (products/other):`)
    skippedSitemaps.forEach((s) => console.log(`         ✗ ${s}`))
  }

  // 3. Har relevant sitemap se URLs nikaal
  console.log('\n[3/5] URLs extract kar rahe hain...')
  const allUrls: string[] = []
  for (const sm of relevantSitemaps) {
    try {
      const xml = await fetchXML(sm)
      const urls = extractLocs(xml).filter(shouldIncludeUrl)
      console.log(`      ${urls.length} URLs from ${sm.split('/').pop()}`)
      allUrls.push(...urls)
    } catch (err) {
      console.error(`      ❌ Failed: ${sm} — ${err instanceof Error ? err.message : err}`)
    }
  }

  // 4. Dedupe + categorize
  console.log('\n[4/5] Deduplicate + categorize...')
  const unique = Array.from(new Set(allUrls))
  console.log(`      ✅ ${allUrls.length} → ${unique.length} unique URLs`)

  const cat: CategorizedLinks = { categories: [], brands: [], pages: [], posts: [], other: [] }
  for (const u of unique) {
    cat[categorizeUrl(u)].push(u)
  }
  console.log(`      Categories: ${cat.categories.length}`)
  console.log(`      Brands:     ${cat.brands.length}`)
  console.log(`      Pages:      ${cat.pages.length}`)
  console.log(`      Posts:      ${cat.posts.length}`)
  console.log(`      Other:      ${cat.other.length}`)

  // Sort each bucket
  Object.keys(cat).forEach((k) => (cat[k as keyof CategorizedLinks].sort()))

  // 5. verified-links.ts update kar
  console.log('\n[5/5] lib/verified-links.ts update...')

  const existing = fs.readFileSync(OUT_FILE, 'utf-8')

  // Check if MSO_VERIFIED_LINKS already exists
  const hasMSO = existing.includes('MSO_VERIFIED_LINKS')

  // Build MSO block
  const buildBlock = (title: string, links: string[]) => {
    if (links.length === 0) return ''
    return `  // ${title}\n` + links.map((l) => `  '${l}',`).join('\n') + '\n'
  }

  const msoBlock = `
// Michigan Sports Outdoor — verified internal link pool (auto-generated from sitemap, ${new Date().toISOString().split('T')[0]})
// Product URLs intentionally excluded — thin content, indexing issues.
export const MSO_VERIFIED_LINKS = [
${buildBlock('Product Categories', cat.categories)}${buildBlock('Brands', cat.brands)}${buildBlock('Pages', cat.pages)}${buildBlock('Blog Posts', cat.posts)}${buildBlock('Other', cat.other)}]

// Site detection: hostname se automatically correct pool choose karo
export function getVerifiedLinksForSite(url: string): string[] {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\\./, '')
    if (host.includes('michigansportsoutdoor')) return MSO_VERIFIED_LINKS
    if (host.includes('smkstore')) return SMK_VERIFIED_LINKS
    return [] // Unknown site — no links (safer than wrong links)
  } catch {
    return []
  }
}
`

  let updated: string
  if (hasMSO) {
    // Replace existing MSO block (from "// Michigan Sports Outdoor" till end of file)
    updated = existing.replace(/\n\/\/ Michigan Sports Outdoor[\s\S]*$/, '') + msoBlock
    console.log(`      ⚠️  Existing MSO block replace kiya`)
  } else {
    // Append new
    updated = existing.trimEnd() + '\n' + msoBlock
    console.log(`      ✅ Naya MSO block append`)
  }

  fs.writeFileSync(OUT_FILE, updated, 'utf-8')
  console.log(`      ✅ Saved to ${OUT_FILE}`)

  console.log('\n=== ✅ SUCCESS ===')
  console.log(`Total MSO URLs added: ${unique.length}`)
  console.log(`  - Categories: ${cat.categories.length}`)
  console.log(`  - Brands:     ${cat.brands.length}`)
  console.log(`  - Pages:      ${cat.pages.length}`)
  console.log(`  - Posts:      ${cat.posts.length}`)
  console.log(`  - Other:      ${cat.other.length}`)
  console.log(`\nSite detection function bhi add ho gaya.`)
  console.log(`Next: Autopilot use karega automatically hostname ke basis pe.\n`)

  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})