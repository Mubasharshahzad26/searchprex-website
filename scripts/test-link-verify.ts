/**
 * scripts/test-link-verify.ts
 *
 * Fixture tests for lib/linkbuilding/core. No database, no network — every case
 * is HTML in and a verdict out, which is the point of keeping that directory
 * pure. Run it before pushing a change to the scorer or the verifier:
 *
 *   npx tsx scripts/test-link-verify.ts
 *
 * Exits non-zero on the first failing expectation so it can gate a deploy.
 */
import { verifyPlacement } from '../lib/linkbuilding/core/verify';
import { scoreProspect } from '../lib/linkbuilding/core/score';
import { nextPlacementState } from '../lib/linkbuilding/verify-run';
import { canonicalizeUrl, sameSite, urlsEqual } from '../lib/linkbuilding/core/normalize';

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

function page(body: string, head = ''): string {
  return `<!DOCTYPE html><html><head><title>Test</title>${head}</head><body>${body}</body></html>`;
}

const TARGET = 'https://www.smkstore.com/knives/premium-knives/';
const SOURCE = 'https://outdoorsblog.example.com/best-knives-2026';

function verify(html: string, opts: { expectedAnchor?: string; statusCode?: number } = {}) {
  return verifyPlacement({
    html,
    fetchedUrl: SOURCE,
    statusCode: opts.statusCode ?? 200,
    targetUrl: TARGET,
    expectedAnchor: opts.expectedAnchor,
  });
}

console.log('\nnormalize');
check('www and trailing slash are ignored', urlsEqual('https://www.a.com/x/', 'https://a.com/x'), true);
check('path case is significant', urlsEqual('https://a.com/About', 'https://a.com/about'), false);
check('utm params are stripped', urlsEqual('https://a.com/x?utm_source=n', 'https://a.com/x'), true);
check('real query params are kept', urlsEqual('https://a.com/x?id=2', 'https://a.com/x'), false);
check('subdomain counts as same site', sameSite('https://blog.a.com/p', 'https://a.com'), true);
check('unrelated hosts do not', sameSite('https://b.com/p', 'https://a.com'), false);
check('bare domain canonicalises', canonicalizeUrl('Example.COM/A/'), 'https://example.com/A');

console.log('\nverifyPlacement — the link is there');
{
  const r = verify(page(`<main><p>Try the <a href="${TARGET}">premium knives</a> range.</p></main>`));
  check('status', r.status, 'live');
  check('link type', r.linkType, 'dofollow');
  check('anchor', r.anchorText, 'premium knives');
  check('region', r.region, 'content');
}

console.log('\nverifyPlacement — rel tokens');
{
  const r = verify(page(`<main><a href="${TARGET}" rel="nofollow noopener">knives</a></main>`));
  check('nofollow is detected', r.status, 'nofollowed');
  check('reason is recorded', r.reasons.includes('rel_nofollow'), true);
}
{
  const r = verify(page(`<main><a href="${TARGET}" rel="sponsored">knives</a></main>`));
  check('sponsored is named specifically', r.linkType, 'sponsored');
}
{
  const r = verify(page(`<main><a href="${TARGET}" rel="ugc">knives</a></main>`));
  check('ugc is named specifically', r.linkType, 'ugc');
}

