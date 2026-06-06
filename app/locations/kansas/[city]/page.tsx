// app/locations/kansas/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Scale, ArrowRight, CheckCircle, Calendar, ArrowUpRight,
  Gavel, Users, Award, ShieldCheck, Building2, Search,
} from "lucide-react";
import { kansasCities } from "@/lib/kansas-cities";
 
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const NAVY = "#0a0f2e"; // aligned to site palette (was #0d1b4b)
 
// ── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Law Firm SEO Kansas | Family Law & Attorney SEO | SearchPrex",
  description:
    "Founder-led law firm SEO for Kansas attorneys. We help family law, personal injury, and criminal defense firms rank across Wichita, Overland Park, Kansas City, Topeka, Lawrence, Shawnee, Lenexa, and Manhattan.",
  alternates: { canonical: "https://searchprex.com/locations/kansas" },
  openGraph: {
    title: "Law Firm SEO Across Kansas | SearchPrex",
    description:
      "Founder-led, senior-executed SEO for Kansas law firms. Real local strategy for every market we serve.",
    url: "https://searchprex.com/locations/kansas",
    type: "website",
  },
};
 
// ── JSON-LD (entity + breadcrumb for E-E-A-T & rich results) ─────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://searchprex.com/locations/kansas#service",
      name: "SearchPrex — Law Firm SEO Kansas",
      url: "https://searchprex.com/locations/kansas",
      description:
        "Founder-led SEO services for law firms and family law attorneys across Kansas.",
      areaServed: { "@type": "State", name: "Kansas" },
      knowsAbout: [
        "Law Firm SEO", "Family Law SEO", "Local SEO",
        "Google Business Profile optimization", "Attorney E-E-A-T", "Legal YMYL content",
      ],
      founder: { "@id": "https://searchprex.com/#founder" },
    },
    {
      "@type": "Person",
      "@id": "https://searchprex.com/#founder",
      name: "Mubashar Shahzad",
      jobTitle: "Founder & Senior SEO Strategist",
      worksFor: { "@id": "https://searchprex.com/locations/kansas#service" },
      sameAs: [
        "https://www.linkedin.com/in/mubashar-shahzad-seo/",
        "https://www.upwork.com/freelancers/~01400266ea842005be",
        "https://medium.com/@mubasharshahzad726",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://searchprex.com/locations/kansas#webpage",
      url: "https://searchprex.com/locations/kansas",
      name: "Law Firm SEO Kansas",
      breadcrumb: { "@id": "https://searchprex.com/locations/kansas#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://searchprex.com/locations/kansas#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://searchprex.com" },
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://searchprex.com/locations" },
        { "@type": "ListItem", position: 3, name: "Kansas", item: "https://searchprex.com/locations/kansas" },
      ],
    },
  ],
};
 
// ── Local market context (accurate, people-first) ───────────────────────────
const markets = [
  { city: "Wichita", county: "Sedgwick County", note: "Kansas's largest city and most-searched legal market — high volume, real competition." },
  { city: "Overland Park & Johnson County", county: "Johnson County", note: "The state's most affluent and competitive legal market (Lenexa, Shawnee, Olathe)." },
  { city: "Kansas City", county: "Wyandotte County", note: "Dense metro searches, often overlapping with the Missouri side — local intent matters." },
  { city: "Topeka", county: "Shawnee County", note: "State capital — government, administrative, and family law demand." },
  { city: "Lawrence", county: "Douglas County", note: "University of Kansas town with younger, mobile-first searchers." },
  { city: "Manhattan", county: "Riley County", note: "Kansas State University market — smaller, winnable, underserved online." },
];
 
const whyPoints = [
  { title: "Attorney-Specific E-E-A-T", body: "Every page is built to Google's legal YMYL standards — credential signals, authoritative content, and practitioner-led copy. No thin, mass-produced pages." },
  { title: "Map Pack Optimization", body: "We optimize and actively manage your Google Business Profile to compete for a top-3 local position in the cities you actually serve." },
  { title: "Senior-Executed, No Outsourcing", body: "Strategy, content, and technical work are handled in-house by the founder — never handed off to juniors or overseas freelancers." },
  { title: "Transparent Reporting", body: "Monthly reports on rankings, organic traffic, GBP performance, and lead attribution — money metrics, no vanity filler." },
];
 
