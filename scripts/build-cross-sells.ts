// scripts/build-cross-sells.ts
//
// Har product ke liye related products (upsells + cross-sells) chun kar
// WooCommerce me likhta hai. Poore catalogue par abhi ye khali hain.
//
// Chalane ka tareeqa:
//   npx tsx scripts/build-cross-sells.ts                 # dry run (default)
//   npx tsx scripts/build-cross-sells.ts --limit 50      # sirf 50 products
//   npx tsx scripts/build-cross-sells.ts --live          # asli update
//   npx tsx scripts/build-cross-sells.ts --live --pacing 400
//
// Catalogue ek dafa memory me index hota hai (~370 requests), phir har product
// ka faisla usi index se hota hai — per-product search karne ka matlab hota
// 36,000 extra requests us origin par jo pehle hi 520 deta hai.
//
// Sirf wahi products likhe jaate hain jinka natija pehle se mojood se alag hai,
// is liye dobara chalane par taqreeban koi write nahi hota.

import { db } from '../lib/db'
import {
  pickRelations,
  isEligibleTarget,
  sameIds,
  GENERIC_CATEGORY_SLUGS,
  type IndexedProduct,
} from '../lib/autopilot/related-products'

const MSO_CLIENT_ID = process.env.MSO_CLIENT_ID ?? 'cmrcl8frg0000p8uruwv7j5qd'

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}
const flag = (n: string) => process.argv.includes(`--${n}`)

const LIVE = flag('live')
const LIMIT = Number(arg('limit', '0')) || 0
const PACING_MS = Number(arg('pacing', '350'))
const MAX_CONSECUTIVE_FAILURES = 5

interface Raw {
  id: number
  name: string
  price: string
  stock_status: string
  images: unknown[]
  total_sales: number
  brands?: Array<{ id: number; name: string; slug: string }>
  categories?: Array<{ id: number; name: string; slug: string }>
  upsell_ids: number[]
  cross_sell_ids: number[]
}

