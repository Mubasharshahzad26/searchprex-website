import { NextRequest, NextResponse } from 'next/server';
import { runLinkDiscovery } from '@/lib/linkbuilding/discover-run';
import { runLinkQualification } from '@/lib/linkbuilding/qualify-run';
import { runLinkVerification } from '@/lib/linkbuilding/verify-run';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (auth === `Bearer ${process.env.CRON_SECRET}`) return true;

  const secret = req.nextUrl.searchParams.get('secret');
  if (secret && secret === process.env.CRON_SECRET) return true;

  return false;
}

async function executePipeline(options: {
  clientId?: string;
  campaignId?: string;
  action?: 'discover' | 'qualify' | 'verify' | 'all';
}) {
  const { clientId, campaignId, action = 'all' } = options;
  const results: Record<string, unknown> = {
    startedAt: new Date().toISOString(),
    action,
    campaignId: campaignId ?? 'all',
    clientId: clientId ?? 'all',
  };

  // 1. Discovery
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
      budgetMs: 120_000,
    });
  }

  // 3. Verification
  if (action === 'all' || action === 'verify') {
    results.verification = await runLinkVerification({
      clientId,
      campaignId,
      budgetMs: 60_000,
    });
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
  const actionParam = params.get('action') as 'discover' | 'qualify' | 'verify' | 'all' | null;
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
  const action = (body.action as 'discover' | 'qualify' | 'verify' | 'all') || 'all';

  try {
    const stats = await executePipeline({ clientId, campaignId, action });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[backlinks-autopilot] POST failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
