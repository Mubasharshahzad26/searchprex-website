import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostClient from "@/app/blog/[slug]/PostClient";
import { db } from "@/lib/db";
import { staticNewsSpokes } from "@/lib/static-news-spokes";

// Spokes render on demand and were then cached until the next deploy, so CMS
// edits and unpublishes did not reach the live page. An hour bounds that.
export const revalidate = 3600;

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
    if (dbPost && dbPost.published && dbPost.category && dbPost.category.toLowerCase().includes("news")) {
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
          role: "Founder & SEO Strategist",
          bio: "Founder & SEO Strategist at SearchPrex, specializing in Google search volatility, technical architecture, and Generative Engine Optimization (GEO).",
          linkedIn: "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
        },
        featured: false,
        heroImage:
          dbPost.slug === "local-seo-updates"
            ? `${SITE}/og/local-seo-updates-1200x630.png`
            : dbPost.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
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

  // Resilient fallback to static news spokes (protects against database outages or quota limits)
  const fallback = staticNewsSpokes.find((p) => p.slug === slug);
  if (fallback) {
    return {
      ...fallback,
      category: (fallback.category?.split("—").pop() ?? "SEO News").trim(),
      metaTitle: expandMonthToken(fallback.metaTitle || fallback.title, fallback.dateModified || new Date().toISOString()),
      ogTitle: expandMonthToken(fallback.ogTitle || fallback.metaTitle || fallback.title, fallback.dateModified || new Date().toISOString()),
      twitterTitle: expandMonthToken(fallback.twitterTitle || fallback.metaTitle || fallback.title, fallback.dateModified || new Date().toISOString()),
    };
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
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
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
    title: { absolute: post.metaTitle },
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
      images: [{ url: post.heroImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: twTitle,
      description: twDesc,
      images: [post.heroImage],
    },
  };
}

/** Pre-renders all known news spokes at build time so they are instantly served from Edge CDN with zero 404s. */
export function generateStaticParams() {
  return staticNewsSpokes.map((p) => ({ slug: p.slug }));
}

/**
 * Sibling spokes for the "Related articles" strip. The shared PostClient
 * otherwise falls back to `getRelated`, which only searches the file-based blog
 * posts -- so news spokes, whose categories are all "SEO News*", matched nothing
 * and the section never rendered. Cross-linking the spokes is the point of a
 * hub-and-spoke, so it is worth supplying them explicitly.
 */
async function getRelatedSpokes(currentSlug: string) {
  if (currentSlug === "local-seo-updates") {
    return [
      {
        slug: "google-business-profile-four-days-suggested-edits",
        href: "/resources/news/google-business-profile-four-days-suggested-edits",
        title: "Google Gives You Four Days to Reject a Suggested Edit",
        category: "Local",
        subcategory: "",
        readTime: "5-minute read",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
      },
      {
        slug: "google-maps-sign-in-to-read-reviews",
        href: "/resources/news/google-maps-sign-in-to-read-reviews",
        title: "Google Maps Now Asks Users to Sign In to Read All Reviews",
        category: "Local",
        subcategory: "",
        readTime: "4-minute read",
        heroImage: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=1400&q=85&auto=format&fit=crop",
      },
      {
        slug: "google-maps-ranking-drop",
        href: "/blog/google-maps-ranking-drop",
        title: "Why Did My Google Maps Ranking Drop? How to Check and Fix It",
        category: "Local SEO",
        subcategory: "",
        readTime: "11-minute read",
        heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=85&auto=format&fit=crop",
      },
      {
        slug: "get-more-calls-from-google-business-profile",
        href: "/blog/get-more-calls-from-google-business-profile",
        title: "How to Get More Calls From Your Google Business Profile",
        category: "Local SEO",
        subcategory: "",
        readTime: "10-minute read",
        heroImage: "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?w=1400&q=85&auto=format&fit=crop",
      },
      {
        slug: "google-september-2026-spam-update",
        href: "/resources/news/google-september-2026-spam-update",
        title: "Google September 2026 Spam Update Concluded: 14-Day Rollout Triggers Manual Actions",
        category: "Algorithms",
        subcategory: "",
        readTime: "6-minute read",
        heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&auto=format&fit=crop",
      },
    ];
  }

  try {
    const siblings = await db.marketingBlog.findMany({
      where: {
        published: true,
        slug: { not: currentSlug },
        category: { contains: "News", mode: "insensitive" },
      },
      orderBy: { publishedAt: "desc" },
      take: 4,
      select: { slug: true, title: true, category: true, coverImage: true, excerpt: true },
    });

    if (siblings && siblings.length > 0) {
      return siblings.map((s) => ({
        slug: s.slug,
        title: s.title,
        // "SEO News — AI SEO" is too long for the card's eyebrow; the hub badge
        // shows the same shortened form.
        category: (s.category?.split("—").pop() ?? "SEO News").trim(),
        subcategory: "",
        heroImage: s.coverImage || undefined,
      }));
    }
  } catch (err) {
    console.warn("Failed to load related news spokes from DB, falling back to static", err);
  }

  // Resilient fallback to static news spokes
  return staticNewsSpokes
    .filter((s) => s.slug !== currentSlug)
    .slice(0, 4)
    .map((s) => ({
      slug: s.slug,
      title: s.title,
      category: (s.category?.split("—").pop() ?? "SEO News").trim(),
      subcategory: "",
      heroImage: s.heroImage,
    }));
}

