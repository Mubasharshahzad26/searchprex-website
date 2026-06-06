// app/locations/kansas/[city]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Scale, Gavel, CheckCircle, ArrowRight, Calendar,
  MapPin, Building2, ChevronRight, TrendingUp, Users,
} from "lucide-react";
import { getCityBySlug, getAllCitySlugs } from "@/lib/kansas-cities";
 
const GREEN      = "#3eb489";
const GREEN_DARK = "#2f9670";
const NAVY       = "#0d1b4b";
 
// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getAllCitySlugs();
}
 
// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { city: string };
}): Promise<Metadata> {
  const city = getCityBySlug(params.city);
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: `https://searchprex.com/locations/kansas/${city.slug}`,
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `https://searchprex.com/locations/kansas/${city.slug}`,
    },
  };
}
 
// ── Service definition ────────────────────────────────────────────────────────
const serviceLines = (cityName: string, lawFirmDesc: string, familyLawDesc: string) => [
  {
    icon: Scale,
    title: "Law Firm SEO",
    subtitle: `Ranking ${cityName} attorneys for high-intent legal searches`,
    desc: lawFirmDesc,
    features: [
      "Practice-area & geo-targeted landing pages",
      "Google Business Profile & map pack optimization",
      "E-E-A-T content & attorney credential schema",
      "Technical SEO, crawl health & Core Web Vitals",
    ],
  },
  {
    icon: Gavel,
    title: "Family Law SEO",
    subtitle: `Divorce, custody & family law searches in ${cityName}`,
    desc: familyLawDesc,
    features: [
      "Divorce & custody keyword research & content",
      "YMYL-compliant attorney landing pages",
      "County-specific citation building & NAP consistency",
      "Review generation & GBP family law optimization",
    ],
  },
];
 
