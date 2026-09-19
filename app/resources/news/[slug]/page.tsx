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
    // `published` has to be checked here, not only in the hub and sitemap
    // queries. Without it an unpublished article vanished from the listings but
    // still rendered at its URL — crawlable, and shareable by anyone who had it.
    if (dbPost && dbPost.published && dbPost.category && dbPost.category.toLowerCase().includes("seo news")) {
      return {
        slug: dbPost.slug,
        // The stored category is "SEO News — Technical" so that the hub and the
        // subnav queries both match it. Only the tail belongs in the breadcrumb,
        // which already shows "SEO News" as the section.
        category: (dbPost.category?.split("—").pop() ?? "SEO News").trim(),
        subcategory: "",
        title: dbPost.title,
        // The DB carries a separate, SERP-tuned metaTitle/metaDescription pair
        // that nothing here used to read. `title` went straight to the <title>
        // tag from the H1 (too long, so it truncated in the SERP), and
        // metaDescription was unreachable because `excerpt` is always set and
        // won the `||` below. Keep `title` for the H1 and the schema headline;
        // this pair is what Google actually renders.
        // Expanded here rather than in generateMetadata so the token can never
        // reach the client payload: this whole object is serialized as a prop
        // for PostClient, and a raw "{month}" was showing up in the RSC flight
        // data even though no meta tag carried it.
        metaTitle: expandMonthToken(dbPost.metaTitle || dbPost.title, dbPost.updatedAt.toISOString()),
        metaDescription: dbPost.metaDescription || dbPost.excerpt || "",
        excerpt: dbPost.excerpt || dbPost.metaDescription || "",
        readTime: dbPost.readTime || "7-minute read",
        date: dbPost.publishedAt ? dbPost.publishedAt.toISOString().split("T")[0] : dbPost.createdAt.toISOString().split("T")[0],
        // Freshness signal for schema.org. These pages target dated queries
        // ("... news today", "... updates september 2026"), and datePublished
        // alone tells Google nothing about whether the page still maintained.
        dateModified: dbPost.updatedAt.toISOString(),
        author: {
          name: dbPost.author || "Mubashar Sharif",
          role: "Verified SEO Expert",
          bio: "Senior SEO Analyst & Algorithm Strategist at SearchPrex, specializing in Google search volatility, technical architecture, and Generative Engine Optimization (GEO).",
          linkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
        },
        featured: false,
        heroImage: dbPost.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
        tags: [],
        // null, not an empty object: PostClient renders the headline stat badge
        // on any truthy value, so `{ value: "", label: "" }` produced an empty
        // badge on every news article.
        stat: null,
        toc: [],
        content: dbPost.content || "",
        
        // Advanced SEO Fields
        canonicalUrl: dbPost.canonicalUrl || "",
        schemaType: dbPost.schemaType || "NewsArticle",
        ogTitle: expandMonthToken(dbPost.ogTitle || "", dbPost.updatedAt.toISOString()),
        ogDescription: dbPost.ogDescription || "",
        twitterTitle: expandMonthToken(dbPost.twitterTitle || "", dbPost.updatedAt.toISOString()),
        twitterDescription: dbPost.twitterDescription || ""
      };
    }
  } catch (err) {
    console.error("Failed to fetch DB post for news spoke:", slug, err);
  }
  return null;
}

/**
 * Expands a `{month}` token in a stored metaTitle to the month the row was last
 * genuinely updated.
 *
 * These pages target dated queries ("local seo news today", "... updates
 * september 2026"), so a month in the SERP title earns clicks. Deriving it from
 * `updatedAt` rather than from today's date is the whole point: the title can
 * only ever advertise freshness the content actually has. Bump the row and the
 * month moves; leave the row alone and the title stops claiming this month.
 */
function expandMonthToken(value: string, isoDate: string): string {
  if (!value.includes("{month}")) return value;
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return value.replace(/\s*\{month\}/g, "");
  const month = parsed.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return value.replace(/\{month\}/g, month);
}

