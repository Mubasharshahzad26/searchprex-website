// scripts/run-mso-batch.ts
// SCALABLE Michigan pipeline — reads N URLs from IndexingQueue backlog automatically
//
// Usage:
//   Terminal 1:  npm run dev
//   Terminal 2:
//     npx tsx scripts/run-mso-batch.ts           ← default 10 URLs
//     npx tsx scripts/run-mso-batch.ts 15        ← 15 URLs
//     npx tsx scripts/run-mso-batch.ts 25        ← 25 URLs
//
// SAFETY: Max 50 URLs per run (hard cap).
 
import { db } from '../lib/db'
import { withRetry } from '../lib/db-retry'
 
const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd'
const GENERATION_ENDPOINT = 'http://localhost:3000/api/generate-suite'
const MAX_LIMIT = 50
 
// Michigan carries these brands — for auto-extraction from URL slugs
const KNOWN_BRANDS: Record<string, string> = {
  microtech: 'Microtech',
  benchmade: 'Benchmade',
  spyderco: 'Spyderco',
  'cold-steel': 'Cold Steel',
  coldsteel: 'Cold Steel',
  qsp: 'QSP',
  'bear-ops': 'Bear Ops',
  bearops: 'Bear Ops',
  'boker-plus': 'Boker Plus',
  boker: 'Boker',
  'extrema-ratio': 'Extrema Ratio',
  extrema: 'Extrema Ratio',
  'zero-tolerance': 'Zero Tolerance',
  zerotolerance: 'Zero Tolerance',
  kizer: 'Kizer',
  buck: 'Buck Knives',
  'ka-bar': 'KA-BAR',
  kabar: 'KA-BAR',
  gerber: 'Gerber',
  crkt: 'CRKT',
  sog: 'SOG',
  case: 'Case Knives',
  demko: 'Demko',
  we: 'WE Knife',
  civivi: 'Civivi',
}
 
function extractBrandAndKeyword(url: string): { keyword: string; brand: string } | null {
  const slug = url.split('/').filter(Boolean).pop() || ''
  const slugLower = slug.toLowerCase()
 
  for (const [brandSlug, brandName] of Object.entries(KNOWN_BRANDS)) {
    if (slugLower.startsWith(brandSlug + '-') || slugLower === brandSlug) {
      const keyword = slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      return { keyword, brand: brandName }
    }
  }
 
  return null
}
 
async function checkLocalServer(): Promise<boolean> {
  try {
    const res = await fetch('http://localhost:3000/api/health', {
      signal: AbortSignal.timeout(3000),
    })
    return res.ok
  } catch {
    return false
  }
}
 
