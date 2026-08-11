// app/services/page.tsx
// Proof-first services page — 4 core services, each backed by a real metric
// and a link to its verified case study. Server Component (no client JS):
// fast, fully crawlable, native <details> FAQ. CRO: proof band up top,
// founder E-E-A-T strip, repeated single CTA, floating Reality Check.

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Scale, ShoppingCart, MapPin, Wrench,
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
const SITE = "https://www.searchprex.com";

const baseMetadata: Metadata = {
  title: "SEO Services USA — Law Firm, Ecommerce, Local & Technical",
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
    <main>
      {[breadcrumbSchema, itemListSchema, professionalServiceSchema, faqSchema].map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />

      <PageHero
        compactTop
        centered
        eyebrow="Every claim backed by GSC data"
        title={<>SEO Services That <Accent>Show Their Receipts</Accent></>}
        subtitle="Four core services. No bloated menus, no vanity packages — each one is tied to a real, verified result you can inspect before you spend a dollar."
        primaryCta={{
          href: "/free-audit",
          label: "Get Free SEO Audit",
          icon: <ArrowRight className="h-4 w-4" aria-hidden />,
        }}
        secondaryCta={{ href: "/all-case-studies", label: "See All Case Studies" }}
      />

      <StatStrip tone="ink" stats={bigStats.map((s) => ({ value: s.v, label: s.l }))} />

      {/* ── 4 CORE SERVICES ── */}
      <Section>
        <SectionHeading
          variant="center"
          eyebrow="What we do"
          title="Four Services. Real Proof for Each."
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
                  {/* Per-service tints are categorical, like a chart palette —
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

                <div
                  className={`mt-auto ${radius.chip} border p-4`}
                  style={{ borderColor: color.border, background: color.surface }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold" style={{ color: color.success }}>{s.proof.v}</span>
                    <span className={heading.eyebrow} style={{ color: color.muted }}>{s.proof.l}</span>
                  </div>
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

      {/* ── LAW FIRM SEO BY CITY ──
          This page carries 374 impressions at position 63.84 because Google
          serves it for "[city] law firm seo" queries it cannot possibly win —
          one page cannot rank for Philadelphia, Cleveland, Sugar Land and
          Albuquerque at once. The fix is not to optimise this page harder; it
          is to send those searches to the page that answers them. Hub, not
          competitor. */}
      <Section>
        <SectionHeading
          eyebrow="Law Firm SEO by city"
          title="Which city do you practise in?"
          intro="Local search is decided city by city, so each of these is a page in its own right — the courts you appear in, the practice areas with demand there, and what your state's law changes about the content you need."
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
          — we build the page for your city as part of the engagement.
        </p>
      </Section>

      {/* ── FOUNDER E-E-A-T ── */}
      <Section tone="surface" width="narrow" tight>
        <AuthorCard
          name="Mubashar Shahzad"
          role="Founder & Lead SEO Strategist · 5+ years"
          quote="Every service on this page is led by me personally. 5+ years across local, international, technical, ecommerce and law firm SEO — no juniors, no outsourcing. The person behind these case studies works on your site."
          imageSrc="/images/mubashar-shahzad.jpg"
          imageAlt="Mubashar Shahzad — Founder & Lead SEO Strategist"
          linkedinUrl="https://www.linkedin.com/in/mubashar-shahzad-seo/"
          badges={["Semrush certified", "HubSpot certified"]}
        />
      </Section>

      {/* ── FAQ ── */}
      <Section width="reading">
        <SectionHeading variant="center" eyebrow="FAQ" title="Before You Ask" />
        <FaqList faqs={faqs} name="services-faq" />
      </Section>

      <CtaBand
        eyebrow="Not sure which service fits?"
        title={<>Start With the Free Audit.<br />The Roadmap Tells You.</>}
        body="The founder personally reviews your site and delivers a 90-day growth roadmap within 24 hours — including exactly which service (if any) you actually need."
        actions={[
          { href: "/free-audit", label: "Get Free SEO Audit", icon: <ArrowRight className="h-4 w-4" aria-hidden /> },
          { href: "tel:+923106526316", label: "+92 310 652 6316", variant: "onDark", icon: <Phone className="h-4 w-4" aria-hidden /> },
        ]}
        trustPoints={["24hr turnaround", "No contracts", "Founder does the audit"]}
      />

      {/* ── FLOATING CTA ── */}
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