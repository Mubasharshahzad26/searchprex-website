import type { Metadata } from "next";
import SerpCheckerClient from "@/app/tools/serp-checker/SerpCheckerClient";
import { SERP_FAQS } from "@/app/tools/serp-checker/page";

const SITE = "https://www.searchprex.com";
const PAGE_URL = `${SITE}/resources/solution/serp-checker`;

export const metadata: Metadata = {
  title: "SERP Checker: Live Google Keyword Ranking Position Check",
  description:
    "Check your live Google search rankings for any keyword and country. See your exact organic position, competitor URLs, and SERP features.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      "en-US": PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
  openGraph: {
    title: "SERP Checker: Live Google Keyword Ranking Position Check | SearchPrex",
    description: "Check your live Google search rankings for any keyword and country. Verified positions, no guesses.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function SerpCheckerSolutionPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "Solutions", item: `${SITE}/resources/solution` },
      { "@type": "ListItem", position: 4, name: "SERP Checker", item: PAGE_URL },
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SearchPrex SERP Checker",
    applicationCategory: "SEOApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Real-time Google search ranking position checker across global markets and local regions.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SERP_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SerpCheckerClient />
    </>
  );
}
