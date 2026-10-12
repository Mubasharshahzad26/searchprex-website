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

import { trackLead } from "@/lib/track";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
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
  /** Where this lead came from, so the Sheet can answer "which page earns leads". */
  const [attribution, setAttribution] = useState({
    source: "",
    utmSource: "",
    utmCampaign: "",
    referrer: "",
  });

  // Prefill the domain when the visitor arrives from a tool (currently the SERP
  // Checker's preview mode, which sends ?website=). Read from window rather than
  // useSearchParams so this client component doesn't need a Suspense boundary.
  //
  // `email` is carried across too now: the hero form on the homepage collects a
  // URL and an email before sending the visitor here, and asking for the email
  // a second time is the kind of friction that loses the people who are already
  // convinced.
  //
  // The keywords a visitor typed in the SERP Checker are shown back to them
  // rather than submitted — there is still nowhere for them to land.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const website = params.get("website");
    const email = params.get("email");
    const keywords = params.get("keywords");
    setForm((f) => ({
      ...f,
      ...(website ? { website } : {}),
      ...(email ? { email } : {}),
    }));
    if (keywords) setFromTool(keywords);
    // Captured at mount, not at submit: a visitor can navigate within the site
    // between arriving and submitting, and by then document.referrer is this
    // site and the UTM parameters are gone from the URL.
    setAttribution({
      source: window.location.pathname + window.location.search,
      utmSource: params.get("utm_source") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
      referrer: document.referrer || "",
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/send-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...attribution }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackLead("free_audit", "free-audit");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-neutral-950 outline-none transition-all placeholder:text-slate-400 focus:border-neutral-900 focus:bg-white focus:ring-4 focus:ring-neutral-900/10";
  const labelCls = "mb-1.5 block text-xs font-bold uppercase tracking-widest text-slate-600";

  return (
    <main
      id="main-content"
      className="bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:pb-24 lg:pt-32"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_460px] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-12 lg:gap-y-8">
        {/* ── 1. Hero Intro + Founder Trust Badge (Top on Mobile, Top-Left on Desktop) ── */}
        <div className="lg:col-start-1 lg:row-start-1">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-neutral-900">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Free competitor SEO &amp; AI tear-down
          </span>

          <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
            I&apos;ll audit your site myself and send you the fix list
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {OFFER_PROMISE}
          </p>

          {/* Personal Founder Trust Block — answers "Who is 'I'?" immediately */}
          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm sm:items-center sm:p-5">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-200">
              <Image
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif, Founder of SearchPrex"
                fill
                sizes="56px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-bold text-neutral-950">Mubashar Sharif</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2 py-0.5 text-[11px] font-semibold text-neutral-900">
                  <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                  Founder · SearchPrex
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                5+ yrs hands-on SEO · Semrush &amp; HubSpot Certified · Every audit written by hand,
                never an automated crawler PDF.
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. The Form (Second on Mobile for zero scroll friction, Right Column Sticky on Desktop) ── */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-28">
          {fromTool && (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <span className="font-bold text-neutral-950">From the SERP Checker:</span> I&apos;ll
              include your live position for{" "}
              <span className="font-bold text-neutral-950">{fromTool}</span> in the audit.
            </div>
          )}

          {status === "done" ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgba(10,15,46,0.06)]">
              <CheckCircle2 className="h-9 w-9 text-neutral-900" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-black text-neutral-950">Audit request received</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                I&apos;ll review{" "}
                <strong className="font-bold text-neutral-950">{form.website}</strong> and send the
                tear-down to{" "}
                <strong className="font-bold text-neutral-950">{form.email}</strong> within 24
                hours.
              </p>
              <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5">
                <a
                  href="https://calendly.com/contact-searchprex/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-800"
                >
                  Want to talk sooner? Book a 30-min call
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 transition-colors hover:text-neutral-950"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_36px_rgba(10,15,46,0.07)]">
              {/* Top accent bar */}
              <div className="h-1.5 w-full bg-neutral-900" />

              <div className="p-6 sm:p-8">
                {/* Conversational micro-header */}
                <div className="mb-6 border-b border-slate-200 pb-4">
                  <h2 className="text-lg font-black tracking-tight text-neutral-950 sm:text-xl">
                    Where should I send your tear-down?
                  </h2>
                  <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                    Takes 30 seconds · Delivered to your inbox within 24 hours
                  </p>
                </div>

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
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-neutral-800 disabled:opacity-60 disabled:hover:translate-y-0"
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

                <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-200 pt-5 text-xs font-medium text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900" aria-hidden="true" />
                    24hr turnaround
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900" aria-hidden="true" />
                    No credit card
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-neutral-900" aria-hidden="true" />
                    Real founder audit
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── 3. Deliverables & Guarantee (Below Form on Mobile, Bottom-Left on Desktop) ── */}
        <div className="self-start lg:col-start-1 lg:row-start-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600">
            What&apos;s inside your 24-hour tear-down
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {deliverables.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.title}
                  className="flex items-start gap-3.5 rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-[0_1px_4px_rgba(0,0,0,0.02)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-slate-200">
                    <Icon className="h-[18px] w-[18px] text-neutral-900" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-neutral-950">{d.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-600 sm:text-sm">
                      {d.body}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-6 border-l-2 border-neutral-900 pl-4 text-sm leading-relaxed text-slate-600">
            A real audit by the founder, not a tool report. If all you want is a crawler&apos;s
            error list, you can get one free in ten minutes without me.
          </p>
        </div>
      </div>
    </main>
  );
}
