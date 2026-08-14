// One-time script to pull MSO GSC page metrics and store in PageMetrics table
// Run: npx tsx scripts/pull-mso-metrics.ts

import { db } from '../lib/db'
import { fetchGSCPageMetrics } from '../lib/gsc-bulk-fetcher'

const CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd'

async function main() {
  console.log('🎯 MSO GSC Metrics Pull — Starting...\n')

  // 1. GSC connection nikaalo
  const gsc = await db.gSCConnection.findFirst({
    where: { clientId: CLIENT_ID },
  })
  if (!gsc) throw new Error('MSO GSC connection not found')

  console.log(`✓ GSC Connection: ${gsc.siteUrl}`)
  console.log(`✓ Status: ${gsc.syncStatus}\n`)

  // 2. Pull metrics from GSC (last 90 days)
  console.log('📊 Fetching page metrics from GSC (last 90 days)...')
  console.log('   Ye 1-3 min lag sakta hai depending on data volume...\n')

  const startTime = Date.now()
  const metrics = await fetchGSCPageMetrics(
    gsc.siteUrl,
    gsc.serviceAccountJson,
    90,
  )
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)

  console.log(`\n✓ Fetched ${metrics.length} URLs in ${elapsed}s`)

  if (metrics.length === 0) {
    console.log('⚠️  No metrics returned from GSC. Check connection.')
    return
  }

  // 3. Data quality summary
  const withImpressions = metrics.filter(m => m.impressions > 0).length
  const withClicks = metrics.filter(m => m.clicks > 0).length
  const positions = metrics.filter(m => m.position > 0).map(m => m.position)
  const avgPosition = positions.length > 0
    ? (positions.reduce((a, b) => a + b, 0) / positions.length).toFixed(1)
    : 'N/A'

  console.log('\n📈 Data Summary:')
  console.log(`   URLs with impressions:  ${withImpressions}`)
  console.log(`   URLs with clicks:       ${withClicks}`)
  console.log(`   Average position:       ${avgPosition}`)

  // 4. Distribution by position bracket
  const bracket1_10 = metrics.filter(m => m.position >= 1 && m.position <= 10).length
  const bracket11_20 = metrics.filter(m => m.position >= 11 && m.position <= 20).length
  const bracket21_50 = metrics.filter(m => m.position >= 21 && m.position <= 50).length
  const bracket51plus = metrics.filter(m => m.position > 50).length

  console.log('\n🎯 Position Distribution:')
  console.log(`   Position 1-10   (winning):     ${bracket1_10}`)
  console.log(`   Position 11-20  (opportunity): ${bracket11_20}`)
  console.log(`   Position 21-50  (weak):        ${bracket21_50}`)
  console.log(`   Position 51+    (very weak):   ${bracket51plus}`)

  // 5. Top 10 by impressions (samples)
  const top10 = [...metrics]
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 10)

  console.log('\n🏆 Top 10 by Impressions:')
  top10.forEach((m, i) => {
    console.log(`   ${i + 1}. Pos ${m.position.toFixed(1)} | ${m.impressions} imp | ${m.clicks} clicks | ${m.url}`)
  })

  // 6. Store in DB (upsert into PageMetrics table)
  console.log('\n💾 Storing in DB...')

  const pageMetricsDb = (db as any).pageMetric ?? (db as any).pageMetrics
  if (!pageMetricsDb) {
    throw new Error('No PageMetric/PageMetrics model found on Prisma client. Check your Prisma schema model name.')
  }

  let stored = 0
  let failed = 0

  for (const m of metrics) {
    try {
      await pageMetricsDb.upsert({
        where: { url: m.url },
        update: {
          impressions: Math.round(m.impressions),
          clicks: Math.round(m.clicks),
          avgPosition: m.position,
          ctr: m.ctr,
          lastFetched: new Date(),
        },
        create: {
          url: m.url,
          clientId: CLIENT_ID,
          impressions: Math.round(m.impressions),
          clicks: Math.round(m.clicks),
          avgPosition: m.position,
          ctr: m.ctr,
          lastFetched: new Date(),
        },
      })
      stored++
      if (stored % 500 === 0) {
        console.log(`   ${stored}/${metrics.length} stored...`)
      }
    } catch (err) {
      failed++
      console.error(`   Failed for ${m.url}: ${(err as Error).message.slice(0, 80)}`)
    }
  }

  console.log(`\n✅ Complete!`)
  console.log(`   Stored:  ${stored}`)
  console.log(`   Failed:  ${failed}`)
  console.log(`   Total:   ${metrics.length}`)
}

main()
  .catch(err => {
    console.error('❌ Fatal error:', err)
    process.exit(1)
  })
  .finally(() => process.exit(0))