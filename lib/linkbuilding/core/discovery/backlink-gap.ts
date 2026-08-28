// ═══════════════════════════════════════════════════════════
//  core/discovery/backlink-gap.ts
//
//  Domains that link to competitors but not to us. The highest-
//  intent channel there is: every result is a site that has
//  already chosen to link to something in this niche, so the ask
//  is "you covered them, consider us" rather than a cold pitch.
//
//  PORTABLE.
//
//  ── On the response shape ──
//  The /v3/backlinks/domain_intersection/live envelope is stable
//  and handled in dataforseo.ts. The per-item fields below are
//  parsed defensively on purpose: item shape varies with the
//  filters sent, and a field this file guesses wrong must degrade
//  to `undefined` (reported as an unmeasured signal) rather than
//  to a number nobody measured. Run
//  scripts/verify-dataforseo-backlinks.ts to dump a real response
//  and confirm the field names against a live account.
// ═══════════════════════════════════════════════════════════

import { canonicalizeUrl, hostOf } from '../normalize.js';
import { callDataForSeo, type DataForSeoCredentials } from './dataforseo.js';
import { DiscoveryError, type DiscoveryResult, type RawProspect } from './types.js';

const SOURCE = 'backlink_gap' as const;
const ENDPOINT = '/v3/backlinks/domain_intersection/live';

export interface BacklinkGapOptions {
  /** Competitor domains whose profiles we want to mine. 2–20 is sensible. */
  competitors: string[];
  /** Our domain. Anything already linking to us is filtered out. */
  excludeDomain: string;
  limit?: number;
  /**
   * Domains must link to at least this many competitors. Raising it trades
   * volume for intent — a site linking to four competitors is demonstrably
   * covering the category, one linking to a single competitor may just have
   * mentioned them once.
   */
  minIntersections?: number;
  credentials: Partial<DataForSeoCredentials> | null | undefined;
  signal?: AbortSignal;
}

/** Reads a numeric field, refusing anything that is not a finite number. */
function num(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

export async function discoverBacklinkGap(
  options: BacklinkGapOptions
): Promise<DiscoveryResult> {
  const {
    competitors,
    excludeDomain,
    limit = 100,
    minIntersections = 2,
    credentials,
    signal,
  } = options;

  const cleanCompetitors = [...new Set(competitors.map((c) => hostOf(c)).filter(Boolean))] as string[];
  const cleanExclude = hostOf(excludeDomain);

  if (cleanCompetitors.length < 2) {
    throw new DiscoveryError(
      'Backlink-gap needs at least two parseable competitor domains — an ' +
        'intersection of one is just that competitor\'s backlink list.',
      SOURCE
    );
  }
  if (!cleanExclude) {
    throw new DiscoveryError(`excludeDomain is not parseable: ${excludeDomain}`, SOURCE);
  }
  if (minIntersections > cleanCompetitors.length) {
    throw new DiscoveryError(
      `minIntersections (${minIntersections}) exceeds the number of competitors ` +
        `(${cleanCompetitors.length}), so nothing can ever match.`,
      SOURCE
    );
  }

  //  The API keys targets by position and echoes those keys back on each item,
  //  so the mapping has to be kept to name which competitors a domain covers.
  const targets: Record<string, string> = {};
  cleanCompetitors.forEach((domain, index) => {
    targets[String(index + 1)] = domain;
  });

  const { results, costUsd, warnings } = await callDataForSeo<Record<string, unknown>>(
    ENDPOINT,
    [
      {
        targets,
        exclude_targets: [cleanExclude],
        //  Ranked by the provider's own authority so a truncated page is the
        //  strongest N rather than an arbitrary N.
        order_by: ['rank,desc'],
        limit,
      },
    ],
    credentials,
    SOURCE,
    { signal }
  );

  const prospects: RawProspect[] = [];
  const seen = new Set<string>();
  let unparsed = 0;

  for (const result of results) {
    const items = Array.isArray((result as any)?.items) ? (result as any).items : [];

    for (const item of items as Array<Record<string, unknown>>) {
      const domain = hostOf(str(item.domain) ?? '');
      if (!domain) {
        unparsed++;
        continue;
      }
      if (seen.has(domain)) continue;

      //  Which competitors this domain links to. The numeric keys correspond to
      //  `targets` above; a missing key simply means no link to that one.
      const covering = Object.entries(targets)
        .filter(([key]) => item[key] != null)
        .map(([, competitor]) => competitor);

      //  When the shape does not carry per-target keys we cannot tell how many
      //  competitors are covered, so the threshold is not applied rather than
      //  applied against a guess.
      if (covering.length > 0 && covering.length < minIntersections) continue;

      seen.add(domain);

      const url = canonicalizeUrl(domain);
      if (!url) {
        unparsed++;
        continue;
      }

      prospects.push({
        url,
        domain,
        source: SOURCE,
        discoveredVia:
          covering.length > 0
            ? `links to ${covering.join(', ')}`
            : `backlink gap vs ${cleanCompetitors.join(', ')}`,
        referringDomains: num(item.referring_domains),
        providerRank: num(item.rank),
        firstSeen: str(item.first_seen),
      });
    }
  }

  if (unparsed > 0) {
    warnings.push(
      `${unparsed} row(s) had no usable domain field — check the response shape ` +
        'with scripts/verify-dataforseo-backlinks.ts'
    );
  }

  return { prospects, costUsd, warnings };
}
