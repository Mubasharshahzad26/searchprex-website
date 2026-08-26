import { db } from "@/lib/db";
import AiSdrClient from "./AiSdrClient";

export const dynamic = "force-dynamic";

export default async function AiSdrPage() {
  const leads = await db.aiSdrLead.findMany({
    orderBy: { createdAt: "desc" },
    include: { emailLogs: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI SDR Engine</h2>
          <p className="text-muted-foreground">Automated market analysis, lead qualification, and outreach.</p>
        </div>
      </div>
      <AiSdrClient initialLeads={leads} />
    </div>
  );
}
