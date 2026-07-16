import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { runAutopilotBatch } from '@/lib/autopilot/pipeline';

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const clientIdParam = req.nextUrl.searchParams.get('clientId');

  const clients = clientIdParam
    ? [{ id: clientIdParam }]
    : await db.client.findMany({
        where: { autopilotConfig: { enabled: true } },
        select: { id: true },
      });

  const results = [];
  for (const c of clients) {
    try {
      const stats = await runAutopilotBatch(c.id);
      results.push({ clientId: c.id, ok: true, stats });
    } catch (err) {
      results.push({
        clientId: c.id,
        ok: false,
        error: (err as Error).message,
      });
    }
  }

  return NextResponse.json({ ok: true, results });
}