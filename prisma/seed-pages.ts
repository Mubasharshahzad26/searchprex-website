/**
 * prisma/seed-pages.ts — one `Page` row per public route.
 *
 * Run with:  npm run seed:pages             (create missing rows only)
 *            npm run seed:pages -- --force   (also overwrite title/description/robots)
 *
 * Why the values below look hand-written: they ARE the site's current live
 * metadata, lifted verbatim from each page's `export const metadata` via
 * scripts/extract-metadata.mjs. Seeding the real values means switching a page
 * over to getPageSEO() is a no-op for Google on day one — the CMS takes over
 * without changing a single tag. The ten routes that never had any metadata got
 * a title and description written from their own on-page H1 and intro copy, so
 * they describe what the page actually says rather than being invented.
 *
 * Re-running is safe. The upsert's `update` branch is empty unless you pass
 * --force, so a second run will never clobber edits made in the admin panel.
 *
 * Deliberately NOT seeded:
 *   /locations/kansas — app/locations/kansas/page.tsx is a stray copy of the
 *     [city] route and always calls notFound(). Seeding it would put a 404 in
 *     the CMS and, through it, in the sitemap.
 *   /dashboard/*, /admin/*, /login, /register, /studio — non-indexable.
 *   /blog/[slug], /case-studies/[industry]/[client] — dynamic; the sitemap
 *     sources these from app/blog/data.ts and app/all-case-studies/data.ts
 *     until Phase 4 gives the blog its own model.
 *
 * Social fields (ogTitle, twitterDescription, …) are left null on purpose:
 * getPageSEO() already falls back ogTitle → title and ogDescription →
 * metaDescription, so a null here renders correct tags AND shows an empty,
 * clearly-inherited input in the admin form. Filling them in would freeze
 * today's values and hide that inheritance.
 *
 * schemaType/schemaData are null for the same reason. Every page that has
 * JSON-LD today hardcodes it in its own component; a null means getPageSchema()
 * returns nothing and those blocks keep rendering untouched.
 */
import { db } from "../lib/db";

type Seed = {
  slug: string;
  title: string;
  metaDescription: string;
  /** Defaults to "index, follow". */
  robots?: string;
  /** Short note on why a row deviates from the defaults. Not persisted. */
  note?: string;
};

const DEFAULT_ROBOTS = "index, follow";

