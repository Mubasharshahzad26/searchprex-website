import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "SearchPrex SEO case studies — verified results from real Search Console data";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Case Studies",
    kicker: "Verified results",
    title: "Real results, real Search Console data",
    subtitle: "Law firm, ecommerce, local, and technical SEO outcomes — with the numbers behind them.",
  });
}
