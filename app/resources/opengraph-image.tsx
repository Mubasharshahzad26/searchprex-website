import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "SearchPrex SEO resources — white papers, original research, and industry news";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Resources",
    kicker: "Free",
    title: "SEO guides, research & news",
    subtitle: "White papers, original research, and real-world learnings from live client work.",
  });
}
