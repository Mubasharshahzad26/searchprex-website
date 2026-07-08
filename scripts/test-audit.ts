import { config } from 'dotenv'
config({ path: '.env.local' })
config()
 
import { runAudit } from '../lib/audit/runner'
 
async function main() {
  console.log('🔍 Starting Autopilot Lab audit (test client, 20 pages sample)...')
  const start = Date.now()
 
  const result = await runAudit({
    siteUrl: 'http://autopilot-lab.local',
sitemapUrl: 'http://autopilot-lab.local/wp-sitemap.xml',
    clientId: '9cda8cf5-66ef-4c65-9e2f-f39af1d675b7',
    sampleSize: 20, // 17 WooCommerce products + few pages
  })
 
  const secs = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`\n✅ DONE in ${secs}s`)
  console.log(JSON.stringify(result, null, 2))
}
 
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
 