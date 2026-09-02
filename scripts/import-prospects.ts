import { config } from 'dotenv';
config({ path: '.env.local' });

import { readFileSync } from 'node:fs';
import * as Papa from 'papaparse';
import { db } from '../lib/db';
import { hostOf } from '../lib/linkbuilding/core/normalize';

type Row = Record<string, string | undefined>;

const COLUMN_ALIASES: Record<'domain' | 'referring_domains' | 'organic_traffic', string[]> = {
  domain: ['domain', 'root_domain', 'target', 'url', 'website', 'source_url', 'source_page'],
  referring_domains: ['referring_domains', 'refdomains', 'referring_ips'],
  organic_traffic: ['organic_traffic', 'traffic', 'search_traffic', 'as', 'authority_score'],
};

function column(row: Row, field: keyof typeof COLUMN_ALIASES): string | undefined {
  for (const alias of COLUMN_ALIASES[field]) {
    if (row[alias] !== undefined) return row[alias];
  }
  return undefined;
}

function has(flag: string) {
  return process.argv.includes(`--${flag}`);
}

function arg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  return idx > -1 && idx < process.argv.length - 1 ? process.argv[idx + 1] : undefined;
}

async function main() {
  const campaignId = arg('campaign');
  const file = arg('file');
  const commit = has('commit');

  if (!campaignId || !file) {
    console.error(`Usage: npx tsx scripts/import-prospects.ts \\
    --campaign <id> \\
    --file <semrush_export.csv> \\
    [--commit]`);
    process.exit(1);
  }

  const campaign = await db.linkCampaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) {
    console.error(`Campaign not found: ${campaignId}`);
    process.exit(1);
  }

  const csv = readFileSync(file, 'utf-8');
  const parsed = Papa.parse<Row>(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase().replace(/[\s-]/g, '_'),
  });

  if (parsed.errors.length > 0) {
    console.error('CSV Parse Errors:', parsed.errors);
    process.exit(1);
  }

  const accepted: Array<{
    domain: string;
    url: string;
    referringDomains: number | null;
    organicTraffic: number | null;
  }> = [];

  const seen = new Set<string>();
  let rejected = 0;

  parsed.data.forEach((row, index) => {
    let rawDomain = (column(row, 'domain') ?? '').trim();
    if (!rawDomain) {
      rejected++;
      return;
    }

    if (!rawDomain.startsWith('http')) {
      rawDomain = 'https://' + rawDomain;
    }

    const domain = hostOf(rawDomain);
    if (!domain) {
      rejected++;
      return;
    }

    if (seen.has(domain)) return;
    seen.add(domain);

    if (domain === campaign.targetDomain || campaign.competitors.includes(domain)) {
      rejected++;
      return;
    }

    const refRaw = column(row, 'referring_domains');
    const refDomains = refRaw ? parseInt(refRaw.replace(/,/g, ''), 10) : null;
    
    const trafficRaw = column(row, 'organic_traffic');
    const traffic = trafficRaw ? parseInt(trafficRaw.replace(/,/g, ''), 10) : null;

    accepted.push({
      domain,
      url: `https://${domain}`,
      referringDomains: isNaN(refDomains as number) ? null : refDomains,
      organicTraffic: isNaN(traffic as number) ? null : traffic,
    });
  });

  console.log(`Parsed ${parsed.data.length} row(s): ${accepted.length} valid, ${rejected} rejected or duplicate.`);

  if (!commit) {
    console.log('\nDRY RUN — nothing written. Sample of what would be imported:');
    for (const item of accepted.slice(0, 10)) {
      console.log(`  ${item.domain} (RD: ${item.referringDomains || '?'}, Traffic: ${item.organicTraffic || '?'})`);
    }
    console.log(`\nRe-run with --commit to write ${accepted.length} prospect(s).`);
    return;
  }

  let created = 0;
  for (const item of accepted) {
    const existing = await db.linkProspect.findFirst({
      where: { campaignId: campaign.id, domain: item.domain },
    });

    if (!existing) {
      await db.linkProspect.create({
        data: {
          campaignId: campaign.id,
          domain: item.domain,
          url: item.url,
          source: 'manual',
          discoveredVia: 'imported from semrush csv',
          referringDomains: item.referringDomains,
          organicTraffic: item.organicTraffic,
          status: 'discovered',
        },
      });
      created++;
    }
  }

  console.log(`\nSuccess! Inserted ${created} new prospects into the campaign.`);
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));
