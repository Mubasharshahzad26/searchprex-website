import { config } from 'dotenv'
config({ path: '.env.local' })
import { db } from '../lib/db'

async function check() {
  const clients = await db.client.findMany()
  console.log('CLIENTS:', JSON.stringify(clients, null, 2))

  const configs = await db.autopilotConfig.findMany()
  console.log('CONFIGS:', JSON.stringify(configs, null, 2))

  const gsc = await db.gSCConnection.findMany({ select: { id: true, clientId: true, siteUrl: true, syncStatus: true } })
  console.log('GSC:', JSON.stringify(gsc, null, 2))

  const runs = await db.autopilotRun.findMany()
  console.log('RUNS:', JSON.stringify(runs, null, 2))
}

check()
  .catch(console.error)
  .finally(() => process.exit(0))