import { db } from "../lib/db";
import { lawFirmGoogleMapsRankingContent as content } from "../app/blog/law-firm-google-maps-ranking-content";

const slug = "law-firm-google-maps-ranking";
const title = "Law Firm Google Maps Ranking: How to Rank in the Maps Pack (2026)";
const metaTitle = "Law Firm Google Maps Ranking: Maps Pack Guide (2026)";
const metaDescription = "Learn how law firms can improve Google Maps visibility with an eligible Business Profile, accurate categories, genuine reviews, useful location pages, and a practical 90-day plan.";
const canonicalUrl = `https://www.searchprex.com/blog/${slug}`;
const coverImage = "/images/blog/covers/law-firm-google-maps-ranking.svg";

async function main() {
  const existing = await db.marketingBlog.findUnique({ where: { slug } });
  if (existing?.published) {
    throw new Error(`Refusing to replace an already-published post: ${slug}`);
  }

  const post = await db.marketingBlog.upsert({
    where: { slug },
    create: {
      slug,
      title,
      metaTitle,
      metaDescription,
      canonicalUrl,
      schemaType: "BlogPosting",
      ogTitle: metaTitle,
      ogDescription: metaDescription,
      twitterTitle: metaTitle,
      twitterDescription: metaDescription,
      content,
      coverImage,
      author: "Mubashar Sharif",
      excerpt: "A practical 2026 guide to law firm Google Maps ranking: Business Profile eligibility, categories, genuine reviews, local pages, prominence, and measurement.",
      category: "Local SEO",
      readTime: "12-minute read",
      published: true,
      publishedAt: new Date("2026-11-01T00:00:00.000Z"),
    },
    update: {
      title,
      metaTitle,
      metaDescription,
      canonicalUrl,
      schemaType: "BlogPosting",
      ogTitle: metaTitle,
      ogDescription: metaDescription,
      twitterTitle: metaTitle,
      twitterDescription: metaDescription,
      content,
      coverImage,
      author: "Mubashar Sharif",
      excerpt: "A practical 2026 guide to law firm Google Maps ranking: Business Profile eligibility, categories, genuine reviews, local pages, prominence, and measurement.",
      category: "Local SEO",
      readTime: "12-minute read",
      published: true,
      publishedAt: new Date("2026-11-01T00:00:00.000Z"),
    },
  });

  console.log(JSON.stringify({ slug: post.slug, published: post.published, canonicalUrl: post.canonicalUrl }, null, 2));
}

main().catch((error) => {
  console.error("Failed to publish law firm Maps article:", error);
  process.exitCode = 1;
}).finally(async () => {
  await db.$disconnect();
});

