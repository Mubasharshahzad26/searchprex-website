// ═══════════════════════════════════════════════════════════
//  core/discovery/dataforseo.ts — the paid provider, gated
//
//  PORTABLE: credentials are passed in, never read from the
//  environment here, so this module works unchanged in an app
//  whose config lives somewhere else entirely.
//
//  The one rule this file exists to enforce: without credentials
//  it THROWS. It does not return an empty list and it does not
//  return an estimate.
//
//  That rule is written from experience in this repo. The SERP
//  Checker degrades to deterministic "estimated" data when these
//  same credentials are missing, and a broken key is
//  indistinguishable from a working one from the outside. For
//  rankings on a public tool that is a labelled demo. For link
//  prospects it would mean emailing real strangers about a
//  fabricated opportunity, so the failure has to be loud.
// ═══════════════════════════════════════════════════════════

import { DiscoveryError, type DiscoverySource } from './types';

export interface DataForSeoCredentials {
  login: string;
  password: string;
}

const BASE_URL = 'https://api.dataforseo.com/v3';

/** DataForSEO's success code. Anything else is an error, including 200 bodies. */
const STATUS_OK = 20000;

interface Envelope<T> {
  status_code: number;
  status_message: string;
  cost?: number;
  tasks?: Array<{
    status_code: number;
    status_message: string;
    cost?: number;
    result_count?: number;
    result?: T[] | null;
  }>;
}

export interface ProviderCall<T> {
  results: T[];
  costUsd: number;
  warnings: string[];
}

/**
 * True when both credentials are present and non-empty.
 *
 * Callers use this to decide whether to offer a channel at all, so the
 * dashboard can say "connect DataForSEO to enable backlink-gap discovery"
 * rather than showing a button that throws.
 */
export function hasDataForSeoCredentials(
  creds: Partial<DataForSeoCredentials> | null | undefined
): creds is DataForSeoCredentials {
  return Boolean(creds?.login?.trim() && creds?.password?.trim());
}

/**
 * One POST to a v3 endpoint.
 *
 * DataForSEO reports failure at two levels — the envelope and each task — and a
 * task can fail while the envelope says 20000. Both are checked; a caller that
 * only looked at the HTTP status would read a quota error as an empty result.
 */
export async function callDataForSeo<T>(
  endpoint: string,
  payload: unknown[],
  creds: Partial<DataForSeoCredentials> | null | undefined,
  source: DiscoverySource,
  options: { timeoutMs?: number; signal?: AbortSignal } = {}
): Promise<ProviderCall<T>> {
  if (!hasDataForSeoCredentials(creds)) {
    throw new DiscoveryError(
      'DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD are not set. This channel needs a ' +
        'live provider — it will not return estimated prospects.',
      source
    );
  }

  const { timeoutMs = 60_000, signal } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });

  const auth = Buffer.from(`${creds.login}:${creds.password}`).toString('base64');

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 401) {
      throw new DiscoveryError(
        'DataForSEO rejected the credentials (401). DATAFORSEO_PASSWORD is the API ' +
          'password from Dashboard -> API Access, not the website login password.',
        source
      );
    }

    if (res.status === 402) {
      throw new DiscoveryError('DataForSEO account is out of credit (402).', source);
    }

    if (res.status === 429) {
      throw new DiscoveryError('DataForSEO rate limit hit (429).', source, true);
    }

    if (!res.ok) {
      throw new DiscoveryError(
        `DataForSEO returned HTTP ${res.status} for ${endpoint}.`,
        source,
        res.status >= 500
      );
    }

    const body = (await res.json()) as Envelope<T>;

    if (body.status_code !== STATUS_OK) {
      throw new DiscoveryError(
        `DataForSEO error ${body.status_code}: ${body.status_message}`,
        source,
        body.status_code >= 50000
      );
    }

    const results: T[] = [];
    const warnings: string[] = [];
    //  Envelope cost is authoritative; task costs are summed only as a
    //  fallback so a run always reports something for spend.
    let taskCost = 0;

    for (const task of body.tasks ?? []) {
      taskCost += task.cost ?? 0;

      if (task.status_code !== STATUS_OK) {
        warnings.push(`task ${task.status_code}: ${task.status_message}`);
        continue;
      }
      if (task.result) results.push(...task.result);
    }

    if (results.length === 0 && warnings.length > 0) {
      //  Every task failed. Returning an empty list here would be read as "no
      //  opportunities", which is the failure mode this module exists to avoid.
      throw new DiscoveryError(
        `DataForSEO returned no usable results: ${warnings.join('; ')}`,
        source,
        true
      );
    }

    return { results, costUsd: body.cost ?? taskCost, warnings };
  } catch (err) {
    if (err instanceof DiscoveryError) throw err;

    const aborted = err instanceof Error && err.name === 'AbortError';
    throw new DiscoveryError(
      aborted
        ? `DataForSEO call to ${endpoint} timed out after ${timeoutMs}ms.`
        : `DataForSEO call to ${endpoint} failed: ${
            err instanceof Error ? err.message : String(err)
          }`,
      source,
      true
    );
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
  }
}
