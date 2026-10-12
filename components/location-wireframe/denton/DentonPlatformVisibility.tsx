"use client";

import React, { useState } from "react";
import { Compass, MapPin, Sparkles, Bot, Cpu, CheckCircle2, ShieldCheck } from "lucide-react";

export default function DentonPlatformVisibility() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const platforms = [
    {
      name: "Google Map Pack",
      title: "Dominating the Local 3-Pack on Denton Square",
      desc: "Google Business Profile optimization, localized photo geotagging, review acquisition velocity, and consistent Denton County NAP citations ensure your office appears in the top 3 spots when searchers look for an attorney 'near me'.",
      icon: MapPin,
      impact: "Captures 44%+ of urgent mobile phone calls",
    },
    {
      name: "Google AI Overviews",
      title: "Being the Primary Entity Google Cites in AI Answers",
      desc: "Answer-first legal pages configured with LegalService and FAQPage JSON-LD structured data give Google's Generative AI algorithms direct, unassailable legal facts to quote and link as the authoritative source.",
      icon: Sparkles,
      impact: "Cites your firm above traditional organic links",
    },
    {
      name: "ChatGPT Search",
      title: "Establishing the Entity Graph ChatGPT Recommends",
      desc: "By establishing consistent digital authority across bar directories, verified editorial mentions, and clean brand schema, ChatGPT's search engine understands your firm's exact practice focus and geographic location in Denton.",
      icon: Bot,
      impact: "Generates high-trust conversational client referrals",
    },
    {
      name: "Google Gemini",
      title: "Powering Multi-Modal Gemini Legal Inquiries",
      desc: "Google Gemini connects mobile queries, local maps, and legal statutes. We ensure your knowledge graph is clean and authoritative so Gemini links your firm to high-stakes Denton cases.",
      icon: Cpu,
      impact: "Full integration with Android & Google Workspace search",
    },
    {
      name: "Technical Base",
      title: "Eliminating Technical Blockers at the Crawl Level",
      desc: "Crawl traps, duplicate URLs, slow Core Web Vitals, and broken canonical tags quietly prevent law firms from ranking. I audit and repair your site's foundation before publishing new content.",
      icon: Compass,
      impact: "Ensures 100% rapid indexation of new pages",
    },
  ];

  const current = platforms[activeTab];
  const Icon = current.icon;

  return (
    <section className="py-20 bg-neutral-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-700/10 border border-slate-400/20 text-slate-200 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-slate-200" />
            <span>Multi-Channel Organic Visibility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How I Get You Found: Organic Growth Where Denton Actually Looks
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Search has expanded across local maps, organic rankings, and generative AI engines. We build a bulletproof technical foundation so your firm is omnipresent wherever prospective clients search.
          </p>
        </div>

        {/* Platform Selector Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {platforms.map((item, idx) => {
            const isActive = activeTab === idx;
            const TabIcon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                  isActive
                    ? "bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-sm"
                    : "bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <TabIcon className="w-4 h-4 text-slate-400" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* 2 Detail Columns */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          {/* Main Selected Platform Card */}
          <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                <Icon className="w-4 h-4 text-slate-400" />
                <span>Channel Strategy</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-4">
                {current.title}
              </h3>
              <p className="text-base text-slate-300 leading-relaxed mb-6">
                {current.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span className="text-slate-400">Primary Impact:</span>
              <span className="text-slate-400 font-bold">{current.impact}</span>
            </div>
          </div>

          {/* Qualified Lead Criteria Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-neutral-950/60 to-slate-900 border border-neutral-700/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>What Counts as a Qualified Lead</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4">
                Zero Vanity Metrics · Real Retainers
              </h4>
              <ul className="space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Located in your target service area (Denton County)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>A specific case category your firm actually takes</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>A real person who contacts your intake desk directly</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Exclusively yours — never resold or shared with competitors</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-6 border-t border-slate-800/80 text-[11px] text-slate-400">
              We maximize your citation probability through structured data. We never guarantee third-party platform output.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
