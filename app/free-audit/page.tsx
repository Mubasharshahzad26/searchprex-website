"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

export default function FreeAuditPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", website: "", business: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/send-audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex justify-center mb-8">
            <Logo size="md" variant="dark" />
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#534AB7]/10 border border-[#534AB7]/20 rounded-full px-4 py-1.5 text-xs font-medium text-[#818cf8] mb-4">
            🔍 Free Law Firm SEO Audit
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-3">
            Claim Your Free SEO Audit
          </h1>
          <p className="text-white/40 text-sm">
            Real audit by the founder — not a tool report. 24hr turnaround guaranteed.
          </p>
        </div>

        {!submitted ? (
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="John Smith"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#534AB7]/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="john@lawfirm.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#534AB7]/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Website URL</label>
                <input
                  required
                  value={form.website}
                  onChange={e => setForm({...form, website: e.target.value})}
                  placeholder="https://yourlawfirm.com"
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#534AB7]/60 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">Business Type</label>
                <select
                  value={form.business}
                  onChange={e => setForm({...form, business: e.target.value})}
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#534AB7]/60 transition-all"
                >
                  <option value="">Select business type</option>
                  <option>Law Firm / Attorney</option>
                  <option>Local Business</option>
                  <option>Ecommerce / Shopify</option>
                  <option>Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#534AB7] hover:bg-[#3C3489] text-white font-bold rounded-xl py-3 text-sm transition-all hover:shadow-[0_0_28px_rgba(83,74,183,0.5)] disabled:opacity-50 mt-2"
              >
                {loading ? "Sending..." : "Get My Free Audit →"}
              </button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-white/25">
              <span>✓ 24hr turnaround</span>
              <span>✓ No credit card</span>
              <span>✓ Real founder audit</span>
            </div>
          </div>
        ) : (
          <div className="bg-white/[0.03] border border-emerald-500/20 rounded-2xl p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-white mb-3">Audit Request Received!</h2>
            <p className="text-white/40 text-sm mb-6">
              We'll review <strong className="text-white/70">{form.website}</strong> and send your audit to <strong className="text-white/70">{form.email}</strong> within 24 hours.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-[#818cf8] text-sm hover:text-[#a5b4fc] transition-colors">
              ← Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}