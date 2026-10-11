"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import DentonHero from "./DentonHero";
import DentonPainBanner from "./DentonPainBanner";
import DentonQuickAnswer from "./DentonQuickAnswer";
import DentonDiagnosisTool from "./DentonDiagnosisTool";
import DentonBurdenLifted from "./DentonBurdenLifted";
import DentonWhyIUnderstand from "./DentonWhyIUnderstand";
import DentonSearcherProfile from "./DentonSearcherProfile";
import DentonPlatformVisibility from "./DentonPlatformVisibility";
import DentonPricingAndGuarantee from "./DentonPricingAndGuarantee";
import DentonFirst90Days from "./DentonFirst90Days";
import DentonFounderLetter from "./DentonFounderLetter";
import DentonDemographyMap from "./DentonDemographyMap";
import DentonNearbySubmarkets from "./DentonNearbySubmarkets";
import DentonKeywordCluster from "./DentonKeywordCluster";
import DentonFaqAndCta from "./DentonFaqAndCta";

interface DentonWireframeViewProps {
  page: CityPage;
}

export default function DentonWireframeView({ page }: DentonWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#534AB7] selection:text-white">
      {/* 1. Hero with Denton Courthouse-on-the-Square Sunrise SVG & Direct Trust Chips */}
      <DentonHero page={page} />

      {/* 2. Top Pain Banner ("Confused between choosing an SEO agency / Didn't get results") */}
      <DentonPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card for Google AI Overviews */}
      <DentonQuickAnswer />

      {/* 4. Interactive Diagnosis Tool with Gemini API & Reality Check Lead Form */}
      <DentonDiagnosisTool />

      {/* 5. What You Lay Down When I Pick This Up (Interactive 6-Burden Relief Checklist) */}
      <DentonBurdenLifted />

      {/* 6. Why I Understand What You Are Dealing With (5 Foundational Alignment Pillars) */}
      <DentonWhyIUnderstand />

      {/* 7. Who Is Actually Searching in Denton (5 High-Converting Searcher Archetypes) */}
      <DentonSearcherProfile />

      {/* 8. Where Your Practice Needs to Appear & What Counts as a Good Call */}
      <DentonPlatformVisibility />

      {/* 9. Investment Plans & 90-Day Written Guarantee + Case Fee Arithmetic Calculator */}
      <DentonPricingAndGuarantee />

      {/* 10. Your First 90 Days with Me (Interactive Journey Timeline & Guarantee Checkpoints) */}
      <DentonFirst90Days />

      {/* 11. Founder's Personal Note from Mubashar Sharif with Certified Badges */}
      <DentonFounderLetter />

      {/* 12. Local Demographics, Verified Photos & Embedded Denton Google Map */}
      <DentonDemographyMap />

      {/* 13. Nearby Denton County Submarkets (Lewisville, Flower Mound, Frisco, Little Elm, etc.) */}
      <DentonNearbySubmarkets />

      {/* 14. Semantic Entity Clouds & Keyword Clusters (Criminal Defense, Family Law, Landlord-Tenant) */}
      <DentonKeywordCluster />

      {/* 15. Direct 24-Hour Review Intake Form, Denton Attorney FAQs, Contextual Links & CTA */}
      <DentonFaqAndCta />
    </div>
  );
}
