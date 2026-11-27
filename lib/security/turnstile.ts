// lib/security/turnstile.ts
import {
  isTurnstileEnabled,
  verifyHumanCookieFromRequest,
} from "@/lib/security/human-cookie";

export interface TurnstileVerification {
  ok: boolean;
  enforced: boolean;
  error?: string;
}

export async function verifyTurnstileRawToken(
  token: string,
  remoteIp?: string
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true, enforced: false };
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token.trim(),
      ...(remoteIp && remoteIp !== "unknown" ? { remoteip: remoteIp } : {}),
    });

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    if (!res.ok) {
      return {
        ok: false,
        enforced: true,
        error: "Verification service unavailable. Please try again.",
      };
    }

    const data = (await res.json()) as { success?: boolean };
    if (!data.success) {
      return {
        ok: false,
        enforced: true,
        error: "Human verification failed. Please refresh and try again.",
      };
    }

    return { ok: true, enforced: true };
  } catch {
    return {
      ok: false,
      enforced: true,
      error: "Human verification check could not be completed.",
    };
  }
}

/**
 * Verify either an explicit Cloudflare Turnstile token OR a valid signed
 * `searchprex_human` HttpOnly session cookie when Turnstile is enabled.
 */
export async function verifyTurnstileIfConfigured(
  token: unknown,
  remoteIp?: string,
  req?: Request
): Promise<TurnstileVerification> {
  if (!isTurnstileEnabled()) {
    return { ok: true, enforced: false };
  }

  if (typeof token === "string" && token.trim()) {
    return verifyTurnstileRawToken(token, remoteIp);
  }

  if (req && verifyHumanCookieFromRequest(req)) {
    return { ok: true, enforced: true };
  }

  return {
    ok: false,
    enforced: true,
    error: "Human verification required. Please complete the verification check and retry.",
  };
}
