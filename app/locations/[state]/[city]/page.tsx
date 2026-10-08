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
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Scale, Landmark, Users, CheckCircle2, ShieldCheck } from "lucide-react";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { LocalProblemSpotlight, LocalSolutionSpotlight } from "@/components/LocalCitySpotlight";
import LocalCityMapSection from "@/components/LocalCityMapSection";
import LocalJurisdictionIntelligence from "@/components/LocalJurisdictionIntelligence";
import SemrushLocalMetricStrip from "@/components/SemrushLocalMetricStrip";
import SemrushCompetitorMatrix from "@/components/SemrushCompetitorMatrix";
import GeoAiOverviewMockup from "@/components/GeoAiOverviewMockup";
import {
  Breadcrumb,
  CardGrid,
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
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import { LAW_CHECKLIST_GUIDE } from "@/lib/guides";
import { findPracticePage, getLocationState } from "@/lib/locations";
import type { IndustryPage } from "@/lib/industry-pages";
import { SITE, organizationRef } from "@/lib/site-schema";
import { isLocationIndexable } from "@/lib/location-indexing";

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
  const indexable = isLocationIndexable(`/locations/${page.stateSlug}/${page.citySlug}`);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    ...(indexable ? {} : { robots: { index: false, follow: true } }),
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
          aside={
            <ArticleLeadMagnet
              variant="sidebar"
              source={`location:${page.stateSlug}/${page.citySlug}`}
              copy={{
                headline: `Free ${page.city} tear-down`,
                sub: `Send your URL. I’ll check your pages, Business Profile and the firms outranking you in ${page.county} — within 24 hours.`,
              }}
            />
          }
        />

        {/* ── SEMRUSH LOCAL SERP METRIC STRIP ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SemrushLocalMetricStrip page={page} />
        </div>

        {/* ── VERIFIED LOCAL SEARCH PROOF STRIP ── */}
        <ServiceProofStrip
          id="proof"
          title="Verified Multi-Location Local SEO Proof"
          moreHref="/case-studies"
          moreLabel="Explore case studies"
          shots={[
            {
              src: "/images/proof/local-dolls-gsc-comparison.jpg",
              alt: `Google Search Console local ranking performance: 192 to 264 monthly clicks and 106K impressions in local market`,
              width: 626,
              height: 239,
              figure: "192 → 264",
              figureLabel: "Monthly organic clicks (+37.5%)",
              caption: `Real Google Search Console data: local impressions jumped from 41K to 106K (+158%) without paid advertising.`,
            },
            {
              src: "/images/proof/local-dolls-rank-1-and-2.png",
              alt: `Google search results with local client occupying position #1 and #2 simultaneously`,
              width: 627,
              height: 338,
              figure: "#1 & #2",
              figureLabel: "Dominating local search results",
              caption: `Local authority: ranking both primary domain and localized service silo in the top 2 spots above national competitors.`,
            },
          ]}
          footnote={`Every figure shown is from verified Google Search Console and live search engine data across our multi-location client campaigns in Michigan, California, and Texas. We deploy this exact ranking architecture for your ${page.city} law firm.`}
        />

        {/* ── PROBLEM ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="The situation"
            title={`Why ${page.city} law firms are not showing up`}
            intro={page.problem}
          />
          <LocalProblemSpotlight page={page} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
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

        {/* ── SEMRUSH COMPETITOR GAP AUDIT ── */}
        <Section>
          <SemrushCompetitorMatrix page={page} />
        </Section>

        {/* The generic "what law firm SEO involves" list used to sit here: six
            bullets identical on every city page, about a tenth of each page's
            text. How the work is done lives once, on /services/law-firm-seo,
            linked under the practice areas below. */}

        {/* ── PRACTICE AREAS ── */}
        <Section>
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

        {/* ── JURISDICTION-SPECIFIC INTELLIGENCE ── */}
        <Section tone="surface">
          <LocalJurisdictionIntelligence page={page} />
        </Section>

        {/* Lead capture mid-page: the reader who has just read the jurisdiction
            section is the one most likely to want their own market checked. */}
        <Section tight>
          <GuideMagnet guide={LAW_CHECKLIST_GUIDE} source={`location:${page.stateSlug}/${page.citySlug}`} eyebrow={`Free for ${page.city} law firms`} />
        </Section>

        {/* ── LOCAL SIGNALS & SOLUTION ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="Local ranking signals"
            title={`How we make Google see you as a ${page.city} firm`}
            intro="Local rankings come from signals Google can verify, not from repeating the city name. These are the ones that move the map pack."
          />
          <LocalSolutionSpotlight page={page} />
          <div className="mt-8">
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
          </div>
        </Section>

        {/* ── INTERACTIVE GOOGLE MAP & COURT GEOFENCING ── */}
        <Section>
          <SectionHeading
            eyebrow="Geographic Authority"
            title={`Interactive ${page.city} Court Corridor & Geofencing Map`}
            intro={`Real-time geographic verification: Google evaluates physical proximity, courthouse corridors, and neighborhood coverage to rank firms in the ${page.county} 3-pack.`}
          />
          <LocalCityMapSection page={page} />
        </Section>

        {/* ── GEO & AI OVERVIEW CITATION TERMINAL ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow="AI Search & LLM Engine Optimization"
            title={`How Google Gemini & ChatGPT Cite Your Firm in ${page.city}`}
            intro="In 2026, prospective legal clients ask AI chatbots conversational questions. We structure your authority so LLMs cite your firm as the primary verified source."
          />
          <GeoAiOverviewMockup page={page} />
        </Section>

        {/* ── FOUNDER EXECUTION & TRUST ── */}
        <Section>
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid items-center md:grid-cols-2">
              <div className="relative aspect-[16/10] h-full min-h-[300px] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/about/founder-hands-on-strategy-desk.webp"
                  alt={`Mubashar Sharif analyzing Google Search Console and local technical SEO data for ${page.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
              </div>
              <div className="p-8 lg:p-10">
                <span className="inline-block rounded-full bg-[#534AB7]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#534AB7]">
                  Founder-Led Execution
                </span>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-[#0a0f2e]">
                  One firm per practice area in {page.city}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5b6472]">
                  No junior account managers, no automated monthly fluff reports. Mubashar Sharif personally analyzes your Google Search Console profile, audits the competitors outranking you in {page.county}, and executes the technical architecture.
                </p>

                <div className="mt-6 space-y-2.5">
                  {[
                    `Exclusive representation: only 1 practice per legal niche in ${page.city}`,
                    "Direct founder strategy with weekly Monday progress updates",
                    "90-day performance milestone guarantee — zero long-term lock-in",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0a0f2e]">
                      <CheckCircle2 className="h-4 w-4 text-[#3eb489] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <CtaButton
                    href="/free-audit"
                    label={`Request Free 24h ${page.city} Teardown`}
                    icon={<ArrowRight className="h-4 w-4" aria-hidden />}
                  />
                  <Link
                    href="/why-us"
                    className="text-xs font-bold text-[#534AB7] hover:underline"
                  >
                    Why firms choose SearchPrex →
                  </Link>
                </div>
              </div>
            </div>
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

        {/* Closing form in place of a link-only band that sent readers to a
            second page to retype their URL and email. */}
        <ArticleLeadMagnet
          variant="bottom"
          source={`location:${page.stateSlug}/${page.citySlug}`}
          copy={{
            headline: `See exactly where you rank in ${page.city} — free.`,
            sub: `Two fields. Your site, your Business Profile and your ${page.county} competition, reviewed by me within 24 hours.`,
          }}
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
