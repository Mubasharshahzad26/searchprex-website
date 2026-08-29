import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "Get your SEO growth plan — a free 90-day roadmap from SearchPrex";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Free",
    kicker: "90-Day Roadmap",
    title: "Get your SEO growth plan",
    subtitle: "A free 90-day roadmap built around your site, niche, and goals.",
  });
}
