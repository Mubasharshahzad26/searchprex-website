// app/locations/kansas/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Scale,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Gavel,
  Users,
  Award,
  ShieldCheck,
  Building2,
  Sparkles,
  ExternalLink,
  BookOpen,
  Landmark,
} from "lucide-react";
import { kansasCities, kansasCityToCityPage } from "@/lib/kansas-cities";
import { KANSAS_SEO_CITIES } from "@/lib/kansas-seo-cities";
import { organizationRef } from "@/lib/site-schema";
import { getPageSEO } from "@/lib/admin-seo";
import TaglinePainBand from "@/components/location-wireframe/TaglinePainBand";
import LocationLocalCaseStudies from "@/components/location-wireframe/LocationLocalCaseStudies";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { keepBrandedTitle } from "@/lib/seo-title";

// ── Metadata ────────────────────────────────────────────────────────────────
const baseMetadata: Metadata = {
  title: keepBrandedTitle("Law Firm SEO Kansas | Family Law & Attorney SEO"),
  description:
    "Founder-led law firm SEO for Kansas attorneys in family law, personal injury and criminal defense — Wichita, Overland Park, Kansas City, Topeka and more.",
  alternates: { canonical: "https://www.searchprex.com/locations/kansas" },
  openGraph: {
    title: "Law Firm SEO Across Kansas | SearchPrex",
    description:
      "Founder-led, senior-executed SEO for Kansas law firms. Real local strategy for every market we serve.",
    url: "https://www.searchprex.com/locations/kansas",
    type: "website",
    siteName: "SearchPrex",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm SEO Across Kansas | SearchPrex",
    description:
      "Founder-led, senior-executed SEO for Kansas law firms. Real local strategy for every market we serve.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/locations/kansas", baseMetadata);
}

// ── JSON-LD (entity + breadcrumb for E-E-A-T & rich results) ─────────────────
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.searchprex.com/locations/kansas#service",
      name: "Law Firm SEO in Kansas",
      serviceType: "Law Firm SEO",
      url: "https://www.searchprex.com/locations/kansas",
      description:
        "Founder-led SEO services for law firms and family law attorneys across Kansas.",
      areaServed: { "@type": "State", name: "Kansas" },
      provider: organizationRef,
    },
    {
      "@type": "WebPage",
      "@id": "https://www.searchprex.com/locations/kansas#webpage",
      url: "https://www.searchprex.com/locations/kansas",
      name: "Law Firm SEO Kansas",
      breadcrumb: { "@id": "https://www.searchprex.com/locations/kansas#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.searchprex.com/locations/kansas#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
        { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.searchprex.com/locations" },
        { "@type": "ListItem", position: 3, name: "Kansas", item: "https://www.searchprex.com/locations/kansas" },
      ],
    },
  ],
};

const STATS = [
  { label: "Kansas Legal Hubs", value: "8", icon: MapPin },
  { label: "Fault Threshold", value: "50%", icon: Scale },
  { label: "Niche Exclusivity", value: "1 Firm", icon: ShieldCheck },
  { label: "Founder-Executed", value: "100%", icon: Award },
];

const STATUTES = [
  {
    citation: "K.S.A. 60-258a",
    name: "50% Modified Comparative Fault",
    desc: "Kansas bars recovery if an injured claimant is 50% or more at fault. Missouri uses pure comparative fault. Cross-border pages in KCK and Johnson County must clarify this boundary to convert high-intent personal injury leads.",
  },
  {
    citation: "K.S.A. 60-513",
    name: "Two-Year Statute of Limitations",
    desc: "Personal injury, wrongful death, and tort claims must be filed within two years of injury. We structure landing pages with urgency architecture that prompts searchers to act before evidentiary deadlines lapse.",
  },
  {
    citation: "K.S.A. 23-2703 / 23-2708",
    name: "60-Day Divorce Residency & Waiting Period",
    desc: "Kansas requires at least one spouse to have resided in the state for 60 days prior to filing, followed by a mandatory 60-day cooling-off period before a divorce decree can be finalized, with special military provisions for Fort Riley.",
  },
  {
    citation: "Kansas Bar Rules",
    name: "Attorney Ethics & YMYL Schema",
    desc: "Strict compliance with Kansas Supreme Court attorney advertising rules (Rule 7.1) combined with robust LegalService and Attorney schema markup prevents regulatory risk while winning Google AI Overviews.",
  },
];

const SERVICES = [
  {
    icon: Scale,
    title: "Law Firm SEO",
    desc: "Full-service SEO for personal injury, criminal defense, workers' compensation, and multi-practice firms across Kansas. Built to drive qualified signed retainers, not vanity clicks.",
    features: [
      "Practice-area & geo-targeted landing page silos",
      "Google Business Profile & 3-pack local map optimization",
      "Technical crawl health, mobile speed & Core Web Vitals",
      "Authoritative local citation architecture & review funnels",
    ],
    href: "/services/law-firm-seo",
  },
  {
    icon: Gavel,
    title: "Family Law SEO",
    desc: "Specialized SEO for Kansas family law attorneys targeting divorce, child custody, alimony, child support, and military dissolution searches in competitive county courts.",
    features: [
      "Divorce & custody keyword content strategy with K.S.A. citations",
      "Attorney E-E-A-T & YMYL schema markup integration",
      "County-specific residency rules (K.S.A. 23-2703 compliance)",
      "High-asset marital property division & retirement asset targeting",
    ],
    href: "/services/local-seo",
  },
];

const WHY_POINTS = [
  {
    title: "Attorney-Specific YMYL E-E-A-T",
    body: "Every page is built to Google's legal YMYL standards — credential signals, statutory citations, and practitioner-led copy. Zero generic, mass-produced filler.",
  },
  {
    title: "Google Map Pack Dominance",
    body: "We optimize and actively manage your Google Business Profile to compete for a top-3 local position in the specific Kansas cities and counties you actually serve.",
  },
  {
    title: "100% Founder-Executed, No Outsourcing",
    body: "Strategy, content architecture, schema, and technical fixes are handled directly by founder Mubashar Sharif — never handed off to juniors or offshore contractors.",
  },
  {
    title: "Transparent Weekly Reporting",
    body: "A plain-English report every Monday morning detailing rankings, organic search clicks, Business Profile calls, and form leads — real business metrics, no vanity fluff.",
  },
];

