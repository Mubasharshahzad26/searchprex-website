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
function ensureOpenGraphImages(meta: Metadata, siteUrl: string, title?: string): Metadata {
  const defaultOgImageUrl = `${siteUrl}/og-image.jpg`;
  const res = { ...meta };

  if (res.openGraph) {
    const hasImages =
      res.openGraph.images &&
      (Array.isArray(res.openGraph.images) ? res.openGraph.images.length > 0 : Boolean(res.openGraph.images));

    if (!hasImages) {
      res.openGraph = {
        ...res.openGraph,
        images: [
          {
            url: defaultOgImageUrl,
            width: 1200,
            height: 630,
            alt: (typeof title === "string" ? title : undefined) || "SearchPrex — USA SEO Agency",
          },
        ],
      };
    }
  }

  if (res.twitter) {
    const hasTwImages =
      res.twitter.images &&
      (Array.isArray(res.twitter.images) ? res.twitter.images.length > 0 : Boolean(res.twitter.images));

    if (!hasTwImages) {
      res.twitter = {
        ...res.twitter,
        card: res.twitter.card || "summary_large_image",
        images: [defaultOgImageUrl],
      };
    }
  }

  return res;
}

export async function getPageSEO(slug: string, base: Metadata): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

  try {
    const pagePromise = db.page.findUnique({ where: { slug } });
    const page = await Promise.race([
      pagePromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000)),
    ]);

    // Draft and archived rows are invisible to the public site. Without this
    // check, unpublishing a page in the admin panel would still serve its
    // title and description to Google.
    if (!page || page.status !== "published") {
      return ensureOpenGraphImages(base, siteUrl, (base.title as string) || undefined);
    }

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
        languages: {
          "en-US": canonical,
          "x-default": canonical,
        },
      },
      robots: {
        index: !directives.includes("noindex"),
        follow: !directives.includes("nofollow"),
        googleBot: {
          index: !directives.includes("noindex"),
          follow: !directives.includes("nofollow"),
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };

    if (base.openGraph || page.ogTitle || page.ogDescription || page.ogImage || page.ogType) {
      const defaultOgImageUrl = `${siteUrl}/og-image.jpg`;
      const baseImages = base.openGraph?.images
        ? Array.isArray(base.openGraph.images)
          ? base.openGraph.images
          : [base.openGraph.images]
        : [];

      merged.openGraph = {
        ...base.openGraph,
        title: page.ogTitle || base.openGraph?.title || title,
        description: page.ogDescription || base.openGraph?.description || description,
        url: canonical,
        // `type` changes the shape of the OpenGraph union (an `article` carries
        // publishedTime, a `profile` carries firstName…), so a CMS override
        // replaces the base rather than merging into it.
        ...(page.ogType ? { type: page.ogType as "website" } : {}),
        images: page.ogImage
          ? [{ url: page.ogImage }]
          : baseImages.length > 0
          ? baseImages
          : [
              {
                url: defaultOgImageUrl,
                width: 1200,
                height: 630,
                alt: (typeof title === "string" ? title : undefined) || "SearchPrex — USA SEO Agency",
              },
            ],
      } as Metadata["openGraph"];
    }

    if (base.twitter || page.twitterTitle || page.twitterDescription || page.twitterImage || page.twitterCard) {
      const defaultOgImageUrl = `${siteUrl}/og-image.jpg`;
      const baseTwImages = base.twitter?.images
        ? Array.isArray(base.twitter.images)
          ? base.twitter.images
          : [base.twitter.images]
        : [];

      merged.twitter = {
        ...base.twitter,
        title: page.twitterTitle || base.twitter?.title || title,
        description: page.twitterDescription || base.twitter?.description || description,
        card: (page.twitterCard as "summary_large_image") || base.twitter?.card || "summary_large_image",
        images: page.twitterImage
          ? [page.twitterImage]
          : baseTwImages.length > 0
          ? baseTwImages
          : [defaultOgImageUrl],
      } as Metadata["twitter"];
    }

    return ensureOpenGraphImages(merged, siteUrl, (title as string) || undefined);
  } catch (error) {
    console.error(`[CMS] Failed to fetch SEO for slug="${slug}", serving page defaults:`, error);
    return ensureOpenGraphImages(base, siteUrl, (base.title as string) || undefined);
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
    const pagePromise = db.page.findUnique({
      where: { slug },
      select: { schemaData: true, status: true },
    });
    const page = await Promise.race([
      pagePromise,
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 1000)),
    ]);
    if (page?.status === "published" && page.schemaData) {
      return page.schemaData;
    }
  } catch (error) {
    console.error(`[CMS] Failed to fetch schema for slug="${slug}":`, error);
  }
  return null;
}
