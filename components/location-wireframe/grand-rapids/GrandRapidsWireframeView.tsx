"use client";

// components/location-wireframe/grand-rapids/GrandRapidsWireframeView.tsx
//
// Complete high-converting wireframe implementation for Grand Rapids, Michigan
// adhering to the exact 5-page wireframe specification in "Law Firm SEO in Grand Rapids, MI.pdf":
// 1. Hero: H1 "Law Firm SEO in Grand Rapids: Qualified Leads Without the PPC Bill"
//    - Persona Switcher (Solo Attorney vs Mid-Size Firm)
//    - Rented Clicks vs Owned Compounding Visibility SVG Chart
// 2. Sound Familiar? Quiz:
//    - Interactive 5-question ad spend checklist with dynamic live score (X/5) & diagnosis
// 3. Built Around How You Actually Work:
//    - Persona-based breakdown (What Keeps You Up, What We Handle, What You Get)
// 4. The Math Nobody Shows You:
//    - Interactive PPC Cost Per Signed Case vs Organic Breakeven Calculator
// 5. Free for Grand Rapids Firms:
//    - PPC Waste Audit 24-hour lead capture form with Kent County practice fields
// 6. Four Doors Clients Knock On:
//    - Map Pack, Practice Pages, AI Answers, Reviews & Referrals
// 7. West Michigan, Not Detroit:
//    - Sub-market explorer (Downtown, East GR, Wyoming, Kentwood, Walker & Grandville)
//    - 17th Circuit Court & District Venues
// 8. Your First 90 Days:
//    - Tabbed timeline (Days 1-30, Days 31-60, Days 61-90)
// 9. What "Qualified" Means To Us:
//    - 5 tests + sample anonymized lead intake log
// 10. Honest Comparison:
//     - Google Ads vs Lead Directories vs SearchPrex Organic
// 11. Risk Reversal:
//     - 100% Asset Ownership, Month-to-Month, Ads stay on until proven
// 12. Questions from Grand Rapids Attorneys & Final Conversion Banner:
//     - Comprehensive legal FAQ accordion & "Ready to stop renting your leads?" CTA

import React from "react";
import type { CityPage } from "@/lib/city-pages";
import GrandRapidsHero from "./GrandRapidsHero";
import GrandRapidsAdSpendQuiz from "./GrandRapidsAdSpendQuiz";
import GrandRapidsPersonaCards from "./GrandRapidsPersonaCards";
import GrandRapidsRoiCalculator from "./GrandRapidsRoiCalculator";
import GrandRapidsAuditForm from "./GrandRapidsAuditForm";
import GrandRapidsFourDoors from "./GrandRapidsFourDoors";
import GrandRapidsSubMarkets from "./GrandRapidsSubMarkets";
import GrandRapidsNinetyDayPlan from "./GrandRapidsNinetyDayPlan";
import GrandRapidsQualifiedLeadTests from "./GrandRapidsQualifiedLeadTests";
import GrandRapidsComparisonMatrix from "./GrandRapidsComparisonMatrix";
import GrandRapidsRiskReversal from "./GrandRapidsRiskReversal";
import GrandRapidsFaqAndCta from "./GrandRapidsFaqAndCta";
import TaglinePainBand from "../TaglinePainBand";
import LocationLocalCaseStudies from "../LocationLocalCaseStudies";
import LocationBlogTeaser from "../LocationBlogTeaser";

interface GrandRapidsWireframeViewProps {
  page: CityPage;
}

export default function GrandRapidsWireframeView({ page }: GrandRapidsWireframeViewProps) {
  return (
    <div className="w-full bg-white text-slate-900 font-sans">
      {/* 1. Hero Section */}
      <GrandRapidsHero />

      {/* Tagline band under hero */}
      <TaglinePainBand />

      {/* 2. Interactive Ad Spend Quiz */}
      <GrandRapidsAdSpendQuiz />

      {/* 3. Persona Breakdown Cards */}
      <GrandRapidsPersonaCards />

      {/* 4. Interactive PPC vs SEO Cost Calculator */}
      <GrandRapidsRoiCalculator />

      {/* 5. 24-Hour PPC Waste Audit Form */}
      <GrandRapidsAuditForm />

      {/* 6. Four Doors Inbound Architecture */}
      <GrandRapidsFourDoors />

      {/* 7. West Michigan Sub-Markets & Courts */}
      <GrandRapidsSubMarkets />

      {/* 8. 90-Day Roadmap */}
      <GrandRapidsNinetyDayPlan />

      {/* 9. Qualified Lead Criteria & Sample Intake Log */}
      <GrandRapidsQualifiedLeadTests />

      {/* 10. Honest Channel Comparison Matrix */}
      <GrandRapidsComparisonMatrix />

      {/* 11. Risk Reversal & Guarantees */}
      <GrandRapidsRiskReversal />

      {/* 12. Local FAQs & Final Action Banner */}
      <LocationLocalCaseStudies page={page} />
      <LocationBlogTeaser page={page} />
      <GrandRapidsFaqAndCta />

      {/* Tagline band above footer */}
      <TaglinePainBand />
    </div>
  );
}
