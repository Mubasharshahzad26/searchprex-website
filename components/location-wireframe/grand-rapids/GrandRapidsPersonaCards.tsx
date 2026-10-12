"use client";

import React, { useState } from "react";
import { UserCheck, Users, ShieldAlert, Cpu, Award, CheckCircle2 } from "lucide-react";

export default function GrandRapidsPersonaCards() {
  const [activePersona, setActivePersona] = useState<"solo" | "mid">("solo");

  return (
    <section className="bg-slate-50/70 py-16 sm:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            BUILT AROUND HOW YOU ACTUALLY WORK
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-950 mt-4 tracking-tight">
            Which Firm Describes You?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We adapt our execution model to your firm’s real capacity, intake workflow, and billing realities.
          </p>

          {/* Toggle Pills */}
          <div className="inline-flex p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs mt-6">
            <button
              type="button"
              onClick={() => setActivePersona("solo")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activePersona === "solo"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Solo Attorney
            </button>
            <button
              type="button"
              onClick={() => setActivePersona("mid")}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activePersona === "mid"
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4" />
              Mid-Size Firm (2–10 Attorneys)
            </button>
          </div>
        </div>

        {/* 3 Pillar Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* CARD 1: WHAT KEEPS YOU UP */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-neutral-700 flex items-center justify-center mb-5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                WHAT KEEPS YOU UP
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mt-2 leading-snug">
                {activePersona === "solo"
                  ? "Every dollar hurts, and I am the only person answering the phone."
                  : "Associate caseloads need steady volume, and partners demand ROI proof."}
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {activePersona === "solo"
                  ? "You cannot afford to throw $4,000/month at Google Ads clicks that fail to sign or tire-kickers calling for free consultations outside Kent County."
                  : "Managing partners are tired of paying inflated agency fees for vanity traffic reports while attorneys complain about weak lead quality and shared vendor leads."}
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-600">
              <span>Pain Point Solved</span>
            </div>
          </div>

          {/* CARD 2: WHAT WE HANDLE */}
          <div className="bg-white rounded-2xl p-7 border-2 border-neutral-900/30 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-slate-100 text-neutral-800 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
              SearchPrex Core
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-neutral-800 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                WHAT WE HANDLE
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mt-2 leading-snug">
                {activePersona === "solo"
                  ? "We set up and run your Business Profile, one priority practice page and call tracking."
                  : "Complete multi-practice silos, Kent County sub-markets, and CRM call tracking."}
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {activePersona === "solo"
                  ? "You give us one short 20-minute monthly call. We handle schema markup, Map Pack local citations, content writing, and CallRail lead attribution."
                  : "We optimize primary practice areas (injury, divorce, criminal, estate), build suburb spokes for Wyoming/Kentwood, and feed qualified intake straight to your CRM."}
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-800">
              <span>Zero Technical Burden On You</span>
            </div>
          </div>

          {/* CARD 3: WHAT YOU GET */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-neutral-800 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                WHAT YOU GET
              </div>
              <h3 className="text-lg font-bold text-neutral-950 mt-2 leading-snug">
                {activePersona === "solo"
                  ? "Phone-ready local leads, a simple monthly report and no technical work."
                  : "Consistent qualified signed cases, market exclusivity, and blended CAC drops."}
              </h3>
              <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                {activePersona === "solo"
                  ? "Starting with predictable, transparent flat retainers that pay for themselves with just one new signed retainer per month. No multi-year contract traps."
                  : "Exclusive territory representation in Grand Rapids — we never work with your direct practice competitors. High-value cases compound as ad spend decreases."
              }
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-2 text-xs font-semibold text-neutral-800">
              <CheckCircle2 className="w-4 h-4" />
              <span>Full Domain Asset Ownership</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
