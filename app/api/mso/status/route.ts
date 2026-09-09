import { NextRequest, NextResponse } from 'next/server';
import { getPoolStatus } from '@/lib/gemini-pool';
import { getMsoQuota, setMsoDailyLimit } from '@/lib/autopilot/mso-daily-limit';
import { msoLockHeldFor } from '@/lib/autopilot/mso-lock';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

const MSO_CLIENT_ID = process.env.MSO_CLIENT_ID ?? 'cmrcl8frg0000p8uruwv7j5qd';

function authorize(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return (
    req.headers.get('authorization') === `Bearer ${secret}` ||
    req.nextUrl.searchParams.get('key') === secret
  );
}

/** Key pool health, today's shared quota, and whether the autopilot is armed. */
export async function GET(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const [keyPool, quota, config, lockHeldFor] = await Promise.all([
    getPoolStatus(),
    getMsoQuota(),
    db.autopilotConfig.findUnique({ where: { clientId: MSO_CLIENT_ID } }),
    msoLockHeldFor(),
  ]);

  return NextResponse.json({
    ok: true,
    engine: 'searchprex',
    //  Non-zero means a batch is in flight. The cron endpoint answers before
    //  its batch finishes, so this is how you tell "running" from "idle".
    batchRunning: lockHeldFor > 0,
    lockExpiresInSec: lockHeldFor,
    autopilot: config
      ? {
          enabled: config.enabled,
          dryRunMode: config.dryRunMode,
          maxPagesPerRun: config.maxPagesPerRun,
        }
      : null,
    quota,
    keyPool,
  });
}

/** Sets the shared daily cap that both engines read. */
export async function POST(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const limit = Number(body?.limit);
  if (!Number.isFinite(limit) || limit < 1) {
    return NextResponse.json({ error: 'limit must be a positive number' }, { status: 400 });
  }

  const applied = await setMsoDailyLimit(limit);
  return NextResponse.json({ ok: true, limit: applied, quota: await getMsoQuota() });
}
