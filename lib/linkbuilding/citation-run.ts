// ═══════════════════════════════════════════════════════════
//  citation-run.ts — building the queue, and checking what is live
//
//  NOT PORTABLE. Prisma-bound; the registry, NAP comparison and
//  extraction all live in ./core/citations.
//
//  Two operations:
//
//   buildCitationQueue  — works out which directories apply to a
//                         client and creates the rows a person
//                         will work through. Creates only; never
//                         resets a listing already submitted.
//
//   runCitationVerification — fetches listings that have a URL and
//                         compares them against the canonical NAP.
//
//  Neither submits anything anywhere. Scripted submission breaches
//  most directories' terms and gets the listing removed, which
//  costs the client the citation they paid for. The product
//  pre-fills and verifies; a person presses submit.
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { fetchPage } from './core/fetch';
import { directoriesFor } from './core/citations/registry';
import { verifyCitation } from './core/citations/verify-citation';
import type { NapRecord } from './core/citations/nap';

const DEFAULT_BUDGET_MS = 240_000;
const DEFAULT_MAX_LISTINGS = 200;
const PER_HOST_DELAY_MS = 2_000;

/** Consecutive unreachable checks before the dashboard is told. */
const UNREACHABLE_BEFORE_REPORTING = 2;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface BuildQueueStats {
  profileId: string;
  applicable: number;
  created: number;
  existing: number;
  directories: Array<{ id: string; name: string; tier: string; linkValue: string; claimUrl: string }>;
}

/**
 * Creates queue rows for every directory that applies to this client.
 *
 * Idempotent: re-running after the registry gains a directory adds only the new
 * one. An existing row is never touched, because it may carry a submission
 * someone made by hand and notes they wrote.
 */
export async function buildCitationQueue(profileId: string): Promise<BuildQueueStats> {
  const profile = await withRetry(() =>
    db.businessProfile.findUniqueOrThrow({
      where: { id: profileId },
      include: { submissions: { select: { directoryId: true } } },
    })
  );

  const applicable = directoriesFor({
    industry: profile.industry,
    country: profile.country,
  });

  const already = new Set(profile.submissions.map((s) => s.directoryId));
  let created = 0;

  for (const directory of applicable) {
    if (already.has(directory.id)) continue;

    await withRetry(() =>
      db.citationSubmission.create({
        data: {
          profileId,
          directoryId: directory.id,
          directoryName: directory.name,
          tier: directory.tier,
          linkValue: directory.linkValue,
          submissionMethod: directory.submission,
        },
      })
    );
    created++;
  }

  return {
    profileId,
    applicable: applicable.length,
    created,
    existing: applicable.length - created,
    directories: applicable.map((d) => ({
      id: d.id,
      name: d.name,
      tier: d.tier,
      linkValue: d.linkValue,
      claimUrl: d.claimUrl,
    })),
  };
}

export interface CitationVerifyOptions {
  clientId?: string;
  profileId?: string;
  /** Re-check everything, not only what is due. */
  force?: boolean;
  maxListings?: number;
  budgetMs?: number;
  signal?: AbortSignal;
}

export interface CitationVerifyStats {
  checked: number;
  consistent: number;
  inconsistent: number;
  unverified: number;
  notFound: number;
  unreachable: number;
  skippedForTime: number;
  /** Listings whose NAP differs, with the offending fields. */
  problems: Array<{ directory: string; listingUrl: string; mismatches: string[] }>;
  elapsedMs: number;
}

