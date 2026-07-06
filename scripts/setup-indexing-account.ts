import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'

const CLIENT_ID = 'cmr6ly1kd0000l4ur3379olx1' // SMK Store

async function main() {
  // GSC connection se wahi service account JSON reuse karo
  const gsc = await db.gSCConnection.findFirst({ where: { clientId: CLIENT_ID } })
  if (!gsc) throw new Error('GSC connection not found for SMK')

  const creds = JSON.parse(gsc.serviceAccountJson)
  console.log('Found service account:', creds.client_email)

  const account = await db.indexingAccount.upsert({
    where: { clientEmail: creds.client_email },
    update: { credentialsJson: gsc.serviceAccountJson, active: true },
    create: {
      label: 'SMK Indexing #1',
      clientEmail: creds.client_email,
      credentialsJson: gsc.serviceAccountJson,
      dailyQuota: 200,
      active: true,
    },
  })
  console.log('IndexingAccount ready:', account.label, '| quota:', account.dailyQuota, '/day')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })