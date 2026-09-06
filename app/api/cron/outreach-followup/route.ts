import { NextRequest, NextResponse } from 'next/server';
import { runOutreachFollowUps } from '@/lib/linkbuilding/followup-run';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  if (auth === `Bearer ${process.env.CRON_SECRET}`) return true;

  const secret = req.nextUrl.searchParams.get('secret');
  if (secret && secret === process.env.CRON_SECRET) return true;

  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const clientId = params.get('clientId') ?? undefined;
  const campaignId = params.get('campaignId') ?? undefined;

  try {
    const stats = await runOutreachFollowUps({ clientId, campaignId });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[cron/outreach-followup] GET failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    // fallback to params
  }

  const clientId = (body.clientId as string) || req.nextUrl.searchParams.get('clientId') || undefined;
  const campaignId = (body.campaignId as string) || req.nextUrl.searchParams.get('campaignId') || undefined;

  try {
    const stats = await runOutreachFollowUps({ clientId, campaignId });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[cron/outreach-followup] POST failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
