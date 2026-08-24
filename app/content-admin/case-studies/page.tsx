import { getMarketingCaseStudies } from "../actions";
import { CaseStudyManager } from "./case-study-manager";

export const metadata = {
  title: "Manage Case Studies | SearchPrex Admin",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getMarketingCaseStudies();
  
  return <CaseStudyManager initialCaseStudies={caseStudies} />;
}

