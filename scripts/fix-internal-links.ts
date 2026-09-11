// scripts/fix-internal-links.ts
//
// Un 19,294 pages ke internal links theek karta hai jo homepage par redirect
// karte hain.
//
// Chalane ka tareeqa:
//   npx tsx scripts/fix-internal-links.ts                  # dry run (default)
//   npx tsx scripts/fix-internal-links.ts --limit 500      # sirf 500 pages
//   npx tsx scripts/fix-internal-links.ts --live           # asli update
//   npx tsx scripts/fix-internal-links.ts --live --pacing 800
//
// Ek page ek request nahi — WooCommerce ek saath 100 products parh kar deta hai
// aur ek saath 100 update bhi le leta hai. Is se ~38,000 requests ki jagah
// ~400 lagti hain: chhe ghante ka kaam pandra minute me, aur origin par bojh
// sau guna kam (ye origin 520 deta hai).

import { loadTermLinks } from '../lib/autopilot/term-links'
import { fixInternalLinks, needsLinkFix } from '../lib/autopilot/fix-links'

const BASE = process.env.MSO_WP_BASE_URL || 'https://www.michigansportsoutdoor.com'
const CREDS = {
  username: process.env.MSO_WP_USER || 'apiuser',
  appPassword: process.env.MSO_WP_PASS || 'cvxm Bi7y 6o3y r7HJ M1Wn mSMM',
}

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}
const flag = (n: string) => process.argv.includes(`--${n}`)

const LIVE = flag('live')
const LIMIT = Number(arg('limit', '0')) || 0
const PACING_MS = Number(arg('pacing', '700'))
const BATCH = 100
const MAX_CONSECUTIVE_FAILURES = 4

const AUTH = Buffer.from(`${CREDS.username}:${CREDS.appPassword}`).toString('base64')
const H = { Authorization: `Basic ${AUTH}` }

interface Upd { id: number; description: string }

async function fetchPage(page: number): Promise<any[] | null> {
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(
        `${BASE}/wp-json/wc/v3/products?per_page=${BATCH}&page=${page}&status=publish`,
        { headers: H, signal: AbortSignal.timeout(50_000) }
      )
      if (res.ok) return (await res.json()) as any[]
      if (res.status === 400) return null // page range se bahar
      console.warn(`      page ${page} -> HTTP ${res.status}, koshish ${attempt}/4`)
    } catch (e) {
      console.warn(`      page ${page} -> ${(e as Error).message.slice(0, 50)}, koshish ${attempt}/4`)
    }
    await new Promise(r => setTimeout(r, attempt * 3000))
  }
  return null
}

async function writeBatch(updates: Upd[]): Promise<boolean> {
  const res = await fetch(`${BASE}/wp-json/wc/v3/products/batch`, {
    method: 'POST',
    headers: { ...H, 'Content-Type': 'application/json' },
    body: JSON.stringify({ update: updates }),
    signal: AbortSignal.timeout(90_000),
  })
  if (!res.ok) {
    console.error(`      batch write -> HTTP ${res.status}: ${(await res.text()).slice(0, 140)}`)
    return false
  }
  return true
}

async function main() {
  console.log(`\n=== Internal Link Fixer (${LIVE ? 'LIVE' : 'DRY RUN'}) ===\n`)
  console.log(`WordPress: ${BASE}`)

  console.log('\n[1/2] Asli permalinks la rahe hain...')
  const bySlug = await loadTermLinks(BASE, CREDS)
  if (bySlug.size === 0) throw new Error('Koi permalink nahi mila — bina in ke links theek nahi ho sakte')
  console.log(`      ✅ ${bySlug.size} category aur brand permalinks`)

  console.log('\n[2/2] Pages parh kar theek kar rahe hain...\n')

  let scanned = 0, needed = 0, fixedPages = 0, repointed = 0, unwrapped = 0, failedBatches = 0
  let consecutiveFailures = 0
  const unknownSlugs = new Map<string, number>()
  let samplesShown = 0

  for (let page = 1; page <= 600; page++) {
    const products = await fetchPage(page)
    if (products === null) {
      console.warn(`      page ${page} chaar koshishon ke baad bhi nahi mila — yahin rok rahe hain`)
      break
    }
    if (products.length === 0) break

    const updates: Upd[] = []

    for (const p of products) {
      scanned++
      const html: string = p.description ?? ''
      if (!needsLinkFix(html)) continue
      needed++

      const r = fixInternalLinks(html, bySlug)
      if (!r.changed) continue

      for (const href of r.unwrapped) {
        const slug = href.match(/\/product-category\/([^/"?#]+)/i)?.[1] ?? href
        unknownSlugs.set(slug, (unknownSlugs.get(slug) ?? 0) + 1)
      }

      if (samplesShown < 6 && r.repointed.length > 0) {
        samplesShown++
        console.log(`  ${String(p.name).slice(0, 40)}`)
        for (const [from, to] of r.repointed.slice(0, 2)) {
          console.log(`     ${from.replace(BASE, '')}`)
          console.log(`  →  ${to.replace(BASE, '')}`)
        }
      }

      repointed += r.repointed.length
      unwrapped += r.unwrapped.length
      updates.push({ id: p.id, description: r.html })

      if (LIMIT > 0 && fixedPages + updates.length >= LIMIT) break
    }

    if (updates.length > 0) {
      if (LIVE) {
        const ok = await writeBatch(updates)
        if (!ok) {
          failedBatches++
          consecutiveFailures++
          if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
            console.error(`\n🛑 Lagatar ${MAX_CONSECUTIVE_FAILURES} batch nakaam — origin ka masla. Ruk rahe hain.`)
            console.error('   Wahi command dobara chalayein; jo theek ho chuke wo skip honge.\n')
            break
          }
          continue
        }
        consecutiveFailures = 0
      }
      fixedPages += updates.length
    }

    if (page % 10 === 0) {
      console.log(`      ${scanned} scanned | ${fixedPages} ${LIVE ? 'theek kiye' : 'theek honge'}`)
    }
    if (LIMIT > 0 && fixedPages >= LIMIT) break
    if (products.length < BATCH) break
    if (PACING_MS > 0) await new Promise(r => setTimeout(r, PACING_MS))
  }

  console.log(`\n=== ${LIVE ? 'MUKAMMAL' : 'DRY RUN MUKAMMAL'} ===`)
  console.log(`  scan kiye            : ${scanned}`)
  console.log(`  jinme toota link tha : ${needed}`)
  console.log(`  ${LIVE ? 'theek kiye' : 'theek honge'}           : ${fixedPages}`)
  console.log(`  links repoint hue    : ${repointed}`)
  console.log(`  links hataye gaye    : ${unwrapped}  (term maujood nahi)`)
  if (failedBatches) console.log(`  nakaam batches       : ${failedBatches}`)

  if (unknownSlugs.size > 0) {
    console.log('\n  Jin slugs ka term nahi mila (link hata diya gaya):')
    for (const [slug, n] of [...unknownSlugs].sort((a, b) => b[1] - a[1]).slice(0, 10)) {
      console.log(`    ${slug.padEnd(34)} ${n}`)
    }
  }

  if (!LIVE && fixedPages > 0) {
    console.log('\n⚠️  Ye dry run tha — WordPress par kuch nahi badla.')
    console.log('   Asli update ke liye --live laga kar chalayein.\n')
  } else {
    console.log('')
  }
  process.exit(0)
}

main().catch(err => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})
