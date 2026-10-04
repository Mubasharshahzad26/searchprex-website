"use client";

// app/services/technical-seo/TechnicalSEOClient.tsx
//
// Topical layout (Oct 2026), built from components/ServiceBands like the other
// service pages: bands that alternate dark navy and white, each with one
// heading, a short paragraph and a "what I check" list.
//
// Figures, each readable in a screenshot on this page or its case study:
//   - Remit Choice: 113K clicks and 5.76M impressions in 2024 (Search Console),
//     and an AI Overview citation.
//   - Michigan Sports & Outdoor: about 3,000 → 11,549 indexed pages, May–Jul
//     2026; WooCommerce net sales $0.00 (20 Jul) and $523.49 month to date
//     (25 Sep 2026).
//   - Michigan Sports & Outdoor: +476% organic clicks at the March 2026 peak and
//     +83% US organic clicks by July, as the case study reports them.
//
// No price card and no money-back guarantee on this page: technical work has
// no retainer in lib/pricing and is quoted as a project (see the FAQ).
// Dropped in this layout: the stat strip, the comparison table, the mid-page
// form and WhySearchPrex.

import Link from "next/link";
import { Search } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import ServiceProofStrip from "@/components/ServiceProofStrip";
import { AuthorCard, FaqList, VideoGallery, type GalleryVideo } from "@/components/layout";
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
  RealityBanner,
  RuleGrid,
  RuleItem,
  ServiceHero,
  Steps,
  TextLink,
} from "@/components/ServiceBands";

import { CAPSULES, FAQS, SYMPTOMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:technical-seo";
const CASE_STUDY = "/case-studies/ecommerce/michigan-outdoor-sports";

const VIDEOS: GalleryVideo[] = [
  { id: "Y5PxSECNGP0", title: "Performance walkthrough", sub: "Live Search Console recording" },
  { id: "cI3BwxqaJbw", title: "The indexing recovery, start to finish", sub: "Crawl and indexation fix" },
];

const services = [
  { title: "Technical SEO audit", body: "Full crawl — indexation, redirects, canonicals, orphan pages, crawl budget — plus server-log review where logs are available.", href: "/services/technical-seo/technical-seo-audit" },
  { title: "Indexation & crawl budget", body: "Every reason Google skips your pages: robots rules, noindex, faceted URLs, duplicate templates at scale.", href: "/services/technical-seo/indexing-recovery" },
  { title: "Core Web Vitals", body: "LCP, INP and CLS diagnosed from real-user data, then fixed in the templates rather than page by page.", href: "#crawl" },
  { title: "Schema & structured data", body: "JSON-LD for every page type — products, articles, FAQs, breadcrumbs, organisation — built from the data the page renders.", href: "#ai-search" },
  { title: "Architecture & internal links", body: "Crawl depth and internal linking, so the pages that earn money are the ones Google reaches first.", href: "#crawl" },
  { title: "Redirects & migrations", body: "Chain cleanup, canonical rules, hreflang where needed, and migrations planned so traffic survives the move.", href: "#process" },
];

const crawlChecks = [
  "Pages report: indexed vs not indexed, grouped by reason",
  "URLs in the sitemap that Google has never indexed",
  "Filter, sort and parameter URLs eating crawl budget",
  "Canonicals pointing to the wrong page, or nowhere",
  "Redirect chains and internal links to 404s",
  "Templates failing Core Web Vitals for real Chrome users",
  "Orphan pages no internal link reaches",
];

const process = [
  { when: "Day 1", title: "Free tear-down", body: "Your URL in, a written diagnosis back within 24 hours — the three things costing you the most, in order." },
  { when: "Week 1", title: "Full crawl", body: "Every URL crawled, logs parsed where available, every issue mapped and ranked by what it costs in traffic." },
  { when: "Weeks 2–4", title: "Fixes live", body: "Indexation blocks, canonicals, redirect chains and template-level speed fixes first; then schema and internal links." },
  { when: "Every Monday", title: "Report", body: "Indexed pages, crawl stats, Core Web Vitals and clicks — what moved, what did not, and what is next." },
];

const aiSearch = [
  { title: "Crawl efficiency for AI crawlers", body: "AI crawlers are less patient than Googlebot. Clean, fast, well-linked pages are the ones that get read and cited." },
  { title: "Structured data answer engines read", body: "Clean JSON-LD tells Google and AI Overviews what a page is about — the difference between being a source and being skipped." },
  { title: "Indexation that holds through updates", body: "Recoveries that fix root causes survive core updates; ones that only resubmit URLs slide back." },
  { title: "Core Web Vitals in the INP era", body: "INP replaced FID in 2024. Responsiveness is now measured on every interaction, not just the first." },
];

const related = [
  { href: CASE_STUDY, title: "Michigan Sports & Outdoor case study", body: "The de-indexing, the rebuild, and every screenshot." },
  { href: "/resources/technical-seo-checklist", title: "Technical SEO audit checklist", body: "26 checks you can run with free Google tools. No email." },
  { href: "/blog/crawl-budget-optimization-guide", title: "Crawl budget guide", body: "How to find and stop the URLs eating your crawl." },
  { href: "/tools/schema-generator", title: "Free schema generator", body: "JSON-LD for your page type, ready to paste." },
  { href: "/services/ecommerce-seo", title: "Ecommerce SEO services", body: "Technical SEO applied to catalogues of thousands of products." },
  { href: "/services/ecommerce-seo/woocommerce", title: "WooCommerce SEO", body: "Filter URLs, plugin weight and indexing on WooCommerce stores." },
  { href: "/blog/google-indexing-api-python", title: "The Indexing API is not a shortcut", body: "What Google's Indexing API is really for, and what to do instead." },
  { href: "/resources/news/technical-seo-news-2026", title: "Technical SEO news", body: "Crawling, indexing and AI bot changes, with sources." },
];

export default function TechnicalSEOClient() {
  return (
    <main>
      <ServiceHero
        crumb="Technical SEO"
        eyebrow="Technical SEO services"
        title="Technical SEO Services"
        accent="that get your pages indexed"
        subtitle="Pages sitting in “crawled – currently not indexed”, crawl budget spent on junk URLs, slow templates. I find the reasons Google is dropping your pages and fix them."
        primary={{ href: "#proof", label: "See client results" }}
        secondary={{ href: "#process", label: "How it works" }}
        trustPoints={["The founder does the work", "Reply within 24 hours", "No long-term contract"]}
        aside={
          <ArticleLeadMagnet
            variant="sidebar"
            source={SOURCE}
            copy={{
              headline: "Free technical tear-down",
              sub: "Send your URL. I’ll check indexing, crawl waste and Core Web Vitals myself and send back what to fix first — within 24 hours.",
            }}
          />
        }
      />

      <ServiceProofStrip
        id="proof"
        title="Technical SEO on a money-transfer site: a year of clicks, and an AI Overview citation"
        moreHref="/case-studies/fintech/remit-choice"
        moreLabel="Read the Remit Choice case study"
        shots={[
          {
            src: "/images/proof/remit-gsc-2024.png",
            alt: "Google Search Console performance for remitchoice.com in 2024: 113K total clicks and 5.76M total impressions.",
            width: 536,
            height: 267,
            figure: "113K",
            figureLabel: "organic clicks in 2024",
            caption: "Remit Choice — Search Console, full year 2024, with 5.76M impressions.",
          },
          {
            src: "/images/proof/remit-ai-overview-ghana.png",
            alt: "Google AI Overview for 'send money to ghana zero fees' listing Remit Choice among the services offering zero-fee transfers to Ghana.",
            width: 1355,
            height: 609,
            caption: "Remit Choice named in Google's AI Overview for \"send money to ghana zero fees\".",
          },
        ]}
      />

      {/* THE PROBLEM */}
      <Band>
        <BandIntro
          center={false}
          eyebrow="The problem"
          title="The Search Console statuses that mean Google is dropping your pages"
          lead="If you have seen one of these in your own Pages report, this is where your traffic is going."
        />
        <RealityBanner
          src="/images/audiences/technical-seo-indexing-crisis.webp"
          alt="Engineering lead and technical SEO specialist analyzing sudden organic traffic drop and crawl budget alerts in Google Search Console"
          tag="The Reality · The Indexing Cliff"
          quote="“Traffic dropped 60% after our redesign, and Google flagged 14,000 product pages as ‘Crawled - Currently Not Indexed’.”"
          body="You spent months investing into content and backlinks, but if your canonical tags loop, faceted URLs create millions of duplicate parameters, or render-blocking scripts exhaust crawl budget, Google abandons your site before ever evaluating your pages."
        />
        <RuleGrid columns={2}>
          {SYMPTOMS.map((s) => (
            <RuleItem
              key={s.status}
              icon={<Search className="h-5 w-5 flex-shrink-0 text-[#b8123a]" aria-hidden />}
              title={s.status}
              body={
                <>
                  <p className="text-[#374151]">{s.means}</p>
                  <p className="mt-1">{s.costs}</p>
                </>
              }
            />
          ))}
        </RuleGrid>
      </Band>

      {/* WHAT'S INCLUDED */}
      <Band dark>
        <BandIntro
          dark
          eyebrow="What’s included"
          title="What a complete technical SEO engagement covers"
          lead="Every part targets a specific reason Google is ignoring, throttling or misreading your site — diagnosed from crawl and log data, then fixed."
        />
        <RuleGrid>
          {services.map((s) => (
            <RuleItem key={s.title} dark {...s} />
          ))}
        </RuleGrid>
      </Band>

      {/* CRAWL & INDEXING */}
      <Band id="crawl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Crawling & indexing</Eyebrow>
            <H2>Content can’t rank from a page Google has dropped</H2>
            <Lead>
              Most traffic problems on large sites start before the content: Google can’t reach the pages, doesn’t think they are worth keeping, or spends its crawl on URLs that should not exist.
            </Lead>
            <Lead>I fix the reasons at the template, so one change repairs thousands of pages instead of one.</Lead>
            <TextLink href="/services/technical-seo/technical-seo-audit">Technical SEO audit service</TextLink>
            <div><TextLink href="/services/technical-seo/indexing-recovery">Pages not indexed? Indexing recovery</TextLink></div>
            <div><TextLink href="/resources/technical-seo-checklist">Free technical SEO checklist (26 checks)</TextLink></div>
          </div>
          <CheckPanel title="What I check in a crawl" items={crawlChecks} />
        </div>
      </Band>

      {/* CASE STUDY */}
      <Band dark>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center [&>*]:min-w-0">
          <div>
            <Eyebrow dark>Technical SEO in action</Eyebrow>
            <H2 dark>Michigan Sports & Outdoor: back from a de-indexing</H2>
            <Lead dark>
              Brand pages were never submitted to Search Console, thin templates caused mass non-indexing, and crawl budget went on URLs that should not exist. Sitemaps were submitted directly, crawl waste removed, brand pages rewritten and resubmitted in batches.
            </Lead>
            <div className="mt-8">
              <CheckList
                dark
                items={[
                  "Peaked at +476% organic clicks in March 2026, then lost ground to a de-indexing",
                  "Rebuilt: about 3,000 → 11,549 indexed pages (+285%) and +83% US organic clicks by July 2026",
                  "Store net sales $0.00 on 20 July, $523.49 month to date on 25 September 2026",
                ]}
              />
            </div>
            <TextLink dark href={CASE_STUDY}>Read the full case study</TextLink>
          </div>
          <ProofPanel>
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              stage="Search Console"
              caption="Pages indexed · May–July 2026"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 [&>*]:min-w-0">
              <ProofImage
                src="/images/proof/mso-revenue-1-jul20-v2.png"
                alt="Michigan Outdoor Sports WooCommerce net sales on 20 July 2026: $0.00 for the month."
                width={1040}
                height={605}
                frameAspect="16 / 9"
                stage="Before · 20 Jul 2026"
                caption="Net sales this month: $0.00"
              />
              <ProofImage
                src="/images/proof/mso-revenue-3-sep25-v2.png"
                alt="Michigan Outdoor Sports WooCommerce net sales on 25 September 2026: $523.49 month to date."
                width={1357}
                height={601}
                frameAspect="16 / 9"
                stage="After · 25 Sep 2026"
                caption="Net sales month to date: $523.49"
              />
            </div>
          </ProofPanel>
        </div>
      </Band>

      {/* VIDEOS */}
      <Band muted>
        <BandIntro eyebrow="Watch the work" title="The recovery, recorded in Search Console" />
        <div className="mx-auto max-w-5xl">
          <VideoGallery videos={VIDEOS} />
        </div>
      </Band>

      {/* PROCESS */}
      <Band dark id="process">
        <BandIntro dark eyebrow="How it works" title="Tear-down to fixes live in four weeks" />
        <Steps steps={process} cta={{ href: "#get-started", label: "Get my free technical tear-down" }} />
      </Band>

      {/* WHY & WHO */}
      <Band>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Why SearchPrex</Eyebrow>
            <H2>Fixes shipped, not a PDF of problems</H2>
            <Lead>
              Technical SEO usually stalls between an agency that only writes reports and an in-house team whose tickets never get prioritised. I do the implementation, or hand your developers a ranked ticket list if you would rather keep changes in-house.
            </Lead>
            <div className="mt-8">
              <CheckList
                items={[
                  "The founder does the work — no account managers in between",
                  "Sites with 10,000+ pages are where most of this work has been done",
                  "Every issue ranked by what it costs in traffic",
                  "A plain-English report every Monday",
                ]}
              />
            </div>
          </div>
          <div className="rounded-2xl p-7" style={{ background: "#f4f5f8" }}>
            <p className="text-sm font-black uppercase tracking-wider" style={{ color: INK }}>How pricing works</p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              The first audit is free: a written tear-down of your crawling, indexing and speed problems within 24 hours. The fixes are then quoted as a project, because the price depends on how many pages and templates are affected — you see the scope before paying anything.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#374151]">
              Ongoing monitoring after the fixes is optional and month to month.
            </p>
            <Link href="/pricing" className="mt-4 inline-flex text-sm font-bold hover:underline" style={{ color: "#534AB7" }}>
              See all pricing →
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-4xl">
          <AuthorCard
            name="Mubashar Sharif"
            role="Founder · 5+ years · Semrush & HubSpot certified"
            quote="&ldquo;Technical SEO is where I&rsquo;ve done my deepest work. I took Michigan Sports &amp; Outdoor to a +476% clicks peak in March 2026, watched it de-index, and rebuilt it to 11,549 indexed pages and +83% US clicks — every step verified in Search Console.&rdquo;"
            imageSrc="/images/mubashar-sharif.jpg"
            imageAlt="Mubashar Sharif — Founder of SearchPrex"
            linkedinUrl={LINKEDIN}
            badges={["Semrush certified", "HubSpot certified"]}
          />
        </div>
      </Band>

      {/* AI SEARCH */}
      <Band dark id="ai-search">
        <BandIntro
          dark
          eyebrow="SEO · GEO · AI Overviews"
          title="Technical SEO for AI search"
          lead="A site that is slow, bloated or badly linked does not get read — by Google or by the models that now answer before the results do."
        />
        <RuleGrid columns={4}>
          {aiSearch.map((c) => (
            <RuleItem key={c.title} dark {...c} />
          ))}
        </RuleGrid>
      </Band>

      {/* KEEP READING */}
      <Band muted>
        <BandIntro center={false} eyebrow="Keep reading" title="Related technical SEO resources" />
        <RuleGrid columns={4}>
          {related.map((r) => (
            <RuleItem key={r.href} {...r} />
          ))}
        </RuleGrid>
      </Band>

      {/* FAQ — page.tsx builds the FAQPage schema from the same arrays */}
      <FaqBand title="Technical SEO questions, answered">
        <FaqList faqs={[...CAPSULES, ...FAQS]} name="technical-seo-faq" />
      </FaqBand>

      <div id="get-started">
        <ArticleLeadMagnet
          variant="bottom"
          source={SOURCE}
          copy={{
            headline: "Send me your URL. I’ll tell you what Google is dropping.",
            sub: "Two fields. A written diagnosis of your indexing, crawl waste and Core Web Vitals — from me, within 24 hours.",
          }}
        />
      </div>
    </main>
  );
}
