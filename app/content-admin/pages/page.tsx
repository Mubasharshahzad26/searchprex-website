import { getMarketingPages } from "../actions";
import { PageManager } from "./page-manager";

export const metadata = {
  title: "Manage Pages | SearchPrex Admin",
};

export default async function PagesDashboard() {
  const pages = await getMarketingPages();
  
  return <PageManager initialPages={pages} />;
}

