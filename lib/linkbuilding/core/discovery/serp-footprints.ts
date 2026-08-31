// ═══════════════════════════════════════════════════════════
//  core/discovery/serp-footprints.ts
//
//  Pages that exist to link out — resource lists, roundups,
//  "best of" posts — found by searching the patterns they share.
//
//  PORTABLE.
//
//  Uses /v3/serp/google/organic/live/advanced, the same endpoint
//  and payload shape already proven in app/api/serp-checker and
//  scripts/verify-dataforseo.ts, so the parsing here is not a
//  guess the way the backlinks item shape is.
//
//  Deliberately NOT included: "write for us", "submit a guest
//  post" and "sponsored post" footprints. Those find sites that
//  sell placements, which scoreProspect hard-rejects anyway —
//  searching for them spends money to generate rows we then throw
//  away, and builds a prospect list whose defining trait is that
//  it sells links.
// ═══════════════════════════════════════════════════════════

import { canonicalizeUrl, hostOf, sameSite } from '../normalize';
import { callDataForSeo, type DataForSeoCredentials } from './dataforseo';
import type { SearchProvider } from './serper';
import { DiscoveryError, type DiscoveryResult, type RawProspect } from './types';

const SOURCE = 'serp_footprint' as const;
const ENDPOINT = '/v3/serp/google/organic/live/advanced';

/**
 * Query templates. `{topic}` is substituted with the campaign's topic.
 *
 * Each one targets a page type that links out editorially. Kept short because
 * every template is a paid SERP call per topic, and the first four earn their
 * cost far more reliably than a long tail of clever operators.
 */
export const FOOTPRINT_TEMPLATES = [
  'best {topic} blogs',
  '{topic} resources page',
  'top {topic} websites',
  '{topic} roundup',
] as const;

/**
 * The same intent expressed with search operators — more precise, and rejected
 * by Serper's free tier with "Query pattern not allowed for free accounts".
 *
 * Quoted phrases narrow the results to pages that literally use the wording a
 * links page uses, so they are worth switching to on a paid plan. Pass them as
 * `templates` when the account allows it.
 */
export const FOOTPRINT_TEMPLATES_ADVANCED = [
  '{topic} "resources"',
  '{topic} "useful links"',
  'best {topic} blogs',
  '{topic} roundup',
] as const;

export interface SerpFootprintOptions {
  /** Campaign topic, e.g. "survival knives" or "personal injury law". */
  topic: string;
  /** Our domain — our own pages are filtered from the results. */
  excludeDomain: string;
  locationName?: string;
  languageCode?: string;
  /** Results per query. Each query is one paid call regardless. */
  depth?: number;
  templates?: readonly string[];
  credentials: Partial<DataForSeoCredentials> | null | undefined;
  /**
   * Which provider actually runs the searches. Omitted, the channel uses
   * DataForSEO, which is what it always did.
   *
   * Injected rather than switched on inside, so the query templates and the
   * filtering below stay in one place no matter who answers them — and so a
   * provider can be tested without a network.
   */
  search?: SearchProvider;
  signal?: AbortSignal;
}

interface SerpItem {
  type?: string;
  url?: string;
  title?: string;
  domain?: string;
}

export async function discoverSerpFootprints(
  options: SerpFootprintOptions
): Promise<DiscoveryResult> {
  const {
    topic,
    excludeDomain,
    locationName = 'United States',
    languageCode = 'en',
    depth = 20,
    templates = FOOTPRINT_TEMPLATES,
    credentials,
    search,
    signal,
  } = options;

  const cleanTopic = topic.trim();
  if (!cleanTopic) {
    throw new DiscoveryError('A topic is required to build footprint queries.', SOURCE);
  }

  const cleanExclude = hostOf(excludeDomain);
  if (!cleanExclude) {
    throw new DiscoveryError(`excludeDomain is not parseable: ${excludeDomain}`, SOURCE);
  }

  const queries = templates.map((template) => template.replace('{topic}', cleanTopic));

  //  When a provider is injected it answers; otherwise DataForSEO does, in one
  //  request with one task per query. Either way the templates above and the
  //  filtering below are the same, which is the point of the seam.
  let normalised: Array<{ keyword: string; hits: Array<{ url: string; title?: string }> }>;
  let costUsd: number;
  let costUnit: 'usd' | 'credits';
  let warnings: string[];

  if (search) {
    const outcome = await search(queries, {
      //  Serper wants a two-letter country code, DataForSEO a location name.
      //  Mapping the common case keeps one option on the public interface.
      locationCode: locationName === 'United States' ? 'us' : locationName.slice(0, 2).toLowerCase(),
      languageCode,
      depth,
      signal,
    });
    normalised = outcome.results;
    costUsd = outcome.cost;
    costUnit = 'credits';
    warnings = outcome.warnings;
  } else {
    const provider = await callDataForSeo<{ keyword?: string; items?: SerpItem[] | null }>(
      ENDPOINT,
      queries.map((keyword) => ({
        keyword,
        location_name: locationName,
        language_code: languageCode,
        device: 'desktop',
        depth,
      })),
      credentials,
      SOURCE,
      { signal }
    );

    normalised = provider.results.map((result) => ({
      keyword: result.keyword ?? cleanTopic,
      hits: (result.items ?? [])
        //  The items array carries maps, videos, people-also-ask and more. Only
        //  organic results are pages someone could add a link to.
        .filter((item) => !item.type || item.type === 'organic')
        .filter((item): item is SerpItem & { url: string } => typeof item.url === 'string')
        .map((item) => ({ url: item.url, title: item.title?.trim() || undefined })),
    }));
    costUsd = provider.costUsd;
    costUnit = 'usd';
    warnings = provider.warnings;
  }

  const prospects: RawProspect[] = [];
  const seen = new Set<string>();

  for (const result of normalised) {
    for (const hit of result.hits) {
      const url = canonicalizeUrl(hit.url);
      const domain = hostOf(hit.url);
      if (!url || !domain) continue;

      if (sameSite(url, cleanExclude)) continue;
      if (seen.has(url)) continue;
      seen.add(url);

      prospects.push({
        url,
        domain,
        source: SOURCE,
        discoveredVia: `ranked for "${result.keyword}"`,
        title: hit.title,
      });
    }
  }

  return { prospects, costUsd, costUnit, warnings };
}
