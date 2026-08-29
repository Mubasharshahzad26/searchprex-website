import { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

// Card design and Satori constraints live in lib/og-card.tsx.
export const alt = "SearchPrex AI Intake Assistant — capture and qualify every lead, 24/7";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderOgCard({
    eyebrow: "AI Intake",
    kicker: "For law firms",
    title: "Never miss a lead again",
    subtitle: "A 24/7 assistant that captures and qualifies every inquiry in seconds.",
  });
}
