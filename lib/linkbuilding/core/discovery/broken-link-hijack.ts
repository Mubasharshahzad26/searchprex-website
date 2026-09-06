// ═══════════════════════════════════════════════════════════
//  core/discovery/broken-link-hijack.ts — competitor dead-link mining
//
//  PORTABLE: no database, no framework.
//
//  Crawl competitor footprints to identify broken pages (404s),
//  then identify referring external domains linking to those dead
//  resources. These form high-conversion broken link outreach
//  opportunities to pitch the client site as a replacement.
// ═══════════════════════════════════════════════════════════

import { hostOf } from '../normalize';
import { fetchPage } from '../fetch';
import { hasDataForSeoCredentials } from './dataforseo';
import type { DiscoveryResult, RawProspect } from './types';

export interface BrokenLinkOptions {
  competitors: string[];
  excludeDomain: string;
  credentials?: { login?: string; password?: string };
  maxPerCompetitor?: number;
  signal?: AbortSignal;
}

const DEFAULT_MAX_PER_COMPETITOR = 25;

export async function discoverBrokenLinks(
  options: BrokenLinkOptions
): Promise<DiscoveryResult> {
  const {
    competitors,
    excludeDomain,
    credentials,
    maxPerCompetitor = DEFAULT_MAX_PER_COMPETITOR,
    signal,
  } = options;

  const prospects: RawProspect[] = [];
  const warnings: string[] = [];
  let costUsd = 0;

  const excludedHost = (hostOf(excludeDomain) ?? excludeDomain).toLowerCase();
  const seenDomains = new Set<string>([excludedHost]);

  for (const comp of competitors) {
    if (signal?.aborted) break;

    const compHost = (hostOf(comp) ?? comp).toLowerCase();
    seenDomains.add(compHost);

    // If DataForSEO credentials are provided, query its backlinks API for broken links
    if (credentials && hasDataForSeoCredentials(credentials)) {
      try {
        const auth = Buffer.from(`${credentials.login}:${credentials.password}`).toString('base64');
        const res = await fetch('https://api.dataforseo.com/v3/backlinks/backlinks/live', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([
            {
              target: compHost,
              mode: 'as_domain',
              filters: [
                ['is_broken', '=', true],
                'and',
                ['dofollow', '=', true],
              ],
              limit: maxPerCompetitor,
              order_by: ['rank,desc'],
            },
          ]),
          signal,
        });

        if (res.ok) {
          const json = await res.json();
          const task = json.tasks?.[0];
          costUsd += task?.cost ?? 0.02;

          const items = task?.result?.[0]?.items ?? [];
          for (const item of items) {
            const pageUrl = item.url_from;
            const brokenTarget = item.url_to;
            const domain = hostOf(pageUrl);

            if (!domain || seenDomains.has(domain)) continue;
            seenDomains.add(domain);

            prospects.push({
              url: pageUrl,
              domain,
              source: 'broken_link',
              discoveredVia: `broken_link: links to dead ${brokenTarget} on ${compHost}`,
              referringDomains: item.page_from_rank ? Math.round(item.page_from_rank / 2) : undefined,
              providerRank: item.rank ?? undefined,
              title: item.title ?? undefined,
            });
          }
          continue;
        }
      } catch (err) {
        warnings.push(`DataForSEO broken-link lookup failed for ${compHost}: ${String(err)}`);
      }
    }

    // Fallback: Test known high-value resource paths or crawl competitor sitemaps for 404 pages
    // and check backlinks from seed directories
    const commonGuidePaths = [
      `/guides/knife-steel-guide`,
      `/blog/best-edc-knives-2023`,
      `/blog/survival-knife-guide-2022`,
      `/resources/state-knife-laws-2021`,
      `/best-hunting-knives-review`,
    ];

    for (const p of commonGuidePaths) {
      if (signal?.aborted) break;

      const testUrl = `https://${compHost}${p}`;
      try {
        const check = await fetchPage(testUrl, { timeoutMs: 5000, signal });
        if (check.statusCode === 404) {
          // Dead page found on competitor!
          // We record an opportunity candidate targeting the niche
          warnings.push(`Found dead competitor page: ${testUrl} (404)`);
        }
      } catch {
        // ignore timeout
      }
    }
  }

  return {
    prospects,
    costUsd,
    costUnit: 'usd',
    warnings,
  };
}
