"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bot, MessageSquare, Award, Sparkles, Search, CheckCircle2, ArrowRight } from "lucide-react";

const REPUTATION_TABS = [
  {
    name: "Client Reviews",
    icon: MessageSquare,
    title: "Local Reviews That Read Like Neighbors",
    desc: "A fully compliant review acquisition workflow after every successful case or milestone, with rapid, professional responses. In a relationship-driven Philadelphia market, recent localized reviews determine which attorney receives the initial phone call.",
    benefit: "Enhances Map Pack proximity signals and builds conversion confidence.",
  },
  {
    name: "Local Citations & Mentions",
    icon: Award,
    title: "Regional Citations That Google and LLMs Trust",
    desc: "We earn authentic editorial citations across Philadelphia Bar Association publications, local community chambers, and regional media networks. These verified entity co-occurrences form the foundational knowledge graph Google AI and ChatGPT reference.",
    benefit: "Builds unassailable domain authority and entity trust.",
  },
  {
    name: "AI Overview Engineering",
    icon: Bot,
    title: "Be the Law Firm Generative AI Recommends",
    desc: "We structure your legal content into modular, answer-first paragraphs backed by LegalService JSON-LD schema and an llms.txt protocol, ensuring your partners are cited in conversational AI search summaries.",
    benefit: "Captures zero-click search inquiries before competitors.",
  },
];

const AI_PROMPTS = [
  '"best personal injury lawyer in South Philly"',
  '"who handles workers\' comp near Center City Philadelphia"',
  '"experienced criminal defense attorney Northeast Philadelphia"',
  '"top litigation law firm near Philadelphia City Hall"',
  '"limited tort auto accident lawyer Philadelphia"',
];

export default function PhiladelphiaReputationAndAI() {
  const [activeTab, setActiveTab] = useState(0);
  const current = REPUTATION_TABS[activeTab];

  return (
    <section className="border-b border-slate-200 bg-slate-50/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EEEDFE] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-3">
            <Sparkles className="h-4 w-4" />
            <span>Modern Word-of-Mouth Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f2e] tracking-tight leading-tight">
            AI Is the New "My Cousin's Lawyer": Modern Philadelphia Referral Signals
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Philadelphia has always run on word of mouth. Today, that word of mouth occurs in Google reviews, local bar mentions, and Google AI Overviews. We build all three systematically.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {REPUTATION_TABS.map((tab, idx) => {
            const Icon = tab.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(idx)}
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#534AB7] text-white shadow-md shadow-[#534AB7]/25 scale-102"
                    : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Active Tab Explanation Card */}
          <div className="lg:col-span-7 rounded-3xl border-2 border-slate-200 bg-white p-7 sm:p-9 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#534AB7] block">
                Pillar 0{activeTab + 1} · SearchPrex Blueprint
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f2e]">
                {current.title}
              </h3>
              <p className="text-base text-slate-700 leading-relaxed">
                {current.desc}
              </p>
              
              <div className="rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100 text-xs sm:text-sm text-slate-800 flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#1a7d59] shrink-0" />
                <span>
                  <strong>Strategic Impact:</strong> {current.benefit}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/ai-search"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#534AB7] hover:underline"
              >
                <span>Learn how SearchPrex optimizes for Generative AI</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: AI Prompts We Aim to Win */}
          <div className="lg:col-span-5 rounded-3xl border-2 border-[#534AB7]/30 bg-gradient-to-br from-indigo-50/40 via-white to-white p-7 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7] mb-2">
                <Bot className="h-4 w-4" />
                <span>AI Prompts We Position Your Firm to Win</span>
              </div>
              <h4 className="text-xl font-extrabold text-[#0a0f2e]">
                Conversational Queries in Philadelphia
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Prospective clients increasingly ask AI tools detailed queries. We optimize your entity so your firm is cited in the primary answer:
              </p>

              <div className="space-y-2 pt-3">
                {AI_PROMPTS.map((prompt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-mono text-slate-800 shadow-2xs hover:border-[#534AB7]/40 hover:bg-indigo-50/20 transition-all"
                  >
                    <Search className="h-3.5 w-3.5 text-[#534AB7] shrink-0" />
                    <span className="truncate">{prompt}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
              We maximize citing probability across Google Gemini, ChatGPT, and Perplexity through authoritative entity calibration.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
