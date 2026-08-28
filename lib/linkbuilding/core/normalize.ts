// ═══════════════════════════════════════════════════════════
//  core/normalize.ts — URL and host comparison
//
//  PORTABLE: no database, no framework, no Node-only APIs beyond
//  the WHATWG URL. Copy this directory into another app as-is.
//
//  Every link check reduces to "is this href pointing at us?",
//  and getting that wrong in either direction is expensive: a
//  false negative reports a healthy link as lost and sends the
//  client an alarming email, a false positive marks a link live
//  that nobody can click. So the matching rules are explicit
//  here rather than inlined as regexes at each call site.
// ═══════════════════════════════════════════════════════════

/**
 * Query parameters that never change which document you land on. Stripped
 * before comparison so a link decorated with campaign tracking still matches
 * the target URL we recorded — publishers add these routinely, and without
 * this a perfectly good link reads as "changed" on every check.
 */
const TRACKING_PARAMS = [
  /^utm_/i,
  /^ref$/i,
  /^referrer$/i,
  /^source$/i,
  /^gclid$/i,
  /^fbclid$/i,
  /^msclkid$/i,
  /^mc_(cid|eid)$/i,
  /^igshid$/i,
  /^_hs(enc|mi)$/i,
];

function isTracking(key: string): boolean {
  return TRACKING_PARAMS.some((re) => re.test(key));
}

/** Accepts a bare domain or a full URL. Returns null when unparseable. */
export function toUrl(input: string): URL | null {
  const raw = (input ?? '').trim();
  if (!raw) return null;

  //  A bare "example.com/page" parses as a URL with protocol "example.com:",
  //  which then reports the wrong hostname rather than throwing. Forcing a
  //  scheme when none is present is the only reliable way to tell the two
  //  shapes apart.
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return url;
  } catch {
    return null;
  }
}

/** Lowercased hostname with a leading `www.` removed. Null when unparseable. */
export function hostOf(input: string): string | null {
  const url = toUrl(input);
  if (!url) return null;
  return url.hostname.toLowerCase().replace(/^www\./, '');
}

/**
 * Comparable form of a URL: lowercase host, no `www.`, no default port, no
 * fragment, no tracking params, remaining params sorted, no trailing slash
 * outside the root.
 *
 * Path case is preserved deliberately. Hostnames are case-insensitive per RFC
 * 3986 but paths are not, and plenty of CMSes serve different documents at
 * /About and /about.
 */
export function canonicalizeUrl(input: string): string | null {
  const url = toUrl(input);
  if (!url) return null;

  url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  url.hash = '';
  url.username = '';
  url.password = '';

  for (const key of [...url.searchParams.keys()]) {
    if (isTracking(key)) url.searchParams.delete(key);
  }
  url.searchParams.sort();

  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }

  return url.toString();
}

/**
 * True when two inputs live on the same site — identical hosts, or one a
 * subdomain of the other.
 *
 * Treating `blog.example.com` and `example.com` as the same site is a
 * simplification: it is right for the overwhelmingly common case (a brand's
 * own blog subdomain) and wrong for shared hosts like `*.wordpress.com`, where
 * two subdomains are unrelated strangers. Callers checking a link on a free
 * blogging platform should compare full hosts instead — see `hostsEqual`.
 */
export function sameSite(a: string, b: string): boolean {
  const hostA = hostOf(a);
  const hostB = hostOf(b);
  if (!hostA || !hostB) return false;
  if (hostA === hostB) return true;
  return hostA.endsWith(`.${hostB}`) || hostB.endsWith(`.${hostA}`);
}

/** Strict host comparison, ignoring only `www.` and case. */
export function hostsEqual(a: string, b: string): boolean {
  const hostA = hostOf(a);
  const hostB = hostOf(b);
  return hostA !== null && hostA === hostB;
}

/** True when both inputs resolve to the same document. */
export function urlsEqual(a: string, b: string): boolean {
  const canonicalA = canonicalizeUrl(a);
  const canonicalB = canonicalizeUrl(b);
  return canonicalA !== null && canonicalA === canonicalB;
}

/**
 * Resolves a possibly-relative href against the page it was found on.
 * Returns null for the hrefs that are not navigations at all — `#anchor`,
 * `mailto:`, `tel:`, `javascript:` — which would otherwise be counted as
 * outbound links and skew every ratio computed from them.
 */
export function resolveHref(href: string, pageUrl: string): string | null {
  const raw = (href ?? '').trim();
  if (!raw || raw.startsWith('#')) return null;
  if (/^(mailto|tel|javascript|data|sms):/i.test(raw)) return null;

  try {
    const resolved = new URL(raw, pageUrl);
    if (resolved.protocol !== 'http:' && resolved.protocol !== 'https:') return null;
    return resolved.toString();
  } catch {
    return null;
  }
}
