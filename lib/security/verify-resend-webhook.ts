// lib/security/verify-resend-webhook.ts
import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_TIMESTAMP_DRIFT_SECONDS = 300; // 5 minutes

/**
 * Verifies a Svix-signed Resend webhook request (`svix-id`, `svix-timestamp`,
 * `svix-signature`) using `RESEND_WEBHOOK_SECRET`. Fails closed when the secret
 * is missing or signatures do not match.
 */
export function verifyResendWebhook(req: Request, rawBody: string): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  if (!secret) return false;

  const svixId = req.headers.get("svix-id")?.trim();
  const svixTimestamp = req.headers.get("svix-timestamp")?.trim();
  const svixSignature = req.headers.get("svix-signature")?.trim();
  if (!svixId || !svixTimestamp || !svixSignature) return false;

  const ts = Number(svixTimestamp);
  if (!Number.isFinite(ts)) return false;
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - ts) > MAX_TIMESTAMP_DRIFT_SECONDS) return false;

  const keyStr = secret.startsWith("whsec_") ? secret.slice("whsec_".length) : secret;
  const key = Buffer.from(keyStr, "base64");
  const signedPayload = `${svixId}.${svixTimestamp}.${rawBody}`;
  const expected = createHmac("sha256", key).update(signedPayload).digest("base64");
  const expectedBuf = Buffer.from(expected, "utf8");

  // Header may contain multiple space-delimited `v1,<sig>` entries during rotation
  const signatures = svixSignature.split(/\s+/);
  for (const part of signatures) {
    const [version, sig] = part.split(",", 2);
    if (version !== "v1" || !sig) continue;
    const sigBuf = Buffer.from(sig, "utf8");
    if (sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf)) {
      return true;
    }
  }

  return false;
}
