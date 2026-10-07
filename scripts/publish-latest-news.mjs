import { config } from "dotenv";
config({ path: ".env.local" });
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const newsItem = {
    title: "Google Search Expands AI Overview Source Cards with Direct Product Checkout Badges",
    tag: "AI Search",
    newsDate: new Date("2026-10-08T04:00:00Z"),
    summary:
      "Google has expanded AI Overview source cards to display real-time merchant listing badges, delivery estimates, and direct checkout pills for commercial and product comparison searches across the United States. E-commerce stores with fully validated Product, OfferShippingDetails, and MerchantReturnPolicy JSON-LD schema are given prominent multi-card placement within the generative panel, allowing consumers to verify stock status and pricing before visiting the site.",
    sourceLabel: "Search Engine Roundtable",
    sourceHref: "https://www.seroundtable.com/google-ai-overviews-checkout-badges-42195.html",
    published: true,
  };

  const existing = await db.marketingNews.findFirst({
    where: { title: newsItem.title },
  });

  if (existing) {
    await db.marketingNews.update({
      where: { id: existing.id },
      data: newsItem,
    });
    console.log("Updated news item:", newsItem.title);
  } else {
    await db.marketingNews.create({
      data: newsItem,
    });
    console.log("Created news item:", newsItem.title);
  }

  const latest = await db.marketingNews.findMany({
    orderBy: { newsDate: "desc" },
    take: 3,
  });
  console.log("\nCurrent top 3 news in DB:");
  for (const n of latest) {
    console.log(n.newsDate.toISOString().slice(0, 10), "|", n.tag, "|", n.title);
  }
}

main().catch(console.error).finally(() => process.exit(0));
