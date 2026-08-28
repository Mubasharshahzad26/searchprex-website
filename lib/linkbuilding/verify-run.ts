// ═══════════════════════════════════════════════════════════
//  verify-run.ts — the batch that walks placements and records
//  what it found.
//
//  NOT PORTABLE. This is the Prisma-bound half; everything it
//  decides with lives in ./core, which imports no database. When
//  this ports to NicheSEO Pro, ./core is copied unchanged and only
//  this file is rewritten against `db.prepare`.
//
//  Two rules the rest of the module depends on:
//
//   1. A link is declared lost only on evidence — a 2xx page that
//      does not contain it. Timeouts, bot walls and 5xx are
//      `unreachable`, and a placement has to be unreachable
//      repeatedly before that even reaches the dashboard.
//
//   2. Every check writes a LinkCheck row, including the boring
//      ones. Reconstructing when a link went nofollow matters
//      later, and it cannot be recovered from the current state.
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { fetchPage } from './core/fetch';
import { verifyPlacement, type PlacementStatus, type VerifyResult } from './core/verify';
import { hostOf } from './core/normalize';

/** Vercel's maxDuration is 300s; stop well before it so results get written. */
const DEFAULT_BUDGET_MS = 240_000;

/** Placements per run. A ceiling on cost, not a target. */
const DEFAULT_MAX_PLACEMENTS = 400;

/** Minimum gap between two requests to the same host. */
const PER_HOST_DELAY_MS = 1_500;

/**
 * Consecutive unreachable checks before the dashboard is told.
 *
 * One failed fetch is usually us — a cold lambda, a slow origin, a Cloudflare
 * mood. Reporting that as a problem trains everyone to ignore the dashboard,
 * which is worse than not having one.
 */
const UNREACHABLE_BEFORE_REPORTING = 2;

export interface VerifyRunOptions {
  clientId?: string;
  campaignId?: string;
  /** Check everything, ignoring verifyIntervalDays. For manual re-runs. */
  force?: boolean;
  maxPlacements?: number;
  budgetMs?: number;
  signal?: AbortSignal;
}

