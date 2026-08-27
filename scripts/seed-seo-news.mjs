/**
 * Seeds the SEO News hub-and-spoke with sourced, dated content.
 *
 * Two content types feed /resources/news:
 *   - MarketingNews   -> the "Live Algorithm Tracker" feed on the hub
 *   - MarketingBlog   -> the deep-dive spokes, filtered by `category`
 *
 * Category naming matters. The hub queries `category contains "SEO News"` and
 * each subnav item queries `category contains "AI SEO"` / "LLMs" / "Tools" /
 * "Ecommerce" / "Technical". Storing "SEO News — AI SEO" satisfies both, so a
 * spoke shows on the hub AND on its subcategory page. A bare "SEO News"
 * category (what every row used to have) matches the hub only, which is why the
 * subnav pages rendered with no deep-dives at all.
 *
 * Every factual claim below is dated and carries a source link. Run again to
 * update in place -- news is upserted on title, spokes on slug.
 *
 *   node scripts/seed-seo-news.mjs
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const AUTHOR = "Mubashar Shahzad";

// Only Unsplash IDs already proven to resolve on this site are reused here; an
// invented photo ID renders as a broken hero image.
const IMG = {
  analytics: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  local: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  charts: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
};

/* ────────────────────────────── NEWS FEED ────────────────────────────── */

