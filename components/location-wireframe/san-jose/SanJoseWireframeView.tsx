"use client";

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import LocationLocalCaseStudies from "../LocationLocalCaseStudies";
import LocationBlogTeaser from "../LocationBlogTeaser";
import SanJoseHero from "./SanJoseHero";
import SanJoseSiliconValleyEntityLab from "./SanJoseSiliconValleyEntityLab";
import SanJoseQuickAnswer from "./SanJoseQuickAnswer";
import SanJosePracticeDemand from "./SanJosePracticeDemand";
import SanJoseSubmarkets from "./SanJoseSubmarkets";
import SanJoseCountyCourts from "./SanJoseCountyCourts";
import SanJoseDiagnosisTool from "./SanJoseDiagnosisTool";
import SanJoseProblemTable from "./SanJoseProblemTable";
import SanJoseReliefQuote from "./SanJoseReliefQuote";
import SanJoseProcessSteps from "./SanJoseProcessSteps";
import SanJoseDemographyMap from "./SanJoseDemographyMap";
import SanJosePricingAndGuarantee from "./SanJosePricingAndGuarantee";
import SanJoseFounderBio from "./SanJoseFounderBio";
import SanJoseFaqAndCta from "./SanJoseFaqAndCta";

interface SanJoseWireframeViewProps {
  page: CityPage;
}

export default function SanJoseWireframeView({ page }: SanJoseWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-neutral-900 selection:text-white font-sans">
      <SanJoseHero page={page} />
      <SanJoseSiliconValleyEntityLab />
      <SanJoseQuickAnswer />
      <SanJosePracticeDemand />
      <SanJoseSubmarkets />
      <SanJoseCountyCourts />
      <SanJoseDiagnosisTool />
      <SanJoseProblemTable />
      <SanJoseReliefQuote />
      <SanJoseProcessSteps />
      <SanJoseDemographyMap />
      <SanJosePricingAndGuarantee />
      <SanJoseFounderBio />
      <LocationLocalCaseStudies page={page} />
      <LocationBlogTeaser page={page} />
      <SanJoseFaqAndCta faqs={page.faqs} />
    </div>
  );
}