const PAGES: Seed[] = [
  // ── Core marketing ──────────────────────────────────────────────────────
  {
    slug: "/",
    title: "SEO Agency USA | Law Firm & Ecommerce SEO and Local SEO | SearchPrex",
    metaDescription:
      "SearchPrex is a US-Focused SEO agency specializing in law firm SEO, Shopify ecommerce SEO, and local SEO for small businesses.",
  },
  {
    slug: "/about",
    title: "About SearchPrex — Founder-Led USA SEO Agency | Niche-Focused Strategies",
    metaDescription:
      "Meet Mubashar Shahzad, founder of SearchPrex. 5+ years of senior-led SEO for law firms, ecommerce, and local businesses. Founder-executed, algorithm-proof strategies. No juniors, no fluff.",
  },
  {
    slug: "/experts",
    title: "Meet Our Experts - SearchPrex SEO Team",
    metaDescription:
      "Meet Mubashar Shahzad, founder of SearchPrex. A senior SEO strategist with 5+ years of experience helping law firms, ecommerce stores, and local businesses dominate search.",
  },
  {
    slug: "/why-us",
    title: "Why Choose SearchPrex - USA SEO Agency Benefits",
    metaDescription:
      "Discover why 20+ businesses trust SearchPrex for their SEO needs. Founder-led execution, senior strategy, transparent pricing, and real results.",
  },

  // ── Services ────────────────────────────────────────────────────────────
  {
    slug: "/services",
    title: "SEO Services — Law Firm, Ecommerce, Local & Technical SEO | SearchPrex",
    metaDescription:
      "Four core SEO services backed by verified Google Search Console results: law firm SEO, ecommerce & Shopify SEO, local SEO, and technical SEO. Founder-led, proof-first.",
  },
  {
    slug: "/services/law-firm-seo",
    title: "Law Firm SEO Services | Rank in Local Pack & AI Overviews | SearchPrex",
    metaDescription:
      "Founder-led SEO for law firms. Attorney E-E-A-T content, practice area pages, local pack rankings, and AI Overview citations — replace expensive Google Ads with organic cases.",
  },
  {
    slug: "/services/ecommerce-seo",
    title: "Ecommerce SEO Services — Fix Indexing & Grow Revenue | SearchPrex",
    metaDescription:
      "Founder-led ecommerce SEO for Shopify and WooCommerce stores. We fix mass non-indexing, thin content, and Core Web Vitals — then build organic revenue that compounds. See how we grew SMK Store's US revenue by 75% in 2 months.",
  },
  {
    slug: "/services/local-seo",
    title: "Local SEO Services | Own the Map Pack & AI Overviews | SearchPrex",
    metaDescription:
      "Founder-led local SEO that puts your business in the top 3 Google Maps pack and 2026 AI Overviews. GBP optimization, citations, review velocity, and city-level landing pages.",
  },
  {
    slug: "/services/technical-seo",
    title: "Technical SEO Services | Indexation, Core Web Vitals, Schema | SearchPrex",
    metaDescription:
      "Founder-led technical SEO for large sites. Crawl budget recovery, indexation fixes, Core Web Vitals (LCP/INP/CLS), schema markup, and site architecture — proven at 12K+ page scale.",
  },

  // ── Proof ───────────────────────────────────────────────────────────────
  {
    slug: "/case-studies",
    // No metadata existed. Written from the page's H1 ("Case Studies"), eyebrow
    // ("Verified Results · Real GSC Data") and sub-heading.
    title: "SEO Case Studies — Verified GSC Results | SearchPrex",
    metaDescription:
      "Real SEO results from real clients — most backed by live Google Search Console screen recordings. No vanity metrics, just clicks, rankings, leads, and revenue.",
  },
  {
    slug: "/all-case-studies",
    title: "SEO Case Studies — Verified Results | SearchPrex",
    metaDescription:
      "Browse SearchPrex SEO case studies with real GSC data. Law firm, ecommerce, local & technical SEO results. Filter by niche. Founder-led, transparent results.",
  },

  // ── Content ─────────────────────────────────────────────────────────────
  {
    slug: "/blog",
    title: "SEO Blog — Technical, Ecommerce & Local SEO Guides | SearchPrex",
    metaDescription:
      "Founder-written SEO guides on technical SEO, e-commerce SEO, local SEO and content strategy — crawl budget, indexing recovery, Core Web Vitals, AI Overviews and more. Built for practitioners.",
  },
  {
    slug: "/resources",
    title: "SEO Resources & Guides — White Papers, Research, News | SearchPrex",
    metaDescription:
      "Free SEO resources from SearchPrex: white papers, original research, real-world learnings, and curated industry news. Founded on real client work, not generic theory.",
  },
  {
    slug: "/resources/news",
    // No metadata existed. Written from the H1 ("SEO & Google Update News") and
    // the page's own standfirst.
    title: "SEO & Google Update News — Core Updates Explained | SearchPrex",
    metaDescription:
      "Google algorithm and SEO news, updated as it breaks. Plain-English summaries of core updates, AI Overviews changes and ranking volatility — with a link to every original source.",
  },
  {
    slug: "/faq",
    // No metadata existed. Written from the H1 ("SEO Questions, Answered").
    title: "SEO Questions, Answered — Core Updates, E-E-A-T & AI | SearchPrex",
    metaDescription:
      "Everything you need to know about SEO in the AI-search era — built around Google's March and May 2026 core updates, E-E-A-T, and AI Overviews. Straight answers, no jargon.",
  },

  // ── Lead capture ────────────────────────────────────────────────────────
  {
    slug: "/free-audit",
    // No metadata existed. Written from the H1 ("Claim Your Free SEO Audit").
    title: "Free SEO Audit — Reviewed by the Founder in 24 Hours | SearchPrex",
    metaDescription:
      "Claim your free SEO audit. A real audit by the founder, not an automated tool report — with a 24-hour turnaround guarantee and no obligation.",
  },
  {
    slug: "/growth-plan",
    title: "Get Your SEO Growth Plan | Free 90-Day Roadmap | SearchPrex",
    metaDescription:
      "Get a founder-reviewed SEO growth plan in 5 minutes. Site audit, competitor benchmark, and 90-day action roadmap — delivered within 24 hours. No commitment, no credit card.",
  },
  {
    slug: "/action-plan",
    title: "Free SEO Audit — Get Your 90-Day Roadmap | SearchPrex",
    metaDescription:
      "Get a free, founder-reviewed SEO audit tailored to Google's 2026 updates. We analyze your technical health, content quality, E-E-A-T signals and competitor gaps — delivered in 48 hours, no obligation.",
  },

  // ── Tools ───────────────────────────────────────────────────────────────
  {
    slug: "/tools",
    title: "Free SEO Tools — Schema Generator, SERP Simulator & More | SearchPrex",
    metaDescription:
      "Free SEO tools built by a practicing SEO analyst: JSON-LD schema markup generator, SERP simulator, meta tag analyzer, robots.txt tester and more. No signup, no paywalls.",
  },
  {
    slug: "/tools/schema-generator",
    // No metadata existed; the page itself is a 4-line stub with only an <h1>.
    title: "Free JSON-LD Schema Markup Generator | SearchPrex",
    metaDescription:
      "Generate valid JSON-LD schema markup for your pages — Organization, FAQ, Article, LocalBusiness and more. Free, instant, no signup required.",
  },
  {
    slug: "/ai-search",
    title: "Free AI SEO Audit Tool | Instant Website Analysis for US Businesses | SearchPrex",
    metaDescription:
      "Free AI-powered SEO audit tool for US businesses. Get an instant website analysis, a personalized 90-day SEO roadmap, or book a free consultation — no login, no credit card, results in seconds.",
  },
  {
    slug: "/ai-visibility",
    title: "AI Visibility Checker for Law Firms — SearchPrex",
    metaDescription:
      "See if your law firm shows up when potential clients ask AI (ChatGPT, Perplexity, Google AI Overviews) for the best lawyers in your city. Free instant check.",
  },
  {
    slug: "/law-firm-scorecard",
    title: "Free Law Firm SEO Scorecard | Grade Your Firm's Google & AI Visibility | SearchPrex",
    metaDescription:
      "Free law firm SEO scorecard — grade your Map Pack ranking, organic visibility, AI Overview citations (AEO), legal E-E-A-T, schema, and practice-area content in seconds. Prioritized 90-day fix plan included. Built for US attorneys.",
  },
  {
    slug: "/case-calculator",
    title: "Personal Injury Lost Case Calculator — SearchPrex",
    metaDescription:
      "See how much revenue your personal injury firm is leaking from SEO visibility gaps and slow client intake. Free, instant estimate based on real local search demand.",
  },
  {
    slug: "/intake-assistant",
    title: "24/7 AI Intake Assistant for Law Firms | Never Miss a Lead | SearchPrex",
    metaDescription:
      "AI intake assistant that captures and qualifies every law firm lead 24/7 — no missed calls, no lost cases. Try the free live demo built for US law firms.",
  },
  {
    slug: "/content-generator",
    title: "AI Content Suite — Searchprex",
    metaDescription:
      "Generate original, E-E-A-T-driven, HCU-compliant SEO content at scale — meta, headings, full HTML body, FAQs, links, and JSON-LD schema.",
  },
  {
    slug: "/bulk-generation",
    title: "Bulk Content Generator — Searchprex",
    // The page had a title but no description at all.
    metaDescription:
      "Generate SEO content in bulk — briefs, meta tags, headings and full article bodies across hundreds of keywords in a single run.",
  },

  // ── Product ─────────────────────────────────────────────────────────────
  {
    slug: "/tool",
    title: "NicheSEOPro - SEO Tool for Law Firms & Ecommerce | Free Trial",
    metaDescription:
      "NicheSEOPro is the SEO tool built specifically for law firms, ecommerce stores, and local businesses. Get a 14-day free trial with no credit card required.",
  },
  {
    slug: "/nicheseopro",
    // No metadata existed, and the page renders no <h1> in its success path —
    // it is a server wrapper around <KeywordTool>. Written from what the tool does.
    title: "NicheSEOPro Keyword Research Tool | Free Live Demo | SearchPrex",
    metaDescription:
      "Try NicheSEOPro's keyword research live — search volume, difficulty and intent for any US niche. Built for law firms, ecommerce stores and local businesses. No signup to try.",
  },

  // ── Pricing ─────────────────────────────────────────────────────────────
  {
    slug: "/pricing",
    title: "SEO Pricing Plans - SearchPrex USA SEO Agency",
    metaDescription:
      "Transparent SEO pricing for law firms, ecommerce stores, and local businesses. Starting at $1,500/month. No long-term contracts. 90-day money-back guarantee.",
  },
  {
    slug: "/pricing-plan",
    // No metadata existed. This page is thin and overlaps /pricing heavily —
    // see the note printed at the end of this script.
    title: "SEO Pricing — Custom Quotes by Scope | SearchPrex",
    metaDescription:
      "Ongoing SEO management for law firms, ecommerce, and local businesses. Simple, transparent pricing with no hidden fees — pricing depends on scope, so book a call for a custom quote.",
  },

  // ── Locations ───────────────────────────────────────────────────────────
  {
    slug: "/locations/kansas/wichita",
    title: "Wichita Law Firm SEO Services | SearchPrex",
    metaDescription:
      "Local SEO for Wichita law firms. Rank in the Google map pack for your practice area in Sedgwick County. Free audit, no commitment, reply in 24 hrs.",
  },

  // ── Legal ───────────────────────────────────────────────────────────────
  {
    slug: "/privacy",
    title: "Privacy Policy - SearchPrex",
    metaDescription:
      "SearchPrex privacy policy. Learn how we collect, use, and protect your personal information.",
  },
  {
    slug: "/terms",
    title: "Terms and Conditions - SearchPrex",
    metaDescription:
      "SearchPrex terms and conditions. Read our service agreement, payment terms, and policies.",
  },
  {
    slug: "/refund",
    // No metadata existed. Written from the page's own policy text.
    title: "Refund Policy - SearchPrex",
    metaDescription:
      "SearchPrex refund policy. Audit reports are delivered digitally within 24 hours and are non-refundable; NicheSEOPro subscription terms are shown at checkout. Payments are processed by Paddle.",
  },

  // ── Non-indexable, but seeded so they are editable in the admin ──────────
  {
    slug: "/autopilot",
    // Not a marketing page: it renders a signed-in client's own dashboard
    // (selectedClientName, run history). noindex keeps it out of search results
    // AND out of the sitemap — app/sitemap.ts drops any noindex CMS row.
    title: "SEO Autopilot — SearchPrex",
    metaDescription:
      "Automated SEO content generation and publishing for SearchPrex clients.",
    robots: "noindex, nofollow",
    note: "client dashboard, not a marketing page",
  },
  {
    slug: "/coming-soon",
    // A holding page whose waitlist form is still a stub (no endpoint wired).
    // Already absent from app/sitemap.ts; noindex makes that explicit.
    title: "Coming Soon — New SEO Tools | SearchPrex",
    metaDescription:
      "AI content audit, multi-agent SEO, content rewriter, internal linking, GSC submission and white-label reports — launching soon from SearchPrex.",
    robots: "noindex, follow",
    note: "holding page; waitlist form is not wired to an endpoint yet",
  },
];

