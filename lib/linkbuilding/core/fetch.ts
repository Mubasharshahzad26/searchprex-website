// ═══════════════════════════════════════════════════════════
//  core/fetch.ts — fetching a third-party page, defensively
//
//  PORTABLE: no database, no framework. Uses global fetch and
//  AbortSignal, both present in Node 18+ and in the browser.
//
//  This exists as its own module because the difference between
//  "the link is gone" and "we could not look" is the single most
//  important distinction in link monitoring, and it is decided
//  here rather than by the caller. Cheap monitoring tools collapse
//  the two and email clients about lost links every time a
//  publisher turns on Cloudflare. We report `blocked` instead, and
//  verify-run.ts refuses to mark anything lost on that basis.
// ═══════════════════════════════════════════════════════════

export interface FetchOutcome {
  /** True only when we hold real HTML for the requested document. */
  ok: boolean;
  /** HTTP status, or 0 when the request never produced a response. */
  statusCode: number;
  /** URL after redirects — may differ from the one requested. */
  finalUrl: string;
  html: string | null;
  /** A bot wall answered, so the absence of a link proves nothing. */
  blocked: boolean;
  /** Short machine-readable cause, present whenever `ok` is false. */
  error?: string;
  elapsedMs: number;
}

export interface FetchOptions {
  timeoutMs?: number;
  /** Hard cap on bytes read. Guards against a 40MB page eating the run. */
  maxBytes?: number;
  userAgent?: string;
  signal?: AbortSignal;
}

const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_MAX_BYTES = 3 * 1024 * 1024;

/**
 * Identifies the crawler honestly and points at a page explaining it.
 *
 * Impersonating a browser would get past more bot walls, and is exactly the
 * behaviour that gets a crawler blocked permanently once noticed. These are
 * sites we intend to ask for links — being a recognisable, well-behaved
 * visitor is worth more than a few extra percent of coverage.
 */
const DEFAULT_USER_AGENT =
  'SearchPrexLinkBot/1.0 (+https://www.searchprex.com/bot)';

/**
 * Body markers that mean "a challenge page answered, not the document".
 * Checked only on suspicious statuses, since these strings can legitimately
 * appear in an article about bot protection.
 */
const CHALLENGE_MARKERS = [
  'cf-browser-verification',
  'cf_chl_opt',
  'just a moment...',
  'attention required! | cloudflare',
  'checking your browser before accessing',
  'enable javascript and cookies to continue',
  '_incapsula_resource',
  'access denied',
  'request unsuccessful. incapsula incident id',
  'pardon our interruption',
];

/** Statuses that mean "ask again later", never "the page is gone". */
function isTransient(status: number): boolean {
  return status === 403 || status === 408 || status === 429 || status >= 500;
}

function looksChallenged(status: number, body: string): boolean {
  if (!isTransient(status)) return false;
  const head = body.slice(0, 6000).toLowerCase();
  return CHALLENGE_MARKERS.some((marker) => head.includes(marker));
}

/**
 * Reads at most `maxBytes` from the response.
 *
 * `res.text()` would buffer the whole body first, which defeats the point of a
 * cap on a page that is large by accident or on purpose. Cancelling the reader
 * early also releases the socket instead of waiting out the transfer.
 */
async function readCapped(res: Response, maxBytes: number): Promise<string> {
  if (!res.body) return '';

  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      chunks.push(value);
      total += value.byteLength;
      if (total >= maxBytes) break;
    }
  } finally {
    //  Already-closed readers throw here; the body is what we came for and it
    //  is in `chunks` either way.
    await reader.cancel().catch(() => {});
  }

  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    const room = merged.length - offset;
    if (room <= 0) break;
    const slice = chunk.byteLength > room ? chunk.subarray(0, room) : chunk;
    merged.set(slice, offset);
    offset += slice.byteLength;
  }

  return new TextDecoder('utf-8', { fatal: false }).decode(merged);
}

export async function fetchPage(
  url: string,
  options: FetchOptions = {}
): Promise<FetchOutcome> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    maxBytes = DEFAULT_MAX_BYTES,
    userAgent = DEFAULT_USER_AGENT,
    signal,
  } = options;

  const startedAt = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  //  The caller's signal is the run-level deadline. Without forwarding it, a
  //  batch that has run out of time still waits out every in-flight request.
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });

  const fail = (statusCode: number, error: string, blocked = false): FetchOutcome => ({
    ok: false,
    statusCode,
    finalUrl: url,
    html: null,
    blocked,
    error,
    elapsedMs: Date.now() - startedAt,
  });

  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    const finalUrl = res.url || url;

    //  Read the body before deciding, because a challenge page arrives with an
    //  error status and its own HTML — the status alone cannot tell a bot wall
    //  from a genuinely broken page.
    const contentType = res.headers.get('content-type') ?? '';
    const isHtml = contentType === '' || /html|xml/i.test(contentType);
    const body = isHtml ? await readCapped(res, maxBytes) : '';

    if (!res.ok) {
      const blocked = looksChallenged(res.status, body) || res.status === 429;
      return {
        ok: false,
        statusCode: res.status,
        finalUrl,
        html: null,
        blocked,
        error: blocked ? 'bot_challenge' : `http_${res.status}`,
        elapsedMs: Date.now() - startedAt,
      };
    }

    if (!isHtml) {
      return {
        ok: false,
        statusCode: res.status,
        finalUrl,
        html: null,
        blocked: false,
        error: `unexpected_content_type_${contentType.split(';')[0] || 'unknown'}`,
        elapsedMs: Date.now() - startedAt,
      };
    }

    //  A 200 that is really a challenge. Rarer than the 403 form but it does
    //  happen, and it is indistinguishable from an empty page to a naive check.
    if (looksChallenged(500, body)) {
      return {
        ok: false,
        statusCode: res.status,
        finalUrl,
        html: null,
        blocked: true,
        error: 'bot_challenge',
        elapsedMs: Date.now() - startedAt,
      };
    }

    return {
      ok: true,
      statusCode: res.status,
      finalUrl,
      html: body,
      blocked: false,
      elapsedMs: Date.now() - startedAt,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const aborted = err instanceof Error && err.name === 'AbortError';
    return fail(0, aborted ? 'timeout' : `network_error: ${message.slice(0, 160)}`);
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}
