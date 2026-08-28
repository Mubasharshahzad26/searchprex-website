// ═══════════════════════════════════════════════════════════
//  core/citations/nap.ts — name, address, phone
//
//  PORTABLE: pure functions, no I/O.
//
//  Citations are not links. Most carry rel=nofollow and Google
//  Business Profile carries no link at all. Their value is entity
//  confirmation — the same business, described the same way,
//  in enough places that a search engine is confident the
//  business exists and is where it says it is.
//
//  Which makes CONSISTENCY the entire product. "Suite 200" in one
//  place and "Ste. 200" in another is not a real difference and
//  must not be reported as one, or a client drowns in false
//  mismatches and stops reading the report. A different phone
//  number IS a real difference and has to surface every time.
//
//  So normalisation is the whole file, and it errs towards
//  treating cosmetic variation as identical.
// ═══════════════════════════════════════════════════════════

export interface NapRecord {
  name: string;
  /** Street line, e.g. "123 N Main St Suite 200". */
  street?: string | null;
  city?: string | null;
  /** State, province or region. */
  region?: string | null;
  postalCode?: string | null;
  /** ISO country code where known, e.g. "US". */
  country?: string | null;
  phone?: string | null;
  website?: string | null;
}

export type FieldVerdict =
  /** Identical after normalisation. */
  | 'match'
  /** Both present and genuinely different. */
  | 'mismatch'
  /** Absent from the listing — unknown, not wrong. */
  | 'missing'
  /** Absent from our own canonical record, so nothing to compare against. */
  | 'not_tracked';

export interface NapComparison {
  name: FieldVerdict;
  street: FieldVerdict;
  city: FieldVerdict;
  region: FieldVerdict;
  postalCode: FieldVerdict;
  phone: FieldVerdict;
  website: FieldVerdict;
  /** Fields that are genuinely different. Empty means consistent. */
  mismatches: string[];
  /** Tracked fields the listing did not state. */
  missing: string[];
  /** 0..100 over comparable fields only. Null when nothing was comparable. */
  score: number | null;
}

/**
 * Legal-form suffixes. "Smith & Co LLC" and "Smith & Co" are the same business
 * and directories are wildly inconsistent about including these.
 */
const ENTITY_SUFFIXES = [
  'llc', 'l l c', 'inc', 'incorporated', 'ltd', 'limited', 'co', 'corp',
  'corporation', 'plc', 'pllc', 'pc', 'pa', 'lp', 'llp', 'gmbh', 'bv', 'pty',
];

/**
 * Street-type and directional abbreviations, mapped to a single canonical form.
 *
 * One-way on purpose: everything collapses to the short form, so "Street",
 * "St." and "St" all become "st" and compare equal.
 */
const STREET_ABBREVIATIONS: Record<string, string> = {
  street: 'st', str: 'st',
  avenue: 'ave', av: 'ave',
  boulevard: 'blvd', boul: 'blvd',
  road: 'rd',
  drive: 'dr',
  lane: 'ln',
  court: 'ct',
  place: 'pl',
  square: 'sq',
  terrace: 'ter',
  parkway: 'pkwy',
  highway: 'hwy',
  circle: 'cir',
  trail: 'trl',
  way: 'way',
  suite: 'ste', ste: 'ste', unit: 'ste', apartment: 'ste', apt: 'ste',
  floor: 'fl', flr: 'fl',
  building: 'bldg',
  north: 'n', south: 's', east: 'e', west: 'w',
  northeast: 'ne', northwest: 'nw', southeast: 'se', southwest: 'sw',
};

/** US state names to their two-letter codes. */
const US_STATES: Record<string, string> = {
  alabama: 'al', alaska: 'ak', arizona: 'az', arkansas: 'ar', california: 'ca',
  colorado: 'co', connecticut: 'ct', delaware: 'de', florida: 'fl', georgia: 'ga',
  hawaii: 'hi', idaho: 'id', illinois: 'il', indiana: 'in', iowa: 'ia',
  kansas: 'ks', kentucky: 'ky', louisiana: 'la', maine: 'me', maryland: 'md',
  massachusetts: 'ma', michigan: 'mi', minnesota: 'mn', mississippi: 'ms',
  missouri: 'mo', montana: 'mt', nebraska: 'ne', nevada: 'nv',
  'new hampshire': 'nh', 'new jersey': 'nj', 'new mexico': 'nm', 'new york': 'ny',
  'north carolina': 'nc', 'north dakota': 'nd', ohio: 'oh', oklahoma: 'ok',
  oregon: 'or', pennsylvania: 'pa', 'rhode island': 'ri', 'south carolina': 'sc',
  'south dakota': 'sd', tennessee: 'tn', texas: 'tx', utah: 'ut', vermont: 'vt',
  virginia: 'va', washington: 'wa', 'west virginia': 'wv', wisconsin: 'wi',
  wyoming: 'wy', 'district of columbia': 'dc',
};

