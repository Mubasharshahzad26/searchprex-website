import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

// GET → list pages by status (default: pending)
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

// POST → { pageId, action: "approve" | "reject" }
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { pageId, action } = await req.json();
    if (!pageId || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'pageId required, action must be approve or reject' },
        { status: 400 }
      );
    }
    const page = await db.autopilotPage.update({
      where: { id: pageId },
      data: { status: action === 'approve' ? 'approved' : 'rejected' },
    });
    return NextResponse.json({ success: true, page });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Update failed' },
      { status: 500 }
    );
  }
}