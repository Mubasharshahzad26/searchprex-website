// lib/pricing.ts
//
// The one source for the monthly retainer ranges. components/Pricing.tsx
// renders them and app/pricing/page.tsx builds its Offer schema and meta
// description from them.
//
// It lives outside Pricing.tsx because that file is "use client", and a server
// component cannot import plain data from a client module. Before this, the
// /pricing schema carried its own invented tiers ("Beginning Plan $1,500",
// "Agency Level Plan $3,500") that the page never showed.

export interface RetainerPlan {
  niche: string;
  min: number;
  max: number;
  best: string;
  includes: string[];
  accent: string;
  bg: string;
  featured?: boolean;
}

export const RETAINER_PLANS: RetainerPlan[] = [
  {
    niche: "Local SEO",
    min: 800,
    max: 1500,
    best: "Local service businesses",
    includes: ["GBP & map pack", "Citations & NAP", "Local content"],
    accent: "#0e7490",
    bg: "#ecfeff",
  },
  {
    niche: "Law Firm SEO",
    min: 1200,
    max: 2500,
    best: "Solo to multi-partner firms",
    includes: ["Practice-area pages", "E-E-A-T content", "Local pack targeting"],
    accent: "#534AB7",
    bg: "#f5f3ff",
    featured: true,
  },
  {
    niche: "Ecommerce SEO",
    min: 1500,
    max: 4000,
    best: "Shopify & WooCommerce stores",
    includes: ["Technical SEO at scale", "Product page content", "Schema & indexing"],
    accent: "#196b4d",
    bg: "#dcf2ea",
  },
];

export const formatUsd = (n: number) => `$${n.toLocaleString("en-US")}`;

export const formatRange = (p: RetainerPlan) => `${formatUsd(p.min)} – ${formatUsd(p.max)}`;

export const LOWEST_RETAINER = Math.min(...RETAINER_PLANS.map((p) => p.min));
