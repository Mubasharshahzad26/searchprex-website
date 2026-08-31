import { NextRequest, NextResponse } from 'next/server';
import { runLinkVerification } from '@/lib/linkbuilding/verify-run';

export const maxDuration = 300;

/**
 * Weekly re-check of every tracked link placement.
 *
 * Scheduled from cron-job.org like the other routes in this directory, NOT
 * from vercel.json — that file is `{}` deliberately. Add a job hitting
 * https://www.searchprex.com/api/cron/link-verify weekly with the header
 * `Authorization: Bearer <CRON_SECRET>`.
 *
 * The budget is set below Vercel's 300s ceiling so the run stops on its own
 * terms and writes what it has, rather than being killed mid-batch. A weekly
 * cadence matches the default verifyIntervalDays on LinkCampaign; running it
 * more often is harmless, since placements that are not yet due are skipped.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const clientId = params.get('clientId') ?? undefined;
  const campaignId = params.get('campaignId') ?? undefined;
  const force = params.get('force') === '1';

  const maxParam = Number(params.get('max'));
  const maxPlacements = Number.isFinite(maxParam) && maxParam > 0 ? maxParam : undefined;

  try {
    const stats = await runLinkVerification({
      clientId,
      campaignId,
      force,
      maxPlacements,
      budgetMs: 240_000,
    });

    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[link-verify] run failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
