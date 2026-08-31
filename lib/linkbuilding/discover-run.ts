// ═══════════════════════════════════════════════════════════
//  discover-run.ts — fills the prospect table
//
//  NOT PORTABLE. Prisma-bound half; the adapters it calls live in
//  ./core/discovery and know nothing about a database.
//
//  Channels run independently and a failing one never stops the
//  others: DataForSEO being unconfigured must not stop the free
//  link-neighbourhood channel from working. Each failure is
//  reported by name, because "discovery found 12 prospects" reads
//  very differently once you know two of three channels threw.
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { fetchPage } from './core/fetch';
import { discoverBacklinkGap } from './core/discovery/backlink-gap';
import { discoverSerpFootprints } from './core/discovery/serp-footprints';
import { discoverLinkNeighbourhood } from './core/discovery/link-neighbourhood';
import { hasDataForSeoCredentials } from './core/discovery/dataforseo';
import { DiscoveryError, type DiscoveryResult, type RawProspect } from './core/discovery/types';

export interface DiscoverRunOptions {
  campaignId?: string;
  clientId?: string;
  /** Restrict to named channels. Default: every channel the campaign supports. */
  only?: Array<'backlink_gap' | 'serp_footprint' | 'link_neighbourhood'>;
  /** Prospects written per campaign per run. */
  maxPerCampaign?: number;
  signal?: AbortSignal;
}

export interface ChannelOutcome {
  source: string;
  ok: boolean;
  found: number;
  created: number;
  enriched: number;
  costUsd: number;
  warnings: string[];
  error?: string;
  /** True when the channel is simply not configured, rather than broken. */
  skipped?: boolean;
}

export interface DiscoverRunStats {
  campaigns: Array<{
    campaignId: string;
    name: string;
    channels: ChannelOutcome[];
    created: number;
    costUsd: number;
  }>;
  totalCreated: number;
  totalCostUsd: number;
  elapsedMs: number;
}

const DEFAULT_MAX_PER_CAMPAIGN = 300;

function credentials() {
  return {
    login: process.env.DATAFORSEO_LOGIN,
    password: process.env.DATAFORSEO_PASSWORD,
  };
}

/**
 * Writes prospects, deduplicated on (campaign, domain).
 *
 * An existing row is enriched, never reset: a domain rediscovered next week
 * must not lose its qualification verdict or drop back to `discovered` and get
 * re-qualified at cost. Only genuinely new information is written, and only
 * where the row had none.
 */
async function persist(
  campaignId: string,
  prospects: RawProspect[],
  limit: number
): Promise<{ created: number; enriched: number }> {
  let created = 0;
  let enriched = 0;

  for (const prospect of prospects.slice(0, limit)) {
    const existing = await withRetry(() =>
      db.linkProspect.findUnique({
        where: { campaignId_domain: { campaignId, domain: prospect.domain } },
        select: {
          id: true,
          referringDomains: true,
          organicTraffic: true,
          providerRank: true,
          title: true,
          discoveredVia: true,
        },
      })
    );

    if (existing) {
      const data: Record<string, unknown> = {};

      //  `?? undefined` rather than `?? existing.x`: an undefined value is
      //  omitted from the update entirely, so a channel that cannot measure a
      //  metric never overwrites one that could.
      if (existing.referringDomains === null && prospect.referringDomains !== undefined) {
        data.referringDomains = prospect.referringDomains;
      }
      if (existing.organicTraffic === null && prospect.organicTraffic !== undefined) {
        data.organicTraffic = prospect.organicTraffic;
      }
      if (existing.providerRank === null && prospect.providerRank !== undefined) {
        data.providerRank = prospect.providerRank;
      }
      if (!existing.title && prospect.title) data.title = prospect.title;

      //  Corroboration from a second channel is worth keeping — it is the
      //  strongest thing discovery can tell you short of a metric.
      if (!existing.discoveredVia.includes(prospect.discoveredVia)) {
        data.discoveredVia = `${existing.discoveredVia}; ${prospect.discoveredVia}`.slice(0, 500);
      }

      if (Object.keys(data).length > 0) {
        await withRetry(() => db.linkProspect.update({ where: { id: existing.id }, data }));
        enriched++;
      }
      continue;
    }

    await withRetry(() =>
      db.linkProspect.create({
        data: {
          campaignId,
          domain: prospect.domain,
          url: prospect.url,
          source: prospect.source,
          discoveredVia: prospect.discoveredVia.slice(0, 500),
          referringDomains: prospect.referringDomains,
          organicTraffic: prospect.organicTraffic,
          providerRank: prospect.providerRank,
          title: prospect.title,
        },
      })
    );
    created++;
  }

  return { created, enriched };
}

