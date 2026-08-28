"use client";

// app/free-audit/FreeAuditClient.tsx
//
// This is OFFER_HREF — the destination every primary CTA on the site points
// at. It is the single highest-value page in the funnel, which is why the two
// problems below mattered more than the layout did.
//
// 1. IT FAKED SUCCESS. The old handler awaited fetch() and then set submitted
//    to true unconditionally, with no res.ok check. /api/send-audit returns 500
//    when its Supabase env vars are absent, so a visitor could fill in the form,
//    see "Audit Request Received!", and have nothing sent anywhere. Every lead
//    through the site's main CTA was at risk of vanishing silently. It now
//    checks the response and reports failure honestly, keeping what was typed.
//
// 2. WHITE ON #3eb489 IS 2.59:1. lib/design-tokens.ts documents this: that
//    green is for decorative fills only, never behind white text. The submit
//    button — the most important control on the site — failed WCAG AA. It uses
//    the token successButton (#1a7d59, 5.1:1) now.
//
// Layout: the page was a bare form on an empty field, with a second Searchprex
// logo directly under the one already in the nav, and a magnifying-glass emoji
// in the badge. A visitor arriving from a CTA had no restatement of what they
// were being offered. It is now two columns — the offer on the left, the form
// on the right — collapsing to one on mobile, with the type taken from the
// site's own scale rather than invented here.

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Loader2,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { OFFER_PROMISE } from "@/lib/offer";

// What the visitor actually receives, restated on the page they convert on.
const deliverables = [
  {
    icon: Sparkles,
    title: "What your top 3 competitors do better",
    body: "Named sites, named gaps — not a list of generic warnings a crawler produced.",
  },
  {
    icon: ShieldCheck,
    title: "Whether Google's AI names you or them",
    body: "I check the AI Overview for your money queries and tell you who gets cited.",
  },
  {
    icon: Clock,
    title: "A reply within 24 hours",
    body: "From me. If I can't make the deadline I tell you before it, not after.",
  },
  {
    icon: MapPin,
    title: "One client per city, per practice area",
    body: "Take the slot and I'm not able to work for your competitor down the road.",
  },
];

export default function FreeAuditClient() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", website: "", business: "" });
  const [fromTool, setFromTool] = useState<string | null>(null);

  // Prefill the domain when the visitor arrives from a tool (currently the SERP
  // Checker's preview mode, which sends ?website=). Read from window rather than
  // useSearchParams so this client component doesn't need a Suspense boundary.
  //
  // Only `website` is carried across: /api/send-audit destructures exactly
  // name/email/website/business, so the keywords the visitor typed have nowhere
  // to land until that table gains a column. They're shown back to them below
  // rather than being silently dropped.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const website = params.get("website");
    const keywords = params.get("keywords");
    if (website) setForm((f) => ({ ...f, website }));
    if (keywords) setFromTool(keywords);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-[#dfe3ec] bg-[#fbfcfe] px-4 py-3 text-sm text-[#0a0f2e] outline-none transition-all placeholder:text-[#9aa3b2] focus:border-[#1a7d59] focus:bg-white focus:ring-4 focus:ring-[#1a7d59]/10";
  const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-[#5f6a78]";

  return (
    <main id="main-content" className="bg-[#f8f9fc] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_460px] lg:items-start lg:gap-12">
        {/* ── The offer, restated ── */}
        <div className="lg:pt-2">
          <p className="text-xs font-bold uppercase tracking-widest text-[#196b4d]">
            Free competitor SEO &amp; AI tear-down
          </p>
          <h1 className="mt-3 text-3xl font-black leading-[1.1] tracking-tight text-[#0a0f2e] sm:text-4xl lg:text-5xl">
            I&apos;ll audit your site myself and send you the fix list
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#566070] sm:text-lg">
            {OFFER_PROMISE}
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {deliverables.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.title} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1a7d59]/10">
                    <Icon className="h-[18px] w-[18px] text-[#196b4d]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-[#0a0f2e]">{d.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-[#566070]">
                      {d.body}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-8 border-l-2 border-[#1a7d59] pl-4 text-sm leading-relaxed text-[#566070]">
            A real audit by the founder, not a tool report. If all you want is a crawler&apos;s
            error list, you can get one free in ten minutes without me.
          </p>
        </div>

        {/* ── The form ── */}
        <div className="lg:sticky lg:top-24">
          {fromTool && (
            <div className="mb-4 rounded-xl border border-[#e6e8f0] bg-white px-4 py-3 text-sm text-[#566070]">
              <span className="font-bold text-[#0a0f2e]">From the SERP Checker:</span> I&apos;ll
              include your live position for{" "}
              <span className="font-bold text-[#0a0f2e]">{fromTool}</span> in the audit.
            </div>
          )}

          {status === "done" ? (
            <div className="rounded-xl border border-[#1a7d59]/30 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
              <CheckCircle2 className="h-9 w-9 text-[#196b4d]" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-black text-[#0a0f2e]">Audit request received</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#566070]">
                I&apos;ll review{" "}
                <strong className="font-bold text-[#0a0f2e]">{form.website}</strong> and send the
                tear-down to{" "}
                <strong className="font-bold text-[#0a0f2e]">{form.email}</strong> within 24
                hours.
              </p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#196b4d] transition-colors hover:text-[#1a7d59]"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-[#e6e8f0] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="fa-name" className={labelCls}>
                    Full name
                  </label>
                  <input
                    id="fa-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="fa-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="fa-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="fa-website" className={labelCls}>
                    Website URL
                  </label>
                  <input
                    id="fa-website"
                    required
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="fa-business" className={labelCls}>
                    Business type
                  </label>
                  <select
                    id="fa-business"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className={inputCls}
                  >
                    <option value="">Select business type</option>
                    <option>Law Firm / Attorney</option>
                    <option>Local Business</option>
                    <option>Ecommerce / Shopify</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* An honest failure. The visitor keeps everything they typed and
                    gets a route to me that does not depend on this form working. */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm"
                  >
                    <p className="font-bold text-red-900">That didn&apos;t send.</p>
                    <p className="mt-1 leading-relaxed text-red-800">
                      Something went wrong on my end — nothing you typed is lost, so try again
                      in a moment. If it keeps failing, email me at{" "}
                      <a
                        href="mailto:contact@searchprex.com"
                        className="font-bold underline"
                      >
                        contact@searchprex.com
                      </a>
                      .
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1a7d59] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[#196b4d] disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Get my free audit
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[#eef0f6] pt-5 text-xs text-[#5f6a78]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#196b4d]" aria-hidden="true" />
                  24hr turnaround
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#196b4d]" aria-hidden="true" />
                  No credit card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#196b4d]" aria-hidden="true" />
                  Real founder audit
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
