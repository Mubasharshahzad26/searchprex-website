import { NextRequest, NextResponse } from 'next/server';
import { runOutreachPreparation } from '@/lib/linkbuilding/outreach-prepare';

export const maxDuration = 300;

/**
 * Finds contacts for qualified prospects and writes drafts for approval.
 *
 * SENDS NOTHING. Every draft lands as an OutreachMessage awaiting a person's
 * approval, and sending is a separate operation in outreach-send.ts.
 *
 * There is deliberately NO cron route for sending. A scheduled sender would
 * mail strangers with nobody watching, on a domain that has not been warmed,
 * and the first sign of trouble would be a blocklisting. Sending is run by hand
 * from scripts/outreach.ts until a dedicated, warmed outreach domain is in
 * place — at which point a send route is a small addition, made deliberately.
 *
 * Scheduled from cron-job.org with `Authorization: Bearer <CRON_SECRET>`.
 * Requires ?mailboxId=<id> so drafts carry a real sender identity.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  let mailboxId = params.get('mailboxId');

  if (!mailboxId) {
    const firstMailbox = await db.outreachMailbox.findFirst();
    if (firstMailbox) {
      mailboxId = firstMailbox.id;
    } else {
      return NextResponse.json(
        { ok: false, error: 'No mailbox found. Create one in the database first.' },
        { status: 400 }
      );
    }
  }

  const maxParam = parseInt(params.get('max') ?? '', 10);
  const angleParam = params.get('angle');
  const angles = ['resource_page', 'broken_link', 'unlinked_mention', 'roundup'];

  try {
    const stats = await runOutreachPreparation({
      mailboxId,
      campaignId: params.get('campaignId') ?? undefined,
      clientId: params.get('clientId') ?? undefined,
      angle: angleParam && angles.includes(angleParam) ? (angleParam as any) : undefined,
      maxProspects: Number.isFinite(maxParam) && maxParam > 0 ? maxParam : undefined,
      budgetMs: 240_000,
    });

    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[outreach-prepare] run failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
