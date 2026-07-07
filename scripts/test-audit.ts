import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { runAudit } from '../lib/audit/runner'

async function main() {
  console.log('🔍 Starting SMK audit (100 pages sample for first test)...')
  const start = Date.now()
  const result = await runAudit({
    siteUrl: 'https://www.smkstore.com',
    sitemapUrl: 'https://www.smkstore.com/sitemap_index.xml',
    clientId: 'cmr6ly1kd0000l4ur3379olx1',
    sampleSize: 100, // test: 100 pages, prod: 500
  })
  const secs = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\nDONE in ${secs}s`)
  console.log(JSON.stringify(result, null, 2))
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })