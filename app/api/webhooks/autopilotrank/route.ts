import { NextRequest, NextResponse } from 'next/server';
import {
  verifyAutopilotRankSignature,
  AutopilotRankPayloadSchema,
  handleAutopilotRankWebhook,
} from '@/lib/autopilotrank/webhook';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let rawBody: string;

  try {
    rawBody = await req.text();
  } catch (err: any) {
    console.error('[autopilotrank-webhook] Error reading request body:', err.message);
    return NextResponse.json(
      { ok: false, error: 'Failed to read request body' },
      { status: 400 }
    );
  }

  // 1. Signature Verification
  const webhookSecret =
    process.env.AUTOPILOTRANK_WEBHOOK_SECRET || process.env.AUTOPILOT_WEBHOOK_SECRET;
  const signatureHeader = req.headers.get('x-signature-256');

  if (webhookSecret) {
    const isValid = verifyAutopilotRankSignature(rawBody, signatureHeader, webhookSecret);
    if (!isValid) {
      console.warn(
        `[autopilotrank-webhook] Unauthorized: Invalid or missing X-Signature-256. (Header present: ${!!signatureHeader})`
      );
      return NextResponse.json(
        { ok: false, error: 'Invalid or missing signature' },
        { status: 401 }
      );
    }
  } else {
    // Secret not configured: allow requests (useful for local development or initial connection test)
    console.info(
      '[autopilotrank-webhook] Notice: AUTOPILOTRANK_WEBHOOK_SECRET is not configured in environment. HMAC check skipped.'
    );
  }

  // 2. Parse JSON
  let jsonPayload: any;
  try {
    jsonPayload = JSON.parse(rawBody);
  } catch (err: any) {
    console.error('[autopilotrank-webhook] Malformed JSON:', err.message);
    return NextResponse.json(
      { ok: false, error: 'Malformed JSON payload' },
      { status: 400 }
    );
  }

  // 3. Schema Validation
  const validation = AutopilotRankPayloadSchema.safeParse(jsonPayload);
  if (!validation.success) {
    const issues = validation.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`);
    console.warn('[autopilotrank-webhook] Validation failure:', issues);
    return NextResponse.json(
      {
        ok: false,
        error: 'Missing or invalid required payload fields',
        details: issues,
      },
      { status: 400 }
    );
  }

  const payload = validation.data;

  // 4. Process Webhook
  try {
    const result = await handleAutopilotRankWebhook(payload);
    const duration = Date.now() - startTime;

    console.log(
      `[autopilotrank-webhook] Completed ${payload.event} (test=${payload.test}) - Action: ${result.action} in ${duration}ms`
    );

    return NextResponse.json(
      {
        ok: result.ok,
        action: result.action,
        message: result.message,
        id: result.id,
        slug: result.slug,
        error: result.error,
        details: result.details,
      },
      { status: result.statusCode }
    );
  } catch (err: any) {
    const duration = Date.now() - startTime;
    console.error(`[autopilotrank-webhook] Unhandled processing failure in ${duration}ms:`, err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error processing publishing webhook',
        message: err.message,
      },
      { status: 500 }
    );
  }
}