function collapse(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.,'"`’]/g, '')
    .replace(/[^a-z0-9#\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Business name, minus punctuation, legal suffixes and "the". */
export function normalizeName(name: string | null | undefined): string {
  if (!name) return '';
  let tokens = collapse(name).split(' ').filter(Boolean);

  //  Only stripped from the end — "LLC Consulting Group" is a real name whose
  //  first word happens to collide with a suffix.
  while (tokens.length > 1 && ENTITY_SUFFIXES.includes(tokens[tokens.length - 1])) {
    tokens.pop();
  }
  if (tokens.length > 1 && tokens[0] === 'the') tokens = tokens.slice(1);

  return tokens.join(' ');
}

/**
 * Phone reduced to comparable digits.
 *
 * Returns the last 10 digits for NANP-length numbers so a country code, and
 * every bracket, dash and dot, stop mattering. Shorter international numbers
 * keep all their digits rather than being truncated into a false match.
 */
export function normalizePhone(phone: string | null | undefined): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) return digits.slice(1);
  if (digits.length > 11) return digits.slice(-10);
  return digits;
}

/** Street line with abbreviations collapsed and "#" read as a suite marker. */
export function normalizeStreet(street: string | null | undefined): string {
  if (!street) return '';

  return collapse(street)
    .replace(/#\s*/g, 'ste ')
    .split(' ')
    .filter(Boolean)
    .map((token) => STREET_ABBREVIATIONS[token] ?? token)
    .join(' ');
}

export function normalizeCity(city: string | null | undefined): string {
  return city ? collapse(city) : '';
}

/** State name or code reduced to a two-letter code where recognised. */
export function normalizeRegion(region: string | null | undefined): string {
  if (!region) return '';
  const cleaned = collapse(region);
  return US_STATES[cleaned] ?? cleaned;
}

/** Postal code, case and spacing removed. ZIP+4 reduced to its first five. */
export function normalizePostalCode(code: string | null | undefined): string {
  if (!code) return '';
  const cleaned = code.toLowerCase().replace(/[^a-z0-9]/g, '');
  return /^\d{9}$/.test(cleaned) ? cleaned.slice(0, 5) : cleaned;
}

/** Host only — a listing linking to a deep page still points at the same site. */
export function normalizeWebsite(website: string | null | undefined): string {
  if (!website) return '';
  const raw = website.trim();
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(withProtocol).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return collapse(raw);
  }
}

function compareField(
  canonical: string,
  observed: string,
  observedWasStated: boolean
): FieldVerdict {
  if (!canonical) return 'not_tracked';
  if (!observedWasStated || !observed) return 'missing';
  return canonical === observed ? 'match' : 'mismatch';
}

/**
 * Compares a live listing against the canonical record.
 *
 * `missing` and `mismatch` are kept strictly apart. A directory that does not
 * publish a phone number has not published a wrong one, and telling a client to
 * "fix" a field the site never displays wastes their afternoon.
 */
export function compareNap(canonical: NapRecord, observed: Partial<NapRecord>): NapComparison {
  const stated = (key: keyof NapRecord) =>
    observed[key] !== undefined && observed[key] !== null && String(observed[key]).trim() !== '';

  const verdicts = {
    name: compareField(normalizeName(canonical.name), normalizeName(observed.name), stated('name')),
    street: compareField(normalizeStreet(canonical.street), normalizeStreet(observed.street), stated('street')),
    city: compareField(normalizeCity(canonical.city), normalizeCity(observed.city), stated('city')),
    region: compareField(normalizeRegion(canonical.region), normalizeRegion(observed.region), stated('region')),
    postalCode: compareField(
      normalizePostalCode(canonical.postalCode),
      normalizePostalCode(observed.postalCode),
      stated('postalCode')
    ),
    phone: compareField(normalizePhone(canonical.phone), normalizePhone(observed.phone), stated('phone')),
    website: compareField(
      normalizeWebsite(canonical.website),
      normalizeWebsite(observed.website),
      stated('website')
    ),
  };

  const mismatches = Object.entries(verdicts)
    .filter(([, verdict]) => verdict === 'mismatch')
    .map(([field]) => field);

  const missing = Object.entries(verdicts)
    .filter(([, verdict]) => verdict === 'missing')
    .map(([field]) => field);

  //  Scored over comparable fields only. Counting `missing` as failure would
  //  punish a directory for having fewer fields than another, which says
  //  nothing about whether the client's data is consistent.
  const comparable = Object.values(verdicts).filter((v) => v === 'match' || v === 'mismatch');
  const matched = comparable.filter((v) => v === 'match').length;

  return {
    ...verdicts,
    mismatches,
    missing,
    score: comparable.length === 0 ? null : Math.round((matched / comparable.length) * 100),
  };
}
