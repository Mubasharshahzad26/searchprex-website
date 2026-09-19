// app/(auth)/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { MASTER_ADMIN_COOKIE, isMasterAdminPassword, masterAdminToken } from "@/lib/admin-master";

// See lib/admin-master.ts: the password is read only from ADMIN_MASTER_PASSWORD,
// and the cookie stores a digest of it, never the password itself.
export async function masterAdminLoginAction(password: string): Promise<{ success: boolean; error?: string }> {
  const token = await masterAdminToken();
  if (!token || !(await isMasterAdminPassword(password))) {
    return { success: false, error: "Invalid password." };
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
