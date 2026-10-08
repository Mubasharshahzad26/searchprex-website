// components/LocalCityMapSection.tsx
//
// Interactive Google Map and Local Legal Geofencing Hub for Location Pages.
// Features a real live Google Map iframe anchored to the city's legal district,
// courthouse directory, active neighborhood geofences, and bar association authority.

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Landmark,
  ShieldCheck,
  Scale,
  ExternalLink,
  Navigation,
  Compass,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export default function LocalCityMapSection({ page }: { page: CityPage }) {
  const mapQuery = encodeURIComponent(`${page.city}, ${page.state} Legal District Courthouse`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=m&z=13&output=embed`;
  const primaryPractice = page.practiceDemand[0]?.area ?? "Personal Injury";

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Top Header Strip */}
      <div className="border-b border-slate-100 bg-slate-900 px-6 py-5 text-white sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#534AB7]/30 text-indigo-400 border border-indigo-500/30">
              <Compass className="h-5 w-5 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-emerald-400 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Google Map & Local Geofencing
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">· {page.county}</span>
              </div>
              <h3 className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">
                {page.city}, {page.state} Legal District & Court Corridor
              </h3>
            </div>
          </div>

          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 border border-white/10"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Main Grid: Interactive Map + Local Geographic Signals */}
      <div className="grid lg:grid-cols-12">
        {/* Left: Interactive Google Map Iframe */}
        <div className="relative min-h-[360px] lg:min-h-[480px] lg:col-span-7 bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200 overflow-hidden">
          <iframe
            src={embedUrl}
            title={`${page.city}, ${page.state} Legal District and Courthouse Google Map`}
            className="h-full w-full min-h-[360px] lg:min-h-[480px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg bg-slate-950/85 px-3 py-1.5 text-[11px] font-medium text-slate-200 backdrop-blur border border-white/10 shadow">
            📍 Centered on {page.city} Municipal & County Legal Corridor
          </div>
        </div>

        {/* Right: Local Legal Signals & Court Directory */}
        <div className="p-6 sm:p-8 lg:col-span-5 flex flex-col justify-between bg-slate-50/50">
          <div className="space-y-6">
            {/* Map Pack Ranking Target Callout */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                <Sparkles className="h-4 w-4" />
                <span>Google Map 3-Pack Target</span>
              </div>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
                Over <strong>70% of high-intent legal searches</strong> in {page.city} originate from mobile users viewing the map pack. We synchronize your Google Business Profile with these exact local geographic coordinates.
              </p>
            </div>

            {/* Courts We Reference */}
            <div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <Landmark className="h-3.5 w-3.5 text-[#534AB7]" />
                  Courts Anchored in Content
                </span>
                <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700">
                  {page.courts.length} Venues
                </span>
              </div>
              <ul className="mt-2.5 space-y-2">
                {page.courts.map((court, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-200/80 bg-white p-2.5 text-xs text-[#0a0f2e] shadow-2xs"
                  >
                    <Scale className="h-4 w-4 shrink-0 text-[#534AB7] mt-0.5" />
                    <div>
                      <span className="font-semibold">{court}</span>
                      <span className="block text-[11px] text-slate-500">
                        {page.county} Jurisdiction
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neighborhoods & Geofenced Coverage */}
            <div>
              <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Navigation className="h-3.5 w-3.5 text-emerald-600" />
                Geofenced Search Neighborhoods
              </span>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {page.neighborhoods.map((n, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 shadow-2xs"
                  >
                    <MapPin className="h-3 w-3 text-red-500 shrink-0" />
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Bar Association Authority */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3 flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#0a0f2e]">Local Bar Association Authority</span>
                <p className="text-slate-600 mt-0.5">{page.barAssociation}</p>
              </div>
            </div>
          </div>

          {/* Bottom Audit CTA */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <Link
              href="/free-audit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a0f2e] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a2366] transition-colors"
            >
              <span>Check Your Firm&apos;s Map Pack Position in {page.city}</span>
              <span className="text-emerald-400">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
