"use client";

// app/services/local-seo/[industry]/IndustryClient.tsx
//
// One local SEO page per trade, on the same AIDA template as /services/local-seo.
// Copy lives in lib/local-industries.ts; every figure on the page is read from
// the case studies (app/case-studies/data.ts) and every screenshot from their
// write-ups (app/case-studies/details.ts), so a number here can never drift
// from the case study it came from.

import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { LOCAL_INDUSTRIES, getLocalIndustry } from "@/lib/local-industries";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { CASE_DETAILS, EXTRA_PROOF } from "@/app/case-studies/details";
import {
  AnswerCapsules,
  AuthorCard,
  Breadcrumb,
  CardGrid,
  FaqList,
  FeatureCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  Accent,
} from "@/components/layout";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const LOCAL_PLAN = RETAINER_PLANS.find((p) => p.niche === "Local SEO");
const MAX_PROOF = 4;

export default function IndustryClient({ slug }: { slug: string }) {
  const industry = getLocalIndustry(slug);
  if (!industry) return null;

  const source = `service:local-seo/${industry.slug}`;
  const cases = industry.caseClients
    .map((client) => caseStudies.find((c) => c.slug.client === client))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Each stat is one named client's result, labelled as such.
  const stats = [
    ...cases
      .flatMap((cs) => cs.metrics.map((m) => ({ value: m.v, label: `${m.l} · ${cs.client}` })))
      .slice(0, 3),
    { value: "24h", label: "Tear-down reply" },
  ];

  const proof = cases
    .flatMap((cs) =>
      (CASE_DETAILS[cs.slug.client]?.proof ?? EXTRA_PROOF[cs.slug.client] ?? []).map((shot) => ({
        ...shot,
        href: detailUrl(cs),
      })),
    )
    .slice(0, MAX_PROOF);

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Local SEO", href: "/services/local-seo" },
          { label: industry.name },
        ]}
      />

      {/* Other trades — sideways links between the industry pages. */}
      <nav aria-label="Local SEO by industry" className="border-b border-[#e5e7eb] bg-[#f8f9fc]">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
          <Link href="/services/local-seo" className="whitespace-nowrap text-[#5b6472] hover:text-[#0a0f2e]">
            All local SEO
          </Link>
          {LOCAL_INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              href={`/services/local-seo/${i.slug}`}
              aria-current={i.slug === industry.slug ? "page" : undefined}
              className={
                i.slug === industry.slug
                  ? "whitespace-nowrap text-[#534AB7] underline underline-offset-4"
                  : "whitespace-nowrap text-[#5b6472] hover:text-[#0a0f2e]"
              }
            >
              {i.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* 01 — HERO · Attention */}
      <PageHero
        compactTop
        eyebrow={`Local SEO · ${industry.name}`}
        title={
          <>
            {industry.h1} <Accent>{industry.accent}</Accent>
          </>
        }
        subtitle={industry.heroSub}
        actions={
          <Link href="#proof" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: "#534AB7" }}>
            See the {industry.name.toLowerCase()} results <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["Reply within 24 hours", "Month to month", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={source}
            copy={{
              headline: `Free ${industry.name.toLowerCase()} tear-down`,
              sub: "Send your URL. I’ll check your Business Profile, your pages and the three competitors above you — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      <StatStrip stats={stats} />

      {/* 02 — THE PROBLEM · Interest */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title={`Why ${industry.name.toLowerCase()} businesses lose the call`}
          intro="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you jobs."
        />
        <CardGrid columns={2}>
          {industry.problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-black text-[#0a0f2e]">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#b8123a]" aria-hidden />
                {p.title}
              </p>
              <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[#374151]">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1a7d59]" aria-hidden />
                <span>
                  <strong>Check:</strong> {p.check}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6472]">{p.costs}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* 03 — ANSWERS · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="Quick answers" title={`${industry.name} SEO, answered plainly`} />
        <AnswerCapsules items={industry.capsules} />
      </Section>

      {/* 04 — PROOF · Desire */}
      <Section id="proof">
        <SectionHeading
          eyebrow="Proof"
          title={`${industry.name} results, with the screenshots`}
          intro="Real clients, real searches. Every number below is on the case study it links to."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((cs) => (
            <Link
              key={cs.slug.client}
              href={detailUrl(cs)}
              className="group rounded-2xl border border-[#e5e7eb] bg-white p-6 transition-all hover:border-[#534AB7] hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-[#534AB7]">
                {cs.client} · {cs.location}
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

        {proof.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {proof.map(({ href, ...shot }) => (
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

      {/* 05 — WHAT YOU GET · Desire */}
      <Section tone="surface">
        <SectionHeading
          variant="split"
          eyebrow="Everything included"
          title={<>What&apos;s in the<br />{industry.name.toLowerCase()} SEO work</>}
          intro={`Built around how people actually search for ${industry.name.toLowerCase()} — not a generic local package with the trade name swapped in.`}
        />
        <CardGrid columns={3}>
          {industry.included.map((s) => (
            <FeatureCard key={s.title} label="Included" title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 06 — MID-PAGE FORM · Action */}
      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={source}
          copy={{
            eyebrow: "Failed one of those checks?",
            headline: `Find out what is keeping your ${industry.name.toLowerCase()} business out of the top three.`,
            sub: "Send me your URL. I’ll check your Profile, pages and reviews against the businesses above you — free, within 24 hours.",
          }}
        />
      </Section>

      {/* 07 — PRICE · Desire */}
      {LOCAL_PLAN ? (
        <Section>
          <SectionHeading eyebrow="What it costs" title={`${industry.name} SEO pricing`} />
          <div className="mx-auto max-w-2xl rounded-2xl border-2 p-6 text-center" style={{ borderColor: LOCAL_PLAN.accent, background: LOCAL_PLAN.bg }}>
            <p className="text-3xl font-black" style={{ color: LOCAL_PLAN.accent }}>
              {formatRange(LOCAL_PLAN)} <span className="text-base font-bold text-[#5b6472]">/ month</span>
            </p>
            <p className="mt-2 text-sm text-[#374151]">{LOCAL_PLAN.best}: {LOCAL_PLAN.includes.join(" · ")}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#5b6472]">
              The number within the range depends on how many locations and service areas the plan covers. Month to month.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold" style={{ color: "#534AB7" }}>
              Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {/* RELATED · internal links */}
      <Section tone="surface">
        <SectionHeading eyebrow="Keep reading" title="More on local SEO" />
        <CardGrid columns={3}>
          {[
            { href: "/services/local-seo", title: "Local SEO services", body: "The full local approach: Business Profile, citations, service-area pages and reviews." },
            { href: "/locations", title: "Locations we serve", body: "City and state pages across the United States." },
            { href: "/case-studies", title: "All case studies", body: "Every client result, with the screenshots." },
          ].map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group rounded-2xl border border-[#e5e7eb] bg-white p-5 transition-all hover:border-[#534AB7] hover:shadow-md"
            >
              <p className="text-sm font-black text-[#0a0f2e] group-hover:text-[#534AB7]">{r.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5b6472]">{r.body}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                Open <ArrowRight className="h-3 w-3" aria-hidden />
              </span>
            </Link>
          ))}
        </CardGrid>
      </Section>

      {/* AUTHOR · E-E-A-T */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead Local SEO Strategist · 5+ years · Semrush-certified"
          quote="&ldquo;Every trade is searched differently. A roof is researched for weeks; a broken AC is fixed by whoever answers first. I build the pages and the profile around that — and when you work with SearchPrex, you work with me.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead Local SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* FAQ · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title={`${industry.name} SEO questions, answered`} />
        <FaqList faqs={industry.faqs} name={`local-seo-${industry.slug}-faq`} />
      </Section>

      {/* CLOSE · Action */}
      <ArticleLeadMagnet
        variant="bottom"
        source={source}
        copy={{
          headline: `Send me your URL. I’ll tell you why your ${industry.name.toLowerCase()} business isn’t in the top three.`,
          sub: "Two fields. A written look at your Profile, pages and competitors — from me, within 24 hours.",
        }}
      />
    </main>
  );
}
