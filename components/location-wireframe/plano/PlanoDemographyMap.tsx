'use client';

import React from 'react';
import { MapPin, Building, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function PlanoDemographyMap() {
  const stats = [
    {
      label: 'Median Household Income',
      value: '$116,400',
      icon: DollarSign,
      detail: 'Affluent executive demographic with substantial real estate, stock portfolios, and discretionary spend.',
    },
    {
      label: 'Corporate Relocations',
      value: 'Legacy West Corridor',
      icon: Building,
      detail: 'Headquarters for Toyota North America, Liberty Mutual, JPMorgan Chase, and Boeing Global Services.',
    },
    {
      label: 'Collin County Growth',
      value: '+36% Decade Growth',
      icon: TrendingUp,
      detail: 'One of the fastest-expanding suburban metroplexes in the United States, driving steady legal demand.',
    },
    {
      label: 'Active Market Population',
      value: '290,000+ Residents',
      icon: Users,
      detail: 'Surrounded by another 500,000+ residents across immediate adjacent submarkets (Frisco, Allen, McKinney).',
    },
  ];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-[#534AB7] border border-indigo-100 mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Local Demographic Anchor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0a0f2e] tracking-tight">
            Plano & Collin County Demographic Intelligence
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Plano is an economic powerhouse where executive relocations and high-income families seek specialized, discrete legal counsel.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Stats Grid */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#534AB7]/10 text-[#534AB7] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{s.label}</p>
                    <p className="text-2xl font-extrabold text-[#0a0f2e] mt-1">{s.value}</p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-3 pt-3 border-t border-slate-100">
                    {s.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white min-h-[340px] flex flex-col">
            <div className="p-4 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#534AB7]" />
              <span>Plano & Collin County Map Pack Geo-Target</span>
            </div>
            <div className="flex-1 w-full min-h-[290px] relative">
              <iframe
                title="Plano TX Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107055.60252118324!2d-96.81881744179688!3d33.01984310000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c19f77b45974b%3A0xb9ec9ba4f647678f!2sPlano%2C%20TX!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
