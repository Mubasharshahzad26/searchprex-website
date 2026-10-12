'use client';

import React from 'react';
import type { CityPage } from '@/lib/city-pages';
import TaglinePainBand from '../TaglinePainBand';
import PlanoHero from './PlanoHero';
import PlanoPainBanner from './PlanoPainBanner';
import PlanoQuickAnswer from './PlanoQuickAnswer';
import PlanoDiagnosisTool from './PlanoDiagnosisTool';
import PlanoCountyCourts from './PlanoCountyCourts';
import PlanoSubmarkets from './PlanoSubmarkets';
import PlanoPracticeDemand from './PlanoPracticeDemand';
import PlanoProblemTable from './PlanoProblemTable';
import PlanoProcessSteps from './PlanoProcessSteps';
import PlanoPricingAndGuarantee from './PlanoPricingAndGuarantee';
import PlanoFounderBio from './PlanoFounderBio';
import PlanoDemographyMap from './PlanoDemographyMap';
import PlanoFaqAndCta from './PlanoFaqAndCta';

interface PlanoWireframeViewProps {
  page: CityPage;
}

export default function PlanoWireframeView({ page }: PlanoWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#534AB7] selection:text-white font-sans">
      {/* 1. Hero Section */}
      <PlanoHero page={page} />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Top Pain Banner ("Confused between choosing an SEO agency in Plano?") */}
      <PlanoPainBanner id="painband-top" variant="top" />

      {/* 3. Quick Answer Card for Google AI Overviews & Perplexity */}
      <PlanoQuickAnswer />

      {/* 4. Interactive Reality Check & Diagnosis Form */}
      <PlanoDiagnosisTool />

      {/* 5. Collin County vs Denton County Court Jurisdictions */}
      <PlanoCountyCourts />

      {/* 6. Submarket Network: Frisco, Allen, McKinney, Richardson, Murphy, Prosper */}
      <PlanoSubmarkets />

      {/* 7. Practice by Practice Demand Breakdown */}
      <PlanoPracticeDemand />

      {/* 8. Problem Diagnosis Table: What you see, Probable cause, Our fix */}
      <PlanoProblemTable />

      {/* 9. End-to-End Growth Engine Services */}
      <PlanoProcessSteps />

      {/* 10. Pricing & 7-Day Free Trial */}
      <PlanoPricingAndGuarantee />

      {/* 11. Founder Accountability Bio */}
      <PlanoFounderBio />

      {/* 12. Demographics & Embedded Collin County Google Map */}
      <PlanoDemographyMap />

      {/* 13. Secondary Pain Banner ("Burnt by previous agencies with zero results") */}
      <PlanoPainBanner id="painband-bottom" variant="bottom" />

      {/* 14. Attorney FAQs & Closing Conversion Banner */}
      <PlanoFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
