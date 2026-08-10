/**
 * Single source of truth for Page SEO validation.
 *
 * This lives outside `app/(admin)/admin/actions.ts` on purpose: that file is
 * marked "use server", and a module with that directive may only export async
 * functions. Importing a zod schema from it into a client form would break the
 * build, so both the server actions and the admin form import from here.
 */

import { z } from "zod";

/** The four combinations that cover every realistic robots meta directive. */
export const ROBOTS_VALUES = [
  "index, follow",
  "index, nofollow",
  "noindex, follow",
  "noindex, nofollow",
] as const;

export type RobotsValue = (typeof ROBOTS_VALUES)[number];

export const PAGE_STATUSES = ["published", "draft", "archived"] as const;
export type PageStatus = (typeof PAGE_STATUSES)[number];

/** Schema types offered in the editor, mapped to schema.org @type values. */
export const SCHEMA_TYPES = [
  "Organization",
  "WebPage",
  "WebSite",
  "FAQPage",
  "Article",
  "BlogPosting",
  "Service",
  "Product",
  "VideoObject",
  "LocalBusiness",
  "BreadcrumbList",
  "ItemList",
] as const;

export const OG_TYPES = ["website", "article", "profile", "product"] as const;
export const TWITTER_CARDS = ["summary_large_image", "summary"] as const;

/**
 * Google truncates around these lengths in desktop SERPs. They are guidance for
 * the character counters, not hard validation — a long title is a warning, not
 * an error, so the schema's own max values sit far above them.
 */
export const TITLE_IDEAL_MAX = 60;
export const DESCRIPTION_IDEAL_MAX = 160;

/** Accepts "" (unset) or a parseable JSON string. */
const jsonLdString = z
  .string()
  .trim()
  .optional()
  .refine(
    (v) => {
      if (!v) return true;
      try {
        JSON.parse(v);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Must be valid JSON." }
  );

/** Optional absolute URL that also accepts the empty string as "unset". */
const optionalUrl = z.string().trim().url("Must be a full URL, e.g. https://…").optional().or(z.literal(""));

export const pageSeoSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .startsWith("/", "Slug must start with a forward slash.")
    .regex(/^\/[a-z0-9\-/]*$/, "Use lowercase letters, numbers, hyphens and slashes only.")
    .refine((v) => v === "/" || !v.endsWith("/"), "Remove the trailing slash.")
    .refine((v) => !v.includes("//"), "Slug cannot contain a double slash."),
  title: z.string().trim().min(1, "Title is required.").max(200),
  metaDescription: z.string().trim().min(1, "Meta description is required.").max(500),
  canonicalUrl: optionalUrl,
  ogTitle: z.string().trim().max(200).optional().or(z.literal("")),
  ogDescription: z.string().trim().max(500).optional().or(z.literal("")),
  ogImage: optionalUrl,
  ogType: z.string().trim().optional().or(z.literal("")),
  twitterCard: z.string().trim().optional().or(z.literal("")),
  twitterTitle: z.string().trim().max(200).optional().or(z.literal("")),
  twitterDescription: z.string().trim().max(500).optional().or(z.literal("")),
  twitterImage: optionalUrl,
  robots: z.enum(ROBOTS_VALUES).optional(),
  metaKeywords: z.array(z.string().trim().min(1)).max(50).optional(),
  schemaType: z.string().trim().optional().or(z.literal("")),
  schemaData: jsonLdString,
  contentBlocks: jsonLdString,
  status: z.enum(PAGE_STATUSES).optional(),
});

export type PageSeoInput = z.input<typeof pageSeoSchema>;
export type PageSeoValues = z.output<typeof pageSeoSchema>;

/**
 * Empty strings mean "unset" in the UI; store them as null so the fallbacks in
 * lib/admin-seo.ts kick in rather than emitting empty meta tags.
 */
