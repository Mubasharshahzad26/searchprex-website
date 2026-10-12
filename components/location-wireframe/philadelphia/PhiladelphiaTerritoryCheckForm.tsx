"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2, Lock } from "lucide-react";

const PRACTICE_AREAS = [
  "Personal Injury",
  "Criminal Defense",
  "Workers' Comp",
  "Family Law",
  "Estate & Probate",
  "Other Practice",
];

const NEIGHBORHOODS = [
  "Center City",
  "South Philly",
  "Northeast",
  "Fishtown",
  "University City",
  "Manayunk",
  "Suburbs / Delco",
];

export default function PhiladelphiaTerritoryCheckForm() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [practiceArea, setPracticeArea] = useState("Personal Injury");
  const [neighborhood, setNeighborhood] = useState("Center City");

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
          notes: `Philadelphia Territory Availability Check. Practice: ${practiceArea} | Territory: ${neighborhood}`,
          source: "philadelphia-territory-check",
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
            <span className="inline-block rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900">
              Market Exclusivity & Availability
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
              Which Philadelphia Neighborhood Do You Want to Own?
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              We partner with only one firm per practice area per submarket. The stops you claim remain exclusively yours. Tell us where you practice and we will inspect market availability, uncover your competitor gaps, and deliver your full reality check in 24 hours.
            </p>

            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-3 font-mono text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2.5">
                <span className="text-neutral-900 font-bold">+</span>
                <span>AVAILABILITY CHECK FOR YOUR SPECIFIC PRACTICE AREA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-slate-500 font-bold">+</span>
                <span>YOUR TOP 3 NEIGHBORHOOD VISIBILITY OPPORTUNITIES</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-neutral-800 font-bold">+</span>
                <span>LOCAL 3-PACK RANK GRID & GOOGLE AI CITATION GAP</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-neutral-800 font-bold">+</span>
                <span>ACTIONABLE 90-DAY ROADMAP — ZERO SALES PRESSURE</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-neutral-800" />
              Conducted personally by Mubashar Sharif, CEO & Principal Strategist.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-9 shadow-xl shadow-slate-100 transition-all hover:shadow-2xl hover:border-slate-300 before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-neutral-800 before:via-slate-400 before:to-neutral-800">
              {done ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="h-14 w-14 text-neutral-700 mx-auto animate-bounce" />
                  <h3 className="text-2xl font-extrabold text-neutral-950">
                    Territory Check Requested!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Thank you. Mubashar Sharif (CEO) will inspect territory exclusivity for {practiceArea} in {neighborhood}, verify your local Google Business Profile, and deliver your full reality check teardown within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950">
                    Check Philadelphia Territory Availability
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
                      placeholder="e.g. Attorney John Miller"
                      className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-neutral-900 focus:ring-2 focus:ring-slate-300 focus:outline-none transition-all"
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
                        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-neutral-900 focus:ring-2 focus:ring-slate-300 focus:outline-none transition-all"
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
                        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-neutral-900 focus:ring-2 focus:ring-slate-300 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Practice Area Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Practice Area to Protect
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PRACTICE_AREAS.map((pa) => {
                        const isSelected = practiceArea === pa;
                        return (
                          <button
                            type="button"
                            key={pa}
                            onClick={() => setPracticeArea(pa)}
                            className={`rounded-lg px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-neutral-900 text-white shadow-xs scale-102"
                                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {pa}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Neighborhood Chips */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Neighborhood to Own First
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {NEIGHBORHOODS.map((nb) => {
                        const isSelected = neighborhood === nb;
                        return (
                          <button
                            type="button"
                            key={nb}
                            onClick={() => setNeighborhood(nb)}
                            className={`rounded-lg px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-neutral-900 text-white shadow-xs scale-102"
                                : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {nb}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="rounded-xl border border-slate-300 bg-slate-100 p-3 text-xs font-semibold text-slate-800">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-sm hover:bg-neutral-800 transition-all hover:scale-101 active:scale-99 disabled:opacity-75 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Checking Territory...</span>
                      </>
                    ) : (
                      <>
                        <span>Check Territory Availability</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5">
                    <Lock className="h-3 w-3 text-slate-400" />
                    <span>Strictly confidential under attorney marketing privilege. Never disclosed to other firms.</span>
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
