// ═══════════════════════════════════════════════════════════
//  dashboard-data.ts — everything the links dashboard renders
//
//  NOT PORTABLE. Prisma-bound.
//
//  One function, one round of queries, so the page is a single
//  await and the numbers on screen are all from the same instant.
//
//  Two rules this file exists to keep:
//
//   1. Citations are NEVER added to the link count. They are
//      counted separately and labelled as what they are. The
//      temptation to show one big "247 links" number is exactly
//      how a client ends up misled.
//
//   2. `unreachable` is reported apart from `lost`, and described
//      as "could not check" rather than as a problem. Merging the
//      two turns every Cloudflare wall into a false alarm.
//
//  Every query is wrapped: the database being unreachable must
//  degrade to a clear message, not a 500 that takes the whole
//  dashboard down. That is not hypothetical — Neon suspends the
//  compute endpoint when its quota is spent.
// ═══════════════════════════════════════════════════════════

import { db } from '@/lib/db';
import { MAX_PROPERTIES_PER_CLIENT } from './core/properties/policy';

export interface LinkKpis {
  /** Placements passing signal right now. The headline number. */
  live: number;
  /** Present but neutered — rel token or a page-level directive. */
  nofollowed: number;
  /** Present, but anchor or destination drifted. */
  changed: number;
  /** Confirmed gone: the page loaded and the link was not on it. */
  lost: number;
  /** The page itself 404s. */
  pageGone: number;
  /** We could not look. NOT a problem, and never counted as lost. */
  unreachable: number;
  /** Imported but never checked yet. */
  pending: number;
  total: number;
  /** Placements in an article body rather than a footer or nav. */
  inContent: number;
  /** Links lost in the last 30 days — the number worth acting on. */
  lostThisMonth: number;
}

export interface ProspectKpis {
  discovered: number;
  qualified: number;
  rejected: number;
  contacted: number;
  unreachable: number;
  noContact: number;
  /** Average score of qualified prospects, or null when there are none. */
  averageScore: number | null;
  /** Commonest hard rejects, so a bad discovery channel is visible. */
  topRejects: Array<{ reason: string; count: number }>;
}

export interface CitationKpis {
  queued: number;
  submitted: number;
  live: number;
  consistent: number;
  inconsistent: number;
  unverified: number;
  notFound: number;
  /** Average NAP score across verified listings. */
  averageNap: number | null;
  /** Citations that actually pass signal. Almost always a small number. */
  followableLinks: number;
  problems: Array<{ directory: string; listingUrl: string | null; mismatches: string[] }>;
}

export interface OutreachKpis {
  awaitingApproval: number;
  approved: number;
  sent: number;
  replied: number;
  /** Drafts the validator refused. High numbers mean the prompt needs work. */
  rejectedDrafts: number;
  suppressed: number;
  mailboxes: Array<{
    id: string;
    fromEmail: string;
    active: boolean;
    warmingUp: boolean;
    sentToday: number;
    dailyCap: number;
  }>;
}

export interface PropertyKpis {
  total: number;
  capRemaining: number;
  live: number;
  posts: number;
  /** Properties with no posts — liabilities carrying the brand's name. */
  empty: number;
}

export interface CampaignSummary {
  id: string;
  name: string;
  targetDomain: string;
  clientName: string;
  enabled: boolean;
  placements: number;
  prospects: number;
}

export interface RecentCheck {
  sourceUrl: string;
  targetUrl: string;
  status: string;
  linkType: string | null;
  region: string | null;
  anchor: string | null;
  reasons: string[];
  checkedAt: Date | null;
}

export interface DashboardData {
  /** Set when the database could not be reached. Everything else is empty. */
  dbError: string | null;
  campaigns: CampaignSummary[];
  links: LinkKpis;
  prospects: ProspectKpis;
  citations: CitationKpis;
  outreach: OutreachKpis;
  properties: PropertyKpis;
  recentChecks: RecentCheck[];
  /** Qualified prospects, best first — the outreach shortlist. */
  topProspects: Array<{
    domain: string;
    url: string;
    score: number | null;
    discoveredVia: string;
    missingSignals: string[];
  }>;
  /** Drafts a person needs to read. */
  approvalQueue: Array<{
    id: string;
    contactEmail: string;
    domain: string;
    subject: string;
    body: string;
    problems: string[];
  }>;
}

