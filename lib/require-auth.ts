// lib/require-auth.ts
//
// Auth check for API routes.
//
// Used for tools that should stay publicly *visible* but not publicly
// *runnable*. /ai-search is the case this exists for: it is titled "Free AI SEO
// Audit Tool", ranks at position 20 for its own queries, and sits at sitemap
// priority 0.9. Putting the page behind middleware would remove it from the
// index and end that traffic — which is the opposite of what a lead magnet is
// for. Gating the action instead keeps the page earning search visibility while
// still requiring an account to spend a model call.
//
// Client-side checks are not a substitute: anything the browser enforces can be
// skipped by calling the endpoint directly. This is the actual control.

import { createClient } from "@/lib/supabase/server";

export interface AuthResult {
  ok: boolean;
  userId?: string;
  /** Populated when ok is false — safe to return to the caller. */
  reason?: string;
}

export async function requireUser(): Promise<AuthResult> {
  // Without Supabase configured we cannot authenticate anyone. Fail closed, the
  // same way middleware.ts does — an unconfigured deployment must not silently
  // become an open one.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { ok: false, reason: "Sign-in is not available on this deployment." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { ok: false, reason: "Sign in to run a free audit — it takes a minute." };
    }

    return { ok: true, userId: user.id };
  } catch {
    return { ok: false, reason: "Could not verify your session. Please sign in again." };
  }
}
