'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Users, Building, Compass, Car } from 'lucide-react';

export default function TempeDemographyMap() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 bg-white px-3 py-1 rounded border border-slate-200">
            Geographic & Demographic Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-3">
            Why Tempe Is an Unmatched Legal Market in Maricopa County
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Tempe occupies the central nexus of the East Valley, connecting student populations, major corporate headquarters, and high-volume freeway thoroughfares.
          </p>
        </div>

        {/* 2-Column Layout: Visual + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          {/* Left: Real WebP Photo & Demographic Indicators */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
              <Image
                src="/images/locations/tempe-law-consultation.webp"
                alt="Tempe law firm client consultation room overlooking East Valley business corridor"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 550px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs font-mono font-medium text-slate-300">
                  Tempe Business Corridor · East Valley Regional Reach
                </p>
                <p className="text-sm font-bold mt-0.5">
                  High-Yield Retainer Consultation Hub
                </p>
              </div>
            </div>

            {/* Demographics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 block">Resident Population</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">185,000+</span>
                <span className="text-[11px] text-slate-500">Core Tempe municipal</span>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-500 block">ASU Student Body</span>
                <span className="text-xl font-bold text-[#4338ca] mt-0.5 block">75,000+</span>
                <span className="text-[11px] text-slate-500">Tempe Main Campus</span>
              </div>
              <div className="p-3.5 bg-white rounded-lg border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                <span className="text-xs font-semibold text-slate-500 block">Major Freeways</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">101 / 202 / 60</span>
                <span className="text-[11px] text-slate-500">Heavy collision corridors</span>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-6">
            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
              <div className="w-full h-80 sm:h-96 rounded-lg overflow-hidden border border-slate-200 relative">
                <iframe
                  title="Tempe, Arizona Legal Search Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106509.34444583162!2d-111.98906932454552!3d33.38843949818816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b089c0e663515%3A0x7ca45c6093370a24!2sTempe%2C%20AZ!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
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
                  Centroid: Tempe Municipal Complex (85281)
                </span>
                <span>East Valley Jurisdictional Grid</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Takeaway */}
        <div className="p-5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
          <p className="font-bold text-slate-900">Maricopa County Proximity Advantage:</p>
          <p className="leading-relaxed">
            Unlike suburban Phoenix law firms that must battle for the central downtown Phoenix cluster, Tempe firms sit directly at the convergence of Mesa, Chandler, Gilbert, and Scottsdale. Capturing Tempe search intent allows your firm to dominate cross-municipal referrals while maintaining localized Map Pack authority across all four neighboring East Valley markets.
          </p>
        </div>
      </div>
    </section>
  );
}