async function main() {
  const force = process.argv.includes("--force");

  const slugs = PAGES.map((page) => page.slug);
  const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);
  if (duplicates.length > 0) {
    // `slug` is @unique, so a duplicate here would make the run's result depend
    // on array order. Fail loudly instead of silently seeding the last one.
    throw new Error(`Duplicate slugs in PAGES: ${[...new Set(duplicates)].join(", ")}`);
  }

  console.log(`Seeding ${PAGES.length} pages${force ? " (--force: overwriting existing rows)" : ""}…`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const page of PAGES) {
    const data = {
      slug: page.slug,
      title: page.title,
      metaDescription: page.metaDescription,
      robots: page.robots ?? DEFAULT_ROBOTS,
      status: "published",
    };

    const existing = await db.page.findUnique({
      where: { slug: page.slug },
      select: { id: true },
    });

    await db.page.upsert({
      where: { slug: page.slug },
      create: data,
      // Empty by default: a re-run must never overwrite edits made in the admin
      // panel. --force is the explicit opt-in to re-import from this file.
      update: force
        ? {
            title: data.title,
            metaDescription: data.metaDescription,
            robots: data.robots,
          }
        : {},
    });

    if (!existing) {
      created += 1;
      console.log(`  + ${page.slug}`);
    } else if (force) {
      updated += 1;
      console.log(`  ~ ${page.slug}`);
    } else {
      skipped += 1;
    }
  }

  console.log(`\nDone. ${created} created, ${updated} updated, ${skipped} left untouched.`);

  const notable = PAGES.filter((page) => page.note);
  if (notable.length > 0) {
    console.log("\nSeeded as noindex — flip these in /admin/pages if that's wrong:");
    for (const page of notable) console.log(`  ${page.slug} — ${page.note}`);
  }

  console.log(
    "\nNote: /pricing-plan overlaps /pricing (its own copy says \"Subscription plans\n" +
      "launching soon\" and lists no plans). It is seeded as indexable, but consider\n" +
      "either setting its canonical URL to /pricing or marking it noindex in the admin\n" +
      "panel to avoid competing with /pricing in search results."
  );
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
