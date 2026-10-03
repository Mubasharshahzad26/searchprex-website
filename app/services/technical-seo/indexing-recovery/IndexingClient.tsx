"use client";

// app/services/technical-seo/indexing-recovery/IndexingClient.tsx
//
// Indexing recovery — a spoke of /services/technical-seo, on the
// ServiceBands layout. Copy and FAQ live in ./data.ts.

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

import { CAPSULES, FAQS, META, METHOD, STATUSES, WHO } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:technical-seo/indexing-recovery";
const MSO_CASE = "/case-studies/ecommerce/michigan-outdoor-sports";

/** US states where a client's indexing or crawl work is published. */
const MAP_CLIENTS: MapClient[] = [
  {
    state: "MI",
    name: "Michigan Outdoor Sports",
    place: "Michigan · WooCommerce store",
    result: "Back from a de-indexing: about 3,000 → 11,549 indexed pages (May–July 2026), 12.2K by 21 August.",
    href: MSO_CASE,
  },
  {
    state: "CA",
    name: "HVAC Services Team",
    place: "Simi Valley, California · local service site",
    result: "Technical problems fixed so its service pages could be crawled and indexed; now named in Google’s AI Overview.",
    href: "/case-studies/hvac/local-hvac-services",
  },
];

const PROCESS = [
  { when: "Day 1", title: "Free diagnosis", body: "Your URL in, a written answer within 24 hours: why your pages aren’t indexed, and which reason costs you the most." },
  { when: "Week 1", title: "Sitemap ↔ Search Console diff", body: "Every URL you want indexed compared with what Google reports, sorted by reason and by revenue." },
  { when: "Weeks 2–4", title: "Fixes by template", body: "Duplicate and thin templates, crawl waste, canonicals and orphaned pages fixed where they start." },
  { when: "Then, in batches", title: "Resubmit & re-measure", body: "Fixed pages resubmitted through Search Console in batches; each batch measured before the next." },
];

const RELATED = [
  { href: "/blog/fix-crawled-currently-not-indexed-ecommerce", title: "Fix “Crawled – currently not indexed”", body: "Why Google drops pages it has already read." },
  { href: "/blog/fix-discovered-currently-not-indexed-ecommerce", title: "Fix “Discovered – currently not indexed”", body: "When Google knows a page but won’t crawl it." },
  { href: "/blog/shopify-woocommerce-indexing-blueprint", title: "Shopify & WooCommerce indexing blueprint", body: "Platform by platform, where indexing breaks." },
  { href: "/blog/google-indexing-api-python", title: "The Indexing API is not a shortcut", body: "What it is really for, and what to do instead." },
];

