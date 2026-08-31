/**
 * scripts/run-link-discovery.ts
 *
 * Discovery and qualification by hand, without waiting for the cron.
 *
 *   npx tsx scripts/run-link-discovery.ts --create <clientId> \
 *       --name "SMK backlinks" --target-domain smkstore.com
 *   npx tsx scripts/run-link-discovery.ts --campaigns
 *   npx tsx scripts/run-link-discovery.ts --campaign <id>
 *   npx tsx scripts/run-link-discovery.ts --campaign <id> --only link_neighbourhood
 *   npx tsx scripts/run-link-discovery.ts --campaign <id> --qualify
 *   npx tsx scripts/run-link-discovery.ts --campaign <id> --qualify --skip-relevance
 *   npx tsx scripts/run-link-discovery.ts --show <id>
 *
 * Configure a campaign's channels first — discovery has nothing to run without
 * at least one of these:
 *
 *   npx tsx scripts/run-link-discovery.ts --campaign <id> \
 *       --set-competitors a.com,b.com,c.com \
 *       --set-topic "survival knives" \
 *       --set-seeds https://example.com/resources,https://other.com/links
 *
 * Reaches the network and writes to the production database (.env.local).
 * Discovery writes prospect rows only; it contacts nobody.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { db } from '../lib/db';
import { runLinkDiscovery } from '../lib/linkbuilding/discover-run';
import { runLinkQualification } from '../lib/linkbuilding/qualify-run';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

function has(flag: string): boolean {
  return process.argv.includes(`--${flag}`);
}

function list(value: string | undefined): string[] | undefined {
  if (value === undefined) return undefined;
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

async function show(campaignId: string) {
  const campaign = await db.linkCampaign.findUnique({ where: { id: campaignId } });
  if (!campaign) {
    console.error(`No campaign ${campaignId}`);
    process.exit(1);
  }

  console.log(`\n${campaign.name}  ->  ${campaign.targetDomain}`);
  console.log(`  competitors: ${campaign.competitors.join(', ') || '(none)'}`);
  console.log(`  topic:       ${campaign.topic ?? '(none)'}`);
  console.log(`  seedUrls:    ${campaign.seedUrls.length}`);

  const grouped = await db.linkProspect.groupBy({
    by: ['status'],
    where: { campaignId },
    _count: true,
  });

  console.log('\nprospects by status:');
  for (const row of grouped) console.log(`  ${row.status.padEnd(14)} ${row._count}`);

  const top = await db.linkProspect.findMany({
    where: { campaignId, status: 'qualified' },
    orderBy: { qualityScore: 'desc' },
    take: 15,
    select: { domain: true, qualityScore: true, discoveredVia: true, missingSignals: true },
  });

  if (top.length > 0) {
    console.log('\ntop qualified:');
    for (const p of top) {
      const gaps = p.missingSignals.length ? `  [unmeasured: ${p.missingSignals.join(',')}]` : '';
      console.log(`  ${String(p.qualityScore).padStart(3)}  ${p.domain.padEnd(34)} ${p.discoveredVia}${gaps}`);
    }
  }

  const rejected = await db.linkProspect.findMany({
    where: { campaignId, status: 'rejected', hardRejects: { isEmpty: false } },
    take: 10,
    select: { domain: true, hardRejects: true },
  });

  if (rejected.length > 0) {
    console.log('\nhard-rejected:');
    for (const p of rejected) console.log(`  ${p.domain.padEnd(34)} ${p.hardRejects.join(', ')}`);
  }
}

async function create(clientId: string) {
  const client = await db.client.findUnique({ where: { id: clientId } });
  if (!client) {
    console.error(`No client ${clientId}.`);
    process.exit(1);
  }

  //  Defaults to the client's own domain, which is right almost every time and
  //  saves the commonest typo — a campaign pointed at the wrong site silently
  //  rejects every placement on import.
  const targetDomain = (arg('target-domain') ?? client.domain)
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .toLowerCase();

  const name = arg('name') ?? `${client.companyName} links`;

  const existing = await db.linkCampaign.findFirst({ where: { clientId, name } });
  if (existing) {
    console.log(`Campaign "${name}" already exists: ${existing.id}`);
    return;
  }

  const campaign = await db.linkCampaign.create({
    data: { clientId, name, targetDomain },
  });

  console.log(`✓ campaign created`);
  console.log(`  id:            ${campaign.id}`);
  console.log(`  name:          ${campaign.name}`);
  console.log(`  targetDomain:  ${campaign.targetDomain}`);
  console.log(`  verify every:  ${campaign.verifyIntervalDays} days`);
  console.log(`\n  dryRunMode and requiresApproval are ON — they gate outreach only,`);
  console.log(`  and verification runs regardless since it sends nothing.`);
  console.log(`\n  Import known links:`);
  console.log(`    npx tsx scripts/import-placements.ts --client ${clientId} \\`);
  console.log(`      --campaign "${campaign.name}" --target-domain ${campaign.targetDomain} --file links.csv`);
}

async function campaigns() {
  const rows = await db.linkCampaign.findMany({
    include: {
      client: { select: { companyName: true } },
      _count: { select: { placements: true, prospects: true } },
    },
    orderBy: { createdAt: 'asc' },
  });

  if (rows.length === 0) return console.log('No campaigns yet. Create one with --create <clientId>.');

  for (const row of rows) {
    console.log(`\n${row.name}  (${row.client.companyName})`);
    console.log(`  id:          ${row.id}`);
    console.log(`  target:      ${row.targetDomain}`);
    console.log(`  enabled:     ${row.enabled}`);
    console.log(`  placements:  ${row._count.placements}   prospects: ${row._count.prospects}`);
  }
}

async function main() {
  const createFor = arg('create');
  if (createFor) return create(createFor);

  if (has('campaigns')) return campaigns();

  const showId = arg('show');
  if (showId) return show(showId);

  const campaignId = arg('campaign');
  if (!campaignId) {
    console.error('Usage: --campaign <id>  [--only ...] [--qualify] [--show <id>]');
    process.exit(1);
  }

  const competitors = list(arg('set-competitors'));
  const seedUrls = list(arg('set-seeds'));
  const topic = arg('set-topic');

  if (competitors || seedUrls || topic !== undefined) {
    await db.linkCampaign.update({
      where: { id: campaignId },
      data: {
        ...(competitors ? { competitors } : {}),
        ...(seedUrls ? { seedUrls } : {}),
        ...(topic !== undefined ? { topic } : {}),
      },
    });
    console.log('✓ campaign channels updated');
  }

  if (!has('qualify-only')) {
    const stats = await runLinkDiscovery({
      campaignId,
      only: list(arg('only')) as any,
    });

    console.log('\n─── discovery ───');
    for (const campaign of stats.campaigns) {
      console.log(`\n${campaign.name}`);
      for (const channel of campaign.channels) {
        if (channel.skipped) {
          console.log(`  ${channel.source.padEnd(20)} skipped — ${channel.error}`);
          continue;
        }
        if (!channel.ok) {
          console.log(`  ${channel.source.padEnd(20)} FAILED — ${channel.error}`);
          continue;
        }
        console.log(
          `  ${channel.source.padEnd(20)} found ${channel.found}, new ${channel.created}, ` +
            `enriched ${channel.enriched}${
              channel.costUsd
                ? channel.costUnit === 'credits'
                  ? `, ${channel.costUsd} credits`
                  : `, $${channel.costUsd.toFixed(4)}`
                : ''
            }`
        );
        for (const warning of channel.warnings) console.log(`      ! ${warning}`);
      }
    }
    //  Dollars and credits are different units; summing them across providers
    //  would invent a number, so the per-channel lines above carry the spend
    //  and the total carries only what is comparable across them.
    console.log(
      `\ntotal new: ${stats.totalCreated}   ${(stats.elapsedMs / 1000).toFixed(1)}s`
    );
  }

  if (has('qualify') || has('qualify-only')) {
    const stats = await runLinkQualification({
      campaignId,
      force: has('force'),
      skipRelevance: has('skip-relevance'),
      budgetMs: 30 * 60_000,
    });

    console.log('\n─── qualification ───');
    console.log(`checked:     ${stats.checked}`);
    console.log(`qualified:   ${stats.qualified}`);
    console.log(`rejected:    ${stats.rejected}`);
    console.log(`unreachable: ${stats.unreachable}`);
    console.log(`LLM calls:   ${stats.relevanceCalls}`);
    console.log(`elapsed:     ${(stats.elapsedMs / 1000).toFixed(1)}s`);
    console.log(`\nSee results:  npx tsx scripts/run-link-discovery.ts --show ${campaignId}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
