import { getMarketingPages } from "../actions";
import { PageManager } from "./page-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Pages | SearchPrex Admin",
};

export default async function PagesDashboard() {
  let pages = [];
  try {
    pages = await getMarketingPages();
  } catch (err) {
    // Graceful fallback if session / auth not ready at build or init
  }
  
  return <PageManager initialPages={pages} />;
}

