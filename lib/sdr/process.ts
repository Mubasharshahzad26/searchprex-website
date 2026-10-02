// lib/sdr/process.ts
//
// One lead through the pipeline: qualify the store, then either save a draft
// for a person to review or record why not. Nothing here sends email. Sending
// happens only in /api/sdr/outreach, on an admin's explicit approval of a
// specific draft.
//
// Lead statuses written here:
//   qualified  — a draft is waiting for review
//   no_contact — store checked, no public email found
//   rejected   — unreachable, unsupported platform, too small, or no finding
// The reason is kept in `analysis` (JSON), next to everything the check saw.

import { db } from "@/lib/db";
import { qualifyStore, type Qualification } from "./qualify";
import { buildDraft } from "./draft";

export interface StoredAnalysis {
  qualification: Qualification;
  decision: "drafted" | "skipped";
  reason?: string;
  finding?: string;
}

export function readAnalysis(raw: string | null | undefined): StoredAnalysis | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && "qualification" in parsed ? (parsed as StoredAnalysis) : null;
  } catch {
    return null; // older free-text analysis from the previous Gemini pipeline
  }
}

export async function processLead(leadId: string) {
  const lead = await db.aiSdrLead.findUnique({ where: { id: leadId } });
  if (!lead) throw new Error("Lead not found");

  const q = await qualifyStore(lead.websiteUrl);
  // A contact address already on the lead (CSV, webhook) wins over a scraped one.
  if (lead.contactEmail) q.email = lead.contactEmail;
  const draft = buildDraft(q);

  if (!draft.ok) {
    const status = q.ok && !q.email ? "no_contact" : "rejected";
    const analysis: StoredAnalysis = { qualification: q, decision: "skipped", reason: draft.reason };
    return db.aiSdrLead.update({
      where: { id: lead.id },
      data: { status, analysis: JSON.stringify(analysis), contactEmail: lead.contactEmail ?? q.email ?? null },
      include: { emailLogs: true },
    });
  }

  // Replace any earlier unsent draft rather than stacking them.
  await db.aiSdrEmailLog.deleteMany({ where: { leadId: lead.id, status: "draft" } });
  await db.aiSdrEmailLog.create({
    data: { leadId: lead.id, subject: draft.subject, body: draft.body, status: "draft" },
  });

  const analysis: StoredAnalysis = { qualification: q, decision: "drafted", finding: draft.finding.text };
  return db.aiSdrLead.update({
    where: { id: lead.id },
    data: {
      status: "qualified",
      analysis: JSON.stringify(analysis),
      contactEmail: q.email ?? null,
      companyName: lead.companyName && lead.companyName !== "Unknown" ? lead.companyName : q.homeTitle?.slice(0, 120) ?? lead.companyName,
    },
    include: { emailLogs: true },
  });
}
