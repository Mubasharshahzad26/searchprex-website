'use client';

import React from 'react';
import type { CityPage } from '@/lib/city-pages';
import TaglinePainBand from '../TaglinePainBand';
import TempeHero from './TempeHero';
import TempePainBanner from './TempePainBanner';
import TempeQuickAnswer from './TempeQuickAnswer';
import TempeReliefQuote from './TempeReliefQuote';
import TempeDiagnosisTool from './TempeDiagnosisTool';
import TempeCountyCourts from './TempeCountyCourts';
import TempeSubmarkets from './TempeSubmarkets';
import TempePracticeDemand from './TempePracticeDemand';
import TempeProblemTable from './TempeProblemTable';
import TempeProcessSteps from './TempeProcessSteps';
import TempePricingAndGuarantee from './TempePricingAndGuarantee';
import TempeFounderBio from './TempeFounderBio';
import TempeDemographyMap from './TempeDemographyMap';
import TempeFaqAndCta from './TempeFaqAndCta';

interface TempeWireframeViewProps {
  page: CityPage;
}

export default function TempeWireframeView({ page }: TempeWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 selection:bg-[#4338ca] selection:text-white font-sans">
      {/* 1. Hero Section: Pure white background, Semrush layout, floating elements, real WebP city image */}
      <TempeHero page={page} />

      {/* Universal Tagline Band under Hero */}
      <TaglinePainBand />

      {/* 2. Dual Pain Points: Agency Obfuscation vs Burned by 12-Month Contracts */}
      <TempePainBanner />

      {/* 3. AEO Quick Answer for Google AI Overviews & ChatGPT */}
      <TempeQuickAnswer />

      {/* 4. Shakespeare Relief Quote: Easing the burden of law firm marketing anxiety */}
      <TempeReliefQuote />

      {/* 5. Interactive Practice Diagnosis & Reality Check Tool */}
      <TempeDiagnosisTool />

      {/* 6. Maricopa County Court Jurisdictions & Statutory Silos */}
      <TempeCountyCourts />

      {/* 7. Six East Valley Submarkets & Geo-Entity Targeting */}
      <TempeSubmarkets />

      {/* 8. Practice Demand Breakdown (DUI, Criminal, Injury, Family Law) */}
      <TempePracticeDemand />

      {/* 9. Semrush-Style Problem Diagnosis & Fix Comparison Table */}
      <TempeProblemTable />

      {/* 10. 90-Day Systematic Process Steps */}
      <TempeProcessSteps />

      {/* 11. Transparent Pricing & Exclusivity Guarantees */}
      <TempePricingAndGuarantee />

      {/* 12. Founder-Led Accountability Bio */}
      <TempeFounderBio />

      {/* 13. Tempe Demographics, Real Consultation Photo, & Google Map */}
      <TempeDemographyMap />

      {/* 14. 8 PAA Accordion FAQs, Closing CTA Banner, and Bottom Tagline */}
      <TempeFaqAndCta faqs={page.faqs} />
    </div>
  );
}
