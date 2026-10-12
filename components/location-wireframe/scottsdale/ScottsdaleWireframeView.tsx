"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import TaglinePainBand from "../TaglinePainBand";
import ScottsdaleHero from "./ScottsdaleHero";
import ScottsdaleQuickAnswer from "./ScottsdaleQuickAnswer";
import ScottsdaleWealthAndDivorceSilo from "./ScottsdaleWealthAndDivorceSilo";
import ScottsdaleCountyCourts from "./ScottsdaleCountyCourts";
import ScottsdalePracticeDemand from "./ScottsdalePracticeDemand";
import ScottsdaleSubmarkets from "./ScottsdaleSubmarkets";
import ScottsdalePainBanner from "./ScottsdalePainBanner";
import ScottsdaleProcessSteps from "./ScottsdaleProcessSteps";
import ScottsdaleProblemTable from "./ScottsdaleProblemTable";
import ScottsdalePricingAndGuarantee from "./ScottsdalePricingAndGuarantee";
import ScottsdaleReliefQuote from "./ScottsdaleReliefQuote";
import ScottsdaleDiagnosisTool from "./ScottsdaleDiagnosisTool";
import ScottsdaleDemographyMap from "./ScottsdaleDemographyMap";
import ScottsdaleFounderBio from "./ScottsdaleFounderBio";
import ScottsdaleFaqAndCta from "./ScottsdaleFaqAndCta";

interface ScottsdaleWireframeViewProps {
  page: CityPage;
}

export default function ScottsdaleWireframeView({ page }: ScottsdaleWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      <ScottsdaleHero page={page} />
      <ScottsdaleQuickAnswer />
      <ScottsdaleWealthAndDivorceSilo />
      <ScottsdaleCountyCourts />
      <ScottsdalePracticeDemand />
      <ScottsdaleSubmarkets />
      <ScottsdalePainBanner />
      <ScottsdaleProcessSteps />
      <ScottsdaleProblemTable />
      <ScottsdalePricingAndGuarantee />
      <ScottsdaleReliefQuote />
      <ScottsdaleDiagnosisTool />
      <ScottsdaleDemographyMap />
      <ScottsdaleFounderBio />
      <ScottsdaleFaqAndCta faqs={page.faqs} />
      <TaglinePainBand />
    </div>
  );
}
