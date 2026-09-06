import { getMarketingCaseStudies } from "../actions";
import { CaseStudyManager } from "./case-study-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Case Studies | SearchPrex Admin",
};

export default async function CaseStudiesPage() {
  let caseStudies = [];
  try {
    caseStudies = await getMarketingCaseStudies();
  } catch (err) {
    // Graceful fallback if session / auth not ready at build or init
  }
  
  return <CaseStudyManager initialCaseStudies={caseStudies} />;
}

