/**
 * scripts/test-citations.ts
 *
 * Fixture tests for Phase 2 — NAP normalisation, comparison, and reading a
 * live listing. No database, no network.
 *
 *   npx tsx scripts/test-citations.ts
 */
import {
  compareNap,
  normalizeName,
  normalizePhone,
  normalizePostalCode,
  normalizeRegion,
  normalizeStreet,
  normalizeWebsite,
  type NapRecord,
} from '../lib/linkbuilding/core/citations/nap';
import { verifyCitation } from '../lib/linkbuilding/core/citations/verify-citation';
import { DIRECTORIES, directoriesFor, directoryById } from '../lib/linkbuilding/core/citations/registry';

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

const CANONICAL: NapRecord = {
  name: 'Acme Law LLC',
  street: '123 North Main Street Suite 200',
  city: 'Detroit',
  region: 'Michigan',
  postalCode: '48226-1234',
  country: 'US',
  phone: '(555) 201-9000',
  website: 'https://www.acmelaw.com',
};

console.log('\nnormalisation — cosmetic variation is not a difference');
check('legal suffix dropped', normalizeName('Acme Law LLC'), 'acme law');
check('punctuation dropped', normalizeName('Acme Law, L.L.C.'), 'acme law');
check('leading "the" dropped', normalizeName('The Acme Law Co'), 'acme law');
check('a name that is only a suffix survives', normalizeName('LLC'), 'llc');
check('suffix-like first word is kept', normalizeName('Co Operative Bank'), 'co operative bank');

check('street types collapse', normalizeStreet('123 North Main Street Suite 200'), '123 n main st ste 200');
check('abbreviated form matches', normalizeStreet('123 N. Main St., Ste. 200'), '123 n main st ste 200');
check('hash reads as suite', normalizeStreet('123 N Main St #200'), '123 n main st ste 200');
check('unit is a suite', normalizeStreet('500 Oak Ave Unit 3'), '500 oak ave ste 3');

check('formatting dropped from phone', normalizePhone('(555) 201-9000'), '5552019000');
check('country code dropped', normalizePhone('+1 555.201.9000'), '5552019000');
check('short numbers are not truncated', normalizePhone('020 7946 0958'), '02079460958');

check('state name becomes a code', normalizeRegion('Michigan'), 'mi');
check('a code stays a code', normalizeRegion('MI'), 'mi');
check('ZIP+4 reduces to five', normalizePostalCode('48226-1234'), '48226');
check('website reduces to host', normalizeWebsite('https://www.acmelaw.com/contact'), 'acmelaw.com');

console.log('\ncompareNap');
{
  const same = compareNap(CANONICAL, {
    name: 'Acme Law, L.L.C.',
    street: '123 N. Main St. Ste 200',
    city: 'detroit',
    region: 'MI',
    postalCode: '48226',
    phone: '+1-555-201-9000',
    website: 'acmelaw.com',
  });
  check('cosmetic differences are consistent', same.mismatches, []);
  check('and score 100', same.score, 100);

  const wrongPhone = compareNap(CANONICAL, { ...CANONICAL, phone: '(555) 201-9001' });
  check('a different phone is a real mismatch', wrongPhone.mismatches, ['phone']);

  const noPhone = compareNap(CANONICAL, { name: 'Acme Law LLC', city: 'Detroit' });
  check('an unstated field is missing, not wrong', noPhone.phone, 'missing');
  check('and is not counted as a mismatch', noPhone.mismatches, []);
  check('missing fields are listed', noPhone.missing.includes('phone'), true);

  //  Scoring over comparable fields only: a thin directory must not score worse
  //  than a rich one purely for having fewer fields.
  check('score ignores fields the directory omits', noPhone.score, 100);

  const untracked = compareNap({ name: 'Acme Law LLC' }, { name: 'Acme Law LLC', phone: '555-000-0000' });
  check('a field we do not track is not judged', untracked.phone, 'not_tracked');
}

console.log('\nverifyCitation — structured data');
{
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Acme Law LLC',
    telephone: '+1 555 201 9000',
    url: 'https://www.acmelaw.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 N. Main St., Ste. 200',
      addressLocality: 'Detroit',
      addressRegion: 'MI',
      postalCode: '48226',
    },
  };

  const html = `<html><body>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <a href="https://www.acmelaw.com" rel="nofollow">Website</a>
  </body></html>`;

  const result = verifyCitation({
    html,
    fetchedUrl: 'https://yelp.com/biz/acme',
    statusCode: 200,
    canonical: CANONICAL,
  });

  check('structured data is trusted', result.confidence, 'structured');
  check('and the listing is consistent', result.status, 'consistent');
  check('the site link is found', result.linksToSite, true);
  check('and its rel is read', result.linkType, 'nofollow');
}

