// ═══════════════════════════════════════════════════════════
//  core/verify.ts — does the link exist, and is it worth having?
//
//  PORTABLE: pure functions over HTML. No database, no framework,
//  no network. `verifyPlacement` is deterministic — same HTML in,
//  same verdict out — which is what makes it testable against
//  fixtures instead of against live third-party sites.
//
//  "Is the link there" is the easy half. The half that decides
//  whether a placement was worth paying for is everything around
//  it: page-level robots directives that silently neuter every
//  link on the page, rel tokens, whether the link sits in an
//  article or in a sitewide footer, and whether the page even
//  canonicalises to itself.
// ═══════════════════════════════════════════════════════════

import * as cheerio from 'cheerio';
import type { AnyNode, Element } from 'domhandler';
import { canonicalizeUrl, resolveHref, sameSite, urlsEqual } from './normalize';

export type LinkType = 'dofollow' | 'nofollow' | 'ugc' | 'sponsored';

export type LinkRegion = 'content' | 'nav' | 'header' | 'footer' | 'sidebar' | 'unknown';

export type PlacementStatus =
  /** Present, followable, and pointing where we expect. */
  | 'live'
  /** Present, but passes no signal — rel token or a page-level directive. */
  | 'nofollowed'
  /** Present and followable, but the anchor or destination drifted. */
  | 'changed'
  /** Page loaded fine and the link is not on it. */
  | 'lost'
  /** The page itself is gone (404/410). */
  | 'page_gone'
  /** We could not look. Never conflate with `lost`. */
  | 'unreachable';

export interface FoundLink {
  /** The href exactly as authored. */
  href: string;
  /** Absolute form, resolved against the page URL. */
  resolvedUrl: string;
  anchorText: string;
  /** Anchor is an image; `anchorText` falls back to its alt attribute. */
  isImageLink: boolean;
  relTokens: string[];
  linkType: LinkType;
  region: LinkRegion;
  /** Points at the exact target URL, not merely the target's domain. */
  exactMatch: boolean;
}

export interface PageSignals {
  title: string | null;
  metaRobots: string[];
  /** The page is excluded from the index, so a link on it passes nothing. */
  noindex: boolean;
  /** A page-level `nofollow` — applies to every link, rel tokens or not. */
  pageNofollow: boolean;
  canonical: string | null;
  /** Canonical points at a different document, diluting the placement. */
  canonicalMismatch: boolean;
  /** Distinct external hosts linked from this page. */
  externalDomainCount: number;
  totalLinkCount: number;
  wordCount: number;
}

export interface VerifyInput {
  html: string;
  /** URL after redirects — hrefs resolve against this, not the requested URL. */
  fetchedUrl: string;
  statusCode: number;
  /** The page of ours we expect to be linked. */
  targetUrl: string;
  /** Anchor recorded when the placement was agreed, if any. */
  expectedAnchor?: string | null;
}

export interface VerifyResult {
  status: PlacementStatus;
  linkType: LinkType | null;
  anchorText: string | null;
  /** Where the link actually points — may differ from `targetUrl`. */
  linkedUrl: string | null;
  region: LinkRegion | null;
  /** Machine-readable detail. Status is for the dashboard; this is for triage. */
  reasons: string[];
  page: PageSignals | null;
  /** Every link on the page aimed at our site, best candidate first. */
  matches: FoundLink[];
}

/**
 * Page signals from raw HTML, for callers that are assessing a page rather than
 * checking a placement on it — qualification, chiefly.
 *
 * Same reader the verifier uses, so a prospect is judged on exactly the
 * directives that will later decide whether a link there is worth anything.
 */
export function readPageSignalsFromHtml(html: string, fetchedUrl: string): PageSignals {
  return readPageSignals(cheerio.load(html), fetchedUrl);
}

/**
 * Every external link on a page, as absolute URLs.
 *
 * The free half of discovery: resource pages, roundups and industry hubs are
 * lists of exactly the sites worth approaching, and mining their outbound links
 * costs nothing but a fetch.
 */
export function extractOutboundLinks(html: string, fetchedUrl: string): string[] {
  const $ = cheerio.load(html);
  const found = new Set<string>();

  $('a[href]').each((_, el) => {
    const resolved = resolveHref((el as Element).attribs?.href ?? '', fetchedUrl);
    if (!resolved) return;
    if (sameSite(resolved, fetchedUrl)) return;
    found.add(resolved);
  });

  return [...found];
}

/** rel tokens that stop a link passing ranking signal. */
const NON_FOLLOWING_REL = new Set(['nofollow', 'ugc', 'sponsored']);

/** Class/id fragments that identify a region when the tag name does not. */
const REGION_HINTS: Array<[RegExp, LinkRegion]> = [
  [/(^|[-_\s])(site-?)?footer([-_\s]|$)/i, 'footer'],
  [/(^|[-_\s])(main-?|primary-?|site-?)?nav(igation)?([-_\s]|$)/i, 'nav'],
  [/(^|[-_\s])(breadcrumb|menu)([-_\s]|$)/i, 'nav'],
  [/(^|[-_\s])(site-?)?header([-_\s]|$)/i, 'header'],
  [/(^|[-_\s])(sidebar|widget|secondary)([-_\s]|$)/i, 'sidebar'],
  [/(^|[-_\s])(entry|post|article)-?(content|body)([-_\s]|$)/i, 'content'],
];

function tagOf(node: AnyNode): string {
  return ((node as Element).tagName ?? (node as Element).name ?? '').toLowerCase();
}

/**
 * Where on the page the link sits.
 *
 * A link in an article body and a link in a sitewide footer are different
 * products at the same price, and a client looking at "12 live links" deserves
 * to know which they bought. Cheerio returns ancestors closest-first, so the
 * innermost region wins — a footer nested inside <main> reads as footer.
 *
 * Heuristic by nature. Reported as `unknown` rather than guessed at when the
 * markup gives nothing to go on.
 */
function regionOf($: cheerio.CheerioAPI, el: Element): LinkRegion {
  for (const ancestor of $(el).parents().toArray()) {
    switch (tagOf(ancestor)) {
      case 'footer':
        return 'footer';
      case 'nav':
        return 'nav';
      case 'header':
        return 'header';
      case 'aside':
        return 'sidebar';
      case 'article':
      case 'main':
        return 'content';
    }

    const attribs = (ancestor as Element).attribs ?? {};
    const haystack = `${attribs.class ?? ''} ${attribs.id ?? ''} ${attribs.role ?? ''}`;
    if (haystack.trim()) {
      for (const [pattern, region] of REGION_HINTS) {
        if (pattern.test(haystack)) return region;
      }
    }
  }

  return 'unknown';
}

function relTokensOf(el: Element): string[] {
  const rel = (el.attribs?.rel ?? '').toLowerCase();
  return rel.split(/[\s,]+/).filter(Boolean);
}

function linkTypeOf(relTokens: string[], pageNofollow: boolean): LinkType {
  //  Order matters for reporting: `sponsored` and `ugc` are more specific
  //  statements than a bare `nofollow`, so they are named when present.
  if (relTokens.includes('sponsored')) return 'sponsored';
  if (relTokens.includes('ugc')) return 'ugc';
  if (relTokens.includes('nofollow') || pageNofollow) return 'nofollow';
  return 'dofollow';
}

function normalizeAnchor(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

/**
 * Reads the page-level directives that govern every link on the page.
 *
 * `<meta name="robots" content="nofollow">` is the one worth the effort: it
 * turns an apparently clean dofollow link into a link that passes nothing, it
 * is invisible in the rendered page, and it is a standard trick on sites that
 * sell placements. A checker that only reads rel attributes reports these as
 * live and healthy forever.
 */
export function readPageSignals($: cheerio.CheerioAPI, fetchedUrl: string): PageSignals {
  const metaRobots: string[] = [];

  //  Google-specific directives are honoured by Google and are what actually
  //  decides whether the link counts, so they are read alongside the generic
  //  robots tag rather than ignored as a vendor extension.
  $('meta[name]').each((_, el) => {
    const name = ($(el).attr('name') ?? '').toLowerCase();
    if (name !== 'robots' && name !== 'googlebot') return;
    const content = ($(el).attr('content') ?? '').toLowerCase();
    for (const token of content.split(/[\s,]+/).filter(Boolean)) {
      if (!metaRobots.includes(token)) metaRobots.push(token);
    }
  });

  const canonicalRaw = $('link[rel="canonical"]').first().attr('href') ?? null;
  const canonical = canonicalRaw ? resolveHref(canonicalRaw, fetchedUrl) : null;

  const externalHosts = new Set<string>();
  let totalLinkCount = 0;

  $('a[href]').each((_, el) => {
    const resolved = resolveHref($(el).attr('href') ?? '', fetchedUrl);
    if (!resolved) return;
    totalLinkCount++;
    if (!sameSite(resolved, fetchedUrl)) {
      const host = new URL(resolved).hostname.toLowerCase().replace(/^www\./, '');
      externalHosts.add(host);
    }
  });

  const bodyText = $('body').text().replace(/\s+/g, ' ').trim();

  return {
    title: normalizeAnchor($('title').first().text()) || null,
    metaRobots,
    noindex: metaRobots.includes('noindex') || metaRobots.includes('none'),
    pageNofollow: metaRobots.includes('nofollow') || metaRobots.includes('none'),
    canonical,
    //  A canonical that merely drops tracking params or a trailing slash is
    //  self-referential in every way that matters, so comparison is on the
    //  canonicalised form rather than the raw string.
    canonicalMismatch: canonical !== null && !urlsEqual(canonical, fetchedUrl),
    externalDomainCount: externalHosts.size,
    totalLinkCount,
    wordCount: bodyText ? bodyText.split(' ').length : 0,
  };
}

/**
 * Ranks candidate links so the reported one is the best the page offers.
 *
 * A page can carry several links to us — one in the article, one in an author
 * bio, one in a footer. Reporting whichever came first in the DOM makes the
 * verdict depend on template order, and a client whose article link is fine
 * would see "footer" because the footer happened to render first.
 */
function rankMatch(link: FoundLink): number {
  let rank = 0;
  if (link.linkType === 'dofollow') rank += 100;
  if (link.exactMatch) rank += 50;

  switch (link.region) {
    case 'content':
      rank += 30;
      break;
    case 'unknown':
      rank += 10;
      break;
    case 'sidebar':
      rank += 5;
      break;
    default:
      break; // nav, header and footer add nothing
  }

  if (!link.isImageLink && link.anchorText) rank += 5;
  return rank;
}

/**
 * Decides the state of one placement from one fetched page.
 *
 * Fetch failures are the caller's to classify — pass the status code through
 * and this returns `unreachable` or `page_gone` without inspecting HTML.
 */
export function verifyPlacement(input: VerifyInput): VerifyResult {
  const { html, fetchedUrl, statusCode, targetUrl, expectedAnchor } = input;

  const bare = (status: PlacementStatus, reasons: string[]): VerifyResult => ({
    status,
    linkType: null,
    anchorText: null,
    linkedUrl: null,
    region: null,
    reasons,
    page: null,
    matches: [],
  });

  if (statusCode === 404 || statusCode === 410) {
    return bare('page_gone', [`http_${statusCode}`]);
  }
  if (statusCode < 200 || statusCode >= 300) {
    return bare('unreachable', [statusCode === 0 ? 'no_response' : `http_${statusCode}`]);
  }
  if (!html || !html.trim()) {
    return bare('unreachable', ['empty_body']);
  }

  const $ = cheerio.load(html);
  const page = readPageSignals($, fetchedUrl);
  const reasons: string[] = [];

  const matches: FoundLink[] = [];

  $('a[href]').each((_, node) => {
    const el = node as Element;
    const href = el.attribs?.href ?? '';
    const resolved = resolveHref(href, fetchedUrl);
    if (!resolved) return;
    if (!sameSite(resolved, targetUrl)) return;

    const $el = $(el);
    const imageAlt = $el.find('img[alt]').first().attr('alt');
    const textAnchor = normalizeAnchor($el.text());
    const isImageLink = textAnchor === '' && $el.find('img').length > 0;
    const relTokens = relTokensOf(el);

    matches.push({
      href,
      resolvedUrl: resolved,
      anchorText: isImageLink ? normalizeAnchor(imageAlt ?? '') : textAnchor,
      isImageLink,
      relTokens,
      linkType: linkTypeOf(relTokens, page.pageNofollow),
      region: regionOf($, el),
      exactMatch: urlsEqual(resolved, targetUrl),
    });
  });

  matches.sort((a, b) => rankMatch(b) - rankMatch(a));

  if (matches.length === 0) {
    //  Deliberately still reports the page signals: "lost, and by the way the
    //  page went noindex" is a different conversation with the publisher than
    //  "lost, page looks healthy".
    return {
      status: 'lost',
      linkType: null,
      anchorText: null,
      linkedUrl: null,
      region: null,
      reasons: ['no_link_to_target'],
      page,
      matches: [],
    };
  }

  const best = matches[0];

  if (page.noindex) reasons.push('page_noindex');
  if (page.pageNofollow) reasons.push('page_meta_nofollow');
  if (page.canonicalMismatch) reasons.push('canonical_mismatch');
  if (best.isImageLink) reasons.push('image_link');
  if (best.region === 'footer' || best.region === 'nav' || best.region === 'header') {
    reasons.push(`placement_${best.region}`);
  }
  if (page.externalDomainCount > 100) {
    reasons.push(`high_outbound_domains_${page.externalDomainCount}`);
  }
  for (const token of best.relTokens) {
    if (NON_FOLLOWING_REL.has(token)) reasons.push(`rel_${token}`);
  }

  //  Destination drift. Common and rarely malicious — a publisher tidying URLs
  //  or routing through a redirect — but it changes which of our pages gets the
  //  benefit, so it is surfaced rather than smoothed over.
  const targetDrifted = !best.exactMatch;
  if (targetDrifted) {
    reasons.push('target_url_changed');
  }

  const anchorDrifted =
    !!expectedAnchor &&
    normalizeAnchor(expectedAnchor).toLowerCase() !== best.anchorText.toLowerCase();
  if (anchorDrifted) reasons.push('anchor_changed');

  let status: PlacementStatus;
  if (best.linkType !== 'dofollow') {
    status = 'nofollowed';
  } else if (targetDrifted || anchorDrifted) {
    status = 'changed';
  } else {
    status = 'live';
  }

  return {
    status,
    linkType: best.linkType,
    anchorText: best.anchorText || null,
    linkedUrl: canonicalizeUrl(best.resolvedUrl) ?? best.resolvedUrl,
    region: best.region,
    reasons,
    page,
    matches,
  };
}