export default async function NewsSpokePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) notFound();

  const related = await getRelatedSpokes(post.slug);

  const url = `${SITE}/resources/news/${post.slug}`;
  const canonical = post.canonicalUrl || url;

  const fullHeroImage = post.heroImage.startsWith("/")
    ? `${SITE}${post.heroImage}`
    : post.heroImage;

      const videoNodes =
        post.slug === "tesla-flying-car-roadster-alef-ai-search-trend-seo-2026"
          ? [
              {
                "@type": "VideoObject",
                "@id": `${canonical}#video-tesla-demo`,
                name: "Tesla's 'FLYING CAR' Revealed! Musk's Roadster Flies, Drives Upside Down In Stunning Demo",
                description:
                  "Live demonstration footage from SpaceX's McGregor, Texas facility showing the next-generation Tesla Roadster utilizing cold-gas thrusters and suction ramp propulsion.",
                thumbnailUrl: [
                  "https://i.ytimg.com/vi/wACc9vJflrc/maxresdefault.jpg",
                  "https://i.ytimg.com/vi/wACc9vJflrc/hqdefault.jpg",
                ],
                uploadDate: "2026-10-16T12:00:00+00:00",
                duration: "PT4M15S",
                embedUrl: "https://www.youtube.com/embed/wACc9vJflrc",
                contentUrl: "https://www.youtube.com/watch?v=wACc9vJflrc",
                inLanguage: "en-US",
                isFamilyFriendly: true,
                regionsAllowed: "US",
                publisher: { "@id": `${SITE}/#organization` },
              },
              {
                "@type": "VideoObject",
                "@id": `${canonical}#video-tesla-breakdown`,
                name: "Elon Musk Just Changed Cars Forever — Tesla Roadster FLIES!",
                description:
                  "Industry breakdown of the October 2026 Tesla Roadster SpaceX package demonstration, synthetic AI video skepticism, and Alef Aeronautics' eVTOL flying car response.",
                thumbnailUrl: [
                  "https://i.ytimg.com/vi/GwffNnmuqfk/maxresdefault.jpg",
                  "https://i.ytimg.com/vi/GwffNnmuqfk/hqdefault.jpg",
                ],
                uploadDate: "2026-10-16T15:00:00+00:00",
                duration: "PT9M30S",
                embedUrl: "https://www.youtube.com/embed/GwffNnmuqfk",
                contentUrl: "https://www.youtube.com/watch?v=GwffNnmuqfk",
                inLanguage: "en-US",
                isFamilyFriendly: true,
                regionsAllowed: "US",
                publisher: { "@id": `${SITE}/#organization` },
              },
            ]
          : Array.from(
              post.content.matchAll(
                /<iframe[^>]*src=["']https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})["'][^>]*>/gi
              )
            ).map((match, idx) => {
              const videoId = match[1];
              const titleMatch = match[0].match(/title=["']([^"']+)["']/i);
              return {
                "@type": "VideoObject",
                "@id": `${canonical}#video-${idx + 1}`,
                name: titleMatch?.[1] || `${post.title} — Reference Video ${idx + 1}`,
                description: post.excerpt || post.metaDescription || post.title,
                thumbnailUrl: [
                  `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                ],
                uploadDate: `${post.date}T12:00:00+00:00`,
                duration: "PT5M00S",
                embedUrl: `https://www.youtube.com/embed/${videoId}`,
                contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
                inLanguage: "en-US",
                isFamilyFriendly: true,
                publisher: { "@id": `${SITE}/#organization` },
              };
            });

      const articleNode = {
        "@type": post.schemaType || "NewsArticle",
        "@id": `${canonical}#article`,
        headline: post.title,
        description: post.excerpt,
        image: [
          post.slug === "local-seo-updates"
            ? `${SITE}/og/local-seo-updates-1200x630.png`
            : fullHeroImage,
        ],
        datePublished: post.date,
        dateModified: post.dateModified,
        articleSection: post.category,
        inLanguage: "en-US",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonical,
        },
        isPartOf: { "@id": `${SITE}/#website` },
        author: { "@id": `${SITE}/#founder` },
        publisher: { "@id": `${SITE}/#organization` },
        ...(videoNodes.length > 0
          ? { video: videoNodes.map((v) => ({ "@id": v["@id"] })) }
          : {}),
        ...(post.slug === "local-seo-updates"
          ? {
              citation: [
                "https://status.search.google.com/incidents/XhUDXP7A67iHCD2kmbVu",
                "https://support.google.com/business/answer/3480441",
                "https://www.seroundtable.com/google-maps-account-reviews-42186.html",
                "https://www.seroundtable.com/google-business-profiles-4-days-42139.html",
                "https://www.seroundtable.com/google-local-knowledge-panel-ai-overview-42105.html",
              ],
            }
          : post.slug === "tesla-flying-car-roadster-alef-ai-search-trend-seo-2026"
          ? {
              citation: [
                "https://www.cnet.com/home/electric-vehicles/tesla-roadster-reveal-spacex-tech/",
                "https://electrek.co/2026/10/15/alefs-electric-flying-car-flies-over-tesla-roadster-video/",
                "https://gizmodo.com/alef-trolls-tesla-with-video-of-its-car-flying-over-a-roadster-2000826973",
                "https://www.youtube.com/watch?v=wACc9vJflrc",
                "https://www.youtube.com/watch?v=GwffNnmuqfk",
              ],
            }
          : {}),
      };

  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
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
  const faqNode =
    quickAnswers.length >= 2
      ? {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          mainEntity: quickAnswers.map((qa) => ({
            "@type": "Question",
            name: qa.question,
            acceptedAnswer: { "@type": "Answer", text: qa.answer },
          })),
        }
      : null;

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      articleNode,
      breadcrumbNode,
      ...videoNodes,
      ...(faqNode ? [faqNode] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageGraph) }}
      />
      <PostClient
        post={post}
        section={{ label: "SEO News", href: "/resources/news" }}
        related={related}
      />
    </>
  );
}
