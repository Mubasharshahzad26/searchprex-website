// ═══════════════════════════════════════════════════════════
//  qualify-run.ts — scores discovered prospects
//
//  NOT PORTABLE. The judgement lives in ./core/qualify and
//  ./core/score; this file supplies the fetcher, the classifier
//  and the persistence.
//
//  Nothing here contacts anyone. A prospect that passes is marked
//  `qualified`, which is a candidate for a human to approve in
//  Phase 3 — not an instruction to send anything.
// ═══════════════════════════════════════════════════════════

import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from '@/lib/db';
import { withRetry } from '@/lib/db-retry';
import { fetchPage } from './core/fetch';
import { qualifyProspect } from './core/qualify';
import type { RawProspect } from './core/discovery/types';

/** Same model the content autopilot uses — cheap, and this is a judgement call. */
const MODEL = 'gemini-flash-lite-latest';

const DEFAULT_BUDGET_MS = 240_000;
const DEFAULT_MAX_PROSPECTS = 150;
const PER_HOST_DELAY_MS = 1_500;

/** Attempts before a prospect that never loads is parked. */
const UNREACHABLE_BEFORE_PARKING = 3;

export interface QualifyRunOptions {
  campaignId?: string;
  clientId?: string;
  /** Re-qualify prospects already assessed. */
  force?: boolean;
  maxProspects?: number;
  budgetMs?: number;
  /** Skip the LLM relevance call. Cheaper, and scores accordingly. */
  skipRelevance?: boolean;
  signal?: AbortSignal;
}

export interface QualifyRunStats {
  checked: number;
  qualified: number;
  rejected: number;
  unreachable: number;
  skippedForTime: number;
  relevanceCalls: number;
  elapsedMs: number;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Asks the model how closely a page's subject matches the campaign's.
 *
 * Returns null on anything unexpected. That is load-bearing: scoreProspect
 * records a null as a missing signal rather than scoring it, so a flaky or
 * unconfigured model lowers confidence instead of inventing relevance.
 */
function buildClassifier(topic: string, signal?: AbortSignal) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return undefined;

  const gemini = new GoogleGenerativeAI(apiKey);
  let calls = 0;

  const classify = async (input: {
    prospect: RawProspect;
    title: string | null;
    excerpt: string;
  }): Promise<number | null> => {
    if (signal?.aborted) return null;

    const model = gemini.getGenerativeModel({
      model: MODEL,
      generationConfig: {
        responseMimeType: 'application/json',
        maxOutputTokens: 120,
        temperature: 0,
      },
    });

    const prompt = [
      `Rate how topically relevant this website is to the subject "${topic}".`,
      '',
      'Relevance means a link from this site to a site about the subject would look',
      'natural to a reader — not whether the site is good, popular or well designed.',
      '',
      `Site: ${input.prospect.domain}`,
      `Title: ${input.title ?? '(none)'}`,
      `Page text: ${input.excerpt}`,
      '',
      'Respond with JSON only: {"relevance": <number between 0 and 1>}',
      '1.0 = same subject. 0.5 = adjacent or overlapping audience. 0.0 = unrelated.',
    ].join('\n');

    try {
      calls++;
      const result = await model.generateContent(prompt);
      const parsed = JSON.parse(result.response.text()) as { relevance?: unknown };
      const value = parsed.relevance;

      if (typeof value !== 'number' || !Number.isFinite(value)) return null;
      return Math.max(0, Math.min(1, value));
    } catch {
      return null;
    }
  };

  return { classify, callCount: () => calls };
}

