"use client";

// app/services/technical-seo/technical-seo-audit/AuditClient.tsx
//
// Technical SEO audit — a spoke of /services/technical-seo, on the
// ServiceBands layout. Copy and FAQ live in ./data.ts.
//
// Competitor pages for "technical seo audit services" (checked 3 Oct 2026)
// sell on testimonials, client logos and "200+ checks"; none shows what the
// audit changed for a client. This page leads with two clients' Search
// Console captures, says exactly what the client receives, and offers the
// first audit free.

import { Search } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import TrustStrap from "@/components/TrustStrap";
import UsTileMap, { type MapClient } from "@/components/UsTileMap";
import { AuthorCard, FaqList } from "@/components/layout";
import {
  INK,
  Band,
  BandIntro,
  CheckList,
  CheckPanel,
  Eyebrow,
  FaqBand,
  H2,
  Lead,
  ProofPanel,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

import { AREAS, CAPSULES, DELIVERABLES, FAQS, META, SIGNS, WHO } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:technical-seo/technical-seo-audit";
const MSO_CASE = "/case-studies/ecommerce/michigan-outdoor-sports";

/** US states where a client's technical work is published. */
const MAP_CLIENTS: MapClient[] = [
  {
    state: "MI",
    name: "Michigan Outdoor Sports",
    place: "Michigan · WooCommerce store",
    result: "About 3,000 → 11,549 indexed pages after crawl waste and indexing blocks were fixed (May–July 2026).",
    href: MSO_CASE,
  },
  {
    state: "CA",
    name: "HVAC Services Team",
    place: "Simi Valley, California · local service site",
    result: "Technical problems and site structure fixed; now named in Google’s AI Overview for an AC installation search.",
    href: "/case-studies/hvac/local-hvac-services",
  },
];

const PROCESS = [
  { when: "Day 1", title: "Free tear-down", body: "Your URL in, a written diagnosis back within 24 hours — the three things costing you the most, in order." },
  { when: "Week 1", title: "Full crawl", body: "Every URL crawled, logs parsed where available, every issue mapped and ranked by what it costs in traffic." },
  { when: "Weeks 2–4", title: "Fixes live", body: "Indexing blocks, canonicals, redirect chains and template-level speed fixes first; then schema and internal links." },
  { when: "After the fixes", title: "Re-check & report", body: "Indexed pages, crawl stats, Core Web Vitals and clicks re-measured — what moved and what is next." },
];

const RELATED = [
  { href: "/resources/technical-seo-checklist", title: "Technical SEO checklist", body: "26 checks you can run with free Google tools. No email." },
  { href: "/blog/fix-crawled-currently-not-indexed-ecommerce", title: "Fix “Crawled – currently not indexed”", body: "Why Google drops pages it has already read, and the fixes." },
  { href: "/blog/crawl-budget-optimization-guide", title: "Crawl budget guide", body: "How to find and stop the URLs eating your crawl." },
  { href: "/blog/google-indexing-api-python", title: "The Indexing API is not a shortcut", body: "What it is really for, and what to do instead." },
];

export default function AuditClient() {
  return (
    <main>
      <ServiceHero
        crumb="Technical SEO Audit"
        parent={{ label: "Technical SEO", href: "/services/technical-seo" }}
        eyebrow="Technical SEO audit"
        title={META.h1}
        accent={META.accent}
        subtitle="Pages Google won’t index, crawl budget spent on junk URLs, templates too slow for a phone. I find what is holding your site back, rank it by what it costs you in traffic, and fix it — for US stores, service businesses and law firms."
        primary={{ href: "#proof", label: "See client results" }}
        secondary={{ href: "#deliverables", label: "What you get" }}
        trustPoints={["The founder does the work", "First audit free", "No long-term contract"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free technical tear-down",
              sub: "Send your URL. I’ll check indexing, crawl waste and Core Web Vitals myself and send back the three things to fix first — within 24 hours.",
            }}
          />
        }
      />

      <ServiceProofStrip
        id="proof"
        title="What fixing the technical problems changed"
        moreHref={MSO_CASE}
        moreLabel="Read the Michigan Outdoor Sports case study"
        shots={[
          {
            src: "/images/proof/mso-gsc-indexing-full.png",
            alt: "Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026.",
            width: 778,
            height: 520,
            figure: "3,000 → 11,549",
            figureLabel: "Pages indexed, May–July 2026",
            caption: "Michigan Outdoor Sports, a WooCommerce store — Search Console Pages report.",
          },
          {
            src: "/images/proof/remit-gsc-2024.png",
            alt: "Google Search Console performance for remitchoice.com in 2024: 113K total clicks and 5.76M total impressions.",
            width: 536,
            height: 267,
            figure: "113K",
            figureLabel: "Organic clicks in 2024",
            caption: "Remit Choice, an international money-transfer site — Search Console, full year 2024.",
          },
        ]}
      />

      <TrustStrap />

      {/* SIGNS */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="Do you need one?"
          title="Signs your site has a technical problem"
          lead="If one of these sounds familiar, the cause is usually in how the site is built — not in the words on the page."
        />
        <RuleGrid columns={2}>
          {SIGNS.map((s) => (
            <RuleItem
              key={s.title}
              icon={<Search className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={s.title}
              body={s.body}
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT I AUDIT */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="What the audit covers"
          title="Eight areas, every one tied to traffic"
          lead="Each area is checked against what Google itself reports in Search Console — not just a crawler’s list of warnings."
        />
        <RuleGrid columns={4}>
          {AREAS.map((a) => (
            <RuleItem key={a.title} dark title={a.title} body={a.body} />
          ))}
        </RuleGrid>
      </Band>

      {/* DELIVERABLES */}
      <Band id="deliverables">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>What you get</Eyebrow>
            <H2>A ranked fix list your developer can start on Monday</H2>
            <Lead>
              Most audits hand over a long PDF of tool warnings, ordered by nothing. This one is ranked by what each problem costs you in traffic, so the first fix is the one that matters most.
            </Lead>
            <Lead>If you would rather not involve a developer, I implement the fixes myself.</Lead>
            <TextLink href="/resources/technical-seo-checklist">Try the free 26-point checklist first</TextLink>
          </div>
          <CheckPanel title="Delivered" items={DELIVERABLES} />
        </div>
      </Band>

      {/* WHO IT'S FOR */}
      <Band muted>
        <BandIntro
          eyebrow="Who it’s for"
          title="Sites where the build is holding the business back"
          lead="Different platforms break in different places. The audit starts from the problems your kind of site usually has."
        />
        <RuleGrid>
          {WHO.map((w) => (
            <RuleItem key={w.title} {...w} />
          ))}
        </RuleGrid>
      </Band>

      {/* CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>An audit in action</Eyebrow>
            <H2 dark>Michigan Outdoor Sports: back from a de-indexing</H2>
            <Lead dark>
              Brand pages had never been submitted to Search Console, thin templates caused mass non-indexing, and crawl budget went on URLs that should not exist. The audit ranked those causes; the fixes went in by template and were resubmitted in batches.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "About 3,000 → 11,549 indexed pages, May–July 2026",
                  "US clicks 224 → 322 (1 Apr–12 Jun vs 13 Jun–29 Aug 2026)",
                ]}
              />
            </div>
            <TextLink dark href={MSO_CASE}>Read the full case study</TextLink>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/clicks-comaprsion-after-run-mso-autopilot.PNG"
              alt="Google Search Console comparison for michigansportsoutdoor.com, United States only: 322 clicks from 13 June to 29 August 2026 against 224 clicks from 1 April to 12 June 2026."
              width={1366}
              height={520}
              stage="Search Console · United States"
              caption="US clicks 224 → 322"
            />
            <ProofImage
              src="/images/proof/remit-rank-1-pakistan.png"
              alt="Google results for 'free of cost money transfer to Pakistan from uk' with Remit Choice ranking first, above Meezan Bank, Xoom and Wise."
              width={1359}
              height={609}
              stage="Remit Choice · Google search"
              caption="#1 for “free of cost money transfer to Pakistan from uk”, above Xoom and Wise"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* MAP */}
      <Band>
        <BandIntro
          eyebrow="Where this work has run"
          title="Technical work for US businesses"
          lead="Highlighted states are where a published case study is set. SMK Store (a US store with 35,000+ products) and Remit Choice (international) are online-only. The work is done remotely, for any state."
        />
        <div className="mt-12">
          <UsTileMap clients={MAP_CLIENTS} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="Tear-down to fixes live in four weeks" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free technical tear-down" }} />
      </Band>

      {/* WHY SEARCHPREX */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why choose SearchPrex</Eyebrow>
            <H2>The person who audits your site fixes it</H2>
            <Lead>
              Technical SEO usually stalls between an agency that only writes reports and an in-house team whose tickets never get prioritised. Here the audit and the fixes come from the same person.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "Sites with thousands of pages are where most of this work has been done",
                  "Every issue ranked by what it costs in traffic",
                  "Fixes implemented, or handed over as developer tickets",
                ]}
              />
            </div>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "#f4f5f8" }}>
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>How pricing works</p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              The first audit is free: a written tear-down of your crawling, indexing and speed problems within 24 hours. The fixes are then quoted as a project, because the price depends on how many pages and templates are affected — you see the scope before paying anything.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">Ongoing monitoring after the fixes is optional and month to month.</p>
            <TextLink href="/pricing">See all pricing</TextLink>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;An audit is only worth the fixes that follow it. I rank every problem by what it costs in traffic, start with the one that matters most, and check Search Console afterwards to prove it worked.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="Technical SEO guides" />
        <RuleGrid columns={4}>
          {RELATED.map((r) => (
            <RuleItem key={r.href} dark {...r} />
          ))}
        </RuleGrid>
        <div className="mt-10 text-center">
          <TextLink dark href="/services/technical-seo">See the full technical SEO service</TextLink>
        </div>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Technical SEO audit questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="technical-seo-audit-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll tell you what is holding your site back.",
            sub: "Two fields. The three technical problems costing you the most traffic — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
