"use client";

import React, { useState } from "react";
import { Users, Clock, FileText, CheckCircle2, ShieldCheck, Heart } from "lucide-react";

export default function DentonSearcherProfile() {
  const [selectedProfile, setSelectedProfile] = useState<number>(0);

  const searchers = [
    {
      name: "Worried Parent",
      tagline: "Anxious Mother or Father 3 Hours Away in Austin, Midland, or Houston",
      feeling: "Panic, helplessness, and urgent fear for their child's clean future.",
      searches: '"my son was arrested in Denton what do I do" · "Denton County jail bond bail out"',
      needsToRead: "Immediate, calm instructions on Denton County Jail booking release, remote representation paperwork, and reassuring attorney credentials.",
      tone: "Deeply reassuring, empathetic, and jargon-free. Rapid click-to-call direct contact.",
    },
    {
      name: "UNT / TWU Student",
      tagline: "19–22 Year Old College Undergraduate",
      feeling: "Acute embarrassment, fear of parental discovery, and terror of scholarship loss.",
      searches: '"minor in possession Denton TX" · "first DWI Texas college student penalty"',
      needsToRead: "Complete confidentiality guarantees, student disciplinary code implications, and how pretrial diversion keeps records expungable.",
      tone: "Non-judgmental, discreet, approachable, and realistic. Mobile-first instant communication.",
    },
    {
      name: "New Resident",
      tagline: "Recent Relocation to Rayzor Ranch or Corinth",
      feeling: "Isolation and uncertainty: 'I have no personal family referrals in Denton.'",
      searches: '"family lawyer near me Denton TX" · "best personal injury attorney Denton County"',
      needsToRead: "Real client testimonials, physical courthouse proximity, and verified local community roots.",
      tone: "Warm, professional, welcoming, and transparent about case expectations.",
    },
    {
      name: "Young Family",
      tagline: "Parents Facing Separation or Custody Petition",
      feeling: "Heartache, high emotional stress, and worry over child stability.",
      searches: '"child custody Denton County" · "divorce lawyer Denton TX conservatorship"',
      needsToRead: "A clear procedural explanation of Texas custody conservatorship, possession orders, and dispute resolution.",
      tone: "Measured, compassionate, family-first, and highly structured.",
    },
    {
      name: "Student Tenant or Landlord",
      tagline: "Off-Campus Apartment Lease Dispute",
      feeling: "Financial frustration, anger over withheld deposits, and eviction threats.",
      searches: '"security deposit not returned Texas" · "eviction notice Denton Justice of the Peace"',
      needsToRead: "Concrete statutory deadlines under Texas Property Code Chapter 92 and Justice Court small claims rights.",
      tone: "Concise, authoritative, step-by-step, and decisive.",
    },
  ];

  const current = searchers[selectedProfile];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5" />
            <span>Searcher Psychology &amp; Demographics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
            The Person on the Other Side of the Screen is Scared, Not Shopping
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Denton&apos;s two major universities and booming family suburbs radically alter search intent. When an attorney understands who is truly holding the phone, conversion rates multiply.
          </p>
        </div>

        {/* Profile Selector Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {searchers.map((item, idx) => {
            const isActive = selectedProfile === idx;
            return (
              <button
                key={item.name}
                onClick={() => setSelectedProfile(idx)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isActive
                    ? "bg-[#534AB7] text-white border-[#534AB7] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {/* 4 Detail Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: What they feel */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Heart className="w-4 h-4 text-[#534AB7]" />
                <span>What They Feel</span>
              </div>
              <h3 className="text-lg font-bold text-[#0a0f2e] mb-2 leading-snug">
                {current.feeling}
              </h3>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/80 mt-4">
              {current.tagline}
            </div>
          </div>

          {/* Card 2: What they search */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <Clock className="w-4 h-4 text-[#534AB7]" />
                <span>What They Search</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 italic bg-white p-3.5 rounded-xl border border-slate-200/60 leading-relaxed">
                {current.searches}
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/80 mt-4">
              High commercial intent
            </div>
          </div>

          {/* Card 3: What they need to read */}
          <div className="rounded-2xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                <FileText className="w-4 h-4 text-[#1a7d59]" />
                <span>What They Need to Read</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.needsToRead}
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-3 border-t border-slate-200/80 mt-4">
              Immediate procedural clarity
            </div>
          </div>

          {/* Card 4: Our Page Tone */}
          <div className="rounded-2xl p-6 bg-[#0a0f2e] text-white border border-[#3C3489] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#EEEDFE] uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Our Calibrated Tone</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {current.tone}
              </p>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-slate-800 mt-4 flex items-center justify-between">
              <span>Conversion Calibration</span>
              <span className="text-emerald-400 font-bold">100% Tested</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
