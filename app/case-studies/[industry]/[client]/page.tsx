
// app/case-studies/[industry]/[client]/page.tsx
// Server Component for individual case study pages, e.g.
// /case-studies/hvac/local-hvac-services
// Owns: generateStaticParams, per-page SEO metadata, and JSON-LD
// (Article + BreadcrumbList + VideoObject when a video exists).
// The interactive UI lives in CaseStudyDetail (client island).
 
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, findBySlug, detailUrl } from "../../../all-case-studies/data";
import CaseStudyDetail from "./CaseStudyDetail";
 
const SITE = "https://www.searchprex.com";
 
type Params = { industry: string; client: string };
 
export function generateStaticParams(): Params[] {
  return caseStudies.map((cs) => ({
    industry: cs.slug.industry,
    client: cs.slug.client,
  }));
}
 
export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { industry, client } = await params;
  const cs = findBySlug(industry, client);
  if (!cs) return {};
 
  const title = `${cs.client} ${cs.seoType} Case Study — ${cs.metrics[0].v} ${cs.metrics[0].l} | SearchPrex`;
  const description = `${cs.headline} See the full ${cs.seoType.toLowerCase()} strategy, verified Google Search Console results, and how we did it.`;
 
  return {
    title,
    description,
    alternates: { canonical: `${SITE}${detailUrl(cs)}` },
    openGraph: {
      title,
      description,
      url: `${SITE}${detailUrl(cs)}`,
      type: "article",
      ...(cs.video && {
        images: [{ url: `https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg` }],
      }),
    },
  };
}
 
export default async function Page(
  { params }: { params: Promise<Params> }
) {
  const { industry, client } = await params;
  const cs = findBySlug(industry, client);
  if (!cs) notFound();
 
  // Related = same SEO type or industry, excluding self (internal linking for SEO)
  const related = caseStudies
    .filter((c) => c.id !== cs.id && (c.seoType === cs.seoType || c.industry === cs.industry))
    .slice(0, 3);
 
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cs.headline,
    about: `${cs.seoType} case study for ${cs.client} (${cs.location})`,
    author: {
      "@type": "Person",
      name: "Mubashar Shahzad",
      jobTitle: "SEO Expert & Content Strategist",
    },
    publisher: {
      "@type": "Organization",
      name: "SearchPrex",
      url: SITE,
    },
    mainEntityOfPage: `${SITE}${detailUrl(cs)}`,
  };
 
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/case-studies` },
      { "@type": "ListItem", position: 3, name: cs.industry, item: `${SITE}/all-case-studies?industry=${cs.slug.industry}` },
      { "@type": "ListItem", position: 4, name: cs.client, item: `${SITE}${detailUrl(cs)}` },
    ],
  };
 
  const videoSchema = cs.video
    ? {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: `${cs.client} — ${cs.seoType} case study (live GSC screen recording)`,
        description: cs.headline,
        thumbnailUrl: `https://img.youtube.com/vi/${cs.video}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${cs.video}`,
        uploadDate: "2026-01-01",
      }
    : null;
 
  const schemas = [articleSchema, breadcrumbSchema, ...(videoSchema ? [videoSchema] : [])];
 
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CaseStudyDetail cs={cs} related={related} />
    </>
  );
}
 