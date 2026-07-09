// scripts/add-mso-config.ts
// MSO ke liye AutopilotConfig add karta hai
// Chalane ka tareeka: npx tsx scripts/add-mso-config.ts

import { db } from '../lib/db'
import { withRetry } from '../lib/db-retry'

const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd' // Michigan Sports Outdoor

const CONFIG = {
  enabled: true,
  automationScore: 'medium',
  maxPagesPerRun: 5,
  contentTier: 'standard',
  scheduleFrequency: 'daily',
  dryRunMode: true,
  requiresApproval: true,
}

async function main() {
  console.log('\n=== MSO AutopilotConfig Setup ===\n')

  console.log('[1/3] Client verify kar rahe hain...')
  const client = await withRetry(() =>
    db.client.findUnique({
      where: { id: MSO_CLIENT_ID },
      include: { autopilotConfig: true, gscConnections: true, cmsConnections: true },
    })
  )
  if (!client) throw new Error(`Client ${MSO_CLIENT_ID} DB mein nahi mila`)
  console.log(`      ✅ Client: ${client.companyName}`)

  if (client.gscConnections.length === 0) throw new Error('GSCConnection nahi hai')
  console.log(`      ✅ GSCConnection: ${client.gscConnections[0].siteUrl}`)

  if (client.cmsConnections.length === 0) throw new Error('CMSConnection nahi hai')
  console.log(`      ✅ CMSConnection: ${client.cmsConnections[0].baseUrl}`)

  console.log('[2/3] Existing config check...')
  if (client.autopilotConfig) {
    console.log(`      ⚠️  Config already exists. Update karega.`)
  } else {
    console.log(`      ✅ Naya banega.`)
  }

  console.log('[3/3] AutopilotConfig save kar rahe hain...')
  const saved = await withRetry(() =>
    db.autopilotConfig.upsert({
      where: { clientId: MSO_CLIENT_ID },
      update: CONFIG,
      create: { clientId: MSO_CLIENT_ID, ...CONFIG },
    })
  )

  console.log('\n=== ✅ SUCCESS ===')
  console.log(`Config ID:           ${saved.id}`)
  console.log(`Enabled:             ${saved.enabled}`)
  console.log(`Automation Score:    ${saved.automationScore}`)
  console.log(`Max Pages Per Run:   ${saved.maxPagesPerRun}`)
  console.log(`Content Tier:        ${saved.contentTier}`)
  console.log(`Schedule Frequency:  ${saved.scheduleFrequency}`)
  console.log(`Dry Run Mode:        ${saved.dryRunMode}`)
  console.log(`Requires Approval:   ${saved.requiresApproval}\n`)

  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})