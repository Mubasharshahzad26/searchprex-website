import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'
import { categorizeAuditRun } from '../lib/audit/categorize'

const RUN_ID = 'cmr9y0e7n0000g0ur39vkua8r' // wo hi audit runId
const CLIENT_ID = 'cmr6ly1kd0000l4ur3379olx1'

async function main() {
  const gsc = await db.gSCConnection.findFirst({ where: { clientId: CLIENT_ID } })
  if (!gsc) throw new Error('GSC not found')

  console.log('🔍 Categorizing audit run:', RUN_ID)
  const counts = await categorizeAuditRun(RUN_ID, {
    siteUrl: gsc.siteUrl,
    serviceAccountJson: gsc.serviceAccountJson,
  })

  console.log('\n📊 3 Lists Generated:')
  console.log(`  Content needs improvement: ${counts.content_needs_improvement}`)
  console.log(`  Indexed underperformers:   ${counts.indexed_underperformer}`)
  console.log(`  Not indexed:               ${counts.not_indexed}`)
  console.log(`  TOTAL:                     ${counts.total}`)
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })