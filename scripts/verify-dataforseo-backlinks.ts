/**
 * scripts/verify-dataforseo-backlinks.ts
 *
 * Confirms the Backlinks API works and dumps the real item shape, so
 * core/discovery/backlink-gap.ts can be checked against a live response rather
 * than against my assumptions about field names.
 *
 * Companion to scripts/verify-dataforseo.ts, which does the same for SERP.
 *
 *   npx tsx scripts/verify-dataforseo-backlinks.ts
 *   npx tsx scripts/verify-dataforseo-backlinks.ts a.com,b.com mydomain.com
 *
 * Makes exactly ONE live call with limit=5 to keep the cost trivial. The
 * Backlinks API is billed separately from SERP on DataForSEO, so a working
 * SERP key does not prove this endpoint is available on the plan.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { callDataForSeo } from '../lib/linkbuilding/core/discovery/dataforseo';
import { DiscoveryError } from '../lib/linkbuilding/core/discovery/types';

async function main() {
  const competitors = (process.argv[2] ?? 'backlinko.com,ahrefs.com')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const exclude = process.argv[3] ?? 'searchprex.com';

  const targets: Record<string, string> = {};
  competitors.forEach((domain, index) => {
    targets[String(index + 1)] = domain;
  });

  console.log(`Intersecting ${competitors.join(' + ')}, excluding ${exclude} (limit 5)…\n`);

  try {
    const { results, costUsd, warnings } = await callDataForSeo<Record<string, unknown>>(
      '/v3/backlinks/domain_intersection/live',
      [{ targets, exclude_targets: [exclude], order_by: ['rank,desc'], limit: 5 }],
      { login: process.env.DATAFORSEO_LOGIN, password: process.env.DATAFORSEO_PASSWORD },
      'backlink_gap'
    );

    console.log(`✓ call succeeded — cost $${costUsd.toFixed(4)}`);
    for (const warning of warnings) console.log(`  ! ${warning}`);

    const first = results[0] as any;
    const items = Array.isArray(first?.items) ? first.items : [];

    console.log(`\nresult keys:  ${Object.keys(first ?? {}).join(', ')}`);
    console.log(`items:        ${items.length}`);

    if (items.length === 0) {
      console.log('\nNo items returned. Try two competitors with a larger overlap.');
      return;
    }

    console.log(`\nitem[0] keys: ${Object.keys(items[0]).join(', ')}`);
    console.log('\nitem[0] in full:');
    console.log(JSON.stringify(items[0], null, 2).slice(0, 3000));

    //  The three fields backlink-gap.ts reads. Anything missing here means the
    //  adapter will silently record that metric as unmeasured.
    console.log('\nfields backlink-gap.ts depends on:');
    for (const field of ['domain', 'referring_domains', 'rank', 'first_seen']) {
      const present = field in items[0];
      console.log(`  ${present ? '✓' : '✗'} ${field}${present ? ` = ${JSON.stringify(items[0][field])}` : ''}`);
    }
  } catch (err) {
    if (err instanceof DiscoveryError) {
      console.error(`✗ ${err.message}`);
      process.exit(1);
    }
    throw err;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
