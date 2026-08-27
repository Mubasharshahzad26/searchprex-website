// app/locations/[state]/[city]/page.tsx
//
// Law firm SEO landing page for a city. Server Component throughout — no client
// JS is needed, and these pages are the ones that most need to be fast and
// fully crawlable.
//
// Structure is deliberate. Headings are phrased as questions people actually
// type, and each is answered in its first sentence, because that is what an AI
// Overview can lift. Bullet lists carry the scannable substance. The
// jurisdiction-specific section (Michigan no-fault, Louisiana prescription,
// California equity compensation) is what keeps twelve pages from being one
// page with the city name swapped out.
//
// Kansas is untouched: /locations/kansas/[city] is a static segment and wins
// route precedence, so its existing URLs and its ranking Wichita page are
// unaffected.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone, Scale, Landmark, Users } from "lucide-react";
import {
  Breadcrumb,
  CardGrid,
  CtaBand,
  CtaButton,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import {
  getAllCityParams,
  getCityPage,
  getSiblingCities,
  type CityPage,
} from "@/lib/city-pages";
import { ChatWidgetLazy } from "@/components/ChatWidgetLazy";

const SITE = "https://www.searchprex.com";

export function generateStaticParams() {
  return getAllCityParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const page = getCityPage(state, city);
  if (!page) return { title: "Location not found", robots: { index: false, follow: true } };

  const url = `${SITE}/locations/${page.stateSlug}/${page.citySlug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: [
      `law firm seo ${page.city.toLowerCase()}`,
      `attorney seo ${page.city.toLowerCase()}`,
      `seo for lawyers ${page.city.toLowerCase()}`,
      `${page.city.toLowerCase()} law firm marketing`,
      `lawyer seo ${page.state.toLowerCase()}`,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: "SearchPrex",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const page = getCityPage(state, city);
  if (!page) notFound();

  const url = `${SITE}/locations/${page.stateSlug}/${page.citySlug}`;
  const siblings = getSiblingCities(page);

  return (
    <>
      <Schema page={page} url={url} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Law Firm SEO", href: "/services/law-firm-seo" },
          { label: `${page.city}, ${page.stateAbbr}` },
        ]}
      />

      <main>
        <PageHero
          compactTop
          eyebrow={`Law Firm SEO · ${page.city}, ${page.stateAbbr}`}
          title={
            <>
              Law Firm SEO in{" "}
              <Accent>
                {page.city}, {page.state}
              </Accent>
            </>
          }
          subtitle={page.heroSub}
          primaryCta={{
            href: "/free-audit",
            label: `Get a free ${page.city} SEO audit`,
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          }}
          secondaryCta={{ href: "/tools/keyword-research", label: "See keyword data for your practice area" }}
          trustPoints={["No contracts", "Founder works your account", "24-hour audit turnaround"]}
        />

        {/* ── FOUNDER MESSAGE & AI ── */}
        {(page.founderMessage || page.llmDirectAnswer) && (
          <Section width="reading" tight>
            <div className={`p-6 md:p-8 ${radius.card} border bg-white shadow-sm mb-12`} style={{ borderColor: color.border }}>
              <div className="flex flex-col gap-6">
                {page.founderMessage && (
                  <div>
                    <h2 className={`${heading.h4} mb-3`} style={{ color: color.ink }}>A message from Mubashar Shahzad, Founder</h2>
                    <p className={text.body} style={{ color: color.muted }}>{page.founderMessage}</p>
                  </div>
                )}
                {page.llmDirectAnswer && (
                  <div className="rounded-lg bg-blue-50/50 p-4 border border-blue-100">
                    <p className={`${text.small} font-semibold mb-1`} style={{ color: color.primary }}>AI Overview & Direct Answer</p>
                    <p className={text.small} style={{ color: color.muted }}>{page.llmDirectAnswer}</p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        )}

        {/* ── PROBLEM ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="The situation"
            title={`Why ${page.city} law firms are not showing up`}
            intro={page.problem}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.problemPoints.map((point) => (
              <li
                key={point}
                className={`flex items-start gap-3 ${radius.card} border bg-white p-5`}
                style={{ borderColor: color.border }}
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: color.danger }}
                  aria-hidden
                />
                <span className={text.small} style={{ color: color.muted }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── SOLUTION ── */}
        <Section>
          <SectionHeading
            eyebrow="What we do about it"
            title={`What law firm SEO in ${page.city} actually involves`}
            intro={`Every item below is work we do on your site and your Google Business Profile — not a report telling you to do it yourself.`}
          />
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.solutionPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: color.success }}
                  strokeWidth={2.5}
                  aria-hidden
                />
                <span className={text.small} style={{ color: color.muted }}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── PRACTICE AREAS ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Where the demand is"
            title={`Which practice areas get searched most in ${page.city}?`}
            intro={`These are the areas with real search volume in ${page.county}. Each one needs its own page — a single "practice areas" page will not rank for any of them.`}
          />
          <CardGrid columns={2}>
            {page.practiceDemand.map((p) => (
              <FeatureCard
                key={p.area}
                icon={<Scale className="h-5 w-5" style={{ color: color.primary }} aria-hidden />}
                title={p.area}
                body={p.why}
              />
            ))}
          </CardGrid>
        </Section>

        {/* ── JURISDICTION-SPECIFIC ── */}
        <Section width="reading">
          <SectionHeading eyebrow={`${page.state} specifics`} title={page.legalContext.heading} />
          <p className={text.body} style={{ color: color.muted }}>
            {page.legalContext.body}
          </p>
        </Section>

        {/* ── LOCAL SIGNALS ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Local ranking signals"
            title={`How we make Google see you as a ${page.city} firm`}
            intro="Local rankings come from signals Google can verify, not from repeating the city name. These are the ones that move the map pack."
          />
          <CardGrid columns={2}>
            {page.localSignals.map((s) => (
              <FeatureCard
                key={s.label}
                icon={<MapPin className="h-5 w-5" style={{ color: color.primary }} aria-hidden />}
                title={s.label}
                body={s.detail}
              />
            ))}
          </CardGrid>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <FactPanel
              icon={<Landmark className="h-4 w-4" aria-hidden />}
              label="Courts we reference"
              items={page.courts}
            />
            <FactPanel
              icon={<Users className="h-4 w-4" aria-hidden />}
              label="Bar associations"
              items={[page.barAssociation]}
            />
            <FactPanel
              icon={<MapPin className="h-4 w-4" aria-hidden />}
              label="Areas covered"
              items={page.neighborhoods}
            />
          </div>
        </Section>

        {/* ── FAQ ── */}
        <Section width="reading">
          <SectionHeading
            eyebrow="FAQ"
            title={`Law firm SEO in ${page.city} — common questions`}
          />
          <FaqList faqs={page.faqs} name={`${page.citySlug}-faq`} />
        </Section>

        {/* ── SIBLING CITIES ── */}
        {siblings.length > 0 ? (
          <Section tone="surface" tight>
            <SectionHeading
              eyebrow="Nearby"
              title={`Also serving ${page.state}`}
              className="mb-6"
            />
            <ul className="flex flex-wrap gap-3">
              {siblings.map((s) => (
                <li key={s.citySlug}>
                  <Link
                    href={`/locations/${s.stateSlug}/${s.citySlug}`}
                    className={`inline-flex items-center gap-2 ${radius.control} border bg-white px-4 py-2 text-sm font-semibold transition-colors hover:border-[#534AB7]`}
                    style={{ borderColor: color.border, color: color.ink }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: color.primary }} aria-hidden />
                    Law Firm SEO {s.city}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <CtaBand
          eyebrow={`${page.city}, ${page.stateAbbr}`}
          title={
            <>
              See exactly where you rank
              <br />
              in {page.city} — free.
            </>
          }
          body={`The founder personally reviews your site, your Google Business Profile and your ${page.county} rankings, then sends a 90-day plan within 24 hours. No obligation, no contract.`}
          actions={[
            {
              href: "/free-audit",
              label: "Get my free audit",
              icon: <ArrowRight className="h-4 w-4" aria-hidden />,
            },
            {
              href: "tel:+923106526316",
              label: "+92 310 652 6316",
              variant: "onDark",
              icon: <Phone className="h-4 w-4" aria-hidden />,
            },
          ]}
          trustPoints={["24hr turnaround", "No contracts", "Founder does the audit"]}
        />

        <ChatWidgetLazy />
      </main>
    </>
  );
}