export default function IndexingClient() {
  return (
    <main>
      <ServiceHero
        crumb="Indexing Recovery"
        parent={{ label: "Technical SEO", href: "/services/technical-seo" }}
        eyebrow="Indexing recovery"
        title={META.h1}
        accent={META.accent}
        subtitle="Products and pages stuck in “Crawled – currently not indexed” or “Discovered – currently not indexed” can’t rank or sell. I find the reason Google is leaving them out and fix it at the source — no indexer tools, no tricks that wear off."
        primary={{ href: "#proof", label: "See the recovery" }}
        secondary={{ href: "#statuses", label: "Check your status" }}
        trustPoints={["The founder does the work", "Free 24-hour diagnosis", "No long-term contract"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free indexing diagnosis",
              sub: "Send your URL. I’ll tell you why Google isn’t indexing your pages and which reason is costing you the most — within 24 hours.",
            }}
          />
        }
      />

      <ServiceProofStrip
        id="proof"
        title="A WooCommerce store, back from a de-indexing"
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
            caption: "Michigan Outdoor Sports — Search Console Pages report.",
          },
          {
            src: "/images/indexing-comparsion-before-mso-autopilot.png",
            alt: "Google Search Console Page indexing for michigansportsoutdoor.com, last updated 21 August 2026: 12.2K pages indexed, up from about 4,000 at the end of May 2026 and 5,247 on 13 June.",
            width: 1362,
            height: 495,
            figure: "12.2K",
            figureLabel: "Pages indexed by 21 August 2026",
            caption: "Same store a month later: about 4,000 at the end of May → 12.2K. The same report shows 62.9K URLs still not indexed.",
          },
        ]}
      />

      <TrustStrap />

      {/* STATUSES */}
      <Band id="statuses">
        <BandIntro
          center={false}
          eyebrow="Check your status"
          title="What your Search Console status means — and the usual fix"
          lead="Open Search Console → Indexing → Pages → “Why pages aren’t indexed”. Find your status below."
        />
        <RuleGrid columns={3}>
          {STATUSES.map((s) => (
            <RuleItem
              key={s.status}
              icon={<Search className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={s.status}
              body={
                <>
                  <p className="text-[#374151]">{s.means}</p>
                  <p className="mt-1"><strong className="text-[#374151]">Usual fix:</strong> {s.fix}</p>
                </>
              }
            />
          ))}
        </RuleGrid>
      </Band>

      {/* NO TRICKS */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="Why “indexed in 48 hours” doesn’t last"
          title="Indexing that holds, not indexing that wears off"
          lead="Some services push URLs at Google with indexer tools. Google limits its Indexing API to job postings and livestream videos — and a page Google judged not worth keeping drops out again unless the reason is fixed."
        />
        <RuleGrid>
          <RuleItem dark title="Fix the reason" body="Every unindexed URL has a reason in Search Console. The work starts there, not with a resubmit button." />
          <RuleItem dark title="Fix it at the template" body="One template change repairs thousands of product or city pages at once, and keeps new pages from failing the same way." />
          <RuleItem dark title="Prove it in Search Console" body="Batches are resubmitted and re-measured, so you see indexed pages rise in Google’s own report." />
        </RuleGrid>
        <div className="mt-10 text-center">
          <TextLink dark href="/blog/google-indexing-api-python">Read why the Indexing API is not a shortcut</TextLink>
        </div>
      </Band>

      {/* METHOD */}
      <Band id="method">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>How the recovery works</Eyebrow>
            <H2>Sorted by reason, fixed by template, proven in batches</H2>
            <Lead>
              Most indexing problems on large sites come from a handful of templates. Find those, fix them once, and thousands of pages qualify again.
            </Lead>
            <Lead>The highest-revenue pages go first, so the recovery pays back before it is finished.</Lead>
            <TextLink href="/services/technical-seo/technical-seo-audit">Need the full technical audit?</TextLink>
          </div>
          <CheckPanel title="What I do" items={METHOD} />
        </div>
      </Band>

      {/* WHO IT'S FOR */}
      <Band muted>
        <BandIntro
          eyebrow="Who it’s for"
          title="Sites where pages exist but Google can’t find them"
          lead="Indexing breaks in different places on a store, a migrated site and a local service site."
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
            <Eyebrow dark>Indexing recovery in action</Eyebrow>
            <H2 dark>Michigan Outdoor Sports, Michigan</H2>
            <Lead dark>
              A real outdoor business selling online. Brand pages had never been submitted to Search Console, thin templates caused mass non-indexing, and crawl budget went on URLs that should not exist. Sitemaps were submitted directly, crawl waste removed, brand pages rewritten and resubmitted in batches.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "About 3,000 → 11,549 indexed pages, May–July 2026",
                  "12.2K indexed by 21 August 2026",
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
              caption="US clicks 224 → 322 after the recovery"
            />
          </ProofPanel>
        </div>
      </Band>

      {/* MAP */}
      <Band>
        <BandIntro
          eyebrow="Where this work has run"
          title="Indexing and crawl fixes for US businesses"
          lead="Highlighted states are where a published case study is set. SMK Store, a US store with 35,000+ products, sells online only. The work is done remotely, for any state."
        />
        <div className="mt-12">
          <UsTileMap clients={MAP_CLIENTS} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="From free diagnosis to pages back in Google" />
        <Steps steps={PROCESS} cta={{ href: "#get-started", label: "Get my free indexing diagnosis" }} />
      </Band>

      {/* WHY SEARCHPREX */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why choose SearchPrex</Eyebrow>
            <H2>I have rebuilt a store’s index, not just read about it</H2>
            <Lead>
              Indexing recovery is where I have done my deepest work — including a store that lost ground to a de-indexing and was rebuilt to 11,549 indexed pages.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "Only methods inside Google’s guidelines",
                  "Fixed at the template, so new pages don’t fail the same way",
                  "Progress shown in Google’s own Search Console reports",
                ]}
              />
            </div>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "#f4f5f8" }}>
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>How pricing works</p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              The diagnosis is free: a written answer to why your pages aren’t indexed, within 24 hours. The fixes are quoted as a project, because the price depends on how many templates and pages are affected — you see the scope before paying anything.
            </p>
            <TextLink href="/pricing">See all pricing</TextLink>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;A page Google won&rsquo;t index can&rsquo;t rank and can&rsquo;t sell. I watched Michigan Outdoor Sports de-index and rebuilt it to 11,549 indexed pages — by fixing why Google dropped the pages, not by pushing them back in.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* RELATED */}
      <Band dark>
        <BandIntro dark eyebrow="Keep reading" title="Indexing guides" />
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
      <FaqBand title="Indexing questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="indexing-recovery-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll tell you why Google isn’t indexing your pages.",
            sub: "Two fields. The reason, and the fix that matters most — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
