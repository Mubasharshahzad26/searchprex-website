// scripts/run-mso-live.ts
// MSO ke 3 product pages ka LIVE run — dryRun: false
//
// Ye script content generate karke DB mein "pending" state mein save karta hai.
// Test-mso-dryrun.ts se copy kiya hai — changes:
//   1. dryRun: false (dashboard mein DRY RUN badge NAHI dikhega)
//   2. 3 URLs pe iterate karta hai (1 nahi)
//   3. brands array per URL (generate-suite endpoint ko chahiye — warna 500 error)
//
// Dashboard workflow:
//   1. Ye script chalao
//   2. searchprex.com/autopilot pe jao
//   3. Pending Review widget → Load Pending
//   4. Naye 3 pages dikhen bina DRY RUN badge ke
//   5. Kisi ek pe "Publish now" click → Michigan WordPress pe seedha live
//
// Chalane ka tareeka:
//   Terminal 1:  npm run dev              ← LOCALHOST 3000 chalu ho jaye
//   Terminal 2:  npx tsx scripts/run-mso-live.ts
 
import { db } from '../lib/db'
import { withRetry } from '../lib/db-retry'
 
const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd'
const GENERATION_ENDPOINT = 'http://localhost:3000/api/generate-suite'
 
// 3 real product URLs (wp_posts mein exist karti hain — screenshots se pehchani gayi)
// Har URL ke saath brand bhi hai — generate-suite endpoint ko chahiye
const LIVE_URLS = [
  {
    url: 'https://www.michigansportsoutdoor.com/product/microtech-msi-mini-ram-lok-se-3/',
    keyword: 'Microtech MSI Mini Ram-Lok SE-3',
    brand: 'Microtech',
  },
  {
    url: 'https://www.michigansportsoutdoor.com/product/microtech-msi-mini-ram-lok-se-4/',
    keyword: 'Microtech MSI Mini Ram-Lok SE-4',
    brand: 'Microtech',
  },
  {
    url: 'https://www.michigansportsoutdoor.com/product/qsp-knife-heron-nitro-v-abalone/',
    keyword: 'QSP Heron Nitro-V Abalone Knife',
    brand: 'QSP',
  },
]
 
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
  console.log('\n=== MSO LIVE RUN (dryRun: false) ===')
  console.log('WARNING: Ye run PRODUCTION DB mein LIVE pages create karega.')
  console.log('Publish now click karne ke baad post seedha WordPress pe jayegi.\n')
 
  // Safety check — localhost:3000 chalu hai ya nahi
  console.log('[0/5] Localhost:3000 check...')
  const isRunning = await checkLocalServer()
  if (!isRunning) {
    console.error('\nERROR: localhost:3000 respond nahi kar raha.')
    console.error('Doosri terminal mein "npm run dev" chala, phir ye script chala.\n')
    process.exit(1)
  }
  console.log('      OK — dev server chal raha hai\n')
 
  // 1. Client + configs fetch
  console.log('[1/5] Prerequisites verify...')
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
  console.log(`      GSC:    ${client.gscConnections[0].siteUrl}`)
  console.log(`      CMS:    ${client.cmsConnections[0].baseUrl}\n`)
 
  // 2. AutopilotRun record — dryRun: FALSE
  console.log('[2/5] AutopilotRun create (dryRun: false)...')
  const run = await withRetry(() =>
    db.autopilotRun.create({
      data: {
        clientId: MSO_CLIENT_ID,
        configId: client.autopilotConfig!.id,
        status: 'running',
        pagesTargeted: LIVE_URLS.length,
        dryRun: false, // ← LIVE mode — approve/route.ts dry-run guard trigger nahi hoga
      },
    }),
  )
  console.log(`      Run ID: ${run.id}`)
  console.log(`      dryRun: false ← LIVE MODE\n`)
 
  // 3. Generate content for each URL
  console.log(`[3/5] Generate content for ${LIVE_URLS.length} URLs...`)
  let successCount = 0
  let failCount = 0
 
  for (let i = 0; i < LIVE_URLS.length; i++) {
    const { url, keyword, brand } = LIVE_URLS[i]
    console.log(`\n  [${i + 1}/${LIVE_URLS.length}] ${url}`)
    console.log(`         Keyword: ${keyword}`)
    console.log(`         Brand:   ${brand}`)
 
    try {
      const genRes = await fetch(GENERATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: url,
          contentType: 'Product/Category Page',
          depth: '1000-1500 words (Standard)',
          fieldNotes: `Content for ${keyword} at Michigan Sports Outdoor. Focus on product specs, buyer intent signals, and MSO internal links only. NO SMK links, NO fabricated claims.`,
          projectData: {
            label: 'Michigan Sports Outdoor',
            domain: 'michigansportsoutdoor.com',
            industry: 'Knives, Hunting, Fishing & Outdoor Gear',
            brands: [brand], // ← THIS FIXES THE 500 ERROR
            vertical: 'ecommerce',
          },
        }),
      })
 
      if (!genRes.ok) {
        throw new Error(`Generation failed: HTTP ${genRes.status} — ${await genRes.text()}`)
      }
 
      const genData = await genRes.json()
      const content = genData?.content ?? genData
 
      // Save to DB — status pending, appears in Pending Review widget
      await withRetry(() =>
        db.autopilotPage.upsert({
          where: { runId_pageUrl: { runId: run.id, pageUrl: url } },
          update: {
            status: 'pending',
            generatedContent: content,
          },
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
      const internalLinks = content?.internalLinks?.length ?? 0
      const faqs = content?.faqs?.length ?? 0
      console.log(`         OK — words: ${wordCount}, internal links: ${internalLinks}, FAQs: ${faqs}`)
 
      // Internal link leak audit
      const links = content?.internalLinks ?? []
      const smkLeaks = links.filter((l: any) => l.url?.includes('smkstore'))
      if (smkLeaks.length > 0) {
        console.log(`         WARNING: ${smkLeaks.length} SMK links leaked in MSO content — review needed`)
      }
 
      successCount++
    } catch (err) {
      console.log(`         FAILED: ${err instanceof Error ? err.message : 'unknown'}`)
      failCount++
    }
  }
 
  // 4. Finalize the run
  console.log('\n[4/5] Finalize AutopilotRun...')
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
  console.log(`      Status: ${successCount > 0 ? 'success' : 'failed'}\n`)
 
  // 5. Summary + next steps
  console.log('[5/5] Summary\n')
  console.log('=== RUN COMPLETE ===')
  console.log(`   Total:   ${LIVE_URLS.length}`)
  console.log(`   Success: ${successCount}`)
  console.log(`   Failed:  ${failCount}`)
  console.log('')
  console.log('Next steps to test end-to-end publish:')
  console.log('   1. Open searchprex.com/autopilot')
  console.log('   2. Pending Review widget → Load Pending')
  console.log(`   3. Naye ${successCount} pages dikhen — DRY RUN badge nahi hoga`)
  console.log('   4. Kisi ek pe "Publish now" click kar')
  console.log('   5. DevTools Network tab — approve request ka Response dekh')
  console.log('   6. Expected: action="approved_and_published"')
  console.log('   7. Michigan WordPress admin — post live dikhna chahiye')
  console.log('')
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
 