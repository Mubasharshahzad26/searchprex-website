import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "@/app/blog/[slug]/PostClient";
import { db } from "@/lib/db";

const SITE = "https://www.searchprex.com";

// Helper to get post from DB
async function getPostData(rawSlug: string) {
  const slug = decodeURIComponent(rawSlug);
  try {
    // Only fetch blogs that are under the SEO News category
    const dbPost = await db.marketingBlog.findUnique({ where: { slug } });
    if (dbPost && dbPost.category && dbPost.category.toLowerCase().includes("seo news")) {
      return {
        slug: dbPost.slug,
        category: dbPost.category || "SEO News",
        subcategory: "",
        title: dbPost.title,
        excerpt: dbPost.excerpt || dbPost.metaDescription || "",
        readTime: dbPost.readTime || "7-minute read",
        date: dbPost.publishedAt ? dbPost.publishedAt.toISOString().split("T")[0] : dbPost.createdAt.toISOString().split("T")[0],
        author: { name: dbPost.author || "SearchPrex Team", role: "Verified SEO Expert" },
        authorBio: "Dedicated to tracking and decoding the latest Google algorithm updates and SEO trends.",
        featured: false,
        heroImage: dbPost.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
        tags: [],
        stat: { value: "", label: "" },
        toc: [],
        content: dbPost.content || "",
        
        // Advanced SEO Fields
        canonicalUrl: dbPost.canonicalUrl || "",
        schemaType: dbPost.schemaType || "NewsArticle",
        ogTitle: dbPost.ogTitle || "",
        ogDescription: dbPost.ogDescription || "",
        twitterTitle: dbPost.twitterTitle || "",
        twitterDescription: dbPost.twitterDescription || ""
      };
    }
  } catch (err) {
    console.error("Failed to fetch DB post for news spoke:", slug, err);
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return { title: "News not found", robots: { index: false, follow: true } };
  }

  const url = `${SITE}/resources/news/${post.slug}`;
  const canonical = post.canonicalUrl || url;
  const ogTitle = post.ogTitle || post.title;
  const ogDesc = post.ogDescription || post.excerpt;
  const twTitle = post.twitterTitle || ogTitle;
  const twDesc = post.twitterDescription || ogDesc;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      siteName: "SearchPrex",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.heroImage, width: 1400, height: 787, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDesc,
      images: [post.heroImage],
    },
  };
}

export default async function NewsSpokePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) notFound();

  const url = `${SITE}/resources/news/${post.slug}`;
  const canonical = post.canonicalUrl || url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${SITE}/experts`,
    },
    publisher: {
      "@type": "Organization",
      name: "SearchPrex",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "SEO News", item: `${SITE}/resources/news` },
      { "@type": "ListItem", position: 4, name: post.title, item: canonical },
    ],
  };

  return (
    <>
      {[articleSchema, breadcrumbSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PostClient post={post} />
    </>
  );
}
