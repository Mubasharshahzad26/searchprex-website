// app/locations/page.tsx
//
// The locations hub. Every city page, every state hub, the Kansas and Wichita
// breadcrumbs and the nav's Locations item already pointed at /locations, and
// it returned a 404 — so the location pages had no parent, and each one was
// reachable only from the nav dropdown, the footer and its siblings.
//
// Built entirely from lib/locations.ts, so a new city appears here the moment
// it is added to either data file.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Scale } from "lucide-react";
import {
  Breadcrumb,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { LOCATION_CITY_COUNT, LOCATION_STATES } from "@/lib/locations";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { SITE, websiteRef } from "@/lib/site-schema";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";

const URL = `${SITE}/locations`;
const TITLE = "Law Firm SEO by City & State";
const DESCRIPTION = `Law firm SEO pages for ${LOCATION_CITY_COUNT} US cities across ${LOCATION_STATES.length} states, each built around that city's courts, bar association and state law. Find your market.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: `${TITLE} | SearchPrex`,
    description: DESCRIPTION,
    url: URL,
    siteName: "SearchPrex",
    type: "website",
  },
};

export default function LocationsHubPage() {
  return (
    <>
      <Schema />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Locations" }]} />

      <main>
        <PageHero
          compactTop
          eyebrow="Law firm SEO · Locations"
          title={
            <>
              Law Firm SEO <Accent>by City</Accent>
            </>
          }
          subtitle={`Local search is decided one city at a time: a page written for "law firm SEO" in general cannot rank in Detroit and Sugar Land at once. These are the ${LOCATION_CITY_COUNT} markets we have built for, each around its own courts, bar association and state law.`}
          primaryCta={{
            href: "/free-audit",
            label: "Get a free audit for your city",
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          }}
          secondaryCta={{ href: "/services/law-firm-seo", label: "How law firm SEO works" }}
        />

        {/* ── STATES & CITIES ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow={`${LOCATION_STATES.length} states`}
            title="Choose your state"
            intro="Each city page covers the practice areas with real search volume there, the local ranking signals Google checks, and the state law that makes its content different from every other city."
          />
          <div className="space-y-10">
            {LOCATION_STATES.map((state) => (
              <div key={state.slug} id={state.slug}>
                <h2 className={`${heading.h3} mb-4 flex flex-wrap items-baseline gap-x-3`} style={{ color: color.ink }}>
                  {state.hubHref ? (
                    <Link href={state.hubHref} className="hover:underline">
                      Law Firm SEO in {state.name}
                    </Link>
                  ) : (
                    <>Law Firm SEO in {state.name}</>
                  )}
                  <span className={text.caption} style={{ color: color.muted }}>
                    {state.cities.length} {state.cities.length === 1 ? "city" : "cities"}
                  </span>
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {state.cities.map((city) => (
                    <li key={city.href}>
                      <Link
                        href={city.href}
                        className={`flex h-full items-start gap-3 ${radius.card} border bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                        style={{ borderColor: color.border }}
                      >
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: color.primary }} aria-hidden />
                        <span className="min-w-0">
                          <span className="block font-semibold" style={{ color: color.ink }}>
                            Law Firm SEO {city.name}, {state.abbr}
                          </span>
                          {city.county ? (
                            <span className={`${text.caption} block`} style={{ color: color.muted }}>
                              {city.county}
                            </span>
                          ) : null}
                          <span className={`${text.caption} mt-1.5 block`} style={{ color: color.muted }}>
                            {city.blurb}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                {state.hubHref ? (
                  <Link
                    href={state.hubHref}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: color.primary }}
                  >
                    All {state.name} cities <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </Section>

        {/* ── PRACTICE AREAS ── */}
        <Section>
          <SectionHeading
            eyebrow="By practice area"
            title="Not tied to one of these cities?"
            intro="The practice-area pages cover what ranks for each type of firm anywhere in the US. Your city page, when there is one, covers what changes locally."
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_PAGES.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/services/law-firm-seo/${p.slug}`}
                  className={`flex items-center gap-3 ${radius.card} border bg-white p-4 font-semibold transition-colors hover:border-[#534AB7]`}
                  style={{ borderColor: color.border, color: color.ink }}
                >
                  <Scale className="h-4 w-4 shrink-0" style={{ color: color.primary }} aria-hidden />
                  {p.name} SEO
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* Closing form in place of a link-only band. */}
        <ArticleLeadMagnet
          variant="bottom"
          source="locations-hub"
          copy={{
            headline: "See where your firm ranks in your city \u2014 free.",
            sub: "Two fields. Your site, your Business Profile and the firms above you, reviewed by me within 24 hours.",
          }}
        />
      </main>
    </>
  );
}

function Schema() {
  const cities = LOCATION_STATES.flatMap((s) =>
    s.cities.map((c) => ({ name: `Law Firm SEO ${c.name}, ${s.abbr}`, url: `${SITE}${c.href}` }))
  );
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${URL}#webpage`,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: websiteRef,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: cities.length,
          itemListElement: cities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: c.url,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Locations", item: URL },
        ],
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
