"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router   = useRouter();
  const supabase = createClient();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#534AB7]/20 border border-[#534AB7]/40 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="5" stroke="#818cf8" strokeWidth="2"/>
                <path d="M11.5 11.5L16 16" stroke="#818cf8" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-white text-lg font-semibold tracking-tight">
              Search<strong className="text-[#818cf8]">prex</strong>
            </span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-white tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-white/40">Sign in to your dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#534AB7]/60 focus:bg-[#534AB7]/5 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#534AB7]/60 focus:bg-[#534AB7]/5 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold rounded-xl py-3 text-sm transition-all hover:shadow-[0_0_28px_rgba(83,74,183,0.5)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-sm text-white/30">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#818cf8] hover:text-[#a5b4fc] transition-colors font-medium">
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
