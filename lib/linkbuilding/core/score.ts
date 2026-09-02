// ═══════════════════════════════════════════════════════════
//  core/score.ts — is this site worth approaching?
//
//  PORTABLE: pure function. No database, no network, no LLM call.
//  Everything expensive is an *input*, supplied by the caller, so
//  this can be unit-tested and so the caller controls what it
//  spends. That ordering is the whole economics of the module:
//  run the free rejects first, buy metrics only for survivors.
//
//  Phase 1 wires discovery adapters into this. It lands in Phase 0
//  because the shape of `ProspectSignals` decides what those
//  adapters have to return, and finding that out after they are
//  written is the expensive order to do it in.
// ═══════════════════════════════════════════════════════════

import type { PageSignals } from './verify';
import type { CommerceSignals } from './commerce';
import { hostOf, sameSite } from './normalize';

export interface ProspectSignals {
  url: string;
  statusCode: number;
  /** From `verifyPlacement`, or `readPageSignals` on any fetched page. */
  page?: PageSignals | null;
  /** Visible page text, for the link-selling and spam-vertical checks. */
  text?: string | null;

  //  Paid metrics. Every one is optional: a prospect with none still scores,
  //  it just scores conservatively. Nothing here may be invented when absent —
  //  a missing metric must never be defaulted to a flattering number.
  referringDomains?: number | null;
  organicTraffic?: number | null;
  /** 0..1 from an LLM comparison against the client's own content. */
  topicalRelevance?: number | null;
  /** ISO date of the site's most recent post, when discoverable. */
  lastPublishedAt?: string | null;

  //  Relationship, not quality. These decide whether a good site is a site we
  //  can approach — a rival shop scores well on every other axis and is still
  //  never going to link out to the client.
  /** Storefront evidence, from `readCommerceSignalsFromHtml`. */
  commerce?: CommerceSignals | null;
  /** The client's own domain, so their own pages cannot become prospects. */
  clientDomain?: string | null;
  /** Domains the campaign names as competitors. Matching one is disqualifying. */
  namedCompetitors?: readonly string[];
}

export interface ProspectScore {
  /** 0..100. Only meaningful when `hardRejects` is empty. */
  score: number;
  passed: boolean;
  /** Disqualifying findings. Any entry means "do not contact", at any score. */
  hardRejects: string[];
  /** Scoring detail, each with the points it moved. */
  reasons: string[];
  /** Metrics that were absent, so a low score can be read correctly. */
  missingSignals: string[];
}

const PASS_THRESHOLD = 60;

/**
 * Phrases that mean the site sells links. Their presence is disqualifying, not
 * a deduction: a paid link is a link scheme under Google's own guidelines, and
 * the client carries the risk, not us. Matched only alongside a price signal so
 * an article *about* paid guest posting is not caught.
 */
const LINK_SELLING_PHRASES = [
  'guest post',
  'sponsored post',
  'paid post',
  'write for us',
  'submit an article',
  'link insertion',
  'niche edit',
];

const PRICE_MARKERS = [
  /[$£€]\s?\d{2,}/,
  /\b\d{2,}\s?(usd|eur|gbp)\b/i,
  /\bper (post|article|link|placement)\b/i,
  /\bprice list\b/i,
  /\bpayment (is )?(required|via)\b/i,
];

/**
 * Verticals whose presence in a site's own copy marks it as a link farm rather
 * than a publisher, in the niches this product serves. Deliberately narrow —
 * a broad keyword blocklist rejects legitimate sites and is impossible to
 * defend to a client asking why their prospect was dropped.
 */
const SPAM_VERTICAL_MARKERS = [
  /\bcasino\b/i,
  /\bonline (poker|slots|betting)\b/i,
  /\b(viagra|cialis)\b/i,
  /\bpayday loans?\b/i,
  /\bescort service\b/i,
  /\bessay writing service\b/i,
];

function hasLinkSellingOffer(text: string): boolean {
  const lower = text.toLowerCase();
  const offersPlacement = LINK_SELLING_PHRASES.some((phrase) => lower.includes(phrase));
  if (!offersPlacement) return false;
  return PRICE_MARKERS.some((pattern) => pattern.test(text));
}

function monthsSince(iso: string): number | null {
  const then = Date.parse(iso);
  if (Number.isNaN(then)) return null;
  return (Date.now() - then) / (1000 * 60 * 60 * 24 * 30.44);
}

/**
 * Scores a prospect from signals already gathered.
 *
 * Two independent verdicts come back. `hardRejects` is categorical: any entry
 * means do not contact, whatever the score says. `score` ranks what survives.
 * Collapsing them into one number would let a strong domain buy its way past a
 * disqualifying finding, which is exactly how link-selling sites end up in a
 * client's profile.
 */
