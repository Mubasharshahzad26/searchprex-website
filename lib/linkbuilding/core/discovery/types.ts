// ═══════════════════════════════════════════════════════════
//  core/discovery/types.ts — what every adapter must return
//
//  PORTABLE: types only.
//
//  Adapters differ wildly in what they know. A backlink-gap
//  lookup arrives with referring-domain counts already attached;
//  a page crawl arrives with a URL and nothing else. RawProspect
//  makes that difference explicit instead of letting each adapter
//  invent placeholder numbers — a metric that was never measured
//  must stay undefined all the way into scoreProspect, which
//  reports it under `missingSignals` rather than scoring it.
// ═══════════════════════════════════════════════════════════

/** Where a prospect came from. Recorded so a bad channel can be switched off. */
export type DiscoverySource =
  /** Domains linking to competitors but not to us (DataForSEO). */
  | 'backlink_gap'
  /** SERP footprint queries — resource pages, roundups (DataForSEO). */
  | 'serp_footprint'
  /** Outbound links mined from a seed page. Free. */
  | 'link_neighbourhood'
  /** Hand-added. */
  | 'manual';

export interface RawProspect {
  /** Page worth approaching. Absolute, canonicalised by the adapter. */
  url: string;
  /** Bare host, no `www.`. */
  domain: string;
  source: DiscoverySource;
  /**
   * Human-readable trail: the competitor whose profile it came from, the
   * footprint query that surfaced it, the page it was mined from. Shown in the
   * dashboard so "why is this here?" has an answer.
   */
  discoveredVia: string;

  //  Optional, and genuinely optional — absent means unmeasured, never zero.
  referringDomains?: number;
  organicTraffic?: number;
  /** Provider's own authority score, kept only as a tiebreak. */
  providerRank?: number;
  /** ISO date the provider first saw a link from this domain. */
  firstSeen?: string;
  title?: string;
}

export interface DiscoveryResult {
  prospects: RawProspect[];
  /** Provider spend for this call, in USD, when the provider reports it. */
  costUsd: number;
  /** Non-fatal problems worth surfacing — partial pages, unparsed rows. */
  warnings: string[];
}

/**
 * Thrown when an adapter cannot run at all: missing credentials, a provider
 * error, an unusable response.
 *
 * Deliberately fatal rather than degrading to an empty list. An adapter that
 * silently returns nothing looks identical to a niche with no opportunities,
 * and the run would report "0 prospects found" as if that were a finding.
 */
export class DiscoveryError extends Error {
  constructor(
    message: string,
    readonly source: DiscoverySource,
    readonly retryable = false
  ) {
    super(message);
    this.name = 'DiscoveryError';
  }
}
