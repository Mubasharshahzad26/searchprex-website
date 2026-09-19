// lib/admin-master.ts
//
// Master admin login: a password escape hatch that sits alongside Supabase auth,
// used by the login action, middleware.ts and requireAdmin().
//
// This replaces a version that hardcoded the password in source and also
// accepted it from an `?admin_key=` query parameter. This repository is public,
// so that password was readable by anyone on GitHub and granted admin on
// production — including the CMS Server Actions that write to the live
// database, whose article bodies are rendered as raw HTML.
//
// The rules now:
// - The password exists only in the ADMIN_MASTER_PASSWORD env var. Unset (or
//   shorter than 16 characters) means the feature is OFF. There is no fallback
//   literal, and it is not shared with CRON_SECRET.
// - The cookie never holds the password, only a SHA-256 digest of it. A leaked
//   cookie does not reveal the password, and changing the env var invalidates
//   every existing session at once.
// - No query-string login. URLs end up in server logs, browser history and
//   Referer headers.
//
// Web Crypto only, so the same module runs in middleware (edge) and in Server
// Actions (node).

export const MASTER_ADMIN_COOKIE = "searchprex_admin_token";

const MIN_PASSWORD_LENGTH = 16;
const PEPPER = "searchprex-master-admin-v1";

function configuredPassword(): string | null {
  const password = process.env.ADMIN_MASTER_PASSWORD?.trim();
  return password && password.length >= MIN_PASSWORD_LENGTH ? password : null;
}

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Constant-time compare, so response timing reveals nothing about a guess. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** The value stored in the admin cookie, or null when the feature is off. */
export async function masterAdminToken(): Promise<string | null> {
  const password = configuredPassword();
  return password ? sha256Hex(`${PEPPER}:${password}`) : null;
}

export async function isMasterAdminPassword(candidate: string): Promise<boolean> {
  const password = configuredPassword();
  if (!password) return false;
  // Digests, not raw strings, so the compared lengths are always equal.
  const [given, expected] = await Promise.all([sha256Hex(candidate.trim()), sha256Hex(password)]);
  return safeEqual(given, expected);
}

export async function isMasterAdminCookie(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const token = await masterAdminToken();
  return token !== null && safeEqual(value, token);
}
