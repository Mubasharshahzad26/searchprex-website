// Schema.org - Real Trustpilot Review Markup
// This shows Google that the review is verified on Trustpilot
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
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "ratingCount": 1,
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
 