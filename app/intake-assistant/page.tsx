import IntakeAssistant from "@/app/components/intake-assistant/intake-assistant";
export const metadata = {
  title: "24/7 AI Intake Assistant for Law Firms — SearchPrex",
  description:
    "See how an AI intake assistant captures and qualifies every lead 24/7 — so your law firm never loses a case to a missed call. Free live demo.",
};
 
export default function IntakeAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="mx-auto max-w-4xl">
        <IntakeAssistant />
      </div>
    </div>
  );
}