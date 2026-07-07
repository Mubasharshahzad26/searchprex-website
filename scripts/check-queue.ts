import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'

async function main() {
  const byStatus = await db.indexingQueue.groupBy({
    by: ['status'],
    _count: true,
  })
  console.log('Queue by status:', byStatus)

  const sample = await db.indexingQueue.findMany({
    where: { status: { in: ['queued', 'submitted'] } },
    orderBy: [{ priority: 'asc' }],
    take: 3,
    select: { url: true, status: true, priority: true },
  })
  console.log('Top 3 eligible:', sample)
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })