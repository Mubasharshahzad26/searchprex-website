// ═══════════════════════════════════════════════════════════
//  core/discovery/serper.ts — the cheap SERP provider
//
//  PORTABLE: the key is passed in, never read from the
//  environment here.
//
//  Serper returns Google results for a fraction of what the
//  equivalent DataForSEO call costs, which matters because the
//  footprint channel spends one search per query per topic and
//  that is the whole reason the channel has a budget at all.
//
//  Same rule as every paid adapter in this directory: WITHOUT A
//  KEY IT THROWS. It never returns an empty list, because "no
//  results" and "we never asked" look identical downstream and
//  only one of them is a finding.
//
//  Response shape confirmed against a live call rather than
//  assumed: { organic: [{ title, link, snippet, position }],
//  credits }. The `credits` field is what the run reports as
//  spend.
// ═══════════════════════════════════════════════════════════

import { DiscoveryError, type DiscoverySource } from './types';

const ENDPOINT = 'https://google.serper.dev/search';

/** One normalised result, provider-agnostic. */
export interface SearchHit {
  url: string;
  title?: string;
}

/** What every SERP provider must return, whichever one is in use. */
export interface SearchResult {
  keyword: string;
  hits: SearchHit[];
}

export interface SearchOutcome {
  results: SearchResult[];
  /** Provider spend. Serper reports credits; one credit is one search. */
  cost: number;
  warnings: string[];
}

/** A provider. Injected so the channel is not tied to one vendor. */
export type SearchProvider = (
  queries: string[],
  options: { locationCode: string; languageCode: string; depth: number; signal?: AbortSignal }
) => Promise<SearchOutcome>;

export function hasSerperKey(key: string | undefined | null): key is string {
  return Boolean(key?.trim());
}

interface SerperResponse {
  organic?: Array<{ title?: string; link?: string; position?: number }>;
  credits?: number;
}

/**
 * Builds a Serper-backed provider.
 *
 * Queries run one request each — Serper has no batch endpoint — but they are
 * issued together rather than in series, so the channel still costs one round
 * trip in wall-clock terms.
 */
export function createSerperSearch(key: string | undefined | null, source: DiscoverySource): SearchProvider {
  return async (queries, { locationCode, languageCode, depth, signal }) => {
    if (!hasSerperKey(key)) {
      throw new DiscoveryError(
        'SERPER_API_KEY is not set. This channel needs a live provider — it will not ' +
          'return estimated prospects.',
        source
      );
    }

    const settled = await Promise.allSettled(
      queries.map(async (q) => {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          signal,
          headers: { 'X-API-KEY': key, 'Content-Type': 'application/json' },
          body: JSON.stringify({ q, gl: locationCode, hl: languageCode, num: depth }),
        });

        if (res.status === 401 || res.status === 403) {
          throw new DiscoveryError('Serper rejected the API key.', source);
        }
        if (res.status === 429) {
          throw new DiscoveryError('Serper rate limit or credit limit hit.', source, true);
        }
        if (!res.ok) {
          //  The provider's own explanation, not just the status. "HTTP 400"
          //  alone sends you guessing at which parameter it disliked.
          const detail = await res.text().catch(() => '');

          //  Serper's free tier rejects search operators. Worth naming
          //  explicitly: the fix is a template change, not a credential or
          //  quota problem, and the raw 400 reads like neither.
          if (detail.includes('not allowed for free accounts')) {
            throw new DiscoveryError(
              `Serper's free tier rejected "${q}" — it does not allow search operators ` +
                'such as quoted phrases. Use FOOTPRINT_TEMPLATES (operator-free, the ' +
                'default) or upgrade the Serper plan to use FOOTPRINT_TEMPLATES_ADVANCED.',
              source
            );
          }

          throw new DiscoveryError(
            `Serper returned HTTP ${res.status} for "${q}": ${detail.slice(0, 200) || '(no body)'}`,
            source,
            res.status >= 500
          );
        }

        const body = (await res.json()) as SerperResponse;
        return { q, body };
      })
    );

    const results: SearchResult[] = [];
    const warnings: string[] = [];
    let cost = 0;

    for (const [index, outcome] of settled.entries()) {
      if (outcome.status === 'rejected') {
        const reason = outcome.reason;
        //  A key or credit problem affects every query, so it is fatal rather
        //  than a per-query warning that leaves a misleadingly short list.
        if (reason instanceof DiscoveryError && !reason.retryable) throw reason;
        warnings.push(
          `"${queries[index]}": ${reason instanceof Error ? reason.message : String(reason)}`
        );
        continue;
      }

      const { q, body } = outcome.value;
      cost += body.credits ?? 1;

      results.push({
        keyword: q,
        hits: (body.organic ?? [])
          .filter((item) => typeof item.link === 'string' && item.link)
          .map((item) => ({ url: item.link as string, title: item.title?.trim() || undefined })),
      });
    }

    if (results.length === 0) {
      throw new DiscoveryError(
        `Every Serper query failed: ${warnings.slice(0, 2).join('; ')}`,
        source,
        true
      );
    }

    return { results, cost, warnings };
  };
}
