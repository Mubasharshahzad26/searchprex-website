// app/blog/page.tsx
// Server Component — SEO layer the old client-only blog page was missing:
// metadata + www canonical + OG, Blog + ItemList + BreadcrumbList schema.
// UI lives in BlogClient.
 
import type { Metadata } from "next";
import BlogClient from "./BlogClient";
import { posts } from "./data";
 
const SITE = "https://www.searchprex.com";
 
export const metadata: Metadata = {
  title: "SEO Blog — Technical, Ecommerce & Local SEO Guides | SearchPrex",
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
 
export default function Page() {
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
    blogPost: posts.map((p) => ({
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
      <BlogClient />
    </>
  );
}
 