async function runChannel(
  source: ChannelOutcome['source'],
  campaignId: string,
  limit: number,
  run: () => Promise<DiscoveryResult>
): Promise<ChannelOutcome> {
  try {
    const result = await run();
    const { created, enriched } = await persist(campaignId, result.prospects, limit);

    return {
      source,
      ok: true,
      found: result.prospects.length,
      created,
      enriched,
      costUsd: result.costUsd,
      warnings: result.warnings,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[link-discover] ${source} failed for ${campaignId}: ${message}`);

    return {
      source,
      ok: false,
      found: 0,
      created: 0,
      enriched: 0,
      costUsd: 0,
      warnings: [],
      error: message,
      //  A DiscoveryError with no credentials is a configuration state, not a
      //  fault, and the dashboard should offer to connect the provider rather
      //  than show a red error.
      skipped: err instanceof DiscoveryError && message.includes('are not set'),
    };
  }
}

export async function runLinkDiscovery(
  options: DiscoverRunOptions = {}
): Promise<DiscoverRunStats> {
  const {
    campaignId,
    clientId,
    only,
    maxPerCampaign = DEFAULT_MAX_PER_CAMPAIGN,
    signal,
  } = options;

  const startedAt = Date.now();
  const creds = credentials();
  const hasProvider = hasDataForSeoCredentials(creds);

  const campaigns = await withRetry(() =>
    db.linkCampaign.findMany({
      where: {
        enabled: true,
        ...(campaignId ? { id: campaignId } : {}),
        ...(clientId ? { clientId } : {}),
      },
      select: {
        id: true,
        name: true,
        targetDomain: true,
        competitors: true,
        topic: true,
        seedUrls: true,
      },
    })
  );

  const stats: DiscoverRunStats = {
    campaigns: [],
    totalCreated: 0,
    totalCostUsd: 0,
    elapsedMs: 0,
  };

  const wants = (source: NonNullable<DiscoverRunOptions['only']>[number]) =>
    !only || only.includes(source);

  for (const campaign of campaigns) {
    if (signal?.aborted) break;

    const channels: ChannelOutcome[] = [];

    if (wants('backlink_gap') && campaign.competitors.length >= 2) {
      channels.push(
        await runChannel('backlink_gap', campaign.id, maxPerCampaign, () =>
          discoverBacklinkGap({
            competitors: campaign.competitors,
            excludeDomain: campaign.targetDomain,
            credentials: creds,
            signal,
          })
        )
      );
    }

    if (wants('serp_footprint') && campaign.topic) {
      channels.push(
        await runChannel('serp_footprint', campaign.id, maxPerCampaign, () =>
          discoverSerpFootprints({
            topic: campaign.topic!,
            excludeDomain: campaign.targetDomain,
            credentials: creds,
            signal,
          })
        )
      );
    }

    if (wants('link_neighbourhood') && campaign.seedUrls.length > 0) {
      //  Every domain already on this campaign, so the free channel reports
      //  only what is new rather than re-listing the whole prospect table.
      const known = await withRetry(() =>
        db.linkProspect.findMany({
          where: { campaignId: campaign.id },
          select: { domain: true },
        })
      );

      channels.push(
        await runChannel('link_neighbourhood', campaign.id, maxPerCampaign, () =>
          discoverLinkNeighbourhood({
            seedUrls: campaign.seedUrls,
            excludeDomain: campaign.targetDomain,
            knownDomains: known.map((k) => k.domain),
            fetcher: (url) => fetchPage(url, { signal }),
            signal,
          })
        )
      );
    }

    if (channels.length === 0) {
      //  Nothing to run is a configuration gap worth naming, not silence.
      channels.push({
        source: 'none',
        ok: false,
        found: 0,
        created: 0,
        enriched: 0,
        costUsd: 0,
        warnings: [],
        error:
          'Campaign has no competitors, topic or seedUrls set, so no channel could run.',
        skipped: true,
      });
    }

    const created = channels.reduce((sum, c) => sum + c.created, 0);
    const costUsd = channels.reduce((sum, c) => sum + c.costUsd, 0);

    stats.campaigns.push({ campaignId: campaign.id, name: campaign.name, channels, created, costUsd });
    stats.totalCreated += created;
    stats.totalCostUsd += costUsd;
  }

  stats.elapsedMs = Date.now() - startedAt;

  if (!hasProvider) {
    console.warn(
      '[link-discover] DataForSEO credentials absent — only the free ' +
        'link-neighbourhood channel ran.'
    );
  }

  return stats;
}
