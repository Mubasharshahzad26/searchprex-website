import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auditClientPortfolio } from '@/lib/linkbuilding/property-run';

export const maxDuration = 300;

/**
 * Audits every client's branded-property portfolio for network footprints.
 *
 * Read-only. There is deliberately no cron that publishes to properties: free
 * platforms have no useful publishing API, automated posting breaches their
 * terms, and a scheduler posting across eight properties builds exactly the
 * pattern auditFootprint exists to detect. Drafting is on demand; posting is a
 * person, spaced out.
 *
 * Monthly is the right cadence — a portfolio does not drift week to week.
 * Scheduled from cron-job.org with `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const clientIdParam = req.nextUrl.searchParams.get('clientId');

  try {
    const clients = clientIdParam
      ? [{ id: clientIdParam }]
      : await db.client.findMany({
          where: { brandProperties: { some: { status: { not: 'retired' } } } },
          select: { id: true },
        });

    const results = [];
    for (const client of clients) {
      const report = await auditClientPortfolio(client.id);
      results.push({
        clientId: client.id,
        score: report.score,
        propertyCount: report.propertyCount,
        capRemaining: report.capRemaining,
        //  Critical findings are the ones worth acting on this month; the rest
        //  are counted so a rising trend is still visible.
        critical: report.findings.filter((f) => f.severity === 'critical'),
        otherFindings: report.findings.filter((f) => f.severity !== 'critical').length,
      });
    }

    return NextResponse.json({ ok: true, audited: results.length, results });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[property-audit] run failed:', message);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
