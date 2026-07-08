import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'
import { readFileSync, existsSync } from 'fs'

const MICHIGAN_JSON_PATH = 'C:\\Users\\Mubashar Shahzad\\Downloads\\gen-lang-client-0046636091-michigan.json'

async function main() {
  // ── 1. Env vars check ──
  const wpUser = process.env.MICHIGAN_WP_USER
  const wpPass = process.env.MICHIGAN_WP_PASS
  if (!wpUser || !wpPass) {
    console.error('❌ Set env vars first:')
    console.error('   $env:MICHIGAN_WP_USER = "your-wp-username"')
    console.error('   $env:MICHIGAN_WP_PASS = "xxxx xxxx xxxx xxxx"')
    process.exit(1)
  }

  // ── 2. Michigan JSON key file check ──
  if (!existsSync(MICHIGAN_JSON_PATH)) {
    console.error(`❌ JSON file not found at: ${MICHIGAN_JSON_PATH}`)
    console.error('   Update MICHIGAN_JSON_PATH constant in this script')
    process.exit(1)
  }
  const serviceAccountJson = readFileSync(MICHIGAN_JSON_PATH, 'utf-8')
  const parsed = JSON.parse(serviceAccountJson)
  if (!parsed.client_email?.includes('michigan-sports-indexing')) {
    console.error(`❌ Wrong service account: ${parsed.client_email}`)
    console.error('   Expected: michigan-sports-indexing@...')
    process.exit(1)
  }
  console.log('✓ Service account:', parsed.client_email)

  // ── 3. Client create ──
  const client = await db.client.upsert({
    where: { email: 'info@michigansportsoutdoor.com' },
    update: {},
    create: {
      companyName: 'Michigan Sports Outdoor',
      email: 'info@michigansportsoutdoor.com',
      domain: 'michigansportsoutdoor.com',
    },
  })
  console.log('✓ Client:', client.id, '|', client.companyName)

  // ── 4. GSC Connection ──
  const gsc = await db.gSCConnection.upsert({
    where: {
      clientId_siteUrl: {
        clientId: client.id,
        siteUrl: 'https://www.michigansportsoutdoor.com/',
      },
    },
    update: { serviceAccountJson, syncStatus: 'active' },
    create: {
      clientId: client.id,
      siteUrl: 'https://www.michigansportsoutdoor.com/',
      serviceAccountJson,
      syncStatus: 'active',
    },
  })
  console.log('✓ GSC Connection ready')

  // ── 5. CMS Connection (WordPress) ──
  const cms = await db.cMSConnection.upsert({
    where: {
      clientId_cmsType: {
        clientId: client.id,
        cmsType: 'wordpress',
      },
    },
    update: {
      credentials: { username: wpUser, appPassword: wpPass },
      testStatus: 'pending',
    },
    create: {
      clientId: client.id,
      cmsType: 'wordpress',
      baseUrl: 'https://www.michigansportsoutdoor.com',
      credentials: { username: wpUser, appPassword: wpPass },
      testStatus: 'pending',
    },
  })
  console.log('✓ CMS Connection ready (username length:', wpUser.length, ')')

  // ── 6. Autopilot Config (SAFE defaults: dry-run ON) ──
  const cfg = await db.autopilotConfig.upsert({
    where: { clientId: client.id },
    update: {},
    create: {
      clientId: client.id,
      enabled: true,
      automationScore: 'medium',
      maxPagesPerRun: 5,
      contentTier: 'balanced',
      scheduleFrequency: 'daily',
      dryRunMode: true, // safety first
      requiresApproval: true,
    },
  })
  console.log('✓ Autopilot Config: dry-run ON, 5 pages/run, requires approval')

  // ── 7. Indexing Account (rotator ke liye) ──
  const idx = await db.indexingAccount.upsert({
    where: { clientEmail: parsed.client_email },
    update: { credentialsJson: serviceAccountJson, active: true },
    create: {
      label: 'Michigan Indexing #1',
      clientEmail: parsed.client_email,
      credentialsJson: serviceAccountJson,
      dailyQuota: 200,
      active: true,
    },
  })
  console.log('✓ Indexing Account: 200/day quota')

  // ── 8. Report Config (weekly Monday 9 AM UTC) ──
  const report = await db.reportConfig.upsert({
    where: { clientId: client.id },
    update: {},
    create: {
      clientId: client.id,
      recipientEmail: 'info@michigansportsoutdoor.com',
      frequency: 'weekly',
      sendDay: 1,
      sendHourUTC: 9,
      enabled: false, // baad me enable karo jab Resend domain verify ho
    },
  })
  console.log('✓ Report Config (disabled — enable when Resend verified)')

  console.log('\n🎉 MICHIGAN ONBOARDING COMPLETE!')
  console.log('   Client ID:', client.id)
  console.log('   Copy this for reference — needed for widgets, scripts, cron')
  console.log('\n📋 Next steps:')
  console.log('   1. Run Michigan audit: npx tsx scripts/test-audit-michigan.ts')
  console.log('   2. Generate roadmap once audit done')
  console.log('   3. Import Michigan crawled-not-indexed backlog')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })