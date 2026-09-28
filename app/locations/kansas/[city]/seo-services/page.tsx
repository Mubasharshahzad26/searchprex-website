// app/locations/kansas/[city]/seo-services/page.tsx
//
// The general SEO page for a Kansas city: local, ecommerce and technical SEO for
// any business, with law firms sent to the law page one level up. Copy lives in
// lib/kansas-seo-cities.ts; every result is a named client from another state,
// read from the case studies so the numbers cannot drift.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import GuideMagnet from "@/components/GuideMagnet";
import ProofImage from "@/components/ProofImage";
import {
  AuthorCard,
  Breadcrumb,
  CardGrid,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { KANSAS_SEO_CITIES, getKansasSeoCity } from "@/lib/kansas-seo-cities";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { GBP_CHECKLIST_GUIDE } from "@/lib/guides";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { CASE_DETAILS } from "@/app/case-studies/details";

const SITE = "https://www.searchprex.com";
const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-09-27";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");

// One local, one roofing, one ecommerce and one technical result.
const PROOF_CLIENTS = ["local-hvac-services", "mammoth-roofing", "smk-store", "michigan-outdoor-sports"];
const PROOF_SHOTS = ["local-hvac-services", "smk-store"];

// The parent [city] segment generates every Kansas city; this page renders only
// for the cities in KANSAS_SEO_CITIES and 404s (notFound below) for the rest.
// `dynamicParams = false` is not used here: with the parent generating the
// params, it 404'd every city.
export function generateStaticParams({ params }: { params: { city: string } }) {
  return getKansasSeoCity(params.city) ? [{}] : [];
}

const pageUrl = (slug: string) => `${SITE}/locations/kansas/${slug}/seo-services`;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getKansasSeoCity(slug);
  if (!city) return {};
  const url = pageUrl(city.slug);
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: `${city.metaTitle} | SearchPrex`, description: city.metaDescription, url, siteName: "SearchPrex", type: "website" },
    twitter: { card: "summary_large_image", title: city.metaTitle, description: city.metaDescription },
  };
}

