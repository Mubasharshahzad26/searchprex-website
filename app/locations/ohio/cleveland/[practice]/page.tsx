// app/locations/ohio/cleveland/[practice]/page.tsx
// Hyper-targeted practice-specific sub-pages for Cleveland, Ohio law firm SEO.
// 100% Light Theme aligned with the main Cleveland page.
// Server Component with complete Schema.org JSON-LD (Service, FAQPage, BreadcrumbList).

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Scale,
  MapPin,
  Clock,
  Sparkles,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Building2,
  FileText,
  HeartHandshake,
  UserCheck,
  FlaskConical,
  PhoneCall
} from "lucide-react";
import { Breadcrumb } from "@/components/layout";
import Image from "next/image";
import ClevelandInteractiveMap from "@/components/locations/ClevelandInteractiveMap";
import ClevelandSubmarketSwitcher from "@/components/locations/ClevelandSubmarketSwitcher";
import ClevelandFounderProof from "@/components/locations/ClevelandFounderProof";
import ClevelandCorridorCards from "@/components/locations/ClevelandCorridorCards";
import ClevelandSubpageAuditForm from "@/components/locations/ClevelandSubpageAuditForm";
import {
  CLEVELAND_PRACTICES,
  getClevelandPractice,
  type ClevelandPracticePage
} from "@/lib/cleveland-practice-pages";
import { founderRef, organizationRef, SITE, websiteRef } from "@/lib/site-schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLEVELAND_PRACTICES.map((p) => ({ practice: p.slug }));
}

interface PageProps {
  params: Promise<{ practice: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { practice: slug } = await params;
  const practice = getClevelandPractice(slug);
  if (!practice) return {};

  const url = `${SITE}/locations/ohio/cleveland/${practice.slug}`;

  return {
    title: practice.metaTitle,
    description: practice.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: practice.metaTitle,
      description: practice.metaDescription,
      url,
      siteName: "SearchPrex",
      type: "website",
      images: [
        {
          url: practice.heroVisual?.imageUrl ? `${SITE}${practice.heroVisual.imageUrl}` : `${SITE}/images/services/law-firm/city-cleveland-ohio-law-firm-seo.webp`,
          width: 1200,
          height: 630,
          alt: `${practice.practiceTitle} - SearchPrex Legal SEO`,
        },
      ],
    },
  };
}

