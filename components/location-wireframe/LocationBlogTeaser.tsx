"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { CityPage } from "@/lib/city-pages";

export interface LocationBlogCard {
  id: string;
  href: string;
  badge: string;
  readTime: string;
  title: string;
  excerpt: string;
  thumbnail: string;
  plannedSlug: string;
}

const CITY_CUSTOM_CARDS: Record<
  string,
  {
    courtFocus: string;
    statuteHook: string;
    corridorHook: string;
  }
> = {
  detroit: {
    courtFocus: "Wayne County 3rd Circuit & Coleman A. Young Municipal Center",
    statuteHook: "Michigan No-Fault PIP (MCL 500.3135) & I-75/I-94 Truck Claims",
    corridorHook: "Downtown Detroit, Southfield & Metro Tri-County Map Pack",
  },
  "grand-rapids": {
    courtFocus: "Kent County 17th Circuit Court & 61st District Court",
    statuteHook: "West Michigan No-Fault Auto & US-131 / I-196 Commercial Crash Intent",
    corridorHook: "Monroe Ave NW, Medical Mile & East Beltline Map Pack",
  },
  cleveland: {
    courtFocus: "Cuyahoga County Court of Common Pleas & Justice Center",
    statuteHook: "Ohio ORC § 2315.18 Comparative Fault & I-90/I-71/I-480 Litigation",
    corridorHook: "Downtown Cleveland, Beachwood & Westlake 3-Pack Territory",
  },
  philadelphia: {
    courtFocus: "Philadelphia Court of Common Pleas (First Judicial District)",
    statuteHook: "PA Limited vs. Full Tort (75 Pa.C.S. § 1705) & I-95/I-76 Crash Claims",
    corridorHook: "Center City Market Street, King of Prussia & Main Line Map Pack",
  },
  albuquerque: {
    courtFocus: "Second Judicial District Court (Bernalillo County) & US District NM",
    statuteHook: "New Mexico Pure Comparative Fault & Bilingual I-25/I-40 Trucking SEO",
    corridorHook: "Lomas Blvd Legal District, Uptown & Rio Rancho Map Pack",
  },
  denton: {
    courtFocus: "Denton County Courts Building (16th, 158th, 211th & 362nd Districts)",
    statuteHook: "Texas CPRC Ch. 33 Proportionate Responsibility & I-35E/I-35W Merge Claims",
    corridorHook: "Downtown Denton Square, Corinth & Flower Mound 3-Pack",
  },
  katy: {
    courtFocus: "Harris, Fort Bend & Waller Tri-County District Courts",
    statuteHook: "I-10 Katy Freeway 18-Wheeler & Grand Parkway (SH-99) Collision SEO",
    corridorHook: "Cinco Ranch, Katy Mills & Energy Corridor GBP Radius",
  },
  "sugar-land": {
    courtFocus: "Fort Bend County Justice Center (240th, 268th, 400th & 458th Districts)",
    statuteHook: "High-Net-Worth Fort Bend Family Law, Probate & US-59/I-69 Injury Intent",
    corridorHook: "Sugar Land Town Square, First Colony & Telfair Map Pack",
  },
  "the-woodlands": {
    courtFocus: "Montgomery County District Courts (Conroe) & North Harris Venues",
    statuteHook: "Executive Divorce, Energy Corporate Litigation & I-45 North Corridor PI",
    corridorHook: "Town Center, Hughes Landing & Research Forest 3-Pack",
  },
  plano: {
    courtFocus: "Collin County Russell A. Steindam Courts Building & EDTX Plano Division",
    statuteHook: "Legacy West Corporate/IP Litigation, High-Asset Divorce & US-75/DNT PI",
    corridorHook: "Legacy West, Granite Park & Preston Road Legal Corridor",
  },
  tempe: {
    courtFocus: "Tempe Municipal Court & Maricopa County Southeast Facility (Mesa)",
    statuteHook: "ARS § 28-1381 DUI Defense, ASU Title IX & Loop 101/202 Crash SEO",
    corridorHook: "Mill Avenue, Rio Salado Tech Corridor & South Tempe Map Pack",
  },
  scottsdale: {
    courtFocus: "Maricopa County Superior Court & Scottsdale City Court",
    statuteHook: "ARS § 25-211 High-Net-Worth Community Property, Trust & Loop 101 PI",
    corridorHook: "Old Town Scottsdale, Kierland/Scottsdale Quarter & Gainey Ranch",
  },
  "san-jose": {
    courtFocus: "Santa Clara County Superior Court (191 N. First St) & NDCA San Jose",
    statuteHook: "Silicon Valley RSU/Equity Divorce, Trade Secret & US-101/I-880 Injury SEO",
    corridorHook: "Downtown San Jose, North First Street Tech Corridor & Santana Row",
  },
  "baton-rouge": {
    courtFocus: "19th Judicial District Court (East Baton Rouge) & MDLA Federal Court",
    statuteHook: "Louisiana Civil Code Art. 2315, 2-Year Prescription & I-10 Mississippi Bridge",
    corridorHook: "Downtown Third Street, Corporate Blvd & Bluebonnet Legal Corridor",
  },
  shreveport: {
    courtFocus: "1st JDC (Caddo Parish), 26th JDC (Bossier Parish) & WDLA Federal Court",
    statuteHook: "I-20 Cross-Border Freight Collisions, Haynesville Shale & Barksdale Military",
    corridorHook: "Texas Street Courthouse District, Line Avenue & Bossier City 3-Pack",
  },
};