{
  const jsonLd = {
    '@graph': [
      { '@type': 'WebPage', name: 'Some directory page' },
      { '@type': 'LocalBusiness', name: 'Acme Law LLC', telephone: '555-999-0000' },
    ],
  };
  const result = verifyCitation({
    html: `<html><body><script type="application/ld+json">${JSON.stringify(jsonLd)}</script></body></html>`,
    fetchedUrl: 'https://dir.example/acme',
    statusCode: 200,
    canonical: CANONICAL,
  });
  check('@graph is unwrapped', result.confidence, 'structured');
  check('the business node is picked over the page node', result.status, 'inconsistent');
  check('and the wrong phone is named', result.comparison?.mismatches, ['phone']);
}

{
  //  Malformed JSON-LD is common on directories. One bad block must not lose
  //  the good block beside it.
  const good = { '@type': 'LocalBusiness', name: 'Acme Law LLC', telephone: '(555) 201-9000' };
  const result = verifyCitation({
    html: `<html><body>
      <script type="application/ld+json">{ not valid json }</script>
      <script type="application/ld+json">${JSON.stringify(good)}</script>
    </body></html>`,
    fetchedUrl: 'https://dir.example/acme',
    statusCode: 200,
    canonical: CANONICAL,
  });
  check('broken JSON-LD is skipped, not fatal', result.confidence, 'structured');
  check('and the valid block is used', result.status, 'consistent');
}

console.log('\nverifyCitation — no structured data');
{
  const result = verifyCitation({
    html: '<html><body><h1>Acme Law LLC</h1><p>Call (555) 201-9000</p></body></html>',
    fetchedUrl: 'https://dir.example/acme',
    statusCode: 200,
    canonical: CANONICAL,
  });
  //  The critical case: the listing is real but unreadable. Reporting this as
  //  "inconsistent" would send a client hunting for a problem that is ours.
  check('an unreadable listing is unverified, not inconsistent', result.status, 'unverified');
  check('confidence says why', result.confidence, 'text_only');
  check('no comparison is invented', result.comparison, null);
  check('but the evidence found is named', result.reasons.includes('phone_present_in_text'), true);
}

{
  const result = verifyCitation({
    html: '<html><body><h1>Someone Else Entirely</h1></body></html>',
    fetchedUrl: 'https://dir.example/other',
    statusCode: 200,
    canonical: CANONICAL,
  });
  check('a page with no trace of the business is not_found', result.status, 'not_found');
}

console.log('\nverifyCitation — failures');
check(
  '404 means the listing was removed',
  verifyCitation({ html: '', fetchedUrl: 'x', statusCode: 404, canonical: CANONICAL }).status,
  'not_found'
);
check(
  '403 is unreachable, never not_found',
  verifyCitation({ html: '', fetchedUrl: 'x', statusCode: 403, canonical: CANONICAL }).status,
  'unreachable'
);
check(
  'a blocked fetch (0) is unreachable',
  verifyCitation({ html: '', fetchedUrl: 'x', statusCode: 0, canonical: CANONICAL }).status,
  'unreachable'
);

console.log('\nregistry');
{
  const legal = directoriesFor({ industry: 'legal', country: 'US' });
  check('legal gets its vertical directories', legal.some((d) => d.id === 'avvo'), true);
  check('and still gets the core ones', legal.some((d) => d.id === 'google-business-profile'), true);
  check('but not another vertical', legal.some((d) => d.id === 'healthgrades'), false);

  const gb = directoriesFor({ industry: 'legal', country: 'GB' });
  check('US-only directories are excluded outside the US', gb.some((d) => d.id === 'bbb'), false);

  check('ids are unique', new Set(DIRECTORIES.map((d) => d.id)).size, DIRECTORIES.length);
  check('lookup by id works', directoryById('yelp')?.name, 'Yelp');

  //  The honesty check: if this ever flips, someone has started selling
  //  citations as links.
  const followable = DIRECTORIES.filter((d) => d.linkValue === 'dofollow').length;
  check('dofollow citations are the rare exception', followable < DIRECTORIES.length / 4, true);
  check('GBP is recorded as passing no link', directoryById('google-business-profile')?.linkValue, 'none');
}

console.log(`\n${failures.length === 0 ? '✓' : '✗'} ${passed} passed, ${failures.length} failed\n`);

if (failures.length > 0) {
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  process.exit(1);
}
