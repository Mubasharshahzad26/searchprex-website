import { config } from 'dotenv'
config({ path: '.env.local' })
import { db } from '../lib/db'
import { SEOAutopilot } from '../lib/seo-autopilot'

async function testRun() {
  const clientId = 'cmr6ly1kd0000l4ur3379olx1'

  console.log('1. Config fetch...')
  const cfg = await db.autopilotConfig.findUnique({ where: { clientId } })
  if (!cfg) throw new Error('Config not found')

  console.log('2. GSC + CMS fetch...')
  const gsc = await db.gSCConnection.findFirst({ where: { clientId } })
  const cms = await db.cMSConnection.findFirst({ where: { clientId } })
  if (!gsc || !cms) throw new Error('Missing GSC/CMS')

  console.log('3. Run record create...')
  const run = await db.autopilotRun.create({
    data: {
      clientId,
      configId: cfg.id,
      status: 'running',
      pagesTargeted: cfg.maxPagesPerRun,
      dryRun: true,
    },
  })
  console.log(`   Run ID: ${run.id}`)

  console.log('4. Autopilot run (GSC fetch + generation)...')
  const autopilot = new SEOAutopilot(
    {
      clientId,
      siteUrl: gsc.siteUrl,
      serviceAccountJson: gsc.serviceAccountJson,
      cmsConfig: { cmsType: cms.cmsType, baseUrl: cms.baseUrl, ...(cms.credentials as any) },
      maxPagesPerRun: 2, // test: sirf 2 pages
      contentTier: cfg.contentTier,
      dryRun: true,
      backlogPagesPerRun: 3,
    },
    'https://www.searchprex.com/api/generate-suite',
  )
  const result = await autopilot.run(run.id)
  console.log('   Result:', JSON.stringify(result, null, 2))

  console.log('5. Run record update...')
  await db.autopilotRun.update({
    where: { id: run.id },
    data: {
      status: result.status,
      pagesGenerated: result.pagesGenerated,
      pagesPublished: result.pagesPublished,
      completedAt: new Date(),
      results: result as any,
    },
  })
  console.log('\nDONE! Sab steps chal gaye.')
}

testRun().catch((e) => {
  console.error('\nCRASH YAHAN:', e)
  process.exit(1)
})