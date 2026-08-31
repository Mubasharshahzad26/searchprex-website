import { NextRequest, NextResponse } from 'next/server';
import { runCitationVerification } from '@/lib/linkbuilding/citation-run';

export const maxDuration = 300;

/**
 * Weekly NAP consistency check across every live directory listing.
 *
 * Scheduled from cron-job.org with `Authorization: Bearer <CRON_SECRET>`.
 *
 * Read-only against the directories: it fetches listings and compares them
 * against BusinessProfile. It submits nothing and edits nothing on any
 * third-party site.
 *
 * Only listings with a listingUrl and status submitted/live are checked — a
 * queued row has nothing to look at yet.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const maxParam = Number(params.get('max'));

  try {
    const stats = await runCitationVerification({
      clientId: params.get('clientId') ?? undefined,
      profileId: params.get('profileId') ?? undefined,
      force: params.get('force') === '1',
      maxListings: Number.isFinite(maxParam) && maxParam > 0 ? maxParam : undefined,
      budgetMs: 240_000,
    });

    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[citation-verify] run failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
