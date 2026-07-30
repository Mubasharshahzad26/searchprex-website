import { NextRequest, NextResponse } from 'next/server';
import { runBlogPipeline } from '@/lib/autopilot/blog-pipeline';

const MSO_CLIENT_ID = 'cmrcl8frg0000p8uruwv7j5qd';
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const providedSecret = authHeader?.replace('Bearer ', '').trim();
  
  if (!CRON_SECRET || providedSecret !== CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const clientId = req.nextUrl.searchParams.get('clientId') ?? MSO_CLIENT_ID;
  const categoryOverride = req.nextUrl.searchParams.get('category') as
    | 'comparison'
    | 'buying-guide'
    | 'educational'
    | 'roundup'
    | null;
  const dryRun = req.nextUrl.searchParams.get('dryRun') === 'true';
  
  try {
    const result = await runBlogPipeline(clientId, {
      categoryOverride: categoryOverride ?? undefined,
      dryRun,
    });
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[blog-cron] Error:', err);
    return NextResponse.json({ 
      error: (err as Error).message,
      stack: (err as Error).stack?.slice(0, 500),
    }, { status: 500 });
  }
}