"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { masterAdminLoginAction } from "../(auth)/login/actions";

function getNextPath(): string {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//") ? next : "/content-admin/news-autopilot";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      const result = await Promise.race([
        masterAdminLoginAction(password),
        new Promise<never>((_, reject) => {
          timeoutId = setTimeout(
            () => reject(new Error("Sign-in timed out. Check Vercel Runtime Logs and confirm this deployment has ADMIN_MASTER_PASSWORD set for Production.")),
            15000,
          );
        }),
      ]);
      if (!result.success) {
        setError(result.error || "Could not sign in. Try again.");
        setLoading(false);
        return;
      }
      router.replace(getNextPath());
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed. Please try again.");
      setLoading(false);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  }

  const next = typeof window === "undefined" ? "/content-admin/news-autopilot" : getNextPath();
  const googleLogin = "/login?next=" + encodeURIComponent(next);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-emerald-700">SearchPrex CMS</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-600">Use your admin password to open News Autopilot, publish SEO news, and manage blog posts.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700" htmlFor="admin-password">Admin password</label>
          <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
          {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">{loading ? "Signing in…" : "Open content admin"}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">Prefer Google sign-in? <Link className="font-semibold text-emerald-700 underline" href={googleLogin}>Continue with Google</Link></p>
        <p className="mt-5 text-xs leading-5 text-slate-500">If admin password sign-in is not configured, add a strong ADMIN_MASTER_PASSWORD to the backup Vercel project&apos;s Production environment variables and redeploy.</p>
      </section>
    </main>
  );
}