const NEWS = [
  {
    title: "August 2026 Spam Update Finishes in Under Three Days",
    tag: "Spam Update",
    newsDate: new Date("2026-08-21T12:00:00Z"),
    summary:
      "Google's third spam update of 2026 started on August 18 and was marked complete on August 21 — roughly two days and 16 hours, applied globally and across all languages. Google published no list of the techniques it targeted. The practical read: a site that lost visibility here is being judged against the spam policies, not against core-update quality signals, so recovery means finding and removing the actual policy violation rather than broadly \"improving content\".",
    sourceLabel: "Search Engine Land",
    sourceHref:
      "https://searchengineland.com/google-august-2026-spam-update-done-rolling-out-485471",
  },
  {
    title: "Search Console Platform Properties Open Up to Everyone",
    tag: "Search Console",
    newsDate: new Date("2026-07-29T12:00:00Z"),
    summary:
      "Introduced on July 7 and available to all Search Console users from July 29, platform properties let you connect Instagram, TikTok, X and YouTube accounts and see how those posts perform in Google Search, Discover and News. You get Performance (clicks, impressions, queries), Insights (trends and top posts) and Achievements (28-day milestones). Notably it works for creators with no website at all — the first time Search Console has served people who don't own a domain.",
    sourceLabel: "Google Search Central Blog",
    sourceHref:
      "https://developers.google.com/search/blog/2026/07/search-console-social-video-platforms",
  },
  {
    title: "Google Releases the June 2026 Spam Update",
    tag: "Spam Update",
    newsDate: new Date("2026-06-24T16:00:00Z"),
    summary:
      "Google announced the June 2026 spam update at around noon ET on June 24, applying globally and to all languages, and said the rollout would take a few days to complete. It was the second of three spam updates Google has confirmed so far in 2026, following March and preceding August — a noticeably higher cadence than the one or two spam updates per year site owners had grown used to.",
    sourceLabel: "Search Engine Land",
    sourceHref: "https://searchengineland.com/google-releases-june-2026-spam-update-481002",
  },
  {
    title: "Search Console Adds Generative AI Reports — Impressions Only, No Clicks",
    tag: "Search Console",
    newsDate: new Date("2026-06-03T12:00:00Z"),
    summary:
      "On June 3 Google introduced Search Generative AI performance reports in Search Console, covering AI Overviews, AI Mode and AI features in Discover, broken out by page, country, device and date. Two limits matter: there are no clicks, no CTR and no query data in this version, and data only begins on May 18, 2026 with no historical backfill. It shipped first to a subset of UK sites alongside a new control letting owners keep their content out of generative AI features — which Google states is not used as a ranking signal outside those features.",
    sourceLabel: "Google Search Central Blog",
    sourceHref:
      "https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports",
  },
  {
    title: "May 2026 Core Update Completes After 12 Days",
    tag: "Core Update",
    newsDate: new Date("2026-06-02T12:00:00Z"),
    summary:
      "The second broad core update of 2026 began on May 21 and was confirmed complete on June 2. The sharpest movement landed on May 23 — just two days in — with a second spike around May 30, so sites that judged their position in the first 48 hours were reading an incomplete rollout. Google's standing guidance held: there is no fix for a core update, and the largest recoveries tend to arrive with the next core update rather than between them.",
    sourceLabel: "Search Engine Land",
    sourceHref:
      "https://searchengineland.com/google-may-2026-core-update-rollout-is-now-complete-479119",
  },
  {
    title: "I/O 2026: AI Overviews Hits 2.5B Users, AI Mode Reaches 1B",
    tag: "AI Search",
    newsDate: new Date("2026-05-20T12:00:00Z"),
    summary:
      "At I/O 2026 Google put numbers on AI search: AI Overviews now reaches more than 2.5 billion monthly users and AI Mode has passed 1 billion, with AI Mode queries more than doubling every quarter since launch. Gemini 3.5 Flash became the default model in AI Mode globally, and Google merged AI Overviews and AI Mode into a single continuous AI Search experience, live worldwide on desktop and mobile. Being cited inside the answer is now its own visibility channel, separate from the blue link.",
    sourceLabel: "Google Blog",
    sourceHref:
      "https://blog.google/products-and-platforms/products/search/search-io-2026/",
  },
  {
    title: "FAQ Rich Results Removed From Google Search",
    tag: "Structured Data",
    newsDate: new Date("2026-05-07T12:00:00Z"),
    summary:
      "FAQ rich results stopped appearing in Google Search on May 7, 2026 — announced only as a note on the FAQ structured data documentation, with no blog post and no stated reason. The Search Console appearance filter, the FAQ rich result report and Rich Results Test support were removed in June; the Search Console API drops FAQ data in August. Existing FAQPage markup is still valid schema.org and causes no harm, but it no longer earns anything in Search, so it should not be a line item in anyone's 2026 SEO plan.",
    sourceLabel: "Search Engine Land",
    sourceHref:
      "https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957",
  },
  {
    title: "March 2026 Core Update Completes in 12 Days",
    tag: "Core Update",
    newsDate: new Date("2026-04-08T13:12:00Z"),
    summary:
      "The first broad core update of 2026 ran from March 27 to April 8 — 12 days and 4 hours. Like the May update that followed, both the announcement and the completion notice came only through the Search Status Dashboard and Search Central's social accounts, with no accompanying blog post. That is now the normal communication pattern, and it means the dashboard, not the Search Central blog, is the authoritative place to confirm whether a rollout is actually finished.",
    sourceLabel: "Search Engine Land",
    sourceHref:
      "https://searchengineland.com/google-march-2026-core-update-rollout-is-now-complete-473883",
  },
  {
    title: "March 2026 Spam Update Was the Fastest on Record",
    tag: "Spam Update",
    newsDate: new Date("2026-03-25T14:30:00Z"),
    summary:
      "Google released the March 2026 spam update on March 24 at noon PT and marked it complete the following morning at 7:30 AM PT — about 19 and a half hours, the shortest confirmed spam update rollout in the Search Status Dashboard's history. Short rollouts leave no window to react mid-flight: by the time third-party trackers registered the movement, the update had already finished.",
    sourceLabel: "Search Engine Land",
    sourceHref:
      "https://searchengineland.com/google-march-2026-spam-update-done-rolling-out-472455",
  },
  {
    title: "Google's First Discover-Only Core Update Completes",
    tag: "Discover",
    newsDate: new Date("2026-02-27T12:00:00Z"),
    summary:
      "The February 2026 Discover core update ran from February 5 to February 27 — the first confirmed Google update of the year and the first update Google has ever announced that targets Discover alone. Google said it surfaces more locally relevant content from sites based in the user's own country, reduces sensational content and clickbait, and favours more in-depth, original and timely content from sites with demonstrated expertise. It launched for English-language users in the U.S. first, expanding to other countries and languages after.",
    sourceLabel: "Search Engine Land",
    sourceHref:
      "https://searchengineland.com/google-february-2026-discover-core-update-is-now-complete-469450",
  },
  {
    title: "Google Launches Universal Commerce Protocol for Agent-Led Shopping",
    tag: "Ecommerce",
    newsDate: new Date("2026-01-11T12:00:00Z"),
    summary:
      "On January 11 Google introduced the Universal Commerce Protocol (UCP), an open standard giving AI agents a shared language for talking to commerce systems — discovery through checkout through post-purchase support — without custom integrations per agent or platform. It was built with Shopify, Etsy, Wayfair and Target and endorsed by 20+ retail and payments companies, and it powers checkout inside AI Mode in Search and the Gemini app. For ecommerce SEO it moves the centre of gravity toward feed accuracy and structured product data.",
    sourceLabel: "Search Engine Land",
    sourceHref: "https://searchengineland.com/google-universal-commerce-protocol-467290",
  },
];
/* ──────────────────────────── SPOKE ARTICLES ──────────────────────────── */

