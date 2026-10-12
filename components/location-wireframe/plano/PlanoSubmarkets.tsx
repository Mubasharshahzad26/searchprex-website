'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Building, CheckCircle2 } from 'lucide-react';

export default function PlanoSubmarkets() {
  const submarkets = [
    {
      name: 'Frisco',
      county: 'Collin & Denton Counties',
      desc: 'Rapidly growing affluent executive corridor (PGA, Stonebriar). High search volume for high-asset divorce and commercial agreements.',
      practice: 'Family Law & Business',
      href: '/locations/texas/denton',
    },
    {
      name: 'Allen',
      county: 'Collin County',
      desc: 'Family-dense suburban market with strong demand for estate planning, living trusts, and Collin County family court filings.',
      practice: 'Estate Planning & Probate',
      href: '/services/law-firm-seo/estate-planning',
    },
    {
      name: 'McKinney',
      county: 'Collin County Seat',
      desc: 'Home of the Collin County Courthouse. Litigation and criminal trial cases are centralized here.',
      practice: 'Civil & Criminal Defense',
      href: '/services/law-firm-seo/criminal-defense',
    },
    {
      name: 'Richardson',
      county: 'Collin & Dallas Counties',
      desc: 'Telecom corridor and tech corporate center. Drives H-1B, L-1 immigration filings and technology dispute retainers.',
      practice: 'Business Immigration & Tech',
      href: '/services/law-firm-seo',
    },
    {
      name: 'Murphy & Parker',
      county: 'Collin County',
      desc: 'High-income residential enclaves requiring discreet estate transfer, wealth preservation, and asset protection.',
      practice: 'Trust & Estate Administration',
      href: '/services/law-firm-seo/estate-planning',
    },
    {
      name: 'Prosper & Celina',
      county: 'Collin & Denton Counties',
      desc: 'Explosive northern growth corridor with high land development, construction dispute, and family law demand.',
      practice: 'Commercial & Family Law',
      href: '/locations/texas/denton',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#534AB7]/10 text-[#534AB7] border border-[#534AB7]/20 mb-3">
            <Building className="w-3.5 h-3.5" />
            Collin County Sub-Market Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Law Firm SEO Near Plano: Frisco, Allen, McKinney & Richardson
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Plano clients search across a continuous corridor of fast-growing cities, but Google and court jurisdictions treat each as a distinct local market. We build dedicated high-intent submarket spokes so your firm captures qualified retainers across the entire region.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {submarkets.map((sub, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-extrabold text-lg text-[#0a0f2e]">{sub.name}</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#534AB7] border border-indigo-100">
                    {sub.county}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{sub.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {sub.practice}
                </span>
                <Link
                  href={sub.href}
                  className="text-xs font-bold text-[#534AB7] hover:text-[#3C3489] inline-flex items-center gap-1"
                >
                  Explore spoke <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
