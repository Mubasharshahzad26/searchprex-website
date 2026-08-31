/**
 * scripts/test-link-discovery.ts
 *
 * Fixture tests for Phase 1 — discovery adapters and qualification.
 * No database, no network: the fetcher is injected, so every case is
 * deterministic.
 *
 *   npx tsx scripts/test-link-discovery.ts
 *
 * The DataForSEO adapters are tested for the behaviour that matters without
 * credentials: that they REFUSE rather than return estimated prospects.
 */
import type { FetchOutcome } from '../lib/linkbuilding/core/fetch';
import { discoverLinkNeighbourhood } from '../lib/linkbuilding/core/discovery/link-neighbourhood';
import { discoverBacklinkGap } from '../lib/linkbuilding/core/discovery/backlink-gap';
import { discoverSerpFootprints } from '../lib/linkbuilding/core/discovery/serp-footprints';
import { hasDataForSeoCredentials } from '../lib/linkbuilding/core/discovery/dataforseo';
import { createSerperSearch, hasSerperKey, type SearchProvider } from '../lib/linkbuilding/core/discovery/serper';
import { DiscoveryError } from '../lib/linkbuilding/core/discovery/types';
import { qualifyProspect } from '../lib/linkbuilding/core/qualify';
import { extractOutboundLinks } from '../lib/linkbuilding/core/verify';

let passed = 0;
const failures: string[] = [];

function check(label: string, actual: unknown, expected: unknown) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  if (a === b) {
    passed++;
    console.log(`  ✓ ${label}`);
  } else {
    failures.push(`${label}\n      expected: ${b}\n      actual:   ${a}`);
    console.log(`  ✗ ${label}  (expected ${b}, got ${a})`);
  }
}

