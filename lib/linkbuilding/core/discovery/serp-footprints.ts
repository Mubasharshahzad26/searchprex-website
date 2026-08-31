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

  //  One task per query in a single request. DataForSEO bills per task either
  //  way, and batching keeps the run to one round trip instead of four.
  const { results, costUsd, warnings } = await callDataForSeo<{
    keyword?: string;
    items?: SerpItem[] | null;
  }>(
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

  const prospects: RawProspect[] = [];
  const seen = new Set<string>();

  for (const result of results) {
    const keyword = result.keyword ?? cleanTopic;

    for (const item of result.items ?? []) {
      //  The items array carries maps, videos, people-also-ask and more.
      //  Only organic results are pages someone could add a link to.
      if (item.type && item.type !== 'organic') continue;

      const rawUrl = item.url;
      if (!rawUrl) continue;

      const url = canonicalizeUrl(rawUrl);
      const domain = hostOf(rawUrl);
      if (!url || !domain) continue;

      if (sameSite(url, cleanExclude)) continue;
      if (seen.has(url)) continue;
      seen.add(url);

      prospects.push({
        url,
        domain,
        source: SOURCE,
        discoveredVia: `ranked for "${keyword}"`,
        title: item.title?.trim() || undefined,
      });
    }
  }

  return { prospects, costUsd, warnings };
}
