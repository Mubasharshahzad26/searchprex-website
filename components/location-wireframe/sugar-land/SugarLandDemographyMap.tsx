"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Users, DollarSign, Landmark, Compass } from "lucide-react";

export default function SugarLandDemographyMap() {
  const stats = [
    {
      label: "Fort Bend County Population",
      value: "850,000+",
      subtext: "One of the fastest-growing counties in America",
      icon: Users,
    },
    {
      label: "Median Household Income",
      value: "$132,500",
      subtext: "First Colony, Sweetwater & Riverstone enclaves",
      icon: DollarSign,
    },
    {
      label: "County Seat & Court Center",
      value: "Richmond, TX",
      subtext: "Fort Bend County Justice Center venues",
      icon: Landmark,
    },
    {
      label: "Critical Transit Corridors",
      value: "I-69 & HWY 6",
      subtext: "Heavy commuter vehicle & truck crash litigation",
      icon: Compass,
    },
  ];

  return (
    <section id="map" className="py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-neutral-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Local Market Demographics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 tracking-tight mb-4">
            Sugar Land Demographics, Service Area &amp; Court Corridor Map
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Sugar Land combines extraordinary household wealth with rapid suburban commercial growth. Spanning premier master-planned neighborhoods like First Colony, Sweetwater, and Avalon, its residents seek experienced counsel with proven command of Fort Bend County courts.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {s.label}
                  </span>
                  <Icon className="w-4 h-4 text-neutral-900" />
                </div>
                <div className="text-3xl font-extrabold text-neutral-950">
                  {s.value}
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  {s.subtext}
                </div>
              </div>
            );
          })}
        </div>

        {/* Photography & Interactive Google Map Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center mb-8">
          {/* Left: Verified Local Sugar Land Photos */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
              <Image
                src="/images/locations/sugar-land-legal-district.webp"
                alt="Sugar Land Town Square and commercial legal corridor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="text-white font-extrabold text-base">
                    Sugar Land Town Square &amp; Highway 6 Corridor
                  </div>
                  <div className="text-slate-300 text-xs font-medium">
                    Serving First Colony, Sweetwater, and Riverstone
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
              <Image
                src="/images/locations/sugar-land-law-consultation.webp"
                alt="Attorney conducting consultation with client in Sugar Land Texas"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <div>
                  <div className="text-white font-extrabold text-base">
                    Client Consultation &amp; Asset Protection
                  </div>
                  <div className="text-slate-300 text-xs font-medium">
                    Tailored Legal Strategy for Fort Bend County Families
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map */}
          <div className="lg:col-span-7 h-[535px] rounded-3xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
            <iframe
              title="Sugar Land Texas Legal Service Area Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110892.42777174676!2d-95.69837920786968!3d29.598444583162234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e70ad2559b95%3A0x6b805c86c1d00c3c!2sSugar%20Land%2C%20TX!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
