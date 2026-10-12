'use client';

import React from 'react';
import type { CityPage } from '@/lib/city-pages';
import TaglinePainBand from '../TaglinePainBand';
import ShreveportHero from './ShreveportHero';
import ShreveportPainBanner from './ShreveportPainBanner';
import ShreveportQuickAnswer from './ShreveportQuickAnswer';
import ShreveportReliefQuote from './ShreveportReliefQuote';
import ShreveportDiagnosisTool from './ShreveportDiagnosisTool';
import ShreveportCountyCourts from './ShreveportCountyCourts';
import ShreveportSubmarkets from './ShreveportSubmarkets';
import ShreveportPracticeDemand from './ShreveportPracticeDemand';
import ShreveportProblemTable from './ShreveportProblemTable';
import ShreveportProcessSteps from './ShreveportProcessSteps';
import ShreveportPricingAndGuarantee from './ShreveportPricingAndGuarantee';
import ShreveportFounderBio from './ShreveportFounderBio';
import ShreveportDemographyMap from './ShreveportDemographyMap';
import ShreveportFaqAndCta from './ShreveportFaqAndCta';

interface ShreveportWireframeViewProps {
  page: CityPage;
}

export default function ShreveportWireframeView({ page }: ShreveportWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#4338ca] selection:text-white font-sans">
      {/* 1. Hero Section: Pure white background, Semrush layout, floating elements, real WebP city image */}
      <ShreveportHero page={page} />

      {/* Universal Tagline Band under Hero */}
      <TaglinePainBand />

      {/* 2. Dual Pain Points: Distant Mega-Firms vs Burned by Annual Contracts */}
      <ShreveportPainBanner />

      {/* 3. AEO Quick Answer for Google AI Overviews & ChatGPT */}
      <ShreveportQuickAnswer />

      {/* 4. Shakespeare Relief Quote: Easing the burden of law firm marketing anxiety */}
      <ShreveportReliefQuote />

      {/* 5. Interactive Practice Diagnosis & Reality Check Tool */}
      <ShreveportDiagnosisTool />

      {/* 6. Caddo Parish Court Jurisdictions & Statutory Silos */}
      <ShreveportCountyCourts />

      {/* 7. Six Ark-La-Tex Submarkets & Geo-Entity Targeting */}
      <ShreveportSubmarkets />

      {/* 8. Practice Demand Breakdown (I-20 Truck Crashes, Cross-Border, Succession, Family) */}
      <ShreveportPracticeDemand />

      {/* 9. Semrush-Style Problem Diagnosis & Fix Comparison Table */}
      <ShreveportProblemTable />

      {/* 10. 90-Day Systematic Process Steps */}
      <ShreveportProcessSteps />

      {/* 11. Transparent Pricing & Exclusivity Guarantees */}
      <ShreveportPricingAndGuarantee />

      {/* 12. Founder-Led Accountability Bio */}
      <ShreveportFounderBio />

      {/* 13. Shreveport Demographics, Real Consultation Photo, & Google Map */}
      <ShreveportDemographyMap />

      {/* 14. 8 PAA Accordion FAQs, Closing CTA Banner, and Bottom Tagline */}
      <ShreveportFaqAndCta faqs={page.faqs} />
    </div>
  );
}
