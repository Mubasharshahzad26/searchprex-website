// app/locations/kansas/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, TrendingUp, Scale, ArrowRight,
  CheckCircle, Calendar, ArrowUpRight, Gavel, Users, Building2,
} from "lucide-react";
import { kansasCities } from "@/lib/kansas-cities";
 
const GREEN      = "#3eb489";
const GREEN_DARK = "#2f9670";
const NAVY       = "#0d1b4b";
 
// ── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Law Firm SEO Kansas | Searchprex",
  description:
    "Searchprex helps Kansas law firms rank #1 on Google. Proven law firm SEO and family law SEO for attorneys across Wichita, Kansas City, Overland Park, Topeka, Lawrence, Shawnee, Lenexa, and Manhattan.",
  alternates: { canonical: "https://searchprex.com/locations/kansas" },
  openGraph: {
    title: "Law Firm SEO Across Kansas | Searchprex",
    description:
      "Founder-led law firm SEO for Kansas attorneys. We rank family law firms, personal injury attorneys, and criminal defense practices statewide.",
    url: "https://searchprex.com/locations/kansas",
  },
};
 
// ── JSON-LD Schema ───────────────────────────────────────────────────────────
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Law Firm SEO Kansas",
  description:
    "SEO services for law firms and family law attorneys across Kansas.",
  provider: {
    "@type": "ProfessionalService",
    name: "Searchprex",
    url: "https://searchprex.com",
    areaServed: { "@type": "State", name: "Kansas" },
  },
};
 
// ── Why Searchprex points ────────────────────────────────────────────────────
const whyPoints = [
  {
    title: "Attorney-Specific E-E-A-T",
    body: "Every page is built to Google's legal YMYL standards — credential schema, authoritative content, and practitioner-led copywriting.",
  },
  {
    title: "Map Pack Dominance",
    body: "We optimize and actively manage your Google Business Profile to maintain a top-3 position in local search results.",
  },
  {
    title: "No Outsourcing",
    body: "All strategy, content, and technical work is executed in-house by senior SEO specialists — never handed off to freelancers or overseas teams.",
  },
  {
    title: "Transparent Reporting",
    body: "Monthly reports covering rankings, organic traffic, GBP performance, and lead attribution — no vanity metrics, no filler.",
  },
];
 
// ── Services ─────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Scale,
    title: "Law Firm SEO",
    desc: "Full-service SEO for personal injury, criminal defense, and multi-practice law firms across Kansas. We drive qualified consultations, not just rankings.",
    features: [
      "Practice-area & geo-targeted landing pages",
      "Google Business Profile & map pack optimization",
      "Technical SEO, crawl health & Core Web Vitals",
    ],
  },
  {
    icon: Gavel,
    title: "Family Law SEO",
    desc: "Specialized SEO for family law attorneys targeting divorce, child custody, alimony, and adoption searches across Kansas.",
    features: [
      "Divorce & custody keyword content strategy",
      "Attorney E-E-A-T & YMYL schema markup",
      "County-specific landing pages & citation building",
    ],
  },
];
 
