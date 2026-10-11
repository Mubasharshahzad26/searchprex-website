"use client";

import React from "react";
import { CheckCircle2, ShieldCheck, MapPin, Briefcase, PhoneCall, Calendar, Lock } from "lucide-react";

const FIVE_TESTS = [
  {
    icon: MapPin,
    title: "In your area",
    desc: "Lives, works, or sustained injury within your primary Kent County service zone.",
  },
  {
    icon: Briefcase,
    title: "Right case type",
    desc: "A matter matching the specific statutory criteria and caseload your firm actually accepts.",
  },
  {
    icon: PhoneCall,
    title: "Reachable",
    desc: "A verified real phone number and email where the prospective client actively answers.",
  },
  {
    icon: Calendar,
    title: "Real need",
    desc: "Has a clear immediate legal dilemma, approaching court date, or actionable statute of limitations.",
  },
  {
    icon: Lock,
    title: "Not shared",
    desc: "Exclusively your lead. Never syndicated or auctioned off to 3 competing local firms.",
  },
];

const SAMPLE_LOG = [
  {
    lead: "Lead 1 (Grand Rapids)",
    source: "Map Pack call",
    practice: "Family law",
    qualified: "Yes",
    signed: "Yes",
    signedBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    lead: "Lead 2 (Wyoming)",
    source: "Organic website form",
    practice: "Personal injury",
    qualified: "Yes",
    signed: "Pending Consultation",
    signedBadge: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    lead: "Lead 3 (East Grand Rapids)",
    source: "AI Overview citation",
    practice: "Estate planning",
    qualified: "Yes",
    signed: "Yes",
    signedBadge: "bg-emerald-100 text-emerald-800 border-emerald-200",
  },
  {
    lead: "Lead 4 (Ottawa County)",
    source: "Google Organic search",
    practice: "Criminal defense",
    qualified: "No: Out of Venue",
    signed: "Referred Out",
    signedBadge: "bg-slate-100 text-slate-700 border-slate-200",
  },
];

export default function GrandRapidsQualifiedLeadTests() {
  return (
    <section className="bg-slate-50/70 py-16 sm:py-24 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold text-[#534AB7] uppercase tracking-wider bg-[#EEEDFE] px-3 py-1 rounded-full border border-[#534AB7]/20">
            WHAT &quot;QUALIFIED&quot; MEANS TO US
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a0f2e] mt-4 tracking-tight">
            Every lead is checked against five tests
          </h2>
          <p className="text-[#566070] text-sm sm:text-base mt-2">
            Most SEO agencies boast about impressions and raw contact form spam. We measure real signed retainers and filter every inquiry through strict qualification criteria.
          </p>
        </div>

        {/* 5 Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {FIVE_TESTS.map((test, i) => {
            const Icon = test.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-[#1a7d59] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#1a7d59] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0a0f2e]">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {test.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#1a7d59]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Test #{i + 1} Passed
                </div>
              </div>
            );
          })}
        </div>

        {/* Sample Anonymized Intake Log Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
            <div>
              <h3 className="text-base font-bold text-[#0a0f2e]">
                Sample Lead Intake Log (Anonymized Client Data)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every call tracked with CallRail and mapped directly to attorney signed retainers.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#EEEDFE] text-[#534AB7] border border-[#534AB7]/20">
              Live Intake Tracking
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700 font-bold">
                  <th className="py-3 px-4 sm:px-6">Inquiry</th>
                  <th className="py-3 px-4">Channel Source</th>
                  <th className="py-3 px-4">Practice Niche</th>
                  <th className="py-3 px-4 text-center">Qualified?</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Signed Retainer?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SAMPLE_LOG.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#0a0f2e]">
                      {row.lead}
                    </td>
                    <td className="py-3.5 px-4 text-[#566070]">
                      {row.source}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {row.practice}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        row.qualified.startsWith("Yes")
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {row.qualified}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${row.signedBadge}`}>
                        {row.signed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-500 italic">
            Sample layout only. Replace with a real anonymized client log and keep what you can document.
          </div>
        </div>

      </div>
    </section>
  );
}