function emptyData(dbError: string | null): DashboardData {
  return {
    dbError,
    campaigns: [],
    links: {
      live: 0, nofollowed: 0, changed: 0, lost: 0, pageGone: 0,
      unreachable: 0, pending: 0, total: 0, inContent: 0, lostThisMonth: 0,
    },
    prospects: {
      discovered: 0, qualified: 0, rejected: 0, contacted: 0,
      unreachable: 0, noContact: 0, averageScore: null, topRejects: [],
    },
    citations: {
      queued: 0, submitted: 0, live: 0, consistent: 0, inconsistent: 0,
      unverified: 0, notFound: 0, averageNap: null, followableLinks: 0, problems: [],
    },
    outreach: {
      awaitingApproval: 0, approved: 0, sent: 0, replied: 0,
      rejectedDrafts: 0, suppressed: 0, mailboxes: [],
    },
    properties: { total: 0, capRemaining: MAX_PROPERTIES_PER_CLIENT, live: 0, posts: 0, empty: 0 },
    recentChecks: [],
    topProspects: [],
    approvalQueue: [],
  };
}

/** Turns a groupBy result into a plain lookup. */
function tally<T extends string>(
  rows: Array<{ _count: number } & Record<string, unknown>>,
  key: string
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const row of rows) {
    const value = row[key];
    if (typeof value === 'string') out[value] = row._count;
  }
  return out;
}

