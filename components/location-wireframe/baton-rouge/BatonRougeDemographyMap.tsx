'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

export default function BatonRougeDemographyMap() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Geographic & Demographic Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Why Baton Rouge Anchors Louisiana&apos;s High-Yield Legal Market
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Baton Rouge is the state capital and industrial heart of Louisiana, generating high-density litigation dockets across East Baton Rouge Parish and the Mississippi River industrial corridor.
          </p>
        </div>

        {/* 2-Column Layout: Visual + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left: Real WebP Photo & Demographic Indicators */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image
                src="/images/locations/baton-rouge-law-consultation.webp"
                alt="Baton Rouge attorney consulting client on Louisiana Civil Code prescription deadlines"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-mono font-medium text-slate-300">
                  Downtown Baton Rouge · Capital Law Practice
                </p>
                <p className="text-sm font-bold mt-0.5">
                  Client Intake & Statutory Strategy
                </p>
              </div>
            </div>

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 block">Parish Population</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">450,000+</span>
                <span className="text-[11px] text-slate-500">East Baton Rouge base</span>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 block">Median Income</span>
                <span className="text-xl font-bold text-neutral-950 mt-0.5 block">$82,400+</span>
                <span className="text-[11px] text-slate-500">Suburbs $115k+</span>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-xs font-semibold text-slate-500 block">Interstate Nexus</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">I-10 / I-12</span>
                <span className="text-[11px] text-slate-500">Heavy freight routes</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-6">
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-full h-80 sm:h-96 rounded-lg overflow-hidden border border-slate-200 relative">
                <iframe
                  title="Baton Rouge, Louisiana Legal Search Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110118.57768567104!2d-91.22987841108269!3d30.458282928810777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8626a4891b0128cf%3A0xc48c03b1e326b5e0!2sBaton%20Rouge%2C%20LA!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-[0.9]"
                />
              </div>
              <div className="p-3 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-700" />
                  Centroid: 19th JDC Courthouse District (70801)
                </span>
                <span>East Baton Rouge Parish Jurisdictional Grid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Takeaway */}
        <div className="p-5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
          <p className="font-bold text-slate-900">Capital Area Market Dynamics:</p>
          <p className="leading-relaxed">
            Unlike New Orleans billboard attorneys who attempt to blanket the entire state with generic branding campaigns, Baton Rouge law firms sit directly at the epicenter of state government, the 19th Judicial District Court, and the Mississippi River petrochemical corridor. By capturing hyper-local East Baton Rouge search intent, your firm establishes an unshakeable local 3-Pack moat that outside aggregators cannot penetrate.
          </p>
        </div>
      </div>
    </section>
  );
}
