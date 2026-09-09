// scripts/clean-competitor-links.ts
//
// Jo product pages pehle se publish ho chuke hain aur unme competitor ke links
// hain, unhe saaf karta hai. Link hata deta hai, lekin uske andar ka text
// rehne deta hai — taake jumla toota hua na lage.
//
// Chalane ka tareeqa:
//   npx tsx scripts/clean-competitor-links.ts                  # dry run (default)
//   npx tsx scripts/clean-competitor-links.ts --limit 20        # sirf 20 pages dekho
//   npx tsx scripts/clean-competitor-links.ts --live            # asli update
//   npx tsx scripts/clean-competitor-links.ts --live --limit 50 --pacing 800
//
// Dry run kuch nahi badalta — sirf batata hai ke kya badalta. Pehle isi ko
// chalayein, output dekh lein, phir --live lagayein.
//
// Script rok kar dobara chalayi ja sakti hai: har page WordPress se parh kar
// dekha jaata hai, aur jo pehle saaf ho chuka usay chhod diya jaata hai.

import { db } from '../lib/db'
import { stripDisallowedLinks } from '../lib/autopilot/strip-links'

const MSO_CLIENT_ID = process.env.MSO_CLIENT_ID ?? 'cmrcl8frg0000p8uruwv7j5qd'

//  Woh hosts jinki wajah se page dobara chhoona hai. Yeh sirf DB se pages
//  dhoondne ke liye hai — asli faisla strip-links karta hai, jo allowlist par
//  chalta hai, is liye koi bhi ghair-manzoor link pakda jayega.
const SEARCH_HOSTS = ['knifecenter.com', 'bladehq.com', 'bladeforums.com', 'amazon.com', 'ebay.com']

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}
const flag = (name: string) => process.argv.includes(`--${name}`)

const LIVE = flag('live')
const LIMIT = Number(arg('limit', '0')) || 0
//  Origin ne batch load par 521 diye hain, is liye requests ke darmiyan waqfa.
const PACING_MS = Number(arg('pacing', '600'))
//  Lagatar itni nakamiyan matlab origin ya firewall ka masla hai, teen
//  badqismat pages ka nahi — aage chalte rehna sirf waqt zaya karna hai.
const MAX_CONSECUTIVE_FAILURES = 5

