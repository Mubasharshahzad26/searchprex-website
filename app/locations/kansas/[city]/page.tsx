// app/locations/kansas/[city]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug, getAllCitySlugs } from "@/lib/kansas-cities";
import { organizationRef } from "@/lib/site-schema";
import { isLocationIndexable } from "@/lib/location-indexing";
import KansasCityModernView from "@/components/locations/KansasCityModernView";

// ── Static params (pre-render every city) ───────────────────────────────────
export function generateStaticParams() {
  return getAllCitySlugs();
}

// ── Per-city metadata ────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "Location Not Found | SearchPrex" };
  const url = `https://www.searchprex.com/locations/kansas/${city.slug}`;
  const indexable = isLocationIndexable(`/locations/kansas/${city.slug}`);
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url,
      type: "website",
      siteName: "SearchPrex",
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function KansasCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const url = `https://www.searchprex.com/locations/kansas/${city.slug}`;

  // ── JSON-LD: service + FAQ + breadcrumb ──
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: `Law Firm SEO in ${city.name}, KS`,
        serviceType: "Law Firm SEO",
        url,
        description: city.metaDescription,
        areaServed: { "@type": "City", name: `${city.name}, Kansas` },
        provider: organizationRef,
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://www.searchprex.com/locations" },
          { "@type": "ListItem", position: 3, name: "Kansas", item: "https://www.searchprex.com/locations/kansas" },
          { "@type": "ListItem", position: 4, name: city.name, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <KansasCityModernView city={city} />
    </main>
  );
}
