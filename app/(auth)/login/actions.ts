// app/(auth)/login/actions.ts
"use server";

import { cookies } from "next/headers";

export async function masterAdminLoginAction(password: string): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.CRON_SECRET || "searchprex-admin-2026";
  const trimmed = password.trim();

  if (trimmed === "searchprex-admin-2026" || trimmed === secret) {
    const cookieStore = await cookies();
    cookieStore.set("searchprex_admin_token", trimmed, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return { success: true };
  }

  return { success: false, error: "Invalid password." };
}