export default async function ClevelandPracticeAreaPage({ params }: PageProps) {
  const { practice: slug } = await params;
  const practice = getClevelandPractice(slug);

  if (!practice) {
    notFound();
  }

  const url = `${SITE}/locations/ohio/cleveland/${practice.slug}`;
  const otherPractices = CLEVELAND_PRACTICES.filter((p) => p.slug !== practice.slug);
  const primaryPinQuery = practice.mapSection?.pins?.[0]?.query || "1200+Ontario+St,+Cleveland,+OH+44113";
  const heroImageUrl = practice.heroVisual?.imageUrl || "/images/services/law-firm/cleveland-ohio-personal-injury-law-firm-seo-district.webp";

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: practice.practiceTitle,
        description: practice.metaDescription,
        image: `${SITE}${heroImageUrl}`,
        isPartOf: websiteRef,
        about: { "@id": `${url}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: "2026-11-27",
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: practice.practiceTitle,
        serviceType: `${practice.name} SEO`,
        description: practice.metaDescription,
        url,
        provider: organizationRef,
        hasMap: `https://maps.google.com/maps?q=${primaryPinQuery}`,
        image: `${SITE}${heroImageUrl}`,
        areaServed: [
          { "@type": "City", name: "Cleveland", containedInPlace: { "@type": "State", name: "Ohio" } },
          { "@type": "AdministrativeArea", name: "Cuyahoga County" },
          { "@type": "City", name: "Westlake" },
          { "@type": "City", name: "Beachwood" },
          { "@type": "City", name: "Lakewood" },
          { "@type": "City", name: "Parma" },
        ],
        knowsAbout: [
          "Ohio Revised Code",
          "Cuyahoga County Court of Common Pleas",
          "Cleveland Municipal Court",
          "Ohio Rule of Professional Conduct 7.3",
          practice.statutes,
          ...(practice.statutesList ? practice.statutesList.map((s) => `${s.code}: ${s.title}`) : []),
          ...(practice.venuesList ? practice.venuesList.map((v) => v.name) : []),
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: practice.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
          { "@type": "ListItem", position: 3, name: "Ohio", item: `${SITE}/locations/ohio` },
          { "@type": "ListItem", position: 4, name: "Cleveland", item: `${SITE}/locations/ohio/cleveland` },
          { "@type": "ListItem", position: 5, name: practice.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "Ohio", href: "/locations/ohio" },
          { label: "Cleveland", href: "/locations/ohio/cleveland" },
          { label: practice.name },
        ]}
      />

      <main className="w-full bg-white text-slate-900 font-sans selection:bg-neutral-900 selection:text-white">
        
        {/* 1. Hero Section (100% Light Theme Aligned) */}
        <section className="relative overflow-hidden bg-white pt-10 pb-14 md:pt-14 md:pb-20 border-b border-slate-200">
          {/* Subtle Ambient Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Main Column: Copy, Metrics & CTAs */}
              <div className="lg:col-span-7 space-y-6">
                {/* Eyebrow Badges */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-neutral-800" />
                    <span>{practice.eyebrowBadge || `${practice.name} SEO · Cleveland, OH`}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 border border-slate-300 text-neutral-900 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
                    <span>1-Firm Cuyahoga Exclusivity</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-neutral-900 text-white border border-neutral-900 px-3 py-1 text-xs font-bold">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>{practice.badge}</span>
                  </span>
                </div>

                {/* H1 Headline */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-950 leading-[1.14] tracking-tight">
                  {practice.h1}
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  {practice.lead}
                </p>

                {/* Quick Metrics Bar (Clean Executive Light Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Typical Google Ads CPC</span>
                    <span className="text-xl sm:text-2xl font-black text-neutral-950 mt-1 block">{practice.cpc}</span>
                    <span className="text-[11px] text-slate-600 mt-0.5 block">{practice.ppcMonthlyBurn}</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Avg. Signed Case Value</span>
                    <span className="text-xl sm:text-2xl font-black text-neutral-950 mt-1 block">{practice.caseValue}</span>
                    <span className="text-[11px] text-slate-600 mt-0.5 block">Estimated fee per client</span>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">SearchPrex Flat Retainer</span>
                    <span className="text-xl sm:text-2xl font-black text-neutral-950 mt-1 block">$1,200 / mo</span>
                    <span className="text-[11px] text-slate-700 font-semibold mt-0.5 block">Includes 24/7 AI Intake Engine</span>
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="#subpage-audit"
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-7 py-3.5 text-sm sm:text-base shadow-sm transition-all"
                  >
                    <span>{practice.ctaLabel || (practice.slug === "personal-injury" ? "Get My Free 24-Hour Cleveland PI Audit" : `Request Free 24h ${practice.name} Audit`)}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link
                    href="/locations/ohio/cleveland"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-neutral-900 font-semibold px-6 py-3.5 text-sm transition-all"
                  >
                    <span>← Back to Cleveland Law Firm SEO Hub</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Dynamic Practice Hero Visual + Map Pack Preview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm group">
                  <Image
                    src={heroImageUrl}
                    alt={practice.heroVisual?.altText || "Downtown Cleveland legal district near Cuyahoga County Justice Center for personal injury law firm SEO"}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />
                  
                  {/* Subtle Overlay Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] font-bold text-neutral-950 border border-slate-200 shadow-2xs flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-900" />
                    <span>{practice.heroVisual?.badgeLabel || "Downtown Cleveland · Cuyahoga County Jurisdiction"}</span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <span className="text-[11px] font-medium text-white/90 block mb-0.5 drop-shadow-xs">
                      {practice.heroVisual?.districtSubtitle || "Ontario St Legal District · 1200 Ontario St"}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-white leading-tight drop-shadow-xs">
                      {practice.heroVisual?.districtTitle || "Cuyahoga County Justice Center District"}
                    </p>
                  </div>
                </div>

                {/* Clean Factual Jurisdiction & National Service Bar (No fake reviews) */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Territory &amp; Architecture
                    </span>
                    <span className="font-semibold text-neutral-950">
                      Cuyahoga County · 1-Firm Exclusivity
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 font-semibold">
                    <Link
                      href={practice.servicePillarHref || "/services/law-firm-seo"}
                      className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900"
                    >
                      {practice.servicePillarLabel || "Law Firm SEO Framework"} →
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 1.5. AEO / GEO Quick Answer Capsule & Channel Comparison Table */}
        <section className="py-10 lg:py-14 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1.5">
                Quick Answer · Cleveland {practice.name} Acquisition Economics
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight mb-2.5">
                How Cleveland {practice.name} Firms Rank Organically Without Paying {practice.cpc}
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-4xl">
                {practice.quickAnswer || `${practice.heroTakeaway} At a flat $1,200/month retainer with strict 1-firm Cuyahoga County exclusivity, SearchPrex replaces recurring ${practice.ppcMonthlyBurn} Google Ads burn with owned Map Pack visibility, Ohio statutory authority, and under-30-second Rule 7.3-compliant intake.`}
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    <th className="py-3.5 px-4">Acquisition Channel</th>
                    <th className="py-3.5 px-4">Monthly Cost Structure</th>
                    <th className="py-3.5 px-4">Google Maps 3-Pack</th>
                    <th className="py-3.5 px-4">Cuyahoga Exclusivity</th>
                    <th className="py-3.5 px-4">After-Hours Intake</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-neutral-950">Google Ads (PPC)</td>
                    <td className="py-3.5 px-4">{practice.cpc} ({practice.ppcMonthlyBurn})</td>
                    <td className="py-3.5 px-4">Ad slot only (stops when budget pauses)</td>
                    <td className="py-3.5 px-4">No — auctioned to all local bidders</td>
                    <td className="py-3.5 px-4">Firm-managed (voicemail risk)</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-neutral-950">Legal Directories (Avvo / Justia)</td>
                    <td className="py-3.5 px-4">Recurring sponsored listing fees</td>
                    <td className="py-3.5 px-4">Ineligible for Google Maps 3-Pack</td>
                    <td className="py-3.5 px-4">No — shared alongside competing firms</td>
                    <td className="py-3.5 px-4">Shared lead routing</td>
                  </tr>
                  <tr className="bg-slate-50/60">
                    <td className="py-3.5 px-4 font-extrabold text-neutral-950">SearchPrex SEO + AI Intake</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-950">$1,200/mo flat (month-to-month)</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-950">Owned GBP 3-Pack + organic assets</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-950">Yes — 1 firm per practice in Cuyahoga</td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-950">&lt;30s Rule 7.3-compliant AI triage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 1.8. Empathy-to-Solution Tagline Band */}
        <section className="bg-slate-900 text-white border-b border-slate-800 py-8 sm:py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4 max-w-4xl">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 border border-white/20 text-white">
                  <HeartHandshake className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Founder-Led Cleveland Legal SEO · Built for Managing Partners
                  </span>
                  <p className="text-base sm:text-xl font-bold text-white leading-snug tracking-tight">
                    We know the pain of $300 PPC clicks and missed after-hours calls—and we are here with a measurable solution.
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <a
                  href="#subpage-audit"
                  className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-neutral-950 font-bold px-5 py-3 text-xs sm:text-sm shadow-xs transition-all"
                >
                  <span>Claim 7-Day SEO Trial</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Cuyahoga County Market Reality (Humanized Deep-Dive) */}
        <section className="py-12 lg:py-16 bg-slate-50/70 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                    <Building2 className="h-4 w-4 text-neutral-800" />
                    <span>{practice.step1Eyebrow || "Step 1 · Why Paid Ads & Billboards Drain Boutique Firms"}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                    {practice.marketRealityHeading || `Why Traditional Legal Marketing Fails for ${practice.name} in Cleveland`}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-700">
                    {practice.cuyahogaReality}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs">
                    <Image
                      src="/images/services/law-firm/law-firm-relief-from-ppc-burnout.webp"
                      alt={`Cleveland ${practice.name} managing partner replacing high-CPC PPC burnout with compounding organic SEO`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/85 block">
                        Stop Renting Clicks · Own Cuyahoga Rankings
                      </span>
                      <p className="text-xs font-semibold text-white leading-snug">
                        Replace recurring {practice.ppcMonthlyBurn} ad burn with permanent organic &amp; 3-Pack equity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Economic Comparison Bar (Clean White Executive Cards) */}
              <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 shadow-2xs">
                  <div className="flex items-center gap-2 text-neutral-950 font-bold text-sm mb-2">
                    <AlertTriangle className="h-4 w-4 text-neutral-900" />
                    <h3 className="text-sm font-bold text-neutral-950">{practice.ppcCardTitle || "The Google Ads PPC Burn Rate"}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Bidding on &quot;{practice.name.toLowerCase()} lawyer Cleveland&quot; costs <strong className="text-neutral-950 font-bold">{practice.cpc}</strong>. A typical monthly budget of {practice.ppcMonthlyBurn} vanishes quickly on unqualified clicks, tire-kickers, and competitor clicks. When you stop paying Google, your lead flow drops to zero overnight.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold">
                    <Link href="/blog/cuyahoga-county-law-firm-seo-vs-ppc-roi" className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                      Cuyahoga SEO vs. PPC ROI study →
                    </Link>
                    <Link href="/resources/solution/case-calculator" className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-900">
                      Calculate case acquisition ROI →
                    </Link>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-2xs">
                  <div className="flex items-center gap-2 text-neutral-950 font-bold text-sm mb-2">
                    <TrendingUp className="h-4 w-4 text-neutral-900" />
                    <h3 className="text-sm font-bold text-neutral-950">{practice.organicCardTitle || "SearchPrex Organic Equity Model"}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    At a flat <strong className="text-neutral-950 font-bold">$1,200/month</strong>, we build permanent digital equity on your domain. <strong className="text-neutral-950 font-bold">{practice.breakEvenRule}</strong> Month-to-month partnership, 1-firm exclusivity in Cuyahoga County, and full attribution in your monthly signed case ledger.
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold">
                    <Link href="/services/law-firm-seo" className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                      Law firm SEO methodology →
                    </Link>
                    <Link href="/case-studies" className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-900">
                      Verified client case studies →
                    </Link>
                    <Link href="/pricing" className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-900">
                      Transparent pricing →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Statutory & Jurisdiction Architecture */}
        <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                {practice.step2Eyebrow || "Step 2 · Local Authority That Google & AI Search Cite"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.statutesHeading || "How We Align Your Site with Ohio Law & Cuyahoga Courts"}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                {practice.statutesIntro || "To capture those urgent local searches—and get recommended by ChatGPT, Perplexity, and Google AI Overviews—your firm's website must demonstrate firsthand authority over Northeast Ohio's real courthouses, local landmarks, and Ohio Revised Code statutes."}
              </p>
            </div>

            {/* 3 Lively Localized Image Cards (All Practices Dynamic) */}
            <ClevelandCorridorCards cards={practice.corridorCards} />

            {/* 2-Column Interactive Map Embed Container (All Practices Dynamic) */}
            <div className="mb-10">
              <ClevelandInteractiveMap
                key={`map-${practice.slug}`}
                pins={practice.mapSection?.pins}
                title={practice.mapSection?.title}
                subtitle={practice.mapSection?.subtitle}
                caption={practice.mapSection?.caption}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
              
              <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{practice.venuesCardEyebrow || "Cuyahoga Jurisdiction & Corridors"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-4">
                    {practice.venuesCardHeading || "Where Injured Clevelanders Search From"}
                  </h3>
                  {practice.venuesList && practice.venuesList.length > 0 ? (
                    <div className="space-y-3">
                      {practice.venuesList.map((venue, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                            <span className="text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                              {venue.name}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {venue.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-5">
                            {venue.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 text-xs font-mono text-slate-800 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed shadow-2xs">
                      {practice.courtsAndCorridors}
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-600">
                    Targeted via{" "}
                    <Link href="/services/law-firm-seo/google-business-profile-for-lawyers" className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                      Google Business Profile for Lawyers
                    </Link>
                  </span>
                  <Link href="/resources/news/local-seo-updates" className="font-semibold text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                    Google Maps updates →
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 mb-2">
                    <Scale className="h-4 w-4" />
                    <span>{practice.statutesCardEyebrow || "Ohio Statutory Authority"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-4">
                    {practice.statutesCardHeading || "Ohio Personal Injury Laws Every Client Asks About"}
                  </h3>
                  {practice.statutesList && practice.statutesList.length > 0 ? (
                    <div className="space-y-3">
                      {practice.statutesList.map((statute, idx) => (
                        <div key={idx} className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs">
                          <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                            <span className="text-xs font-bold text-neutral-950 flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
                              {statute.title}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-neutral-900 border border-slate-300">
                              {statute.code}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed pl-5">
                            {statute.significance}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 text-xs font-mono text-slate-800 bg-white p-4 rounded-xl border border-slate-200 leading-relaxed shadow-2xs">
                      {practice.statutes}
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-600">
                    Structured with{" "}
                    <Link href="/blog/law-firm-schema-markup" className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                      LegalService &amp; Attorney JSON-LD schema
                    </Link>
                  </span>
                  <Link href="/resources/solution/ai-search" className="font-semibold text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                    AI Overviews citation tracking →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Targeted Keyword Matrix */}
        <section className="py-14 lg:py-20 bg-slate-50/50 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                {practice.step3Eyebrow || "Step 3 · Capturing High-Intent Retainers Across Cuyahoga County"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.keywordMatrixHeading || "What Injured Motorists Actually Search Before Hiring a Cleveland Lawyer"}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                {practice.keywordMatrixIntro || `Once your website speaks the real language of Ohio law and local Cuyahoga venues, we organize your ${practice.name.toLowerCase()} practice around the exact commercial, urgent, and suburban searches that turn into signed retainers:`}
              </p>
            </div>

            {/* Keyword & Page Architecture Silo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Silo 1: Commercial Keywords */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    {practice.siloTitles?.commercialEyebrow || "Asset 01 · GBP & Core Practice Hub"}
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 mb-1.5">
                    {practice.siloTitles?.commercialTitle || "Core Map Pack & Practice Pillars"}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Dedicated downtown Cleveland practice pages built on your domain to capture high-intent queries like:
                  </p>
                  <div className="space-y-2">
                    {practice.targetKeywords.commercial.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-3 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-slate-600">
                    {practice.siloTitles?.commercialFooter || "Map Pack 3-Pack Core Targets"}
                  </span>
                  <Link href="/resources/solution/keyword-research" className="font-semibold text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900 shrink-0">
                    Keyword tool →
                  </Link>
                </div>
              </div>

              {/* Silo 2: Urgent / Emergency Queries */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    {practice.siloTitles?.urgentEyebrow || "Asset 02 · Urgent Intake Landing Pages"}
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 mb-1.5">
                    {practice.siloTitles?.urgentTitle || "Immediate Action & Hospital Queries"}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Fast mobile-first landing pages paired with under-30s Rule 7.3 triage for urgent searches like:
                  </p>
                  <div className="space-y-2">
                    {practice.targetKeywords.urgent.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-3 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-slate-600">
                    {practice.siloTitles?.urgentFooter || "Captured by 24/7 AI Intake Engine"}
                  </span>
                  <Link href="/resources/solution/intake-assistant" className="font-semibold text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900 shrink-0">
                    Intake triage →
                  </Link>
                </div>
              </div>

              {/* Silo 3: Affluent Suburbs */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 block mb-1">
                    {practice.siloTitles?.suburbEyebrow || "Asset 03 · Suburban & Municipal Silos"}
                  </span>
                  <h3 className="text-base font-bold text-neutral-950 mb-1.5">
                    {practice.siloTitles?.suburbTitle || "High-Margin Suburb Coverage"}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Geo-anchored Westlake, Beachwood, Lakewood, and Parma city hubs capturing lower-CPC searches like:
                  </p>
                  <div className="space-y-2">
                    {practice.targetKeywords.suburb.map((kw, idx) => (
                      <div key={idx} className="text-xs font-mono text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        &quot;{kw}&quot;
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-6 border-t border-slate-100 pt-3 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-slate-600">
                    {practice.siloTitles?.suburbFooter || "Lower Competition · Higher Retainers"}
                  </span>
                  <Link href="/locations/ohio/cleveland" className="font-semibold text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900 shrink-0">
                    Cleveland hub →
                  </Link>
                </div>
              </div>

            </div>

            {/* Interactive Submarket Switcher (All Practices Dynamic) */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="max-w-3xl mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  {practice.submarketEyebrow || "Cuyahoga County Regional Markets"}
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                  {practice.submarketHeading || "Where Your Next Cases Come From: West Side, South County & East Side"}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  {practice.submarketIntro || "Switch tabs below to inspect neighborhood search dynamics, municipal court venues, and client intent across Greater Cleveland:"}
                </p>
              </div>
              <ClevelandSubmarketSwitcher
                key={`sub-${practice.slug}`}
                submarkets={practice.submarkets}
                practiceLabel={practice.name}
              />
            </div>
          </div>
        </section>

        {/* 5. Strategy Execution Steps & 24/7 AI Intake */}
        <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                {practice.step4Eyebrow || "Step 4 · From First Search to Signed Retainer"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.executionHeading || `How We Turn Cleveland Searches Into Signed ${practice.name} Cases`}
              </h2>
            </div>

            {/* Execution Strategy Grid */}
            <div className={`grid grid-cols-1 ${practice.strategySteps.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"} gap-6`}>
              {practice.strategySteps.map((step, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col justify-between">
                  <div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white font-bold text-sm mb-4">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-neutral-950 mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Practice-Specific Speed-to-Lead Callout */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
                    <Clock className="w-3.5 h-3.5 text-neutral-900" />
                    <span>{practice.speedToLeadBadge || "Speed-to-Lead Triage System"}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950">
                    {practice.speedToLeadHeading || "Answering Every After-Hours Injury Call in Under 30 Seconds"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {practice.intakeWorkflow}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold">
                    <Link href="/resources/solution/intake-assistant" className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                      See 24/7 AI Legal Intake Assistant →
                    </Link>
                    <Link href="/blog/ohio-rule-7-3-ai-legal-intake-compliance" className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-900">
                      Ohio Rule 7.3 compliance guide →
                    </Link>
                    <Link href="/blog/cleveland-law-firm-intake-study-missed-calls" className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-900">
                      Cleveland missed-call benchmark →
                    </Link>
                  </div>
                </div>
                <div className="shrink-0">
                  <a
                    href="#subpage-audit"
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-6 py-3 text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <span>Test Free for 14 Days</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* 90-Day to 6-Month Execution Deliverables Roadmap */}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
                <div className="lg:col-span-7">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Deliverables Schedule · Month-to-Month Accountability
                  </span>
                  <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-neutral-950 tracking-tight">
                    What Ships in Months 1–6 for Your Cleveland {practice.name} Practice
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Every month includes transparent reporting tied to Cuyahoga Map Pack movements, organic inquiry volume, and verified signed-case attribution—with zero opaque agency vanity metrics.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xs">
                    <Image
                      src="/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp"
                      alt={`SearchPrex signed-case attribution and Map Pack reporting dashboard for Cleveland ${practice.name} law firms`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3.5 right-3.5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/85 block">
                        Transparent Ledger Attribution
                      </span>
                      <p className="text-xs font-semibold text-white leading-snug">
                        Live Map Pack rankings, call recordings, and qualified intake tracking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(practice.roadmap || [
                  {
                    phase: "Phase 01",
                    window: "Month 1",
                    title: "GBP Audit, Intake Speed & Technical Cleanup",
                    deliverables: [
                      "Google Business Profile audit & Cuyahoga County NAP citation cleanup",
                      "Attorney & LegalService JSON-LD schema + Core Web Vitals optimization",
                      "24/7 Ohio Rule 7.3-compliant AI intake triage setup",
                    ],
                  },
                  {
                    phase: "Phase 02",
                    window: "Months 2–3",
                    title: "Cuyahoga Venue & Suburban Silo Buildout",
                    deliverables: [
                      `Core Cleveland ${practice.name} practice hubs anchored to real court venues`,
                      "Dedicated Westlake, Beachwood, Lakewood, and Parma city silos",
                      "Ohio Revised Code Q&A blocks structured for Google AI Overviews",
                    ],
                  },
                  {
                    phase: "Phase 03",
                    window: "Months 4–6",
                    title: "3-Pack Push & Signed-Case Attribution",
                    deliverables: [
                      "Local legal authority & digital PR links across Northeast Ohio",
                      "Conversion rate tuning on after-hours mobile & call intake flows",
                      "Monthly signed-case ledger review to phase down high-CPC PPC spend",
                    ],
                  },
                ]).map((stage) => (
                  <div key={stage.phase} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-white bg-neutral-900 px-2.5 py-0.5 rounded">
                          {stage.phase}
                        </span>
                        <span className="text-xs font-bold text-slate-600">{stage.window}</span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-950 mb-3">{stage.title}</h4>
                      <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                        {stage.deliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 6. Special Client Care, Founder-Led Execution & Risk-Free Trial Showcase */}
        <section className="py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-slate-300 text-neutral-900 text-xs font-semibold uppercase tracking-wider mb-3">
                <UserCheck className="w-3.5 h-3.5 text-neutral-800" />
                <span>Founder-Led Legal SEO · Zero-Risk Evaluation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                Founder-Led Cleveland Legal SEO — Direct Strategy &amp; Execution by Mubashar Sharif
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                Evaluate both our Cuyahoga SEO execution and our 24/7 after-hours intake response before committing to an ongoing partnership.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* Card 1: Special Client Care */}
              <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="relative aspect-16/10 bg-slate-900 border-b border-slate-200">
                    <Image
                      src="/images/services/law-firm/searchprex-law-firm-care-representative.webp"
                      alt={`Dedicated founder-led client care for Cleveland ${practice.name} law firms`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-neutral-950 border border-slate-200">
                      Special Client Care
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-neutral-950 font-bold text-sm mb-2">
                      <ShieldCheck className="h-4 w-4 text-neutral-900 shrink-0" />
                      <h3 className="text-base font-bold text-neutral-950">
                        Direct Founder Access &amp; Under-24h Response SLA
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      Zero junior account coordinators and zero support ticket queues. Mubashar Sharif personally manages your Cuyahoga campaign with strict 1-firm territory exclusivity.
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                        <span>Direct Slack, WhatsApp, and phone line to founder</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                        <span>Strict 1-firm {practice.name} exclusivity in Cuyahoga County</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-3 border-t border-slate-100">
                  <a
                    href="#subpage-audit"
                    className="text-xs font-bold text-neutral-950 inline-flex items-center gap-1.5 hover:underline underline-offset-4"
                  >
                    <span>Confirm Cuyahoga exclusivity</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: 7-Day Free SEO Trial */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-neutral-950">
                      <FlaskConical className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-neutral-900 border border-slate-200">
                      No Upfront Contract
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-neutral-950 mb-2">
                    7-Day Free SEO Trial
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    Inspect real technical proof before paying a retainer. During your 7-day trial, we execute a complete diagnostic teardown of your Cleveland {practice.name.toLowerCase()} footprint.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>Cuyahoga Google Business Profile category &amp; citation audit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>Technical crawl, Core Web Vitals, and schema gap report</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>Custom 90-day corridor &amp; suburb ranking roadmap</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-5 mt-6 border-t border-slate-100">
                  <a
                    href="#subpage-audit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-900 bg-white hover:bg-slate-50 text-neutral-950 font-bold px-4 py-2.5 text-xs transition-all"
                  >
                    <span>Start 7-Day Free SEO Trial</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: 14-Day Free Intake Efficiency Trial */}
              <div className="rounded-2xl border-2 border-neutral-900 bg-white p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-white">
                      <PhoneCall className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-900 text-white">
                      Risk-Free 14-Day Window
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-neutral-950 mb-2">
                    14-Day Free Intake Efficiency Trial
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                    Test our speed-to-lead capture on live after-hours inquiries for 14 full days. Measure response times and lead qualification quality with zero financial commitment.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>Under-30-second missed-call &amp; web inquiry SMS triage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>Strictly inbound, Ohio Rule 7.3-compliant qualification flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
                      <span>Instant routing of qualified {practice.name.toLowerCase()} consults</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-5 mt-6 border-t border-slate-100">
                  <a
                    href="#subpage-audit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold px-4 py-2.5 text-xs shadow-2xs transition-all"
                  >
                    <span>Start 14-Day Intake Trial</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Founder E-E-A-T Proof & Semrush Credentials (All Practices Dynamic) */}
        <ClevelandFounderProof
          practiceName={practice.name}
          eyebrow={practice.founderCopy?.eyebrow}
          heading={practice.founderCopy?.heading}
          body={practice.founderCopy?.body}
          ctaText={practice.founderCopy?.ctaText}
          ctaHref="#subpage-audit"
          bgClass="bg-white"
        />

        {/* 8. Inline Subpage Audit & Cuyahoga Exclusivity Check */}
        <section id="subpage-audit" className="scroll-mt-24 py-14 lg:py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ClevelandSubpageAuditForm
              practiceSlug={practice.slug}
              practiceName={practice.name}
              ctaLabel={practice.ctaLabel}
            />
          </div>
        </section>

        {/* 9. Other Practice Areas & Related Guides in Cleveland */}
        <section className="py-14 lg:py-16 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <h2 className="text-lg sm:text-xl font-extrabold text-neutral-950 tracking-tight">
                  Explore Other Cleveland Legal SEO Practice Silos
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                  <Link href="/locations/ohio/cleveland" className="text-neutral-900 underline decoration-slate-300 underline-offset-4 hover:decoration-neutral-900">
                    Cleveland Law Firm SEO Hub →
                  </Link>
                  <Link href="/law-firm-scorecard" className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-neutral-950 hover:decoration-neutral-900">
                    Law Firm SEO Scorecard →
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherPractices.map((op) => (
                  <Link
                    key={op.slug}
                    href={`/locations/ohio/cleveland/${op.slug}`}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 hover:border-neutral-900 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                        {op.badge.split(" · ")[0]}
                      </span>
                      <h3 className="text-sm font-bold text-neutral-950 mt-1">
                        {op.name} SEO Cleveland
                      </h3>
                    </div>
                    <span className="mt-3 text-xs font-bold text-neutral-900 flex items-center gap-1">
                      {op.name} SEO in Cleveland →
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Practice-Specific Guides & Service Architecture (Contextual Cross-Links) */}
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
                Recommended {practice.name} SEO Guides &amp; Cleveland Studies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {(practice.contextualLinks || [
                  {
                    href: "/services/law-firm-seo",
                    tag: "Service Architecture",
                    title: "Law Firm SEO Service Framework for Competitive Metros",
                    ctaLabel: "Explore Law Firm SEO",
                  },
                  {
                    href: "/blog/cleveland-law-firm-intake-study-missed-calls",
                    tag: "Cleveland Benchmark",
                    title: "How Cleveland Solo Attorneys Lose Signed Cases to Slow Intake",
                    ctaLabel: "Read Intake Study",
                  },
                  {
                    href: "/blog/ohio-rule-7-3-ai-legal-intake-compliance",
                    tag: "Ohio Ethics Guide",
                    title: "Ohio Rule 7.3 & Automated AI Intake Compliance Guide",
                    ctaLabel: "Read Compliance Guide",
                  },
                  {
                    href: "/blog/cuyahoga-county-law-firm-seo-vs-ppc-roi",
                    tag: "ROI Breakdown",
                    title: "Cuyahoga County SEO vs. $300 PPC Clicks: 2026 ROI Breakdown",
                    ctaLabel: "View ROI Breakdown",
                  },
                ]).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-neutral-900 hover:bg-white hover:shadow-xs transition-all text-xs font-bold text-neutral-950 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        {item.tag}
                      </span>
                      <span className="text-sm font-bold text-neutral-950 leading-snug block">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-neutral-900 font-semibold mt-3 flex items-center gap-1">
                      {item.ctaLabel} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 10. Frequently Asked Questions (Final Content Section) */}
        <section className="py-14 lg:py-20 bg-slate-50/60 border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                {practice.faqEyebrow || "Direct Answers for Managing Partners"}
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
                {practice.faqHeading || "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="space-y-4">
              {practice.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-950 mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