// ── Page ──────────────────────────────────────────────────────────────────────
export default function CityPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);
  if (!city) notFound();
 
  const services = serviceLines(city.name, city.lawFirmDesc, city.familyLawDesc);
 
  // JSON-LD: LocalBusiness + FAQPage
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        name: "Searchprex",
        url: "https://searchprex.com",
        description: `Law firm SEO and family law SEO services for attorneys in ${city.name}, ${city.county}, Kansas.`,
        areaServed: {
          "@type": "City",
          name: city.name,
          containedIn: { "@type": "State", name: "Kansas" },
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Law Firm SEO Services in ${city.name}`,
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title },
          })),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
 
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
 
      {/* ── BREADCRUMB ── */}
      <nav className="bg-white border-b border-[#e2e8f0] px-4 py-3">
        <div className="mx-auto max-w-7xl flex items-center gap-1.5 text-xs text-[#94a3b8] font-medium flex-wrap">
          <Link href="/" className="hover:text-[#0a0f2e] transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <Link href="/locations" className="hover:text-[#0a0f2e] transition-colors">Locations</Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <Link href="/locations/kansas" className="hover:text-[#0a0f2e] transition-colors">Kansas</Link>
          <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="text-[#0a0f2e] font-semibold">{city.name}</span>
        </div>
      </nav>
 
      {/* ── HERO ── */}
      <section
        className="py-24 px-4"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #162460 100%)` }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-5">
            <div
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ borderColor: "rgba(62,180,137,0.35)", color: GREEN, background: "rgba(62,180,137,0.08)" }}
            >
              <MapPin className="h-3 w-3" />
              {city.county} · Kansas
            </div>
          </div>
 
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-[1.05] tracking-tight mb-5">
            {city.heroHeadline}
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl leading-relaxed mb-8">
            {city.heroSub}
          </p>
 
          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { label: "Population", value: city.population },
              { label: "County", value: city.county },
              { label: "Services", value: "Law Firm & Family Law SEO" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-2.5 text-sm"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold mb-0.5">{label}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
 
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-xl text-sm text-white transition-colors"
              style={{ background: GREEN }}
              onMouseOver={(e) => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseOut={(e) => (e.currentTarget.style.background = GREEN)}
            >
              <Calendar className="h-4 w-4" />
              Book a free strategy call
            </a>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center gap-1.5 font-bold px-7 py-3.5 rounded-xl text-sm text-white border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              View case studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── MARKET OVERVIEW ── */}
      <section className="py-14 px-4 bg-white border-b border-[#e2e8f0]">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start gap-4">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
              style={{ background: `${NAVY}0f` }}
            >
              <TrendingUp className="h-5 w-5" style={{ color: NAVY }} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: GREEN }}>
                Market Overview
              </p>
              <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
                {city.overview}
              </p>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── SERVICES ── */}
      <section className="py-24 px-4 bg-[#eaecf3]" id="services">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              What We Do in {city.name}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] tracking-tight mb-4">
              Two Specialized SEO Services
            </h2>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl border-2 border-[#e2e8f0] p-7 flex flex-col"
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${NAVY}0f` }}
                >
                  <s.icon className="h-5 w-5" style={{ color: NAVY }} />
                </div>
 
                <h3 className="text-xl font-black text-[#0a0f2e] tracking-tight mb-1">{s.title}</h3>
                <p className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wide mb-4">
                  {s.subtitle}
                </p>
                <p className="text-sm text-[#475569] leading-relaxed mb-6">{s.desc}</p>
 
                <ul className="space-y-2.5 mt-auto border-t border-[#f1f5f9] pt-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569]">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: GREEN }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── LOCAL PRESENCE ── */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Local Knowledge
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] tracking-tight mb-4">
              We Know {city.name}'s Legal Landscape
            </h2>
            <p className="text-[#475569] text-sm max-w-xl mx-auto leading-relaxed">
              Our SEO strategy is built around the courts, bar associations, and search
              behavior specific to {city.name} — not recycled templates.
            </p>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Courts */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-4.5 w-4.5" style={{ color: NAVY }} />
                <h3 className="font-bold text-[#0a0f2e] text-sm">Courts We Target</h3>
              </div>
              <ul className="space-y-2">
                {city.courts.map((c) => (
                  <li key={c} className="text-xs text-[#475569] flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ background: GREEN }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
 
            {/* Bar Association */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Scale className="h-4.5 w-4.5" style={{ color: NAVY }} />
                <h3 className="font-bold text-[#0a0f2e] text-sm">Bar Association</h3>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed mb-3">{city.barAssociation}</p>
              <p className="text-xs text-[#475569] leading-relaxed">
                We align your content and citations with local bar standards and
                Google's attorney YMYL requirements.
              </p>
            </div>
 
            {/* Nearby Areas */}
            <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4.5 w-4.5" style={{ color: NAVY }} />
                <h3 className="font-bold text-[#0a0f2e] text-sm">Nearby Areas Served</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {city.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-md border"
                    style={{ background: `${NAVY}07`, borderColor: `${NAVY}20`, color: NAVY }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── FAQ ── */}
      <section className="py-24 px-4 bg-[#eaecf3]">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Frequently Asked
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] tracking-tight">
              Questions About Law Firm SEO in {city.name}
            </h2>
          </div>
 
          <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden divide-y divide-[#f1f5f9]">
            {city.faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                  <span className="font-semibold text-sm text-[#0a0f2e] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 flex-shrink-0 text-[#94a3b8] transition-transform duration-300 group-open:rotate-90"
                  />
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-sm text-[#475569] leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CTA STRIP ── */}
      <section className="py-16 px-4" style={{ background: NAVY }}>
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.1)" }}
            >
              <span className="text-white font-black text-lg">M</span>
            </div>
            <div>
              <p className="text-white font-bold text-base sm:text-lg">
                Ready to rank in {city.name}?
              </p>
              <p className="text-blue-300 text-sm mt-0.5">
                Book a free 30-min call — Mubashar will map out exactly what your firm needs.
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl text-sm text-white transition-colors"
              style={{ background: GREEN }}
              onMouseOver={(e) => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseOut={(e) => (e.currentTarget.style.background = GREEN)}
            >
              <Calendar className="h-4 w-4" />
              Book free call
            </a>
            <Link
              href="/locations/kansas"
              className="inline-flex items-center gap-1.5 border border-white/20 hover:border-white text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              All Kansas cities
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
 


