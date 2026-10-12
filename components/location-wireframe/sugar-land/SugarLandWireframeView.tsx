"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import SugarLandHero from "./SugarLandHero";
import SugarLandPainBanner from "./SugarLandPainBanner";
import SugarLandQuickAnswer from "./SugarLandQuickAnswer";
import SugarLandDiagnosisTool from "./SugarLandDiagnosisTool";
import SugarLandClientArchetypes from "./SugarLandClientArchetypes";
import SugarLandFeelingsRescue from "./SugarLandFeelingsRescue";
import SugarLandRescueSteps from "./SugarLandRescueSteps";
import SugarLandPricingAndPpcComparison from "./SugarLandPricingAndPpcComparison";
import SugarLandFounderBio from "./SugarLandFounderBio";
import SugarLandDemographyMap from "./SugarLandDemographyMap";
import SugarLandNearbySubmarkets from "./SugarLandNearbySubmarkets";
import SugarLandKeywords from "./SugarLandKeywords";
import SugarLandFaqAndCta from "./SugarLandFaqAndCta";
import TaglinePainBand from "../TaglinePainBand";

interface SugarLandWireframeViewProps {
  page: CityPage;
}

export default function SugarLandWireframeView({ page }: SugarLandWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#534AB7] selection:text-white">
      {/* 1. Hero with Town Square Palms SVG & Anti-PPC Auction Positioning */}
      <SugarLandHero page={page} />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Top Pain Banner ("Confused between choosing an SEO agency / Didn't get results") */}
      <SugarLandPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card for Google AI Overviews & Perplexity */}
      <SugarLandQuickAnswer />

      {/* 4. Interactive Diagnosis Tool with Gemini API & 24-Hour Rescue Plan Form */}
      <SugarLandDiagnosisTool />

      {/* 5. What Fort Bend Clients Are Protecting (5 Core Searcher Archetypes) */}
      <SugarLandClientArchetypes />

      {/* 6. What Attorneys Feel: Overshadowed, Overbilled, Invisible & The Rescue Plan */}
      <SugarLandFeelingsRescue />

      {/* 7. Four Steps From Drowning in Ads to Calm Water (Interactive 90-Day Roadmap) */}
      <SugarLandRescueSteps />

      {/* 8. Pricing Plans ($1,200 - $2,500/mo) + 90-Day Guarantee + PPC Budget Comparison */}
      <SugarLandPricingAndPpcComparison />

      {/* 9. Founder's Personal Bio from Mubashar Sharif with Certified Credentials */}
      <SugarLandFounderBio />

      {/* 10. Local Demographics, Verified Photos & Embedded Sugar Land Google Map */}
      <SugarLandDemographyMap />

      {/* 11. Nearby Fort Bend Submarkets (Missouri City, Stafford, Richmond, Rosenberg) */}
      <SugarLandNearbySubmarkets />

      {/* 12. Semantic Legal Topics & Keyword Clusters (High-Asset Divorce, Probate, Business) */}
      <SugarLandKeywords />

      {/* 13. Attorney FAQs, Regional Texas Directories & Closing Conversion CTA */}
      <SugarLandFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
