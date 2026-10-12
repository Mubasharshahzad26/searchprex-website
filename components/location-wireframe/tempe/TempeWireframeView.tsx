"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import TaglinePainBand from "../TaglinePainBand";
import TempeHero from "./TempeHero";
import TempeQuickAnswer from "./TempeQuickAnswer";
import TempeAsuAndCorridorMatrix from "./TempeAsuAndCorridorMatrix";
import TempePracticeDemand from "./TempePracticeDemand";
import TempeCountyCourts from "./TempeCountyCourts";
import TempeProblemTable from "./TempeProblemTable";
import TempeDiagnosisTool from "./TempeDiagnosisTool";
import TempeSubmarkets from "./TempeSubmarkets";
import TempeProcessSteps from "./TempeProcessSteps";
import TempeReliefQuote from "./TempeReliefQuote";
import TempePricingAndGuarantee from "./TempePricingAndGuarantee";
import TempeDemographyMap from "./TempeDemographyMap";
import TempeFounderBio from "./TempeFounderBio";
import TempeFaqAndCta from "./TempeFaqAndCta";

interface TempeWireframeViewProps {
  page: CityPage;
}

export default function TempeWireframeView({ page }: TempeWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      <TempeHero page={page} />
      <TaglinePainBand />
      <TempeQuickAnswer />
      <TempeAsuAndCorridorMatrix />
      <TempePracticeDemand />
      <TempeCountyCourts />
      <TempeProblemTable />
      <TempeDiagnosisTool />
      <TempeSubmarkets />
      <TempeProcessSteps />
      <TempeReliefQuote />
      <TempePricingAndGuarantee />
      <TempeDemographyMap />
      <TempeFounderBio />
      <TempeFaqAndCta faqs={page.faqs} />
    </div>
  );
}
