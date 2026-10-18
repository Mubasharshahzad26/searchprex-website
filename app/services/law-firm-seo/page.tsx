import type { Metadata } from "next";
import LawFirmSEOClient from "./LawFirmSEOClient";
import { CAPSULES, FAQS } from "./data";
import { founderRef, organizationRef, websiteRef } from "@/lib/site-schema";
import { RETAINER_PLANS } from "@/lib/pricing";
import { LAW_CHECKLIST_GUIDE } from "@/lib/guides";

import { getPageSEO } from "@/lib/admin-seo";
const PAGE_URL = "https://www.searchprex.com/services/law-firm-seo";

const SEO_TITLE = "Law Firm SEO Services USA | $1,200/Mo & 7-Day Free Trial";
const SEO_DESCRIPTION =
  "Law firm SEO services in the USA built for signed cases. Ranked #1 in Ohio for Law Firm SEO Cleveland Ohio. $1,200–$2,500/mo, 1 firm/city. 7-Day Free Trial.";

const baseMetadata: Metadata = {
  title: {
    absolute: SEO_TITLE,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "law firm SEO services",
    "law firm SEO",
    "law firm SEO agency USA",
    "attorney SEO services",
    "SEO for lawyers",
    "personal injury lawyer SEO",
    "family law SEO",
    "criminal defense SEO",
    "estate planning attorney SEO",
    "mass tort SEO",
    "Google Business Profile for lawyers",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: PAGE_URL,
    siteName: "SearchPrex",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const cmsMeta = await getPageSEO("/services/law-firm-seo", baseMetadata);
  return {
    ...cmsMeta,
    title: { absolute: SEO_TITLE },
    description: SEO_DESCRIPTION,
    openGraph: {
      ...cmsMeta.openGraph,
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
    },
    twitter: {
      ...cmsMeta.twitter,
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
    },
  };
}

const LAST_REVIEWED = "2026-10-18";
const LAW_PLAN = RETAINER_PLANS.find((p) => p.niche === "Law Firm SEO");

export default function LawFirmSEOPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Law Firm SEO Services in the USA",
        isPartOf: websiteRef,
        about: { "@id": `${PAGE_URL}#service` },
        author: founderRef,
        reviewedBy: founderRef,
        dateModified: LAST_REVIEWED,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#quick-answer", "#law-firm-seo-services"],
        },
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Law Firm SEO Services",
        serviceType: "Law Firm SEO Services",
        provider: organizationRef,
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "State", name: "Ohio" },
          { "@type": "City", name: "Cleveland" },
          { "@type": "State", name: "Texas" },
          { "@type": "City", name: "Sugar Land" },
          { "@type": "City", name: "The Woodlands" },
          { "@type": "State", name: "Michigan" },
          { "@type": "City", name: "Detroit" },
          { "@type": "State", name: "Pennsylvania" },
          { "@type": "City", name: "Philadelphia" },
          { "@type": "State", name: "Arizona" },
          { "@type": "City", name: "Scottsdale" },
          { "@type": "State", name: "California" },
          { "@type": "City", name: "San Jose" },
          { "@type": "State", name: "Louisiana" },
          { "@type": "State", name: "New Mexico" },
          { "@type": "State", name: "Kansas" },
        ],
        audience: { "@type": "BusinessAudience", audienceType: "US Law Firms & Solo Attorneys" },
        description:
          "Law firm SEO services in the United States: practice-area and city pages, Google Business Profile optimization, attorney E-E-A-T, technical SEO, and AI Overview readiness built to ABA Model Rule 7.1 and Google YMYL standards.",
        url: PAGE_URL,
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: PAGE_URL,
          availableLanguage: ["English"],
        },
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Specialized USA Law Firm SEO Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Personal Injury Law Firm SEO",
                url: `${PAGE_URL}/personal-injury`,
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 1500,
                maxPrice: 2500,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Family Law & Divorce Attorney SEO",
                url: `${PAGE_URL}/family-law`,
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 1200,
                maxPrice: 2200,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Criminal Defense & DUI/OVI Lawyer SEO",
                url: `${PAGE_URL}/criminal-defense`,
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 1200,
                maxPrice: 2200,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Estate Planning & Probate Attorney SEO",
                url: `${PAGE_URL}/estate-planning`,
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 1200,
                maxPrice: 2000,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mass Torts & MDL Docket SEO",
                url: `${PAGE_URL}/mass-torts`,
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 1800,
                maxPrice: 2500,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Google Business Profile (GBP) Optimization for Lawyers",
                url: `${PAGE_URL}/google-business-profile-for-lawyers`,
              },
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: 800,
                maxPrice: 1500,
                priceCurrency: "USD",
                unitText: "MONTH",
              },
            },
          ],
        },
        ...(LAW_PLAN
          ? {
              offers: {
                "@type": "Offer",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  minPrice: LAW_PLAN.min,
                  maxPrice: LAW_PLAN.max,
                  priceCurrency: "USD",
                  unitText: "MONTH",
                },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.searchprex.com" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://www.searchprex.com/services" },
          { "@type": "ListItem", position: 3, name: "Law Firm SEO Services", item: PAGE_URL },
        ],
      },
      {
        "@type": "ImageObject",
        "@id": `${PAGE_URL}#hero-image`,
        url: "https://www.searchprex.com/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp",
        caption:
          "SearchPrex USA Law Firm SEO Services — Google Map Pack Top 3 & AI Overview Analytics Dashboard",
      },
      {
        "@type": "VideoObject",
        "@id": `${PAGE_URL}#relief-video`,
        name: "Why We Understand Your Pain: SearchPrex 9-Second Law Firm SEO Relief Briefing",
        description:
          '9-second executive briefing on why US law firms suffer from $200+ PPC click burnout and bad agency retainers, and how SearchPrex delivers relief via #1 ranked Google authority in Ohio for "Law Firm SEO Cleveland Ohio", county court practice silos, and a 7-Day Free Trial.',
        thumbnailUrl: [
          "https://www.searchprex.com/images/services/law-firm/usa-law-firm-seo-hero-dashboard.webp",
          "https://www.searchprex.com/images/services/law-firm/law-firm-relief-from-ppc-burnout.webp",
        ],
        uploadDate: "2026-10-17T08:00:00+00:00",
        duration: "PT9S",
        contentUrl: "https://www.searchprex.com/videos/law-firm-seo-relief-9s.webp",
        embedUrl: `${PAGE_URL}#relief-video`,
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: [...CAPSULES, ...FAQS].map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        id="ld-law-firm-seo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LawFirmSEOClient guide={LAW_CHECKLIST_GUIDE} />
    </>
  );
}
