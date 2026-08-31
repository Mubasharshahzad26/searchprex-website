// ═══════════════════════════════════════════════════════════
//  core/properties/policy.ts — the limits that keep this honest
//
//  PORTABLE: pure.
//
//  Branded properties are the part of link building most likely
//  to hurt a client, so the constraints are in code where they
//  cannot be configured away:
//
//   - A HARD cap on properties per client. Not a default, not a
//     setting. Eight branded assets is a brand presence; fifty is
//     a network, and a network is what gets acted against.
//
//   - Brand anchors only. Exact-match commercial anchors on
//     properties you control is the single clearest signal of
//     manipulation available to a search engine.
//
//   - These links are NEVER counted in the link KPI. They live in
//     their own tables and `countsTowardLinkKpi` is a function
//     that returns false, so a report cannot merge them by
//     accident.
//
//  The purpose of a branded property is brand SERP control and
//  referral traffic. If it is being built for PageRank, it is
//  being built wrong.
// ═══════════════════════════════════════════════════════════

/**
 * Maximum branded properties per client. Hard.
 *
 * Exceeding this does not produce a warning; createProperty refuses. The number
 * is deliberately small — each property has to be maintained with real content,
 * and a portfolio nobody updates is worse than no portfolio.
 */
export const MAX_PROPERTIES_PER_CLIENT = 8;

/** Links back to the client per post. More than this reads as a link drop. */
export const MAX_CLIENT_LINKS_PER_POST = 2;

/** Minimum words. Thin posts on free platforms are the classic footprint. */
export const MIN_POST_WORDS = 500;

/**
 * Branded property links never count toward the link KPI.
 *
 * A function rather than a constant so it appears in call sites and code
 * search: anyone building a report that totals links will find this and see
 * why these are excluded.
 */
export function countsTowardLinkKpi(): false {
  return false;
}

export type AnchorVerdict = 'brand' | 'branded_url' | 'generic' | 'exact_match';

export interface AnchorPolicyInput {
  anchorText: string;
  /** The client's brand name, e.g. "Acme Knives". */
  brandName: string;
  /** The client's domain, e.g. "acmeknives.com". */
  brandDomain: string;
  /**
   * Commercial terms the client is trying to rank for. An anchor matching one
   * of these on a property we control is the pattern to avoid.
   */
  moneyTerms: string[];
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Anchors that say nothing commercial and are always safe. */
const GENERIC_ANCHORS = [
  'here', 'click here', 'this', 'read more', 'learn more', 'more info',
  'this article', 'this guide', 'our site', 'website', 'source', 'link',
];

/**
 * Classifies an anchor.
 *
 * `exact_match` is the one that matters: an anchor built from the terms the
 * client wants to rank for, on a property the client controls, is the clearest
 * manipulation signal there is.
 */
export function classifyAnchor(input: AnchorPolicyInput): AnchorVerdict {
  const raw = input.anchorText.trim();
  const anchor = normalize(input.anchorText);
  const brand = normalize(input.brandName);
  const domain = input.brandDomain.toLowerCase().replace(/^www\./, '');

  if (!anchor) return 'generic';

  if (anchor.includes(domain.split('.')[0]) || (brand && anchor.includes(brand))) {
    //  "acmeknives.com" and "Acme Knives" are both the brand naming itself,
    //  which is what a real citation looks like. The URL form is told apart by
    //  a TLD in the ORIGINAL text — normalize() strips punctuation, so testing
    //  the normalised string for a dot always fails.
    return /\.[a-z]{2,}/i.test(raw) ? 'branded_url' : 'brand';
  }

  if (GENERIC_ANCHORS.includes(anchor)) return 'generic';

  for (const term of input.moneyTerms) {
    const normalizedTerm = normalize(term);
    if (normalizedTerm && anchor.includes(normalizedTerm)) return 'exact_match';
  }

  //  Not the brand, not a known generic, not a money term. Descriptive text —
  //  acceptable, and treated as generic rather than given its own category.
  return 'generic';
}

export interface PostPolicyInput {
  html: string;
  brandName: string;
  brandDomain: string;
  moneyTerms: string[];
  /** Similarity against the most similar existing post, 0..1. */
  highestSimilarity: number;
  similarityThreshold: number;
}

export interface PostPolicyVerdict {
  allowed: boolean;
  problems: string[];
  warnings: string[];
  /** Anchors found pointing at the client, with their classification. */
  anchors: Array<{ text: string; verdict: AnchorVerdict }>;
  wordCount: number;
}

/**
 * Checks a drafted post before it is published to a property.
 *
 * Denies rather than warns on anything structural — anchor manipulation,
 * duplication, link stuffing — because those are the failures that make the
 * whole portfolio a liability rather than an asset.
 */
export function checkPostPolicy(input: PostPolicyInput): PostPolicyVerdict {
  const problems: string[] = [];
  const warnings: string[] = [];

  const text = input.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = text ? text.split(' ').length : 0;

  if (wordCount < MIN_POST_WORDS) {
    problems.push(`too_thin:${wordCount}_words_below_${MIN_POST_WORDS}`);
  }

  const domain = input.brandDomain.toLowerCase().replace(/^www\./, '');
  const anchors: Array<{ text: string; verdict: AnchorVerdict }> = [];

  //  Anchor text is whatever sits between the tags; nested markup is stripped
  //  so <a><strong>text</strong></a> is read as "text".
  const linkPattern = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  for (const match of input.html.matchAll(linkPattern)) {
    const href = match[1];
    if (!href.toLowerCase().includes(domain)) continue;

    const anchorText = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    anchors.push({
      text: anchorText,
      verdict: classifyAnchor({
        anchorText,
        brandName: input.brandName,
        brandDomain: input.brandDomain,
        moneyTerms: input.moneyTerms,
      }),
    });
  }

  if (anchors.length > MAX_CLIENT_LINKS_PER_POST) {
    problems.push(`too_many_client_links:${anchors.length}_of_${MAX_CLIENT_LINKS_PER_POST}`);
  }

  const exactMatch = anchors.filter((a) => a.verdict === 'exact_match');
  if (exactMatch.length > 0) {
    problems.push(
      `exact_match_anchor:${exactMatch.map((a) => a.text).join(' | ').slice(0, 80)}`
    );
  }

  if (anchors.length === 0) {
    //  Not a failure. A property post that links nowhere is still brand
    //  presence, and a portfolio where every post links back is its own signal.
    warnings.push('no_link_to_client');
  }

  if (input.highestSimilarity >= input.similarityThreshold) {
    problems.push(
      `near_duplicate:${input.highestSimilarity.toFixed(2)}_over_${input.similarityThreshold}`
    );
  } else if (input.highestSimilarity >= input.similarityThreshold * 0.75) {
    warnings.push(`similarity_climbing:${input.highestSimilarity.toFixed(2)}`);
  }

  return { allowed: problems.length === 0, problems, warnings, anchors, wordCount };
}

/** Whether another property may be created for this client. */
export function canCreateProperty(currentCount: number): { allowed: boolean; reason?: string } {
  if (currentCount >= MAX_PROPERTIES_PER_CLIENT) {
    return {
      allowed: false,
      reason:
        `${currentCount} properties already exist and the hard cap is ` +
        `${MAX_PROPERTIES_PER_CLIENT}. Past this point a portfolio stops reading as ` +
        'brand presence and starts reading as a network. Retire one first.',
    };
  }
  return { allowed: true };
}
