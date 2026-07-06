import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { submitUrl, getIndexingStats } from '../lib/indexing'

async function main() {
  console.log('1. Submitting homepage to Google Indexing API...')
  const result = await submitUrl('https://www.smkstore.com/', 'backlog')
  console.log('Result:', result)

  console.log('2. Stats:')
  const stats = await getIndexingStats()
  console.log(JSON.stringify(stats.accounts, null, 2))
  console.log('Submitted today:', stats.submittedToday)
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })