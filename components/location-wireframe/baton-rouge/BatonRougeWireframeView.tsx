"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import TaglinePainBand from "../TaglinePainBand";
import BatonRougeHero from "./BatonRougeHero";
import BatonRougeCivilCodeAdvantage from "./BatonRougeCivilCodeAdvantage";
import BatonRougeCountyCourts from "./BatonRougeCountyCourts";
import BatonRougeQuickAnswer from "./BatonRougeQuickAnswer";
import BatonRougePracticeDemand from "./BatonRougePracticeDemand";
import BatonRougeProblemTable from "./BatonRougeProblemTable";
import BatonRougeSubmarkets from "./BatonRougeSubmarkets";
import BatonRougeProcessSteps from "./BatonRougeProcessSteps";
import BatonRougeDiagnosisTool from "./BatonRougeDiagnosisTool";
import BatonRougePricingAndGuarantee from "./BatonRougePricingAndGuarantee";
import BatonRougeReliefQuote from "./BatonRougeReliefQuote";
import BatonRougeDemographyMap from "./BatonRougeDemographyMap";
import BatonRougeFounderBio from "./BatonRougeFounderBio";
import BatonRougeFaqAndCta from "./BatonRougeFaqAndCta";

interface BatonRougeWireframeViewProps {
  page: CityPage;
}

export default function BatonRougeWireframeView({ page }: BatonRougeWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      <BatonRougeHero page={page} />
      <TaglinePainBand />
      <BatonRougeCivilCodeAdvantage />
      <BatonRougeCountyCourts />
      <BatonRougeQuickAnswer />
      <BatonRougePracticeDemand />
      <BatonRougeProblemTable />
      <BatonRougeSubmarkets />
      <BatonRougeProcessSteps />
      <BatonRougeDiagnosisTool />
      <BatonRougePricingAndGuarantee />
      <BatonRougeReliefQuote />
      <BatonRougeDemographyMap />
      <BatonRougeFounderBio />
      <BatonRougeFaqAndCta faqs={page.faqs} />
    </div>
  );
}
