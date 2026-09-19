// lib/auth/require-admin.ts
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { MASTER_ADMIN_COOKIE, isMasterAdminCookie } from "@/lib/admin-master";

/**
 * Guard for admin-only Server Actions.
 *
 * Next dispatches a Server Action by its ID, not by the URL it was POSTed to,
 * so the `/content-admin/:path*` matcher in middleware.ts guards the pages but
 * not the writes. Every exported action in a "use server" file under an admin
 * surface has to call this itself.
 *
 * It lives here rather than in one of those files because a "use server"
 * module can only export async functions, and anything it exports becomes a
 * callable action in its own right.
 *
 * Throwing is the right failure rather than returning empty — these run
 * against the production database, and a silent empty list reads to the caller
 * as "there is nothing here" instead of "you are not allowed".
 */
export async function requireAdmin() {
  const cookieStore = await cookies();
  if (await isMasterAdminCookie(cookieStore.get(MASTER_ADMIN_COOKIE)?.value)) {
    return;
  }

  // Fail CLOSED when auth is unconfigured, matching middleware.ts. Without
  // credentials we cannot tell an admin from anyone else, so we refuse.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error(
      "Authentication is not configured on this deployment, so CMS access is refused. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable sign-in."
    );
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Admin role required.");
}
