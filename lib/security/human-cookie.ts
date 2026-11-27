// lib/security/human-cookie.ts
import { createHmac, timingSafeEqual } from "node:crypto";

export const HUMAN_COOKIE_NAME = "searchprex_human";
export const HUMAN_COOKIE_MAX_AGE_SECONDS = 2 * 60 * 60; // 2 hours

/**
 * Turnstile enforcement requires BOTH keys to be present so setting one key
 * prematurely cannot accidentally block live forms without a rendered widget.
 */
export function isTurnstileEnabled(): boolean {
  return Boolean(
    process.env.TURNSTILE_SECRET_KEY?.trim() &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim()
  );
}

function getSigningSecret(): string | null {
  return process.env.TURNSTILE_SECRET_KEY?.trim() || null;
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret)
    .update(`searchprex-human-v1:${payload}`)
    .digest("hex");
}

export function createHumanCookieValue(userAgent = ""): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const expiresAt = Math.floor(Date.now() / 1000) + HUMAN_COOKIE_MAX_AGE_SECONDS;
  const uaTag = createHmac("sha256", secret)
    .update(userAgent)
    .digest("hex")
    .slice(0, 12);
  const payload = `${expiresAt}.${uaTag}`;
  const sig = signPayload(payload, secret);
  return `${payload}.${sig}`;
}

function parseCookieHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const k = part.slice(0, idx).trim();
    if (k === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

export function verifyHumanCookieFromRequest(req: Request): boolean {
  const secret = getSigningSecret();
  if (!secret) return false;

  const token = parseCookieHeader(req.headers.get("cookie"), HUMAN_COOKIE_NAME);
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expStr, uaTag, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp <= Math.floor(Date.now() / 1000)) {
    return false;
  }

  const ua = req.headers.get("user-agent") || "";
  const expectedUaTag = createHmac("sha256", secret)
    .update(ua)
    .digest("hex")
    .slice(0, 12);
  if (uaTag !== expectedUaTag) {
    return false;
  }

  const expectedSig = signPayload(`${expStr}.${uaTag}`, secret);
  const a = Buffer.from(sig, "utf8");
  const b = Buffer.from(expectedSig, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
