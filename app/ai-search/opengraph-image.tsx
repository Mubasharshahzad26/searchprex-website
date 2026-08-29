import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx. This route used
// to inline its own copy of that JSX — it was the first card built, before the
// rest of the site's OG images turned out to be 404s too.
export const alt =
  "SearchPrex AI — ask any SEO question and get an instant, source-cited answer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "SearchPrex AI",
    kicker: "SEO Answer Engine",
    title: "Ask anything about SEO",
    subtitle: "Instant answers grounded in live Google Search — with sources.",
    footer: ["Law firms", "Ecommerce", "Local business"],
  });
}
