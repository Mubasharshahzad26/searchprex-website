import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "Technical SEO services from SearchPrex — indexation, Core Web Vitals, schema";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Services",
    kicker: "Technical SEO",
    title: "Technical SEO Services",
    subtitle: "Indexation, Core Web Vitals, and schema — proven at 12K+ page scale.",
  });
}
