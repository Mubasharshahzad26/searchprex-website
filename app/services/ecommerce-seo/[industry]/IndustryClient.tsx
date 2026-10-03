"use client";

// app/services/ecommerce-seo/[industry]/IndustryClient.tsx
//
// Ecommerce SEO by platform and niche, on the topical band layout of the
// service pages (components/ServiceBands). Copy lives in
// lib/ecommerce-industries.ts; figures are read from the case studies and
// screenshots from their write-ups.
//
// A page with no case study of its own (Shopify) shows no proof — it shows its
// honest note instead, and links to the WooCommerce results as what they are
// rather than presenting them as its own.
//
// Dropped in this layout: the stat strip, the mid-page guide magnet and
// WhySearchPrex. Quick answers are merged into the FAQ; page.tsx builds the
// FAQPage schema from both arrays.

import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import type { Guide } from "@/lib/guides";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { RETAINER_PLANS } from "@/lib/pricing";
import { ECOMMERCE_INDUSTRIES, getEcommerceIndustry } from "@/lib/ecommerce-industries";
import { caseStudies, detailUrl } from "@/app/case-studies/data";
import { CASE_DETAILS, EXTRA_PROOF } from "@/app/case-studies/details";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  BODY,
  INK,
  PURPLE,
  Band,
  BandIntro,
  CheckList,
  Eyebrow,
  FaqBand,
  GuaranteeCard,
  H2,
  Lead,
  PriceCard,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const ECOM_PLAN = RETAINER_PLANS.find((p) => p.niche === "Ecommerce SEO");
const MAX_PROOF = 4;

const PROCESS = [
  { when: "Day 1", title: "Free tear-down", body: "Your store URL in, a written look back within 24 hours: which products Google is refusing to index, and why." },
  { when: "Weeks 1–2", title: "Audit & roadmap", body: "Crawl, Search Console and GA4 data, two competitors benchmarked, and a 90-day plan ranked by impact." },
  { when: "Weekly sprints", title: "Execution", body: "Technical fixes shipped, content published in measured batches, schema deployed and resubmitted — every change logged." },
  { when: "Every Monday", title: "Report", body: "Indexed pages, impressions, clicks and revenue — what moved, what did not, and what happens next." },
];

// `guide` is still passed by page.tsx; the checklist is linked from the related band.
export default function IndustryClient({ slug, guide: _guide }: { slug: string; guide: Guide }) {
  const industry = getEcommerceIndustry(slug);
  if (!industry) return null;

  const source = `service:ecommerce-seo/${industry.slug}`;
  const stores = industry.slug === "outdoor-knife-stores" ? "knife and outdoor stores" : `${industry.name} stores`;
  const cases = industry.caseClients
    .map((client) => caseStudies.find((c) => c.slug.client === client))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Interleave the stores' screenshots so each is represented.
  const shotsByCase = cases.map((cs) =>
    (CASE_DETAILS[cs.slug.client]?.proof ?? EXTRA_PROOF[cs.slug.client] ?? []).map((shot) => ({ ...shot, href: detailUrl(cs) })),
  );
  const proof = Array.from({ length: Math.max(0, ...shotsByCase.map((s) => s.length)) })
    .flatMap((_, i) => shotsByCase.map((s) => s[i]).filter(Boolean))
    .slice(0, MAX_PROOF);
  // The first two captures go under the hero; any others sit with the results.
  const stripShots = proof.slice(0, 2);
  const moreShots = proof.slice(2);

  const others = ECOMMERCE_INDUSTRIES.filter((i) => i.slug !== industry.slug);
  const hasCases = cases.length > 0;

  return (
    <main>
      <ServiceHero
        crumb={industry.name}
        parent={{ label: "Ecommerce SEO", href: "/services/ecommerce-seo" }}
        above={
          <nav aria-label="Ecommerce SEO by platform and niche" className="mt-4 overflow-x-auto border-y bg-slate-50" style={{ borderColor: "#e5e7eb" }}>
            <div className="mx-auto flex max-w-6xl gap-6 px-4 py-3 text-sm font-medium sm:px-6 lg:px-8">
              <Link href="/services/ecommerce-seo" className="whitespace-nowrap text-slate-500 hover:text-slate-900">
                All ecommerce SEO
              </Link>
              {ECOMMERCE_INDUSTRIES.map((i) =>
                i.slug === industry.slug ? (
                  <span key={i.slug} aria-current="page" className="whitespace-nowrap font-bold text-[#534AB7]">
                    {i.name}
                  </span>
                ) : (
                  <Link key={i.slug} href={`/services/ecommerce-seo/${i.slug}`} className="whitespace-nowrap text-slate-500 hover:text-slate-900">
                    {i.name}
                  </Link>
                ),
              )}
            </div>
          </nav>
        }
        eyebrow={`Ecommerce SEO · ${industry.name}`}
        title={industry.h1}
        accent={industry.accent}
        subtitle={industry.heroSub}
        primary={cases.length ? { href: "#proof", label: "See the store results" } : { href: "#honest", label: "What I have and haven't done" }}
        secondary={{ href: "#process", label: "How it works" }}
        trustPoints={["The founder does the work", "90-day money-back guarantee", "Month to month"]}
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

      {/* The straight answer, for a page without a case study of its own. */}
      {industry.honestNote ? (
        <Band muted id="honest">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>A straight answer first</Eyebrow>
            <H2 center>No {industry.name} case study yet</H2>
            <Lead center>{industry.honestNote}</Lead>
            <TextLink href="/services/ecommerce-seo/woocommerce">See the WooCommerce results</TextLink>
          </div>
        </Band>
      ) : null}

      {stripShots.length ? (
        <ServiceProofStrip
          id="proof"
          title="Store results, straight from the dashboards"
          moreHref={cases[0] ? detailUrl(cases[0]) : "/case-studies"}
          moreLabel="Read the case study"
          shots={stripShots.map(({ href: _href, ...shot }) => shot)}
        />
      ) : null}

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title={`Where ${stores} lose traffic`}
          lead="Four things you can check yourself in the next ten minutes. If any of them fails, it is costing you sales."
        />
        <RuleGrid columns={2}>
          {industry.problems.map((p) => (
            <RuleItem
              key={p.title}
              icon={<ShoppingCart className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={p.title}
              body={
                <>
                  <p className="text-[#374151]"><strong>Check:</strong> {p.check}</p>
                  <p className="mt-1">{p.costs}</p>
                </>
              }
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT'S INCLUDED — light on a page with no results band, so the dark
          process band below is not stacked on another dark band. */}
      <Band dark={hasCases} muted={!hasCases}>
        <BandIntro
          dark={hasCases}
          eyebrow="What’s included"
          title={`What ${industry.name} SEO covers`}
          lead={`Built around how ${stores} actually break and get fixed — not a generic ecommerce package with the name swapped in.`}
        />
        <RuleGrid>
          {industry.included.map((s) => (
            <RuleItem key={s.title} dark={hasCases} title={s.title} body={s.body} />
          ))}
        </RuleGrid>
      </Band>

      {/* RESULTS — only where the page has its own case studies */}
      {cases.length ? (
        <Band muted>
          <BandIntro
            eyebrow="Results"
            title="Ecommerce SEO in action"
            lead="Real stores, their own dashboards. Every number below is on the case study it links to."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cases.map((cs) => (
              <Link
                key={cs.slug.client}
                href={detailUrl(cs)}
                className={`group rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md ${cases.length === 1 ? "md:col-span-2" : ""}`}
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: PURPLE }}>
                  {cs.client} · {cs.location}
                </p>
                <p className="mt-2 text-xl font-black group-hover:text-[#534AB7]" style={{ color: INK }}>{cs.headline}</p>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {cs.metrics.slice(0, 3).map((m) => (
                    <div key={m.l} className="border-t-2 pt-3" style={{ borderColor: "#d9d6f3" }}>
                      <p className="text-2xl font-black" style={{ color: INK }}>{m.v}</p>
                      <p className="text-xs" style={{ color: BODY }}>{m.l}</p>
                    </div>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold" style={{ color: PURPLE }}>
                  Read the case study <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
          {moreShots.length ? (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
              {moreShots.map(({ href: _href, ...shot }) => (
                <ProofImage key={shot.src} {...shot} frameAspect="16 / 9" />
              ))}
            </div>
          ) : null}
        </Band>
      ) : null}

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free tear-down to indexed, selling products" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free store tear-down" }} />
      </Band>

      {/* PRICE, GUARANTEE & WHO DOES THE WORK */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>One person, one roadmap, a clear price</H2>
            <Lead>
              You work with the person who audits your store and ships the fixes. Priorities are ranked by what brings revenue, and every change is logged.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "A written roadmap before you pay anything",
                  "Fixes shipped, not just a PDF of problems",
                  "A plain-English report every Monday",
                  "Month to month, no long contract",
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {ECOM_PLAN ? (
              <PriceCard
                plan={ECOM_PLAN}
                label={`${industry.name} SEO`}
                note="Where a store lands in the range depends on catalogue size, technical scope and content volume. Month to month."
              />
            ) : null}
            <GuaranteeCard />
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;Big catalogues fail in the same places: thin copy, pages Google never indexes, templates that slow every product at once. I fixed those on two stores and built a content autopilot to do it at scale. When you work with SearchPrex, you work with me.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="More on ecommerce SEO" />
        <RuleGrid>
          <RuleItem dark href="/services/ecommerce-seo" title="Ecommerce SEO services" body="The full approach: indexing, product and category content, structured data and speed." />
          {industry.slug === "shopify" ? (
            <RuleItem dark href="/services/technical-seo" title="Technical SEO" body="Crawling, indexing and Core Web Vitals, fixed at the template." />
          ) : (
            <RuleItem dark href="/resources/woocommerce-seo-checklist" title="WooCommerce SEO checklist" body="25 checks for indexing, product pages, schema and speed. Free, no email." />
          )}
          <RuleItem dark href="/case-studies" title="All case studies" body="Every client result, with the screenshots." />
        </RuleGrid>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {others.map((i) => (
            <Link
              key={i.slug}
              href={`/services/ecommerce-seo/${i.slug}`}
              className="rounded-full border px-4 py-2 text-sm font-bold text-white transition hover:bg-white/10"
              style={{ borderColor: "rgba(185,179,245,0.45)" }}
            >
              {i.h1}
            </Link>
          ))}
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title={`${industry.name} SEO questions, answered`}>
        <FaqList faqs={[...industry.capsules, ...industry.faqs]} name={`ecommerce-seo-${industry.slug}-faq`} />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={source}
          copy={{
            headline: "Send me your store URL. I’ll tell you what is holding it back.",
            sub: "Two fields. A written look at your indexing, product copy and competitors — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
