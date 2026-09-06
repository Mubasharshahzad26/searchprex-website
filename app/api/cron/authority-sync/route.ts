import { NextRequest, NextResponse } from 'next/server';
import { syncAuthority } from '@/lib/linkbuilding/authority-tracker';

export const maxDuration = 60;
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

  const campaignId = req.nextUrl.searchParams.get('campaignId') ?? undefined;
  const clientId = req.nextUrl.searchParams.get('clientId') ?? undefined;

  try {
    const stats = await syncAuthority({ campaignId, clientId });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[cron/authority-sync] failed:', message);
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
    // fallback
  }

  const campaignId = (body.campaignId as string) || req.nextUrl.searchParams.get('campaignId') || undefined;
  const clientId = (body.clientId as string) || req.nextUrl.searchParams.get('clientId') || undefined;

  try {
    const stats = await syncAuthority({ campaignId, clientId });
    return NextResponse.json({ ok: true, ...stats });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[cron/authority-sync] POST failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
