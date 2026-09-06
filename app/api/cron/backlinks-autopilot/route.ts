import { NextRequest, NextResponse } from 'next/server';
import { runLinkDiscovery } from '@/lib/linkbuilding/discover-run';
import { runLinkQualification } from '@/lib/linkbuilding/qualify-run';
import { runLinkVerification } from '@/lib/linkbuilding/verify-run';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

/**
 * Backlinks Autopilot Cron:
 * Runs the complete automated link pipeline:
 * 1. Discover new backlink prospects across enabled campaigns (SERP Footprints via Serper, Link Neighbourhood).
 * 2. Qualify new prospects using Gemini AI relevance scoring & authority checks.
 * 3. Verify live placements (monitors dofollow, status changes, lost links).
 *
 * Can be triggered via Vercel Cron or external schedulers (cron-job.org)
 * with Authorization: Bearer <CRON_SECRET>.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const clientId = params.get('clientId') ?? undefined;
  const campaignId = params.get('campaignId') ?? undefined;

  const results: Record<string, unknown> = {
    startedAt: new Date().toISOString(),
  };

  try {
    // 1. Link Discovery
    const discoveryStats = await runLinkDiscovery({
      clientId,
      campaignId,
      maxPerCampaign: 25,
    });
    results.discovery = discoveryStats;

    // 2. Link Qualification with Gemini AI
    const qualifyStats = await runLinkQualification({
      clientId,
      campaignId,
      maxProspects: 50,
      budgetMs: 120_000,
    });
    results.qualification = qualifyStats;

    // 3. Link Verification on live placements
    const verifyStats = await runLinkVerification({
      clientId,
      campaignId,
      budgetMs: 60_000,
    });
    results.verification = verifyStats;

    return NextResponse.json({
      ok: true,
      ...results,
      completedAt: new Date().toISOString(),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[backlinks-autopilot] execution failed:', message);
    return NextResponse.json(
      { ok: false, error: message, partialResults: results },
      { status: 500 }
    );
  }
}
