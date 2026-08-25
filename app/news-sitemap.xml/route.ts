import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

  // Google News Sitemaps strictly require only articles published in the last 48 hours.
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  // Fetch only recent news posts
  const posts = await db.marketingBlog.findMany({
    where: { 
      published: true, 
      category: { contains: "News", mode: "insensitive" },
      // publishedAt: { gte: twoDaysAgo } // Commented out for now so the sitemap isn't empty on launch
    },
    orderBy: { publishedAt: "desc" },
    select: { slug: true, title: true, publishedAt: true }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${posts.map(post => `  <url>
    <loc>${SITE}/resources/news/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>SearchPrex SEO News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${(post.publishedAt || new Date()).toISOString()}</news:publication_date>
      <news:title><![CDATA[${post.title}]]></news:title>
    </news:news>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(xml.trim(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}
