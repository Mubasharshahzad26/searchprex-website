// lib/site-schema.ts
//
// The one definition of the SearchPrex entities. app/layout.tsx renders these
// on every page; every other page refers to them by @id and never redefines
// them.
//
// Before this, the homepage alone carried three Organization nodes (layout,
// page, and a Trustpilot one under a different @id) and two
// ProfessionalService nodes, with different sameAs lists, service areas,
// phone formats and founder job titles. The about, scorecard, growth-plan and
// Kansas pages each redefined #organization or #founder again with their own
// values. Google has to pick one when nodes sharing an @id disagree, so an
// edit belongs here, not in a page.

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.searchprex.com";

export const ORGANIZATION_ID = `${SITE}/#organization`;
export const FOUNDER_ID = `${SITE}/#founder`;
export const WEBSITE_ID = `${SITE}/#website`;

export const organizationRef = { "@id": ORGANIZATION_ID };
export const founderRef = { "@id": FOUNDER_ID };
export const websiteRef = { "@id": WEBSITE_ID };

// Organization, not ProfessionalService: ProfessionalService is a LocalBusiness
// subtype, which describes a place customers visit. SearchPrex serves the US
// remotely, so a LocalBusiness at the Daska address told Google the opposite of
// what the site says. The address stays — it is the real one.
const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "SearchPrex",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo.png`,
    width: 200,
    height: 200,
  },
  description:
    "Remote-first, US-focused SEO agency helping law firms, small businesses, and ecommerce stores rank higher through senior-led technical SEO, local SEO, and AI search optimization (GEO/AEO). Active coverage across EST, CST, and PST timezones.",
  email: "contact@searchprex.com",
  telephone: "+92-305-9158010",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Mohalla Raham Colony, Near Altaf Cold Storage, Opposite Chungi No. 1",
    addressLocality: "Daska",
    addressRegion: "Punjab",
    postalCode: "51010",
    addressCountry: "PK",
  },
  founder: founderRef,
  // The whole country, rather than the hand-picked state lists that disagreed
  // between pages (5 in one block, 10 in another).
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "Law Firm SEO",
    "Personal Injury Lawyer SEO",
    "Family Law SEO",
    "Ecommerce SEO",
    "Shopify SEO",
    "WooCommerce SEO",
    "Local SEO",
    "Technical SEO",
    "Core Web Vitals",
    "E-E-A-T",
    "AI Overviews (GEO/AEO)",
    "LLM Optimization",
    "Google Indexing Recovery",
  ],
  // Every profile the hero's "Verified & Listed On" strip links to.
  sameAs: [
    "https://www.linkedin.com/company/searchprex/",
    "https://www.youtube.com/@SearchPrex",
    "https://www.trustpilot.com/review/searchprex.com",
    "https://clutch.co/profile/searchprex",
    "https://www.bbb.org/us/il/chicago/profile/searchprex",
    "https://www.g2.com/sellers/searchprex",
    "https://www.goodfirms.co/company/searchprex",
    "https://www.crunchbase.com/organization/searchprex",
    "https://www.designrush.com/agency/searchprex",
  ],
  // No aggregateRating or review: Google does not show review snippets for an
  // organization's reviews of itself, so they earn nothing here.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "SEO Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Law Firm SEO",
          url: `${SITE}/services/law-firm-seo`,
          description:
            "SEO for personal injury, family law, criminal defense, and general practice attorneys across the United States.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ecommerce & Shopify SEO",
          url: `${SITE}/services/ecommerce-seo`,
          description:
            "Ecommerce SEO for Shopify and WooCommerce stores. Product page optimization, indexing recovery, and bulk content at scale.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO",
          url: `${SITE}/services/local-seo`,
          description:
            "Local SEO for small businesses. Google Business Profile optimization, local citations, and service-area pages.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Technical SEO Audit",
          url: `${SITE}/services/technical-seo`,
          description:
            "Technical SEO audits covering crawl errors, indexing issues, Core Web Vitals, and site architecture.",
        },
      },
    ],
  },
};

const founder = {
  "@type": "Person",
  "@id": FOUNDER_ID,
  name: "Mubashar Sharif",
  jobTitle: "Founder & SEO Strategist",
  image: `${SITE}/images/mubashar-transparent.png`,
  worksFor: organizationRef,
  knowsAbout: [
    "Technical SEO",
    "Ecommerce SEO",
    "Local SEO",
    "Law Firm SEO",
    "AEO/GEO/AIO",
    "LLM Optimization",
    "Google Indexing Recovery",
  ],
  sameAs: [
    "https://www.linkedin.com/in/mubashar-sharif-senior-seo-analyst/",
    "https://www.upwork.com/freelancers/~01400266ea842005be",
    "https://medium.com/@mubasharshahzad726",
  ],
};

// No SearchAction: /search does not exist (it 404s), and Google retired the
// sitelinks search box it powered in November 2024.
const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE,
  name: "SearchPrex",
  publisher: organizationRef,
  inLanguage: "en-US",
};

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [organization, founder, website],
};
