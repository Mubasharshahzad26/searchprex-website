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
import { findPracticePage, getLocationState } from "@/lib/locations";
import type { IndustryPage } from "@/lib/industry-pages";
import { SITE, organizationRef } from "@/lib/site-schema";

/**
 * Anchor variants for the link to the local news spoke. One template renders
 * every city page, so a single hardcoded anchor would produce an identical
 * anchor on every location URL. Rotated by city slug to keep it varied.
 */
const LOCAL_NEWS_ANCHORS = [
  "local SEO news",
  "local search updates",
  "2026 local algorithm changes",
];

/**
 * Character-sum hash rather than slug length. Length was the obvious choice and
 * the wrong one: city slugs cluster tightly around 9-11 characters, so
 * `length % 3` handed the same anchor to detroit, sugar-land and shreveport
 * alike. Summing char codes spreads the three variants across the set.
 */
function localNewsAnchor(slug: string): string {
  let sum = 0;
  for (let i = 0; i < slug.length; i++) sum += slug.charCodeAt(i);
  return LOCAL_NEWS_ANCHORS[sum % LOCAL_NEWS_ANCHORS.length];
}

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
  // Null for a one-city state, which has no hub page to link to.
  const stateHubHref = getLocationState(page.stateSlug)?.hubHref ?? null;
  // Unique practice-area pages matching this city's demand, in demand order.
  const practicePages = [
    ...new Map(
      page.practiceDemand
        .map((d) => findPracticePage(d.area))
        .filter((ip): ip is IndustryPage => Boolean(ip))
        .map((ip) => [ip.slug, ip])
    ).values(),
  ];

  return (
    <>
      <Schema page={page} url={url} stateHubHref={stateHubHref} />

      {/* Follows the URL — Locations › State › City. It used to go Home › Law
          Firm SEO › City while /locations and the state level 404'd; the link
          to the service page now lives in the body, under practice areas. */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          ...(stateHubHref ? [{ label: page.state, href: stateHubHref }] : []),
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
          <p className={`${text.small} mt-6`} style={{ color: color.muted }}>
            How each of these is ranked, anywhere in the US:{" "}
            {practicePages.map((ip, i) => (
              <span key={ip.slug}>
                <Link
                  href={`/services/law-firm-seo/${ip.slug}`}
                  className="font-semibold underline underline-offset-2"
                  style={{ color: color.primary }}
                >
                  {ip.name} SEO
                </Link>
                {i < practicePages.length - 1 ? " · " : ""}
              </span>
            ))}
            {practicePages.length ? " — or start with " : ""}
            <Link
              href="/services/law-firm-seo"
              className="font-semibold underline underline-offset-2"
              style={{ color: color.primary }}
            >
              how law firm SEO works
            </Link>
            .
          </p>
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

        {/* ── SIBLING CITIES + WAY BACK UP ── */}
        <Section tone="surface" tight>
          <SectionHeading
            eyebrow="Nearby"
            title={siblings.length > 0 ? `Also serving ${page.state}` : "Other markets we serve"}
            className="mb-6"
          />
          {siblings.length > 0 ? (
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
          ) : null}
          <p className={`${text.small} ${siblings.length > 0 ? "mt-6" : ""}`} style={{ color: color.muted }}>
            {stateHubHref ? (
              <>
                <Link href={stateHubHref} className="font-semibold underline underline-offset-2" style={{ color: color.primary }}>
                  All {page.state} cities
                </Link>
                {" · "}
              </>
            ) : null}
            <Link href="/locations" className="font-semibold underline underline-offset-2" style={{ color: color.primary }}>
              Every state and city we cover
            </Link>
          </p>
        </Section>

        {/*
          Varied anchor text on purpose: this template renders every city page,
          so an identical anchor would repeat across the whole location set.
          Keyed off the city name to rotate between three phrasings.
        */}
        <Section width="reading" tight>
          <p className="text-[0.9375rem] leading-relaxed" style={{ color: color.ink }}>
            Local rankings move when Google changes how local results work.{" "}
            <Link
              href="/resources/news/local-seo-updates"
              className="font-semibold underline underline-offset-2"
              style={{ color: color.primary }}
            >
              {localNewsAnchor(page.citySlug)}
            </Link>{" "}
            — dated and sourced, so you can line a ranking drop up against what actually changed.
          </p>
        </Section>

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
              href: "tel:+923059158010",
              label: "+92 305 9158010",
              variant: "onDark",
              icon: <Phone className="h-4 w-4" aria-hidden />,
            },
          ]}
          trustPoints={["24hr turnaround", "No contracts", "Founder does the audit"]}
        />
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
 * Service + FAQPage + BreadcrumbList.
 *
 * No ProfessionalService. It is a LocalBusiness subtype, which describes a
 * place a customer can visit, and there is no Detroit office or Cleveland
 * office — the old node already had to leave `address` out for exactly that
 * reason. A Service with `areaServed` makes the accurate claim (we serve this
 * city, we are not located in it), and its provider is the one Organization
 * defined in lib/site-schema.ts rather than another inline copy of it.
 *
 * FAQPage carries every question the page renders, because that markup is what
 * makes these answers eligible to be quoted in an AI Overview.
 */
function Schema({ page, url, stateHubHref }: { page: CityPage; url: string; stateHubHref: string | null }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Law Firm SEO in ${page.city}, ${page.state}`,
    serviceType: "Law Firm SEO",
    description: page.metaDescription,
    url,
    provider: organizationRef,
    areaServed: [
      { "@type": "City", name: page.city, containedInPlace: { "@type": "State", name: page.state } },
      { "@type": "AdministrativeArea", name: page.county },
    ],
    audience: {
      "@type": "Audience",
      audienceType: `Law firms and attorneys in ${page.city}, ${page.state}`,
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
      ...(stateHubHref
        ? [{ "@type": "ListItem", position: 3, name: page.state, item: `${SITE}${stateHubHref}` }]
        : []),
      {
        "@type": "ListItem",
        position: stateHubHref ? 4 : 3,
        name: `${page.city}, ${page.stateAbbr}`,
        item: url,
      },
    ],
  };

  return (
    <>
      {[service, faq, breadcrumb].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
