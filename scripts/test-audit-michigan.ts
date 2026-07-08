import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { runAudit } from '../lib/audit/runner'

async function main() {
  console.log('🔍 Starting Michigan Sports Outdoor audit (100 pages sample)...')
  const start = Date.now()
  const result = await runAudit({
    siteUrl: 'https://www.michigansportsoutdoor.com',
    sitemapUrl: 'https://www.michigansportsoutdoor.com/sitemap_index.xml',
    clientId: 'cmrcl8frg0000p8uruwv7j5qd',
    sampleSize: 100,
  })
  const secs = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n✅ DONE in ${secs}s`)
  console.log(JSON.stringify(result, null, 2))
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })