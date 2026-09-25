"use client";

// app/services/technical-seo/TechnicalSEOClient.tsx
//
// Rebuilt on the shared service-page template (previews/services-cro-wireframe.html),
// in AIDA order: hero + form (Attention) -> the Search Console statuses a reader
// recognises and quick answers (Interest) -> dated proof, deliverables, process
// (Desire) -> a form mid-page and at the close (Action).
//
// What was wrong with the previous version, and is fixed here:
//
//   - A visually hidden H1 ("Technical SEO Audit & Services | Core Web Vitals &
//     Indexing Recovery") over a visible "Fix the foundation." The heading a
//     reader sees and the one Google reads disagreed. The visible H1 now leads
//     with the keyword.
//   - "48hr audit turnaround" in three places, while every other page offers a
//     reply within 24 hours. One site, two promises.
//   - "+285% pages indexed", "+285% indexing rate" and "12K+ pages indexed" as
//     three separate hero stats — one fact three times — then the same four
//     stats again in a strip underneath.
//   - The FAQ said Michigan Outdoor Sports went "from near-zero to 12K+". The
//     screenshot says about 3,000 to 11,549.
//   - "Never" as the in-house team's turnaround in the comparison table.
//   - No lead form, no screenshots (videos only), and no internal links.

import Link from "next/link";
import { ArrowRight, Search, Wrench } from "lucide-react";

import ArticleLeadMagnet from "@/components/ArticleLeadMagnet";
import ProofImage from "@/components/ProofImage";
import {
  AnswerCapsules,
  AuthorCard,
  Breadcrumb,
  CardGrid,
  ComparisonTable,
  FaqList,
  FeatureCard,
  NarrativeCard,
  PageHero,
  Section,
  SectionHeading,
  StatStrip,
  VideoGallery,
  Accent,
  type ComparisonRow,
  type GalleryVideo,
} from "@/components/layout";

import { CAPSULES, FAQS, SYMPTOMS } from "./data";

const LINKEDIN = "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/";
const SOURCE = "service:technical-seo";
const CASE_STUDY = "/case-studies/ecommerce/michigan-outdoor-sports";

const VIDEOS: GalleryVideo[] = [
  { id: "Y5PxSECNGP0", title: "Performance walkthrough", sub: "Live Search Console recording" },
  { id: "cI3BwxqaJbw", title: "The indexing recovery, start to finish", sub: "Crawl and indexation fix" },
];

/** One fact per stat, each with its window. */
const stats = [
  { value: "3,000 → 11,549", label: "Pages indexed, May–Jul 2026" },
  { value: "+83%", label: "US organic clicks, same period" },
  { value: "+476%", label: "Organic clicks at the March 2026 peak" },
  { value: "24h", label: "Tear-down reply" },
];

const services = [
  { title: "Technical SEO audit", body: "Full crawl — indexation, redirects, canonicals, orphan pages, crawl budget — plus server-log review where logs are available." },
  { title: "Indexation & crawl budget", body: "Every reason Google skips your pages: robots rules, noindex, faceted URLs, duplicate templates at scale." },
  { title: "Core Web Vitals (LCP / INP / CLS)", body: "Diagnosed from real-user data, then fixed in the templates rather than page by page." },
  { title: "Schema & structured data", body: "JSON-LD for every page type — products, articles, FAQs, breadcrumbs, organisation — built from the data the page renders." },
  { title: "Site architecture & internal links", body: "Crawl depth, hub-and-spoke structure and internal linking, so the pages that earn money are the ones Google reaches first." },
  { title: "Redirects, canonicals & migrations", body: "Chain cleanup, canonical rules, hreflang where needed, and migrations planned so traffic survives the move." },
];

const comparisonColumns = ["SearchPrex", "Generic agency", "In-house"];
const comparisonRows: ComparisonRow[] = [
  { label: "Full technical audit + log files", values: [true, "Sometimes", false] },
  { label: "Implementation, not just a report", values: [true, false, "Sometimes"] },
  { label: "Handles 10K+ page sites", values: [true, "Sometimes", "Sometimes"] },
  { label: "Indexation recovery at scale", values: [true, false, false] },
  { label: "Schema across every page type", values: [true, false, false] },
  { label: "Audit to first fixes live", values: ["4 weeks", "8–12 weeks", "Depends on the dev backlog"] },
];

const process = [
  { step: "01", week: "Day 1", title: "Tear-down", body: "Your URL in, a written diagnosis back within 24 hours — the three things costing you the most, in order." },
  { step: "02", week: "Week 1", title: "Full crawl", body: "Every URL crawled, logs parsed where available, every issue mapped and ranked by what it costs in traffic." },
  { step: "03", week: "Weeks 2–4", title: "Fixes live", body: "Indexation blocks, canonicals, redirect chains and template-level speed fixes first; then schema and internal links." },
  { step: "04", week: "Every Monday", title: "Report", body: "Indexed pages, crawl stats, Core Web Vitals and clicks — what moved, what did not, and what is next." },
];

const aiSearch = [
  { title: "Crawl efficiency for AI crawlers", body: "AI crawlers are less patient than Googlebot. Clean, fast, well-linked pages are the ones that get read and cited." },
  { title: "Structured data that answer engines read", body: "Clean JSON-LD tells Google and AI Overviews what a page is about — the difference between being a source and being skipped." },
  { title: "Indexation that holds through updates", body: "Recoveries that fix root causes survive core updates; ones that only resubmit URLs slide back." },
  { title: "Core Web Vitals in the INP era", body: "INP replaced FID in 2024. Responsiveness is now measured on every interaction, not just the first." },
];

const related = [
  { href: CASE_STUDY, title: "Michigan Outdoor Sports case study", body: "The de-indexing, the rebuild, and every screenshot." },
  { href: "/resources/news?category=Technical", title: "Technical SEO news", body: "Crawling, indexing and Core Web Vitals changes as they land." },
  { href: "/blog/crawl-budget-optimization-guide", title: "Crawl budget guide", body: "How to find and stop the URLs eating your crawl." },
  { href: "/tools/schema-generator", title: "Free schema generator", body: "JSON-LD for your page type, ready to paste." },
];

export default function TechnicalSEOClient() {
  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Technical SEO" },
        ]}
      />

      {/* 01 — HERO · Attention */}
      <PageHero
        compactTop
        eyebrow="Technical SEO"
        title={
          <>
            Technical SEO Services <Accent>that get your pages indexed</Accent>
          </>
        }
        subtitle="Pages sitting in “crawled – currently not indexed”, crawl budget spent on junk URLs, slow templates. I find the reasons Google is dropping your pages and fix them — led by Mubashar Sharif, Semrush-certified."
        actions={
          <Link
            href="#proof"
            className="inline-flex items-center gap-1.5 text-sm font-bold"
            style={{ color: "#534AB7" }}
          >
            See the indexing recovery <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        }
        trustPoints={["Reply within 24 hours", "No long-term contract", "The founder does the work"]}
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

      <StatStrip stats={stats} />

      {/* 02 — THE PROBLEM · Interest */}
      <Section>
        <SectionHeading
          eyebrow="The problem"
          title="The Search Console statuses that mean Google is dropping your pages"
          intro="If you have seen one of these in your own Pages report, this is where your traffic is going."
        />
        <CardGrid columns={2}>
          {SYMPTOMS.map((s) => (
            <div key={s.status} className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
              <p className="flex items-center gap-2 text-sm font-black text-[#0a0f2e]">
                <Search className="h-4 w-4 flex-shrink-0 text-[#b8123a]" aria-hidden />
                {s.status}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#374151]">{s.means}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#5b6472]">{s.costs}</p>
            </div>
          ))}
        </CardGrid>
      </Section>

      {/* 03 — QUICK ANSWERS · Interest / AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="Quick answers" title="Technical SEO, answered plainly" />
        <AnswerCapsules items={CAPSULES} />
      </Section>

      {/* 04 — PROOF · Desire */}
      <Section id="proof">
        <SectionHeading
          eyebrow="Proof · Michigan Outdoor Sports"
          title="About 3,000 indexed pages to 11,549 — then the revenue followed"
          intro="Unedited screenshots. Click any of them to read the numbers yourself."
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <ProofImage
              src="/images/proof/mso-gsc-indexing-full.png"
              alt="Google Search Console Pages report for Michigan Outdoor Sports: about 3,000 indexed pages in mid-May 2026 rising to 11,549 on 25 July 2026."
              width={778}
              height={520}
              caption="Search Console · Pages indexed · May–July 2026"
            />
          </div>
          <div className="grid gap-6">
            <ProofImage
              src="/images/proof/mso-revenue-1-jul20.png"
              alt="Michigan Outdoor Sports WooCommerce net sales on 20 July 2026: $0.00 for the month."
              width={1040}
              height={605}
              frameAspect="16 / 9"
              stage="Before · 20 Jul 2026"
              caption="Net sales this month: $0.00"
            />
            <ProofImage
              src="/images/proof/mso-revenue-3-sep25.png"
              alt="Michigan Outdoor Sports WooCommerce net sales on 25 September 2026: $523.49 month to date."
              width={1357}
              height={601}
              frameAspect="16 / 9"
              stage="After · 25 Sep 2026"
              caption="Net sales month to date: $523.49"
            />
          </div>
        </div>
        <div className="mt-8">
          <NarrativeCard
            challenge="Brand pages never submitted to Search Console, thin templates causing mass non-indexing, and crawl budget spent on URLs that should not exist — thousands of pages invisible."
            strategy="Sitemaps submitted directly, indexation blocks and crawl waste removed, brand pages rewritten with unique content, resubmitted in batches."
            outcome="Peaked at +476% organic clicks in March 2026, lost ground to a de-indexing, then rebuilt: about 3,000 to 11,549 indexed pages (+285%) and +83% US organic clicks by July, with no ad spend."
          />
        </div>
        <VideoGallery videos={VIDEOS} />
        <p className="mt-6 text-sm">
          <Link href={CASE_STUDY} className="font-bold underline decoration-2 underline-offset-2" style={{ color: "#534AB7" }}>
            Read the full case study
          </Link>
        </p>
      </Section>

      {/* 05 — WHAT YOU GET · Desire */}
      <Section tone="surface">
        <SectionHeading
          variant="split"
          eyebrow="Everything included"
          title={<>What&apos;s in the<br />technical SEO work</>}
          intro="Every deliverable targets a specific reason Google is ignoring, throttling or misreading your site — diagnosed from crawl and log data, then fixed."
        />
        <CardGrid columns={3}>
          {services.map((s) => (
            <FeatureCard key={s.title} label="Included" title={s.title} body={s.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 06 — MID-PAGE FORM · Action */}
      <Section tight>
        <ArticleLeadMagnet
          variant="banner"
          source={SOURCE}
          copy={{
            eyebrow: "Seen one of those statuses?",
            headline: "Find out how many of your pages Google has dropped.",
            sub: "Send me your URL. I’ll check your indexing and crawl waste myself and tell you what to fix first — free, within 24 hours.",
          }}
        />
      </Section>

      {/* 07 — PROCESS · Desire */}
      <Section>
        <SectionHeading eyebrow="How it works" title="Tear-down to fixes live in four weeks" />
        <CardGrid columns={4}>
          {process.map((p) => (
            <FeatureCard key={p.step} step={p.step} label={p.week} title={p.title} body={p.body} />
          ))}
        </CardGrid>
      </Section>

      {/* 08 — COMPARE · Desire */}
      <Section tone="surface">
        <SectionHeading
          eyebrow="Why SearchPrex"
          title="Compare the approaches"
          intro="Technical SEO usually stalls between an agency that only writes reports and an in-house team whose tickets never get prioritised."
        />
        <ComparisonTable
          columns={comparisonColumns}
          rows={comparisonRows}
          caption="Technical SEO with SearchPrex compared with a generic agency and an in-house team"
        />
      </Section>

      {/* 09 — AI SEARCH · AEO / GEO */}
      <Section>
        <SectionHeading
          eyebrow="SEO · GEO · AI Overviews"
          title="Technical SEO for AI search"
          intro="A site that is slow, bloated or badly linked does not get read — by Google or by the models that now answer before the results do."
        />
        <CardGrid columns={2}>
          {aiSearch.map((c) => (
            <FeatureCard
              key={c.title}
              icon={<Wrench className="h-5 w-5" style={{ color: "#534AB7" }} aria-hidden />}
              title={c.title}
              body={c.body}
            />
          ))}
        </CardGrid>
      </Section>

      {/* 10 — RELATED · internal links (hub and spoke) */}
      <Section tone="surface">
        <SectionHeading eyebrow="Keep reading" title="Related technical SEO resources" />
        <CardGrid columns={4}>
          {related.map((r) => (
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

      {/* 11 — AUTHOR · E-E-A-T */}
      <Section width="narrow" tight>
        <AuthorCard
          name="Mubashar Sharif"
          role="Founder & Lead Technical SEO Strategist · Semrush-certified"
          quote="&ldquo;Technical SEO is where I&apos;ve done my deepest work. I took Michigan Outdoor Sports to a +476% clicks peak in March 2026, watched it de-index, and rebuilt it to 11,549 indexed pages and +83% US clicks — every step verified in Search Console.&rdquo;"
          imageSrc="/images/mubashar-sharif.jpg"
          imageAlt="Mubashar Sharif — Founder & Lead Technical SEO Strategist"
          linkedinUrl={LINKEDIN}
        />
      </Section>

      {/* 12 — FAQ · AEO */}
      <Section tone="surface" width="reading">
        <SectionHeading eyebrow="FAQ" title="Technical SEO questions, answered" />
        <FaqList faqs={FAQS} name="technical-seo-faq" />
      </Section>

      {/* CLOSE · Action */}
      <ArticleLeadMagnet
        variant="bottom"
        source={SOURCE}
        copy={{
          headline: "Send me your URL. I’ll tell you what Google is dropping.",
          sub: "Two fields. A written diagnosis of your indexing, crawl waste and Core Web Vitals — from me, within 24 hours.",
        }}
      />
    </main>
  );
}
