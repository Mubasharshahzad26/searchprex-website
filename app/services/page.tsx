// app/services/page.tsx
// Proof-first services page — 4 core services, each backed by a real metric
// and a link to its verified case study. Server Component (no client JS):
// fast, fully crawlable, native <details> FAQ. CRO: proof band up top,
// founder E-E-A-T strip, repeated single CTA, floating Reality Check.

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Scale, ShoppingCart, MapPin, Wrench, ShieldCheck,
  CheckCircle, BarChart3, Phone, Linkedin, BadgeCheck, ChevronDown,
} from "lucide-react";

import { getPageSEO } from "@/lib/admin-seo";
const SITE = "https://www.searchprex.com";
const GREEN = "#3eb489";
const GREEN_DARK = "#2f9670";
const PURPLE = "#534AB7";
const NAVY = "#0a0f2e";

const baseMetadata: Metadata = {
  title: "SEO Services USA — Law Firm, Ecommerce, Local & Technical | SearchPrex",
  description:
    "Four SEO services with GSC-verified results: law firm SEO, ecommerce & Shopify SEO, local SEO, technical SEO. Founder-led. Free audit + 90-day roadmap.",
  alternates: { canonical: `${SITE}/services` },
  openGraph: {
    title: "SEO Services USA — Law Firm, Ecommerce, Local & Technical | SearchPrex",
    description:
      "Four SEO services with GSC-verified results. Founder-led, proof-first. Free audit + 90-day roadmap.",
    url: `${SITE}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services USA — Law Firm, Ecommerce, Local & Technical",
    description:
      "Four SEO services with GSC-verified results. Founder-led. Free audit + 90-day roadmap.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/services", baseMetadata);
}

/* ── 4 core services — each tied to a REAL verified result ── */
const services = [
  {
    icon: Scale,
    name: "Law Firm SEO",
    slug: "/services/law-firm-seo",
    color: "#7c3aed",
    bg: "#f3e8ff",
    forWho: "For attorneys and law firms that need cases, not clicks.",
    includes: [
      "Practice-area & city landing pages",
      "Local pack + Google Business Profile domination",
      "E-E-A-T content attorneys can stand behind",
      "AI Overview / AEO optimization for legal queries",
    ],
    proof: { v: "Featured", l: "AI Overview placement" },
    proofLink: "/all-case-studies",
    proofLabel: "See verified results",
  },
  {
    icon: ShoppingCart,
    name: "Ecommerce & Shopify SEO",
    slug: "/services/ecommerce-seo",
    color: "#0891b2",
    bg: "#ecfeff",
    forWho: "For stores with thousands of products Google ignores.",
    includes: [
      "Mass non-indexing recovery (GSC-verified)",
      "Product & category content at scale — no thin pages",
      "Product schema, crawl budget & Core Web Vitals",
      "Brand-by-brand content strategy",
    ],
    proof: { v: "+75%", l: "US revenue in 2 months" },
    proofLink: "/case-studies/ecommerce/smk-store",
    proofLabel: "Read the SMK Store case study",
  },
  {
    icon: MapPin,
    name: "Local SEO",
    slug: "/services/local-seo",
    color: "#059669",
    bg: "#ecfdf5",
    forWho: "For service businesses that live or die by the map pack.",
    includes: [
      "Google Business Profile optimization",
      "Citations, NAP consistency & reviews engine",
      "Service-area landing pages that rank",
      "'Near me' + AI Overview visibility",
    ],
    proof: { v: "Top 3", l: "Maps pack in 60 days" },
    proofLink: "/case-studies/hvac/local-hvac-services",
    proofLabel: "Read the HVAC case study",
  },
  {
    icon: Wrench,
    name: "Technical SEO",
    slug: "/services/technical-seo",
    color: "#185FA5",
    bg: "#E6F1FB",
    forWho: "For sites where something is broken — and nobody can find it.",
    includes: [
      "Full technical audit (crawl, indexation, logs)",
      "Indexing recovery & sitemap architecture",
      "Core Web Vitals & site speed fixes",
      "Structured data / schema implementation",
    ],
    proof: { v: "+476%", l: "organic clicks in 90 days" },
    proofLink: "/case-studies/ecommerce/michigan-outdoor-sports",
    proofLabel: "Read the Michigan case study",
  },
];

const bigStats = [
  { v: "20+", l: "Clients worldwide" },
  { v: "+476%", l: "Organic clicks" },
  { v: "+285%", l: "Indexing rate" },
  { v: "12K+", l: "Pages indexed" },
];

const faqs = [
  {
    q: "Which SEO service do I actually need?",
    a: "Start with the free audit — the founder reviews your site and tells you exactly which of the four services (or which combination) will move the needle, with a 90-day roadmap. No guessing, no upselling.",
  },
  {
    q: "How are your SEO results verified?",
    a: "Every metric we publish comes straight from Google Search Console — clicks, impressions, indexing and rankings. Several case studies include live GSC screen recordings, not edited screenshots.",
  },
  {
    q: "Who does the work on my SEO account?",
    a: "The founder, Mubashar Shahzad, leads every account personally — no juniors, no outsourcing. You work directly with the person behind the case studies on this site.",
  },
  {
    q: "How much do your SEO services cost?",
    a: "SEO service pricing depends on your website size, competition level, and goals. Small business local SEO starts around $500/month, while ecommerce SEO for large stores can range from $2,000-$5,000/month. The free audit includes a specific pricing recommendation based on your actual needs.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Realistic timelines: technical fixes show impact in 2-4 weeks, local SEO in 60-90 days, and full ecommerce or law firm SEO campaigns show meaningful ranking improvements in 3-6 months. Anyone promising results in 30 days is either doing black-hat SEO or lying.",
  },
  {
    q: "Do you serve businesses outside the United States?",
    a: "Our primary focus is US-based businesses across all 50 states. We occasionally work with Canadian and UK clients when there's strong fit, but our expertise, tools, and processes are optimized for the US market.",
  },
  {
    q: "What's included in the free SEO audit?",
    a: "The free audit covers: technical SEO health check, on-page SEO analysis of your top 10 pages, competitor gap analysis, indexation status review, and a 90-day roadmap with prioritized recommendations. The founder personally reviews every audit.",
  },
  {
    q: "Do you offer month-to-month SEO contracts?",
    a: "Yes. All our SEO services are month-to-month with no long-term contracts. If we're not delivering value, you can cancel anytime. We rely on results to retain clients, not lock-in contracts.",
  },
];

export default function ServicesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SearchPrex SEO Services",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        url: `${SITE}${s.slug}`,
        description: s.forWho,
        provider: {
          "@type": "Organization",
          name: "SearchPrex",
          url: SITE
        },
        areaServed: {
          "@type": "Country",
          name: "United States"
        },
        serviceType: s.name
      },
    })),
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/services/#professionalservice`,
    name: "SearchPrex SEO Services",
    url: `${SITE}/services`,
    logo: `${SITE}/logo.png`,
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "United States" },
    serviceType: [
      "Law Firm SEO",
      "Ecommerce SEO",
      "Local SEO",
      "Technical SEO"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="bg-[#eaecf3]">
      {[breadcrumbSchema, itemListSchema, professionalServiceSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      {/* ── VISIBLE BREADCRUMB ── */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-xs text-[#64748b]">
          <li>
            <Link href="/" className="hover:text-[#534AB7] transition-colors">Home</Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="font-semibold text-[#0a0f2e]" aria-current="page">Services</li>
        </ol>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#d4d8e3] pt-8 pb-14">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest"
            style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
            <ShieldCheck className="h-3.5 w-3.5" /> Every claim backed by GSC data
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-[#0a0f2e] sm:text-5xl lg:text-6xl">
            SEO Services That <span style={{ color: GREEN }}>Show Their Receipts</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[#475569]">
            Four core services. No bloated menus, no vanity packages — each one is tied to a
            real, verified result you can inspect before you spend a dollar.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/free-audit"
              className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: GREEN }}>
              <BarChart3 className="h-4 w-4" /> Get Free SEO Audit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/all-case-studies"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0a0f2e] px-7 py-3.5 text-sm font-bold text-[#0a0f2e] transition-all hover:-translate-y-0.5">
              See All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROOF BAND ── */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl px-6 py-9 md:px-12" style={{ background: NAVY }}>
            <div className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
            <div className="relative grid grid-cols-2 gap-x-6 gap-y-7 text-center md:grid-cols-4">
              {bigStats.map((s, i) => (
                <div key={i} className={i > 0 ? "md:border-l md:border-white/10" : ""}>
                  <p className="text-3xl font-black sm:text-4xl" style={{ color: GREEN }}>{s.v}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-widest text-white/60">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 CORE SERVICES ── */}
      <section className="pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest" style={{ color: GREEN }}>What we do</p>
            <h2 className="text-3xl font-black text-[#0a0f2e] sm:text-4xl">Four Services. Real Proof for Each.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.name}
                  className="group flex flex-col rounded-3xl border border-[#d4d8e3] bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl md:p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ background: s.bg }}>
                      <Icon className="h-6 w-6" style={{ color: s.color }} />
                    </span>
                    <h3 className="text-xl font-black text-[#0a0f2e]">{s.name}</h3>
                  </div>

                  <p className="mb-5 text-sm font-semibold text-[#475569]">{s.forWho}</p>

                  <ul className="mb-6 space-y-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#475569]">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto rounded-2xl border border-[#e6f4ee] p-4"
                    style={{ background: "rgba(62,180,137,0.06)" }}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black" style={{ color: GREEN }}>{s.proof.v}</span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#64748b]">{s.proof.l}</span>
                    </div>
                    <Link href={s.proofLink}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-bold transition-colors hover:opacity-80"
                      style={{ color: GREEN_DARK }}>
                      {s.proofLabel} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <Link href={s.slug}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
                    style={{ color: PURPLE }}>
                    Explore {s.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FOUNDER E-E-A-T STRIP ── */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-[#d4d8e3] bg-white p-8 text-center md:flex-row md:text-left">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-2xl font-black text-white"
              style={{ background: `linear-gradient(135deg, ${PURPLE}, ${GREEN})` }}>MS</div>
            <div className="flex-1">
              <div className="flex flex-col items-center gap-2 md:flex-row md:items-center md:gap-3">
                <p className="text-lg font-black text-[#0a0f2e]">Every service is led by Mubashar Shahzad</p>
                <a href="https://www.linkedin.com/in/mubashar-shahzad-seo/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold transition-all hover:scale-105"
                  style={{ borderColor: "#0a66c2", color: "#0a66c2" }}>
                  <Linkedin className="h-3.5 w-3.5" /> Verified on LinkedIn
                </a>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#64748b]">
                5+ years across local, international, technical, ecommerce and law firm SEO.
                No juniors, no outsourcing — the person behind these case studies works on your site.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold"
                  style={{ background: "rgba(62,180,137,0.12)", color: GREEN_DARK }}>
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified SEO Expert
                </span>
                <span className="rounded-lg border border-[#e2e8f0] px-2.5 py-1 text-xs font-semibold text-[#475569]">Semrush certified</span>
                <span className="rounded-lg border border-[#e2e8f0] px-2.5 py-1 text-xs font-semibold text-[#475569]">HubSpot certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black text-[#0a0f2e]">Before You Ask</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-[#d4d8e3] bg-white p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#0a0f2e]">
                  {f.q}
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-[#64748b] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-[#0a0f2e] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: GREEN }}>
            Not sure which service fits?
          </p>
          <h2 className="mb-4 text-4xl font-black tracking-tight text-white">
            Start With the Free Audit.<br />
            <span style={{ color: GREEN }}>The Roadmap Tells You.</span>
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/70">
            The founder personally reviews your site and delivers a 90-day growth roadmap within
            24 hours — including exactly which service (if any) you actually need.
          </p>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <Link href="/free-audit"
              className="flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: GREEN }}>
              Get Free SEO Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+923106526316"
              className="flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-all hover:bg-white/10">
              <Phone className="h-4 w-4" /> +92 310 652 6316
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["24hr turnaround", "No contracts", "Founder does the audit"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle className="h-4 w-4" style={{ color: GREEN }} />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOATING CTA ── */}
      <Link href="/free-audit"
        className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-2xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5"
        style={{ background: GREEN }}>
        <BarChart3 className="h-4 w-4" /> Reality Check
      </Link>
    </main>
  );
}