import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "Local SEO services from SearchPrex — own the map pack and AI Overviews";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Services",
    kicker: "Local SEO",
    title: "Local SEO Services",
    subtitle: "Own the map pack and AI Overviews. Founder-led local SEO.",
  });
}
