import { PersonaProvider } from "@/context/PersonaContext";
 
// ── Active homepage sections (render order) ──
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Results from "@/components/Results";
import Process from "@/components/Process";
import Comparison from "@/components/Comparison";
import AnxietyResolver from "@/components/AnxietyResolver";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
 
// ── Removed from homepage (files still in repo — uncomment to re-add) ──
// import PersonaSwitcher from "@/components/PersonaSwitcher";   // redundant: Hero already has the "I'm looking for" toggle
// import AudienceSections from "@/components/AudienceSections"; // overlaps AnxietyResolver + uses a separate persona context Hero doesn't drive
// import ROICalculator from "@/components/ROICalculator";       // better on /pricing or a Tools page (too heavy on homepage)
// import Reviews from "@/components/Reviews";                   // re-add ONLY with real, verifiable reviews (placeholder = E-E-A-T risk)
 
export default function Home() {
  return (
    <PersonaProvider>
      {/* 1 · HOOK — grab attention, capture lead, persona toggle */}
      <Hero />
 
      {/* 2 · SOLUTION — what we actually do */}
      <Services />
 
      {/* 3 · PROOF — real GSC case-study numbers (trust early) */}
      <Results />
 
      {/* 4 · HOW — our process, step by step */}
      <Process />
 
      {/* 5 · WHY US — SearchPrex vs other agencies */}
      <Comparison />
 
      {/* 6 · OBJECTIONS — address the fears head-on */}
      <AnxietyResolver />
 
      {/* 7 · PRICE — transparent pricing */}
      <Pricing />
 
      {/* 8 · FAQ — final objections + FAQ schema for AI Overviews */}
      <FAQ />
 
      {/* 9 · CONVERT — final call to action */}
      <CTA />
 
      {/* ── If you have REAL reviews, add <Reviews /> right after <Results /> ── */}
    </PersonaProvider>
  );
}
 































































