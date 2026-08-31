import { NextRequest, NextResponse } from 'next/server';
import { runLinkDiscovery } from '@/lib/linkbuilding/discover-run';

export const maxDuration = 300;

/**
 * Finds new link prospects for every enabled campaign.
 *
 * Scheduled from cron-job.org with `Authorization: Bearer <CRON_SECRET>`, like
 * the other routes here. Weekly is plenty — the set of sites covering a niche
 * does not turn over daily, and the paid channels bill per run.
 *
 * Writes prospects only. Nothing is contacted, and qualification is a separate
 * route so a discovery problem cannot silently spend LLM budget.
 *
 * `?only=link_neighbourhood` restricts to the free channel, which is the useful
 * mode while DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD are unset.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const onlyParam = params.get('only');

  const only = onlyParam
    ? (onlyParam
        .split(',')
        .map((s) => s.trim())
        .filter((s) =>
          ['backlink_gap', 'serp_footprint', 'link_neighbourhood'].includes(s)
        ) as Array<'backlink_gap' | 'serp_footprint' | 'link_neighbourhood'>)
    : undefined;

  const maxParam = Number(params.get('max'));

  try {
    const stats = await runLinkDiscovery({
      campaignId: params.get('campaignId') ?? undefined,
      clientId: params.get('clientId') ?? undefined,
      only,
      maxPerCampaign: Number.isFinite(maxParam) && maxParam > 0 ? maxParam : undefined,
    });

    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[link-discover] run failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