export async function getDashboardData(campaignId?: string): Promise<DashboardData> {
  try {
    const campaignFilter = campaignId ? { campaignId } : {};
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [
      campaignRows,
      placementStatus,
      inContent,
      lostThisMonth,
      prospectStatus,
      qualifiedAgg,
      rejectRows,
      citationRows,
      citationVerify,
      napAgg,
      followable,
      citationProblems,
      messageStatus,
      threadStatus,
      suppressionCount,
      mailboxRows,
      propertyRows,
      postCount,
      checks,
      topProspects,
      approvals,
    ] = await Promise.all([
      db.linkCampaign.findMany({
        include: {
          client: { select: { companyName: true } },
          _count: { select: { placements: true, prospects: true } },
        },
        orderBy: { createdAt: 'asc' },
      }),
      db.linkPlacement.groupBy({ by: ['status'], where: campaignFilter, _count: true }),
      db.linkPlacement.count({ where: { ...campaignFilter, region: 'content', status: 'live' } }),
      db.linkPlacement.count({ where: { ...campaignFilter, lostAt: { gte: monthAgo } } }),
      db.linkProspect.groupBy({ by: ['status'], where: campaignFilter, _count: true }),
      db.linkProspect.aggregate({
        where: { ...campaignFilter, status: 'qualified' },
        _avg: { qualityScore: true },
      }),
      db.linkProspect.findMany({
        where: { ...campaignFilter, hardRejects: { isEmpty: false } },
        select: { hardRejects: true },
        take: 500,
      }),
      db.citationSubmission.groupBy({ by: ['status'], _count: true }),
      db.citationSubmission.groupBy({ by: ['verifyStatus'], _count: true }),
      db.citationSubmission.aggregate({ _avg: { napScore: true } }),
      db.citationSubmission.count({ where: { observedLinkType: 'dofollow' } }),
      db.citationSubmission.findMany({
        where: { OR: [{ verifyStatus: 'inconsistent' }, { verifyStatus: 'not_found' }] },
        select: { directoryName: true, listingUrl: true, mismatches: true },
        take: 20,
      }),
      db.outreachMessage.groupBy({ by: ['status'], _count: true }),
      db.outreachThread.groupBy({ by: ['status'], _count: true }),
      db.outreachSuppression.count(),
      db.outreachMailbox.findMany({
        select: { id: true, fromEmail: true, active: true, warmingUp: true, sentToday: true, dailyCap: true },
      }),
      db.brandProperty.findMany({
        where: { status: { not: 'retired' } },
        select: { status: true, _count: { select: { posts: true } } },
      }),
      db.brandPropertyPost.count(),
      db.linkPlacement.findMany({
        where: { ...campaignFilter, lastCheckedAt: { not: null } },
        orderBy: { lastCheckedAt: 'desc' },
        take: 25,
        select: {
          sourceUrl: true, targetUrl: true, status: true, linkType: true,
          region: true, observedAnchor: true, lastReasons: true, lastCheckedAt: true,
        },
      }),
      db.linkProspect.findMany({
        where: { ...campaignFilter, status: 'qualified' },
        orderBy: { qualityScore: 'desc' },
        take: 25,
        select: { domain: true, url: true, qualityScore: true, discoveredVia: true, missingSignals: true },
      }),
      db.outreachMessage.findMany({
        where: { status: { in: ['draft', 'rejected'] } },
        orderBy: { createdAt: 'asc' },
        take: 20,
        select: {
          id: true, subject: true, body: true, validationProblems: true,
          thread: { select: { contactEmail: true, prospect: { select: { domain: true } } } },
        },
      }),
    ]);

    const placements = tally(placementStatus, 'status');
    const prospectCounts = tally(prospectStatus, 'status');
    const citationStatus = tally(citationRows, 'status');
    const verify = tally(citationVerify, 'verifyStatus');
    const messages = tally(messageStatus, 'status');
    const threads = tally(threadStatus, 'status');

    //  Counted across prospects rather than per row: one prospect rejected for
    //  three reasons should show under all three, since each is a real finding.
    const rejectTally = new Map<string, number>();
    for (const row of rejectRows) {
      for (const reason of row.hardRejects) {
        const key = reason.split(':')[0];
        rejectTally.set(key, (rejectTally.get(key) ?? 0) + 1);
      }
    }

    const propertyTotal = propertyRows.length;

    return {
      dbError: null,
      campaigns: campaignRows.map((c) => ({
        id: c.id,
        name: c.name,
        targetDomain: c.targetDomain,
        clientName: c.client.companyName,
        enabled: c.enabled,
        placements: c._count.placements,
        prospects: c._count.prospects,
      })),
      links: {
        live: placements.live ?? 0,
        nofollowed: placements.nofollowed ?? 0,
        changed: placements.changed ?? 0,
        lost: placements.lost ?? 0,
        pageGone: placements.page_gone ?? 0,
        unreachable: placements.unreachable ?? 0,
        pending: placements.pending ?? 0,
        total: Object.values(placements).reduce((a, b) => a + b, 0),
        inContent,
        lostThisMonth,
      },
      prospects: {
        discovered: prospectCounts.discovered ?? 0,
        qualified: prospectCounts.qualified ?? 0,
        rejected: prospectCounts.rejected ?? 0,
        contacted: prospectCounts.contacted ?? 0,
        unreachable: prospectCounts.unreachable ?? 0,
        noContact: prospectCounts.no_contact ?? 0,
        averageScore: qualifiedAgg._avg.qualityScore ?? null,
        topRejects: [...rejectTally.entries()]
          .map(([reason, count]) => ({ reason, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 6),
      },
      citations: {
        queued: citationStatus.queued ?? 0,
        submitted: citationStatus.submitted ?? 0,
        live: citationStatus.live ?? 0,
        consistent: verify.consistent ?? 0,
        inconsistent: verify.inconsistent ?? 0,
        unverified: verify.unverified ?? 0,
        notFound: verify.not_found ?? 0,
        averageNap: napAgg._avg.napScore ?? null,
        followableLinks: followable,
        problems: citationProblems.map((p) => ({
          directory: p.directoryName,
          listingUrl: p.listingUrl,
          mismatches: p.mismatches,
        })),
      },
      outreach: {
        awaitingApproval: messages.draft ?? 0,
        approved: messages.approved ?? 0,
        sent: messages.sent ?? 0,
        replied: threads.replied ?? 0,
        rejectedDrafts: messages.rejected ?? 0,
        suppressed: suppressionCount,
        mailboxes: mailboxRows,
      },
      properties: {
        total: propertyTotal,
        capRemaining: Math.max(0, MAX_PROPERTIES_PER_CLIENT - propertyTotal),
        live: propertyRows.filter((p) => p.status === 'live').length,
        posts: postCount,
        empty: propertyRows.filter((p) => p._count.posts === 0).length,
      },
      recentChecks: checks.map((c) => ({
        sourceUrl: c.sourceUrl,
        targetUrl: c.targetUrl,
        status: c.status,
        linkType: c.linkType,
        region: c.region,
        anchor: c.observedAnchor,
        reasons: c.lastReasons,
        checkedAt: c.lastCheckedAt,
      })),
      topProspects: topProspects.map((p) => ({
        domain: p.domain,
        url: p.url,
        score: p.qualityScore,
        discoveredVia: p.discoveredVia,
        missingSignals: p.missingSignals,
      })),
      approvalQueue: approvals.map((m) => ({
        id: m.id,
        contactEmail: m.thread.contactEmail,
        domain: m.thread.prospect.domain,
        subject: m.subject,
        body: m.body,
        problems: m.validationProblems,
      })),
    };
  } catch (err) {
    //  A dashboard that 500s tells you nothing. One that says "the database is
    //  unreachable, here is the error" tells you exactly what to fix — and the
    //  Neon compute quota makes this a real state, not a theoretical one.
    const message = err instanceof Error ? err.message : String(err);
    console.error('[links-dashboard] query failed:', message);
    return emptyData(message.slice(0, 300));
  }
}
