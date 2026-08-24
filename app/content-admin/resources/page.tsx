import { getMarketingResources } from "../actions";
import { ResourceManager } from "./resource-manager";

export const metadata = {
  title: "Manage Resources | SearchPrex Admin",
};

export default async function ResourcesPage() {
  const resources = await getMarketingResources();
  
  return <ResourceManager initialResources={resources} />;
}
