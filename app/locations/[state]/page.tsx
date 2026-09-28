// app/locations/[state]/page.tsx
//
// State hub for any state in lib/city-pages.ts with two or more cities
// (Michigan, Texas, Louisiana today). It sits between /locations and the city
// pages, which is the level their URLs already implied.
//
// Everything on it comes from the city entries — the practice-area demand, the
// jurisdiction notes, the courts — so it summarises what the city pages
// actually say rather than adding a layer of templated state copy. A state with
// one city gets no hub (a hub linking to one page is thin); its URL redirects
// to that city instead. Kansas is a static segment with its own hub and never
// reaches this route.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowRight, BookOpen, Landmark, MapPin, Scale, Search } from "lucide-react";
import {
  Breadcrumb,
  CardGrid,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { CITY_PAGES, type CityPage } from "@/lib/city-pages";
import { findPracticePage, getDynamicStateHubSlugs, getLocationState, joinNames } from "@/lib/locations";
import { SITE, websiteRef } from "@/lib/site-schema";
import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import WhySearchPrex from "@/components/WhySearchPrex";
import { getStateHub, type StateHub } from "@/lib/state-hubs";
import { caseStudies, detailUrl } from "@/app/case-studies/data";

export function generateStaticParams() {
  return getDynamicStateHubSlugs().map((state) => ({ state }));
}

function citiesIn(stateSlug: string): CityPage[] {
  return CITY_PAGES.filter((c) => c.stateSlug === stateSlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getLocationState(slug);
  if (!state?.hubHref || slug === "kansas") return { robots: { index: false, follow: true } };

  const url = `${SITE}${state.hubHref}`;
  const names = state.cities.map((c) => c.name);
  // The root layout appends " | SearchPrex"; this keeps the whole thing near 60.
  const hub = getStateHub(slug);
  const title = hub?.metaTitle ?? `Law Firm SEO ${state.name}: ${names.join(", ")}`;
  const description =
    hub?.metaDescription ??
    `Law firm SEO for ${state.name} attorneys in ${joinNames(names)}: practice-area demand, local ranking signals and ${state.name} law, city by city.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | SearchPrex`, description, url, siteName: "SearchPrex", type: "website" },
  };
}

export default async function StateHubPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const state = getLocationState(slug);
  if (!state || slug === "kansas") notFound();
  if (!state.hubHref) {
    // One city, no hub: send the state URL to the only page it could mean.
    permanentRedirect(state.cities[0].href);
  }

  const cities = citiesIn(slug);
  const url = `${SITE}${state.hubHref}`;
  const hub = getStateHub(slug);
  const clients = (hub?.stateClients ?? [])
    .map((c) => caseStudies.find((cs) => cs.slug.client === c))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Practice areas across the state, with the cities that report demand for
  // each. Straight from each city's practiceDemand, nothing added.
  const demand = new Map<string, { area: string; cities: string[] }>();
  for (const c of cities) {
    for (const p of c.practiceDemand) {
      const entry = demand.get(p.area) ?? { area: p.area, cities: [] };
      entry.cities.push(c.city);
      demand.set(p.area, entry);
    }
  }
  const demandList = [...demand.values()].sort((a, b) => b.cities.length - a.cities.length);

  return (
    <>
      <Schema stateName={state.name} url={url} cities={cities} hub={hub} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: state.name },
        ]}
      />

      <main>
        <PageHero
          compactTop
          eyebrow={`Law Firm SEO · ${state.name}`}
          title={
            <>
              Law Firm SEO in <Accent>{state.name}</Accent>
            </>
          }
          subtitle={`${cities.length} ${state.name} markets, each with its own page: the practice areas people search for there, the courts and bar association that anchor local relevance, and the part of ${state.name} law that changes what a firm's pages need to say.`}
          primaryCta={{
            href: "/free-audit",
            label: `Get a free ${state.name} SEO audit`,
            icon: <ArrowRight className="h-4 w-4" aria-hidden />,
          }}
          secondaryCta={{ href: "/services/law-firm-seo", label: "How law firm SEO works" }}
        />

        {hub ? (
          <Section width="reading">
            <SectionHeading eyebrow={state.name} title={`Law firm SEO in ${state.name}: the market`} />
            <div className="space-y-4">
              {hub.intro.map((p) => (
                <p key={p.slice(0, 40)} className={text.body} style={{ color: color.ink }}>
                  {p}
                </p>
              ))}
            </div>
          </Section>
        ) : null}

        {/* ── CITIES ── */}
        <Section tone="surface">
          <SectionHeading
            eyebrow={`${cities.length} cities`}
            title={`Where we work in ${state.name}`}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {cities.map((c) => (
              <Link
                key={c.citySlug}
                href={`/locations/${c.stateSlug}/${c.citySlug}`}
                className={`group flex flex-col ${radius.card} border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-md`}
                style={{ borderColor: color.border }}
              >
                <span className={`${heading.eyebrow} mb-2 flex items-center gap-2`} style={{ color: color.primary }}>
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {c.county}
                </span>
                <h2 className={heading.h4} style={{ color: color.ink }}>
                  Law Firm SEO in {c.city}, {c.stateAbbr}
                </h2>
                <p className={`${text.small} mt-2`} style={{ color: color.muted }}>
                  {c.heroSub}
                </p>
                <p className={`${text.small} mt-3 font-semibold`} style={{ color: color.ink }}>
                  {c.legalContext.heading}
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: color.primary }}
                >
                  See the {c.city} page <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        {hub ? (
          <Section>
            <SectionHeading
              eyebrow={`${state.name} law`}
              title={`What ${state.name} law changes on a firm's website`}
              intro="The rules that decide what an accurate practice-area page has to say. Each links to its source."
            />
            <CardGrid columns={3}>
              {hub.law.map((l) => (
                <FeatureCard
                  key={l.title}
                  icon={<BookOpen className="h-5 w-5" style={{ color: color.primary }} aria-hidden />}
                  title={l.title}
                  body={
                    <>
                      {l.body}{" "}
                      <span className="mt-2 block text-xs" style={{ color: color.muted }}>
                        Source:{" "}
                        {l.source.href ? (
                          <a href={l.source.href} target="_blank" rel="noopener" className="font-semibold underline underline-offset-2" style={{ color: color.primary }}>
                            {l.source.label}
                          </a>
                        ) : (
                          l.source.label
                        )}
                      </span>
                    </>
                  }
                />
              ))}
            </CardGrid>
            <p className={`${text.caption} mt-6`} style={{ color: color.muted }}>
              General information about how {state.name} law affects website content, checked in September 2026 — not legal advice.
            </p>
          </Section>
        ) : null}

        {hub ? (
          <Section tone="surface">
            <SectionHeading eyebrow="Search behaviour" title={`How people in ${state.name} search for a lawyer`} />
            <CardGrid columns={3}>
              {hub.search.map((q) => (
                <FeatureCard
                  key={q.title}
                  icon={<Search className="h-5 w-5" style={{ color: color.primary }} aria-hidden />}
                  title={q.title}
                  body={q.body}
                />
              ))}
            </CardGrid>
          </Section>
        ) : null}

        {/* ── PRACTICE DEMAND ── */}
        <Section>
          <SectionHeading
            eyebrow="Where the demand is"
            title={`Which practice areas get searched in ${state.name}?`}
            intro={`Taken from the ${state.name} city pages: each area below has real search demand in the cities listed against it.`}
          />
          <CardGrid columns={2}>
            {demandList.map((d) => {
              const page = findPracticePage(d.area);
              return (
                <FeatureCard
                  key={d.area}
                  icon={<Scale className="h-5 w-5" style={{ color: color.primary }} aria-hidden />}
                  title={d.area}
                  body={
                    <>
                      Demand in {joinNames(d.cities)}.
                      {page ? (
                        <>
                          {" "}
                          <Link
                            href={`/services/law-firm-seo/${page.slug}`}
                            className="font-semibold underline underline-offset-2"
                            style={{ color: color.primary }}
                          >
                            {page.name} SEO
                          </Link>
                        </>
                      ) : null}
                    </>
                  }
                />
              );
            })}
          </CardGrid>
        </Section>

        {/* ── COURTS ── */}
        <Section tone="surface" tight>
          <SectionHeading eyebrow="Local relevance" title={`${state.name} courts our city pages reference`} className="mb-6" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((c) => (
              <div key={c.citySlug} className={`${radius.card} border bg-white p-5`} style={{ borderColor: color.border }}>
                <p className={`${heading.eyebrow} mb-3 flex items-center gap-2`} style={{ color: color.primary }}>
                  <Landmark className="h-4 w-4" aria-hidden />
                  {c.city}
                </p>
                <ul className="space-y-1.5">
                  {c.courts.map((court) => (
                    <li key={court} className={text.caption} style={{ color: color.muted }}>
                      {court}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className={`${text.small} mt-8`} style={{ color: color.muted }}>
            Practising somewhere else?{" "}
            <Link href="/locations" className="font-semibold underline underline-offset-2" style={{ color: color.primary }}>
              See every state and city
            </Link>
            .
          </p>
        </Section>

        {hub && clients.length > 0 ? (
          <Section>
            <SectionHeading
              eyebrow={`SearchPrex in ${state.name}`}
              title={`${state.name} clients (not law firms)`}
              intro="There is no published law firm case study yet. These are the clients SearchPrex has in this state, each with the screenshots behind its numbers."
            />
            <div className="grid gap-4 md:grid-cols-3">
              {clients.map((cs) => (
                <Link
                  key={cs.slug.client}
                  href={detailUrl(cs)}
                  className={`group ${radius.card} border bg-white p-5 transition-all hover:shadow-md`}
                  style={{ borderColor: color.border }}
                >
                  <p className={heading.eyebrow} style={{ color: color.primary }}>
                    {cs.location} · {cs.seoType}
                  </p>
                  <p className={`${heading.h4} mt-2`} style={{ color: color.ink }}>
                    {cs.client}
                  </p>
                  <p className={`${text.small} mt-2`} style={{ color: color.muted }}>
                    <strong style={{ color: color.ink }}>{cs.metrics[0].v}</strong> {cs.metrics[0].l}
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        ) : null}

        <WhySearchPrex variant="law" service={`law firm SEO in ${state.name}`} tone={clients.length > 0 ? "surface" : "white"} />

        {hub ? (
          <Section width="reading">
            <SectionHeading eyebrow="FAQ" title={`Law firm SEO in ${state.name}: questions, answered`} />
            <FaqList faqs={hub.faqs} name={`state-${state.slug}-faq`} />
          </Section>
        ) : null}

        {/* Closing form in place of a link-only band. */}
        <ArticleLeadMagnet
          variant="bottom"
          source={`location:${state.slug}`}
          copy={{
            headline: `See where your firm ranks in ${state.name} \u2014 free.`,
            sub: "Two fields. Your site, your Business Profile and the firms above you, reviewed by me within 24 hours.",
          }}
        />
      </main>
    </>
  );
}

function Schema({ stateName, url, cities, hub }: { stateName: string; url: string; cities: CityPage[]; hub?: StateHub }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `Law Firm SEO in ${stateName}`,
        isPartOf: websiteRef,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: cities.length,
          itemListElement: cities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `Law Firm SEO ${c.city}, ${c.stateAbbr}`,
            url: `${SITE}/locations/${c.stateSlug}/${c.citySlug}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
          { "@type": "ListItem", position: 3, name: stateName, item: url },
        ],
      },
      ...(hub
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: hub.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ]
        : []),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
