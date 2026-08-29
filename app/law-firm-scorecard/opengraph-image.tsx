import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "Free law firm SEO scorecard — grade your Google and AI visibility";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Free Scorecard",
    kicker: "For law firms",
    title: "Grade your firm's visibility",
    subtitle: "See how your firm shows up across Google and AI search — in minutes.",
  });
}
