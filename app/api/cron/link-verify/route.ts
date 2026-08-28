import { NextRequest, NextResponse } from 'next/server';
import { runLinkVerification } from '@/lib/linkbuilding/verify-run';

export const maxDuration = 300;

/**
 * Weekly re-check of every tracked link placement.
 *
 * Schedule in vercel.json (currently `{}` — this is the first entry):
 *
 *   { "crons": [{ "path": "/api/cron/link-verify", "schedule": "0 6 * * 1" }] }
 *
 * Vercel sends CRON_SECRET as a bearer token, matching the other cron routes.
 * The budget is set below Vercel's 300s ceiling so the run finishes on its own
 * terms and writes its results, rather than being killed mid-batch.
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
