// ═══════════════════════════════════════════════════════════
//  core/properties/footprint.ts — would this portfolio look like
//  a network to someone looking for one?
//
//  PORTABLE: pure. Takes a portfolio's metadata, returns findings.
//
//  Content similarity is only half of what gives a property
//  network away, and it is the half everyone checks. The other
//  half is structural: the same author name on eight sites, every
//  post published within the same hour, the identical anchor
//  every time, the link always in the first paragraph, every
//  property on one platform.
//
//  Each of those is invisible when you look at one property and
//  obvious across the set. This module looks across the set. It
//  is the audit a person would run against a competitor's network
//  to prove it was a network — pointed inward.
// ═══════════════════════════════════════════════════════════

import { worstPair } from './similarity';

export type FootprintSeverity = 'critical' | 'warning' | 'note';

export interface FootprintFinding {
  code: string;
  severity: FootprintSeverity;
  detail: string;
  /** Property ids involved, where the finding is about specific ones. */
  properties: string[];
}

export interface PropertySnapshot {
  id: string;
  /** Platform host, e.g. "wordpress.com", "medium.com". */
  platform: string;
  authorName: string | null;
  authorBio: string | null;
  /** Posts on this property. */
  posts: Array<{
    id: string;
    text: string;
    /** Anchors pointing at the client. */
    anchors: string[];
    publishedAt: Date | null;
    /** Fraction into the post where the first client link sits, 0..1. */
    linkPosition: number | null;
  }>;
}

export interface FootprintReport {
  findings: FootprintFinding[];
  /** 0..100. Higher is safer. */
  score: number;
  /** Worst content-similarity pair across the whole portfolio. */
  worstSimilarity: { a: string; b: string; score: number } | null;
}

const SEVERITY_COST: Record<FootprintSeverity, number> = {
  critical: 30,
  warning: 12,
  note: 4,
};

/** Fraction of a set that must share a trait before it reads as a pattern. */
const PATTERN_RATIO = 0.6;

function mostCommon<T>(values: T[]): { value: T; count: number } | null {
  if (values.length === 0) return null;

  const counts = new Map<T, number>();
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1);

  let best: { value: T; count: number } | null = null;
  for (const [value, count] of counts) {
    if (!best || count > best.count) best = { value, count };
  }
  return best;
}

/**
 * Audits a portfolio for the patterns that mark a set of properties as one
 * operation rather than several independent presences.
 */
