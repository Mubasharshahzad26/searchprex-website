// lib/security/rate-limit.ts
import { NextResponse } from "next/server";

interface BucketEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, BucketEntry>();
const MAX_BUCKETS = 5000;

/**
 * Extract the best-effort client IP from standard proxy headers.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Fixed-window per-instance rate limiter. Stops rapid bursts and brute-force
 * attempts on warm serverless workers without requiring external Redis.
 * Pair with Cloudflare Turnstile / Upstash Redis for global enforcement.
 */
export function checkRateLimit(
  bucketKey: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  // Bound memory if many distinct keys accumulate in a long-lived worker.
  if (buckets.size >= MAX_BUCKETS) {
    for (const [key, entry] of buckets) {
      if (entry.resetAt <= now) buckets.delete(key);
    }
    if (buckets.size >= MAX_BUCKETS) {
      buckets.clear();
    }
  }

  const existing = buckets.get(bucketKey);
  if (!existing || existing.resetAt <= now) {
    buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  existing.count += 1;
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));
  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds,
  };
}

export function rateLimitExceededResponse(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { ok: false, error: "Too many requests. Please wait a moment and try again." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSeconds) },
    }
  );
}
