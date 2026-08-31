import { NextRequest, NextResponse } from 'next/server';
import { runLinkQualification } from '@/lib/linkbuilding/qualify-run';

export const maxDuration = 300;

/**
 * Fetches and scores prospects sitting at `discovered`.
 *
 * Scheduled from cron-job.org with `Authorization: Bearer <CRON_SECRET>`.
 * Daily suits it: discovery runs weekly but leaves a backlog larger than one
 * 300-second window, and this route is safe to run as often as you like — it
 * only picks up rows that have not been assessed.
 *
 * Contacts nobody. A prospect that passes becomes `qualified`, which is a
 * candidate for human approval in Phase 3.
 *
 * `?skipRelevance=1` runs without the Gemini call — cheaper, and the resulting
 * scores say so via missingSignals rather than pretending to a judgement.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const maxParam = Number(params.get('max'));

  try {
    const stats = await runLinkQualification({
      campaignId: params.get('campaignId') ?? undefined,
      clientId: params.get('clientId') ?? undefined,
      force: params.get('force') === '1',
      skipRelevance: params.get('skipRelevance') === '1',
      maxProspects: Number.isFinite(maxParam) && maxParam > 0 ? maxParam : undefined,
      budgetMs: 240_000,
    });

    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[link-qualify] run failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
