"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import ShreveportHero from "./ShreveportHero";
import ShreveportQuickAnswer from "./ShreveportQuickAnswer";
import ShreveportArkLaTexCorridorMap from "./ShreveportArkLaTexCorridorMap";
import ShreveportPracticeDemand from "./ShreveportPracticeDemand";
import ShreveportCountyCourts from "./ShreveportCountyCourts";
import ShreveportSubmarkets from "./ShreveportSubmarkets";
import ShreveportDiagnosisTool from "./ShreveportDiagnosisTool";
import ShreveportProcessSteps from "./ShreveportProcessSteps";
import ShreveportProblemTable from "./ShreveportProblemTable";
import ShreveportReliefQuote from "./ShreveportReliefQuote";
import ShreveportDemographyMap from "./ShreveportDemographyMap";
import ShreveportPricingAndGuarantee from "./ShreveportPricingAndGuarantee";
import ShreveportFounderBio from "./ShreveportFounderBio";
import ShreveportFaqAndCta from "./ShreveportFaqAndCta";

interface ShreveportWireframeViewProps {
  page: CityPage;
}

export default function ShreveportWireframeView({ page }: ShreveportWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      <ShreveportHero page={page} />
      <ShreveportQuickAnswer />
      <ShreveportArkLaTexCorridorMap />
      <ShreveportPracticeDemand />
      <ShreveportCountyCourts />
      <ShreveportSubmarkets />
      <ShreveportDiagnosisTool />
      <ShreveportProcessSteps />
      <ShreveportProblemTable />
      <ShreveportReliefQuote />
      <ShreveportDemographyMap />
      <ShreveportPricingAndGuarantee />
      <ShreveportFounderBio />
      <ShreveportFaqAndCta faqs={page.faqs} />
    </div>
  );
}
