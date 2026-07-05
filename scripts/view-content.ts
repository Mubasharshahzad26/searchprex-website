import { config } from 'dotenv'
config({ path: '.env.local' })
import { db } from '../lib/db'
import fs from 'fs'

async function viewContent() {
  const runs = await db.autopilotRun.findMany({
    where: { status: 'success' },
    orderBy: { startedAt: 'desc' },
  })

  console.log(`${runs.length} successful runs mile\n`)

  let output = ''
  for (const run of runs) {
    const results = run.results as any
    output += `\n${'='.repeat(80)}\n`
    output += `RUN: ${run.id} | ${run.startedAt} | Pages: ${run.pagesGenerated}\n`
    output += `${'='.repeat(80)}\n`
    if (results?.pages) {
      for (const page of results.pages) {
        output += `\nURL: ${page.url}\nKeyword: ${page.keyword}\nImpressions: ${page.impressions} | Clicks: ${page.clicks}\nStatus: ${page.status}\n`
        // Agar content bhi stored hai to wo bhi
        if (page.content) {
          output += `\n--- CONTENT ---\n${JSON.stringify(page.content, null, 2)}\n`
        }
      }
    }
    if (results?.errors?.length) {
      output += `\nERRORS:\n${results.errors.join('\n')}\n`
    }
  }

  fs.writeFileSync('generated-content.txt', output)
  console.log('Saved to generated-content.txt — VS Code mein khul raha hai...')
}

viewContent()
  .catch(console.error)
  .finally(() => process.exit(0))