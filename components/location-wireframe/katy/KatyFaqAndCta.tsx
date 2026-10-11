"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Compass,
  Building2,
} from "lucide-react";
import KatyPainBanner from "./KatyPainBanner";

export default function KatyFaqAndCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is law firm SEO in Katy, Texas?",
      a1: "Law firm SEO in Katy makes a firm visible in Google's Local 3-Pack, organic search results, and AI answers for Katy-area legal queries.",
      a2: "It combines an optimized Google Business Profile calibrated for suburban radius, county-specific venue practice pages, authentic local community citations, and Whisper call tracking.",
      href: "/services/law-firm-seo",
      link: "How law firm SEO works",
    },
    {
      q: "Which court handles a divorce for someone who lives in Katy?",
      a1: "A divorce is filed in the district court of the county where the spouse resides: Houston for Harris County, Richmond for Fort Bend County, and Hempstead for Waller County.",
      a2: "Texas law requires six months of residence in the state and 90 days in the specific county before filing (Tex. Fam. Code § 6.301). Our content explains these venue boundaries with legal precision.",
      href: "/services/law-firm-seo/family-law",
      link: "Family Law & Divorce SEO Approach",
    },
    {
      q: "How much does law firm SEO in Katy cost?",
      a1: "Law firm SEO in Katy with SearchPrex runs $1,200 to $2,500 per month depending on the number of practice areas and suburban communities covered.",
      a2: "Everything is month-to-month with zero long-term contracts, and a free 24-hour tear-down comes first so you review the strategic scope before committing.",
      href: "#tear-down-form",
      link: "Request the free tear-down",
    },
    {
      q: "How long does law firm SEO take in Greater Katy?",
      a1: "Local 3-Pack and geo-grid improvements typically begin within 60 to 90 days following GBP category calibration and citation syndication.",
      a2: "Competitive organic rankings and AI overview citations compound steadily over 6 to 12 months. We anchor our engagement with a written 90-day milestone review.",
      href: "/case-studies",
      link: "See law firm case studies",
    },
    {
      q: "Should a Katy firm target Houston keywords first?",
      a1: "No. Houston-wide head terms are held by entrenched mega-firms with millions in ad spend and decade-old domain authority.",
      a2: "Pages for Katy, Cinco Ranch, Fulshear, and specific county courts rank significantly sooner and reach prospective clients who want an attorney close to home.",
      href: "/locations/texas/sugar-land",
      link: "Neighboring Market: Sugar Land Law Firm SEO",
    },
    {
      q: "Can SEO help our firm appear in ChatGPT and Google AI Overviews?",
      a1: "Yes, substantially. AI engines quote clear, structured, authoritative legal definitions with verified local jurisdictional citations.",
      a2: "We architect answer-first copy, deploy machine-readable LegalService and FAQPage schema, generate an llms.txt file, and actively monitor your AI citation frequency.",
      href: "/ai-search",
      link: "Our AI Search Optimization Framework",
    },
    {
      q: "Do I need separate pages for Cinco Ranch, Fulshear and Brookshire?",
      a1: "Yes. High-net-worth residents search by their specific master-planned community or municipal name rather than a broad 'Katy' query.",
      a2: "Each page requires genuinely unique local legal content addressing specific school districts, municipal ordinances, and local venue realities.",
      href: "/locations/texas",
      link: "Explore All Texas Locations",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <>
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#534AB7]/10 text-[#534AB7] text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Jurisdictional Clarity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight mb-4">
              Law Firm SEO in Katy: Common Questions
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Straightforward answers regarding court venues, pricing, Houston competition, and AI search visibility.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-extrabold text-base sm:text-lg text-[#0a0f2e]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#534AB7]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-slate-700 leading-relaxed border-t border-slate-200/60 bg-white space-y-2">
                      <p>
                        <strong>{faq.a1}</strong> {faq.a2}
                      </p>
                      <div>
                        <Link
                          href={faq.href}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#534AB7] hover:underline"
                        >
                          <span>{faq.link}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Texas Locations & Directory Links */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Explore More Texas Law Firm SEO Locations &amp; Guides
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-sm font-semibold text-slate-700">
            <Link
              href="/locations/texas/sugar-land"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Law Firm SEO Sugar Land
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas/the-woodlands"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Law Firm SEO The Woodlands
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas/denton"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Law Firm SEO Denton
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas/plano"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Law Firm SEO Plano
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations/texas"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              All Texas Cities
            </Link>
            <span className="text-slate-300">·</span>
            <Link
              href="/locations"
              className="text-[#534AB7] hover:text-[#3C3489] hover:underline"
            >
              Every State &amp; City We Cover
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 max-w-xl mx-auto">
            Stay ahead of Google algorithm updates with our dated{" "}
            <Link href="/resources/news/local-seo-updates" className="text-[#534AB7] underline font-semibold">
              local SEO news
            </Link>{" "}
            and audit your practice with our free{" "}
            <Link href="/resources/law-firm-seo-audit-checklist" className="text-[#534AB7] underline font-semibold">
              law firm SEO checklist
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Closing CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-[#534AB7] via-[#3C3489] to-[#0a0f2e] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#EEEDFE] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Exclusivity Guaranteed · One Law Firm Per Practice Area</span>
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Be the Katy Firm That Knows the Way.
          </h2>

          <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto mb-8">
            Stop losing lucrative Cinco Ranch, Fulshear, and Katy cases to downtown Houston billboard firms. Claim your free, confidential Katy Tear-Down today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="#tear-down-form"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-[#0a0f2e] font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <span>Get My Free Katy Tear-Down</span>
              <ArrowRight className="w-4 h-4 text-[#534AB7]" />
            </a>

            <a
              href="#diagnosis-tool"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-indigo-900/40 hover:bg-indigo-900/60 text-white font-bold text-base border border-white/20 transition-all"
            >
              <span>Diagnose Issues with Gemini</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Month-to-Month Terms
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direct Founder Access
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              90-Day Money-Back Guarantee
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Solution / Pain Band */}
      <KatyPainBanner id="painband-bottom" variant="bottom" />
    </>
  );
}
