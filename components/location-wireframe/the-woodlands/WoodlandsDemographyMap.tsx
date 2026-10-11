'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Users, DollarSign, Home, Building, ExternalLink } from 'lucide-react';

export default function WoodlandsDemographyMap() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-[#3C3489] border border-indigo-100 mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#534AB7]" />
          Local Demographics & Market Geography
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          The Woodlands Legal Market & Client Demographics
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          The Woodlands represents one of the most affluent master-planned enclaves in the United States. Ranking in this submarket requires precise alignment with executive wealth indicators and distinct village boundaries.
        </p>
      </div>

      {/* Demographic Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-indigo-700">
            <Users className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Population</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">~119,000</div>
          <div className="text-[11px] text-slate-500">Across 8 Master-Planned Villages</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-emerald-700">
            <DollarSign className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Median Income</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">$145,000+</div>
          <div className="text-[11px] text-slate-500">Top 5% in State of Texas</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-indigo-700">
            <Home className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Homeownership</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">72.4%</div>
          <div className="text-[11px] text-slate-500">Substantial Real Property Assets</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-indigo-700">
            <Building className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Median Home</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">$540,000+</div>
          <div className="text-[11px] text-slate-500">Executive Luxury Estates to $3M+</div>
        </div>
      </div>

      {/* Local Images & Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm group">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <Image
              src="/images/locations/the-woodlands-legal-district.webp"
              alt="The Woodlands Town Center Legal and Corporate District"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-indigo-600/90 text-white uppercase tracking-wider">
                Town Center & Waterway
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                The Woodlands Legal & Commercial District
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Lake Robbins Dr, Waterway Square, and Town Center executive suites.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm group">
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <Image
              src="/images/locations/the-woodlands-law-consultation.webp"
              alt="Private Law Firm Consultation in The Woodlands, TX"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-600/90 text-white uppercase tracking-wider">
                Executive Consultation
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Discreet Wealth & Estate Strategy
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Protecting business succession and family assets across Alden Bridge & Sterling Ridge.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              The Woodlands Geographic Center & Surrounding Villages
            </h3>
            <p className="text-xs text-slate-500">
              Interactive map centered on The Woodlands Township (Town Center & Waterway).
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=The+Woodlands+TX"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#534AB7] hover:text-[#3C3489]"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
          <iframe
            title="The Woodlands, Texas Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110543.68412630716!2d-95.54593414981451!3d30.165814588722238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864736b485304b57%3A0x6b45d2f7823e20ec!2sThe%20Woodlands%2C%20TX!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Key Corridors: I-45, Woodlands Pkwy, Research Forest Dr, Kuykendahl Rd, SH 242</span>
          <span className="font-medium text-slate-700">Montgomery & Harris Counties, TX</span>
        </div>
      </div>
    </section>
  );
}
