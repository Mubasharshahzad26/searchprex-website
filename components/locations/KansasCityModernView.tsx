"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Scale,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Landmark,
  Users,
  Building2,
  ChevronDown,
  Clock,
  Sparkles,
  ExternalLink,
  PhoneCall,
  Gavel,
  FileCheck2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import type { KansasCity } from "@/lib/kansas-cities";
import { kansasCities, kansasCityToCityPage } from "@/lib/kansas-cities";
import { findPracticePage } from "@/lib/locations";
import type { CityPage } from "@/lib/city-pages";
import TaglinePainBand from "@/components/location-wireframe/TaglinePainBand";
import LocationLocalCaseStudies from "@/components/location-wireframe/LocationLocalCaseStudies";
import LocationBlogTeaser from "@/components/location-wireframe/LocationBlogTeaser";

interface KansasCityModernViewProps {
  city: KansasCity;
}

export default function KansasCityModernView({ city }: KansasCityModernViewProps) {
  const cityPage = kansasCityToCityPage(city);

  // Form states
  const [heroUrl, setHeroUrl] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [heroStatus, setHeroStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [heroMsg, setHeroMsg] = useState("");

  const [auditName, setAuditName] = useState("");
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditPractice, setAuditPractice] = useState("Personal Injury");
  const [auditFirmSize, setAuditFirmSize] = useState("Solo Attorney");
  const [auditNotes, setAuditNotes] = useState("");
  const [auditStatus, setAuditStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [auditMsg, setAuditMsg] = useState("");

  const handleHeroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroUrl || !heroEmail) {
      setHeroMsg("Please provide your firm website URL and email address.");
      setHeroStatus("error");
      return;
    }
    setHeroStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${city.name} Attorney`,
          url: heroUrl,
          email: heroEmail,
          source: `kansas:${city.slug}:hero-intake`,
          notes: `Instant intake from ${city.name}, KS hero section`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setHeroStatus("success");
      setHeroMsg("Audit request received! We will send your confidential tear-down within 24 hours.");
    } catch {
      setHeroStatus("error");
      setHeroMsg("Unable to send request right now. Please email us directly or try again.");
    }
  };

  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditUrl || !auditEmail) {
      setAuditMsg("Please enter both your website URL and contact email.");
      setAuditStatus("error");
      return;
    }
    setAuditStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: auditName || `${city.name} Managing Partner`,
          url: auditUrl,
          email: auditEmail,
          practiceArea: auditPractice,
          firmSize: auditFirmSize,
          source: `kansas:${city.slug}:teardown-form`,
          notes: `Detailed ${city.name} audit request. Practice: ${auditPractice}. Size: ${auditFirmSize}. Notes: ${auditNotes}`,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setAuditStatus("success");
      setAuditMsg("Your free 24-hour reality check is being prepared. Check your inbox soon!");
    } catch {
      setAuditStatus("error");
      setAuditMsg("Submission error. Please verify your details and try again.");
    }
  };

  const otherKansasCities = kansasCities.filter((c) => c.slug !== city.slug);

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-white text-slate-900 pt-10 pb-16 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-slate-900 transition-colors">Locations</Link>
            <span>/</span>
            <Link href="/locations/kansas" className="hover:text-slate-900 transition-colors">Kansas</Link>
            <span>/</span>
            <span className="text-neutral-950 font-bold">{city.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Col: Main Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide bg-slate-100 text-neutral-900 border border-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-neutral-800" />
                  {city.name}, KS · {city.county}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-neutral-900 border border-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
                  1-Firm Per Practice Niche
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-neutral-900 border border-slate-300">
                  <Scale className="w-3.5 h-3.5 text-neutral-800" />
                  {city.courts[0] || "Kansas District Court"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-950 leading-[1.12]">
                {city.heroHeadline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {city.heroSub} Stop burning $250+/click on generic legal PPC with diminishing returns. We engineer practice-area silos, Google Business Profile 3-pack dominance, and AI Overview citations tailored to Kansas law.
              </p>

              {/* Quick Stat Counter Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-neutral-950">{city.population}</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Metro Pop</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-neutral-950">{city.courts.length}</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Court Venues</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-neutral-950">1 Firm</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Exclusivity</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                  <div className="text-xl sm:text-2xl font-black text-neutral-950">100%</div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">Founder Led</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="https://calendly.com/contact-searchprex/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-neutral-800 shadow-sm"
                >
                  <Calendar className="h-4 w-4" /> Book Free Strategy Call
                </a>
                <a
                  href="#free-reality-check"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-neutral-900 transition-colors hover:bg-slate-50 hover:border-slate-400"
                >
                  Get 24h Reality Check <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Col: Instant 24h Reality Check Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white text-xs font-bold">1</span>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-900">Confidential Legal Teardown</span>
                </div>
                <h2 className="text-xl font-black text-neutral-950 tracking-tight">
                  Free {city.name} Law Firm Audit
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-5">
                  Send your URL. I will audit your rankings, Google Business Profile, and the competitors taking your {city.county} retainers — within 24 hours.
                </p>

                {heroStatus === "success" ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-emerald-950">{heroMsg}</p>
                    <p className="text-xs text-emerald-700 mt-1">We are analyzing your local competitors in {city.name} now.</p>
                  </div>
                ) : (
                  <form onSubmit={handleHeroSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Law Firm Website URL *</label>
                      <input
                        type="url"
                        required
                        value={heroUrl}
                        onChange={(e) => setHeroUrl(e.target.value)}
                        placeholder="https://yourlawfirm.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Direct Work Email *</label>
                      <input
                        type="email"
                        required
                        value={heroEmail}
                        onChange={(e) => setHeroEmail(e.target.value)}
                        placeholder="attorney@yourfirm.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    {heroStatus === "error" && (
                      <p className="text-xs text-red-600 font-semibold">{heroMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={heroStatus === "submitting"}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60"
                    >
                      {heroStatus === "submitting" ? "Analyzing Competitors..." : `Request ${city.name} Reality Check`}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>✓ 100% Confidential</span>
                      <span>✓ No Sales Call Pitch</span>
                      <span>✓ 24h Turnaround</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TAGLINE PAIN BAND ── */}
      <TaglinePainBand />

      {/* ── 3. QUICK ANSWER FOR GOOGLE AI OVERVIEWS ── */}
      <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-neutral-900 mb-3">
              <Sparkles className="w-4 h-4 text-neutral-800" />
              <span>Quick Answer: Ranking a Law Firm in {city.name}, Kansas</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-neutral-950 mb-4 tracking-tight leading-snug">
              How do law firms win the Google Map Pack and AI citations in {city.name}?
            </h2>

            <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-3.5">
              <p>
                To rank #1 in <strong>{city.name}, KS</strong>, a law firm must build geographic and statutory authority rooted in <strong>{city.county}</strong> rather than publishing generic statewide legal filler. Google evaluates legal websites under strict <strong>YMYL (Your Money or Your Life)</strong> quality standards.
              </p>
              <div className="bg-slate-50 border-l-4 border-neutral-900 p-4 rounded-r-lg space-y-2 text-xs sm:text-sm text-slate-800">
                <p>
                  <strong>Key Kansas Statutory Drivers:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                  <li>
                    <strong>Modified Comparative Fault (K.S.A. 60-258a):</strong> Kansas bars recovery once an injured party is 50% or more at fault. Content addressing this boundary captures high-converting personal injury intent.
                  </li>
                  <li>
                    <strong>Statute of Limitations (K.S.A. 60-513):</strong> Two-year deadline for personal injury claims creates urgency that must be structured in practice-area landing pages.
                  </li>
                  <li>
                    <strong>Divorce Residency &amp; Waiting Period (K.S.A. 23-2703 / 23-2708):</strong> Requires 60 days of Kansas residency before filing and a mandatory 60-day waiting period before a final decree.
                  </li>
                  <li>
                    <strong>Local Courthouse Jurisdiction:</strong> Google cross-checks practice listings against local venues including <em>{city.courts.join(", ")}</em> and the <em>{city.barAssociation}</em>.
                  </li>
                </ul>
              </div>
              <p className="text-xs text-slate-500 italic">
                Source: Kansas Statutes Annotated (ksrevisor.gov), Kansas Supreme Court Rules, and SearchPrex Local SERP Analysis 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. LOCAL MARKET INSIGHT & OVERVIEW ── */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-neutral-800 border border-slate-300">
                <Landmark className="w-3.5 h-3.5 text-neutral-700" />
                Local Judicial Landscape · {city.county}
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-tight">
                Why {city.name}&apos;s Legal Market Requires a Localized Strategy
              </h2>

              <p className="text-base text-slate-700 leading-relaxed">
                {city.overview}
              </p>

              {city.localInsight && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-800 leading-relaxed">
                  <div className="font-bold text-neutral-950 mb-1.5 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-neutral-800" />
                    <span>Practitioner Local Market Reality:</span>
                  </div>
                  {city.localInsight}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Courts Serving {city.name} Residents:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {city.courts.map((court, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg p-2.5">
                      <Gavel className="w-3.5 h-3.5 text-neutral-700 shrink-0" />
                      <span>{court}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <div>
                  <span className="font-bold text-neutral-950">Local Bar:</span> {city.barAssociation}
                </div>
                <div>
                  <span className="font-bold text-neutral-950">County:</span> {city.county}
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 shadow-xs">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200">
                  <iframe
                    title={`Google Map for ${city.name}, KS`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(`${city.name}, ${city.county}, KS`)}&output=embed`}
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-bold text-neutral-900">{city.name}, Kansas · {city.county}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Primary Google Business Profile 3-Pack radius &amp; jurisdiction territory</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PRACTICE AREAS DEMAND MATRIX ── */}
      {city.practiceAreas && city.practiceAreas.length > 0 && (
        <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
                HIGH-INTENT CLIENT SEARCH DEMAND
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
                Where the Legal Cases Are in {city.name}
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600">
                Every practice area in {city.name} has its own search pattern. We architect dedicated topic clusters and statutory landing pages that match exactly what prospective clients type.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {city.practiceAreas.map((pa, idx) => {
                const linkedPage = findPracticePage(pa.name);
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:border-neutral-900 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-neutral-900 text-xs font-black">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-slate-100 px-2 py-0.5 rounded">
                          High Intent
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-neutral-950 mb-2 leading-snug">
                        {pa.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pa.demand}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100">
                      {linkedPage ? (
                        <Link
                          href={`/services/${linkedPage.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-neutral-700"
                        >
                          <span>Explore {pa.name} SEO</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <a
                          href="#free-reality-check"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-neutral-700"
                        >
                          <span>Request {pa.name} Audit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. TWO SPECIALIZED SERVICE LINES ── */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              PROVEN SERVICE LINES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Tailored SEO for {city.name} Law Firms
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              One senior-executed strategy. Zero junior delegation. Built specifically to generate qualified consultations across {city.county}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Law Firm SEO */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 mb-3">
                  Law Firm SEO in {city.name}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  {city.lawFirmDesc}
                </p>
                <div className="space-y-2.5 mb-6">
                  {[
                    "Practice-area & geo-targeted landing page architecture",
                    "Google Business Profile optimization & local 3-pack defense",
                    "Technical SEO, Core Web Vitals & mobile page experience",
                    "Competitor review monitoring and conversion rate optimization",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/services/law-firm-seo"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors"
              >
                Learn More About Law Firm SEO <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Family Law SEO */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
                  <Gavel className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-950 mb-3">
                  Family Law SEO in {city.name}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  {city.familyLawDesc}
                </p>
                <div className="space-y-2.5 mb-6">
                  {[
                    "Divorce, custody & child support localized query silos",
                    "Attorney credential schema & Google YMYL trust signals",
                    "County-specific residency rules (K.S.A. 23-2703 compliance)",
                    "High-asset division & suburban high-income targeting",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/services/local-seo"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-neutral-950 hover:bg-slate-100 transition-colors"
              >
                Learn More About Local SEO <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. WHY OLD AGENCIES FAIL VS SEARCHPREX ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              REALITY CHECK
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Burned by Previous SEO Agencies in Kansas?
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              Most legal agencies sell high-retainer packages and outsource the work to junior coordinators. Here is how our founder-led model is different.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100 text-xs uppercase tracking-wider text-slate-700">
                  <th className="py-4 px-5 font-bold">Evaluation Criteria</th>
                  <th className="py-4 px-5 font-bold text-red-600">Typical Legal Agency</th>
                  <th className="py-4 px-5 font-bold text-neutral-950 bg-slate-200/60">SearchPrex Founder-Led</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Execution Team</td>
                  <td className="py-3.5 px-5 text-red-700">Junior account reps or overseas contractors</td>
                  <td className="py-3.5 px-5 font-semibold text-neutral-950 bg-slate-50/60">100% Founder-Executed (Mubashar Sharif)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Market Exclusivity</td>
                  <td className="py-3.5 px-5 text-red-700">Works with multiple direct competitors in {city.name}</td>
                  <td className="py-3.5 px-5 font-semibold text-neutral-950 bg-slate-50/60">Strict 1-Firm Per Practice Niche Policy</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Content Quality</td>
                  <td className="py-3.5 px-5 text-red-700">Generic AI spin without local statute references</td>
                  <td className="py-3.5 px-5 font-semibold text-neutral-950 bg-slate-50/60">Attorney YMYL compliance with Kansas K.S.A. citations</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Reporting &amp; Attribution</td>
                  <td className="py-3.5 px-5 text-red-700">Vanity impressions and automated PDF dumps</td>
                  <td className="py-3.5 px-5 font-semibold text-neutral-950 bg-slate-50/60">Every Monday report on rankings, calls &amp; signed leads</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-5 font-bold text-slate-900">Commitment &amp; Risk</td>
                  <td className="py-3.5 px-5 text-red-700">12-month lock-in contracts with zero guarantees</td>
                  <td className="py-3.5 px-5 font-semibold text-neutral-950 bg-slate-50/60">90-Day Milestone Guarantee &amp; Month-to-Month Retainers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 8. NEIGHBORHOODS & NEARBY SUBMARKETS ENTITY CLOUD ── */}
      <section className="py-14 md:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Neighborhoods */}
            {city.neighborhoods && city.neighborhoods.length > 0 && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-neutral-900" />
                  <h3 className="text-base font-extrabold text-neutral-950 uppercase tracking-wider">
                    {city.name} Neighborhoods We Optimize For
                  </h3>
                </div>
                <p className="text-xs text-slate-600 mb-4">
                  Google Map Pack proximity varies block-by-block. We embed local geographic signals across key neighborhoods:
                </p>
                <div className="flex flex-wrap gap-2">
                  {city.neighborhoods.map((n, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Submarkets */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-neutral-900" />
                <h3 className="text-base font-extrabold text-neutral-950 uppercase tracking-wider">
                  Nearby Submarkets &amp; Commuter Corridors
                </h3>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Attorneys in {city.name} draw clients from surrounding municipal areas throughout {city.county}:
              </p>
              <div className="flex flex-wrap gap-2">
                {city.nearbyAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. LOCAL SEO CASE STUDIES (VERIFIED PROOF) ── */}
      <LocationLocalCaseStudies page={cityPage} />

      {/* ── 10. EDITORIAL BLOG TEASER (HD THUMBNAILS) ── */}
      <LocationBlogTeaser page={cityPage} />

      {/* ── 11. LOCAL GUIDANCE SECTION ── */}
      {city.localGuide && city.localGuide.length > 0 && (
        <section className="py-16 md:py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
                PRACTITIONER PLAYBOOK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                Navigating the {city.name} Legal Landscape
              </h2>
            </div>

            <div className="space-y-6">
              {city.localGuide.map((guide, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7">
                  <h3 className="text-lg font-bold text-neutral-950 mb-2.5 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-neutral-900 shrink-0" />
                    <span>{guide.heading}</span>
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed pl-7">
                    {guide.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 12. FULL 24-HOUR REALITY CHECK FORM ── */}
      <section id="free-reality-check" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-10 shadow-xs">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-neutral-900 border border-slate-300 mb-3">
                <FileCheck2 className="w-3.5 h-3.5" />
                No Cost · No Obligation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
                Request Your Free {city.name} Legal SEO Reality Check
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Receive an executive teardown comparing your website and Google Business Profile against the top 3 ranking law firms in {city.county}. Delivered within 24 hours.
              </p>
            </div>

            {auditStatus === "success" ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-emerald-950">Audit Request Received!</h3>
                <p className="text-sm text-emerald-800 mt-1">{auditMsg}</p>
                <p className="text-xs text-emerald-700 mt-2">Mubashar Sharif is personally reviewing your {city.name} legal market footprint.</p>
              </div>
            ) : (
              <form onSubmit={handleAuditSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name / Title</label>
                    <input
                      type="text"
                      value={auditName}
                      onChange={(e) => setAuditName(e.target.value)}
                      placeholder="e.g. Sarah Miller, Managing Partner"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Law Firm Website URL *</label>
                    <input
                      type="url"
                      required
                      value={auditUrl}
                      onChange={(e) => setAuditUrl(e.target.value)}
                      placeholder="https://yourlawfirm.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Direct Email Address *</label>
                    <input
                      type="email"
                      required
                      value={auditEmail}
                      onChange={(e) => setAuditEmail(e.target.value)}
                      placeholder="partner@firm.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Primary Practice Focus</label>
                    <select
                      value={auditPractice}
                      onChange={(e) => setAuditPractice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                    >
                      <option value="Personal Injury">Personal Injury</option>
                      <option value="Family Law & Divorce">Family Law &amp; Divorce</option>
                      <option value="Criminal Defense & DUI">Criminal Defense &amp; DUI</option>
                      <option value="Workers Compensation">Workers&apos; Compensation</option>
                      <option value="Estate Planning & Probate">Estate Planning &amp; Probate</option>
                      <option value="Business & Civil Litigation">Business &amp; Civil Litigation</option>
                      <option value="Multi-Practice">Multi-Practice</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Firm Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Solo Attorney", "2-5 Attorneys", "6+ Attorneys"].map((size) => (
                      <button
                        type="button"
                        key={size}
                        onClick={() => setAuditFirmSize(size)}
                        className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all text-center ${
                          auditFirmSize === size
                            ? "bg-neutral-900 text-white border-neutral-900"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">What is your biggest current ranking challenge in {city.name}? (Optional)</label>
                  <textarea
                    rows={2}
                    value={auditNotes}
                    onChange={(e) => setAuditNotes(e.target.value)}
                    placeholder="e.g. Stuck on page 2 for personal injury, competitor outranking us on Google Maps, high PPC costs..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                {auditStatus === "error" && (
                  <p className="text-xs text-red-600 font-semibold">{auditMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={auditStatus === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3.5 text-sm font-bold text-white transition-colors hover:bg-neutral-800 disabled:opacity-60 shadow-sm"
                >
                  {auditStatus === "submitting" ? "Preparing Your Teardown..." : `Send Me the ${city.name} Reality Check (Free)`}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-center text-slate-500">
                  Strict client privacy: We never share your audit data. 1 firm per niche exclusivity policy applies.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 13. OTHER KANSAS LEGAL MARKETS (INTERLINKING) ── */}
      <section className="py-14 md:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 block mb-1">
                KANSAS STATEWIDE COVERAGE
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-neutral-950">
                Other Kansas Legal Markets We Serve
              </h2>
            </div>
            <Link
              href="/locations/kansas"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 hover:text-neutral-700"
            >
              <span>View All Kansas Hubs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherKansasCities.map((other) => (
              <Link
                key={other.slug}
                href={`/locations/kansas/${other.slug}`}
                className="group p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-neutral-900 hover:shadow-2xs transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-neutral-950 group-hover:text-neutral-800">
                    {other.name}, KS
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  {other.county} · Pop: {other.population}
                </p>
                <span className="inline-block text-[10px] font-semibold text-neutral-800 bg-slate-200/70 px-2 py-0.5 rounded">
                  {other.courts[0] || "District Court"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 14. ACCORDION FAQS ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              {city.name} Law Firm SEO FAQs
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Clear, honest answers about law firm rankings, timelines, and costs in {city.name}, Kansas.
            </p>
          </div>

          <div className="space-y-4">
            {city.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white border border-slate-200 rounded-xl p-5 open:shadow-2xs transition-all"
              >
                <summary className="flex items-center justify-between gap-4 font-bold text-neutral-950 text-sm sm:text-base cursor-pointer list-none select-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 15. FOUNDER E-E-A-T BIO ── */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-7 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-300 relative shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/mubashar-sharif.jpg"
                alt="Mubashar Sharif, CEO and Founder of SearchPrex"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 bg-slate-200/80 px-2.5 py-0.5 rounded">
                  Founder &amp; Lead SEO Strategist
                </span>
                <span className="text-xs text-slate-500">SearchPrex</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                Mubashar Sharif
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                &ldquo;When a law firm in {city.name} signs with SearchPrex, they work directly with me. I do not hand off your local map pack rankings, statutory content, or schema architecture to junior associates. I personally execute the strategy, run weekly GSC checks, and deliver a plain-English progress report every Monday morning.&rdquo;
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
                <a
                  href="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-neutral-900 hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> LinkedIn Profile
                </a>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-medium">HubSpot Certified</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-medium">Semrush Technical SEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 16. CLOSING CTA BANNER ── */}
      <section className="py-16 md:py-20 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            1-Firm Niche Exclusivity in {city.name}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to Dominate Legal Searches in {city.name}?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Lock out your competitors in {city.county}. Once we partner with one firm in your practice niche, we decline all others in {city.name}.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-neutral-950 hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4" /> Book Strategy Call
            </a>
            <a
              href="#free-reality-check"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent px-8 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              Get Free 24h Reality Check <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Bottom Tagline Pain Band */}
      <TaglinePainBand />
    </div>
  );
}
