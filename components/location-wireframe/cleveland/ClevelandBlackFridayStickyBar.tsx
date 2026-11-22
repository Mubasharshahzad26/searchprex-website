"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, X, Clock, ShieldCheck } from "lucide-react";
import { isBlackFridayOfferLive, CLEVELAND_BF_OFFER } from "@/lib/black-friday-offer";

interface ClevelandBlackFridayStickyBarProps {
  onOpenModal: () => void;
}

const DISMISS_KEY = "spx_cleveland_bf_dismissed_2026";

export default function ClevelandBlackFridayStickyBar({ onOpenModal }: ClevelandBlackFridayStickyBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1";
      if (!dismissed && isBlackFridayOfferLive()) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

  if (!visible) return null;

  return (
    <div className="relative z-40 bg-gradient-to-r from-neutral-950 via-slate-900 to-neutral-950 text-white border-b border-amber-500/30 px-3 py-2.5 sm:px-6 shadow-md transition-all duration-300">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Left: Badge + Urgency Text */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Black Friday Special
          </span>
          <span className="text-xs sm:text-sm font-medium text-slate-200">
            <strong className="text-white font-bold">Cleveland Law Firms:</strong> Lock in{" "}
            <span className="text-amber-300 font-extrabold underline decoration-amber-400/60 underline-offset-2">
              25% Off First 3 Months
            </span>{" "}
            + Free $950 Court Silo Audit
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            1-Firm Per Practice Exclusivity in Cuyahoga County
          </span>
        </div>

        {/* Right: CTA Button + Dismiss */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onOpenModal}
            className="group inline-flex items-center gap-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 px-3.5 py-1.5 text-xs font-bold transition-all shadow-sm hover:shadow-amber-400/20 cursor-pointer"
          >
            <span>Claim Black Friday Offer</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss Black Friday banner"
            className="rounded p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