console.log('\nverifyPlacement — page-level directives');
{
  //  The case a rel-only checker reports as healthy forever.
  const r = verify(
    page(`<main><a href="${TARGET}">knives</a></main>`, '<meta name="robots" content="nofollow">')
  );
  check('meta nofollow neuters a clean link', r.status, 'nofollowed');
  check('reason is recorded', r.reasons.includes('page_meta_nofollow'), true);
}
{
  const r = verify(
    page(`<main><a href="${TARGET}">knives</a></main>`, '<meta name="robots" content="noindex">')
  );
  check('noindex is flagged', r.reasons.includes('page_noindex'), true);
  check('but the link is still followable', r.status, 'live');
}
{
  const r = verify(
    page(`<main><a href="${TARGET}">knives</a></main>`, '<meta name="googlebot" content="nofollow">')
  );
  check('googlebot directive counts too', r.status, 'nofollowed');
}
{
  const r = verify(
    page(
      `<main><a href="${TARGET}">knives</a></main>`,
      `<link rel="canonical" href="https://outdoorsblog.example.com/other">`
    )
  );
  check('canonical mismatch is flagged', r.reasons.includes('canonical_mismatch'), true);
}
{
  const r = verify(
    page(
      `<main><a href="${TARGET}">knives</a></main>`,
      `<link rel="canonical" href="${SOURCE}?utm_source=rss">`
    )
  );
  check('self-canonical with tracking is not a mismatch', r.reasons.includes('canonical_mismatch'), false);
}

console.log('\nverifyPlacement — placement quality');
{
  const r = verify(page(`<footer><a href="${TARGET}">knives</a></footer>`));
  check('footer placement is reported', r.region, 'footer');
  check('and flagged', r.reasons.includes('placement_footer'), true);
}
{
  //  Best-match ranking: the footer link renders first in the DOM, the article
  //  link is the one the client bought.
  const r = verify(
    page(
      `<footer><a href="${TARGET}">shop</a></footer>` +
        `<main><a href="${TARGET}">premium knives</a></main>`
    )
  );
  check('the article link wins over the footer', r.region, 'content');
  check('both are still reported', r.matches.length, 2);
}
{
  const r = verify(
    page(`<main><a href="${TARGET}" rel="nofollow">a</a><a href="${TARGET}">b</a></main>`)
  );
  check('a followable link beats a nofollowed one', r.status, 'live');
}
{
  const r = verify(page(`<main><a href="${TARGET}"><img src="/l.png" alt="SMK"></a></main>`));
  check('image link is flagged', r.reasons.includes('image_link'), true);
  check('alt text is used as the anchor', r.anchorText, 'SMK');
}

console.log('\nverifyPlacement — drift');
{
  const r = verify(page(`<main><a href="${TARGET}">folding knives</a></main>`), {
    expectedAnchor: 'premium knives',
  });
  check('anchor drift', r.status, 'changed');
  check('reason', r.reasons.includes('anchor_changed'), true);
}
{
  const r = verify(page(`<main><a href="https://www.smkstore.com/knives/">knives</a></main>`));
  check('target drift within the domain', r.status, 'changed');
  check('reason', r.reasons.includes('target_url_changed'), true);
}
{
  const r = verify(page(`<main><a href="${TARGET}?utm_campaign=x">premium knives</a></main>`), {
    expectedAnchor: 'premium knives',
  });
  check('tracking params are not drift', r.status, 'live');
}
{
  const r = verify(page(`<main><a href="/knives/premium-knives/">knives</a></main>`));
  check('a relative href to another host is not our link', r.status, 'lost');
}

console.log('\nverifyPlacement — absence and failure');
{
  const r = verify(page('<main><p>No links here.</p></main>'));
  check('lost when the page is healthy', r.status, 'lost');
  check('page signals still reported', r.page !== null, true);
}
check('404 is page_gone', verify('', { statusCode: 404 }).status, 'page_gone');
check('410 is page_gone', verify('', { statusCode: 410 }).status, 'page_gone');
check('403 is unreachable', verify('', { statusCode: 403 }).status, 'unreachable');
check('503 is unreachable', verify('', { statusCode: 503 }).status, 'unreachable');
check('no response is unreachable', verify('', { statusCode: 0 }).status, 'unreachable');
check('empty body is unreachable', verify('', { statusCode: 200 }).status, 'unreachable');