async function main() {
  const argLimit = parseInt(process.argv[2], 10)
  const LIMIT = !isNaN(argLimit) && argLimit > 0 ? argLimit : 10
 
  if (LIMIT > MAX_LIMIT) {
    console.error(`\nERROR: Safety cap — max ${MAX_LIMIT} URLs per run (you passed ${LIMIT}).`)
    console.error('Split into multiple runs if you need more.\n')
    process.exit(1)
  }
 
  console.log(`\n=== MSO BATCH RUN — ${LIMIT} URLs (dryRun: false) ===`)
  console.log('WARNING: Ye run PRODUCTION mein LIVE pages create karega.')
  console.log('Publish click karne pe seedha WordPress pe jayegi.\n')
 
  console.log('[0/6] Localhost:3000 check...')
  const isRunning = await checkLocalServer()
  if (!isRunning) {
    console.error('\nERROR: localhost:3000 respond nahi kar raha.')
    console.error('Doosri terminal mein "npm run dev" chala, phir ye script chala.\n')
    process.exit(1)
  }
  console.log('      OK — dev server chal raha hai\n')
 
  console.log('[1/6] Client prerequisites verify...')
  const client = await withRetry(() =>
    db.client.findUnique({
      where: { id: MSO_CLIENT_ID },
      include: {
        gscConnections: true,
        cmsConnections: true,
        autopilotConfig: true,
      },
    }),
  )
  if (!client) throw new Error('MSO client not found in DB')
  if (!client.gscConnections[0]) throw new Error('No GSC connection for MSO')
  if (!client.cmsConnections[0]) throw new Error('No CMS connection for MSO')
  if (!client.autopilotConfig) throw new Error('No AutopilotConfig for MSO')
 
  console.log(`      Client: ${client.companyName}`)
  console.log(`      CMS:    ${client.cmsConnections[0].baseUrl}\n`)
 
  console.log(`[2/6] Fetching ${LIMIT} product URLs from IndexingQueue...`)
  const queueEntries = await withRetry(() =>
    db.indexingQueue.findMany({
      where: {
        status: 'queued',
        url: { contains: 'michigansportsoutdoor.com/product/' },
      },
      orderBy: { createdAt: 'asc' },
      take: LIMIT * 3,
    }),
  )
 
  if (queueEntries.length === 0) {
    console.error('\nERROR: No product URLs found in IndexingQueue for Michigan.')
    console.error('Backlog may be empty, or filter needs adjustment.\n')
    process.exit(1)
  }
 
  const validUrls: Array<{ url: string; keyword: string; brand: string }> = []
  const alreadyDoneUrls = new Set<string>()
 
  const existing = await withRetry(() =>
    db.autopilotPage.findMany({
      where: {
        pageUrl: { in: queueEntries.map((e) => e.url) },
        status: { in: ['published', 'approved', 'pending'] },
      },
      select: { pageUrl: true },
    }),
  )
  existing.forEach((e) => alreadyDoneUrls.add(e.pageUrl))
 
  for (const entry of queueEntries) {
    if (validUrls.length >= LIMIT) break
    if (alreadyDoneUrls.has(entry.url)) continue
 
    const extracted = extractBrandAndKeyword(entry.url)
    if (!extracted) continue
 
    validUrls.push({ url: entry.url, ...extracted })
  }
 
  if (validUrls.length === 0) {
    console.error('\nERROR: No valid URLs after filtering.')
    console.error('Reasons: no recognized brand in URL slug, or all already processed.\n')
    process.exit(1)
  }
 
  console.log(`      ${queueEntries.length} available in queue`)
  console.log(`      ${alreadyDoneUrls.size} already processed (skipping)`)
  console.log(`      ${validUrls.length} valid URLs ready to process\n`)
 
  console.log('[3/6] Creating AutopilotRun (dryRun: false)...')
  const run = await withRetry(() =>
    db.autopilotRun.create({
      data: {
        clientId: MSO_CLIENT_ID,
        configId: client.autopilotConfig!.id,
        status: 'running',
        pagesTargeted: validUrls.length,
        dryRun: false,
      },
    }),
  )
  console.log(`      Run ID: ${run.id}\n`)
 
  console.log(`[4/6] Generating content for ${validUrls.length} URLs...`)
  let successCount = 0
  let failCount = 0
  const failedItems: Array<{ url: string; reason: string }> = []
  const startTime = Date.now()
 
  for (let i = 0; i < validUrls.length; i++) {
    const { url, keyword, brand } = validUrls[i]
 
    console.log(`\n  [${i + 1}/${validUrls.length}] ${url}`)
    console.log(`         Brand:   ${brand}`)
    console.log(`         Keyword: ${keyword}`)
 
    try {
      const genRes = await fetch(GENERATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: url,
          contentType: 'Product/Category Page',
          depth: '1000-1500 words (Standard)',
          fieldNotes: `Content for ${keyword} at Michigan Sports Outdoor. Focus on product specs, buyer intent signals, MSO internal links only. NO SMK links, NO fabricated claims.`,
          projectData: {
            label: 'Michigan Sports Outdoor',
            domain: 'michigansportsoutdoor.com',
            industry: 'Knives, Hunting, Fishing & Outdoor Gear',
            brands: [brand],
            vertical: 'ecommerce',
          },
        }),
      })
 
      if (!genRes.ok) {
        throw new Error(`HTTP ${genRes.status}: ${(await genRes.text()).slice(0, 150)}`)
      }
 
      const genData = await genRes.json()
      const content = genData?.content ?? genData
 
      await withRetry(() =>
        db.autopilotPage.upsert({
          where: { runId_pageUrl: { runId: run.id, pageUrl: url } },
          update: { status: 'pending', generatedContent: content },
          create: {
            runId: run.id,
            pageUrl: url,
            gscImpressions: 0,
            gscClicks: 0,
            status: 'pending',
            generatedContent: content,
          },
        }),
      )
 
      const wordCount = content?.qualityChecklist?.wordCount ?? 'N/A'
      const links = content?.internalLinks?.length ?? 0
      const faqs = content?.faqs?.length ?? 0
      console.log(`         OK — words: ${wordCount}, links: ${links}, FAQs: ${faqs}`)
      successCount++
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown'
      const truncated = msg.slice(0, 100)
      console.log(`         FAILED: ${truncated}`)
      failedItems.push({ url, reason: truncated })
      failCount++
    }
  }
 
  console.log('\n[5/6] Finalize AutopilotRun...')
  await withRetry(() =>
    db.autopilotRun.update({
      where: { id: run.id },
      data: {
        status: successCount > 0 ? 'success' : 'failed',
        pagesGenerated: successCount,
        completedAt: new Date(),
      },
    }),
  )
 
  const durationMin = ((Date.now() - startTime) / 60000).toFixed(1)
 
  console.log('\n[6/6] Summary\n')
  console.log('=== RUN COMPLETE ===')
  console.log(`   Total attempted:   ${validUrls.length}`)
  console.log(`   Successful:        ${successCount}`)
  console.log(`   Failed:            ${failCount}`)
  console.log(`   Duration:          ${durationMin} min`)
  console.log(`   Success rate:      ${Math.round((successCount / validUrls.length) * 100)}%`)
 
  if (failCount > 0) {
    console.log('\n   Failed URLs (retry later — usually Gemini JSON parse issue):')
    failedItems.slice(0, 5).forEach((f) => {
      console.log(`     - ${f.url}`)
      console.log(`       ${f.reason}`)
    })
    if (failedItems.length > 5) {
      console.log(`     ... and ${failedItems.length - 5} more`)
    }
  }
 
  // ── NEXT STEPS output — using string concatenation to avoid backtick escape hell ──
  console.log('\n============================')
  console.log('NEXT STEPS TO PUBLISH:')
  console.log('============================\n')
 
  console.log('Option A: Dashboard (recommended for review)')
  console.log('   1. Open https://www.searchprex.com/autopilot')
  console.log('   2. Pending Review widget -> Load Pending')
  console.log(`   3. ${successCount} new pages ready (no DRY RUN badge)`)
  console.log('   4. On each: Approve -> Publish now\n')
 
  console.log('Option B: Bulk publish (faster, less control)')
  console.log('   Step 1 - Neon SQL Editor mein chalao:')
  console.log('')
  console.log('   UPDATE "AutopilotPage"')
  console.log("   SET status = 'approved', \"publishAt\" = NOW()")
  console.log(`   WHERE "runId" = '${run.id}' AND status = 'pending';`)
  console.log('')
  console.log('   Step 2 - PowerShell mein publisher trigger karo:')
  console.log('')
  console.log('   Invoke-RestMethod ' +
    '-Uri "https://www.searchprex.com/api/autopilot/publish" ' +
    '-Method POST ' +
    '-Headers @{Authorization="Bearer $env:CRON_SECRET"} ' +
    '-ContentType "application/json" ' +
    '-Body \'{"mode":"due"}\'')
  console.log('')
 
  console.log('============================')
  console.log(`RUN ID (save karo): ${run.id}`)
  console.log('============================\n')
}
 
main()
  .catch((err) => {
    console.error('\nSCRIPT FAILED:', err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
    process.exit(0)
  })
 