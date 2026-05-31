"use client";
 
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Logo } from "@/components/Logo";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
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
 
  const inputCls =
    "w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#0a0f2e] placeholder-[#94a3b8] outline-none focus:border-[#3eb489] focus:ring-2 focus:ring-[#3eb489]/20 transition-all";
  const labelCls = "block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wider";
 
  return (
    <div className="min-h-screen bg-[#eaecf3] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
 
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center">
            <Logo size="md" variant="dark" />
          </Link>
          <h1 className="mt-6 text-2xl font-black text-[#0a0f2e] tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-[#64748b]">Sign in to your dashboard</p>
        </div>
 
        {/* Card */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-4">
 
            <div>
              <label className={labelCls}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputCls}
              />
            </div>
 
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={inputCls}
              />
            </div>
 
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
 
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold rounded-xl py-3 text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              style={{ background: GREEN }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
            >
              {loading ? "Signing in…" : "Sign in →"}
            </button>
          </form>
 
          <div className="mt-6 pt-6 border-t border-[#e2e8f0] text-center text-sm text-[#64748b]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold transition-colors" style={{ color: GREEN_DARK }}>
              Sign up free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
 


