/* ── Pieces ── */

function FactPanel({
  icon,
  label,
  items,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
}) {
  return (
    <div className={`${radius.card} border bg-white p-5`} style={{ borderColor: color.border }}>
      <p
        className={`${heading.eyebrow} mb-3 flex items-center gap-2`}
        style={{ color: color.primary }}
      >
        {icon}
        {label}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className={text.caption} style={{ color: color.muted }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * ProfessionalService + Service + FAQPage + BreadcrumbList.
 *
 * ProfessionalService is a LocalBusiness subtype, which is what gives these
 * pages a local-business signal Google understands.
 *
 * What it deliberately does NOT carry is a street address in this city.
 * LocalBusiness markup is meant to describe a place a customer can physically
 * visit, and SearchPrex is remote — there is no Detroit office, no Cleveland
 * office. Publishing one would be a fabricated NAP, which is both dishonest and
 * a documented way to get local markup ignored or penalised. `areaServed`
 * carries the geography instead, which is the accurate claim: we serve this
 * city, we are not located in it.
 *
 * FAQPage carries every question the page renders, because that markup is what
 * makes these answers eligible to be quoted in an AI Overview.
 */
function Schema({ page, url }: { page: CityPage; url: string }) {
  const areaServed = [
    {
      "@type": "City",
      name: page.city,
      containedInPlace: { "@type": "State", name: page.state },
    },
    { "@type": "AdministrativeArea", name: page.county },
  ];

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#localbusiness`,
    name: `SearchPrex — Law Firm SEO, ${page.city}`,
    description: page.metaDescription,
    url,
    // No `address` on purpose — see the note above. `areaServed` is the honest
    // geographic claim for a remote agency.
    areaServed,
    priceRange: "$$",
    email: "contact@searchprex.com",
    telephone: "+92-310-652-6316",
    knowsAbout: [
      "Law firm SEO",
      "Local SEO",
      "Google Business Profile optimisation",
      ...page.practiceDemand.map((p) => p.area),
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "SearchPrex",
      url: SITE,
    },
    founder: {
      "@type": "Person",
      name: "Mubashar Shahzad",
      jobTitle: "Founder & Lead SEO Strategist",
      sameAs: ["https://www.linkedin.com/in/mubashar-shahzad-seo/"],
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Law Firm SEO in ${page.city}, ${page.state}`,
    serviceType: "Law Firm SEO",
    description: page.metaDescription,
    url,
    provider: {
      "@type": "Organization",
      name: "SearchPrex",
      url: SITE,
      founder: {
        "@type": "Person",
        name: "Mubashar Shahzad",
        jobTitle: "Founder & Lead SEO Strategist",
        sameAs: ["https://www.linkedin.com/in/mubashar-shahzad-seo/"],
      },
    },
    areaServed: [
      { "@type": "City", name: page.city, containedInPlace: { "@type": "State", name: page.state } },
      { "@type": "AdministrativeArea", name: page.county },
    ],
    audience: {
      "@type": "Audience",
      audienceType: `Law firms and attorneys in ${page.city}, ${page.state}`,
    },
  };

  const faqsToUse = [...page.faqs];
  if (page.llmDirectAnswer) {
    faqsToUse.unshift({
      q: `What is the best law firm SEO strategy in ${page.city}, ${page.state}?`,
      a: page.llmDirectAnswer
    });
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqsToUse.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: `Law Firm SEO in ${page.city}, ${page.state}`,
    description: page.metaDescription,
    abstract: page.llmDirectAnswer || page.metaDescription, // GEO signal
    inLanguage: "en-US",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Law Firm SEO", item: `${SITE}/services/law-firm-seo` },
      { "@type": "ListItem", position: 3, name: `${page.city}, ${page.stateAbbr}`, item: url },
    ],
  };

  return (
    <>
      {[professionalService, service, faq, breadcrumb, webPage].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
