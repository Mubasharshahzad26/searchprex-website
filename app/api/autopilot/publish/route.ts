import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { publishPage } from '@/lib/publisher';
 
// Inline publish path calls WordPress REST API — needs generous timeout.
// Vercel Pro allows up to 300s; adjust down if plan changes.
export const maxDuration = 300;
 
function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}
 
// ─────────────────────────────────────────────────────────────
// GET → list pages by status (default: pending)
// Widget: PendingReview → "Load Pending"
// ─────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const status = req.nextUrl.searchParams.get('status') || 'pending';
  const pages = await db.autopilotPage.findMany({
    where: { status },
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      run: { select: { id: true, clientId: true, startedAt: true, dryRun: true } },
    },
  });
  return NextResponse.json({ count: pages.length, pages });
}
 
// ─────────────────────────────────────────────────────────────
// POST → approve / reject a page, optionally publish inline
//
// Body shapes:
//   { pageId, action: "reject" }
//     → status = rejected
//
//   { pageId, action: "approve" }
//     → status = approved (Approve only — no publish, no schedule)
//
//   { pageId, action: "approve", publishNow: true }
//     → status = approved, publishAt = now, publishPage() called INLINE
//     → If run.dryRun=true: DB updated but publish skipped with clear message
//     → If WordPress fails: 207 multi-status returned, cron can retry later
//
//   { pageId, action: "approve", publishInDays: N }
//     → status = approved, publishAt = now + N days (cron picks it up later)
// ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
 
  try {
    const { pageId, action, publishNow, publishInDays } = await req.json();
 
    if (!pageId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'pageId required, action must be approve or reject' },
        { status: 400 }
      );
    }
 
    // ── REJECT path: simple status update, no publish concerns ──
    if (action === 'reject') {
      const page = await db.autopilotPage.update({
        where: { id: pageId },
        data: { status: 'rejected' },
      });
      return NextResponse.json({ success: true, action: 'rejected', page });
    }
 
    // ── APPROVE path ──
    // Decide publishAt based on which flag came in
    let publishAt: Date | null = null;
    if (publishNow === true) {
      publishAt = new Date();
    } else if (typeof publishInDays === 'number' && publishInDays > 0) {
      publishAt = new Date(Date.now() + publishInDays * 24 * 60 * 60 * 1000);
    }
    // else: "approve_only" → publishAt stays null, no scheduling
 
    // Update DB (also fetch run.dryRun so we can guard the inline publish)
    const page = await db.autopilotPage.update({
      where: { id: pageId },
      data: {
        status: 'approved',
        publishAt,
      },
      include: {
        run: { select: { id: true, dryRun: true } },
      },
    });
 
    // ── Inline publish only fires when publishNow === true ──
    if (publishNow === true) {
      // Guard 1: dry-run mode — approve karo but WordPress hit mat karo
      if (page.run.dryRun) {
        return NextResponse.json({
          success: true,
          action: 'approved',
          publishSkipped: 'dry_run',
          message:
            'Page approved but publish skipped — this pipeline run is in dry-run mode. Trigger a real (dryRun=false) pipeline run to enable direct publishing.',
          page,
        });
      }
 
      // Guard 2: real publish path — call publisher helper directly (no HTTP hop)
      try {
        const publishResult = await publishPage(pageId);
        return NextResponse.json({
          success: true,
          action: 'approved_and_published',
          publish: publishResult,
          page,
        });
      } catch (publishErr) {
        // DB is still approved with publishAt=now, so publish cron will retry later.
        // Return 207 Multi-Status so the frontend can distinguish partial success.
        return NextResponse.json(
          {
            success: true,
            action: 'approved_publish_failed',
            publishError:
              publishErr instanceof Error ? publishErr.message : 'unknown publish error',
            message:
              'Page approved but WordPress publish failed. It will be retried by the publish cron, or you can retry manually.',
            page,
          },
          { status: 207 }
        );
      }
    }
 
    // ── Non-immediate paths (approve_only or scheduled future publish) ──
    return NextResponse.json({
      success: true,
      action: publishAt ? 'approved_scheduled' : 'approved',
      publishAt,
      page,
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Update failed' },
      { status: 500 }
    );
  }
}
 