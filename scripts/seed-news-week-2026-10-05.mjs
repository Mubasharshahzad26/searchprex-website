/**
 * SEO news for the week of September 28 – October 5, 2026.
 *
 * Adds these items to the /resources/news "Live Algorithm Tracker" feed
 * (MarketingNews) only. Unlike seed-seo-news.mjs it does not touch the
 * deep-dive spokes, so running it cannot overwrite edits made in the admin.
 * Upserts on title: run again to update in place.
 *
 * Every claim is dated and carries a source link. Google's Oct 1 AI-content
 * fact-checking guidance is not here: it was already published on the site.
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