export default function KansasHubPage() {
  const representativeCity = kansasCities[0]; // Wichita as representative for case studies
  const dummyPage = kansasCityToCityPage(representativeCity);

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── 1. HERO SECTION ── */}
      <section className="relative overflow-hidden bg-white text-slate-900 pt-10 pb-16 md:pt-14 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-slate-900 transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-neutral-950 font-bold">Kansas</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900 mb-6">
            <MapPin className="h-3.5 w-3.5 text-neutral-800" />
            Kansas Statewide Legal SEO Hub
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 leading-[1.1] max-w-4xl mx-auto mb-6">
            Law Firm &amp; Family Law SEO Across Kansas
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            We help Kansas law firms rank for high-intent searches that bring signed retainers — not just vanity traffic. Eight legal markets, two proven service lines, 100% founder-executed.
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
                <Icon className="w-4 h-4 text-neutral-800 mx-auto mb-1.5" />
                <div className="text-xl sm:text-2xl font-black text-neutral-950">{value}</div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendly.com/contact-searchprex/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-neutral-800 shadow-sm"
            >
              <Calendar className="h-4 w-4" /> Book Free Strategy Call
            </a>
            <a
              href="#cities"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-neutral-950 transition-colors hover:bg-slate-50 hover:border-slate-400"
            >
              View Kansas Cities <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. TAGLINE PAIN BAND ── */}
      <TaglinePainBand />

      {/* ── 3. KANSAS STATUTORY & LEGAL FRAMEWORK ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              JURISDICTIONAL EXPERTISE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Understanding the Kansas Legal Landscape
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              Generic SEO agencies fail in Kansas because they copy-paste California or Texas content templates. Winning top Google rankings and AI citations requires integrating Kansas statutory realities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATUTES.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-900 bg-slate-100 px-2.5 py-1 rounded">
                    {item.citation}
                  </span>
                  <BookOpen className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-lg font-bold text-neutral-950 mb-2">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. KANSAS CITIES DIRECTORY GRID ── */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200 scroll-mt-12" id="cities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              LOCAL MARKET DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Select Your Kansas Legal Market
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              Each city features a dedicated, locally researched strategy built around the courts, judicial districts, and high-intent search patterns of that market.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kansasCities.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/kansas/${city.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-900 hover:bg-white hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <h3 className="text-lg font-black text-neutral-950 group-hover:text-neutral-900 mb-1">
                    {city.name}, KS
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                    <span>{city.county}</span>
                    <span>·</span>
                    <span>Pop: {city.population}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {city.heroSub}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80">
                  <div className="flex items-center justify-between text-[11px] font-bold text-neutral-950">
                    <span>{city.courts[0] || "District Court"}</span>
                    <span className="text-neutral-600 group-hover:text-neutral-950">Explore →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STATE MAP & GEOGRAPHIC REALITY ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-white text-neutral-900 border border-slate-300">
                <Landmark className="w-3.5 h-3.5 text-neutral-800" />
                Statewide Market Dynamics
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight leading-tight">
                Kansas Is Not One Legal Market — It Is Several
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                A family law attorney in <strong>Overland Park</strong> is competing in one of the most affluent and saturated legal markets in the Midwest, where high-asset divorce and business valuation drive search intent. In contrast, a firm in <strong>Wichita</strong> battles along the I-135 and Kellogg aerospace corridors for workers&apos; compensation and McConnell AFB military divorce cases.
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Meanwhile, in <strong>Lawrence</strong> and <strong>Manhattan</strong>, seasonal academic cycles dictate university-student criminal defense and rental disputes, while <strong>Kansas City, KS</strong> firms must clearly delineate their practice from Missouri to avoid disqualified leads.
              </p>

              <div className="pt-2">
                <Link
                  href="#free-reality-check"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span>Request Kansas Competitor Teardown</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xs">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200">
                  <iframe
                    title="SearchPrex Kansas Service Area Map"
                    src="https://maps.google.com/maps?q=Kansas%2C%20USA&t=&z=6&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-xs font-bold text-neutral-900">Kansas Judicial Districts &amp; County Venues</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Primary coverage spanning Sedgwick, Johnson, Wyandotte, Shawnee, Douglas, and Riley</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TWO SPECIALIZED SERVICE LINES ── */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              SPECIALIZED SERVICE LINES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Engineered for Law Firms That Need Signed Cases
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600">
              Every campaign is built around your specific practice areas and target cities — no recycled templates, no generic directory backlinks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-neutral-950 mb-3">{s.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed mb-6">{s.desc}</p>
                  <div className="space-y-2.5 mb-6">
                    {s.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Link
                  href={s.href}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-neutral-800 transition-colors"
                >
                  Explore {s.title} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHY KANSAS FIRMS CHOOSE SEARCHPREX ── */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-900 block mb-2">
              WHY SEARCHPREX
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-neutral-950 tracking-tight">
              Why Kansas Managing Partners Partner With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {WHY_POINTS.map((p, i) => (
              <div key={i} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-900 text-sm font-black text-white">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-neutral-950">{p.title}</h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LOCAL SEO CASE STUDIES (VERIFIED PROOF) ── */}
      <LocationLocalCaseStudies page={dummyPage} />

      {/* ── 9. NOT A LAW FIRM (MULTI-SERVICE STRIP) ── */}
      <section className="bg-white py-16 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-900 block mb-2">
            MULTI-SERVICE SEO
          </span>
          <h2 className="text-2xl font-black text-neutral-950 mb-3">
            Not a Law Firm? SEO Services for Other Kansas Businesses
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-600 mb-6">
            Local, ecommerce, and technical SEO for Kansas home service contractors, healthcare practices, and B2B companies.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {KANSAS_SEO_CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/locations/kansas/${c.slug}/seo-services`}
                className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-bold text-neutral-900 hover:border-neutral-900 hover:bg-white transition-all shadow-2xs"
              >
                SEO in {c.name}, KS
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. DEDICATED 24-HOUR REALITY CHECK FORM ── */}
      <section id="free-reality-check" className="py-16 md:py-20 bg-slate-50 border-b border-slate-200 scroll-mt-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleLeadMagnet
            variant="bottom"
            source="location:kansas"
            copy={{
              headline: "See where your law firm ranks across Kansas — free.",
              sub: "Send your URL. I will personally audit your website, your Google Business Profile, and the competitors currently outranking you in your county — delivered within 24 hours.",
            }}
          />
        </div>
      </section>

      {/* ── 11. FOUNDER E-E-A-T AUTHOR BOX ── */}
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
                  Founder &amp; Senior SEO Strategist
                </span>
                <span className="text-xs text-slate-500">SearchPrex</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-950">
                Strategy Led Personally by Mubashar Sharif
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Every Kansas engagement is personally executed by the founder — a Semrush- and HubSpot-certified SEO strategist with 5+ years specializing in law firm, ecommerce, and local SEO. No junior account coordinators, no overseas outsourcing. The strategist who analyzes your Kansas market is the one who executes your work.
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
                <a
                  href="https://static.semrush.com/academy/certificates/e45cf0b323/mubashar-shahzad_25.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-700 hover:underline"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Semrush Technical SEO
                </a>
                <span className="text-slate-300">·</span>
                <a
                  href="https://app.hubspot.com/academy/achievements/tc8vffrw/en/1/mubashar-shahzad/seo-ii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-700 hover:underline"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> HubSpot Certified
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 12. CLOSING CTA BANNER ── */}
      <section className="py-16 md:py-20 bg-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            1-Firm Per Practice Niche Across Kansas
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to Dominate Search in Your Kansas City?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Lock in market exclusivity for your practice area before your direct competitor does.
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