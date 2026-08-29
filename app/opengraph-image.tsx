import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "SearchPrex — founder-led SEO for US law firms, ecommerce stores and local businesses";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "SearchPrex",
    kicker: "USA SEO Agency",
    title: "Founder-led SEO. No juniors. No fluff.",
    subtitle: "SEO for law firms, ecommerce stores, and local businesses across the US.",
    footer: ["Law firms", "Ecommerce", "Local"],
  });
}