async function main() {
  console.log(`\n=== Cross-Sell Builder (${LIVE ? 'LIVE' : 'DRY RUN'}) ===\n`)

  const conn = await db.cMSConnection.findFirst({
    where: { clientId: MSO_CLIENT_ID, cmsType: 'wordpress' },
  })
  if (!conn) throw new Error('WordPress CMSConnection nahi mila')
  const creds = conn.credentials as { username: string; appPassword: string }
  const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')
  const H = { Authorization: `Basic ${auth}` }
  console.log(`WordPress: ${conn.baseUrl}`)

  // ── 1. Catalogue index ────────────────────────────────────
  console.log('\n[1/3] Catalogue index bana rahe hain...')
  //  Origin ne pehli koshish me page 70 par 520 diya tha aur index adhoora reh
  //  gaya — aur adhoore index ka matlab hai ghalat recommendations, kyunki
  //  candidates hi ghayab hote hain. Is liye har page par retry aur thoda
  //  waqfa.
  const raw: Raw[] = []
  const fetchPage = async (page: number): Promise<Raw[] | null> => {
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        const res = await fetch(
          `${conn.baseUrl}/wp-json/wc/v3/products?per_page=100&page=${page}&status=publish`,
          { headers: H, signal: AbortSignal.timeout(45000) }
        )
        if (res.ok) return (await res.json()) as Raw[]
        //  400 ka matlab hai page range se bahar — catalogue khatam.
        if (res.status === 400) return null
        console.warn(`      page ${page} -> HTTP ${res.status}, dobara koshish ${attempt}/4`)
      } catch (e) {
        console.warn(`      page ${page} -> ${(e as Error).message}, dobara koshish ${attempt}/4`)
      }
      await new Promise(r => setTimeout(r, attempt * 3000))
    }
    return null
  }

  for (let page = 1; page <= 500; page++) {
    const batch = await fetchPage(page)
    if (batch === null) {
      console.warn(`      page ${page} chaar koshishon ke baad bhi nahi mila — index yahin rok rahe hain`)
      break
    }
    raw.push(...batch)
    if (page % 20 === 0) console.log(`      ${raw.length} products...`)
    if (batch.length < 100) break
    await new Promise(r => setTimeout(r, 250))
  }
  console.log(`      ✅ ${raw.length} products index me`)

  const index: IndexedProduct[] = raw.map(p => ({
    id: p.id,
    name: p.name,
    price: Number(p.price) || 0,
    brandIds: (p.brands ?? []).map(b => b.id),
    categoryIds: (p.categories ?? []).map(c => c.id),
    inStock: p.stock_status === 'instock',
    hasImage: (p.images ?? []).length > 0,
    totalSales: Number(p.total_sales) || 0,
  }))

  //  Generic buckets ko similarity signal se nikaal dete hain.
  const specificCategoryIds = new Set<number>()
  const genericNames: string[] = []
  for (const p of raw) {
    for (const c of p.categories ?? []) {
      if (GENERIC_CATEGORY_SLUGS.includes(c.slug)) {
        if (!genericNames.includes(c.name)) genericNames.push(c.name)
      } else {
        specificCategoryIds.add(c.id)
      }
    }
  }
  console.log(`      ${specificCategoryIds.size} specific categories | generic chhodi gayi: ${genericNames.join(', ') || 'koi nahi'}`)

  const eligible = index.filter(isEligibleTarget)
  console.log(`      ${eligible.length} products recommend karne layak (in stock + image + price)`)

  // ── 2. Candidate buckets ──────────────────────────────────
  console.log('\n[2/3] Brand aur category buckets...')
  const byBrand = new Map<number, IndexedProduct[]>()
  const byCategory = new Map<number, IndexedProduct[]>()
  for (const p of eligible) {
    for (const b of p.brandIds) {
      if (!byBrand.has(b)) byBrand.set(b, [])
      byBrand.get(b)!.push(p)
    }
    for (const c of p.categoryIds) {
      if (!specificCategoryIds.has(c)) continue
      if (!byCategory.has(c)) byCategory.set(c, [])
      byCategory.get(c)!.push(p)
    }
  }
  console.log(`      ${byBrand.size} brands | ${byCategory.size} categories`)

  // ── 3. Decide and write ───────────────────────────────────
  const targets = LIMIT > 0 ? index.slice(0, LIMIT) : index
  console.log(`\n[3/3] ${targets.length} products par faisla...\n`)

  let changed = 0, unchanged = 0, noMatch = 0, failed = 0
  let consecutiveFailures = 0

  for (let i = 0; i < targets.length; i++) {
    const p = targets[i]
    const tag = `[${i + 1}/${targets.length}]`

    //  Sirf apne brand aur categories ke candidates — poora catalogue scan
    //  karna wahi jawab deta hai, ghanton me.
    const pool = new Map<number, IndexedProduct>()
    for (const b of p.brandIds) for (const c of byBrand.get(b) ?? []) pool.set(c.id, c)
    for (const c of p.categoryIds) for (const x of byCategory.get(c) ?? []) pool.set(x.id, x)
    pool.delete(p.id)

    const { upsellIds, crossSellIds } = pickRelations(p, [...pool.values()], specificCategoryIds)

    if (upsellIds.length === 0 && crossSellIds.length === 0) {
      noMatch++
      continue
    }

    const current = raw.find(r => r.id === p.id)!
    if (sameIds(current.upsell_ids ?? [], upsellIds) && sameIds(current.cross_sell_ids ?? [], crossSellIds)) {
      unchanged++
      continue
    }

    if (!LIVE) {
      changed++
      if (changed <= 12) {
        const names = upsellIds.map(id => index.find(x => x.id === id)?.name.slice(0, 28)).join(' | ')
        console.log(`${tag} · ${p.name.slice(0, 34).padEnd(36)} up=${upsellIds.length} cross=${crossSellIds.length}`)
        console.log(`         → ${names}`)
      }
      continue
    }

    try {
      const res = await fetch(`${conn.baseUrl}/wp-json/wc/v3/products/${p.id}`, {
        method: 'POST',
        headers: { ...H, 'Content-Type': 'application/json' },
        body: JSON.stringify({ upsell_ids: upsellIds, cross_sell_ids: crossSellIds }),
        signal: AbortSignal.timeout(30000),
      })
      if (!res.ok) throw new Error(`POST ${res.status}`)
      changed++
      consecutiveFailures = 0
      if (changed % 100 === 0) console.log(`${tag} ✅ ${changed} products updated`)
    } catch (err) {
      failed++
      consecutiveFailures++
      console.error(`${tag} ❌ ${p.name.slice(0, 40)}: ${(err as Error).message}`)
      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        console.error(`\n🛑 Lagatar ${MAX_CONSECUTIVE_FAILURES} nakaamiyan — origin ka masla. Ruk rahe hain.`)
        console.error('   Wahi command dobara chalayein, jo ho chuka wo chhod kar aage barhega.\n')
        break
      }
    }

    if (PACING_MS > 0 && i < targets.length - 1) {
      await new Promise(r => setTimeout(r, PACING_MS))
    }
  }

  console.log(`\n=== ${LIVE ? 'MUKAMMAL' : 'DRY RUN MUKAMMAL'} ===`)
  console.log(`  ${LIVE ? 'Update hue' : 'Update honge'} : ${changed}`)
  console.log(`  Pehle se theek      : ${unchanged}`)
  console.log(`  Koi match nahi mila : ${noMatch}`)
  if (failed) console.log(`  Nakaam              : ${failed}`)

  if (!LIVE && changed > 0) {
    console.log('\n⚠️  Ye dry run tha — WooCommerce par kuch nahi badla.')
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
