/**
 * scripts/run-link-verify.ts
 *
 * Runs a verification pass by hand, without waiting for the cron.
 *
 *   npx tsx scripts/run-link-verify.ts --campaign <campaignId>
 *   npx tsx scripts/run-link-verify.ts --client <clientId> --force --max 50
 *
 * --force ignores verifyIntervalDays and re-checks everything. Reaches the
 * network and writes to the production database (.env.local) — the placements
 * it touches are the ones already in that campaign, so it cannot create rows,
 * but it does update their status.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { runLinkVerification } from '../lib/linkbuilding/verify-run';
import { db } from '../lib/db';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function main() {
  const maxArg = Number(arg('max'));

  const stats = await runLinkVerification({
    campaignId: arg('campaign'),
    clientId: arg('client'),
    force: process.argv.includes('--force'),
    maxPlacements: Number.isFinite(maxArg) && maxArg > 0 ? maxArg : undefined,
    //  No Vercel ceiling on a local run, so allow a long pass over a big
    //  campaign rather than silently stopping at the serverless budget.
    budgetMs: 30 * 60_000,
  });

  console.log('\n─── verification run ───');
  console.log(`campaigns:  ${stats.campaignsConsidered}`);
  console.log(`checked:    ${stats.checked}`);
  if (stats.skippedForTime) console.log(`out of time: ${stats.skippedForTime}`);
  console.log(`elapsed:    ${(stats.elapsedMs / 1000).toFixed(1)}s`);

  console.log('\nby status:');
  for (const [status, count] of Object.entries(stats.byStatus).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${status.padEnd(12)} ${count}`);
  }

  if (stats.transitions.length > 0) {
    console.log('\nchanged since last check:');
    for (const t of stats.transitions) {
      console.log(`  ${t.from} -> ${t.to}   ${t.sourceUrl}`);
    }
  } else if (stats.checked > 0) {
    console.log('\nNo status changes.');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