export interface VerifyRunStats {
  campaignsConsidered: number;
  checked: number;
  /** Due but not reached before the run's time budget expired. */
  skippedForTime: number;
  byStatus: Record<string, number>;
  transitions: Array<{
    placementId: string;
    sourceUrl: string;
    from: string;
    to: string;
  }>;
  elapsedMs: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fields to write given a verdict and the row as it stands.
 *
 * Split out as a pure function so the transition rules — which are the
 * opinionated part — can be tested without a database.
 */
export function nextPlacementState(
  current: {
    status: string;
    firstSeenAt: Date | null;
    lostAt: Date | null;
    consecutiveFailures: number;
  },
  result: VerifyResult,
  now: Date
): {
  status: string;
  firstSeenAt: Date | null;
  lastLiveAt?: Date;
  lostAt: Date | null;
  consecutiveFailures: number;
} {
  const present: PlacementStatus[] = ['live', 'nofollowed', 'changed'];

  if (result.status === 'unreachable') {
    const failures = current.consecutiveFailures + 1;
    return {
      //  The last known state is held until we have failed enough times to
      //  believe the site rather than the network. lostAt is untouched: not
      //  being able to look is not evidence of anything.
      status:
        failures >= UNREACHABLE_BEFORE_REPORTING ? 'unreachable' : current.status,
      firstSeenAt: current.firstSeenAt,
      lostAt: current.lostAt,
      consecutiveFailures: failures,
    };
  }

  if (present.includes(result.status)) {
    return {
      status: result.status,
      firstSeenAt: current.firstSeenAt ?? now,
      lastLiveAt: now,
      //  Cleared, so a link that comes back does not keep an old death date.
      lostAt: null,
      consecutiveFailures: 0,
    };
  }

  // lost | page_gone — the page answered and the link is not there.
  return {
    status: result.status,
    firstSeenAt: current.firstSeenAt,
    lostAt: current.lostAt ?? now,
    consecutiveFailures: 0,
  };
}

export async function runLinkVerification(
  options: VerifyRunOptions = {}
): Promise<VerifyRunStats> {
  const {
    clientId,
    campaignId,
    force = false,
    maxPlacements = DEFAULT_MAX_PLACEMENTS,
    budgetMs = DEFAULT_BUDGET_MS,
    signal,
  } = options;

  const startedAt = Date.now();
  const deadline = startedAt + budgetMs;

  const stats: VerifyRunStats = {
    campaignsConsidered: 0,
    checked: 0,
    skippedForTime: 0,
    byStatus: {},
    transitions: [],
    elapsedMs: 0,
  };

  const campaigns = await withRetry(() =>
    db.linkCampaign.findMany({
      where: {
        enabled: true,
        ...(campaignId ? { id: campaignId } : {}),
        ...(clientId ? { clientId } : {}),
      },
      select: { id: true, verifyIntervalDays: true },
    })
  );

  stats.campaignsConsidered = campaigns.length;
  if (campaigns.length === 0) {
    stats.elapsedMs = Date.now() - startedAt;
    return stats;
  }

  //  Due-ness is per campaign because the interval is, so the candidate set is
  //  assembled campaign by campaign rather than in one query with a shared
  //  cutoff.
  const due: Array<{
    id: string;
    sourceUrl: string;
    targetUrl: string;
    expectedAnchor: string | null;
    status: string;
    firstSeenAt: Date | null;
    lostAt: Date | null;
    consecutiveFailures: number;
  }> = [];

  for (const campaign of campaigns) {
    const cutoff = new Date(
      Date.now() - campaign.verifyIntervalDays * 24 * 60 * 60 * 1000
    );

    const rows = await withRetry(() =>
      db.linkPlacement.findMany({
        where: {
          campaignId: campaign.id,
          ...(force
            ? {}
            : {
                OR: [{ lastCheckedAt: null }, { lastCheckedAt: { lt: cutoff } }],
              }),
        },
        //  Never-checked first, then longest-neglected. A run that runs out of
        //  time leaves behind the placements it has the freshest data on.
        orderBy: [{ lastCheckedAt: { sort: 'asc', nulls: 'first' } }],
        take: maxPlacements,
        select: {
          id: true,
          sourceUrl: true,
          targetUrl: true,
          expectedAnchor: true,
          status: true,
          firstSeenAt: true,
          lostAt: true,
          consecutiveFailures: true,
        },
      })
    );

    due.push(...rows);
  }

  //  Interleave hosts so the per-host delay is absorbed by other work instead
  //  of stalling the run. Placements arrive grouped by campaign, and a campaign
  //  is often one client's links across a handful of publishers, so without
  //  this a 30-link domain serialises into 45 seconds of sleeping.
  const byHost = new Map<string, typeof due>();
  for (const placement of due) {
    const host = hostOf(placement.sourceUrl) ?? 'unparseable';
    const bucket = byHost.get(host);
    if (bucket) bucket.push(placement);
    else byHost.set(host, [placement]);
  }

  const queue: typeof due = [];
  let drained = false;
  for (let round = 0; !drained; round++) {
    drained = true;
    for (const bucket of byHost.values()) {
      if (round < bucket.length) {
        queue.push(bucket[round]);
        drained = false;
      }
    }
  }

  const lastRequestByHost = new Map<string, number>();

  for (const placement of queue) {
    if (signal?.aborted || Date.now() >= deadline) {
      stats.skippedForTime = queue.length - stats.checked;
      break;
    }

    const host = hostOf(placement.sourceUrl) ?? 'unparseable';
    const lastRequest = lastRequestByHost.get(host);
    if (lastRequest !== undefined) {
      const wait = PER_HOST_DELAY_MS - (Date.now() - lastRequest);
      if (wait > 0) await sleep(wait);
    }
    lastRequestByHost.set(host, Date.now());

    const now = new Date();

    //  Leave a little headroom so the fetch cannot itself run past the
    //  deadline and lose the write that follows it.
    const remaining = Math.max(3_000, Math.min(15_000, deadline - Date.now() - 2_000));
    const fetched = await fetchPage(placement.sourceUrl, {
      timeoutMs: remaining,
      signal,
    });

    const result = verifyPlacement({
      html: fetched.html ?? '',
      fetchedUrl: fetched.finalUrl,
      //  A bot wall must not be read as a verdict. Forcing the status to 0
      //  routes it down verifyPlacement's `unreachable` path regardless of
      //  what the challenge page responded with.
      statusCode: fetched.blocked ? 0 : fetched.statusCode,
      targetUrl: placement.targetUrl,
      expectedAnchor: placement.expectedAnchor,
    });

    const reasons = [...result.reasons];
    if (fetched.blocked) reasons.unshift('bot_challenge');
    else if (fetched.error) reasons.unshift(fetched.error);

    const next = nextPlacementState(placement, result, now);

    if (next.status !== placement.status) {
      stats.transitions.push({
        placementId: placement.id,
        sourceUrl: placement.sourceUrl,
        from: placement.status,
        to: next.status,
      });
    }

    try {
      await withRetry(() =>
        db.$transaction([
          db.linkPlacement.update({
            where: { id: placement.id },
            data: {
              status: next.status,
              firstSeenAt: next.firstSeenAt,
              lostAt: next.lostAt,
              consecutiveFailures: next.consecutiveFailures,
              ...(next.lastLiveAt ? { lastLiveAt: next.lastLiveAt } : {}),
              lastCheckedAt: now,
              lastStatusCode: fetched.statusCode,
              lastReasons: reasons,
              linkType: result.linkType,
              observedAnchor: result.anchorText,
              observedTargetUrl: result.linkedUrl,
              region: result.region,
            },
          }),
          db.linkCheck.create({
            data: {
              placementId: placement.id,
              status: result.status,
              linkType: result.linkType,
              anchorText: result.anchorText,
              statusCode: fetched.statusCode,
              reasons,
              pageSignals: result.page ? (result.page as any) : undefined,
              checkedAt: now,
            },
          }),
        ])
      );
    } catch (err) {
      //  One row failing to write is not a reason to abandon the batch. The
      //  placement stays due and is picked up first on the next run, since
      //  lastCheckedAt was never advanced.
      console.error(
        `[link-verify] write failed for ${placement.sourceUrl}: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      continue;
    }

    stats.checked++;
    stats.byStatus[result.status] = (stats.byStatus[result.status] ?? 0) + 1;
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}
