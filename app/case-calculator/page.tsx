import CaseCalculator from "@/app/components/case-calculator/case-calculator";
export const metadata = {
  title: "Personal Injury Lost Case Calculator — SearchPrex",
  description:
    "See how much revenue your personal injury firm is leaking from SEO visibility gaps and slow client intake. Free, instant estimate based on real local search demand.",
};
 
export default function CaseCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-4xl">
        <CaseCalculator />
      </div>
    </div>
  );
}
 