export function scoreProspect(signals: ProspectSignals): ProspectScore {
  const hardRejects: string[] = [];
  const reasons: string[] = [];
  const missingSignals: string[] = [];

  const { page, text } = signals;

  // ── Hard rejects: free, so they run first and short-circuit paid lookups ──

  if (signals.statusCode < 200 || signals.statusCode >= 300) {
    hardRejects.push(`http_${signals.statusCode}`);
  }

  if (page?.noindex) {
    //  A link on a noindex page passes nothing. No metric redeems it.
    hardRejects.push('page_noindex');
  }

  if (page?.pageNofollow) {
    hardRejects.push('page_meta_nofollow');
  }

  if (page && page.externalDomainCount > 100) {
    hardRejects.push(`outbound_domains_${page.externalDomainCount}`);
  }

  //  The client's own site, reached through its own backlinks or its own
  //  rankings. Costs nothing to catch and is embarrassing to miss.
  if (signals.clientDomain && sameSite(signals.url, signals.clientDomain)) {
    hardRejects.push('own_domain');
  }

  //  A domain someone named as a competitor. Categorical on purpose: this is a
  //  human judgement already made about the account, and no page-level metric
  //  should be able to overturn it.
  if (signals.namedCompetitors?.some((candidate) => sameSite(signals.url, candidate))) {
    hardRejects.push('competitor_domain');
  }

  if (text) {
    if (hasLinkSellingOffer(text)) hardRejects.push('sells_links');

    const spamHit = SPAM_VERTICAL_MARKERS.find((pattern) => pattern.test(text));
    if (spamHit) hardRejects.push('spam_vertical');
  }

  if (hardRejects.length > 0) {
    return { score: 0, passed: false, hardRejects, reasons, missingSignals };
  }

  // ── Scoring. Starts low and is earned, not started high and deducted from. ──

  let score = 30;
  reasons.push('base_30');

  //  Deduction for storefronts. A storefront is heavily penalized because a
  //  competitor generally won't link to a competitor. A -25 means it can only
  //  pass if its domain authority and relevance are exceptionally high.
  if (signals.commerce?.isStorefront) {
    score -= 25;
    reasons.push('storefront_deduction_-25');
  }

  if (typeof signals.referringDomains === 'number') {
    //  Bands rather than a curve: the difference between 40 and 60 referring
    //  domains is noise, the difference between 40 and 4000 is not.
    const rd = signals.referringDomains;
    const points = rd >= 1000 ? 25 : rd >= 250 ? 20 : rd >= 50 ? 14 : rd >= 10 ? 7 : 0;
    score += points;
    reasons.push(`referring_domains_${rd}_+${points}`);
  } else {
    missingSignals.push('referringDomains');
  }

  if (typeof signals.organicTraffic === 'number') {
    const traffic = signals.organicTraffic;
    const points = traffic >= 10_000 ? 20 : traffic >= 1_000 ? 14 : traffic >= 100 ? 8 : 0;
    score += points;
    reasons.push(`organic_traffic_${traffic}_+${points}`);
    //  Referring domains without traffic is the signature of a rebuilt expired
    //  domain: history inherited, audience never there.
    if (traffic < 100 && (signals.referringDomains ?? 0) >= 250) {
      score -= 15;
      reasons.push('links_without_traffic_-15');
    }
  } else {
    missingSignals.push('organicTraffic');
  }

  if (typeof signals.topicalRelevance === 'number') {
    const points = Math.round(Math.max(0, Math.min(1, signals.topicalRelevance)) * 25);
    score += points;
    reasons.push(`topical_relevance_${signals.topicalRelevance.toFixed(2)}_+${points}`);
  } else {
    missingSignals.push('topicalRelevance');
  }

  if (page) {
    //  Outbound links per page, as a proxy for editorial restraint. A page
    //  linking to five external sources reads as written; one linking to sixty
    //  reads as a directory.
    const outbound = page.externalDomainCount;
    if (outbound <= 15) {
      score += 10;
      reasons.push(`outbound_domains_${outbound}_+10`);
    } else if (outbound <= 40) {
      score += 4;
      reasons.push(`outbound_domains_${outbound}_+4`);
    } else {
      score -= 10;
      reasons.push(`outbound_domains_${outbound}_-10`);
    }

    if (page.wordCount >= 600) {
      score += 5;
      reasons.push(`word_count_${page.wordCount}_+5`);
    } else if (page.wordCount < 200) {
      score -= 10;
      reasons.push(`word_count_${page.wordCount}_-10`);
    }

    if (page.canonicalMismatch) {
      score -= 10;
      reasons.push('canonical_mismatch_-10');
    }
  } else {
    missingSignals.push('page');
  }

  if (signals.lastPublishedAt) {
    const months = monthsSince(signals.lastPublishedAt);
    if (months !== null) {
      if (months <= 3) {
        score += 10;
        reasons.push('published_within_3_months_+10');
      } else if (months >= 18) {
        //  An abandoned site can still rank, but nobody is there to answer an
        //  outreach email, so contacting it spends send reputation for nothing.
        score -= 15;
        reasons.push(`dormant_${Math.round(months)}_months_-15`);
      }
    }
  } else {
    missingSignals.push('lastPublishedAt');
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    passed: score >= PASS_THRESHOLD,
    hardRejects,
    reasons,
    missingSignals,
  };
}
