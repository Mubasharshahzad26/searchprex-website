// app/(auth)/login/actions.ts
"use server";

import { cookies, headers } from "next/headers";
import { MASTER_ADMIN_COOKIE, isMasterAdminPassword, masterAdminToken } from "@/lib/admin-master";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyTurnstileIfConfigured } from "@/lib/security/turnstile";

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

// See lib/admin-master.ts: the password is read only from ADMIN_MASTER_PASSWORD,
// and the cookie stores a digest of it, never the password itself.
export async function masterAdminLoginAction(
  password: string,
  turnstileToken?: string
): Promise<{ success: boolean; error?: string }> {
  const reqHeaders = await headers();
  const ip = getClientIp(reqHeaders);
  const rl = checkRateLimit(`admin-login:${ip}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
  if (!rl.allowed) {
    return {
      success: false,
      error: `Too many sign-in attempts. Wait ${rl.retryAfterSeconds}s and try again.`,
    };
  }

  const humanCheck = await verifyTurnstileIfConfigured(turnstileToken, ip);
  if (!humanCheck.ok) {
    return {
      success: false,
      error: humanCheck.error || "Please complete the human verification check.",
    };
  }

  const token = await masterAdminToken();
  if (!token) {
    return { success: false, error: "Admin password sign-in is not configured on this deployment. Set ADMIN_MASTER_PASSWORD in Vercel first." };
  }
  if (!(await isMasterAdminPassword(password))) {
    return { success: false, error: "Incorrect admin password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(MASTER_ADMIN_COOKIE, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return { success: true };
}
