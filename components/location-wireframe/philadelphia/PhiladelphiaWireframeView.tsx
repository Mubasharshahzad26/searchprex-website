"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import PhiladelphiaHero from "./PhiladelphiaHero";
import PhiladelphiaPainBanner from "./PhiladelphiaPainBanner";
import PhiladelphiaQuickAnswer from "./PhiladelphiaQuickAnswer";
import PhiladelphiaDiagnosisTool from "./PhiladelphiaDiagnosisTool";
import PhiladelphiaOutspentVsOutranked from "./PhiladelphiaOutspentVsOutranked";
import PhiladelphiaNeighborhoodRoute from "./PhiladelphiaNeighborhoodRoute";
import PhiladelphiaHomeFieldContent from "./PhiladelphiaHomeFieldContent";
import PhiladelphiaReputationAndAI from "./PhiladelphiaReputationAndAI";
import PhiladelphiaBreakEvenCalculator from "./PhiladelphiaBreakEvenCalculator";
import PhiladelphiaThreeQuestionTriage from "./PhiladelphiaThreeQuestionTriage";
import PhiladelphiaTerritoryCheckForm from "./PhiladelphiaTerritoryCheckForm";
import PhiladelphiaTwelveMonthTimeline from "./PhiladelphiaTwelveMonthTimeline";
import PhiladelphiaFounderBio from "./PhiladelphiaFounderBio";
import PhiladelphiaNearbySubmarkets from "./PhiladelphiaNearbySubmarkets";
import PhiladelphiaDemographyMap from "./PhiladelphiaDemographyMap";
import PhiladelphiaEmotionalIntent from "./PhiladelphiaEmotionalIntent";
import PhiladelphiaKeywordCluster from "./PhiladelphiaKeywordCluster";
import PhiladelphiaFaqAndCta from "./PhiladelphiaFaqAndCta";
import TaglinePainBand from "../TaglinePainBand";
import LocationLocalCaseStudies from "../LocationLocalCaseStudies";
import LocationBlogTeaser from "../LocationBlogTeaser";

interface PhiladelphiaWireframeViewProps {
  page: CityPage;
}

export default function PhiladelphiaWireframeView({ page }: PhiladelphiaWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* 1. Hero with Stylized Philadelphia Transit Diagram */}
      <PhiladelphiaHero page={page} />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Top Pain Band */}
      <PhiladelphiaPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card */}
      <PhiladelphiaQuickAnswer />

      {/* 4. AI Problem Diagnosis Tool (Powered by Gemini API) + 7-Day Trial Lead Form */}
      <PhiladelphiaDiagnosisTool />

      {/* 5. The Market: Outspent by National Filers, Never Outranked Locally */}
      <PhiladelphiaOutspentVsOutranked />

      {/* 6. Neighborhood Route: Interactive 7-Stop Territory Explorer */}
      <PhiladelphiaNeighborhoodRoute />

      {/* 7. Home-Field Content: 4 Pennsylvania Statutory Authority Cards */}
      <PhiladelphiaHomeFieldContent />

      {/* 8. Reputation Line: Word-of-Mouth, Verified Citations & AI Prompts */}
      <PhiladelphiaReputationAndAI />

      {/* 9. Break-Even Calculator: Interactive ROI Case Modeling */}
      <PhiladelphiaBreakEvenCalculator />

      {/* 10. Three Questions: Your Personalized Strategic Roadmap */}
      <PhiladelphiaThreeQuestionTriage />

      {/* 11. Territory Exclusivity & 24h Reality Check Intake Form */}
      <PhiladelphiaTerritoryCheckForm />

      {/* 12. 12-Month Progression Timeline & Empirical Benchmarks Table */}
      <PhiladelphiaTwelveMonthTimeline />

      {/* 13. The Brain Behind It: Mubashar Sharif, CEO & Principal Strategist */}
      <PhiladelphiaFounderBio />

      {/* 14. Philadelphia Demography, Courthouses & Interactive Map */}
      <PhiladelphiaDemographyMap />

      {/* 15. Nearby Areas: Tri-County Suburban Courthouses (Media, Norristown, Doylestown) */}
      <PhiladelphiaNearbySubmarkets />

      {/* 16. Client Search Psychology & Conversion Tone of Voice */}
      <PhiladelphiaEmotionalIntent />

      {/* 17. Legal Keywords & Pennsylvania Statutory Semantic Silos */}
      <PhiladelphiaKeywordCluster />

      {/* 18. Attorney FAQ Accordion + Closing High-Contrast CTA Banner + Bottom Pain Band */}
      <LocationLocalCaseStudies page={page} />
      <LocationBlogTeaser page={page} />
      <PhiladelphiaFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
