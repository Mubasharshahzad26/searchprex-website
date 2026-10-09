"use client";

// components/location-wireframe/DetroitTopPromoBar.tsx
//
// Matches user request:
// - Above header / top of the page announcement bar
// - Headline: Limited-time offer of 14 days free trial of intake efficiency tool access
// - Direct Call button & 14-day trial claim CTA

import React from "react";
import { Phone, Sparkles, ArrowRight, Clock } from "lucide-react";

export default function DetroitTopPromoBar() {
  return (
    <div className="w-full bg-[#070b24] text-white border-b border-indigo-900/60 py-2.5 px-4 relative z-50">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs">
        
        {/* Left: Offer Headline & Pill */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#3eb489]/20 text-[#3eb489] border border-[#3eb489]/40 shrink-0">
            <Clock className="h-2.5 w-2.5" />
            <span>Limited Time Offer</span>
          </span>
          <p className="font-semibold text-slate-200 text-center sm:text-left">
            <span className="text-white font-bold">14-Day Free Trial:</span> Access our Law Firm Intake Efficiency &amp; 24/7 Call Telemetry Tool.
          </p>
        </div>

        {/* Right: Direct Call Button & Claim Trial CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+13134888255"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/10"
            title="Call SearchPrex Detroit Legal SEO Director"
          >
            <Phone className="h-3 w-3 text-[#3eb489]" />
            <span>Call (313) 488-8255</span>
          </a>

          <a
            href="#growth-plan"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#534AB7] hover:bg-[#43399F] text-white font-bold text-xs transition-colors shadow-xs"
          >
            <span>Claim 14-Day Access</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