async function main() {
  console.log(`\n=== Competitor Link Cleanup (${LIVE ? 'LIVE' : 'DRY RUN'}) ===\n`)

  const conn = await db.cMSConnection.findFirst({
    where: { clientId: MSO_CLIENT_ID, cmsType: 'wordpress' },
  })
  if (!conn) throw new Error('WordPress CMSConnection nahi mila')

  const creds = conn.credentials as { username: string; appPassword: string }
  const auth = Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')
  console.log(`WordPress: ${conn.baseUrl}`)

  const likeClauses = SEARCH_HOSTS.map(h => `"generatedContent"::text ILIKE '%${h}%'`).join(' OR ')
  const rows = await db.$queryRawUnsafe<Array<{ id: string; pageUrl: string; postId: number | null }>>(`
    SELECT id, "pageUrl", ("generatedContent"->'productData'->>'id')::int AS "postId"
      FROM "AutopilotPage"
     WHERE status = 'published'
       AND "pageUrl" LIKE '%/product/%'
       AND (${likeClauses})
     ORDER BY "publishedAt" DESC NULLS LAST
     ${LIMIT > 0 ? `LIMIT ${LIMIT}` : ''}
  `)

  console.log(`Saaf karne wale pages: ${rows.length}\n`)
  if (rows.length === 0) { console.log('Kuch karne ko nahi hai.\n'); process.exit(0) }

  let cleaned = 0, alreadyClean = 0, failed = 0, noPostId = 0
  let consecutiveFailures = 0
  const removedHosts = new Map<string, number>()

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const tag = `[${i + 1}/${rows.length}]`

    if (!row.postId) {
      noPostId++
      console.warn(`${tag} ⚠️  post id nahi mila, chhoda: ${row.pageUrl}`)
      continue
    }

    const endpoint = `${conn.baseUrl}/wp-json/wp/v2/product/${row.postId}`

    try {
      //  WordPress se parhte hain, DB se nahi: page generate hone ke baad
      //  haath se bhi badla ja sakta hai, aur jo abhi live hai wahi asal hai.
      const getRes = await fetch(`${endpoint}?context=edit`, {
        headers: { Authorization: `Basic ${auth}` },
        signal: AbortSignal.timeout(20000),
      })
      if (!getRes.ok) throw new Error(`GET ${getRes.status}`)

      const post = (await getRes.json()) as any
      const current: string = post?.content?.raw ?? post?.content?.rendered ?? ''
      const { html, removed, changed } = stripDisallowedLinks(current)

      if (!changed) {
        alreadyClean++
        console.log(`${tag} ✓  pehle se saaf: ${row.pageUrl}`)
      } else {
        for (const href of removed) {
          const host = (href.match(/\/\/([^/]+)/)?.[1] ?? href).replace(/^www\./, '')
          removedHosts.set(host, (removedHosts.get(host) ?? 0) + 1)
        }

        if (LIVE) {
          const putRes = await fetch(endpoint, {
            method: 'POST',
            headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: html }),
            signal: AbortSignal.timeout(25000),
          })
          if (!putRes.ok) throw new Error(`POST ${putRes.status}: ${(await putRes.text()).slice(0, 120)}`)

          //  Saved copy bhi theek kar dete hain, warna agli baar audit isi
          //  page ko dobara pakdega aur "kitne bache hain" ka jawab galat aayega.
          await db.$executeRawUnsafe(
            `UPDATE "AutopilotPage"
                SET "generatedContent" = jsonb_set("generatedContent"::jsonb, '{generated,contentHtml}', to_jsonb($1::text))
              WHERE id = $2`,
            html, row.id
          )
        }

        cleaned++
        console.log(`${tag} ${LIVE ? '🧹 saaf kiya' : '· badlega'} (${removed.length} link): ${row.pageUrl}`)
        for (const href of removed) console.log(`        - ${href}`)
      }

      consecutiveFailures = 0
    } catch (err) {
      failed++
      consecutiveFailures++
      console.error(`${tag} ❌ ${row.pageUrl}: ${(err as Error).message}`)

      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        console.error(`\n🛑 Lagatar ${MAX_CONSECUTIVE_FAILURES} nakamiyan — origin ya firewall ka masla lagta hai. Ruk rahe hain.`)
        console.error('   Baad mein wahi command dobara chala dein, script wahin se aage barhegi.\n')
        break
      }
    }

    if (i < rows.length - 1 && PACING_MS > 0) {
      await new Promise(r => setTimeout(r, PACING_MS))
    }
  }

  console.log(`\n=== ${LIVE ? 'MUKAMMAL' : 'DRY RUN MUKAMMAL'} ===`)
  console.log(`  ${LIVE ? 'Saaf kiye' : 'Saaf honge'}: ${cleaned}`)
  console.log(`  Pehle se saaf   : ${alreadyClean}`)
  console.log(`  Nakaam          : ${failed}`)
  if (noPostId > 0) console.log(`  Post id nahi    : ${noPostId}`)

  if (removedHosts.size > 0) {
    console.log('\n  Hataye gaye links, domain ke hisaab se:')
    for (const [host, n] of [...removedHosts].sort((a, b) => b[1] - a[1])) {
      console.log(`    ${host.padEnd(28)} ${n}`)
    }
  }

  if (!LIVE && cleaned > 0) {
    console.log('\n⚠️  Ye dry run tha — WordPress par kuch nahi badla.')
    console.log('   Asli update ke liye --live laga kar dobara chalayein.\n')
  } else {
    console.log('')
  }

  process.exit(0)
}

main().catch(err => {
  console.error('\n❌ ERROR:', err instanceof Error ? err.message : err)
  process.exit(1)
})
