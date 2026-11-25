import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Award, Search, Sparkles } from "lucide-react";

export default function ClevelandFounderProof() {
  return (
    <section className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 6 Cols: Authentic Founder Audit Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm aspect-4/3 group">
                <Image
                  src="/images/services/law-firm/mubashar-sharif-cleveland-seo-audit.webp"
                  alt="Mubashar Sharif reviewing Cleveland Personal Injury Local Rank Grid and Google Search Console performance"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Floating E-E-A-T Credibility Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-neutral-950">
                    Mubashar Sharif · Founder &amp; Head Strategist
                  </span>
                </div>

                {/* Local Rank Grid Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200 shadow-md">
                  <div className="flex items-center justify-between text-xs font-bold text-neutral-950 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-neutral-800" />
                      <span>Cuyahoga County Local Geo-Grid Audit</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      Live Rank Tracking
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Every audit is personally conducted by Mubashar, verifying Cuyahoga Court citations, 3-Pack geo-radii, and speed-to-lead response times.
                  </p>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Human E-E-A-T Content & Direct Guarantee */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-800 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-neutral-700" />
                <span>Human E-E-A-T · No Junior Account Reps</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-tight">
                Work Directly with the Strategist Who Audits Your Cleveland Competitors
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Large agencies pitch you with a senior partner and then hand off your Cuyahoga County campaign to overseas junior coordinators who have never stepped foot on Ontario Street or driven I-90. At SearchPrex, your law firm works directly with founder Mubashar Sharif.
              </p>

              {/* 3 Core Trust Pillars */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-neutral-950 block">
                      Strict 1-Firm Cuyahoga Exclusivity:
                    </strong>
                    <span className="text-xs text-slate-600">
                      We never work with competing personal injury firms in Cleveland. When we sign an agreement with your practice, your competitors are locked out.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-neutral-950 block">
                      Direct WhatsApp &amp; Video Strategy Desk:
                    </strong>
                    <span className="text-xs text-slate-600">
                      Direct founder access for strategy calls, intake tuning, and monthly signed-case reconciliation. No ticketing portals.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-neutral-950 block">
                      Flat $1,200/mo Retainer · Month-to-Month:
                    </strong>
                    <span className="text-xs text-slate-600">
                      No 12-month lock-in contracts. You stay because signed retainers from I-90, I-480, and trauma center searches compound your revenue.
                    </span>
                  </div>
                </div>
              </div>

              {/* Founder CTA */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/locations/ohio/cleveland#reality-check"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3.5 text-xs sm:text-sm shadow-sm transition-all"
                >
                  <span>Request My Personal 24h PI Audit</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-xs text-slate-500 font-medium">
                  Delivered in &lt;24 hours · Video teardown included
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
