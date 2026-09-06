import { NextRequest, NextResponse } from 'next/server';
import { runLinkDiscovery } from '@/lib/linkbuilding/discover-run';
import { runLinkQualification } from '@/lib/linkbuilding/qualify-run';
import { runLinkVerification } from '@/lib/linkbuilding/verify-run';
import { runOutreachFollowUps } from '@/lib/linkbuilding/followup-run';
import { runAutoPublish } from '@/lib/linkbuilding/auto-publish';
import { syncAuthority } from '@/lib/linkbuilding/authority-tracker';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (auth === `Bearer ${process.env.CRON_SECRET}`) return true;

  const secret = req.nextUrl.searchParams.get('secret');
  if (secret && secret === process.env.CRON_SECRET) return true;

  return false;
}

export type PipelineAction =
  | 'discover'
  | 'qualify'
  | 'verify'
  | 'followup'
  | 'autopublish'
  | 'authority'
  | 'all';

async function executePipeline(options: {
  clientId?: string;
  campaignId?: string;
  action?: PipelineAction;
}) {
  const { clientId, campaignId, action = 'all' } = options;
  const results: Record<string, unknown> = {
    startedAt: new Date().toISOString(),
    action,
    campaignId: campaignId ?? 'all',
    clientId: clientId ?? 'all',
  };

  // 1. Discovery (including Competitor Broken Links)
  if (action === 'all' || action === 'discover') {
    results.discovery = await runLinkDiscovery({
      clientId,
      campaignId,
      maxPerCampaign: 40,
    });
  }

  // 2. AI Qualification
  if (action === 'all' || action === 'qualify') {
    results.qualification = await runLinkQualification({
      clientId,
      campaignId,
      maxProspects: 60,
      budgetMs: 90_000,
    });
  }

  // 3. Headless Auto-Publish (Telegra.ph & Dev.to)
  if (action === 'all' || action === 'autopublish') {
    try {
      results.autoPublish = await runAutoPublish({
        clientId,
        maxPosts: 5,
      });
    } catch (err) {
      results.autoPublishError = String(err);
    }
  }

  // 4. Automated Outreach Follow-ups
  if (action === 'all' || action === 'followup') {
    try {
      results.followUps = await runOutreachFollowUps({
        clientId,
        campaignId,
        budgetMs: 60_000,
      });
    } catch (err) {
      results.followUpsError = String(err);
    }
  }

  // 5. Verification
  if (action === 'all' || action === 'verify') {
    results.verification = await runLinkVerification({
      clientId,
      campaignId,
      budgetMs: 60_000,
    });
  }

  // 6. Authority Metrics Sync
  if (action === 'all' || action === 'authority') {
    try {
      results.authoritySync = await syncAuthority({
        clientId,
        campaignId,
      });
    } catch (err) {
      results.authoritySyncError = String(err);
    }
  }

  results.completedAt = new Date().toISOString();
  return results;
}

/**
 * GET — Triggered daily by Vercel Cron or cron-job.org
 */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const clientId = params.get('clientId') ?? undefined;
  const campaignId = params.get('campaignId') ?? undefined;
  const actionParam = params.get('action') as PipelineAction | null;
  const action = actionParam ?? 'all';

  try {
    const stats = await executePipeline({ clientId, campaignId, action });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[backlinks-autopilot] execution failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

/**
 * POST — On-demand execution from the Dashboard UI or API
 */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // query params fallback
  }

  const clientId = (body.clientId as string) || req.nextUrl.searchParams.get('clientId') || undefined;
  const campaignId = (body.campaignId as string) || req.nextUrl.searchParams.get('campaignId') || undefined;
  const action = (body.action as PipelineAction) || 'all';

  try {
    const stats = await executePipeline({ clientId, campaignId, action });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[backlinks-autopilot] POST failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
