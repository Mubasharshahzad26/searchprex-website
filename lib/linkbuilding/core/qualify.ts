// ═══════════════════════════════════════════════════════════
//  core/qualify.ts — turning a discovered URL into a verdict
//
//  PORTABLE: the fetcher and the relevance classifier are both
//  injected, so this module performs no I/O of its own and has no
//  opinion about which HTTP client or which LLM is in use.
//
//  The ordering here is the module's economics. Fetching is cheap
//  and the hard rejects are free, so they run first; the LLM call
//  runs only for what survives. Reversed, a run over 500 raw
//  prospects would classify hundreds of pages that were about to
//  be thrown out for being noindex.
// ═══════════════════════════════════════════════════════════

import * as cheerio from 'cheerio';
import type { FetchOutcome } from './fetch';
import { readPageSignalsFromHtml, type PageSignals } from './verify';
import { readCommerceSignalsFromHtml } from './commerce';
import { scoreProspect, type ProspectScore } from './score';
import type { RawProspect } from './discovery/types';

export interface QualifyOptions {
  fetcher: (url: string) => Promise<FetchOutcome>;
  /**
   * Optional 0..1 topical match against the client's own subject.
   *
   * Returning null when unsure is correct and expected: scoreProspect records
   * the gap under `missingSignals` rather than substituting a number, so an
   * unavailable classifier lowers confidence instead of inventing it.
   */
  classifyRelevance?: (input: {
    prospect: RawProspect;
    title: string | null;
    excerpt: string;
  }) => Promise<number | null>;
  /** Characters of page text handed to the classifier. */
  excerptChars?: number;
  /** The client's own domain, to prevent them from becoming a prospect. */
  clientDomain?: string;
  /** Domains to hard-reject as direct competitors. */
  namedCompetitors?: string[];
  signal?: AbortSignal;
}

export type QualifyOutcome =
  /** Assessed. `score.passed` says whether to contact. */
  | 'assessed'
  /** Could not be read, so no verdict is possible. Retry later. */
  | 'unreachable';

export interface QualifyResult {
  outcome: QualifyOutcome;
  score: ProspectScore | null;
  page: PageSignals | null;
  statusCode: number;
  /** Final URL after redirects — a prospect often resolves elsewhere. */
  finalUrl: string;
  title: string | null;
  /** Why it could not be read, when `outcome` is 'unreachable'. */
  error?: string;
}

/** Visible text, scripts and styles removed. */
function visibleText(html: string): string {
  const $ = cheerio.load(html);
  $('script, style, noscript, template, svg').remove();
  return $('body').text().replace(/\s+/g, ' ').trim();
}

export async function qualifyProspect(
  prospect: RawProspect,
  options: QualifyOptions
): Promise<QualifyResult> {
  const { fetcher, classifyRelevance, excerptChars = 4_000, signal } = options;

  let fetched: FetchOutcome;
  try {
    fetched = await fetcher(prospect.url);
  } catch (err) {
    return {
      outcome: 'unreachable',
      score: null,
      page: null,
      statusCode: 0,
      finalUrl: prospect.url,
      title: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }

  //  A bot wall is not a verdict. The site may be an excellent prospect that
  //  simply refuses robots, and rejecting it here would quietly remove a whole
  //  class of good publishers from every campaign.
  if (!fetched.ok || !fetched.html) {
    return {
      outcome: 'unreachable',
      score: null,
      page: null,
      statusCode: fetched.statusCode,
      finalUrl: fetched.finalUrl,
      title: null,
      error: fetched.blocked ? 'bot_challenge' : fetched.error ?? 'unreachable',
    };
  }

  const page = readPageSignalsFromHtml(fetched.html, fetched.finalUrl);
  const text = visibleText(fetched.html);
  const commerce = readCommerceSignalsFromHtml(fetched.html, fetched.finalUrl);

  //  First pass with no relevance signal. If this rejects outright, the
  //  classifier is never called and the LLM spend never happens.
  const firstPass = scoreProspect({
    url: fetched.finalUrl,
    statusCode: fetched.statusCode,
    page,
    text,
    commerce,
    referringDomains: prospect.referringDomains,
    organicTraffic: prospect.organicTraffic,
    clientDomain: options.clientDomain,
    namedCompetitors: options.namedCompetitors,
  });

  if (firstPass.hardRejects.length > 0 || !classifyRelevance || signal?.aborted) {
    return {
      outcome: 'assessed',
      score: firstPass,
      page,
      statusCode: fetched.statusCode,
      finalUrl: fetched.finalUrl,
      title: page.title,
    };
  }

  let relevance: number | null = null;
  try {
    relevance = await classifyRelevance({
      prospect,
      title: page.title,
      excerpt: text.slice(0, excerptChars),
    });
  } catch {
    //  A failed classification is a missing signal, not a failed
    //  qualification. The first-pass score already stands on its own.
    relevance = null;
  }

  if (relevance === null) {
    return {
      outcome: 'assessed',
      score: firstPass,
      page,
      statusCode: fetched.statusCode,
      finalUrl: fetched.finalUrl,
      title: page.title,
    };
  }

  return {
    outcome: 'assessed',
    score: scoreProspect({
      url: fetched.finalUrl,
      statusCode: fetched.statusCode,
      page,
      text,
      commerce,
      referringDomains: prospect.referringDomains,
      organicTraffic: prospect.organicTraffic,
      topicalRelevance: relevance,
      clientDomain: options.clientDomain,
      namedCompetitors: options.namedCompetitors,
    }),
    page,
    statusCode: fetched.statusCode,
    finalUrl: fetched.finalUrl,
    title: page.title,
  };
}
