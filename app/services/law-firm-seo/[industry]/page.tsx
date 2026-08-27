import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import {
  Breadcrumb,
  CardGrid,
  CtaBand,
  FaqList,
  PageHero,
  Section,
  SectionHeading,
  Accent,
} from "@/components/layout";
import { color, heading, radius, text } from "@/lib/design-tokens";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { CITY_PAGES } from "@/lib/city-pages";
import { ChatWidgetLazy } from "@/components/ChatWidgetLazy";

const SITE = "https://www.searchprex.com";

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((page) => ({
    industry: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === industry);
  if (!page) return { title: "Practice Area not found", robots: { index: false, follow: true } };

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
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

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === industry);
  if (!page) notFound();

  const url = `${SITE}/services/law-firm-seo/${page.slug}`;
  
  // Find full city data based on slugs mentioned
  const mentionedCities = page.locationsMentioned
    .map(slug => CITY_PAGES.find(c => c.citySlug === slug))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <>
      <Schema page={page} url={url} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Law Firm SEO", href: "/services/law-firm-seo" },
          { label: page.name },
        ]}
      />

      <main>
        <PageHero
          compactTop
          eyebrow={`Law Firm SEO · ${page.name}`}
          title={
            <>
              {page.h1.replace(page.name, '')}
              <Accent>
                {page.name}
              </Accent>
            </>
          }
          subtitle={page.heroSub}
          primaryCta={{
            href: "/free-audit",
            label: `Get a free SEO audit`,
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
            title={`Why generic SEO fails for ${page.name}`}
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
            title={`What real ${page.name} actually involves`}
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

        {/* ── FAQ ── */}
        <Section width="reading">
          <SectionHeading
            eyebrow="FAQ"
            title={`${page.name} — common questions`}
          />
          <FaqList faqs={page.faqs} name={`${page.slug}-faq`} />
        </Section>

        {/* ── LINKED LOCATIONS ── */}
        {mentionedCities.length > 0 && (
          <Section tone="surface" tight>
            <SectionHeading
              eyebrow="Where we do this"
              title={`See our hyper-local approach in action`}
              className="mb-6"
            />
            <ul className="flex flex-wrap gap-3">
              {mentionedCities.map((c) => (
                <li key={c.citySlug}>
                  <Link
                    href={`/locations/${c.stateSlug}/${c.citySlug}`}
                    className={`inline-flex items-center gap-2 ${radius.control} border bg-white px-4 py-2 text-sm font-semibold transition-colors hover:border-[#534AB7]`}
                    style={{ borderColor: color.border, color: color.ink }}
                  >
                    <MapPin className="h-3.5 w-3.5" style={{ color: color.primary }} aria-hidden />
                    {c.city}, {c.stateAbbr}
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <CtaBand
          eyebrow="Start Growing"
          title={
            <>
              See exactly where you rank
              <br />
              for {page.name} — free.
            </>
          }
          body={`The founder personally reviews your site, your Google Business Profile, and your rankings, then sends a 90-day plan within 24 hours. No obligation, no contract.`}
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

function Schema({ page, url }: { page: any; url: string }) {
  const faqsToUse = [...page.faqs];
  if (page.llmDirectAnswer) {
    faqsToUse.unshift({
      q: `What is the best SEO strategy for ${page.name}?`,
      a: page.llmDirectAnswer
    });
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqsToUse.map((f: any) => ({
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
    name: page.metaTitle,
    description: page.metaDescription,
    abstract: page.llmDirectAnswer || page.metaDescription, // GEO signal
    inLanguage: "en-US",
  };

  return (
    <>
      {[faq, webPage].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