async function throws(label: string, fn: () => Promise<unknown>, matcher: RegExp) {
  try {
    await fn();
    failures.push(`${label} — expected a throw, got none`);
    console.log(`  ✗ ${label}  (no throw)`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (err instanceof DiscoveryError && matcher.test(message)) {
      passed++;
      console.log(`  ✓ ${label}`);
    } else {
      failures.push(`${label} — wrong error: ${message}`);
      console.log(`  ✗ ${label}  (got: ${message.slice(0, 90)})`);
    }
  }
}

function ok(html: string, url: string): FetchOutcome {
  return { ok: true, statusCode: 200, finalUrl: url, html, blocked: false, elapsedMs: 1 };
}

function blocked(url: string): FetchOutcome {
  return {
    ok: false,
    statusCode: 403,
    finalUrl: url,
    html: null,
    blocked: true,
    error: 'bot_challenge',
    elapsedMs: 1,
  };
}

const NO_CREDS = { login: '', password: '' };

async function main() {
  console.log('\ncredential gate');
  check('empty creds are not usable', hasDataForSeoCredentials(NO_CREDS), false);
  check('whitespace is not a credential', hasDataForSeoCredentials({ login: ' ', password: ' ' }), false);
  check('undefined is not usable', hasDataForSeoCredentials(undefined), false);
  check('a real pair is usable', hasDataForSeoCredentials({ login: 'a', password: 'b' }), true);

  console.log('\npaid adapters refuse rather than invent');
  await throws(
    'backlink gap without credentials',
    () =>
      discoverBacklinkGap({
        competitors: ['a.com', 'b.com'],
        excludeDomain: 'mine.com',
        credentials: NO_CREDS,
      }),
    /are not set/
  );
  await throws(
    'serp footprints without credentials',
    () =>
      discoverSerpFootprints({
        topic: 'knives',
        excludeDomain: 'mine.com',
        credentials: NO_CREDS,
      }),
    /are not set/
  );

  console.log('\nbacklink gap — argument validation runs before any spend');
  await throws(
    'one competitor is not an intersection',
    () =>
      discoverBacklinkGap({
        competitors: ['a.com'],
        excludeDomain: 'mine.com',
        credentials: { login: 'x', password: 'y' },
      }),
    /at least two/
  );
  await throws(
    'an unreachable threshold is caught up front',
    () =>
      discoverBacklinkGap({
        competitors: ['a.com', 'b.com'],
        excludeDomain: 'mine.com',
        minIntersections: 5,
        credentials: { login: 'x', password: 'y' },
      }),
    /exceeds the number of competitors/
  );

  console.log('\nserp footprints - provider seam');
  check('an empty serper key is not usable', hasSerperKey(''), false);
  check('whitespace is not a key', hasSerperKey('  '), false);
  check('a real key is usable', hasSerperKey('abc'), true);

  await throws(
    'serper refuses without a key, same as every paid adapter',
    () =>
      discoverSerpFootprints({
        topic: 'knives',
        excludeDomain: 'mine.com',
        credentials: NO_CREDS,
        search: createSerperSearch('', 'serp_footprint'),
      }),
    /SERPER_API_KEY is not set/
  );

  {
    //  An injected provider replaces the network entirely, which is the point
    //  of the seam: templates and filtering are tested without either vendor.
    let seenQueries: string[] = [];
    const fake: SearchProvider = async (queries) => {
      seenQueries = queries;
      return {
        results: [
          {
            keyword: queries[0],
            hits: [
              { url: 'https://publisher.example/resources', title: 'Resources' },
              { url: 'https://mine.com/own-page', title: 'Ours' },
              { url: 'https://publisher.example/resources?utm_source=x', title: 'Dup' },
            ],
          },
        ],
        cost: 4,
        warnings: [],
      };
    };

    const result = await discoverSerpFootprints({
      topic: 'survival knives',
      excludeDomain: 'mine.com',
      credentials: NO_CREDS,
      search: fake,
    });

    check('one search per template', seenQueries.length, 4);
    check('the topic is substituted in', seenQueries[0].includes('survival knives'), true);
    check('our own domain is filtered out', result.prospects.some((p) => p.domain === 'mine.com'), false);
    check('tracking params do not create a duplicate', result.prospects.length, 1);
    check('provider cost is reported', result.costUsd, 4);
    check('provenance names the query', result.prospects[0].discoveredVia.startsWith('ranked for'), true);
  }

  console.log('\nextractOutboundLinks');
  {
    const html = `
      <a href="https://good.com/a">a</a>
      <a href="/internal">internal</a>
      <a href="https://seed.com/self">same site</a>
      <a href="mailto:x@y.com">mail</a>
      <a href="#top">anchor</a>
      <a href="javascript:void(0)">js</a>`;
    const links = extractOutboundLinks(html, 'https://seed.com/page');
    check('only real external links', links, ['https://good.com/a']);
  }

  console.log('\nlink neighbourhood — the free channel');
  {
    const pages: Record<string, string> = {
      'https://seed.com/resources': `
        <a href="https://alpha.com/x">Alpha</a>
        <a href="https://beta.com">Beta</a>
        <a href="https://facebook.com/page">fb</a>
        <a href="https://en.wikipedia.org/wiki/Knife">wiki</a>
        <a href="https://mine.com/own">us</a>`,
      'https://seed2.com/links': `
        <a href="https://alpha.com/y">Alpha again</a>
        <a href="https://gamma.com">Gamma</a>`,
    };

    const result = await discoverLinkNeighbourhood({
      seedUrls: Object.keys(pages),
      excludeDomain: 'mine.com',
      fetcher: async (url) => ok(pages[url] ?? '', url),
    });

    const domains = result.prospects.map((p) => p.domain).sort();
    check('social and wikipedia are filtered out', domains, ['alpha.com', 'beta.com', 'gamma.com']);
    check('our own domain is never a prospect', domains.includes('mine.com'), false);
    check('the free channel costs nothing', result.costUsd, 0);
    check('the most-endorsed domain ranks first', result.prospects[0].domain, 'alpha.com');
    check(
      'corroboration is recorded',
      result.prospects[0].discoveredVia,
      'linked from 2 seed pages'
    );

    const known = await discoverLinkNeighbourhood({
      seedUrls: Object.keys(pages),
      excludeDomain: 'mine.com',
      knownDomains: ['alpha.com', 'beta.com'],
      fetcher: async (url) => ok(pages[url] ?? '', url),
    });
    check('already-known domains are not re-reported', known.prospects.map((p) => p.domain), ['gamma.com']);

    const consensus = await discoverLinkNeighbourhood({
      seedUrls: Object.keys(pages),
      excludeDomain: 'mine.com',
      minSeedAppearances: 2,
      fetcher: async (url) => ok(pages[url] ?? '', url),
    });
    check('consensus mode keeps only agreed domains', consensus.prospects.map((p) => p.domain), ['alpha.com']);
  }

  console.log('\nlink neighbourhood — partial and total failure');
  {
    const result = await discoverLinkNeighbourhood({
      seedUrls: ['https://a.com/r', 'https://b.com/r'],
      excludeDomain: 'mine.com',
      fetcher: async (url) =>
        url.startsWith('https://a.com') ? ok('<a href="https://found-pub.com">p</a>', url) : blocked(url),
    });
    check('a blocked seed does not sink the run', result.prospects.map((p) => p.domain), ['found-pub.com']);
    check('and is reported', result.warnings.some((w) => w.includes('bot wall')), true);

    //  The threshold must not be applied against seeds that never loaded, or
    //  "two of three seeds were blocked" silently becomes "no opportunities".
    const lowered = await discoverLinkNeighbourhood({
      seedUrls: ['https://a.com/r', 'https://b.com/r'],
      excludeDomain: 'mine.com',
      minSeedAppearances: 2,
      fetcher: async (url) =>
        url.startsWith('https://a.com') ? ok('<a href="https://found-pub.com">p</a>', url) : blocked(url),
    });
    check('threshold drops to what was actually readable', lowered.prospects.length, 1);
    check('and says so', lowered.warnings.some((w) => w.includes('lowered')), true);
  }

  await throws(
    'every seed failing is an error, not an empty result',
    () =>
      discoverLinkNeighbourhood({
        seedUrls: ['https://a.com/r'],
        excludeDomain: 'mine.com',
        fetcher: async (url) => blocked(url),
      }),
    /could be read/
  );

  console.log('\nqualification');
  {
    const prospect = {
      url: 'https://pub.com',
      domain: 'pub.com',
      source: 'link_neighbourhood' as const,
      discoveredVia: 'test',
    };

    const good = await qualifyProspect(prospect, {
      fetcher: async (url) =>
        ok(
          `<html><head><title>Knife Reviews</title></head><body><main>${'word '.repeat(800)}
           <a href="https://a.com">a</a><a href="https://b.com">b</a></main></body></html>`,
          url
        ),
    });
    check('a healthy page is assessed', good.outcome, 'assessed');
    check('title is captured', good.title, 'Knife Reviews');
    check('no relevance classifier means the gap is named', good.score?.missingSignals.includes('topicalRelevance'), true);

    const seller = await qualifyProspect(prospect, {
      fetcher: async (url) =>
        ok('<html><body><main>We accept guest post submissions. $300 per post.</main></body></html>', url),
    });
    check('a link seller is hard-rejected', seller.score?.hardRejects, ['sells_links']);

    const wall = await qualifyProspect(prospect, { fetcher: async (url) => blocked(url) });
    check('a bot wall is unreachable, not rejected', wall.outcome, 'unreachable');
    check('and carries no score', wall.score, null);

    //  The cost rule: a page that hard-rejects must never reach the LLM.
    let classifierCalls = 0;
    await qualifyProspect(prospect, {
      fetcher: async (url) =>
        ok('<html><head><meta name="robots" content="noindex"></head><body><main>hi</main></body></html>', url),
      classifyRelevance: async () => {
        classifierCalls++;
        return 1;
      },
    });
    check('hard-rejected pages never reach the classifier', classifierCalls, 0);

    const scored = await qualifyProspect(prospect, {
      fetcher: async (url) =>
        ok(`<html><head><title>T</title></head><body><main>${'word '.repeat(800)}</main></body></html>`, url),
      classifyRelevance: async () => {
        classifierCalls++;
        return 0.95;
      },
    });
    check('a healthy page does reach the classifier', classifierCalls, 1);
    check('and relevance is scored', scored.score?.reasons.some((r) => r.startsWith('topical_relevance')), true);

    const flaky = await qualifyProspect(prospect, {
      fetcher: async (url) =>
        ok(`<html><head><title>T</title></head><body><main>${'word '.repeat(800)}</main></body></html>`, url),
      classifyRelevance: async () => {
        throw new Error('model unavailable');
      },
    });
    check('a failing classifier degrades to a missing signal', flaky.outcome, 'assessed');
    check('never to an invented score', flaky.score?.missingSignals.includes('topicalRelevance'), true);
  }

  console.log(`\n${failures.length === 0 ? '✓' : '✗'} ${passed} passed, ${failures.length} failed\n`);

  if (failures.length > 0) {
    for (const failure of failures) console.error(`  ✗ ${failure}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
