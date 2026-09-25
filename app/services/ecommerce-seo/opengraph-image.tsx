import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx. Replaces a
// hardcoded /images/og-ecommerce-seo.jpg that never existed.
export const alt = "Ecommerce SEO services from SearchPrex — indexing recovery, product content, Core Web Vitals";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Services",
    kicker: "Ecommerce SEO",
    title: "Ecommerce SEO Services",
    subtitle: "Indexing recovery and product content — SMK Store: $5,832 to $19,100 a month.",
  });
}