export function auditFootprint(properties: PropertySnapshot[]): FootprintReport {
  const findings: FootprintFinding[] = [];

  if (properties.length === 0) {
    return { findings, score: 100, worstSimilarity: null };
  }

  // ── Content duplication ──────────────────────────────────────────────────
  const allPosts = properties.flatMap((property) =>
    property.posts.map((post) => ({ id: `${property.id}:${post.id}`, text: post.text }))
  );

  const worst = worstPair(allPosts);
  if (worst && worst.score >= 0.3) {
    findings.push({
      code: 'duplicate_content',
      severity: worst.score >= 0.5 ? 'critical' : 'warning',
      detail: `Two posts are ${(worst.score * 100).toFixed(0)}% similar (${worst.a}, ${worst.b}). Spun or lightly reworded content across properties is the fastest way to have the whole set discounted.`,
      properties: [worst.a.split(':')[0], worst.b.split(':')[0]],
    });
  }

  // ── Shared identity ──────────────────────────────────────────────────────
  const authors = properties.map((p) => p.authorName?.trim().toLowerCase()).filter(Boolean) as string[];
  const commonAuthor = mostCommon(authors);
  if (commonAuthor && properties.length > 1 && commonAuthor.count >= Math.max(2, properties.length * PATTERN_RATIO)) {
    findings.push({
      code: 'shared_author',
      severity: 'critical',
      detail: `"${commonAuthor.value}" is the author on ${commonAuthor.count} of ${properties.length} properties. One name across a portfolio ties them together permanently and is trivially searchable.`,
      properties: properties
        .filter((p) => p.authorName?.trim().toLowerCase() === commonAuthor.value)
        .map((p) => p.id),
    });
  }

  const bios = properties.map((p) => p.authorBio?.trim().toLowerCase()).filter(Boolean) as string[];
  const commonBio = mostCommon(bios);
  if (commonBio && commonBio.count >= 2) {
    findings.push({
      code: 'shared_bio',
      severity: 'warning',
      detail: `An identical author bio appears on ${commonBio.count} properties. Bios are indexed and matched verbatim.`,
      properties: properties
        .filter((p) => p.authorBio?.trim().toLowerCase() === commonBio.value)
        .map((p) => p.id),
    });
  }

  // ── Platform concentration ───────────────────────────────────────────────
  const platforms = properties.map((p) => p.platform.toLowerCase());
  const commonPlatform = mostCommon(platforms);
  if (commonPlatform && properties.length >= 3 && commonPlatform.count >= properties.length * PATTERN_RATIO) {
    findings.push({
      code: 'platform_concentration',
      severity: 'warning',
      detail: `${commonPlatform.count} of ${properties.length} properties are on ${commonPlatform.value}. A portfolio on one free host is one policy change from disappearing, and reads as a set.`,
      properties: properties.filter((p) => p.platform.toLowerCase() === commonPlatform.value).map((p) => p.id),
    });
  }

  // ── Anchor repetition ────────────────────────────────────────────────────
  const anchors = properties
    .flatMap((p) => p.posts.flatMap((post) => post.anchors))
    .map((a) => a.trim().toLowerCase())
    .filter(Boolean);

  const commonAnchor = mostCommon(anchors);
  if (commonAnchor && anchors.length >= 3 && commonAnchor.count >= anchors.length * PATTERN_RATIO) {
    findings.push({
      code: 'anchor_repetition',
      severity: 'critical',
      detail: `"${commonAnchor.value}" is used as the anchor ${commonAnchor.count} of ${anchors.length} times. Identical anchor text across properties you control is the clearest manipulation signal available.`,
      properties: [],
    });
  }

  // ── Publishing rhythm ────────────────────────────────────────────────────
  const timestamps = properties
    .flatMap((p) => p.posts.map((post) => post.publishedAt))
    .filter(Boolean) as Date[];

  if (timestamps.length >= 4) {
    const days = timestamps.map((t) => t.toISOString().slice(0, 10));
    const commonDay = mostCommon(days);
    if (commonDay && commonDay.count >= timestamps.length * PATTERN_RATIO) {
      findings.push({
        code: 'burst_publishing',
        severity: 'warning',
        detail: `${commonDay.count} of ${timestamps.length} posts published on ${commonDay.value}. Properties built in a single sitting look built in a single sitting. Space them over weeks.`,
        properties: [],
      });
    }

    const hours = timestamps.map((t) => t.getUTCHours());
    const commonHour = mostCommon(hours);
    if (commonHour && commonHour.count >= timestamps.length * PATTERN_RATIO) {
      findings.push({
        code: 'clustered_timing',
        severity: 'note',
        detail: `${commonHour.count} of ${timestamps.length} posts published in the ${commonHour.value}:00 UTC hour. A scheduler's fingerprint.`,
        properties: [],
      });
    }
  }

  // ── Link placement ───────────────────────────────────────────────────────
  const positions = properties
    .flatMap((p) => p.posts.map((post) => post.linkPosition))
    .filter((position): position is number => position !== null);

  if (positions.length >= 3) {
    //  Identical placement across posts means a template, not an editorial
    //  decision about where the link belonged.
    const early = positions.filter((position) => position <= 0.2).length;
    if (early >= positions.length * PATTERN_RATIO) {
      findings.push({
        code: 'templated_link_position',
        severity: 'warning',
        detail: `${early} of ${positions.length} client links sit in the first fifth of the post. Vary where the link naturally belongs.`,
        properties: [],
      });
    }
  }

  // ── Abandonment ──────────────────────────────────────────────────────────
  const empty = properties.filter((p) => p.posts.length === 0);
  if (empty.length > 0) {
    findings.push({
      code: 'empty_properties',
      severity: 'warning',
      detail: `${empty.length} propert${empty.length === 1 ? 'y has' : 'ies have'} no posts. An unused property is a liability that carries the brand's name and none of its value.`,
      properties: empty.map((p) => p.id),
    });
  }

  const score = Math.max(
    0,
    100 - findings.reduce((total, finding) => total + SEVERITY_COST[finding.severity], 0)
  );

  return { findings, score, worstSimilarity: worst };
}