/** Markdown -> plain text, for schema values that must not contain markup. */
function stripMarkdown(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/[*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Pulls question/answer pairs out of a "## Quick answers" section in the body.
 *
 * Parsed from the article markdown rather than stored as a separate field on
 * purpose: Google requires FAQPage content to be visible on the page it
 * describes, and a second source of truth is exactly how that requirement gets
 * broken six months later. One body, one set of answers.
 *
 * Worth being clear about what this is for. It is NOT for FAQ rich results —
 * Google removed those in 2026, as the technical-seo-news-2026 spoke documents.
 * The value here is machine-readable Q&A for AI Overviews and LLM answer
 * engines, which is a different and much less certain payoff.
 *
 * Returns [] on anything it does not recognise, so a future formatting change
 * drops the schema silently instead of emitting something malformed.
 */
function extractQuickAnswers(content: string): { question: string; answer: string }[] {
  const afterHeading = content.split(/^##[ \t]+Quick answers[ \t]*$/m)[1];
  if (!afterHeading) return [];

  // Stop at the next H2 so following sections are not swept in.
  const section = afterHeading.split(/^##[ \t]+/m)[0];
  const blocks = section.split(/^###[ \t]+/m).slice(1);

  const pairs: { question: string; answer: string }[] = [];
  for (const block of blocks) {
    const newline = block.indexOf("\n");
    if (newline === -1) continue;
    const question = stripMarkdown(block.slice(0, newline));
    // First paragraph only — the direct answer, not the nuance that follows.
    const answer = stripMarkdown(block.slice(newline).trim().split(/\n[ \t]*\n/)[0] ?? "");
    if (question && answer) pairs.push({ question, answer });
  }
  return pairs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) {
    return { title: "News not found", robots: { index: false, follow: true } };
  }

  const url = `${SITE}/resources/news/${post.slug}`;
  const canonical = post.canonicalUrl || url;
  // Already expanded in getPostData -- nothing here carries a token.
  const ogTitle = post.ogTitle || post.metaTitle;
  const ogDesc = post.ogDescription || post.metaDescription;
  const twTitle = post.twitterTitle || ogTitle;
  const twDesc = post.twitterDescription || ogDesc;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
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

/**
 * Sibling spokes for the "Related articles" strip. The shared PostClient
 * otherwise falls back to `getRelated`, which only searches the file-based blog
 * posts -- so news spokes, whose categories are all "SEO News*", matched nothing
 * and the section never rendered. Cross-linking the spokes is the point of a
 * hub-and-spoke, so it is worth supplying them explicitly.
 */
async function getRelatedSpokes(currentSlug: string) {
  try {
    const siblings = await db.marketingBlog.findMany({
      where: {
        published: true,
        slug: { not: currentSlug },
        category: { contains: "SEO News", mode: "insensitive" },
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: { slug: true, title: true, category: true, coverImage: true, excerpt: true },
    });

    return siblings.map((s) => ({
      slug: s.slug,
      title: s.title,
      // "SEO News — AI SEO" is too long for the card's eyebrow; the hub badge
      // shows the same shortened form.
      category: (s.category?.split("—").pop() ?? "SEO News").trim(),
      subcategory: "",
      heroImage: s.coverImage || undefined,
    }));
  } catch (err) {
    console.error("Failed to load related news spokes for", currentSlug, err);
    return [];
  }
}

export default async function NewsSpokePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) notFound();

  const related = await getRelatedSpokes(post.slug);

  const url = `${SITE}/resources/news/${post.slug}`;
  const canonical = post.canonicalUrl || url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: post.heroImage,
    datePublished: post.date,
    dateModified: post.dateModified,
    // `keywords` used to be here as post.tags.join(", "), but post.tags is
    // hardcoded to [] above, so every article shipped an empty "keywords": "".
    articleSection: post.category,
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `${SITE}/experts`,
      // Ties the byline to the same profiles the About and case-study pages
      // already declare, so the author resolves to one entity across the site.
      sameAs: [
        "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
      ],
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

  // Only emitted when the body actually carries a Quick answers section, and
  // only with two or more pairs — a single-question FAQPage is noise.
  const quickAnswers = extractQuickAnswers(post.content);
  const faqSchema =
    quickAnswers.length >= 2
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: quickAnswers.map((qa) => ({
            "@type": "Question",
            name: qa.question,
            acceptedAnswer: { "@type": "Answer", text: qa.answer },
          })),
        }
      : null;

  return (
    <>
      {[articleSchema, breadcrumbSchema, faqSchema].filter(Boolean).map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <PostClient
        post={post}
        section={{ label: "SEO News", href: "/resources/news" }}
        related={related}
      />
    </>
  );
}
