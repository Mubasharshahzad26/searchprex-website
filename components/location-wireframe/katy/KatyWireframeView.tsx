"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import KatyHero from "./KatyHero";
import KatyPainBanner from "./KatyPainBanner";
import KatyQuickAnswer from "./KatyQuickAnswer";
import KatyDiagnosisTool from "./KatyDiagnosisTool";
import KatyTriCountyCrossroads from "./KatyTriCountyCrossroads";
import KatyVsHoustonPillars from "./KatyVsHoustonPillars";
import KatyCommunities from "./KatyCommunities";
import KatyHighwayCorridors from "./KatyHighwayCorridors";
import KatyProcessExits from "./KatyProcessExits";
import KatyPricingAndCalculator from "./KatyPricingAndCalculator";
import KatyFounderBio from "./KatyFounderBio";
import KatyDemographyMap from "./KatyDemographyMap";
import KatyFaqAndCta from "./KatyFaqAndCta";
import TaglinePainBand from "../TaglinePainBand";
import LocationLocalCaseStudies from "../LocationLocalCaseStudies";
import LocationBlogTeaser from "../LocationBlogTeaser";

interface KatyWireframeViewProps {
  page: CityPage;
}

export default function KatyWireframeView({ page }: KatyWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* 1. Hero with Crossroads Typography & I-10 / SH 99 Highway Crossroads SVG */}
      <KatyHero page={page} />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Top Pain Banner ("Confused between choosing an SEO agency / Didn't get results") */}
      <KatyPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card for Google AI Overviews & Perplexity */}
      <KatyQuickAnswer />

      {/* 4. Interactive Diagnosis Tool with Gemini API & Katy Reality Check Form */}
      <KatyDiagnosisTool />

      {/* 5. The Crossroads: Which Courthouse Handles a Katy Case (Interactive Tri-County SVG Map) */}
      <KatyTriCountyCrossroads />

      {/* 6. Katy, Not Houston: 3 Foundational Alignment Pillars Displacing Mega-Firms */}
      <KatyVsHoustonPillars />

      {/* 7. Master-Planned Communities: Cinco Ranch, Fulshear, Brookshire & Beyond */}
      <KatyCommunities />

      {/* 8. High-Intent Transit Corridors: I-10, Grand Parkway & Westpark Tollway */}
      <KatyHighwayCorridors />

      {/* 9. Three Exits From Invisible to Found (Audit, Build, Prove) */}
      <KatyProcessExits />

      {/* 10. Pricing Plans ($1,200 - $2,500/mo) + 90-Day Guarantee + Case ROI Calculator */}
      <KatyPricingAndCalculator />

      {/* 11. Founder's Personal Bio from Mubashar Sharif with Certified Credentials */}
      <KatyFounderBio />

      {/* 12. Geographic & Demographic Analysis with Verified Images & Embedded Map */}
      <KatyDemographyMap />

      {/* 13. Attorney FAQs, Regional Texas Directories & Closing Conversion CTA */}
      <LocationLocalCaseStudies page={page} />
      <LocationBlogTeaser page={page} />
      <KatyFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
