import { getMarketingResources } from "../actions";
import { ResourceManager } from "./resource-manager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Manage Resources | SearchPrex Admin",
};

export default async function ResourcesPage() {
  let resources = [];
  try {
    resources = await getMarketingResources();
  } catch (err) {
    // Graceful fallback if session / auth not ready at build or init
  }
  
  return <ResourceManager initialResources={resources} />;
}
