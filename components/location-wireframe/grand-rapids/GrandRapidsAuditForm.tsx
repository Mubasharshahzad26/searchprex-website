"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, ArrowRight, Lock, Clock } from "lucide-react";

export default function GrandRapidsAuditForm() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [firmSize, setFirmSize] = useState<"Solo" | "2-10 attorneys">("Solo");
  const [practiceArea, setPracticeArea] = useState<string>("Injury");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !email) {
      setErrorMessage("Please enter both your website URL and email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Grand Rapids Attorney",
          url: website,
          email,
          firmSize,
          practiceArea,
          source: "grand-rapids:ppc-waste-audit",
          notes: `Requested Grand Rapids PPC Waste Audit. Firm Size: ${firmSize}, Practice: ${practiceArea}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Unable to submit. Please try again.");
      }

      setStatus("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Submission failed. Please try again.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <section id="ppc-audit" className="bg-slate-50/70 py-16 sm:py-24 border-b border-slate-200 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: AUDIT VALUE PROPOSITION */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#1a7d59] text-xs font-bold uppercase tracking-wider border border-emerald-200">
              <Clock className="w-3.5 h-3.5" />
              FREE FOR GRAND RAPIDS FIRMS
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-[#0a0f2e] leading-tight tracking-tight">
              Get your PPC Waste Audit in 24 hours
            </h2>

            <p className="text-base text-[#566070] leading-relaxed">
              I review your Google Ads exposure, Business Profile and the Kent County firms outranking you, then show where organic can replace paid spend.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                "Where your ad money likely leaks (high-cost search terms, tire-kicker clicks)",
                "Which practice area to rank first in Grand Rapids and Kent County",
                "A plain-English plan, no sales pressure and no multi-year lock-in",
                "Reviewed personally by the founder (Mubashar Shahzad) — not an outsourced sales rep",
              ].map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#0a0f2e]">
                  <CheckCircle2 className="w-5 h-5 text-[#1a7d59] flex-shrink-0 mt-0.5" />
                  <span className="font-medium leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-5 h-5 text-[#534AB7] flex-shrink-0" />
              <span>
                <strong>Strict Exclusivity:</strong> We only represent one law firm per practice area in Grand Rapids. If your practice niche is already claimed, we will let you know immediately.
              </span>
            </div>
          </div>

          {/* RIGHT: AUDIT REQUEST FORM */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-7 sm:p-9 shadow-md border border-slate-200 relative">
              <h3 className="text-xl font-bold text-[#0a0f2e] mb-1">
                Request my audit
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your details below to receive your customized Kent County audit video and teardown.
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#1a7d59] mx-auto" />
                  <h4 className="text-base font-bold text-[#0a0f2e]">
                    Audit Request Received!
                  </h4>
                  <p className="text-sm text-slate-600">
                    Thank you. Mubashar will analyze your Grand Rapids website and Google Ads profile, and email your 24-hour teardown directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Smith, Esq."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7]"
                    />
                  </div>

                  {/* Firm website */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Firm website <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="yourfirm.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@yourfirm.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7]/40 focus:border-[#534AB7]"
                    />
                  </div>

                  {/* Firm Size Buttons */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Firm size
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(["Solo", "2-10 attorneys"] as const).map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setFirmSize(size)}
                          className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                            firmSize === size
                              ? "bg-[#0a0f2e] text-white border-[#0a0f2e]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Practice Area Buttons */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Main practice area
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["Family law", "Injury", "Criminal defense", "Estate", "Other"].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setPracticeArea(area)}
                          className={`py-1.5 px-3 rounded-lg text-xs font-semibold border transition-all ${
                            practiceArea === area
                              ? "bg-[#534AB7] text-white border-[#534AB7]"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  {status === "error" && (
                    <p className="text-xs text-rose-600 font-medium">
                      {errorMessage}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#1a7d59] hover:bg-[#156748] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === "submitting" ? "Submitting Request..." : "Send my audit request"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Privacy Link & Confidential Note */}
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>
                      Confidential. Never shared with other firms.
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