const services = [
  {
    icon: Scale,
    title: "Law Firm SEO",
    desc: "Full-service SEO for personal injury, criminal defense, and multi-practice firms across Kansas. Built to drive qualified consultations, not just rankings.",
    features: [
      "Practice-area & geo-targeted landing pages",
      "Google Business Profile & map pack optimization",
      "Technical SEO, crawl health & Core Web Vitals",
    ],
  },
  {
    icon: Gavel,
    title: "Family Law SEO",
    desc: "Specialized SEO for family law attorneys targeting divorce, child custody, alimony, and adoption searches across Kansas markets.",
    features: [
      "Divorce & custody keyword content strategy",
      "Attorney E-E-A-T & YMYL schema markup",
      "County-specific landing pages & citation building",
    ],
  },
];
 
// ── Page (Server Component — CSS-only hovers, no event handlers) ─────────────
export default function KansasHubPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 
      {/* ── HERO ── */}
      <section className="px-4 py-28" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #16213f 100%)` }}>
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: "rgba(62,180,137,0.35)", color: GREEN, background: "rgba(62,180,137,0.08)" }}
          >
            <MapPin className="h-3 w-3" /> Kansas — Law Firm SEO
          </div>
 
          <h1 className="mb-6 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Law Firm &amp; Family Law SEO<br />Across Kansas
          </h1>
 
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-blue-200 sm:text-xl">
            We help Kansas law firms rank for the high-intent searches that bring qualified consultations — not just traffic. Eight markets, two proven service lines, one senior-executed strategy.
          </p>
 
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3eb489] px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#2f9670]"
            >
              <Calendar className="h-4 w-4" /> Book a free strategy call
            </a>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:border-white"
            >
              View results <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
 
      {/* ── STATS BAR (honest, no fabricated client numbers) ── */}
      <section className="border-b border-[#e2e8f0] bg-white px-4 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            { icon: MapPin, label: "Kansas Cities Covered", value: "8" },
            { icon: Scale, label: "Specialized Service Lines", value: "2" },
            { icon: Award, label: "Years of SEO Experience", value: "5+" },
            { icon: ShieldCheck, label: "Founder-Executed", value: "100%" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <Icon className="mb-1 h-5 w-5" style={{ color: GREEN }} />
              <p className="text-2xl font-black text-[#0a0f2e]">{value}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">{label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── LOCAL MAP + INTRO ── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Statewide Coverage</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              We know the Kansas legal market
            </h2>
            <p className="mb-4 text-[#475569] leading-relaxed">
              Kansas isn&apos;t one search market — it&apos;s several. A divorce attorney in Overland Park is competing in one of the most saturated legal markets in the Midwest, while a firm in Manhattan or Lawrence is fighting for very different, often-winnable local searches.
            </p>
            <p className="text-[#475569] leading-relaxed">
              We build a separate, locally researched strategy for every city we serve — around the counties, courts, and competitors that actually shape each market. No copy-paste templates.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#e2e8f0] shadow-[0_20px_50px_-20px_rgba(10,15,46,0.25)]">
            <iframe
              title="SearchPrex service area — Kansas"
              src="https://maps.google.com/maps?q=Kansas%2C%20USA&t=&z=6&ie=UTF8&iwloc=&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
 
      {/* ── CITIES GRID ── */}
      <section className="bg-[#eaecf3] px-4 py-24" id="cities">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Coverage Area</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">Select Your City</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#475569]">
              Each city page features a unique, locally researched SEO strategy built around the courts, search patterns, and competition of that market.
            </p>
          </div>
 
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {kansasCities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/kansas/${city.slug}`}
                className="group relative flex flex-col gap-3 rounded-2xl border-2 border-[#e2e8f0] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0a0f2e] hover:shadow-[0_20px_50px_-12px_rgba(10,15,46,0.2)]"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-[#0a0f2e] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f6fb] transition-colors duration-300 group-hover:bg-[#0a0f2e]/10">
                    <MapPin className="h-5 w-5 transition-colors duration-300 group-hover:text-[#0a0f2e]" style={{ color: GREEN }} />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#cbd5e1] transition-colors duration-300 group-hover:text-[#0a0f2e]" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight text-[#0a0f2e]">{city.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-[#94a3b8]">{city.county}</p>
                </div>
                <p className="line-clamp-2 text-xs leading-relaxed text-[#475569]">{city.heroSub}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[#f1f5f9] pt-2">
                  {["Law Firm SEO", "Family Law SEO"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#e5e7eb] bg-[#f4f6fb] px-2 py-0.5 text-[10px] font-semibold text-[#64748b] transition-all duration-300 group-hover:border-[#0a0f2e]/20 group-hover:bg-[#0a0f2e]/5 group-hover:text-[#0a0f2e]"
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
 
      {/* ── LOCAL EXPERTISE (people-first, accurate) ── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Local Knowledge</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">
              Every Kansas market searches differently
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#475569]">
              We don&apos;t treat &quot;Kansas&quot; as one keyword. Here&apos;s how the markets we serve actually differ — and why a local-first strategy wins.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <div key={m.city} className="rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4" style={{ color: GREEN }} />
                  <h3 className="text-sm font-black text-[#0a0f2e]">{m.city}</h3>
                </div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">{m.county}</p>
                <p className="text-xs leading-relaxed text-[#475569]">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── SERVICES ── */}
      <section className="bg-[#eaecf3] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Services</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">Two Specialized Service Lines</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-[#475569]">
              Every campaign is built around your specific practice area and city — no templates, no recycled strategies.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border-2 border-[#e2e8f0] bg-white p-7">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(10,15,46,0.06)" }}>
                  <s.icon className="h-6 w-6" style={{ color: NAVY }} />
                </div>
                <h3 className="mb-2 text-xl font-black tracking-tight text-[#0a0f2e]">{s.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#475569]">{s.desc}</p>
                <ul className="space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569]">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── WHY SEARCHPREX ── */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>Our Approach</p>
            <h2 className="mb-4 text-3xl font-black tracking-tight text-[#0a0f2e] sm:text-4xl">Why Kansas Law Firms Choose SearchPrex</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {whyPoints.map((p, i) => (
              <div key={p.title} className="flex gap-4 rounded-2xl border border-[#e2e8f0] bg-[#f8f9fc] p-6">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-sm font-black text-white" style={{ background: NAVY }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-bold text-[#0a0f2e]">{p.title}</h3>
                  <p className="text-xs leading-relaxed text-[#475569]">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── E-E-A-T AUTHOR / CREDENTIALS BOX ── */}
      <section className="bg-[#eaecf3] px-4 pb-24">
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#e2e8f0] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white" style={{ background: NAVY }}>
              MS
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-black text-[#0a0f2e]">Strategy led by Mubashar Shahzad</h3>
              <p className="mb-3 text-sm font-semibold" style={{ color: GREEN_DARK }}>Founder &amp; Senior SEO Strategist, SearchPrex</p>
              <p className="mb-4 text-sm leading-relaxed text-[#475569]">
                Every Kansas engagement is personally executed by the founder — a Semrush- and HubSpot-certified SEO strategist with 5+ years specializing in law firm, ecommerce, and local SEO. No juniors, no outsourcing. The person who builds your strategy is the person who runs it.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  <CheckCircle className="h-3 w-3 text-[#16a34a]" /> Semrush Certified
                </a>
                <a
                  href="https://app.hubspot.com/academy/achievements/tc8vffrw/en/1/mubashar-shahzad/seo-ii"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  <CheckCircle className="h-3 w-3 text-[#16a34a]" /> HubSpot Certified
                </a>
                <a
                  href="https://www.linkedin.com/in/mubashar-shahzad-seo/"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#374151] transition-colors hover:border-[#534AB7] hover:text-[#534AB7]"
                >
                  Verify on LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ── CTA STRIP ── */}
      <section className="px-4 py-16" style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="mb-1 text-lg font-bold text-white sm:text-xl">Ready to rank your Kansas law firm?</p>
            <p className="text-sm text-blue-300">Book a free 30-minute strategy call — no commitment, no sales pitch.</p>
          </div>
          <div className="flex flex-shrink-0 gap-3">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#3eb489] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2f9670]"
            >
              <Calendar className="h-4 w-4" /> Book free call
            </a>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white"
            >
              View services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
 