export async function runLinkQualification(
  options: QualifyRunOptions = {}
): Promise<QualifyRunStats> {
  const {
    campaignId,
    clientId,
    force = false,
    maxProspects = DEFAULT_MAX_PROSPECTS,
    budgetMs = DEFAULT_BUDGET_MS,
    skipRelevance = false,
    signal,
  } = options;

  const startedAt = Date.now();
  const deadline = startedAt + budgetMs;

  const stats: QualifyRunStats = {
    checked: 0,
    qualified: 0,
    rejected: 0,
    unreachable: 0,
    skippedForTime: 0,
    relevanceCalls: 0,
    elapsedMs: 0,
  };

  const campaigns = await withRetry(() =>
    db.linkCampaign.findMany({
      where: {
        enabled: true,
        ...(campaignId ? { id: campaignId } : {}),
        ...(clientId ? { clientId } : {}),
      },
      select: { id: true, topic: true, targetDomain: true, competitors: true },
    })
  );

  const lastRequestByHost = new Map<string, number>();

  for (const campaign of campaigns) {
    if (signal?.aborted || Date.now() >= deadline) break;

    const prospects = await withRetry(() =>
      db.linkProspect.findMany({
        where: {
          campaignId: campaign.id,
          ...(force
            ? {}
            : {
                status: 'discovered',
                consecutiveFailures: { lt: UNREACHABLE_BEFORE_PARKING },
              }),
        },
        //  Rows carrying a provider metric first: they are the ones where a
        //  qualification verdict is most likely to be decisive.
        orderBy: [{ referringDomains: { sort: 'desc', nulls: 'last' } }, { discoveredAt: 'asc' }],
        take: maxProspects,
      })
    );

    //  One classifier per campaign — the topic is the same for every prospect
    //  in it, and rebuilding the client per row is waste.
    const classifier =
      skipRelevance || !campaign.topic ? undefined : buildClassifier(campaign.topic, signal);

    for (const prospect of prospects) {
      if (signal?.aborted || Date.now() >= deadline) {
        stats.skippedForTime += prospects.length - stats.checked;
        break;
      }

      const host = prospect.domain;
      const lastRequest = lastRequestByHost.get(host);
      if (lastRequest !== undefined) {
        const wait = PER_HOST_DELAY_MS - (Date.now() - lastRequest);
        if (wait > 0) await sleep(wait);
      }
      lastRequestByHost.set(host, Date.now());

      const raw: RawProspect = {
        url: prospect.url,
        domain: prospect.domain,
        source: prospect.source as RawProspect['source'],
        discoveredVia: prospect.discoveredVia,
        referringDomains: prospect.referringDomains ?? undefined,
        organicTraffic: prospect.organicTraffic ?? undefined,
        providerRank: prospect.providerRank ?? undefined,
        title: prospect.title ?? undefined,
      };

      const remaining = Math.max(3_000, Math.min(15_000, deadline - Date.now() - 2_000));
      const result = await qualifyProspect(raw, {
        fetcher: (url) => fetchPage(url, { timeoutMs: remaining, signal }),
        classifyRelevance: classifier?.classify,
        clientDomain: campaign.targetDomain,
        namedCompetitors: campaign.competitors,
        signal,
      });

      stats.checked++;

      if (result.outcome === 'unreachable') {
        const failures = prospect.consecutiveFailures + 1;
        await withRetry(() =>
          db.linkProspect.update({
            where: { id: prospect.id },
            data: {
              //  Parked, not rejected. A site behind a bot wall may be an
              //  excellent prospect; we simply cannot assess it automatically.
              status: failures >= UNREACHABLE_BEFORE_PARKING ? 'unreachable' : prospect.status,
              consecutiveFailures: failures,
              lastStatusCode: result.statusCode,
            },
          })
        );
        stats.unreachable++;
        continue;
      }

      const score = result.score!;
      const passed = score.passed && score.hardRejects.length === 0;

      await withRetry(() =>
        db.linkProspect.update({
          where: { id: prospect.id },
          data: {
            status: passed ? 'qualified' : 'rejected',
            qualityScore: score.score,
            hardRejects: score.hardRejects,
            scoreReasons: score.reasons,
            missingSignals: score.missingSignals,
            title: result.title ?? prospect.title,
            pageSignals: result.page ? (result.page as any) : undefined,
            lastStatusCode: result.statusCode,
            consecutiveFailures: 0,
            qualifiedAt: new Date(),
          },
        })
      );

      if (passed) stats.qualified++;
      else stats.rejected++;
    }

    if (classifier) stats.relevanceCalls += classifier.callCount();
  }

  stats.elapsedMs = Date.now() - startedAt;
  return stats;
}