export default async function KansasSeoServicesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: slug } = await params;
  const city = getKansasSeoCity(slug);
  if (!city) notFound();

  const url = pageUrl(city.slug);
  const lawUrl = `/locations/kansas/${city.slug}`;
  const source = `location:kansas/${city.slug}/seo-services`;
  const place = `${city.name}, KS`;

  const cases = PROOF_CLIENTS.map((c) => caseStudies.find((cs) => cs.slug.client === c)).filter(
    (c): c is NonNullable<typeof c> => c !== undefined,
  );
  const shots = PROOF_SHOTS.flatMap((client) => {
    const cs = caseStudies.find((c) => c.slug.client === client);
    const shot = CASE_DETAILS[client]?.proof?.[0];
    return cs && shot ? [{ ...shot, href: detailUrl(cs) }] : [];
  });

  const services = [
    {
      title: "Local SEO",
      href: "/services/local-seo",
      body: `Google Business Profile, citations, reviews and service-area pages, so ${city.name} customers find you in the map pack.`,
      price: LOCAL_PLAN ? `${formatRange(LOCAL_PLAN)} / month` : undefined,
    },
    {
      title: `Law firm SEO in ${city.name}`,
      href: lawUrl,
      body: `For attorneys: practice-area pages, ${city.county} courts and the map pack. It has its own page.`,
      price: undefined,
    },
    {
      title: "Ecommerce SEO",
      href: "/services/ecommerce-seo",
      body: "For Shopify and WooCommerce stores: indexing, product and collection content, and crawl budget.",
      price: undefined,
    },
    {
      title: "Technical SEO",
      href: "/services/technical-seo",
      body: "Indexing, speed, duplicate pages and structured data, fixed from what your Search Console shows.",
      price: undefined,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `SEO services in ${place}`,
        isPartOf: websiteRef,
        about: { "@id": `${url}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
      },
      // Service, not a LocalBusiness: there is no office in this city.
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `SEO services in ${place}`,
        serviceType: "Search engine optimization",
        provider: organizationRef,
        areaServed: { "@type": "City", name: `${city.name}, Kansas` },
        description: city.metaDescription,
        url,
        ...(LOCAL_PLAN
          ? {
              offers: {
                "@type": "Offer",
                name: "Local SEO",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: LOCAL_PLAN.min,
                  maxPrice: LOCAL_PLAN.max,
                  priceCurrency: "USD",
                  unitText: "MONTH",
                },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
          { "@type": "ListItem", position: 3, name: "Kansas", item: `${SITE}/locations/kansas` },
          { "@type": "ListItem", position: 4, name: `SEO services in ${city.name}`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const others = KANSAS_SEO_CITIES.filter((c) => c.slug !== city.slug);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: "Kansas", href: "/locations/kansas" },
          { label: `SEO services in ${city.name}` },
        ]}
      />

      {/* HERO */}
      <PageHero
        compactTop
        eyebrow={`${city.county} · Kansas`}
        title={
          <>
            SEO services in {place} <Accent>for local businesses</Accent>
          </>
        }
        subtitle={city.heroSub}
        actions={
          <Link href={lawUrl} className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#534AB7" }}>
            Law firm? See law firm SEO in {city.name} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["Reply within 24 hours", "Month to month", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={source}
            copy={{
              headline: `Free SEO tear-down for your ${city.name} business`,
              sub: "Send your URL. I’ll check your Business Profile, your site and the three businesses above you — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      {/* SEARCHING HERE */}
      <Section>
        <SectionHeading
          eyebrow={`Searching in ${city.name}`}
          title={`What makes SEO in ${place} different`}
          intro="Three things about how people here search, and what each one means for your Business Profile and your pages."
        />
        <CardGrid columns={3}>
          {city.market.map((m) => (
            <div key={m.heading} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <h3 className="flex items-start gap-2 text-base font-black text-[#0a0f2e]">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#b8123a]" aria-hidden />
                {m.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">{m.body}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* SERVICES */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Services"
          title={`SEO services for ${city.name} businesses`}
          intro="Four services. Most local businesses need the first; the tear-down tells you which ones you actually need."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#534AB7] hover:shadow-md"
            >
              <h3 className="text-lg font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">{s.body}</p>
              {s.price ? <p className="mt-3 text-sm font-bold text-[#0a0f2e]">{s.price}</p> : null}
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                Open <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-[#5b6472]">
          Local SEO by trade:{" "}
          {LOCAL_INDUSTRIES.map((i, n) => (
            <span key={i.slug}>
              <Link href={`/services/local-seo/${i.slug}`} className="font-semibold text-[#534AB7] underline underline-offset-2">
                {i.name}
              </Link>
              {n < LOCAL_INDUSTRIES.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </Section>

      {/* WHO IT'S FOR */}
      <Section>
        <SectionHeading eyebrow="Who it's for" title={`Businesses in ${city.name} this is built for`} />
        <CardGrid columns={3}>
          {city.whoFor.map((w) => (
            <FeatureCard key={w.title} label={city.name} title={w.title} body={w.body} />
          ))}
        </CardGrid>
      </Section>

      {/* PROOF */}
      <Section tone="surface" id="proof">
        <SectionHeading
          eyebrow="Proof"
          title="Results from clients in other states"
          intro={`No ${city.name} client results yet, so here is the same work for businesses elsewhere, each labelled with where it is from. Every number is on the case study it links to.`}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((cs) => (
            <Link
              key={cs.slug.client}
              href={detailUrl(cs)}
              className="group rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#534AB7] hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                {cs.client} · {cs.location} · {cs.seoType}
              </p>
              <p className="mt-2 text-base font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{cs.headline}</p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {cs.metrics.slice(0, 3).map((m) => (
                  <div key={m.l}>
                    <p className="text-xl font-black text-[#0a0f2e]">{m.v}</p>
                    <p className="text-xs text-[#5b6472]">{m.l}</p>
                  </div>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                Read the case study <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        {shots.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {shots.map(({ href, ...shot }) => (
              <div key={shot.src} className="flex flex-col">
                <ProofImage {...shot} frameAspect="16 / 9" />
                <Link href={href} className="mt-2 inline-flex items-center gap-1 text-xs font-bold" style={{ color: "#534AB7" }}>
                  Read the case study <ArrowRight className="h-3 w-3" aria-hidden />
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </Section>

      {/* FIRST MOVES */}
      <Section>
        <SectionHeading
          eyebrow="The first month"
          title={`Where the work starts in ${city.name}`}
          intro="After the free tear-down, these come first, because nothing else works until they are right."
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {city.firstMoves.map((m, i) => (
            <li key={m.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <p className="text-xs font-black uppercase tracking-widest text-[#534AB7]">Step {i + 1}</p>
              <h3 className="mt-1 text-base font-black text-[#0a0f2e]">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">{m.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm leading-relaxed text-[#5b6472]">
          Areas covered from {city.name}: {[...city.neighborhoods, ...city.nearby].join(", ")}. Area pages are written only
          for places you actually serve.
        </p>
      </Section>

      {/* MID-PAGE GUIDE */}
      <Section tight>
        <GuideMagnet guide={GBP_CHECKLIST_GUIDE} source={`kansas/${city.slug}/seo-services`} eyebrow={`Free for ${city.name} businesses`} />
      </Section>

      {/* PRICE */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="What it costs"
          title={`SEO pricing for ${city.name} businesses`}
          intro="Published ranges, month to month. The tear-down comes first, so you see the scope before paying anything."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {RETAINER_PLANS.map((p) => (
            <div key={p.niche} className="rounded-2xl border-2 p-6" style={{ borderColor: p.accent, background: p.bg }}>
              <h3 className="text-sm font-black uppercase tracking-widest" style={{ color: p.accent }}>
                {p.niche}
              </h3>
              <p className="mt-2 text-2xl font-black text-[#0a0f2e]">
                {formatRange(p)} <span className="text-sm font-bold text-[#5b6472]">/ month</span>
              </p>
              <p className="mt-2 text-sm text-[#374151]">
                {p.best}: {p.includes.join(" · ")}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-[#5b6472]">
          Technical SEO is quoted after the audit, because the work depends on what Search Console shows.{" "}
          <Link href="/pricing" className="font-bold text-[#534AB7]">
            Full pricing
          </Link>
        </p>
      </Section>

      {/* AUTHOR */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead SEO Strategist · 5+ years · Semrush-certified"
          quote="&ldquo;I will not claim a Kansas office or Kansas results I don’t have. What I can show you is the same work done for businesses like yours in other states, and a plan written for how people in your city actually search.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* FAQ */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title={`SEO in ${place}: questions, answered`} />
        <FaqList faqs={city.faqs} name={`kansas-${city.slug}-seo-faq`} />
      </Section>

      {/* OTHER KANSAS CITIES */}
      <Section tight>
        <p className="text-sm text-[#5b6472]">
          SEO services in other Kansas cities:{" "}
          {others.map((c, n) => (
            <span key={c.slug}>
              <Link href={`/locations/kansas/${c.slug}/seo-services`} className="font-semibold text-[#534AB7] underline underline-offset-2">
                {c.name}, KS
              </Link>
              {n < others.length - 1 ? " · " : ""}
            </span>
          ))}
          {" · "}
          <Link href="/locations/kansas" className="font-semibold text-[#534AB7] underline underline-offset-2">
            All Kansas
          </Link>
        </p>
      </Section>

      {/* CLOSE */}
      <ArticleLeadMagnet
        variant="bottom"
        source={source}
        copy={{
          headline: `Send me your URL. I’ll tell you what is holding your ${city.name} business back on Google.`,
          sub: "Two fields. A written look at your Profile, site and competitors — from me, within 24 hours.",
        }}
      />
    </main>
  );
}
