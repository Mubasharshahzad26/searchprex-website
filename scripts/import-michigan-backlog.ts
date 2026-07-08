import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'
import { fetchNotIndexedCandidates } from '../lib/gsc-bulk-fetcher'

const MICHIGAN_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd'
const MICHIGAN_SITE_URL = 'https://www.michigansportsoutdoor.com/'
const MICHIGAN_SITEMAP = 'https://www.michigansportsoutdoor.com/sitemap_index.xml'

async function main() {
  console.log('🎯 Michigan Backlog Import — Approach A (Sitemap - GSC diff)')

  // GSC connection se service account nikaalo
  const gsc = await db.gSCConnection.findFirst({
    where: { clientId: MICHIGAN_CLIENT_ID },
  })
  if (!gsc) throw new Error('Michigan GSC connection not found')

  const result = await fetchNotIndexedCandidates(
    MICHIGAN_SITE_URL,
    MICHIGAN_SITEMAP,
    gsc.serviceAccountJson,
  )

  console.log(`\n📊 Analysis:`)
  console.log(`  Sitemap total:       ${result.sitemapTotal}`)
  console.log(`  GSC visible (90d):   ${result.gscVisible}`)
  console.log(`  Not-indexed candidates: ${result.candidates.length}`)

  if (result.candidates.length === 0) {
    console.log('\n✓ Sab pages GSC mein visible hain — kuch import nahe karna!')
    return
  }

  // Priority tiers
  function tier(u: string): number {
    if (u.includes('/manufacturer/')) return 1
    if (u.includes('/category/')) return 1
    if (u.includes('/blog/')) return 1
    if (u.match(/\.com\/?$/)) return 1
    return 2
  }

  const rows = result.candidates.map((url) => ({
    url,
    clientId: MICHIGAN_CLIENT_ID,
    priority: tier(url),
    status: 'queued',
  }))

  console.log(`\n📥 Loading ${rows.length} URLs into Michigan queue...`)
  let added = 0
  const chunkSize = 500
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    const inserted = await db.indexingQueue.createMany({
      data: chunk,
      skipDuplicates: true,
    })
    added += inserted.count
    console.log(`  ${Math.min(i + chunkSize, rows.length)}/${rows.length} processed...`)
  }

  const queued = await db.indexingQueue.count({
    where: { clientId: MICHIGAN_CLIENT_ID, status: 'queued' },
  })
  console.log(`\n✅ DONE! Added: ${added} | Michigan queued total: ${queued}`)

  const priorityBreakdown = await db.indexingQueue.groupBy({
    by: ['priority'],
    where: { clientId: MICHIGAN_CLIENT_ID, status: 'queued' },
    _count: true,
  })
  console.log('\n📋 Priority breakdown:')
  for (const p of priorityBreakdown) {
    console.log(`  Priority ${p.priority}: ${p._count}`)
  }
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })