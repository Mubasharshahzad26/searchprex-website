"use client";

// app/services/ecommerce-seo/[industry]/IndustryClient.tsx
//
// Ecommerce SEO by platform and niche, on the same AIDA template as
// /services/ecommerce-seo. Copy lives in lib/ecommerce-industries.ts; figures
// are read from the case studies and screenshots from their write-ups.
//
// A page with no case study of its own (Shopify) shows no stat strip and no
// proof section — it shows its honest note instead, and links to the
// WooCommerce results as what they are rather than presenting them as its own.

import Link from "next/link";
import { ArrowRight, CheckCircle, Info, ShoppingCart } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import { RETAINER_PLANS, formatRange } from "@/lib/pricing";
import { ECOMMERCE_INDUSTRIES, getEcommerceIndustry } from "@/lib/ecommerce-industries";
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
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");
const MAX_PROOF = 4;

export default function IndustryClient({ slug }: { slug: string }) {
  const industry = getEcommerceIndustry(slug);
  if (!industry) return null;

  const source = `service:ecommerce-seo/${industry.slug}`;
  const stores = industry.slug === "outdoor-knife-stores" ? "knife and outdoor stores" : `${industry.name} stores`;
  const cases = industry.caseClients
    .map((client) => caseStudies.find((c) => c.slug.client === client))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Each stat is one named client's result, labelled as such: the first
  // metric of each case, then the rest, so both stores are represented.
  const stats = [
    ...[...cases.map((cs) => ({ cs, m: cs.metrics[0] })), ...cases.flatMap((cs) => cs.metrics.slice(1).map((m) => ({ cs, m })))]
      .slice(0, 3)
      .map(({ cs, m }) => ({ value: m.v, label: `${m.l} · ${cs.client}` })),
    { value: "24h", label: "Tear-down reply" },
  ];

  // Interleave the stores' screenshots so each is represented.
  const shotsByCase = cases.map((cs) =>
    (CASE_DETAILS[cs.slug.client]?.proof ?? EXTRA_PROOF[cs.slug.client] ?? []).map((shot) => ({ ...shot, href: detailUrl(cs) })),
  );
  const proof = Array.from({ length: Math.max(0, ...shotsByCase.map((s) => s.length)) })
    .flatMap((_, i) => shotsByCase.map((s) => s[i]).filter(Boolean))
    .slice(0, MAX_PROOF);

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Ecommerce SEO", href: "/services/ecommerce-seo" },
          { label: industry.name },
        ]}
      />

      {/* Sideways links between the platform and niche pages. */}
      <nav aria-label="Ecommerce SEO by platform and niche" className="border-b border-[#e5e7eb] bg-[#f8f9fc]">
        <div className="mx-auto flex max-w-7xl gap-5 overflow-x-auto px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
          <Link href="/services/ecommerce-seo" className="whitespace-nowrap text-[#5b6472] hover:text-[#0a0f2e]">
            All ecommerce SEO
          </Link>
          {ECOMMERCE_INDUSTRIES.map((i) => (
            <Link
              key={i.slug}
              href={`/services/ecommerce-seo/${i.slug}`}
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
        eyebrow={`Ecommerce SEO · ${industry.name}`}
        title={
          <>
            {industry.h1} <Accent>{industry.accent}</Accent>
          </>
        }
        subtitle={industry.heroSub}
        actions={
          <Link
            href={cases.length ? "#proof" : "#honest"}
            className="inline-flex items-center gap-1.5 text-sm font-bold"
            style={{ color: "#534AB7" }}
          >
            {cases.length ? "See the store results" : "What I have and haven't done"} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["Reply within 24 hours", "Month to month", "The founder does the work"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={source}
            copy={{
              headline: "Free store tear-down",
              sub: "Send your store URL. I’ll check indexing, product copy, speed and structure against your top competitors — and tell you what to fix first, within 24 hours.",
            }}
          />
        }
      />

      {cases.length ? <StatStrip stats={stats} /> : null}

      {/* The straight answer, for a page without a case study of its own. */}
      {industry.honestNote ? (
        <Section id="honest" tight>
          <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-2xl border border-[#d9d5f5] bg-[#f5f3ff] p-6">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#534AB7]" aria-hidden />
            <div>
              <p className="text-sm font-black text-[#0a0f2e]">A straight answer first</p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#374151]">{industry.honestNote}</p>
              <Link href="/services/ecommerce-seo/woocommerce" className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#534AB7]">
                See the WooCommerce results <ArrowRight className="h-3 w-3" aria-hidden />
              </Link>
            </div>
          </div>
        </Section>
      ) : null}

      {/* 02 — THE PROBLEM · Interest */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title={`Where ${stores} lose traffic`}
          intro="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you sales."
        />
        <CardGrid columns={2}>
          {industry.problems.map((p) => (
            <div key={p.title} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-black text-[#0a0f2e]">
                <ShoppingCart className="h-4 w-4 flex-shrink-0 text-[#b8123a]" aria-hidden />
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

      {/* 04 — PROOF · Desire (only where the page has its own case studies) */}
      {cases.length ? (
        <Section id="proof">
          <SectionHeading
            eyebrow="Proof"
            title="Store results, with the screenshots"
            intro="Real stores, their own dashboards. Every number below is on the case study it links to."
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
              {proof.map((shot) => (
                <div key={shot.src} className="flex flex-col">
                  <ProofImage
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    frameAspect="16 / 9"
                    caption={shot.caption}
                  />
                  <Link href={shot.href} className="mt-2 inline-flex items-center gap-1 text-xs font-bold" style={{ color: "#534AB7" }}>
                    Read the case study <ArrowRight className="h-3 w-3" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>
          ) : null}
        </Section>
      ) : null}

      {/* 05 — WHAT YOU GET · Desire */}
      <Section tone="surface">
        <SectionHeading
          variant="split"
          eyebrow="Everything included"
          title={<>What&apos;s in the<br />{industry.name} SEO work</>}
          intro={`Built around how ${stores} actually break and get fixed — not a generic ecommerce package with the name swapped in.`}
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
            headline: "Find out what is holding your store back.",
            sub: "Send me your store URL. I’ll check indexing, product copy and speed against the stores above you — free, within 24 hours.",
          }}
        />
      </Section>

      {/* 07 — PRICE · Desire */}
      {ECOM_PLAN ? (
        <Section>
          <SectionHeading eyebrow="What it costs" title={`${industry.name} SEO pricing`} />
          <div className="mx-auto max-w-2xl rounded-2xl border-2 p-6 text-center" style={{ borderColor: ECOM_PLAN.accent, background: ECOM_PLAN.bg }}>
            <p className="text-3xl font-black" style={{ color: ECOM_PLAN.accent }}>
              {formatRange(ECOM_PLAN)} <span className="text-base font-bold text-[#5b6472]">/ month</span>
            </p>
            <p className="mt-2 text-sm text-[#374151]">{ECOM_PLAN.best}: {ECOM_PLAN.includes.join(" · ")}</p>
            <p className="mt-3 text-xs leading-relaxed text-[#5b6472]">
              The number within the range depends on catalogue size, technical scope and content volume. Month to month.
            </p>
            <Link href="/pricing" className="mt-3 inline-flex items-center gap-1 text-sm font-bold" style={{ color: "#534AB7" }}>
              Full pricing <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Section>
      ) : null}

      {/* RELATED · internal links */}
      <Section tone="surface">
        <SectionHeading eyebrow="Keep reading" title="More on ecommerce SEO" />
        <CardGrid columns={3}>
          {[
            { href: "/services/ecommerce-seo", title: "Ecommerce SEO services", body: "The full approach: indexing, product and category content, structured data and speed." },
            { href: "/services/technical-seo", title: "Technical SEO", body: "Crawling, indexing and Core Web Vitals, fixed at the template." },
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
          role="Founder & Lead Ecommerce SEO Strategist · 5+ years"
          quote="&ldquo;Big catalogues fail in the same places: thin copy, pages Google never indexes, templates that slow every product at once. I fixed those on two stores and built a content autopilot to do it at scale. When you work with SearchPrex, you work with me.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead Ecommerce SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* FAQ · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title={`${industry.name} SEO questions, answered`} />
        <FaqList faqs={industry.faqs} name={`ecommerce-seo-${industry.slug}-faq`} />
      </Section>

      {/* CLOSE · Action */}
      <ArticleLeadMagnet
        variant="bottom"
        source={source}
        copy={{
          headline: "Send me your store URL. I’ll tell you what is holding it back.",
          sub: "Two fields. A written look at your indexing, product copy and competitors — from me, within 24 hours.",
        }}
      />
    </main>
  );
}
