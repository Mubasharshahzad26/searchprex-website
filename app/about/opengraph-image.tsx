import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "About SearchPrex — a founder-led USA SEO agency";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "About",
    kicker: "Founder-led",
    title: "SEO run by the person you hired",
    subtitle: "No juniors, no handoffs. Founder-executed SEO for US law firms, stores, and local businesses.",
  });
}
