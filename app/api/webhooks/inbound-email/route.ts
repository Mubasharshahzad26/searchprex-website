import { NextRequest, NextResponse } from 'next/server';
import { parseInboundReply } from '@/lib/linkbuilding/reply-parser';
import { verifyResendWebhook } from '@/lib/security/verify-resend-webhook';
import { isCronAuthorized } from '@/lib/auth/require-admin-or-cron';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    if (!verifyResendWebhook(req, rawBody) && !isCronAuthorized(req)) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    const parsed = JSON.parse(rawBody);
    // Resend email.received webhooks wrap payload inside `data`
    const payload = parsed?.data && typeof parsed.data === 'object' ? parsed.data : parsed;

    // Support standard Resend inbound webhook format and generic email formats
    const fromEmail =
      payload.from?.email ||
      payload.from ||
      payload.sender ||
      payload.envelope?.from ||
      '';
    const subject = payload.subject || '(no subject)';
    const bodyText =
      payload.text ||
      payload.body ||
      payload.html?.replace(/<[^>]+>/g, ' ') ||
      '';
    const threadId = payload.threadId || payload.metadata?.threadId || undefined;

    if (!fromEmail || !bodyText) {
      return NextResponse.json({ ok: false, error: 'missing from or body' }, { status: 400 });
    }

    const result = await parseInboundReply({
      threadId,
      fromEmail,
      subject,
      bodyText,
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[webhook/inbound-email] processing failed:', message);
    // Return 200 so webhook provider doesn't endlessly retry on business logic failures
    return NextResponse.json({ ok: false, error: message }, { status: 200 });
  }
}
