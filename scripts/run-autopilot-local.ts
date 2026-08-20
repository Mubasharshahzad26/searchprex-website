// ═══════════════════════════════════════════════════════════
//  run-autopilot-local.ts — the autopilot, from a machine the
//  customer's firewall accepts
//
//  Cloudflare challenges the deployment and does not challenge a
//  developer machine. It is scoring the source address, not the
//  request: a full browser header set from the server is refused,
//  and a bare one from here is not. So the pipeline is fine and the
//  place it runs is not, and until a WAF rule exists this is where
//  it can run.
//
//  Nothing about the work changes. The database is the same Neon
//  instance the deployment uses, so runs, pages, queue rows and
//  costs all land where the dashboard reads them, and the same
//  runAutopilotBatch does the work. Only the egress address differs.
//
//  Dry run is the default. Publishing edits a real customer's live
//  storefront, and that needs somebody to have typed --live.
//
//  Usage:
//    npx tsx scripts/run-autopilot-local.ts                 # dry, 1 batch
//    npx tsx scripts/run-autopilot-local.ts --batches 10    # dry, 10 batches
//    npx tsx scripts/run-autopilot-local.ts --live --batches 10
// ═══════════════════════════════════════════════════════════

import { db } from '../lib/db'
import { runAutopilotBatch } from '../lib/autopilot/pipeline'

function arg(name: string, fallback?: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}
const flag = (name: string) => process.argv.includes(`--${name}`)

const LIVE = flag('live')
const BATCHES = Math.max(1, Number(arg('batches', '1')))
const DOMAIN = arg('domain', 'michigansport')!

//  Three consecutive batches that publish nothing means something is wrong
//  with the environment rather than with three products, and grinding on
//  burns queue rows and model quota to learn the same thing repeatedly.
const MAX_EMPTY_BATCHES = 3

async function main() {
  const client = await db.client.findFirst({
    where: { domain: { contains: DOMAIN } },
    include: { autopilotConfig: true },
  })
  if (!client) throw new Error(`No client whose domain contains "${DOMAIN}"`)
  if (!client.autopilotConfig) throw new Error(`${client.domain} has no autopilot config`)

  const cfg = client.autopilotConfig
  const original = { enabled: cfg.enabled, dryRunMode: cfg.dryRunMode }

  console.log(`client        : ${client.domain}`)
  console.log(`mode          : ${LIVE ? 'LIVE — will publish to the real site' : 'dry run — nothing is published'}`)
  console.log(`batches       : ${BATCHES} × ${cfg.maxPagesPerRun} pages`)
  console.log(`stored config : enabled=${cfg.enabled} dryRunMode=${cfg.dryRunMode}`)

  const queued = await db.indexingQueue.count({
    where: { clientId: client.id, status: 'queued', url: { contains: '/product/' } },
  })
  console.log(`queued        : ${queued.toLocaleString()} product URLs\n`)

  if (LIVE) {
    //  A visible pause before the first write to somebody's storefront.
    console.log('Publishing to the live site in 5 seconds. Ctrl-C to stop.\n')
    await new Promise((r) => setTimeout(r, 5000))
  }

  //  The pipeline reads these off the row, so they are set for the run and
  //  put back afterwards — including on Ctrl-C, which is the case that
  //  would otherwise leave a customer's autopilot switched to dry run.
  await db.autopilotConfig.update({
    where: { id: cfg.id },
    data: { enabled: true, dryRunMode: !LIVE },
  })

  let restored = false
  const restore = async () => {
    if (restored) return
    restored = true
    await db.autopilotConfig.update({ where: { id: cfg.id }, data: original })
    console.log(`\nconfig restored: enabled=${original.enabled} dryRunMode=${original.dryRunMode}`)
  }
  process.on('SIGINT', async () => { await restore(); process.exit(130) })

  const totals = { published: 0, skipped: 0, errors: 0 }
  let empty = 0

  try {
    for (let i = 1; i <= BATCHES; i++) {
      const started = Date.now()
      const r = (await runAutopilotBatch(client.id)) as any

      if (r.skipped === 'autopilot_disabled') {
        console.log('autopilot is disabled for this client — nothing to do')
        break
      }

      totals.published += r.published ?? 0
      totals.skipped += r.skipped ?? 0
      totals.errors += r.errors ?? 0

      console.log(
        `batch ${String(i).padStart(3)}/${BATCHES}  ` +
          `published=${r.published}  skipped=${r.skipped}  errors=${r.errors}  ` +
          `${((Date.now() - started) / 1000).toFixed(1)}s`
      )

      if ((r.published ?? 0) === 0) {
        empty++
        if (empty >= MAX_EMPTY_BATCHES) {
          console.log(`\nStopping: ${MAX_EMPTY_BATCHES} batches in a row published nothing.`)
          await explainLastFailures(client.id)
          break
        }
      } else {
        empty = 0
      }
    }
  } finally {
    await restore()
  }

  console.log(
    `\ntotal  published=${totals.published}  skipped=${totals.skipped}  errors=${totals.errors}`
  )
}

/** The actual messages, so a stalled run does not need a database client. */
async function explainLastFailures(clientId: string) {
  const runs = await db.autopilotRun.findMany({
    where: { clientId },
    orderBy: { startedAt: 'desc' },
    take: 3,
    select: { id: true },
  })
  const pages = await db.autopilotPage.findMany({
    where: { runId: { in: runs.map((r) => r.id) }, errorMessage: { not: null } },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { pageUrl: true, errorMessage: true },
  })
  if (pages.length === 0) {
    console.log('  No error messages recorded — the queue may simply be empty.')
    return
  }
  console.log('  Most recent failures:')
  for (const p of pages) {
    console.log(`    ${p.pageUrl.split('/product/')[1] ?? p.pageUrl}`)
    console.log(`      ${String(p.errorMessage).slice(0, 200)}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => { console.error(e); process.exit(1) })
