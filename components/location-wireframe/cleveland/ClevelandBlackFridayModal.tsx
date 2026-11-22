"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Clock,
  Lock,
  Loader2,
  Gift,
} from "lucide-react";
import { isBlackFridayOfferLive, BLACK_FRIDAY_LEAD_SOURCE } from "@/lib/black-friday-offer";

interface ClevelandBlackFridayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_DISMISSED_KEY = "spx_cleveland_bf_modal_shown_2026";

const PRACTICE_AREAS = [
  "Personal injury",
  "Workers' comp (Ohio BWC)",
  "Criminal defense / OVI",
  "Medical malpractice",
  "Employment law",
  "Estate & probate",
  "Business & commercial litigation",
];

export default function ClevelandBlackFridayModal({ isOpen, onClose }: ClevelandBlackFridayModalProps) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [practiceArea, setPracticeArea] = useState("Personal injury");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!website || !email) {
      setErrorMessage("Please provide your firm website URL and work email.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Cleveland Attorney (Black Friday)",
          url: website,
          email,
          phone,
          practiceArea,
          source: BLACK_FRIDAY_LEAD_SOURCE,
          notes: `Black Friday 2026 Exclusive: 25% Off 3 Months + Free Cuyahoga County Court Silo Audit. Practice: ${practiceArea}. Phone: ${phone || "N/A"}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setStatus("success");
      try {
        window.localStorage.setItem(MODAL_DISMISSED_KEY, "claimed");
      } catch {
        // ignore
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to submit request. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  const handleClose = () => {
    try {
      window.sessionStorage.setItem(MODAL_DISMISSED_KEY, "dismissed");
    } catch {
      // ignore
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl rounded-2xl bg-neutral-950 border border-amber-500/40 p-6 sm:p-8 text-white shadow-2xl z-10 my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === "success" ? (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">
              Black Friday Discount Reserved!
            </h3>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We have locked in your <strong className="text-amber-300">25% Black Friday Discount</strong> and 
              Cuyahoga County practice exclusivity for <span className="font-semibold text-white">{practiceArea}</span>.
            </p>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left text-xs space-y-2 text-slate-300">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Founder Mubashar Sharif will review your firm&apos;s Cuyahoga ranking footprint personally.</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Your custom Cuyahoga County Court Silo Audit will arrive at <strong>{email}</strong> within 24 hours.</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="https://calendly.com/contact-searchprex/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm transition-all"
              >
                <span>Book Priority Strategy Session</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-300 mb-3">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              Black Friday 2026 Exclusive · Cleveland, OH
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Lock in 25% Off + 1-Firm Cuyahoga County Exclusivity
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              We only partner with <strong className="text-white">one law firm per practice area</strong> in Greater Cleveland so we never compete against our own clients in Cuyahoga County courts.
            </p>

            {/* Offer Value Stack */}
            <div className="mt-4 p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2 text-xs text-slate-200">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span><strong>25% Off First 3 Months</strong> on Solo, Growth, or Firm Tier (Month-to-month, no lock-in)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span><strong>Free $950 Cuyahoga County Court Silo Audit</strong> (Identifies lost case searches against regional competitors)</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Strict Market Exclusivity:</strong> Your direct practice area competitor will be locked out</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Law Firm Website <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. clevelandinjuryfirm.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Work Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="partner@clevelandfirm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="(216) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Select Practice Area to Lock Out Competitors <span className="text-amber-400">*</span>
                </label>
                <select
                  value={practiceArea}
                  onChange={(e) => setPracticeArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                >
                  {PRACTICE_AREAS.map((area) => (
                    <option key={area} value={area} className="bg-neutral-950 text-white">
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              {errorMessage && (
                <p className="text-xs text-rose-400 font-medium">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:bg-amber-400/50 text-neutral-950 font-bold px-5 py-3 text-sm transition-all shadow-lg shadow-amber-400/20 cursor-pointer mt-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Securing Exclusivity...</span>
                  </>
                ) : (
                  <>
                    <span>Claim 25% Off &amp; Secure Cuyahoga Exclusivity</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  No Contract Lock-in
                </span>
                <span>•</span>
                <span>7-Day Free Trial</span>
                <span>•</span>
                <span>Month-to-Month</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
