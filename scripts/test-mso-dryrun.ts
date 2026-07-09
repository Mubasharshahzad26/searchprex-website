// scripts/test-mso-dryrun.ts
// MSO ke ek page ka dry-run test
// Chalane ka tareeka: npx tsx scripts/test-mso-dryrun.ts

import { db } from '../lib/db'
import { withRetry } from '../lib/db-retry'
import { SEOAutopilot } from '../lib/seo-autopilot'

const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd'

// Test URL — MSO ke verified pool se ek acha category page
const TEST_URL = 'https://www.michigansportsoutdoor.com/brand/cold-steel/'
const TEST_KEYWORD = 'cold steel knives'

async function main() {
  console.log('\n=== MSO Dry-Run Test ===\n')

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
    })
  )
  if (!client) throw new Error('MSO client not found')
  if (!client.gscConnections[0]) throw new Error('No GSC connection')
  if (!client.cmsConnections[0]) throw new Error('No CMS connection')
  if (!client.autopilotConfig) throw new Error('No AutopilotConfig')

  const gsc = client.gscConnections[0]
  const cms = client.cmsConnections[0]
  console.log(`      ✅ Client: ${client.companyName}`)
  console.log(`      ✅ GSC: ${gsc.siteUrl}`)
  console.log(`      ✅ CMS: ${cms.baseUrl}`)
  console.log(`      ✅ Config: dryRun=${client.autopilotConfig.dryRunMode}`)

  // 2. AutopilotRun record banao (dashboard mein dikhne ke liye)
  console.log('[2/5] AutopilotRun record create...')
  const run = await withRetry(() =>
    db.autopilotRun.create({
      data: {
        clientId: MSO_CLIENT_ID,
        configId: client.autopilotConfig!.id,
        status: 'running',
        pagesTargeted: 1,
        dryRun: true,
      },
    })
  )
  console.log(`      ✅ Run ID: ${run.id}`)

  // 3. Autopilot instance banao
  console.log('[3/5] Autopilot instance setup...')
  const creds = cms.credentials as any
  const autopilot = new SEOAutopilot(
    {
      clientId: MSO_CLIENT_ID,
      siteUrl: gsc.siteUrl,
      serviceAccountJson: gsc.serviceAccountJson,
      cmsConfig: {
        cmsType: cms.cmsType,
        baseUrl: cms.baseUrl,
        username: creds.username,
        appPassword: creds.appPassword,
      },
      maxPagesPerRun: 1,
      contentTier: 'standard',
      dryRun: true, // ⭐ FORCE dry run
      backlogPagesPerRun: 0,
    },
    'http://localhost:3000/api/generate-suite', // Local dev endpoint
  )
  console.log(`      ✅ Instance ready (dryRun: true)`)
  console.log(`      ⚠️  Ensure dev server chal raha hai: npm run dev`)

  // 4. Direct generation test — SEOAutopilot ka run() method GSC se pages fetch karta hai
  // Ye slow ho sakta hai. Iske bajaye seedha API endpoint hit karke test karte hain.
  console.log('[4/5] Test generation for 1 URL...')
  console.log(`      URL: ${TEST_URL}`)
  console.log(`      Keyword: ${TEST_KEYWORD}`)

  const genRes = await fetch('http://localhost:3000/api/generate-suite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item: TEST_URL,
      contentType: 'Product/Category Page',
      depth: '1000-1500 words (Standard)',
      fieldNotes: `Test content for ${TEST_KEYWORD}. Focus on Cold Steel brand at Michigan Sports Outdoor. Verify: MSO internal links used, no SMK links.`,
      projectData: {
        label: 'Michigan Sports Outdoor',
        domain: 'michigansportsoutdoor.com',
        industry: 'Knives, Hunting, Fishing & Outdoor Gear',
        brands: ['Cold Steel'],
        vertical: 'ecommerce',
      },
    }),
  })

  if (!genRes.ok) {
    throw new Error(`Generation failed: ${genRes.status} — ${await genRes.text()}`)
  }

  const genData = await genRes.json()
  const content = genData?.content ?? genData
  console.log(`      ✅ Content generated!`)
  console.log(`         Word count: ${content?.qualityChecklist?.wordCount ?? 'N/A'}`)
  console.log(`         Focus keyword: ${content?.focusKeyword}`)
  console.log(`         Meta title: ${content?.metaTitle}`)
  console.log(`         Internal links: ${content?.internalLinks?.length ?? 0}`)
  console.log(`         External links: ${content?.externalLinks?.length ?? 0}`)
  console.log(`         FAQs: ${content?.faqs?.length ?? 0}`)

  // 5. DB mein save (dashboard mein aayega)
  console.log('[5/5] Save to DB for dashboard review...')
  await withRetry(() =>
    db.autopilotPage.upsert({
      where: { runId_pageUrl: { runId: run.id, pageUrl: TEST_URL } },
      update: {
        status: 'pending',
        generatedContent: content,
      },
      create: {
        runId: run.id,
        pageUrl: TEST_URL,
        gscImpressions: 0,
        gscClicks: 0,
        status: 'pending',
        generatedContent: content,
      },
    })
  )

  await withRetry(() =>
    db.autopilotRun.update({
      where: { id: run.id },
      data: {
        status: 'success',
        pagesGenerated: 1,
        completedAt: new Date(),
      },
    })
  )

  console.log(`      ✅ Saved to DB (status: pending)`)

  // Verify internal links audit
  console.log('\n=== ✅ SUCCESS — Content Quality Audit ===')
  const links = content?.internalLinks ?? []
  const msoLinks = links.filter((l: any) => l.url?.includes('michigansportsoutdoor'))
  const smkLinks = links.filter((l: any) => l.url?.includes('smkstore'))
  const otherLinks = links.filter(
    (l: any) => !l.url?.includes('michigansportsoutdoor') && !l.url?.includes('smkstore'),
  )

  console.log(`\nInternal Links Analysis:`)
  console.log(`  ✅ MSO links: ${msoLinks.length}`)
  console.log(`  ${smkLinks.length === 0 ? '✅' : '❌'} SMK links (should be 0): ${smkLinks.length}`)
  console.log(`  ⚠️  Other/unknown: ${otherLinks.length}`)

  if (msoLinks.length > 0) {
    console.log(`\nSample MSO links used:`)
    msoLinks.slice(0, 5).forEach((l: any) => console.log(`  - ${l.anchor} → ${l.url}`))
  }
  if (smkLinks.length > 0) {
    console.log(`\n❌ CROSS-LINKING DETECTED (bug):`)
    smkLinks.forEach((l: any) => console.log(`  - ${l.anchor} → ${l.url}`))
  }

  console.log(`\nRun ID: ${run.id}`)
  console.log(`View in dashboard: http://localhost:3000/dashboard`)
  console.log(`Next: Dashboard mein content review kar, approve karke real publish test karo.\n`)

  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})