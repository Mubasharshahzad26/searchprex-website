import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import CaseStudyDetail from "../[industry]/[client]/CaseStudyDetail";

const SITE = "https://www.searchprex.com";

export async function generateMetadata(
  { params }: { params: Promise<{ industry: string }> }
): Promise<Metadata> {
  const { industry } = await params;
  const decodedSlug = decodeURIComponent(industry);

  const dbCs = await db.marketingCaseStudy.findUnique({
    where: { slug: decodedSlug }
  });

  if (!dbCs || !dbCs.published) return {};

  const title = dbCs.metaTitle || `${dbCs.title} | SearchPrex Case Study`;
  const description = dbCs.metaDescription || `Read how we improved SEO performance for ${dbCs.clientName}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/case-studies/${dbCs.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/case-studies/${dbCs.slug}`,
      type: "article",
      ...(dbCs.coverImage && {
        images: [{ url: dbCs.coverImage }],
      }),
    },
  };
}

export default async function Page(
  { params }: { params: Promise<{ industry: string }> }
) {
  const { industry } = await params;
  const decodedSlug = decodeURIComponent(industry);

  const dbCs = await db.marketingCaseStudy.findUnique({
    where: { slug: decodedSlug }
  });

  if (!dbCs || !dbCs.published) notFound();

  // Map to the CaseStudy interface expected by CaseStudyDetail
  const mappedCs: any = {
    id: dbCs.id,
    slug: dbCs.slug,
    client: dbCs.clientName,
    seoType: "Custom SEO",
    industry: "Other",
    location: "Global",
    headline: dbCs.title,
    description: dbCs.metaDescription || "Read how we improved SEO performance.",
    metrics: [{ l: "Custom metric", v: "Improved" }], // dummy metric to avoid crash
    featured: false,
    video: null,
    image: dbCs.coverImage || "/images/case-studies/default.jpg",
    sections: {
      challenge: {
        text: dbCs.challenge || "No challenge provided.",
        points: []
      },
      solution: {
        text: dbCs.solution || "No solution provided.",
        points: []
      },
      results: {
        text: dbCs.results || "No results provided.",
        points: []
      }
    },
    tools: []
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mappedCs.headline,
    about: `${mappedCs.seoType} case study for ${mappedCs.client}`,
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
    mainEntityOfPage: `${SITE}/case-studies/${dbCs.slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/all-case-studies` },
      { "@type": "ListItem", position: 3, name: mappedCs.client, item: `${SITE}/case-studies/${dbCs.slug}` },
    ],
  };

  const schemas = [articleSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CaseStudyDetail cs={mappedCs} related={[]} />
    </>
  );
}
