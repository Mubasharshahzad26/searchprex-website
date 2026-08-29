import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "Law firm SEO services from SearchPrex — local pack and AI Overview visibility";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Services",
    kicker: "Law Firm SEO",
    title: "Law Firm SEO Services",
    subtitle: "Rank in the local pack and AI Overviews. Founder-led, YMYL-aligned.",
  });
}
