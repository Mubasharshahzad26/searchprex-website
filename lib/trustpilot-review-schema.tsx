// Schema.org - Real Trustpilot Review Markup
// This shows Google that the reviews are verified on Trustpilot
// Add this to your app/page.tsx schemas array
 
export const trustpilotReviewSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.searchprex.com#organization-trustpilot",
  "name": "SearchPrex",
  "url": "https://www.searchprex.com",
  "review": [
    {
      "@type": "Review",
      "@id": "https://www.trustpilot.com/review/searchprex.com#review-1",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "name": "Michigan Sports & Outdoor Inc"
      },
      "reviewBody": "Highly recommend for any e-commerce business looking to scale. They are an expert at optimizing for competitive retail niches and have helped Michigan Sports Outdoor substantially increase our online visibility. Very professional, results-oriented, and easy to work with.",
      "name": "Highly recommend for any e-commerce business looking to scale",
      "datePublished": "2026-07-17",
      "isUnVerifiedClaim": false,
      "url": "https://www.trustpilot.com/review/searchprex.com"
    },
    {
      "@type": "Review",
      "@id": "https://www.trustpilot.com/review/searchprex.com#review-2",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Organization",
        "name": "Orlando Web Pros"
      },
      "reviewBody": "Great experience working with Searchprex. Their team is professional, responsive, and knowledgeable about SEO and digital marketing. We've seen solid improvements since partnering with them and would definitely recommend their services to other businesses.",
      "name": "Great experience working with Searchprex",
      "datePublished": "2026-04-06",
      "isUnVerifiedClaim": false,
      "url": "https://www.trustpilot.com/review/searchprex.com"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "3.8",
    "ratingCount": 2,
    "bestRating": "5",
    "worstRating": "1",
    "url": "https://www.trustpilot.com/review/searchprex.com"
  },
  "sameAs": ["https://www.trustpilot.com/review/searchprex.com"]
};
 
// HOW TO USE:
// 1. Import in app/page.tsx:
//    import { trustpilotReviewSchema } from "@/path/to/this/file";
//
// 2. Add to schemas array:
//    const schemas = [
//      // ...existing schemas...
//      trustpilotReviewSchema,  // ← ADD THIS
//    ];
//
// 3. Include in JSON-LD:
//    {schemas.map((schema, i) => (
//      <script key={i} type="application/ld+json"
//        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
//    ))}
 