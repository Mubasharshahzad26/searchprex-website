import { NextRequest, NextResponse, after } from 'next/server';
import { runAutopilotBatch } from '@/lib/autopilot/pipeline';
import { getMsoQuota } from '@/lib/autopilot/mso-daily-limit';
import { reclaimStaleProcessing } from '@/lib/autopilot/reclaim-stale';
import { acquireMsoLock, releaseMsoLock, msoLockHeldFor } from '@/lib/autopilot/mso-lock';
import { getPoolStatus } from '@/lib/gemini-pool';

//  Vercel's cron scheduler only fires once a day on the current plan, which
//  cannot feed a 1,000-page day. This endpoint is built for an external
//  minute-level scheduler (cron-jobs.org) instead: one small batch per call,
//  safe to hit as often as you like, because the shared daily cap and the
//  queue decide when there is nothing left to do.
//
//  It answers immediately and does the work in `after()`. A batch takes around
//  two and a half minutes and cron-jobs.org gives a request 30 seconds, so a
//  synchronous handler would be recorded as a failure on every single run —
//  and a job history that is always red tells you nothing when something is
//  actually wrong. Pass ?wait=1 to block and get the stats back, which is what
//  you want from curl.
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

const MSO_CLIENT_ID = process.env.MSO_CLIENT_ID ?? 'cmrcl8frg0000p8uruwv7j5qd';

function authorize(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  //  Header for Vercel Cron and curl; query string because some external
  //  schedulers only offer a plain URL.
  if (req.headers.get('authorization') === `Bearer ${secret}`) return true;
  return req.nextUrl.searchParams.get('key') === secret;
}

async function runBatch() {
  const reclaimed = await reclaimStaleProcessing(MSO_CLIENT_ID);
  const stats = await runAutopilotBatch(MSO_CLIENT_ID);
  return { reclaimed, stats };
}

async function handle(req: NextRequest) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const quota = await getMsoQuota();
  if (quota.limitReached) {
    return NextResponse.json({ ok: true, status: 'daily_limit_reached', quota });
  }

  if (!(await acquireMsoLock())) {
    return NextResponse.json({
      ok: true,
      status: 'already_running',
      lockExpiresInSec: await msoLockHeldFor(),
      quota,
    });
  }

  //  Synchronous mode, for a human running curl who wants the numbers.
  if (req.nextUrl.searchParams.get('wait') === '1') {
    try {
      const result = await runBatch();
      return NextResponse.json({
        ok: true,
        status: 'ran',
        ...result,
        quota: await getMsoQuota(),
        keyPool: await getPoolStatus(),
      });
    } catch (err) {
      return NextResponse.json({ ok: false, error: (err as Error).message, quota }, { status: 500 });
    } finally {
      await releaseMsoLock();
    }
  }

  after(async () => {
    try {
      const { reclaimed, stats } = await runBatch();
      console.log(`[mso-cron] Batch done. reclaimed=${reclaimed} stats=${JSON.stringify(stats)}`);
    } catch (err) {
      console.error('[mso-cron] Batch failed:', (err as Error).message);
    } finally {
      await releaseMsoLock();
    }
  });

  //  202: accepted and started, not finished. The scheduler gets its answer in
  //  well under a second; progress is read from /api/mso/status.
  return NextResponse.json({ ok: true, status: 'started', quota }, { status: 202 });
}

export const GET = handle;
export const POST = handle;