export async function runCitationVerification(
  options: CitationVerifyOptions = {}
): Promise<CitationVerifyStats> {
  const {
    clientId,
    profileId,
    force = false,
    maxListings = DEFAULT_MAX_LISTINGS,
    budgetMs = DEFAULT_BUDGET_MS,
    signal,
  } = options;

  const startedAt = Date.now();
  const deadline = startedAt + budgetMs;

  const stats: CitationVerifyStats = {
    checked: 0,
    consistent: 0,
    inconsistent: 0,
    unverified: 0,
    notFound: 0,
    unreachable: 0,
    skippedForTime: 0,
    problems: [],
    elapsedMs: 0,
  };

  //  Weekly cadence, matching link verification. Directory data does not
  //  change often, and these are sites it pays to be gentle with.
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const listings = await withRetry(() =>
    db.citationSubmission.findMany({
      where: {
        //  Only listings that actually exist. A queued row has no URL to check,
        //  and counting it as a failed verification would be nonsense.
        listingUrl: { not: null },
        status: { in: ['submitted', 'live'] },
        ...(profileId ? { profileId } : {}),
        ...(clientId ? { profile: { clientId } } : {}),
        ...(force ? {} : { OR: [{ lastCheckedAt: null }, { lastCheckedAt: { lt: cutoff } }] }),
      },
      orderBy: [{ lastCheckedAt: { sort: 'asc', nulls: 'first' } }],
      take: maxListings,
      include: { profile: true },
    })
  );

  const lastRequestByHost = new Map<string, number>();

  for (const listing of listings) {
    if (signal?.aborted || Date.now() >= deadline) {
      stats.skippedForTime = listings.length - stats.checked;
      break;
    }

    const url = listing.listingUrl!;
    let host: string;
    try {
      host = new URL(url).hostname;
    } catch {
      await withRetry(() =>
        db.citationSubmission.update({
          where: { id: listing.id },
          data: { verifyStatus: 'unreachable', reasons: ['unparseable_listing_url'], lastCheckedAt: new Date() },
        })
      );
      stats.unreachable++;
      stats.checked++;
      continue;
    }

    const lastRequest = lastRequestByHost.get(host);
    if (lastRequest !== undefined) {
      const wait = PER_HOST_DELAY_MS - (Date.now() - lastRequest);
      if (wait > 0) await sleep(wait);
    }
    lastRequestByHost.set(host, Date.now());

    const canonical: NapRecord = {
      name: listing.profile.name,
      street: listing.profile.street,
      city: listing.profile.city,
      region: listing.profile.region,
      postalCode: listing.profile.postalCode,
      country: listing.profile.country,
      phone: listing.profile.phone,
      website: listing.profile.website,
    };

    const remaining = Math.max(3_000, Math.min(15_000, deadline - Date.now() - 2_000));
    const fetched = await fetchPage(url, { timeoutMs: remaining, signal });

    const result = verifyCitation({
      html: fetched.html ?? '',
      fetchedUrl: fetched.finalUrl,
      //  A bot wall is not evidence the listing is gone. Forcing 0 routes it
      //  down the `unreachable` path, same rule as link verification.
      statusCode: fetched.blocked ? 0 : fetched.statusCode,
      canonical,
    });

    const reasons = [...result.reasons];
    if (fetched.blocked) reasons.unshift('bot_challenge');
    else if (fetched.error) reasons.unshift(fetched.error);

    const now = new Date();
    const failures =
      result.status === 'unreachable' ? listing.consecutiveFailures + 1 : 0;

    //  Hold the previous verdict until we have failed enough times to believe
    //  the site rather than the network.
    const reportedStatus =
      result.status === 'unreachable' && failures < UNREACHABLE_BEFORE_REPORTING
        ? listing.verifyStatus ?? 'unreachable'
        : result.status;

    await withRetry(() =>
      db.citationSubmission.update({
        where: { id: listing.id },
        data: {
          verifyStatus: reportedStatus,
          verifyConfidence: result.confidence,
          napScore: result.comparison?.score ?? null,
          mismatches: result.comparison?.mismatches ?? [],
          missingFields: result.comparison?.missing ?? [],
          observed: Object.keys(result.observed).length > 0 ? (result.observed as any) : undefined,
          reasons,
          linksToSite: result.linksToSite,
          observedLinkType: result.linkType,
          lastCheckedAt: now,
          lastStatusCode: fetched.statusCode,
          consecutiveFailures: failures,
          //  A verified listing is live by definition; promote it so the queue
          //  stops showing it as merely submitted.
          ...(result.status === 'consistent' || result.status === 'inconsistent'
            ? { status: 'live' }
            : {}),
        },
      })
    );

    stats.checked++;

    switch (result.status) {
      case 'consistent':
        stats.consistent++;
        break;
      case 'inconsistent':
        stats.inconsistent++;
        stats.problems.push({
          directory: listing.directoryName,
          listingUrl: url,
          mismatches: result.comparison?.mismatches ?? [],
        });
        break;
      case 'unverified':
        stats.unverified++;
        break;
      case 'not_found':
        stats.notFound++;
        stats.problems.push({
          directory: listing.directoryName,
          listingUrl: url,
          mismatches: ['listing_not_found'],
        });
        break;
      default:
        stats.unreachable++;
    }
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}
