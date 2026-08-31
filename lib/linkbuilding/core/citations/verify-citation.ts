// ═══════════════════════════════════════════════════════════
//  core/citations/verify-citation.ts — reading a live listing
//
//  PORTABLE: pure. HTML in, verdict out.
//
//  Extraction is layered by how much the source can be trusted:
//
//    1. JSON-LD (schema.org LocalBusiness / Organization). Machine
//       readable, unambiguous, and emitted by most real
//       directories. When present, it is the answer.
//    2. Microdata, for older sites.
//    3. Text presence — is our phone number, our name, our domain
//       anywhere on this page at all?
//
//  Tier 3 is deliberately weak. Confirming the page mentions the
//  business is not the same as reading its address, and this
//  module says which one it did. A citation checker that reports
//  "address mismatch" because it could not parse an address is
//  worse than one that admits it could not tell — the client
//  spends an afternoon fixing something that was never broken.
//
//  Same rule as link verification: never manufacture a negative
//  finding out of a failure to observe.
// ═══════════════════════════════════════════════════════════

import * as cheerio from 'cheerio';
import { compareNap, normalizeName, normalizePhone, normalizeWebsite, type NapComparison, type NapRecord } from './nap';

export type ExtractionConfidence =
  /** Read from JSON-LD or microdata. Fields mean what they say. */
  | 'structured'
  /** Only presence of name/phone/domain in the page text was confirmed. */
  | 'text_only'
  /** The listing could not be found on the page at all. */
  | 'not_found';

export type CitationStatus =
  /** Listing found and consistent with the canonical record. */
  | 'consistent'
  /** Listing found; one or more tracked fields genuinely differ. */
  | 'inconsistent'
  /** Page mentions the business but the data could not be read. */
  | 'unverified'
  /** Page loaded and shows no sign of this business. */
  | 'not_found'
  /** We could not look. Never conflate with not_found. */
  | 'unreachable';

export interface CitationVerifyInput {
  html: string;
  fetchedUrl: string;
  statusCode: number;
  canonical: NapRecord;
}

export interface CitationVerifyResult {
  status: CitationStatus;
  confidence: ExtractionConfidence;
  observed: Partial<NapRecord>;
  comparison: NapComparison | null;
  /** Whether the listing links to the client's site, and how. */
  linksToSite: boolean;
  linkType: 'dofollow' | 'nofollow' | null;
  reasons: string[];
}

function text(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (typeof value === 'number') return String(value);
  return undefined;
}

/** Walks JSON-LD, which is routinely wrapped in @graph or an array. */
function collectJsonLdNodes($: cheerio.CheerioAPI): Record<string, unknown>[] {
  const nodes: Record<string, unknown>[] = [];

  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).contents().text().trim();
    if (!raw) return;

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      //  Directories ship malformed JSON-LD more often than you would hope.
      //  One bad block must not lose the good blocks on the same page.
      return;
    }

    const queue = [parsed];
    while (queue.length > 0) {
      const node = queue.shift();
      if (Array.isArray(node)) {
        queue.push(...node);
      } else if (node && typeof node === 'object') {
        const record = node as Record<string, unknown>;
        nodes.push(record);
        if (record['@graph']) queue.push(record['@graph']);
      }
    }
  });

  return nodes;
}

/** Types that describe a business entity rather than the page around it. */
const BUSINESS_TYPES = /localbusiness|organization|store|restaurant|professionalservice|attorney|legalservice|physician|medicalbusiness|dentist|homeandconstructionbusiness|corporation/i;

function isBusinessNode(node: Record<string, unknown>): boolean {
  const type = node['@type'];
  const types = Array.isArray(type) ? type : [type];
  return types.some((t) => typeof t === 'string' && BUSINESS_TYPES.test(t));
}

function fromJsonLd(nodes: Record<string, unknown>[]): Partial<NapRecord> | null {
  for (const node of nodes) {
    if (!isBusinessNode(node)) continue;

    const address = node.address as Record<string, unknown> | undefined;
    const observed: Partial<NapRecord> = {
      name: text(node.name),
      phone: text(node.telephone),
      website: text(node.url),
    };

    if (address && typeof address === 'object' && !Array.isArray(address)) {
      observed.street = text(address.streetAddress);
      observed.city = text(address.addressLocality);
      observed.region = text(address.addressRegion);
      observed.postalCode = text(address.postalCode);
      observed.country = text(address.addressCountry);
    }

    //  A node with a type but no usable field is a stub — keep looking rather
    //  than returning an empty record that reads as "nothing was published".
    if (observed.name || observed.phone || observed.street) return observed;
  }

  return null;
}

