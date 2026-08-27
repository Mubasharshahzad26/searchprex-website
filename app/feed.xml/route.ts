import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";
  
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");

  const filterCat = categoryParam ? categoryParam : "News";

  const posts = await db.marketingBlog.findMany({
    where: { 
      published: true, 
      category: { contains: filterCat, mode: "insensitive" }
    },
    orderBy: { publishedAt: "desc" },
    take: 20, // Max 20 for RSS
    select: { slug: true, title: true, excerpt: true, publishedAt: true }
  });

  const feedTitle = categoryParam ? `SearchPrex ${categoryParam} News` : "SearchPrex SEO News";
  const feedDesc = categoryParam ? `Latest ${categoryParam} news and updates from SearchPrex.` : "Latest SEO News, Google Algorithm Updates, and Digital Marketing insights from SearchPrex.";
  const feedUrl = categoryParam ? `${SITE}/resources/news?category=${encodeURIComponent(categoryParam)}` : `${SITE}/resources/news`;

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${feedTitle}</title>
    <link>${feedUrl}</link>
    <description>${feedDesc}</description>
    <language>en-us</language>
    <atom:link href="${SITE}/feed.xml${categoryParam ? `?category=${encodeURIComponent(categoryParam)}` : ''}" rel="self" type="application/rss+xml" />
${posts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE}/resources/news/${post.slug}</link>
      <guid isPermaLink="true">${SITE}/resources/news/${post.slug}</guid>
      <pubDate>${(post.publishedAt || new Date()).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ""}]]></description>
    </item>`).join("\n")}
  </channel>
</rss>`;

  return new NextResponse(rss.trim(), {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
