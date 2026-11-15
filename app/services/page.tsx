// app/services/page.tsx
// Proof-first services page â€” 4 core services, each backed by a real metric
// and a link to its verified case study. Server Component (no client JS):
// fast, fully crawlable, native <details> FAQ. CRO: proof band up top,
// founder E-E-A-T strip, repeated single CTA, floating Reality Check.

import type { Metadata } from "next";
import ServiceUsaMapAndMarkets from "@/components/service-wireframe/ServiceUsaMapAndMarkets";
import { SpokeEssentials, SpokeWhyAndAi } from "@/components/service-wireframe/SpokeSections";
import Link from "next/link";
import {
  ArrowRight, Scale, ShoppingCart, MapPin, Wrench, Sparkles, Store,
  CheckCircle, BarChart3, Phone,
} from "lucide-react";

import {
  AuthorCard,
  Breadcrumb,
  CardGrid,
  CtaBand,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { CITY_PAGES } from "@/lib/city-pages";

import { getPageSEO } from "@/lib/admin-seo";
import ProofImage from "@/components/ProofImage";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import SeoFixSchema from "@/components/SeoFixSchema";
const SITE = "https://www.searchprex.com";

const baseMetadata: Metadata = {
  // Kept in step with the CMS row for /services, which wins when published.
  title: "SEO Services USA From $800/mo | Free Audit, 90-Day Guarantee",
  description:
    "SEO services in the USA for law firms, local and small businesses and online stores, each with published prices and screenshot proof. Month to month.",
  alternates: { canonical: `${SITE}/services` },
  openGraph: {
    title: "SEO Services USA â€” Law Firm, Ecommerce, Local, Technical & AI Search | SearchPrex",
    description:
      "Five SEO services with GSC-verified results. Founder-led, proof-first. Free audit + 90-day roadmap.",
    url: `${SITE}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO Services USA â€” Law Firm, Ecommerce, Local, Technical & AI Search",
    description:
      "Five SEO services with GSC-verified results. Founder-led. Free audit + 90-day roadmap.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/services", baseMetadata);
}

/* â”€â”€ 5 core services â€” each tied to a REAL verified result â”€â”€ */
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
    // No law firm case study yet: the capture is a local business, and the
    // caption says so rather than letting a law card imply a law result.
    shot: {
      src: "/images/proof/local-mammoth-texas.png",
      alt: "Google Search Console performance report for Mammoth Roofing in Texas showing 45.2K impressions in 28 days.",
      width: 624,
      height: 334,
      figure: "16.9K â†’ 45.2K",
      figureLabel: "impressions in 28 days",
      caption: "High-intent regional query demand â€” Mammoth Roofing, Texas. We apply the same practice-area entity architecture for law firms.",
    },
    proofLink: "/case-studies",
    proofLabel: "See every case study",
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
      "Product & category content at scale â€” no thin pages",
      "Product schema, crawl budget & Core Web Vitals",
      "Brand-by-brand content strategy",
    ],
    shot: {
      src: "/images/proof/smk-revenue-after-v2.png",
      alt: "SMK Store WooCommerce dashboard for June 2026 showing $19,100.71 net sales this month.",
      width: 863,
      height: 350,
      figure: "$5.8K â†’ $19.1K",
      figureLabel: "monthly net sales, Apr â†’ Jun 2026",
      caption: "SMK Store â€” WooCommerce dashboard, June 2026.",
    },
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
    shot: {
      src: "/images/proof/local-dolls-gsc-comparison.jpg",
      alt: "Google Search Console comparison for D.O.L.L.S. Cleaning: 264 clicks and 106K impressions in July 2025 against 192 clicks and 41K impressions in June 2025.",
      width: 626,
      height: 239,
      figure: "192 â†’ 264",
      figureLabel: "monthly clicks, Jun â†’ Jul 2025",
      caption: "D.O.L.L.S. Cleaning, Michigan â€” Search Console.",
    },
    proofLink: "/case-studies/cleaning/dolls-cleaning",
    proofLabel: "Read the D.O.L.L.S. Cleaning case study",
  },
  {
    icon: Wrench,
    name: "Technical SEO",
    slug: "/services/technical-seo",
    color: "#185FA5",
    bg: "#E6F1FB",
    forWho: "For sites where something is broken â€” and nobody can find it.",
    includes: [
      "Full technical audit (crawl, indexation, logs)",
      "Indexing recovery & sitemap architecture",
      "Core Web Vitals & site speed fixes",
      "Structured data / schema implementation",
    ],
    shot: {
      src: "/images/proof/mso-gsc-indexing-full.png",
      alt: "Google Search Console Pages report for Michigan Sports & Outdoor showing 11,549 indexed pages on 25 July 2026.",
      width: 778,
      height: 520,
      figure: "3,000 â†’ 11,549",
      figureLabel: "pages indexed, May â†’ Jul 2026",
      caption: "Michigan Sports & Outdoor â€” Search Console Pages report.",
    },
    proofLink: "/case-studies/ecommerce/michigan-outdoor-sports",
    proofLabel: "Read the Michigan case study",
  },
  {
    icon: Store,
    name: "Small Business SEO",
    slug: "/services/small-business-seo",
    color: "#7c3aed",
    bg: "#f3e8ff",
    forWho: "For small businesses, local or online, that need calls and sales without an agency budget.",
    includes: [
      "Free audit of your site and competitors",
      "Google Business Profile and Maps",
      "Technical fixes and keyword research",
      "A plain-English report every Monday",
    ],
    shot: {
      src: "/images/proof/local-hvac-ai-overview.png",
      alt: "Google AI Overview naming HVAC Services Team among businesses offering free AC installation estimates in Simi Valley, California.",
      width: 717,
      height: 292,
      figure: "Named",
      figureLabel: "in Google's AI Overview",
      caption: "HVAC Services Team, Simi Valley â€” Google Search.",
    },
    proofLink: "/case-studies/hvac/local-hvac-services",
    proofLabel: "Read the HVAC case study",
  },
  {
    icon: Sparkles,
    name: "AI Search Optimization (GEO & AEO)",
    slug: "/ai-search",
    color: "#2563eb",
    bg: "#eff6ff",
    forWho: "For brands targeting citations in ChatGPT, Perplexity, and Google AI Overviews.",
    includes: [
      "Direct Answer capsule engineering (40-60 words)",
      "Multi-entity Schema markup & Wikidata disambiguation",
      "LLM citation tracking across ChatGPT, Claude & Perplexity",
      "AI crawler optimization (GPTBot, PerplexityBot, ClaudeBot)",
    ],
    shot: {
      src: "/images/proof/local-dolls-ai-overview-rank1.png",
      alt: "Google AI Overview for post-construction cleaning in Chesterfield, MI naming D.O.L.L.S. Cleaning, with the business ranked first in the results below.",
      width: 628,
      height: 322,
      figure: "Rank #1",
      figureLabel: "AI Overview citation + organic rank",
      caption: "D.O.L.L.S. Cleaning â€” named directly in Google's AI Overview and ranked #1 in organic results.",
    },
    proofLink: "/ai-search",
    proofLabel: "Explore AI search methodology",
  },
];

// One fact per stat, each traceable to a screenshot on the site. The strip used
// to read "20+ clients worldwide" (nothing backs it), "+285% pages indexed" and
// "+285% indexing rate" (one fact twice) and "12K+ pages indexed".
const bigStats = [
  { v: "3,000 â†’ 11,549", l: "Pages indexed Â· Michigan Sports & Outdoor" },
  { v: "$5.8k â†’ $19.1k", l: "Monthly revenue Â· SMK Store" },
  { v: "#1", l: "AI Overview Â· D.O.L.L.S. Cleaning" },
  { v: "16.9K â†’ 45.2K", l: "Impressions in 28 days Â· Mammoth Roofing" },
];

const faqs = [
  {
    q: "Which SEO service do I actually need?",
    a: "Start with the free audit â€” the founder reviews your site and tells you exactly which of the four services (or which combination) will move the needle, with a 90-day roadmap. No guessing, no upselling.",
  },
  {
    q: "How are your SEO results verified?",
    a: "Every figure we publish comes from the client's own dashboard â€” Google Search Console for clicks, impressions and indexing, the store's WooCommerce dashboard for sales, and Google's own results pages for rankings â€” and the screenshot is on the case study. Several case studies also have screen recordings.",
  },
  {
    q: "Who does the work on my SEO account?",
    a: "The founder, Mubashar Sharif, leads every account personally â€” no juniors, no outsourcing. You work directly with the person behind the case studies on this site.",
  },
  {
    q: "How much do your SEO services cost?",
    a: `Monthly retainers are ${RETAINER_PLANS.map((p) => `${formatRange(p)} for ${p.niche}`).join(", ")}; technical SEO is quoted after the audit. Everything is month to month, and the full breakdown is on the pricing page.`,
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
    a: "The free audit covers your site health, your top 10 pages, your competitors, which pages Google has indexed, and a 90-day plan. The founder reads every one himself.",
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
      "Technical SEO",
      "AI Search Optimization (GEO & AEO)"
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
    <main>
      <SeoFixSchema path="/services" />
      {[breadcrumbSchema, itemListSchema, professionalServiceSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <PageHero
        compactTop
        centered
        eyebrow="Every claim backed by GSC data"
        title={<>SEO Services USA That <Accent>Show Their Receipts</Accent></>}
        subtitle="Six core services. No bloated menus, no vanity packages â€” each one is tied to a real, verified result you can inspect before you spend a dollar."
        primaryCta={{
          href: "/free-audit",
          label: "Get Free SEO Audit",
          icon: <ArrowRight className="h-4 w-4" aria-hidden />,
        }}
        secondaryCta={{ href: "/case-studies", label: "See All Case Studies" }}
      />

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ 1.5 TECHNICAL PLATFORM & SOLUTIONS QUICK-NAV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="bg-neutral-900 border-y border-neutral-800 text-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-white">
              âš¡
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-neutral-400">
                SearchPrex Engineering &amp; Solutions
              </p>
              <p className="text-sm font-semibold text-neutral-200">
                Code fixes, templates and step-by-step guides from real client work.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/resources/solution"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-950 shadow-sm transition-all hover:bg-neutral-200"
            >
              ðŸ› ï¸ View Solutions Library
            </Link>
            <Link
              href="/resources/news"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-3.5 py-1.5 text-xs font-bold text-neutral-200 shadow-sm transition-all hover:border-neutral-500 hover:text-white"
            >
              ðŸ“° Latest News Desk
            </Link>
            <Link
              href="/resources/learning-hub"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-3.5 py-1.5 text-xs font-bold text-neutral-200 shadow-sm transition-all hover:border-neutral-500 hover:text-white"
            >
              ðŸ“š 20-Module Playbooks
            </Link>
            <Link
              href="/resources/forum"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-800 px-3.5 py-1.5 text-xs font-bold text-neutral-200 shadow-sm transition-all hover:border-neutral-500 hover:text-white"
            >
              ðŸ’¬ Discussions
            </Link>
          </div>
        </div>
      </section>

      <StatStrip tone="ink" stats={bigStats.map((s) => ({ value: s.v, label: s.l }))} />

      {/* â”€â”€ 5 CORE SERVICES â”€â”€ */}
      <SpokeEssentials
        keyword="SEO services in the USA"
        answer="from SearchPrex cover law firm, local, small business, ecommerce, technical and AI search SEO, each with a published price, from $800 a month, and proof from clients' own dashboards. Tired of paying for clicks? Start with a free audit."
      />

      <Section>
        <SectionHeading
          variant="center"
          eyebrow="What we do"
          title="Six SEO services. Real proof for each."
        />

        <CardGrid variant="cards" columns={2}>
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.name}
                className={`group flex flex-col ${radius.card} border bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-xl md:p-8`}
                style={{ borderColor: color.border }}
              >
                <div className="mb-5 flex items-center gap-4">
                  {/* Per-service tints are categorical, like a chart palette â€”
                      they identify which service a card is, and never appear on
                      headings, links or buttons. */}
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center ${radius.chip}`}
                    style={{ background: s.bg }}
                  >
                    <Icon className="h-6 w-6" style={{ color: s.color }} aria-hidden />
                  </span>
                  <h3 className={heading.h3} style={{ color: color.ink }}>{s.name}</h3>
                </div>

                <p className={`${text.small} mb-5 font-semibold`} style={{ color: color.muted }}>
                  {s.forWho}
                </p>

                <ul className="mb-6 space-y-2.5">
                  {s.includes.map((item) => (
                    <li key={item} className={`flex items-start gap-2.5 ${text.small}`} style={{ color: color.muted }}>
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: color.success }} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <ProofImage {...s.shot} sizes="(min-width: 768px) 45vw, 100vw" />
                  <Link
                    href={s.proofLink}
                    className={`mt-2 inline-flex items-center gap-1 ${text.small} font-semibold transition-colors hover:opacity-80`}
                    style={{ color: color.successDark }}
                  >
                    {s.proofLabel} <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>

                <Link
                  href={s.slug}
                  className={`mt-5 inline-flex w-fit items-center gap-1.5 ${text.small} font-semibold transition-colors hover:opacity-80`}
                  style={{ color: color.primary }}
                >
                  Explore {s.name}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </article>
            );
          })}
        </CardGrid>
      </Section>

      {/* â”€â”€ SERVICE COMPARISON MATRIX â”€â”€ */}
      <Section tone="surface">
        <SectionHeading
          variant="center"
          eyebrow="Side-by-side breakdown"
          title="Compare SearchPrex SEO Services"
          intro="Every plan is month to month, with no long contract. The founder does the work, and you get one client per city."
        />

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-600">
              <tr>
                <th className="py-4 px-4 sm:px-6">Service</th>
                <th className="py-4 px-4 sm:px-6">Best For</th>
                <th className="py-4 px-4 sm:px-6">Key Deliverables</th>
                <th className="py-4 px-4 sm:px-6">Proof or measure</th>
                <th className="py-4 px-4 sm:px-6">Retainer Scope</th>
                <th className="py-4 px-4 sm:px-6 text-right">Explore</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                  <Link href="/services/law-firm-seo" className="hover:underline flex items-center gap-1.5 text-purple-700">
                    <Scale className="h-4 w-4" /> Law Firm SEO
                  </Link>
                </td>
                <td className="py-4 px-4 sm:px-6">Attorneys, trial lawyers &amp; legal practices</td>
                <td className="py-4 px-4 sm:px-6">Practice-area silos, GBP local pack, bar ethics review</td>
                <td className="py-4 px-4 sm:px-6 font-medium text-emerald-700">Weekly report: calls, forms, signed cases</td>
                <td className="py-4 px-4 sm:px-6 font-semibold">{formatRange(RETAINER_PLANS[1])} / mo</td>
                <td className="py-4 px-4 sm:px-6 text-right">
                  <Link href="/services/law-firm-seo" className="font-bold text-[#185FA5] hover:underline">
                    View Service â†’
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                  <Link href="/services/ecommerce-seo" className="hover:underline flex items-center gap-1.5 text-cyan-700">
                    <ShoppingCart className="h-4 w-4" /> Ecommerce SEO
                  </Link>
                </td>
                <td className="py-4 px-4 sm:px-6">Shopify &amp; WooCommerce stores (1Kâ€“50K+ SKUs)</td>
                <td className="py-4 px-4 sm:px-6">Mass indexing recovery, collection architecture, product schema</td>
                <td className="py-4 px-4 sm:px-6 font-medium text-emerald-700">$5.8K â†’ $19.1K / mo net sales</td>
                <td className="py-4 px-4 sm:px-6 font-semibold">{formatRange(RETAINER_PLANS[2])} / mo</td>
                <td className="py-4 px-4 sm:px-6 text-right">
                  <Link href="/services/ecommerce-seo" className="font-bold text-[#185FA5] hover:underline">
                    View Service â†’
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                  <Link href="/services/local-seo" className="hover:underline flex items-center gap-1.5 text-emerald-700">
                    <MapPin className="h-4 w-4" /> Local SEO
                  </Link>
                </td>
                <td className="py-4 px-4 sm:px-6">Home services, contractors, multi-location brands</td>
                <td className="py-4 px-4 sm:px-6">GBP reinstatement, geo-targeted city pages, citation cleanup</td>
                <td className="py-4 px-4 sm:px-6 font-medium text-emerald-700">+37.5% clicks (192 â†’ 264)</td>
                <td className="py-4 px-4 sm:px-6 font-semibold">{formatRange(RETAINER_PLANS[0])} / mo</td>
                <td className="py-4 px-4 sm:px-6 text-right">
                  <Link href="/services/local-seo" className="font-bold text-[#185FA5] hover:underline">
                    View Service â†’
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                  <Link href="/services/technical-seo" className="hover:underline flex items-center gap-1.5 text-blue-700">
                    <Wrench className="h-4 w-4" /> Technical SEO
                  </Link>
                </td>
                <td className="py-4 px-4 sm:px-6">Custom web apps, enterprise catalogs, broken crawls</td>
                <td className="py-4 px-4 sm:px-6">Log file audits, Core Web Vitals, canonical &amp; sitemap fixes</td>
                <td className="py-4 px-4 sm:px-6 font-medium text-emerald-700">3,000 â†’ 11,549 indexed pages</td>
                <td className="py-4 px-4 sm:px-6 font-semibold">Quoted after audit</td>
                <td className="py-4 px-4 sm:px-6 text-right">
                  <Link href="/services/technical-seo" className="font-bold text-[#185FA5] hover:underline">
                    View Service â†’
                  </Link>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/60 transition-colors">
                <td className="py-4 px-4 sm:px-6 font-bold text-slate-900">
                  <Link href="/ai-search" className="hover:underline flex items-center gap-1.5 text-indigo-700">
                    <Sparkles className="h-4 w-4" /> AI Search (GEO &amp; AEO)
                  </Link>
                </td>
                <td className="py-4 px-4 sm:px-6">High-intent brands targeting ChatGPT, Perplexity &amp; AIO</td>
                <td className="py-4 px-4 sm:px-6">Answer capsule formatting, Wikidata disambiguation, bot allowlist</td>
                <td className="py-4 px-4 sm:px-6 font-medium text-emerald-700">#1 AI Overview citation</td>
                <td className="py-4 px-4 sm:px-6 font-semibold">Included in retainers</td>
                <td className="py-4 px-4 sm:px-6 text-right">
                  <Link href="/ai-search" className="font-bold text-[#185FA5] hover:underline">
                    View Service â†’
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* â”€â”€ WHY: SearchPrex vs the alternatives â”€â”€ */}
      <SpokeWhyAndAi
        service="SEO services"
        title="SEO services USA: SearchPrex vs the alternatives"
        rows={[["Who does the work","The founder","You, after hours","Often a junior"],["Price","Published on every service","Your time","Usually after a sales call"],["Proof","Clients' own dashboards","n/a","Often logos and claims"],["Contract","Month to month","None","Often 6 to 12 months"],["Risk","7-day free trial, 90-day money-back","Your time","Rarely a guarantee"]]}
        aiLine="Every plan includes the work that gets you named in ChatGPT, Gemini and Google AI Overviews: direct answers, schema and consistent business details."
      />

      {/* â”€â”€ FOUNDER E-E-A-T â”€â”€ */}
      <Section tone="surface" width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead SEO Strategist Â· 5+ years"
          quote="Every service on this page is led by me personally. 5+ years across local, international, technical, ecommerce and law firm SEO â€” no juniors, no outsourcing. The person behind these case studies works on your site."
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif â€” Founder & Lead SEO Strategist"
          linkedinUrl="https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/"
          badges={["Semrush certified", "HubSpot certified"]}
        />
      </Section>

      {/* A form here: /services had calls to action but no way to send a URL. */}
      <Section width="reading" tight>
        <ArticleLeadMagnet
          variant="banner"
          source="services:free-audit"
          buttonText="Get my free audit"
          copy={{
            eyebrow: "Not sure which plan fits?",
            headline: "Get a free audit before you pick a plan",
            sub: "Send me your URL and I'll review it myself: what is holding it back, what to fix first, and which plan (if any) makes sense. Free, reply within 24 hours.",
          }}
        />
      </Section>

      {/* â”€â”€ LAW FIRM SEO BY CITY â”€â”€
          This page carries 374 impressions at position 63.84 because Google
          serves it for "[city] law firm seo" queries it cannot possibly win â€”
          one page cannot rank for Philadelphia, Cleveland, Sugar Land and
          Albuquerque at once. The fix is not to optimise this page harder; it
          is to send those searches to the page that answers them. Hub, not
          competitor. */}
      <ServiceUsaMapAndMarkets
        serviceName="SEO Services"
        answerCapsule="SearchPrex works with law firms, local businesses and online stores across the US, with city pages in 9 states. Pick a pin to see the market."
      />

      <Section>
      <SectionHeading
          eyebrow="Law Firm SEO by city"
          title="Which city do you practice in?"
          intro="Local search is decided city by city, so each of these is a page in its own right â€” the courts you appear in, the practice areas with demand there, and what your state's law changes about the content you need."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CITY_PAGES.map((c) => (
            <Link
              key={`${c.stateSlug}-${c.citySlug}`}
              href={`/locations/${c.stateSlug}/${c.citySlug}`}
              className={`group flex items-start gap-3 ${radius.card} border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
              style={{ borderColor: color.border }}
            >
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: color.primary }}
                aria-hidden
              />
              <span>
                <span className="block font-semibold" style={{ color: color.ink }}>
                  {c.city}, {c.stateAbbr}
                </span>
                <span className={text.caption} style={{ color: color.muted }}>
                  {c.county}
                </span>
              </span>
            </Link>
          ))}

          <Link
            href="/locations/kansas"
            className={`group flex items-start gap-3 ${radius.card} border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
            style={{ borderColor: color.border }}
          >
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0"
              style={{ color: color.primary }}
              aria-hidden
            />
            <span>
              <span className="block font-semibold" style={{ color: color.ink }}>
                Kansas
              </span>
              <span className={text.caption} style={{ color: color.muted }}>
                Wichita, Topeka, Overland Park &amp; more
              </span>
            </span>
          </Link>
        </div>

        <p className={`${text.small} mt-6`} style={{ color: color.muted }}>
          Practising somewhere not listed?{" "}
          <Link href="/free-audit" className="font-semibold underline" style={{ color: color.primary }}>
            Ask for the free audit
          </Link>{" "}
          â€” we build the page for your city as part of the engagement.
        </p>
      </Section>

      {/* â”€â”€ FAQ â”€â”€ */}
      <Section width="reading">
        <SectionHeading variant="center" eyebrow="FAQ" title="Frequently Asked Questions" />
        <FaqList faqs={faqs} name="services-faq" />
      </Section>

      <CtaBand
        eyebrow="Not sure which service fits?"
        title={<>Start With the Free Audit.<br />The Roadmap Tells You.</>}
        body="The founder personally reviews your site and delivers a 90-day growth roadmap within 24 hours â€” including exactly which service (if any) you actually need."
        actions={[
          { href: "/free-audit", label: "Get Free SEO Audit", icon: <ArrowRight className="h-4 w-4" aria-hidden /> },
          { href: "https://calendly.com/contact-searchprex/30min", label: "Book a 30-min call", variant: "onDark", icon: <Phone className="h-4 w-4" aria-hidden /> },
        ]}
        trustPoints={["24hr turnaround", "No contracts", "Founder does the audit"]}
      />

      {/* â”€â”€ FLOATING CTA â”€â”€ */}
      <Link
        href="/free-audit"
        className={`fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full px-4 py-3 ${text.small} font-semibold text-white shadow-2xl transition-all hover:scale-105 sm:bottom-5 sm:right-5 sm:px-5 sm:py-3.5`}
        style={{ background: color.primary }}
      >
        <BarChart3 className="h-4 w-4" aria-hidden /> Reality Check
      </Link>
    </main>
  );
}
