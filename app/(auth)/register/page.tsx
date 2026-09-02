"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router   = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // New user → onboarding
      router.push("/dashboard/onboarding");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="mt-6 text-2xl font-black text-white tracking-tight">Create your account</h1>
            <p className="mt-1 text-sm text-[#94a3b8]">Free to start — no credit card required</p>
          </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
          <form onSubmit={handleRegister} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#534AB7]/60 focus:bg-[#534AB7]/5 transition-all"
              />
            </div>

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
                placeholder="Min. 8 characters"
                minLength={8}
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
              {loading ? "Creating account…" : "Create Account →"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center text-sm text-white/30">
            Already have an account?{" "}
            <Link href="/login" className="text-[#818cf8] hover:text-[#a5b4fc] transition-colors font-medium">
              Sign in
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/20">
          By signing up you agree to our{" "}
          <Link href="/terms" className="underline hover:text-white/40">Terms</Link> &{" "}
          <Link href="/privacy" className="underline hover:text-white/40">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
