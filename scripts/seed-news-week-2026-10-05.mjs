/**
 * SEO news for the week of September 28 – October 5, 2026.
 *
 * Adds these items to the /resources/news "Live Algorithm Tracker" feed
 * (MarketingNews) only. Unlike seed-seo-news.mjs it does not touch the
 * deep-dive spokes, so running it cannot overwrite edits made in the admin.
 * Upserts on title: run again to update in place.
 *
 * Every claim is dated and carries a source link.
 *
 *   node scripts/seed-news-week-2026-10-05.mjs
 */
import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const NEWS = [
  {
    title: "Google Now Says to Fact-Check All AI Content Before Publishing",
    tag: "AI Content",
    newsDate: new Date("2026-10-01T12:00:00Z"),
    summary:
      "On October 1 Google revised its guide to using generative AI content, with a changelog entry that reads: \"Updated the using generative AI content guide with information from the Search Quality Raters guidelines.\" The page now says generative models predict words rather than retrieve facts, that their output can contain hallucinations, and that manual fact-checking of all AI-generated content before publishing is critical — including title elements, meta descriptions, structured data and image alt text. It points to the rater guidelines' sections on scaled content abuse and on content made with little effort, originality or added value. For anyone generating product descriptions or location pages at scale, the practical read is that the review step is now part of Google's own written guidance, not an optional extra.",
    sourceLabel: "PPC Land",
    sourceHref: "https://ppc.land/google-tells-sites-to-manually-factcheck-all-ai-content-before-publishing/",
  },
  {
    title: "September 2026 Spam Update: A Second Wave Hits on September 30",
    tag: "Spam Update",
    newsDate: new Date("2026-09-30T12:00:00Z"),
    summary:
      "Google's fourth spam update of 2026 began on September 24 and, unlike March, June and August — each done in under three days — Google said this one may take up to two weeks to roll out. Site owners reported a first wave of drops on September 25–27 and a second on September 30, when volatility trackers including Mozcast, Wincher and Semrush also spiked. Google has not announced a separate update or named the techniques it targets, so a drop in this window should be checked against the spam policies, and no conclusions drawn until Google marks the rollout complete.",
    sourceLabel: "Search Engine Roundtable",
    sourceHref: "https://www.seroundtable.com/google-september-2026-spam-update-two-42209.html",
  },
  {
    title: "Google Tests Paying Publishers When Their Content Shapes AI Answers",
    tag: "AI Search",
    newsDate: new Date("2026-09-30T16:00:00Z"),
    summary:
      "Google has started an \"AI contribution\" pilot, run inside Search Console, that pays invited publishers when their pages contribute significantly to a response in AI Overviews, AI Mode or the Gemini app. Being cited or linked in an AI answer does not by itself qualify. Participants accept program terms in Search Console and see a monthly earnings figure there; reports put the pilot at about 100 publishers. Google has not published the payment formula or eligibility rules, so for now it is a signal of direction rather than something most sites can apply for.",
    sourceLabel: "Search Engine Journal",
    sourceHref: "https://www.searchenginejournal.com/google-tests-paying-publishers-for-ai-answers-via-search-console/589414/",
  },
  {
    title: "AI Mode Info Monitoring Rolls Out to Everyone — Including Price-Drop Alerts",
    tag: "Ecommerce",
    newsDate: new Date("2026-09-28T12:00:00Z"),
    summary:
      "Google's VP of Product for Search, Robby Stein, announced on September 28 that info monitoring in AI Mode, previously limited to Pro and Ultra subscribers, is rolling out to everyone globally. Users tell AI Mode what to watch and Search keeps checking sites, forums and Google's Shopping Graph, then sends an update — Google's own examples include back-in-stock and price-drop alerts. For stores, accurate price and availability in product structured data and Merchant Center feeds now decides whether a returning shopper is told about your offer.",
    sourceLabel: "Search Engine Watch",
    sourceHref: "https://searchenginewatch.com/google-rolls-out-monitoring-capabilities-in-ai-mode-to-everyone/",
  },
  {
    title: "Search Console Adds a Multimodal Filter for Image-Led Searches",
    tag: "Search Console",
    newsDate: new Date("2026-09-24T12:00:00Z"),
    summary:
      "On September 24 Google added a \"multimodal\" option to the Search type filter in Search Console. It covers web results for searches where an image was part of the query — Google Lens, Circle to Search, image uploads to Google Search and Chrome's right-click image search — and appears in both the Performance report and the generative AI report. There is no query data for this traffic, because the search was an image rather than text. Product and local businesses with strong photography can now see how much of their traffic starts from a camera instead of a keyboard.",
    sourceLabel: "Search Engine Journal",
    sourceHref: "https://www.searchenginejournal.com/google-search-console-multimodal-filter/590781/",
  },
];

async function main() {
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
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