function fromMicrodata($: cheerio.CheerioAPI): Partial<NapRecord> | null {
  const scope = $('[itemtype*="LocalBusiness" i], [itemtype*="Organization" i]').first();
  if (scope.length === 0) return null;

  const prop = (name: string): string | undefined => {
    const el = scope.find(`[itemprop="${name}"]`).first();
    if (el.length === 0) return undefined;
    return (el.attr('content') ?? el.text()).trim() || undefined;
  };

  const observed: Partial<NapRecord> = {
    name: prop('name'),
    phone: prop('telephone'),
    website: prop('url'),
    street: prop('streetAddress'),
    city: prop('addressLocality'),
    region: prop('addressRegion'),
    postalCode: prop('postalCode'),
  };

  return observed.name || observed.phone || observed.street ? observed : null;
}

/** Does the page link to the client's site, and does the link follow? */
function findSiteLink(
  $: cheerio.CheerioAPI,
  website: string | null | undefined
): { linksToSite: boolean; linkType: 'dofollow' | 'nofollow' | null } {
  const target = normalizeWebsite(website);
  if (!target) return { linksToSite: false, linkType: null };

  let found = false;
  let followable = false;

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') ?? '';
    if (normalizeWebsite(href) !== target) return;

    found = true;
    const rel = ($(el).attr('rel') ?? '').toLowerCase();
    if (!/nofollow|ugc|sponsored/.test(rel)) followable = true;
  });

  return { linksToSite: found, linkType: found ? (followable ? 'dofollow' : 'nofollow') : null };
}

export function verifyCitation(input: CitationVerifyInput): CitationVerifyResult {
  const { html, fetchedUrl, statusCode, canonical } = input;

  const bare = (status: CitationStatus, reasons: string[]): CitationVerifyResult => ({
    status,
    confidence: 'not_found',
    observed: {},
    comparison: null,
    linksToSite: false,
    linkType: null,
    reasons,
  });

  if (statusCode === 404 || statusCode === 410) {
    //  A removed listing is a real and actionable finding — it usually means
    //  the profile was taken down or merged into a duplicate.
    return bare('not_found', [`http_${statusCode}`, 'listing_removed']);
  }
  if (statusCode < 200 || statusCode >= 300) {
    return bare('unreachable', [statusCode === 0 ? 'no_response' : `http_${statusCode}`]);
  }
  if (!html.trim()) return bare('unreachable', ['empty_body']);

  const $ = cheerio.load(html);
  const reasons: string[] = [];

  const structured = fromJsonLd(collectJsonLdNodes($)) ?? fromMicrodata($);
  const { linksToSite, linkType } = findSiteLink($, canonical.website);

  if (structured) {
    const comparison = compareNap(canonical, structured);
    if (comparison.mismatches.length > 0) {
      reasons.push(...comparison.mismatches.map((field) => `mismatch_${field}`));
    }
    if (comparison.missing.length > 0) {
      reasons.push(...comparison.missing.map((field) => `not_listed_${field}`));
    }
    if (!linksToSite && canonical.website) reasons.push('no_link_to_site');

    return {
      status: comparison.mismatches.length > 0 ? 'inconsistent' : 'consistent',
      confidence: 'structured',
      observed: structured,
      comparison,
      linksToSite,
      linkType,
      reasons,
    };
  }

  //  No structured data. Fall back to asking only what can be answered
  //  honestly from raw text: is the business mentioned here at all?
  const pageText = $('body').text().replace(/\s+/g, ' ');
  const digits = pageText.replace(/\D/g, '');

  const phoneNormalized = normalizePhone(canonical.phone);
  const phonePresent = phoneNormalized.length >= 7 && digits.includes(phoneNormalized);

  const nameNormalized = normalizeName(canonical.name);
  const namePresent =
    nameNormalized.length > 2 &&
    normalizeName(pageText).includes(nameNormalized);

  if (!phonePresent && !namePresent && !linksToSite) {
    return {
      status: 'not_found',
      confidence: 'not_found',
      observed: {},
      comparison: null,
      linksToSite,
      linkType,
      reasons: ['no_structured_data', 'business_not_mentioned'],
    };
  }

  reasons.push('no_structured_data');
  if (phonePresent) reasons.push('phone_present_in_text');
  if (namePresent) reasons.push('name_present_in_text');
  if (linksToSite) reasons.push('links_to_site');
  if (!phonePresent && phoneNormalized) reasons.push('phone_not_found_in_text');

  return {
    //  `unverified`, not `inconsistent`. The listing exists; we could not read
    //  its fields, which is a statement about our extraction and not about the
    //  client's data.
    status: 'unverified',
    confidence: 'text_only',
    observed: {},
    comparison: null,
    linksToSite,
    linkType,
    reasons,
  };
}
