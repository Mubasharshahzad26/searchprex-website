// app/api/security/verify-human/route.ts
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp, rateLimitExceededResponse } from "@/lib/security/rate-limit";
import {
  createHumanCookieValue,
  HUMAN_COOKIE_MAX_AGE_SECONDS,
  HUMAN_COOKIE_NAME,
  isTurnstileEnabled,
} from "@/lib/security/human-cookie";
import { verifyTurnstileRawToken } from "@/lib/security/turnstile";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip = getClientIp(req.headers);
  const rl = checkRateLimit(`verify-human:${ip}`, 20, 10 * 60 * 1000);
  if (!rl.allowed) {
    return rateLimitExceededResponse(rl.retryAfterSeconds);
  }

  if (!isTurnstileEnabled()) {
    return NextResponse.json({ ok: true, enforced: false });
  }

  let body: { token?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  if (typeof body.token !== "string" || !body.token.trim()) {
    return NextResponse.json({ ok: false, error: "Verification token required" }, { status: 400 });
  }

  const result = await verifyTurnstileRawToken(body.token, ip);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 403 });
  }

  const cookieVal = createHumanCookieValue(req.headers.get("user-agent") || "");
  if (!cookieVal) {
    return NextResponse.json({ ok: false, error: "Verification unavailable" }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true, enforced: true });
  res.cookies.set(HUMAN_COOKIE_NAME, cookieVal, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: HUMAN_COOKIE_MAX_AGE_SECONDS,
  });
  return res;
}
