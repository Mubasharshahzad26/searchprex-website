// app/locations/kansas/wichita/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityBySlug } from "@/lib/kansas-cities";
import { getPageSEO } from "@/lib/admin-seo";
import { organizationRef } from "@/lib/site-schema";
import { isLocationIndexable } from "@/lib/location-indexing";
import KansasCityModernView from "@/components/locations/KansasCityModernView";
import { keepBrandedTitle } from "@/lib/seo-title";

export const dynamic = "force-dynamic";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/locations/kansas/wichita`;

const baseMetadata: Metadata = {
  title: keepBrandedTitle("Law Firm SEO Company in Wichita, KS"),
  description:
    "Founder-led law firm SEO for Wichita attorneys: personal injury, family law and criminal defense firms across Sedgwick County. Free tear-down within 24 hours.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Law Firm SEO Company in Wichita, KS | SearchPrex",
    description:
      "Local SEO for Wichita law firms — dominate Google Maps and local search in Sedgwick County.",
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Law Firm SEO Company in Wichita, KS | SearchPrex",
    description:
      "Local SEO for Wichita law firms — dominate Google Maps and local search in Sedgwick County.",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const indexable = isLocationIndexable("/locations/kansas/wichita");
  const meta = await getPageSEO("/locations/kansas/wichita", baseMetadata);
  return {
    ...meta,
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function WichitaPage() {
  const city = getCityBySlug("wichita");
  if (!city) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Law Firm SEO in Wichita, KS",
        serviceType: "Law Firm SEO",
        description: city.metaDescription,
        url: PAGE_URL,
        areaServed: {
          "@type": "City",
          name: "Wichita",
          containedInPlace: { "@type": "State", name: "Kansas" },
        },
        provider: organizationRef,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
          { "@type": "ListItem", position: 3, name: "Kansas", item: `${SITE}/locations/kansas` },
          { "@type": "ListItem", position: 4, name: "Wichita", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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
