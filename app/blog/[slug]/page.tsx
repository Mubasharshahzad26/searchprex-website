// app/blog/[slug]/page.tsx
// Server Component. Owns per-post metadata and Article/Breadcrumb JSON-LD.
//
// This route used to be "use client", which meant it could not export metadata
// at all — so EVERY blog post served the root layout's default title and
// description. Google saw every article as the homepage, which is fatal for a
// blog: identical titles across URLs give it no reason to rank any of them.
//
// It also resolved the post with `posts.find(...) ?? posts[0]`, so any unknown
// slug returned HTTP 200 rendering the first article. That is an unbounded
// source of duplicate content. Unknown slugs now 404.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts as hardcodedPosts } from "./posts";
import PostClient from "./PostClient";
import { db } from "@/lib/db";

const SITE = "https://www.searchprex.com";

// Helper to get post from DB or fallback
async function getPostData(slug: string) {
  try {
    const dbPost = await db.marketingBlog.findUnique({ where: { slug } });
    if (dbPost) {
      return {
        slug: dbPost.slug,
        category: dbPost.category || "General",
        subcategory: "",
        title: dbPost.title,
        excerpt: dbPost.excerpt || dbPost.metaDescription || "",
        readTime: dbPost.readTime || "5-minute read",
        date: dbPost.publishedAt ? dbPost.publishedAt.toISOString().split('T')[0] : dbPost.createdAt.toISOString().split('T')[0],
        author: { name: dbPost.author || "SearchPrex Team", role: "Verified SEO Expert" },
        authorBio: "",
        featured: false,
        heroImage: dbPost.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
        tags: [],
        stat: { value: "", label: "" },
        toc: [],
        content: dbPost.content || ""
      };
    }
  } catch (err) {
    console.error("Failed to fetch DB post for slug:", slug, err);
  }
  return hardcodedPosts.find((p) => p.slug === slug);
}

/** Pre-renders every known hardcoded post at build time (DB posts will be dynamic). */
export function generateStaticParams() {
  return hardcodedPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: true } };
  }

  const url = `${SITE}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "SearchPrex",
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      images: [{ url: post.heroImage, width: 1400, height: 787, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
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
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      {[articleSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <PostClient post={post} />
    </>
  );
}