export function toPrismaData(parsed: PageSeoValues) {
  const blank = (v?: string) => (v && v.length > 0 ? v : null);
  return {
    slug: parsed.slug,
    title: parsed.title,
    metaDescription: parsed.metaDescription,
    canonicalUrl: blank(parsed.canonicalUrl),
    ogTitle: blank(parsed.ogTitle),
    ogDescription: blank(parsed.ogDescription),
    ogImage: blank(parsed.ogImage),
    ogType: blank(parsed.ogType) ?? "website",
    twitterCard: blank(parsed.twitterCard) ?? "summary_large_image",
    twitterTitle: blank(parsed.twitterTitle),
    twitterDescription: blank(parsed.twitterDescription),
    twitterImage: blank(parsed.twitterImage),
    robots: parsed.robots ?? "index, follow",
    metaKeywords: parsed.metaKeywords ?? [],
    schemaType: blank(parsed.schemaType),
    schemaData: parsed.schemaData ? JSON.parse(parsed.schemaData) : null,
    contentBlocks: parsed.contentBlocks ? JSON.parse(parsed.contentBlocks) : null,
    status: parsed.status ?? "published",
  };
}

/**
 * Turns a schema type into a minimal, valid JSON-LD starting point so the user
 * has something to edit instead of a blank textarea.
 */
export function starterSchemaFor(type: string, page: { title?: string; metaDescription?: string; url?: string }) {
  const base: Record<string, unknown> = { "@context": "https://schema.org", "@type": type };

  switch (type) {
    case "Organization":
      return { ...base, name: "SearchPrex", url: page.url ?? "", logo: "", sameAs: [] };
    case "WebSite":
      return { ...base, name: "SearchPrex", url: page.url ?? "" };
    case "WebPage":
      return { ...base, name: page.title ?? "", description: page.metaDescription ?? "", url: page.url ?? "" };
    case "FAQPage":
      return {
        ...base,
        mainEntity: [
          {
            "@type": "Question",
            name: "Replace with your question",
            acceptedAnswer: { "@type": "Answer", text: "Replace with your answer" },
          },
        ],
      };
    case "Article":
    case "BlogPosting":
      return {
        ...base,
        headline: page.title ?? "",
        description: page.metaDescription ?? "",
        author: { "@type": "Organization", name: "SearchPrex" },
        publisher: { "@type": "Organization", name: "SearchPrex" },
        datePublished: "",
        dateModified: "",
      };
    case "Service":
      return {
        ...base,
        name: page.title ?? "",
        description: page.metaDescription ?? "",
        provider: { "@type": "Organization", name: "SearchPrex" },
        areaServed: "United States",
      };
    case "Product":
      return {
        ...base,
        name: page.title ?? "",
        description: page.metaDescription ?? "",
        offers: { "@type": "Offer", price: "", priceCurrency: "USD" },
      };
    case "VideoObject":
      return { ...base, name: page.title ?? "", description: page.metaDescription ?? "", thumbnailUrl: "", uploadDate: "" };
    case "LocalBusiness":
      return {
        ...base,
        name: "SearchPrex",
        url: page.url ?? "",
        telephone: "",
        address: { "@type": "PostalAddress", addressLocality: "", addressRegion: "", addressCountry: "US" },
      };
    case "BreadcrumbList":
      return {
        ...base,
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: page.url ?? "" }],
      };
    case "ItemList":
      return { ...base, itemListElement: [{ "@type": "ListItem", position: 1, name: "" }] };
    default:
      return base;
  }
}

/**
 * SEO health check used by both the pages list and the dashboard panel.
 * Returns the problems found with a page, most severe first.
 */
export function seoIssues(page: {
  title?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  robots?: string | null;
}): string[] {
  const issues: string[] = [];
  if (page.robots?.includes("noindex")) issues.push("Set to noindex");
  if (!page.metaDescription) issues.push("No meta description");
  else if (page.metaDescription.length > DESCRIPTION_IDEAL_MAX + 20)
    issues.push(`Description ${page.metaDescription.length} chars`);
  if (!page.title) issues.push("No title");
  else if (page.title.length > TITLE_IDEAL_MAX) issues.push(`Title ${page.title.length} chars`);
  if (!page.ogImage) issues.push("No social image");
  return issues;
}
