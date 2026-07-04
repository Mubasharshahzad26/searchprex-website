import { config } from 'dotenv'
config({ path: '.env.local' })
import { db } from '../lib/db'
import fs from 'fs'

async function setupSMK() {
  console.log('Setting up SMK Store client...\n')

  const serviceAccountPath = process.env.GOOGLE_SERVICE_ACCOUNT_FILE
  if (!serviceAccountPath) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_FILE not set in .env.local')
  }
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))

  const client = await db.client.create({
    data: {
      companyName: 'SMK Store',
      email: 'mubashar@smkstore.com',
      domain: 'smkstore.com',
    },
  })
  console.log(`Client created: ${client.id}`)

  await db.gSCConnection.create({
    data: {
      clientId: client.id,
      siteUrl: 'https://www.smkstore.com/',
      serviceAccountJson: JSON.stringify(serviceAccount),
      syncStatus: 'connected',
    },
  })
  console.log('GSC connected')

  await db.cMSConnection.create({
    data: {
      clientId: client.id,
      cmsType: 'wordpress',
      baseUrl: 'https://smkstore.com',
      credentials: { username: 'api_user', appPassword: 'REPLACE_WITH_REAL_PASSWORD' },
    },
  })
  console.log('WordPress connected')

  const config = await db.autopilotConfig.create({
    data: {
      clientId: client.id,
      enabled: true,
      automationScore: 'medium',
      maxPagesPerRun: 10,
      contentTier: 'balanced',
      scheduleFrequency: 'daily',
      dryRunMode: true,
      requiresApproval: true,
    },
  })

  console.log(`\nDone! Client ID: ${client.id}`)
  console.log(`Config ID: ${config.id} (DRY-RUN MODE)`)
}

setupSMK()
  .catch(console.error)
  .finally(() => process.exit(0))