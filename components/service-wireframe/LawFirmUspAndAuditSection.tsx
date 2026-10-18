"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Lock, Clock, Sparkles } from "lucide-react";

export default function LawFirmUspAndAuditSection() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("Solo");
  const [practiceArea, setPracticeArea] = useState<string>("Personal injury");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const USPS = [
    {
      num: "01",
      title: "Dedicated Client Care",
      desc: "Direct communication with Senior Legal Strategists. No junior account hand-offs or agency delays.",
    },
    {
      num: "02",
      title: "Weekly SEO Report",
      desc: "Every Monday: live Search Console clicks, Map Pack calls, keyword movement, and intake attribution.",
    },
    {
      num: "03",
      title: "7-Day Free Trial",
      desc: "Live strategy, 40-point audit, and technical fixes before you commit to a single dollar.",
    },
    {
      num: "04",
      title: "Free Tear-Down Competitor Analysis",
      desc: "Detailed competitor gap analysis exposing why rival firms rank above you in your county venue.",
    },
    {
      num: "05",
      title: "Free Technical & YMYL Audit",
      desc: "40-point crawl covering Core Web Vitals, ABA Rule 7.1 compliance, and GBP primary category setup.",
    },
    {
      num: "06",
      title: "90-Day Money-Back Guarantee",
      desc: "Month-to-month contracts backed by a 90-day money-back guarantee for total peace of mind.",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !email) {
      setErrorMessage("Please enter both your firm website URL and work email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "US Managing Partner",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "law-firm-seo:usp-audit-form",
          notes: `Requested USA Law Firm Tear-Down & Competitor Gap Analysis. Firm Size: ${firmSize}, Practice: ${practiceArea}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit request. Please try again.");
      }

      setStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <section id="free-audit-teardown" className="border-b border-slate-200 bg-slate-50/70 py-16 sm:py-20 font-sans">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: 6 USPs in Modern Monochrome Box Grid */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white border border-slate-300 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-900 shadow-2xs">
                <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                <span>SearchPrex Core Commitments &middot; ABA Rule 7.1 Aligned</span>
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
                Why Managing Partners Choose SearchPrex Over Traditional Legal Agencies
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                We remove the agency bloat. You work directly with Founder Mubashar Sharif to build county-specific practice silos that win signed retainers—backed by complete transparency and zero long-term lock-in.
              </p>
            </div>

            {/* 6 USPs Modern Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {USPS.map((usp) => (
                <div
                  key={usp.num}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-neutral-950 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-950 text-[11px] font-black text-white">
                      {usp.num}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                  </div>
                  <h3 className="text-sm font-black text-neutral-950 leading-snug">
                    {usp.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                    {usp.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Ohio Proof Ribbon */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-neutral-950" />
                <span>
                  <strong className="text-neutral-950">Proven Authority:</strong> Ranked #1 on Google in Ohio for &ldquo;Law Firm SEO Cleveland Ohio&rdquo;.
                </span>
              </div>
              <span className="text-neutral-950 font-bold shrink-0 hidden sm:inline">
                5+ Years Mastery
              </span>
            </div>
          </div>

          {/* Right Column: Replicated Location Page Lead Capture Form */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-md relative">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300 mb-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-950" />
                    <span>Free 24-Hour USA Law Firm Audit</span>
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-neutral-950">
                    Get Your Free Law Firm Tear-Down
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Competitor gap analysis + 7-Day Free Trial roadmap.
                  </p>
                </div>
              </div>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3 my-4">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-950 text-xs font-black text-white">
                    01
                  </div>
                  <h4 className="text-base font-bold text-neutral-950">
                    Audit &amp; 7-Day Trial Request Received
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Thank you. Founder Mubashar Sharif will personally review your law firm website, Google Business Profile, and county search competitors, and email your 24-hour teardown directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      Firm Website <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="yourlawfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1">
                      Work Email <span className="text-neutral-950">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@yourlawfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-300 text-sm text-neutral-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/15 focus:border-neutral-900 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1.5">
                      Firm Size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Solo", "2-10 attorneys"] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFirmSize(size)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            firmSize === size
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-900 mb-1.5">
                      Primary Practice Area
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        "Personal injury",
                        "Family law",
                        "Criminal defense",
                        "Estate planning",
                        "Mass torts",
                        "GBP / Maps",
                      ].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setPracticeArea(area)}
                          className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            practiceArea === area
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                    >
                      <span>
                        {status === "submitting"
                          ? "Submitting Request..."
                          : "Send My Free 24-Hour Audit"}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 text-[11px] text-slate-500 pt-1 text-center">
                    <span className="font-semibold text-neutral-900">
                      100% Confidential &middot; Reviewed Personally by Founder Mubashar Sharif
                    </span>
                    <span>
                      USA Support Hours: Mon–Fri 8:00 AM – 6:00 PM (EST / CST / PST)
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