/*
  Bodies live as Markdown in scripts/seo-news-content/<slug>.md rather than
  inline here. That is the same format the /content-admin editor writes, so an
  article can be edited in the admin without the two formats drifting apart --
  and the files stay diffable in review, which a 9,000-character string literal
  does not.
*/
const CONTENT_DIR = path.join(import.meta.dirname, "seo-news-content");

const readBody = (slug) => {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing article body: ${file}`);
  }
  return fs.readFileSync(file, "utf8").trim();
};

const SPOKES = [
  {
    slug: "google-algorithm-updates",
    category: "SEO News",
    title: "Google Algorithm Updates 2026: Every Confirmed Update, Dated",
    metaTitle: "Google Algorithm Updates 2026: Confirmed Timeline & Dates",
    metaDescription:
      "Every Google algorithm update confirmed in 2026, with exact start and end dates — Discover, core and spam updates — and what each one actually changed.",
    excerpt:
      "Six confirmed updates in eight months. Here is the dated record of what Google actually rolled out in 2026 — and what each one asked of site owners.",
    readTime: "9 min read",
    coverImage: IMG.charts,
  },
  {
    slug: "ai-sge-seo-news",
    category: "SEO News — AI SEO",
    title: "AI SEO News 2026: AI Overviews at 2.5B Users and What Google Now Reports",
    metaTitle: "AI SEO News 2026: AI Overviews, AI Mode & GEO Updates",
    metaDescription:
      "The 2026 AI SEO record: AI Overviews at 2.5B monthly users, AI Mode at 1B, and Search Console's first generative AI reports. Dated, sourced, and what to do.",
    excerpt:
      "Google finally put numbers on AI search and gave site owners data to measure it. Here is what changed in 2026, with dates — and what it means for your visibility.",
    readTime: "8 min read",
    coverImage: IMG.ai,
  },
  {
    slug: "llm-seo-news-2026",
    category: "SEO News — LLMs",
    title: "LLM SEO News 2026: Answer Engines, Citations and What Can Be Measured",
    metaTitle: "LLM SEO News 2026: AEO, Citations & Answer Engine Updates",
    metaDescription:
      "How LLM answer engines changed in 2026 — Gemini 3.5 Flash in AI Mode, Search Console's AI reports, crawler control — and what AEO can honestly be measured on.",
    excerpt:
      "Answer Engine Optimisation is full of confident numbers and thin sourcing. Here is what is actually documented about LLM search in 2026 — and what is still guesswork.",
    readTime: "8 min read",
    coverImage: IMG.ai,
  },
  {
    slug: "seo-tools-news-2026",
    category: "SEO News — Tools",
    title: "SEO Tools News 2026: Every Search Console Change That Landed This Year",
    metaTitle: "SEO Tools News 2026: Search Console Updates & AI Trackers",
    metaDescription:
      "The 2026 SEO tooling record: Search Console's generative AI reports, platform properties for social and video, and the FAQ report removal. Dated and sourced.",
    excerpt:
      "Search Console changed more in 2026 than in the previous three years combined — gaining AI reporting and social data, and losing FAQ. Here is the full record.",
    readTime: "7 min read",
    coverImage: IMG.analytics,
  },
  {
    slug: "ecommerce-seo-news-2026",
    category: "SEO News — Ecommerce",
    title: "Ecommerce SEO News 2026: UCP, Universal Cart and Agentic Checkout",
    metaTitle: "Ecommerce SEO News 2026: UCP, Universal Cart & AI Shopping",
    metaDescription:
      "Google's Universal Commerce Protocol, Universal Cart and agentic checkout in AI Mode — what launched in 2026, when, and what it changes for ecommerce SEO.",
    excerpt:
      "Google spent 2026 building a checkout that happens inside the AI answer. For ecommerce SEO, the product feed is quietly becoming more important than the product page.",
    readTime: "8 min read",
    coverImage: IMG.charts,
  },
  {
    slug: "technical-seo-news-2026",
    category: "SEO News — Technical",
    title: "Technical SEO News 2026: FAQ Rich Results Gone, AI Crawlers, and Crawl Control",
    metaTitle: "Technical SEO News 2026: FAQ Removal & AI Crawler Control",
    metaDescription:
      "The 2026 technical SEO changes that matter: FAQ rich results removed, Search Console API changes, and how to control AI crawlers without losing citations.",
    excerpt:
      "One deprecation broke live dashboards this month, and one robots.txt mistake is quietly removing sites from AI citations. Both are fixable this week.",
    readTime: "8 min read",
    coverImage: IMG.analytics,
  },
  {
    slug: "state-of-seo-2026",
    category: "SEO News",
    title: "The State of SEO in 2026: What Eight Months of Updates Actually Taught Us",
    metaTitle: "State of SEO 2026: Trends Backed by Confirmed Updates",
    metaDescription:
      "A grounded 2026 SEO review built on confirmed updates and Google's own announcements — what changed, what didn't, and where to put your effort.",
    excerpt:
      "Most 2026 trend pieces are predictions. This one is a review: what Google actually shipped between January and August, and what it should change about your plan.",
    readTime: "8 min read",
    coverImage: IMG.charts,
  },
  {
    slug: "local-seo-updates",
    category: "SEO News",
    title: "Local SEO News 2026: What Confirmed Updates Mean for the Map Pack",
    metaTitle: "Local SEO News 2026: Map Pack & Google Business Profile",
    metaDescription:
      "What 2026's confirmed Google updates mean for local rankings and Google Business Profile — separating documented change from local SEO folklore.",
    excerpt:
      "Local SEO attracts more unsourced claims than any other speciality. Here is what the confirmed 2026 updates support — and what is being asserted without evidence.",
    readTime: "7 min read",
    coverImage: IMG.local,
  },
];

/* ────────────────────────────── RUNNER ────────────────────────────── */


async function main() {
  console.log("Seeding SEO News hub-and-spoke...\n");

  console.log("── News feed (MarketingNews) ──");
  for (const item of NEWS) {
    const existing = await db.marketingNews.findFirst({ where: { title: item.title } });
    const data = { ...item, published: true };
    if (existing) {
      await db.marketingNews.update({ where: { id: existing.id }, data });
      console.log(`  updated  ${item.newsDate.toISOString().slice(0, 10)}  ${item.title}`);
    } else {
      await db.marketingNews.create({ data });
      console.log(`  created  ${item.newsDate.toISOString().slice(0, 10)}  ${item.title}`);
    }
  }

  console.log("\n── Deep-dive spokes (MarketingBlog) ──");
  for (const spoke of SPOKES) {
    const content = readBody(spoke.slug);
    const data = {
      ...spoke,
      content,
      author: AUTHOR,
      schemaType: "NewsArticle",
      canonicalUrl: `https://www.searchprex.com/resources/news/${spoke.slug}`,
      ogTitle: spoke.metaTitle,
      ogDescription: spoke.metaDescription,
      twitterTitle: spoke.metaTitle,
      twitterDescription: spoke.metaDescription,
      published: true,
      publishedAt: new Date("2026-08-27T09:00:00Z"),
    };
    await db.marketingBlog.upsert({
      where: { slug: spoke.slug },
      update: data,
      create: data,
    });
    console.log(
      `  upserted [${spoke.category}] ${spoke.slug} (${content.length} chars)`
    );
  }

  console.log("\nDone.");
  await db.$disconnect();
}

main().catch(async (err) => {
  console.error(err);
  await db.$disconnect();
  process.exit(1);
});
