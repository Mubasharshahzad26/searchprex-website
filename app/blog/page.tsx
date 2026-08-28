// app/blog/page.tsx
// Server Component — SEO layer the old client-only blog page was missing:
// metadata + www canonical + OG, Blog + ItemList + BreadcrumbList schema.
// UI lives in BlogClient.
 
import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { posts as hardcodedPosts, mostRead as hardcodedMostRead } from "./data";
import { db } from "@/lib/db";
 
import { getPageSEO } from "@/lib/admin-seo";
const SITE = "https://www.searchprex.com";
 
const baseMetadata: Metadata = {
  title: "SEO Blog — Technical, Ecommerce & Local SEO Guides",
  description:
    "Founder-written SEO guides on technical SEO, e-commerce SEO, local SEO and content strategy — crawl budget, indexing recovery, Core Web Vitals, AI Overviews and more. Built for practitioners.",
  alternates: { canonical: `${SITE}/blog` },
  openGraph: {
    title: "SEO Blog — Technical, Ecommerce & Local SEO Guides | SearchPrex",
    description:
      "Founder-written, practitioner-grade SEO guides: indexing recovery, crawl budget, Core Web Vitals, AI Overviews and more.",
    url: `${SITE}/blog`,
    type: "website",
  },
};
 
// Metadata comes from the CMS row for this route; the object above is the
// fallback when that row is missing, unpublished, or the database is down.
export async function generateMetadata(): Promise<Metadata> {
  return getPageSEO("/blog", baseMetadata);
}
 
export default async function Page() {
  let initialPosts: any[] = [];
  let initialMostRead: any[] = [];

  try {
    /*
     * SEO News lives at /resources/news and is excluded here.
     *
     * This query used to take every published MarketingBlog row. Once the SEO
     * News hub was populated, those were the *only* rows in the table — so the
     * blog index listed eight news articles and linked to none of the actual
     * blog posts, which were left orphaned with no internal links anywhere on
     * the site. BlogClient falls back to the file-based posts only when this
     * array is empty, so a non-empty list of the wrong posts hid them.
     */
    const dbBlogs = await db.marketingBlog.findMany({
      where: {
        published: true,
        NOT: { category: { contains: "SEO News", mode: "insensitive" } },
      },
      orderBy: { publishedAt: "desc" },
    });

    if (dbBlogs && dbBlogs.length > 0) {
      initialPosts = dbBlogs.map(b => ({
        slug: b.slug,
        category: b.category || "General",
        subcategory: "",
        title: b.title,
        excerpt: b.excerpt || b.metaDescription || "",
        readTime: b.readTime || "5-minute read",
        date: b.publishedAt ? b.publishedAt.toISOString().split('T')[0] : b.createdAt.toISOString().split('T')[0],
        author: { name: b.author || "SearchPrex Team", role: "Verified SEO Expert" },
        authorBio: "",
        featured: false,
        heroImage: b.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
        tags: [],
        stat: { value: "", label: "" },
        toc: [],
        content: b.content || ""
      }));

    }
  } catch (err) {
    console.error("Failed to load DB blogs for blog index", err);
  }

  /*
   * The CMS and the file-based posts are both real sources for this index, so
   * they are merged rather than one replacing the other. A CMS row wins on slug
   * collision, since that is the one an editor can actually update.
   */
  const dbSlugs = new Set(initialPosts.map((p) => p.slug));
  initialPosts = [...initialPosts, ...hardcodedPosts.filter((p) => !dbSlugs.has(p.slug))].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (initialPosts.length > 0) initialPosts[0].featured = true;
  initialMostRead = initialPosts.slice(0, 3).map((p, i) => ({ ...p, rank: i + 1 }));

  const schemaPosts = initialPosts;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
    ],
  };
 
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE}/blog#blog`,
    name: "SearchPrex SEO Blog",
    url: `${SITE}/blog`,
    description: "Founder-written SEO guides for practitioners.",
    publisher: { "@type": "Organization", name: "SearchPrex", url: SITE },
    blogPost: schemaPosts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE}/blog/${p.slug}`,
      author: { "@type": "Person", name: p.author.name },
      description: p.excerpt,
    })),
  };
 
  return (
    <>
      {[breadcrumbSchema, blogSchema].map((schema, i) => (
        <script key={i} type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <BlogClient initialPosts={initialPosts} initialMostRead={initialMostRead} />
    </>
  );
}