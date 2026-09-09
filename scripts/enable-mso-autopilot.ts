// scripts/enable-mso-autopilot.ts
//
// MSO Autopilot ko Searchprex par LIVE karta hai aur shared daily limit set
// karta hai (default 1000, dono engines ke liye combined).
//
// Chalane ka tareeka:
//   npx tsx scripts/enable-mso-autopilot.ts            # limit 1000
//   npx tsx scripts/enable-mso-autopilot.ts 1200       # koi aur limit
//   npx tsx scripts/enable-mso-autopilot.ts 1000 --dry # dry-run mode mein arm karo
//
// Limit `mso_cloud_config` mein jaati hai, isliye NicheSEO Pro bhi wahi limit
// padhta hai — dono taraf alag alag set karne ki zaroorat nahi.

import { db } from '../lib/db'
import { withRetry } from '../lib/db-retry'
import { setMsoDailyLimit, getMsoQuota } from '../lib/autopilot/mso-daily-limit'
import { getPoolStatus } from '../lib/gemini-pool'

const MSO_CLIENT_ID = process.env.MSO_CLIENT_ID ?? 'cmrcl8frg0000p8uruwv7j5qd'

//  Ek call mein kitne products. Chhota rakha hai kyunki har cron tick par ek
//  batch chalta hai aur Vercel function ki 300s limit hai — 8 products ~4 min
//  mein aaram se ho jaate hain. Raftaar batch bara karke nahi, cron ko zyada
//  baar chala kar barhaayein.
const MAX_PAGES_PER_RUN = Number(process.env.MSO_MAX_PAGES_PER_RUN ?? 8)

async function main() {
  const args = process.argv.slice(2)
  const dryRunMode = args.includes('--dry')
  const limitArg = args.find((a) => /^\d+$/.test(a))
  const limit = limitArg ? Number(limitArg) : 1000

  console.log('\n=== Searchprex MSO Autopilot Enable ===\n')

  console.log('[1/5] Client aur connections verify kar rahe hain...')
  const client = await withRetry(() =>
    db.client.findUnique({
      where: { id: MSO_CLIENT_ID },
      include: { autopilotConfig: true, cmsConnections: true },
    })
  )
  if (!client) throw new Error(`Client ${MSO_CLIENT_ID} DB mein nahi mila`)
  console.log(`      ✅ Client: ${client.companyName}`)

  const wp = client.cmsConnections.find((c) => c.cmsType === 'wordpress')
  if (!wp) throw new Error('WordPress CMSConnection nahi hai — publish nahi ho sakta')
  console.log(`      ✅ WordPress: ${wp.baseUrl}`)

  console.log('[2/5] Gemini key pool check...')
  const pool = await getPoolStatus()
  if (pool.totalKeys === 0) {
    throw new Error(
      'Koi Gemini key nahi mili. GEMINI_API_KEYS set karein ya Neon ke mso_cloud_config mein keys daalein.'
    )
  }
  console.log(`      ✅ ${pool.totalKeys} keys (${pool.activeKeys} active) — source: ${pool.source}`)

  console.log('[3/5] Shared daily limit set kar rahe hain...')
  const appliedLimit = await setMsoDailyLimit(limit)
  console.log(`      ✅ Limit: ${appliedLimit}/day (NicheSEO Pro + Searchprex combined)`)

  console.log('[4/5] AutopilotConfig arm kar rahe hain...')
  const config = {
    enabled: true,
    automationScore: client.autopilotConfig?.automationScore ?? 'medium',
    maxPagesPerRun: MAX_PAGES_PER_RUN,
    contentTier: client.autopilotConfig?.contentTier ?? 'standard',
    scheduleFrequency: 'hourly',
    dryRunMode,
    //  Live autopilot ka matlab hi yehi hai ke har page ke liye rukna na pare.
    requiresApproval: false,
  }
  const saved = await withRetry(() =>
    db.autopilotConfig.upsert({
      where: { clientId: MSO_CLIENT_ID },
      update: config,
      create: { clientId: MSO_CLIENT_ID, ...config },
    })
  )

  console.log('[5/5] Aaj ka quota...')
  const quota = await getMsoQuota()

  console.log('\n=== ✅ DONE ===')
  console.log(`Enabled:            ${saved.enabled}`)
  console.log(`Dry run:            ${saved.dryRunMode}`)
  console.log(`Max pages per run:  ${saved.maxPagesPerRun}`)
  console.log(`Daily limit:        ${quota.limit} (shared)`)
  console.log(`Published today:    ${quota.publishedToday} (${quota.cycleDateLabel} PKT)`)
  console.log(`Remaining today:    ${quota.remainingToday}`)
  console.log(`Gemini keys:        ${pool.totalKeys}\n`)

  if (saved.dryRunMode) {
    console.log('⚠️  Dry-run mode on hai — kuch bhi publish nahi hoga.')
    console.log('   Live karne ke liye --dry ke baghair dobara chalayein.\n')
  }

  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})