const AVATAR = "/images/mubashar-sharif.jpg";

export default function LocationBlogTeaser({ page }: { page: CityPage }) {
  const custom = CITY_CUSTOM_CARDS[page.citySlug] || {
    courtFocus: `${page.city} & ${page.state} Trial Courts`,
    statuteHook: `${page.state} Statutory Practice-Area & High-Value Intake Architecture`,
    corridorHook: `${page.city} Downtown & Suburban Map Pack Corridors`,
  };

  const districtImg = `/images/locations/${page.citySlug}-legal-district.webp`;
  const consultImg = `/images/locations/${page.citySlug}-law-consultation.webp`;

  const cards: LocationBlogCard[] = [
    {
      id: `${page.citySlug}-blueprint`,
      href: "/blog/law-firm-seo-2026-guide",
      plannedSlug: `${page.citySlug}-law-firm-seo-blueprint-2026`,
      badge: `${page.city} Legal SEO`,
      readTime: "16-minute read",
      title: `${page.city}, ${page.stateAbbr} Law Firm SEO in 2026: Winning ${custom.courtFocus} Search Intent`,
      excerpt: `How ${page.city} managing partners outrank national legal directories across ${custom.courtFocus} through statutory entity hubs, YMYL compliance, and AI Overview citations.`,
      thumbnail: districtImg,
    },
    {
      id: `${page.citySlug}-gbp-calls`,
      href: "/blog/get-more-calls-from-google-business-profile",
      plannedSlug: `${page.citySlug}-lawyer-google-business-profile-calls`,
      badge: "Map Pack & GBP",
      readTime: "10-minute read",
      title: `How ${page.city} Attorneys Capture More 3-Pack Calls Across ${custom.corridorHook}`,
      excerpt: `The exact Google Business Profile category engineering, practitioner pin rules, and proximity signals that turn ${page.city} Map Pack impressions into signed retainers.`,
      thumbnail: consultImg,
    },
    {
      id: `${page.citySlug}-keywords`,
      href: "/blog/keyword-research-for-law-firms",
      plannedSlug: `${page.citySlug}-legal-keyword-research-guide`,
      badge: "Practice-Area Keywords",
      readTime: "10-minute read",
      title: `Keyword Research for ${page.city} Lawyers: Mapping ${custom.statuteHook}`,
      excerpt: `Why generic national legal keywords waste budget in ${page.city}, and how to structure practice-area clusters around ${custom.statuteHook} with bar-compliant copy.`,
      thumbnail:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=85&auto=format&fit=crop",
    },
    {
      id: `${page.citySlug}-maps-ai`,
      href: "/blog/google-maps-ranking-drop",
      plannedSlug: `${page.citySlug}-google-maps-ranking-recovery`,
      badge: "Maps & AI Overviews",
      readTime: "11-minute read",
      title: `Why ${page.city} Law Firm Map Pack Rankings Drop (And How to Recover Top-3 Visibility)`,
      excerpt: `Diagnosing sudden Google Maps ranking drops, competitor spam fighting, and generative AI citation recovery for ${page.city}, ${page.stateAbbr} law offices.`,
      thumbnail:
        "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=85&auto=format&fit=crop",
    },
  ];

  return (
    <section
      id="location-blog-insights"
      className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 font-sans"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 block mb-2">
              {page.city.toUpperCase()} LEGAL SEO GUIDES &amp; RESEARCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-neutral-950">
              {page.city}, {page.stateAbbr} Law Firm SEO &amp; Map Pack Insights
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Editorial playbooks tailored to {custom.courtFocus}, {page.city} Map Pack dynamics, and high-intent legal search in {page.state}.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-neutral-950 hover:bg-slate-100 transition-colors shrink-0"
          >
            <span>View All Legal SEO Guides</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4-Card HD Thumbnail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                <Image
                  src={card.thumbnail}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-950 shadow-2xs">
                  {card.badge}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-2">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{card.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-neutral-950 leading-snug group-hover:text-neutral-700 transition-colors line-clamp-3 mb-2.5">
                  {card.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {card.excerpt}
                </p>

                <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative block h-6 w-6 overflow-hidden rounded-full bg-slate-200">
                      <Image
                        src={AVATAR}
                        alt="Mubashar Sharif"
                        width={24}
                        height={24}
                        className="h-6 w-6 object-cover object-top"
                      />
                    </span>
                    <span className="text-xs font-semibold text-neutral-900">
                      Mubashar Sharif
                    </span>
                  </div>
                  <span className="text-xs font-bold text-neutral-950 group-hover:translate-x-0.5 transition-transform">
                    Read Guide →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
