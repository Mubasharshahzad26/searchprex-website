// app/industries/page.tsx
//
// The industries hub: every industry page on the site, grouped by service,
// each card carrying the result behind it — or saying plainly that there
// isn't one yet (law firms, Shopify).
//
// Built entirely from lib/local-industries.ts, lib/ecommerce-industries.ts,
// lib/industry-pages.ts and the case studies, so a new industry page appears
// here, in the footer and in the sitemap without being typed in three places.

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale, ShoppingCart, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import { Breadcrumb, CardGrid, FaqList, PageHero, Section, SectionHeading, Accent } from "@/components/layout";
import { LOCAL_INDUSTRIES } from "@/lib/local-industries";
import { ECOMMERCE_INDUSTRIES } from "@/lib/ecommerce-industries";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { caseStudies } from "@/app/case-studies/data";
import { founderRef, websiteRef } from "@/lib/site-schema";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/industries`;
const SOURCE = "industries";

/** Hardcoded on purpose — a date that moves on every request claims a review that did not happen. */
const LAST_REVIEWED = "2026-09-26";

export const metadata: Metadata = {
  title: "Industries We Serve | Local, Ecommerce & Law Firm SEO",
  description:
    "SEO by industry: HVAC, roofing, cleaning, home services, remodeling, WooCommerce, knife & outdoor stores and law firms — each page backed by a real case study, or honest that it isn't yet.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Industries We Serve | SearchPrex",
    description: "SEO by industry, each page backed by a real case study — or honest that it isn't yet.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  robots: { index: true, follow: true },
};

type Card = { href: string; title: string; proof?: string };

/** First metric of a page's first case study, as "value label · client". */
function proofLine(caseClients: string[]): string | undefined {
  const cs = caseStudies.find((c) => c.slug.client === caseClients[0]);
  const m = cs?.metrics[0];
  return cs && m ? `${m.v} ${m.l} · ${cs.client}` : undefined;
}

const GROUPS: Array<{ id: string; eyebrow: string; title: string; intro: string; icon: typeof MapPin; hub: string; hubLabel: string; cards: Card[] }> = [
  {
    id: "local",
    eyebrow: "Local businesses",
    title: "Local SEO by trade",
    intro: "Service businesses that win calls from the map pack, the Business Profile and AI Overviews.",
    icon: MapPin,
    hub: "/services/local-seo",
    hubLabel: "All local SEO services",
    cards: LOCAL_INDUSTRIES.map((i) => ({ href: `/services/local-seo/${i.slug}`, title: i.h1, proof: proofLine(i.caseClients) })),
  },
  {
    id: "ecommerce",
    eyebrow: "Ecommerce",
    title: "Ecommerce SEO by platform and niche",
    intro: "Large catalogues: indexing, product and brand copy at scale, speed and structured data.",
    icon: ShoppingCart,
    hub: "/services/ecommerce-seo",
    hubLabel: "All ecommerce SEO services",
    cards: ECOMMERCE_INDUSTRIES.map((i) => ({ href: `/services/ecommerce-seo/${i.slug}`, title: i.h1, proof: proofLine(i.caseClients) })),
  },
  {
    id: "law",
    eyebrow: "Law firms",
    title: "Law firm SEO by practice area",
    intro: "No law firm client has been published yet — the practice-area pages explain the approach, not borrowed results.",
    icon: Scale,
    hub: "/services/law-firm-seo",
    hubLabel: "All law firm SEO services",
    cards: INDUSTRY_PAGES.map((p) => ({ href: `/services/law-firm-seo/${p.slug}`, title: `${p.name} SEO` })),
  },
];

const FAQS = [
  {
    q: "Which industries does SearchPrex work with?",
    a: "Local service businesses (HVAC, roofing, cleaning, home services and remodeling), ecommerce stores (WooCommerce, and knife and outdoor retailers in particular), and law firms. Every industry page links to the case study behind it, or says plainly when there isn't one yet.",
  },
  {
    q: "Do you work with industries that aren't listed?",
    a: "Yes. The work — site structure, content that answers the search, technical fixes and local signals — carries across industries. A page only goes up here once there is a real result to show for that industry.",
  },
  {
    q: "Why is there no page for my industry in my city?",
    a: "Pages that differ only by the city name are what Google calls doorway pages, and they can hurt a whole site. City pages exist where there is real demand and real local substance; the industry pages cover the rest.",
  },
];

export default function IndustriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Industries We Serve",
        isPartOf: websiteRef,
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: GROUPS.flatMap((g) => g.cards).map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.title,
            url: `${SITE}${c.href}`,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Industries", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main>
      <script id="ld-industries" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />

      <PageHero
        compactTop
        eyebrow="Industries"
        title={
          <>
            Industries We Serve <Accent>— with the proof for each</Accent>
          </>
        }
        subtitle="A page for every industry SearchPrex has real results in, each linking to the case study behind it. Where there is no case study yet, the page says so."
        trustPoints={["Reply within 24 hours", "Month to month", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free tear-down, any industry",
              sub: "Send your URL. I’ll check your site against the top competitors in your industry and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      {GROUPS.map((g, gi) => {
        const Icon = g.icon;
        return (
          <Section key={g.id} id={g.id} tone={gi % 2 ? "surface" : undefined}>
            <SectionHeading eyebrow={g.eyebrow} title={g.title} intro={g.intro} />
            <CardGrid columns={3}>
              {g.cards.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group rounded-2xl border border-[#e5e7eb] bg-white p-5 transition-all hover:border-[#534AB7] hover:shadow-md"
                >
                  <p className="flex items-center gap-2 text-base font-black text-[#0a0f2e] group-hover:text-[#534AB7]">
                    <Icon className="h-4 w-4 flex-shrink-0 text-[#534AB7]" aria-hidden />
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5b6472]">
                    {c.proof ?? "No case study yet — the approach, stated honestly."}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                    Open <ArrowRight className="h-3 w-3" aria-hidden />
                  </span>
                </Link>
              ))}
            </CardGrid>
            <p className="mt-6 text-center">
              <Link href={g.hub} className="inline-flex items-center gap-1 text-sm font-bold text-[#534AB7]">
                {g.hubLabel} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </p>
          </Section>
        );
      })}

      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={SOURCE}
          copy={{
            eyebrow: "Industry not listed?",
            headline: "The work carries over. Find out what it would look like for you.",
            sub: "Send me your URL. A written tear-down of your site and your top competitors — free, within 24 hours.",
          }}
        />
      </Section>

      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Industries, answered" />
        <FaqList faqs={FAQS} name="industries-faq" />
      </Section>

      <ArticleLeadMagnet
        variant="bottom"
        source={SOURCE}
        copy={{
          headline: "Send me your URL. I’ll tell you what is holding it back.",
          sub: "Two fields. A written look at your site and competitors — from me, within 24 hours.",
        }}
      />
    </main>
  );
}
