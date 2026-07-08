import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { generateRoadmap } from '../lib/roadmap/generator'

async function main() {
  const auditRunId = process.env.MICHIGAN_AUDIT_RUN_ID || 'cmrclboy30000y0uri18rsm44'

  console.log('🎯 Generating AI Roadmap for Michigan Sports Outdoor...')
  const start = Date.now()

  const result = await generateRoadmap({
    auditRunId,
    clientId: 'cmrcl8frg0000p8uruwv7j5qd',
    industry: 'ecommerce_woocommerce',
  })

  const secs = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n✅ DONE in ${secs}s`)
  console.log('Roadmap ID:', result.id)
  console.log('\n═══ EXECUTIVE SUMMARY ═══')
  console.log(result.plan.executiveSummary)
  console.log('\n═══ HEALTH SCORE ═══')
  console.log(`Overall: ${result.plan.healthScore}/100`)
  console.log('Breakdown:', JSON.stringify(result.plan.healthBreakdown, null, 2))

  for (const m of result.plan.months) {
    console.log(`\n═══ MONTH ${m.month}: ${m.theme} ═══`)
    console.log(`Focus: ${m.focus}`)
    for (const t of m.tasks) {
      const emoji =
        t.category === 'autopilot' ? '✨' :
        t.category === 'manual_dev' ? '👤' :
        t.category === 'manual_seo' ? '🌐' : '🚀'
      console.log(`  ${emoji} [${t.priority}] ${t.title} (${t.effort}/${t.impact}, ${t.affectedPages} pages)`)
      console.log(`     → ${t.expectedOutcome}`)
    }
  }
  console.log('\n═══ EXPECTED METRICS ═══')
  console.log(JSON.stringify(result.plan.expectedMetrics, null, 2))
  console.log('\n═══ INVESTMENT ═══')
  console.log(JSON.stringify(result.plan.investmentEstimation, null, 2))
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })