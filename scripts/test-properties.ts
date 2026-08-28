/**
 * scripts/test-properties.ts
 *
 * Fixture tests for Phase 4 — similarity, post policy, footprint audit.
 * No database, no network, no model call.
 *
 *   npx tsx scripts/test-properties.ts
 */
import {
  findDuplicates,
  jaccard,
  shingles,
  similarity,
  worstPair,
} from '../lib/linkbuilding/core/properties/similarity';
import {
  MAX_PROPERTIES_PER_CLIENT,
  canCreateProperty,
  checkPostPolicy,
  classifyAnchor,
  countsTowardLinkKpi,
} from '../lib/linkbuilding/core/properties/policy';
import { auditFootprint, type PropertySnapshot } from '../lib/linkbuilding/core/properties/footprint';

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

/** Distinct filler so word counts clear the minimum without faking similarity. */
function filler(seed: string, words = 600): string {
  const out: string[] = [];
  for (let i = 0; i < words; i++) out.push(`${seed}${i}`);
  return out.join(' ');
}

console.log('\nsimilarity');
{
  const original =
    'Sharpening a carbon steel blade starts with the angle. Twenty degrees suits most field knives, ' +
    'and a coarse stone removes metal faster than you expect on softer steels.';
  //  Reworded, reordered: the evasion a string comparison misses entirely.
  const spun =
    'A coarse stone removes metal quicker than expected on softer steels. Sharpening carbon steel ' +
    'blades begins with angle, and twenty degrees works for most field knives.';
  const different =
    'Choosing a tent for winter camping comes down to pole geometry and how much condensation the ' +
    'fabric will hold overnight in freezing conditions.';

  check('identical text is 1', similarity(original, original), 1);
  check('unrelated text scores low', similarity(original, different) < 0.05, true);
  check('reworded text still scores above zero', similarity(original, spun) > 0, true);
  check('but reordering alone does not fool it', similarity(spun, spun), 1);

  check('empty vs empty is identical', jaccard(new Set(), new Set()), 1);
  check('empty vs populated is zero', jaccard(new Set(), new Set(['a'])), 0);

  //  Short text must still produce a comparable representation, or every brief
  //  document would score zero against everything including itself.
  check('text shorter than one shingle still compares', similarity('three word text', 'three word text'), 1);
  check('and differs from other short text', similarity('three word text', 'wholly other words'), 0);

  check('html tags are not tokens', shingles('<p>a b c d e</p>').has('a b c d e'), true);
}

console.log('\nfindDuplicates and worstPair');
{
  const existing = [
    { id: 'p1', text: 'Sharpening a carbon steel blade starts with the angle you choose to hold.' },
    { id: 'p2', text: 'Winter tents live or die on pole geometry and overnight condensation.' },
  ];

  const dupes = findDuplicates(
    'Sharpening a carbon steel blade starts with the angle you choose to hold.',
    existing,
    0.3
  );
  check('an exact copy is caught', dupes[0]?.id, 'p1');
  check('with a perfect score', dupes[0]?.score, 1);

  const clean = findDuplicates('Choosing a stove for alpine conditions is about fuel type.', existing, 0.3);
  check('genuinely new content is clean', clean, []);

  check('a single document has no worst pair', worstPair([existing[0]]), null);
  const worst = worstPair([...existing, { id: 'p3', text: existing[0].text }]);
  check('the duplicate pair is found', worst?.score, 1);
}

console.log('\nanchor classification');
const ANCHOR = { brandName: 'Acme Knives', brandDomain: 'acmeknives.com', moneyTerms: ['best survival knife', 'knives for sale'] };
check('the brand name is a brand anchor', classifyAnchor({ ...ANCHOR, anchorText: 'Acme Knives' }), 'brand');
check('the bare domain is a branded url', classifyAnchor({ ...ANCHOR, anchorText: 'acmeknives.com' }), 'branded_url');
check('"click here" is generic', classifyAnchor({ ...ANCHOR, anchorText: 'click here' }), 'generic');
check('a money term is exact match', classifyAnchor({ ...ANCHOR, anchorText: 'best survival knife' }), 'exact_match');
check('a money term inside a phrase still counts', classifyAnchor({ ...ANCHOR, anchorText: 'the best survival knife you can buy' }), 'exact_match');
check('descriptive text is generic', classifyAnchor({ ...ANCHOR, anchorText: 'their sharpening guide' }), 'generic');

console.log('\npost policy');
{
  const good = checkPostPolicy({
    html: `<p>${filler('word')}</p><p>See <a href="https://acmeknives.com">Acme Knives</a>.</p>`,
    ...ANCHOR,
    highestSimilarity: 0.05,
    similarityThreshold: 0.3,
  });
  check('a clean post passes', good.allowed, true);
  check('the anchor is classified', good.anchors[0]?.verdict, 'brand');

  const exact = checkPostPolicy({
    html: `<p>${filler('word')}</p><p><a href="https://acmeknives.com">best survival knife</a></p>`,
    ...ANCHOR,
    highestSimilarity: 0,
    similarityThreshold: 0.3,
  });
  check('an exact-match anchor is refused', exact.allowed, false);
  check('and named', exact.problems.some((p) => p.startsWith('exact_match_anchor')), true);

  const stuffed = checkPostPolicy({
    html:
      `<p>${filler('word')}</p>` +
      '<a href="https://acmeknives.com">Acme Knives</a>'.repeat(3),
    ...ANCHOR,
    highestSimilarity: 0,
    similarityThreshold: 0.3,
  });
  check('too many client links is refused', stuffed.problems.some((p) => p.startsWith('too_many_client_links')), true);

  const thin = checkPostPolicy({
    html: '<p>Short.</p>',
    ...ANCHOR,
    highestSimilarity: 0,
    similarityThreshold: 0.3,
  });
  check('a thin post is refused', thin.problems.some((p) => p.startsWith('too_thin')), true);

  const dupe = checkPostPolicy({
    html: `<p>${filler('word')}</p>`,
    ...ANCHOR,
    highestSimilarity: 0.5,
    similarityThreshold: 0.3,
  });
  check('a near-duplicate is refused', dupe.problems.some((p) => p.startsWith('near_duplicate')), true);

  const climbing = checkPostPolicy({
    html: `<p>${filler('word')}</p>`,
    ...ANCHOR,
    highestSimilarity: 0.25,
    similarityThreshold: 0.3,
  });
  check('rising similarity warns without blocking', climbing.allowed, true);
  check('and says so', climbing.warnings.some((w) => w.startsWith('similarity_climbing')), true);

  const noLink = checkPostPolicy({
    html: `<p>${filler('word')}</p>`,
    ...ANCHOR,
    highestSimilarity: 0,
    similarityThreshold: 0.3,
  });
  //  A post that links nowhere is fine — a portfolio where every post links
  //  back is its own signal.
  check('linking nowhere is allowed', noLink.allowed, true);
  check('but noted', noLink.warnings.includes('no_link_to_client'), true);

  const nested = checkPostPolicy({
    html: `<p>${filler('word')}</p><a href="https://acmeknives.com"><strong>Acme Knives</strong></a>`,
    ...ANCHOR,
    highestSimilarity: 0,
    similarityThreshold: 0.3,
  });
  check('nested markup in an anchor is handled', nested.anchors[0]?.text, 'Acme Knives');
}

console.log('\nthe cap is hard');
check('under the cap is allowed', canCreateProperty(MAX_PROPERTIES_PER_CLIENT - 1).allowed, true);
check('at the cap is refused', canCreateProperty(MAX_PROPERTIES_PER_CLIENT).allowed, false);
check('over the cap is refused', canCreateProperty(99).allowed, false);
check('these links never count as links', countsTowardLinkKpi(), false);

console.log('\nfootprint audit');
{
  function property(overrides: Partial<PropertySnapshot>): PropertySnapshot {
    return {
      id: 'x',
      platform: 'medium.com',
      authorName: null,
      authorBio: null,
      posts: [],
      ...overrides,
    };
  }

  check('an empty portfolio is clean', auditFootprint([]).score, 100);

  const shared = auditFootprint([
    property({ id: 'a', authorName: 'Dana Reid', posts: [{ id: '1', text: filler('alpha'), anchors: ['Acme'], publishedAt: null, linkPosition: 0.5 }] }),
    property({ id: 'b', authorName: 'Dana Reid', platform: 'substack.com', posts: [{ id: '2', text: filler('beta'), anchors: ['Acme Knives'], publishedAt: null, linkPosition: 0.6 }] }),
    property({ id: 'c', authorName: 'Dana Reid', platform: 'ghost.io', posts: [{ id: '3', text: filler('gamma'), anchors: ['the guide'], publishedAt: null, linkPosition: 0.4 }] }),
  ]);
  check('a shared byline is critical', shared.findings.find((f) => f.code === 'shared_author')?.severity, 'critical');
  check('and names the properties', shared.findings.find((f) => f.code === 'shared_author')?.properties.length, 3);

  const duplicated = auditFootprint([
    property({ id: 'a', authorName: 'One', posts: [{ id: '1', text: filler('same'), anchors: [], publishedAt: null, linkPosition: null }] }),
    property({ id: 'b', authorName: 'Two', posts: [{ id: '2', text: filler('same'), anchors: [], publishedAt: null, linkPosition: null }] }),
  ]);
  check('duplicate content is critical', duplicated.findings.find((f) => f.code === 'duplicate_content')?.severity, 'critical');

  const repeated = auditFootprint([
    property({ id: 'a', authorName: 'One', posts: [{ id: '1', text: filler('alpha'), anchors: ['best survival knife'], publishedAt: null, linkPosition: 0.5 }] }),
    property({ id: 'b', authorName: 'Two', platform: 'substack.com', posts: [{ id: '2', text: filler('beta'), anchors: ['best survival knife'], publishedAt: null, linkPosition: 0.5 }] }),
    property({ id: 'c', authorName: 'Three', platform: 'ghost.io', posts: [{ id: '3', text: filler('gamma'), anchors: ['best survival knife'], publishedAt: null, linkPosition: 0.5 }] }),
  ]);
  check('repeated anchors are critical', repeated.findings.find((f) => f.code === 'anchor_repetition')?.severity, 'critical');

  const sameDay = new Date('2026-08-01T09:00:00Z');
  const burst = auditFootprint([
    property({ id: 'a', authorName: 'One', posts: [{ id: '1', text: filler('alpha'), anchors: ['Acme'], publishedAt: sameDay, linkPosition: 0.5 }, { id: '2', text: filler('beta'), anchors: ['Brand'], publishedAt: sameDay, linkPosition: 0.6 }] }),
    property({ id: 'b', authorName: 'Two', platform: 'substack.com', posts: [{ id: '3', text: filler('gamma'), anchors: ['Site'], publishedAt: sameDay, linkPosition: 0.4 }, { id: '4', text: filler('delta'), anchors: ['Here'], publishedAt: sameDay, linkPosition: 0.7 }] }),
  ]);
  check('burst publishing is caught', burst.findings.some((f) => f.code === 'burst_publishing'), true);

  const concentrated = auditFootprint([
    property({ id: 'a', authorName: 'One', posts: [{ id: '1', text: filler('alpha'), anchors: ['A'], publishedAt: null, linkPosition: 0.5 }] }),
    property({ id: 'b', authorName: 'Two', posts: [{ id: '2', text: filler('beta'), anchors: ['B'], publishedAt: null, linkPosition: 0.6 }] }),
    property({ id: 'c', authorName: 'Three', posts: [{ id: '3', text: filler('gamma'), anchors: ['C'], publishedAt: null, linkPosition: 0.4 }] }),
  ]);
  check('one platform for everything is caught', concentrated.findings.some((f) => f.code === 'platform_concentration'), true);

  const abandoned = auditFootprint([property({ id: 'a', authorName: 'One', posts: [] })]);
  check('an empty property is flagged', abandoned.findings.some((f) => f.code === 'empty_properties'), true);

  //  The whole point: a portfolio doing everything wrong must score below one
  //  doing everything right, and a clean set must not be penalised for
  //  existing. Compared relatively rather than against a magic threshold —
  //  the severity costs are a judgement call and may be retuned.
  const clean = auditFootprint([
    property({ id: 'a', authorName: 'One', posts: [{ id: '1', text: filler('alpha'), anchors: ['Acme Knives'], publishedAt: new Date('2026-01-05T09:00:00Z'), linkPosition: 0.55 }] }),
    property({ id: 'b', authorName: 'Two', platform: 'substack.com', posts: [{ id: '2', text: filler('beta'), anchors: ['acmeknives.com'], publishedAt: new Date('2026-03-11T14:00:00Z'), linkPosition: 0.72 }] }),
  ]);
  check('a varied portfolio scores clean', clean.score, 100);
  check('a portfolio with a critical finding scores below it', shared.score < clean.score, true);
  check('and every critical finding is charged for', shared.score <= 100 - 30, true);
}

console.log(`\n${failures.length === 0 ? '✓' : '✗'} ${passed} passed, ${failures.length} failed\n`);

if (failures.length > 0) {
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
