// lib/security/public-route-guard.ts
import { NextResponse } from "next/server";
import {
  checkRateLimit,
  getClientIp,
  rateLimitExceededResponse,
} from "@/lib/security/rate-limit";
import { verifyTurnstileIfConfigured } from "@/lib/security/turnstile";

export interface PublicGuardOptions {
  bucket: string;
  limit: number;
  windowMs: number;
  turnstileToken?: unknown;
}

/**
 * Applies per-IP rate limiting and Cloudflare Turnstile verification
 * (accepting a solved token or verified human cookie once keys are set).
 * Returns `null` when allowed, or a 429/403 NextResponse.
 */
export async function guardPublicPost(
  req: Request,
  opts: PublicGuardOptions
): Promise<NextResponse | null> {
  const ip = getClientIp(req.headers);
  const rl = checkRateLimit(`${opts.bucket}:${ip}`, opts.limit, opts.windowMs);
  if (!rl.allowed) {
    return rateLimitExceededResponse(rl.retryAfterSeconds);
  }

  const turnstile = await verifyTurnstileIfConfigured(opts.turnstileToken, ip, req);
  if (!turnstile.ok) {
    return NextResponse.json(
      { ok: false, error: turnstile.error || "Human verification failed." },
      { status: 403 }
    );
  }

  return null;
}
