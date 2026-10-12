'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, ArrowRight, Sparkles, ShieldCheck, MapPin } from 'lucide-react';

export default function WoodlandsFaqAndCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is law firm SEO in The Woodlands, Texas?',
      a: 'Law firm SEO in The Woodlands is the discipline of optimizing a practice so it appears at the top of Google’s Local 3-Pack, organic search results, and AI answers (ChatGPT, Google AI Overviews, Perplexity) when residents search for legal counsel. It requires calibrating your Google Business Profile, authoring county-accurate venue silos (Montgomery vs Harris), deploying dedicated village pages, and tracking inbound client phone calls.',
      linkHref: '/services/law-firm-seo',
      linkText: 'Learn how legal SEO works',
    },
    {
      q: 'Which court handles a case for someone who lives in The Woodlands?',
      a: 'Most cases go to the Montgomery County district and county courts located in Conroe (301 N Main St). However, Creekside Park village lies south of Spring Creek in Harris County, meaning those cases are heard in downtown Houston courts. For divorce, Texas requires six months of Texas residency and 90 days in the specific county before filing (Tex. Fam. Code § 6.301). Our practice silos clearly explain venue to prospective clients.',
      linkHref: '/services/law-firm-seo/family-law',
      linkText: 'Explore Family Law SEO',
    },
    {
      q: 'Is The Woodlands an incorporated city?',
      a: 'No, The Woodlands is an unincorporated, master-planned community governed by The Woodlands Township. Because there is no municipal city court, agencies that write generic "Woodlands Municipal Court" content damage your credibility. We build content that accurately addresses the Montgomery County Commissioners Court and Conroe judicial benches.',
      linkHref: '/locations/texas',
      linkText: 'View Texas Locations',
    },
    {
      q: 'How much does law firm SEO in The Woodlands cost?',
      a: 'SearchPrex retainers for Woodlands law firms range from $1,200 to $2,500 per month depending on the number of practice verticals and village landing hubs included. All engagements are strictly month-to-month with no long-term lock-in contracts, and our complimentary Venue & AI Visibility Review comes first so you review our blueprint before investing.',
      linkHref: '/free-audit',
      linkText: 'Request Complimentary Review',
    },
    {
      q: 'What is included in the complimentary review?',
      a: 'Your complimentary review identifies Montgomery vs Harris County venue gaps, missing village landing pages (Alden Bridge, Sterling Ridge, Creekside), Google Business Profile category misalignments, and tests whether ChatGPT and Gemini cite your firm across 20+ prompts. You receive a concise 1-page summary and personal video walkthrough with zero obligation.',
      linkHref: '/free-audit',
      linkText: 'Claim Your Review',
    },
    {
      q: 'How long does law firm SEO take in The Woodlands?',
      a: 'Google Business Profile and Map Pack improvements typically emerge within 60 to 90 days as local entity citations and review workflows take hold. Competitive organic rankings compound over 4 to 6 months. We back every partnership with our 90-day performance milestone guarantee.',
      linkHref: '/case-studies',
      linkText: 'See Verified Case Studies',
    },
    {
      q: 'Can SEO help my firm appear in ChatGPT and Google AI Overviews?',
      a: 'Yes. Generative AI tools do not browse the web like humans; they synthesize trusted, answer-first paragraphs that cite authoritative statutory sources. SearchPrex structures your content to answer legal questions directly, deploys LegalService JSON-LD schema, and publishes an llms.txt protocol to maximize AI citation rates.',
      linkHref: '/ai-search',
      linkText: 'Our AI Search Approach',
    },
    {
      q: 'Do you cover Conroe, Spring, Shenandoah, Tomball and Magnolia?',
      a: 'Yes. Woodlands residents frequently search neighboring communities, and clients in Conroe or Spring seek Woodlands attorneys. We build dedicated submarket landing hubs with verified courthouse jurisdictions for each area you serve without creating duplicate content.',
      linkHref: '/locations/texas',
      linkText: 'Explore All Texas Hubs',
    },
    {
      q: 'What legal topics should a Woodlands estate planning page cover?',
      a: 'A dominant Woodlands estate planning page must address Texas revocable living trusts, pour-over wills, statutory durable powers of attorney, medical directives, and asset protection for business owners. It must also cover probate administration, independent administration, muniment of title under the Texas Estates Code, and homestead protections.',
      linkHref: '/services/law-firm-seo/estate-planning',
      linkText: 'Estate Planning SEO',
    },
    {
      q: 'Should a Woodlands firm target Houston keywords first?',
      a: 'No. Broad Houston-wide keywords are heavily contested by mega-firms with decade-old domain authority and massive paid ad budgets. Targeting The Woodlands, its 8 villages, Conroe, and Montgomery County courts delivers faster page-one rankings and connects you with affluent clients who prefer an attorney within minutes of their home.',
      linkHref: '/locations/texas/katy',
      linkText: 'Compare: Katy vs Houston Strategy',
    },
  ];

  const texasCities = [
    { name: 'Houston', slug: 'houston' },
    { name: 'Dallas', slug: 'dallas' },
    { name: 'Austin', slug: 'austin' },
    { name: 'San Antonio', slug: 'san-antonio' },
    { name: 'Fort Worth', slug: 'fort-worth' },
    { name: 'El Paso', slug: 'el-paso' },
    { name: 'Arlington', slug: 'arlington' },
    { name: 'Plano', slug: 'plano' },
    { name: 'Frisco', slug: 'frisco' },
    { name: 'McKinney', slug: 'mckinney' },
    { name: 'Denton', slug: 'denton' },
    { name: 'Sugar Land', slug: 'sugar-land' },
    { name: 'Katy', slug: 'katy' },
    { name: 'The Woodlands', slug: 'the-woodlands' },
    { name: 'Pearland', slug: 'pearland' },
    { name: 'League City', slug: 'league-city' },
    { name: 'Round Rock', slug: 'round-rock' },
    { name: 'College Station', slug: 'college-station' },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* FAQ Accordion */}
      <div>
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-50 text-neutral-900 border border-slate-100 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-900" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            The Woodlands Law Firm SEO FAQs
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Straightforward answers regarding court venue silos, village optimization, AI Overviews, and how SearchPrex positions law practices in Montgomery and Harris counties.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4 space-y-3">
                    <p>{faq.a}</p>
                    <div>
                      <Link
                        href={faq.linkHref}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-950"
                      >
                        <span>{faq.linkText}</span>
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

      {/* Texas Legal Network Links */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-neutral-800" />
          <h3 className="text-base font-bold text-slate-900">
            SearchPrex Texas Legal Practice Network
          </h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          SearchPrex engineers hyper-localized search architecture for law firms across Texas. Explore our specialized market analyses:
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {texasCities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/texas/${city.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                city.slug === 'the-woodlands'
                  ? 'bg-neutral-900 text-white border-neutral-800 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-neutral-900'
              }`}
            >
              {city.name} Legal SEO
            </Link>
          ))}
        </div>
      </div>

      {/* Closing CTA Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-neutral-900 to-slate-900 border border-neutral-900/60 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neutral-700/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-700/20 text-slate-300 border border-neutral-700/30">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            Zero-Obligation • Founder Review
          </div>

          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Ready to Capture High-Net-Worth Retainers in The Woodlands?
          </h3>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Stop losing qualified estate planning, high-asset divorce, and commercial cases to downtown Houston firms. Request your complimentary Venue & AI Visibility Review today and inspect your custom growth roadmap.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#diagnosis-tool"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/50 hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-slate-200" />
              Claim Complimentary Review
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-800 hover:text-white border border-slate-700 transition-all"
            >
              View Month-to-Month Retainers
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              1 Firm Per Practice Exclusivity
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              90-Day Milestone Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Direct Founder Collaboration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