console.log('\nnextPlacementState — a bot wall must never kill a link');
{
  const now = new Date('2026-08-28T00:00:00Z');
  const live = {
    status: 'live',
    firstSeenAt: new Date('2026-01-01T00:00:00Z'),
    lostAt: null,
    consecutiveFailures: 0,
  };
  const unreachable = { status: 'unreachable' as const, reasons: [] } as any;

  const first = nextPlacementState(live, unreachable, now);
  check('one failure holds the last known state', first.status, 'live');
  check('and counts', first.consecutiveFailures, 1);

  const second = nextPlacementState({ ...live, consecutiveFailures: 1 }, unreachable, now);
  check('two failures report unreachable', second.status, 'unreachable');
  check('but never set lostAt', second.lostAt, null);

  const recovered = nextPlacementState(
    { ...live, status: 'lost', lostAt: new Date('2026-06-01T00:00:00Z'), consecutiveFailures: 3 },
    { status: 'live', reasons: [] } as any,
    now
  );
  check('a link that comes back clears lostAt', recovered.lostAt, null);
  check('and resets the failure count', recovered.consecutiveFailures, 0);

  const lost = nextPlacementState(live, { status: 'lost', reasons: [] } as any, now);
  check('a real loss stamps lostAt', lost.lostAt, now);
  check('and keeps firstSeenAt', lost.firstSeenAt, live.firstSeenAt);
}

console.log('\nscoreProspect — hard rejects override any score');
{
  const base = { url: 'https://x.com', statusCode: 200 };
  const strong = { referringDomains: 5000, organicTraffic: 90_000, topicalRelevance: 1 };

  const noindex = scoreProspect({
    ...base,
    ...strong,
    page: { noindex: true, pageNofollow: false, externalDomainCount: 5, wordCount: 900, canonicalMismatch: false } as any,
  });
  check('a strong domain cannot buy past noindex', noindex.passed, false);
  check('reject is named', noindex.hardRejects, ['page_noindex']);

  const selling = scoreProspect({
    ...base,
    ...strong,
    text: 'We accept guest post submissions. Price: $250 per post.',
  });
  check('link selling is disqualifying', selling.hardRejects, ['sells_links']);

  const writingAbout = scoreProspect({
    ...base,
    ...strong,
    text: 'Why we stopped accepting guest post requests at our magazine.',
  });
  check('writing about guest posts is not selling them', writingAbout.hardRejects, []);

  const farm = scoreProspect({
    ...base,
    page: { noindex: false, pageNofollow: false, externalDomainCount: 240, wordCount: 300, canonicalMismatch: false } as any,
  });
  check('a page linking to 240 domains is rejected', farm.hardRejects.length > 0, true);
}

console.log('\nscoreProspect — ranking what survives');
{
  const goodPage = {
    noindex: false,
    pageNofollow: false,
    externalDomainCount: 8,
    wordCount: 1400,
    canonicalMismatch: false,
  } as any;

  const good = scoreProspect({
    url: 'https://x.com',
    statusCode: 200,
    page: goodPage,
    referringDomains: 600,
    organicTraffic: 25_000,
    topicalRelevance: 0.9,
    lastPublishedAt: new Date(Date.now() - 30 * 864e5).toISOString(),
  });
  check('a real publisher passes', good.passed, true);

  const expired = scoreProspect({
    url: 'https://x.com',
    statusCode: 200,
    page: goodPage,
    referringDomains: 900,
    organicTraffic: 12,
    topicalRelevance: 0.9,
    lastPublishedAt: new Date(Date.now() - 30 * 864e5).toISOString(),
  });
  check('links without traffic is penalised', expired.reasons.includes('links_without_traffic_-15'), true);
  check('and scores below the publisher', expired.score < good.score, true);

  const unknown = scoreProspect({ url: 'https://x.com', statusCode: 200 });
  check('no metrics means no pass, not a default pass', unknown.passed, false);
  check('and the gaps are named', unknown.missingSignals.length > 0, true);
}

console.log(
  `\n${failures.length === 0 ? '✓' : '✗'} ${passed} passed, ${failures.length} failed\n`
);

if (failures.length > 0) {
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
