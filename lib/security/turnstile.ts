// lib/security/turnstile.ts

export interface TurnstileVerification {
  ok: boolean;
  enforced: boolean;
  error?: string;
}

/**
 * Verify a Cloudflare Turnstile response token when `TURNSTILE_SECRET_KEY`
 * is configured on the deployment. When the env var is absent, returns
 * `{ ok: true, enforced: false }` so forms remain operational until Turnstile
 * site/secret keys are provisioned.
 */
export async function verifyTurnstileIfConfigured(
  token: unknown,
  remoteIp?: string
): Promise<TurnstileVerification> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return { ok: true, enforced: false };
  }

  if (typeof token !== "string" || !token.trim()) {
    return {
      ok: false,
      enforced: true,
      error: "Human verification required. Please complete the verification check.",
    };
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
