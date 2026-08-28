// ═══════════════════════════════════════════════════════════
//  core/discovery/link-neighbourhood.ts
//
//  Mines the outbound links of pages you already know are good.
//
//  PORTABLE, and free — a fetch per seed, no provider account.
//  This is the channel that works before DataForSEO credentials
//  exist, and it stays useful after: a resource page that links to
//  four of your competitors is a list of the exact sites worth
//  approaching, written by someone who already did the curation.
//
//  Seeds are supplied by the caller — competitor resource pages,
//  industry hubs, an association's members page, the "further
//  reading" section of a ranking article.
//
//  One hop only, deliberately. Following discovered links outward
//  turns a bounded job into a crawl of the open web, and by the
//  second hop the topical relationship to the seed is gone.
// ═══════════════════════════════════════════════════════════

import { canonicalizeUrl, hostOf, sameSite } from '../normalize.js';
import { extractOutboundLinks } from '../verify.js';
import type { FetchOutcome } from '../fetch.js';
import { DiscoveryError, type DiscoveryResult, type RawProspect } from './types.js';

const SOURCE = 'link_neighbourhood' as const;

/**
 * Hosts that appear in nearly every page's outbound links and are never a link
 * prospect. Filtering them here keeps thousands of junk rows out of the
 * database rather than relying on the scorer to reject them one fetch at a time.
 */
const UBIQUITOUS_HOSTS = [
  'facebook.com',
  'twitter.com',
  'x.com',
  'instagram.com',
  'linkedin.com',
  'youtube.com',
  'youtu.be',
  'pinterest.com',
  'tiktok.com',
  'reddit.com',
  'wikipedia.org',
  'google.com',
  'apple.com',
  'microsoft.com',
  'amazon.com',
  'paypal.com',
  'wordpress.org',
  'gravatar.com',
  'w3.org',
  'schema.org',
  'gstatic.com',
  'googleapis.com',
  'cloudflare.com',
  'archive.org',
  'creativecommons.org',
];

function isUbiquitous(domain: string): boolean {
  return UBIQUITOUS_HOSTS.some((host) => domain === host || domain.endsWith(`.${host}`));
}

export interface LinkNeighbourhoodOptions {
  /** Pages to mine. Resource lists and roundups pay off best. */
  seedUrls: string[];
  /** Our domain — our own pages are never prospects. */
  excludeDomain: string;
  /** Domains already known, so the run reports only what is new. */
  knownDomains?: Iterable<string>;
  /**
   * A domain must appear across at least this many seeds. At 1 you get
   * everything each seed links to; at 2+ you get the sites the curators
   * agree on, which is a much shorter and much better list.
   */
  minSeedAppearances?: number;
  /** Injected so this module stays free of I/O policy and stays testable. */
  fetcher: (url: string) => Promise<FetchOutcome>;
  signal?: AbortSignal;
}

export async function discoverLinkNeighbourhood(
  options: LinkNeighbourhoodOptions
): Promise<DiscoveryResult> {
  const {
    seedUrls,
    excludeDomain,
    knownDomains = [],
    minSeedAppearances = 1,
    fetcher,
    signal,
  } = options;

  const cleanExclude = hostOf(excludeDomain);
  if (!cleanExclude) {
    throw new DiscoveryError(`excludeDomain is not parseable: ${excludeDomain}`, SOURCE);
  }

  const seeds = [...new Set(seedUrls.map((u) => canonicalizeUrl(u)).filter(Boolean))] as string[];
  if (seeds.length === 0) {
    throw new DiscoveryError('No parseable seed URLs were supplied.', SOURCE);
  }

  const known = new Set<string>();
  for (const domain of knownDomains) {
    const host = hostOf(domain);
    if (host) known.add(host);
  }

  const warnings: string[] = [];

  //  Per discovered domain: which seeds linked to it, and the best URL seen.
  //  Counting seeds rather than links matters — one seed linking to a domain
  //  six times is one endorsement, not six.
  const byDomain = new Map<string, { seeds: Set<string>; url: string; title?: string }>();

  let reached = 0;

  for (const seed of seeds) {
    if (signal?.aborted) break;

    let outcome: FetchOutcome;
    try {
      outcome = await fetcher(seed);
    } catch (err) {
      warnings.push(`${seed}: fetch threw (${err instanceof Error ? err.message : String(err)})`);
      continue;
    }

    if (!outcome.ok || !outcome.html) {
      warnings.push(
        `${seed}: ${outcome.blocked ? 'blocked by a bot wall' : outcome.error ?? 'unreachable'}`
      );
      continue;
    }

    reached++;

    for (const link of extractOutboundLinks(outcome.html, outcome.finalUrl)) {
      const domain = hostOf(link);
      if (!domain) continue;
      if (domain === cleanExclude || sameSite(link, cleanExclude)) continue;
      if (isUbiquitous(domain)) continue;
      if (known.has(domain)) continue;

      const url = canonicalizeUrl(link);
      if (!url) continue;

      const existing = byDomain.get(domain);
      if (existing) {
        existing.seeds.add(seed);
      } else {
        byDomain.set(domain, { seeds: new Set([seed]), url });
      }
    }
  }

  if (reached === 0) {
    throw new DiscoveryError(
      `None of the ${seeds.length} seed page(s) could be read: ${warnings
        .slice(0, 3)
        .join('; ')}`,
      SOURCE,
      true
    );
  }

  if (reached < seeds.length) {
    warnings.push(`${seeds.length - reached} of ${seeds.length} seed(s) could not be read`);
  }

  //  The threshold is only meaningful once there are enough seeds to clear it.
  //  Applying minSeedAppearances=3 after two seeds failed would return nothing
  //  and look like "no opportunities" rather than "not enough evidence".
  const effectiveThreshold = Math.min(minSeedAppearances, reached);
  if (effectiveThreshold < minSeedAppearances) {
    warnings.push(
      `minSeedAppearances lowered to ${effectiveThreshold}: only ${reached} seed(s) were readable`
    );
  }

  const prospects: RawProspect[] = [];

  for (const [domain, entry] of byDomain) {
    if (entry.seeds.size < effectiveThreshold) continue;

    prospects.push({
      url: entry.url,
      domain,
      source: SOURCE,
      discoveredVia:
        entry.seeds.size === 1
          ? `linked from ${[...entry.seeds][0]}`
          : `linked from ${entry.seeds.size} seed pages`,
    });
  }

  //  Most-endorsed first, so a truncated import keeps the best rows.
  prospects.sort((a, b) => {
    const aSeeds = byDomain.get(a.domain)?.seeds.size ?? 0;
    const bSeeds = byDomain.get(b.domain)?.seeds.size ?? 0;
    return bSeeds - aSeeds;
  });

  return { prospects, costUsd: 0, warnings };
}
