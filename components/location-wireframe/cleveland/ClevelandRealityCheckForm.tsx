"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from "lucide-react";

const FIRM_SIZES = ["Solo", "2–10 attorneys", "11+ partners"];
const PRACTICE_AREAS = [
  "Workers' comp",
  "Personal injury",
  "Criminal defense",
  "Employment",
  "Estate & probate",
  "Other practice",
];

export default function ClevelandRealityCheckForm() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firmSize, setFirmSize] = useState("Solo");
  const [practiceArea, setPracticeArea] = useState("Personal injury");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setErrorMsg("Please enter your name and email.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/reality-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          website,
          phone,
          firmSize,
          practiceArea,
          notes: `Cleveland 24h Reality Check Request. Size: ${firmSize} | Practice: ${practiceArea}`,
          source: "cleveland-reality-check",
        }),
      });

      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Could not submit your request. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reality-check" className="scroll-mt-20 border-b border-slate-200 bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Context Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
              Free for Cleveland Law Firms
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0a0f2e] leading-tight">
              Your Cleveland Market Reality Check in 24 Hours
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We identify your priorities, uncover the exact technical hurdles between you and high-value signed cases, then teardown the competitors outranking you in Cuyahoga County.
            </p>

            <div className="group rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-3 font-mono text-xs sm:text-sm text-slate-700 transition-all duration-300 hover:border-[#534AB7]/30 hover:shadow-lg hover:shadow-[#534AB7]/10 hover:-translate-y-1">
              <div className="flex items-center gap-2.5 transition-transform group-hover:translate-x-1 duration-200">
                <span className="text-[#534AB7] font-bold">+</span>
                <span>YOUR GROWTH PRIORITIES & REVENUE TARGETS</span>
              </div>
              <div className="flex items-center gap-2.5 transition-transform group-hover:translate-x-1 duration-200 delay-75">
                <span className="text-rose-500 font-bold">+</span>
                <span>YOUR TOP 3 CUYAHOGA COUNTY VISIBILITY HURDLES</span>
              </div>
              <div className="flex items-center gap-2.5 transition-transform group-hover:translate-x-1 duration-200 delay-150">
                <span className="text-[#1a7d59] font-bold">+</span>
                <span>LOCAL 3-PACK RANK & AI OVERVIEW CITATION GAP</span>
              </div>
              <div className="flex items-center gap-2.5 transition-transform group-hover:translate-x-1 duration-200 delay-200">
                <span className="text-indigo-600 font-bold">+</span>
                <span>ACTIONABLE 90-DAY PLAN — ZERO SALES PRESSURE</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#1a7d59]" />
              Conducted personally by Mubashar Sharif, CEO & Founder of SearchPrex.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-9 shadow-xl shadow-slate-100 transition-all duration-300 hover:shadow-2xl hover:shadow-[#534AB7]/15 hover:border-[#534AB7]/40 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#534AB7] before:via-indigo-400 before:to-[#1a7d59]">
              {done ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-extrabold text-[#0a0f2e]">
                    Reality Check Requested!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you. Mubashar Sharif (CEO) will inspect your site, Google Business Profile, and local Cuyahoga County competitors. Your full audit teardown will arrive in your inbox within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a0f2e]">
                    Request My Cleveland Reality Check
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Attorney Jane Smith"
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/20 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Firm Website *
                      </label>
                      <input
                        type="text"
                        required
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="yourfirm.com"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/20 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@yourfirm.com"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7]/20 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Firm size chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Firm Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {FIRM_SIZES.map((sz) => {
                        const isSelected = firmSize === sz;
                        return (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setFirmSize(sz)}
                            className={`rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                              isSelected
                                ? "bg-[#534AB7] text-white shadow-sm scale-105"
                                : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Practice area chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Primary Practice Area
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRACTICE_AREAS.map((pa) => {
                        const isSelected = practiceArea === pa;
                        return (
                          <button
                            type="button"
                            key={pa}
                            onClick={() => setPracticeArea(pa)}
                            className={`rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200 active:scale-95 ${
                              isSelected
                                ? "bg-[#0a0f2e] text-white shadow-sm scale-105"
                                : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                            }`}
                          >
                            {pa}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-bold text-rose-600">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#534AB7] px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-[#534AB7]/25 hover:bg-[#3C3489] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Send My Reality Check Request</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Strictly confidential under attorney-client marketing privilege. Never disclosed to other firms.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
