"use client";

import React from "react";

const AI_BENCHMARKS = [
  {
    engine: "Google AI Overviews",
    prompt: '"how are unvested RSUs divided in a California divorce Santa Clara County"',
    signal: "Direct statutory citation of California Family Code § 2601, Hug/Nelson time-rule formulas, and Family Justice Center (201 N. First St) procedural steps.",
  },
  {
    engine: "ChatGPT & SearchGPT",
    prompt: '"best employment lawyer in San Jose for tech layoff severance review"',
    signal: "State Bar of California verified attorney schema, published analysis of Cal. Bus. & Prof. Code § 16600, and consistent third-party legal directory entity graphs.",
  },
  {
    engine: "Perplexity AI",
    prompt: '"Santa Clara County probate court timeline and living trust contest attorney"',
    signal: "Answer-first H2/H3 structure detailing Downtown Superior Court Probate Division filing windows and California Probate Code § 17200 petitions.",
  },
];

export default function SanJoseSiliconValleyEntityLab() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10">
          <span className="inline-block px-3 py-1 rounded-md bg-white border border-slate-300 text-xs font-semibold uppercase tracking-wider text-neutral-800 mb-3">
            Silicon Valley Generative Engine Optimization (GEO)
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 tracking-tight">
            How Silicon Valley Clients Vet Lawyers in AI Search
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Santa Clara County has the highest adoption of ChatGPT, Perplexity, and Google AI Overviews in the United States. Engineers and executives ask detailed procedural questions before clicking a single website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AI_BENCHMARKS.map((b) => (
            <div key={b.engine} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
                  {b.engine}
                </span>
                <span className="text-[11px] font-mono text-slate-500">South Bay Query</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Actual Client Prompt:</p>
                <p className="text-xs sm:text-sm font-mono text-neutral-950 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {b.prompt}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-900 mb-1">Citation Trigger We Build:</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{b.signal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
