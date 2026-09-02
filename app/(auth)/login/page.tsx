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

  /**
   * Where to send them after signing in.
   *
   * middleware.ts sets ?next= when it turns someone away from a gated tool, so
   * they land back on the page they wanted rather than on /dashboard.
   *
   * Read from window at submit time rather than with useSearchParams(), which
   * would require wrapping this page in a Suspense boundary. This only ever
   * runs from a click, so there is no server render to worry about.
   *
   * Only same-site paths are honoured. Accepting an arbitrary value would turn
   * the login page into an open redirect that a phishing link could point
   * anywhere, and "//evil.com" is a protocol-relative URL, not a local path.
   */
  function destinationAfterLogin(): string {
    if (typeof window === "undefined") return "/dashboard";
    const next = new URLSearchParams(window.location.search).get("next");
    return next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  }
 
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
      router.push(destinationAfterLogin());
      router.refresh();
    }
  }
 
  const inputCls =
    "w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#0a0f2e] placeholder-[#94a3b8] outline-none focus:border-[#3eb489] focus:ring-2 focus:ring-[#3eb489]/20 transition-all";
  const labelCls = "block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wider";
 
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const nextUrl = destinationAfterLogin();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${nextUrl}`
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

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
          
          {/* Google Auth */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-[#e2e8f0] text-[#0a0f2e] font-bold rounded-xl py-3 text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-[#e2e8f0]"></div>
            <span className="flex-shrink-0 px-3 text-xs text-[#64748b] font-medium uppercase tracking-wider">Or continue with email</span>
            <div className="flex-grow border-t border-[#e2e8f0]"></div>
          </div>

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
 


































