"use client";
import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
 
/* Toptal green accent */
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
 
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
 
  const inputCls =
    "w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#0a0f2e] placeholder-[#94a3b8] outline-none focus:border-[#3eb489] focus:ring-2 focus:ring-[#3eb489]/20 transition-all";
  const labelCls = "block text-xs font-semibold text-[#475569] mb-1.5 uppercase tracking-wider";
 
  return (
    <div className="min-h-screen bg-[#eaecf3] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex justify-center mb-8">
            <Logo size="md" variant="dark" />
          </Link>
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-4"
            style={{ background: "rgba(62,180,137,0.12)", border: "1px solid rgba(62,180,137,0.3)", color: GREEN_DARK }}
          >
            🔍 Free SEO Audit
          </div>
          <h1 className="text-3xl font-black text-[#0a0f2e] tracking-tight mb-3">
            Claim Your Free SEO Audit
          </h1>
          <p className="text-[#64748b] text-sm">
            Real audit by the founder — not a tool report. 24hr turnaround guaranteed.
          </p>
        </div>
 
        {!submitted ? (
          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelCls}>Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="John Smith"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="john@company.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Website URL</label>
                <input
                  required
                  value={form.website}
                  onChange={e => setForm({...form, website: e.target.value})}
                  placeholder="https://yourwebsite.com"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Business Type</label>
                <select
                  value={form.business}
                  onChange={e => setForm({...form, business: e.target.value})}
                  className={inputCls}
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
                className="w-full text-white font-bold rounded-xl py-3 text-sm transition-all disabled:opacity-50 mt-2"
                style={{ background: GREEN }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.background = GREEN_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.background = GREEN)}
              >
                {loading ? "Sending..." : "Get My Free Audit →"}
              </button>
            </form>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[#94a3b8]">
              <span>✓ 24hr turnaround</span>
              <span>✓ No credit card</span>
              <span>✓ Real founder audit</span>
            </div>
          </div>
        ) : (
          <div className="bg-white border rounded-2xl p-10 text-center shadow-sm" style={{ borderColor: "rgba(62,180,137,0.3)" }}>
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-black text-[#0a0f2e] mb-3">Audit Request Received!</h2>
            <p className="text-[#64748b] text-sm mb-6">
              We&apos;ll review <strong className="text-[#0a0f2e]">{form.website}</strong> and send your audit to <strong className="text-[#0a0f2e]">{form.email}</strong> within 24 hours.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors" style={{ color: GREEN_DARK }}>
              ← Back to home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
 


