// ── Page ─────────────────────────────────────────────────────────────────────
export default function KansasHubPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
 
      {/* ── HERO ── */}
      <section
        className="py-28 px-4"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #162460 100%)` }}
      >
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: "rgba(62,180,137,0.35)", color: GREEN, background: "rgba(62,180,137,0.08)" }}
          >
            <MapPin className="h-3 w-3" />
            Kansas — Law Firm SEO
          </div>
 
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Law Firm &amp; Family Law SEO<br />
            <span style={{ color: GREEN }}>Across Kansas</span>
          </h1>
 
          <p className="text-blue-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            We rank Kansas law firms for the high-intent searches that bring qualified
            consultations — not just traffic. Eight cities. Two proven service lines.
            One senior-executed strategy.
          </p>
 
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-xl text-sm text-white transition-colors"
              style={{ background: GREEN }}
              onMouseOver={(e) => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseOut={(e) => (e.currentTarget.style.background = GREEN)}
            >
              <Calendar className="h-4 w-4" />
              Book a free strategy call
            </a>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 font-bold px-8 py-3.5 rounded-xl text-sm text-white border transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              View results
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── STATS BAR ── */}
      <section className="bg-white border-b border-[#e2e8f0] py-10 px-4">
        <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { icon: MapPin, label: "Kansas Cities", value: "8" },
            { icon: Scale, label: "Law Firm SEO", value: "Service 01" },
            { icon: Gavel, label: "Family Law SEO", value: "Service 02" },
            { icon: Users, label: "Consultations Driven", value: "+320%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon className="h-5 w-5 mb-1" style={{ color: GREEN }} />
              <p className="text-2xl font-black text-[#0a0f2e]">{value}</p>
              <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── CITIES GRID ── */}
      <section className="py-24 px-4 bg-[#eaecf3]" id="cities">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Coverage Area
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] tracking-tight mb-4">
              Select Your City
            </h2>
            <p className="text-[#475569] max-w-xl mx-auto text-sm leading-relaxed">
              Each city page features unique, locally researched SEO strategy built around
              the courts, search patterns, and competitive landscape of that market.
            </p>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {kansasCities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/kansas/${city.slug}`}
                className="group relative bg-white rounded-2xl border-2 border-[#e2e8f0] p-6 flex flex-col gap-3 transition-all duration-300
                  hover:border-[#0d1b4b] hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-12px_rgba(13,27,75,0.2)]"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${NAVY}, ${NAVY}80)` }}
                />
 
                <div className="flex items-start justify-between">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0d1b4b]/10"
                    style={{ background: "#f4f6fb" }}
                  >
                    <MapPin
                      className="h-4.5 w-4.5 transition-colors duration-300 group-hover:text-[#0d1b4b]"
                      style={{ color: GREEN }}
                    />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-[#cbd5e1] transition-colors duration-300 group-hover:text-[#0d1b4b]"
                  />
                </div>
 
                <div>
                  <h3 className="font-black text-[#0a0f2e] text-base tracking-tight group-hover:text-[#0d1b4b] transition-colors duration-300">
                    {city.name}
                  </h3>
                  <p className="text-xs text-[#94a3b8] font-semibold mt-0.5">{city.county}</p>
                </div>
 
                <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                  {city.heroSub}
                </p>
 
                <div className="flex flex-wrap gap-1.5 mt-auto pt-2 border-t border-[#f1f5f9]">
                  {["Law Firm SEO", "Family Law SEO"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f4f6fb] text-[#64748b] border border-[#e5e7eb]
                        group-hover:bg-[#0d1b4b]/5 group-hover:border-[#0d1b4b]/20 group-hover:text-[#0d1b4b] transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── SERVICES ── */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] tracking-tight mb-4">
              Two Specialized Service Lines
            </h2>
            <p className="text-[#475569] max-w-xl mx-auto text-sm leading-relaxed">
              Every campaign is built around your specific practice area and city —
              no templates, no recycled strategies.
            </p>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border-2 border-[#e2e8f0] bg-[#f8f9fc] p-7"
              >
                <div
                  className="h-12 w-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${NAVY}0f` }}
                >
                  <s.icon className="h-5.5 w-5.5" style={{ color: NAVY }} />
                </div>
                <h3 className="text-xl font-black text-[#0a0f2e] tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2.5">
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
 
      {/* ── WHY SEARCHPREX ── */}
      <section className="py-24 px-4 bg-[#eaecf3]">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: GREEN }}>
              Our Approach
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0a0f2e] tracking-tight mb-4">
              Why Kansas Law Firms Choose Searchprex
            </h2>
          </div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyPoints.map((p, i) => (
              <div key={p.title} className="bg-white rounded-2xl border border-[#e2e8f0] p-6 flex gap-4">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-black text-white"
                  style={{ background: NAVY }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-[#0a0f2e] mb-1 text-sm">{p.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── CTA STRIP ── */}
      <section className="py-16 px-4" style={{ background: NAVY }}>
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg sm:text-xl mb-1">
              Ready to rank your Kansas law firm?
            </p>
            <p className="text-blue-300 text-sm">
              Book a free 30-minute strategy call — no commitment, no sales pitch.
            </p>
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
              href="/services"
              className="inline-flex items-center gap-1.5 border border-white/20 hover:border-white text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              View services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
 