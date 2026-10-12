'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Shield, ArrowRight, Sparkles, Scale, BarChart3, Building } from 'lucide-react';
import type { CityPage } from '@/lib/city-pages';

interface SanJoseHeroProps {
  page?: CityPage;
}

export default function SanJoseHero({ page }: SanJoseHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white text-slate-900 pt-20 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold tracking-wide uppercase bg-slate-100 text-slate-800 border border-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-700" />
            Silicon Valley & Santa Clara County Legal Search
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
            <Shield className="w-3.5 h-3.5 text-slate-700" />
            100% Conflict-Free: One Firm Per Practice Area
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Semantic Headline & Value Proposition */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14] mb-6">
              San Jose Law Firm SEO:{' '}
              <span className="text-neutral-950 underline decoration-slate-300 decoration-2 underline-offset-8">
                Silicon Valley Retainer Engine
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mb-8">
              San Jose law firm SEO is the proven client acquisition engine for Silicon Valley attorneys who demand high-value tech retainers rather than vanity website traffic. SearchPrex engineers technical search supremacy across San Jose, Cupertino, Sunnyvale, and Santa Clara County. Whether navigating complex executive severance and non-compete voidance under Cal. Bus. & Prof. Code § 16600, dividing unvested RSUs and founder options in high-asset divorce, or litigating startup IP trade secrets, our proprietary local framework captures tech clients the second they seek legal counsel.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href="#reality-check-form"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg text-base font-semibold text-white bg-neutral-900 hover:bg-neutral-800 transition-all duration-150 shadow-md shadow-slate-100 hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-slate-100" />
                Request Free Reality Check
              </a>
              <Link
                href="/tools/serp-checker"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 transition-all duration-150 shadow-sm"
              >
                Test Silicon Valley SERP Rankings
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </Link>
            </div>

            {/* Fast Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">$140k+</p>
                <p className="text-xs text-slate-600 font-medium mt-1">Median Household Income</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">Top 3</p>
                <p className="text-xs text-slate-600 font-medium mt-1">Google Map Pack Guarantee</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">Zero</p>
                <p className="text-xs text-slate-600 font-medium mt-1">Long-Term Contract Lock-In</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Card & Floating Animated UI Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-xl">
              {/* Image Container with WebP City Photo */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                <Image
                  src="/images/locations/san-jose-legal-district.webp"
                  alt="Downtown San Jose commercial and Santa Clara County courthouse district"
                  fill
                  priority
                  className="object-cover object-center filter saturate-[0.95]"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-900/80 text-slate-200 text-xs font-medium border border-slate-700">
                    <Building className="w-3.5 h-3.5" />
                    Silicon Valley Legal District
                  </span>
                  <p className="text-sm font-semibold mt-1.5 text-slate-100">
                    Santa Clara County Jurisdictional Core
                  </p>
                </div>
              </div>

              {/* Data & Strategic Metrics Strip */}
              <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3.5">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">Jurisdiction Focus</span>
                  <span className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">Santa Clara County Superior Court & N.D. Cal</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
                  <span className="font-semibold text-slate-700">Target Search Queries</span>
                  <span className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">Tech Severance, RSU Divorce, IP</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Average PPC Cost (San Jose Employment)</span>
                  <span className="font-mono text-red-700 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">$324.80 / click</span>
                </div>
              </div>
            </div>

            {/* Floating Element 1: Top Right Live Rank Badge */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: [0, -6, 0], opacity: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-5 -right-3 hidden sm:flex items-center gap-3 p-3.5 rounded-lg bg-white border border-slate-300 shadow-lg"
            >
              <div className="w-9 h-9 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-neutral-950">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">#1 Map Pack Ranking</p>
                <p className="text-[11px] text-slate-600">Tech Employment Lawyer San Jose</p>
              </div>
            </motion.div>

            {/* Floating Element 2: Bottom Left Exclusivity Pill */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: [0, 6, 0], opacity: 1 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-5 -left-3 hidden sm:flex items-center gap-2.5 p-3 rounded-lg bg-white border border-slate-300 shadow-lg"
            >
              <Scale className="w-4 h-4 text-neutral-950" />
              <span className="text-xs font-semibold text-slate-800">
                1-Firm Practice Exclusivity Locked
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
