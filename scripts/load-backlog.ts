import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'
import { readFileSync } from 'fs'

const CLIENT_ID = 'cmr6ly1kd0000l4ur3379olx1' // SMK Store
const CSV_FILE = 'smk-backlog-clean.csv' // project root mein rakho

async function main() {
  const lines = readFileSync(CSV_FILE, 'utf-8').split('\n').slice(1) // header skip
  const rows = lines
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const [url, priority] = l.split(',')
      return { url: url.trim(), priority: parseInt(priority) || 2 }
    })
    .filter((r) => r.url.startsWith('https://www.smkstore.com/'))

  console.log(`Loading ${rows.length} URLs into queue...`)

  let added = 0
  // Batch insert — createMany with skipDuplicates
  const chunkSize = 500
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize).map((r) => ({
      url: r.url,
      clientId: CLIENT_ID,
      priority: r.priority,
      status: 'queued',
    }))
    const result = await db.indexingQueue.createMany({
      data: chunk,
      skipDuplicates: true,
    })
    added += result.count
    console.log(`  ${Math.min(i + chunkSize, rows.length)}/${rows.length} processed...`)
  }

  const queued = await db.indexingQueue.count({ where: { status: 'queued' } })
  console.log(`DONE! Added: ${added} | Total queued: ${queued}`)
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })