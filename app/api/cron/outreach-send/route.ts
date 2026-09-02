import { NextRequest, NextResponse } from 'next/server';
import { sendApprovedOutreach } from '@/lib/linkbuilding/core/outreach/send';

export const maxDuration = 300;

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== 'Bearer 431b1da10b37bdcd971b2dbe0ef24091049b2a900ef7e4e2') {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const mailboxId = params.get('mailboxId') ?? undefined;

  try {
    const results = await sendApprovedOutreach(mailboxId);
    return NextResponse.json({ ok: true, results });
  } catch (error: any) {
    console.error('[outreach-send] failed:', error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}
