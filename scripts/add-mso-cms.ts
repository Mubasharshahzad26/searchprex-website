// scripts/add-mso-cms.ts
// MSO ke liye CMSConnection add karta hai + credentials test karta hai
// Chalane ka tareeka: npx tsx scripts/add-mso-cms.ts

import { db } from '../lib/db'
import { withRetry } from '../lib/db-retry'
import * as readline from 'readline'

const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd' // Michigan Sports Outdoor
const MSO_BASE_URL = 'https://www.michigansportsoutdoor.com'
const MSO_USERNAME = 'apiuser'

// Password ko securely prompt karke padhe (input hide karega)
function promptPassword(): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    process.stdout.write('WordPress App Password paste karo (input hide hai): ')

    // Input hide karo
    const stdin = process.stdin as any
    stdin.setRawMode?.(true)
    let password = ''

    stdin.on('data', (char: Buffer) => {
      const c = char.toString()
      if (c === '\r' || c === '\n' || c === '\u0004') {
        stdin.setRawMode?.(false)
        rl.close()
        process.stdout.write('\n')
        resolve(password.trim())
      } else if (c === '\u0003') {
        // Ctrl+C
        process.exit(1)
      } else if (c === '\u007f' || c === '\b') {
        // Backspace
        password = password.slice(0, -1)
      } else {
        password += c
      }
    })
  })
}

async function testWordPressAuth(baseUrl: string, username: string, appPassword: string) {
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64')
  const res = await fetch(`${baseUrl}/wp-json/wp/v2/users/me?context=edit`, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Auth test failed: ${res.status} ${res.statusText} — ${body.slice(0, 200)}`)
  }
  const data = await res.json()
  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    roles: data.roles,
  }
}

async function main() {
  console.log('\n=== MSO CMSConnection Setup ===\n')

  // 1. Client verify karo DB mein
  console.log('[1/4] Client verify kar rahe hain...')
  const client = await withRetry(() =>
    db.client.findUnique({
      where: { id: MSO_CLIENT_ID },
      include: { cmsConnections: true },
    })
  )
  if (!client) {
    throw new Error(`Client ${MSO_CLIENT_ID} DB mein nahi mila. Pehle Client record banao.`)
  }
  console.log(`      ✅ Client: ${client.companyName} (${client.domain})`)

  if (client.cmsConnections.length > 0) {
    console.log(`      ⚠️  CMSConnection already exists (${client.cmsConnections.length}). Update karega.`)
  }

  // 2. Password prompt
  console.log('[2/4] App Password chahiye...')
  const password = await promptPassword()
  if (!password || password.length < 20) {
    throw new Error('Password chhota lag raha hai. WordPress App Password 24 chars ka hota hai (spaces ke sath).')
  }
  console.log(`      ✅ Password received (${password.length} chars)`)

  // 3. WordPress auth test
  console.log('[3/4] WordPress credentials test kar rahe hain...')
  try {
    const user = await testWordPressAuth(MSO_BASE_URL, MSO_USERNAME, password)
    console.log(`      ✅ Auth OK — User: "${user.name}" (roles: ${user.roles?.join(', ') || 'none'})`)
    if (!user.roles?.some((r: string) => ['administrator', 'editor'].includes(r))) {
      console.log(`      ⚠️  Warning: User ke paas administrator/editor role nahi hai. Publish fail ho sakta hai.`)
    }
  } catch (err) {
    console.error(`      ❌ Auth test FAIL: ${err instanceof Error ? err.message : err}`)
    console.error('\n      Please check:')
    console.error('      - App password sahi hai (spaces included)')
    console.error('      - Username case-sensitive hai (Api User)')
    console.error('      - WordPress mein REST API enabled hai')
    process.exit(1)
  }

  // 4. DB mein save
  console.log('[4/4] CMSConnection DB mein save kar rahe hain...')
  const credentials = {
    username: MSO_USERNAME,
    appPassword: password,
  }

  const existing = client.cmsConnections[0]
  let saved
  if (existing) {
    saved = await withRetry(() =>
      db.cMSConnection.update({
        where: { id: existing.id },
        data: {
          cmsType: 'wordpress',
          baseUrl: MSO_BASE_URL,
          credentials,
        },
      })
    )
    console.log(`      ✅ Updated CMSConnection: ${saved.id}`)
  } else {
    saved = await withRetry(() =>
      db.cMSConnection.create({
        data: {
          clientId: MSO_CLIENT_ID,
          cmsType: 'wordpress',
          baseUrl: MSO_BASE_URL,
          credentials,
        },
      })
    )
    console.log(`      ✅ Created CMSConnection: ${saved.id}`)
  }

  console.log('\n=== ✅ SUCCESS ===')
  console.log(`Client: ${client.companyName}`)
  console.log(`Base URL: ${MSO_BASE_URL}`)
  console.log(`Username: ${MSO_USERNAME}`)
  console.log(`CMSConnection ID: ${saved.id}`)
  console.log('\nAb tu MSO ke liye AutopilotConfig set kar sakta hai.\n')

  process.exit(0)
}

main().catch((err) => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})