import type { Metadata } from "next";
import { db } from "@/lib/db";

/**
 * CMS-backed metadata for a public page.
 *
 * The page keeps its existing `Metadata` object and passes it in as `base`;
 * whatever the CMS has for that slug is layered on top. Anything the admin
 * panel does not manage — `authors`, `publisher`, `category`,
 * `alternates.languages`, OG image dimensions, `twitter.site`, `formatDetection`
 * — survives untouched, because `base` is spread into the result.
 *
 *   export async function generateMetadata(): Promise<Metadata> {
 *     return getPageSEO("/about", baseMetadata);
 *   }
 *
 * A CMS field only wins when it is non-empty, so clearing a field in the admin
 * panel falls back to the page's own value rather than emitting an empty tag.
 *
 * On a missing row, a row that is not `published`, or a database error, `base`
 * is returned unchanged — an unreachable database must never strip a live page's
 * metadata.
 */
export async function getPageSEO(slug: string, base: Metadata): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

  try {
    const page = await db.page.findUnique({ where: { slug } });

    // Draft and archived rows are invisible to the public site. Without this
    // check, unpublishing a page in the admin panel would still serve its
    // title and description to Google.
    if (!page || page.status !== "published") return base;

    const title = page.title || base.title || undefined;
    const description = page.metaDescription || base.description || undefined;

    const baseCanonical = base.alternates?.canonical;
    const canonical =
      page.canonicalUrl ||
      (typeof baseCanonical === "string" ? baseCanonical : undefined) ||
      `${siteUrl}${slug === "/" ? "" : slug}`;

    // Stored as a single human-readable string ("noindex, nofollow") because
    // that is what the admin panel edits and what a <meta name="robots"> tag
    // looks like. Next wants the two directives as booleans.
    const directives = (page.robots || "index, follow")
      .split(",")
      .map((directive) => directive.trim().toLowerCase());

    const merged: Metadata = {
      ...base,
      title,
      description,
      keywords: page.metaKeywords?.length ? page.metaKeywords : base.keywords,
      alternates: {
        ...base.alternates,
        canonical,
      },
      robots: {
        index: !directives.includes("noindex"),
        follow: !directives.includes("nofollow"),
      },
    };

    if (base.openGraph || page.ogTitle || page.ogDescription || page.ogImage || page.ogType) {
      merged.openGraph = {
        ...base.openGraph,
        title: page.ogTitle || base.openGraph?.title || title,
        description: page.ogDescription || base.openGraph?.description || description,
        url: canonical,
        // `type` changes the shape of the OpenGraph union (an `article` carries
        // publishedTime, a `profile` carries firstName…), so a CMS override
        // replaces the base rather than merging into it.
        ...(page.ogType ? { type: page.ogType as "website" } : {}),
        ...(page.ogImage ? { images: [{ url: page.ogImage }] } : {}),
      } as Metadata["openGraph"];
    }

    if (base.twitter || page.twitterTitle || page.twitterDescription || page.twitterImage || page.twitterCard) {
      merged.twitter = {
        ...base.twitter,
        title: page.twitterTitle || base.twitter?.title || title,
        description: page.twitterDescription || base.twitter?.description || description,
        ...(page.twitterCard ? { card: page.twitterCard as "summary_large_image" } : {}),
        ...(page.twitterImage ? { images: [page.twitterImage] } : {}),
      } as Metadata["twitter"];
    }

    return merged;
  } catch (error) {
    console.error(`[CMS] Failed to fetch SEO for slug="${slug}", serving page defaults:`, error);
    return base;
  }
}

/**
 * JSON-LD stored against a page in the admin panel, or null if none is set.
 *
 * Gated on `status === "published"` for the same reason as getPageSEO: schema
 * markup is public output, and a draft page's structured data should not reach
 * a crawler. Pages that hardcode their own JSON-LD are unaffected — they get
 * null here and keep rendering their own block.
 */
export async function getPageSchema(slug: string): Promise<any | null> {
  try {
    const page = await db.page.findUnique({
      where: { slug },
      select: { schemaData: true, status: true },
    });
    if (page?.status === "published" && page.schemaData) {
      return page.schemaData;
    }
  } catch (error) {
    console.error(`[CMS] Failed to fetch schema for slug="${slug}":`, error);
  }
  return null;
}
