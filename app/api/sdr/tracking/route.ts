import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const event = await req.json();
    
    // Resend webhook events: 'email.opened', 'email.clicked', 'email.bounced'
    if (event.type === 'email.opened' || event.type === 'email.clicked') {
      const tags = event.data?.tags || [];
      const leadTag = tags.find((t: any) => t.name === 'lead_id');
      
      if (leadTag && leadTag.value) {
        const newStatus = event.type === 'email.clicked' ? 'clicked' : 'opened';
        
        // Update the lead status, but only if they haven't already responded or progressed further
        const lead = await db.aiSdrLead.findUnique({ where: { id: leadTag.value } });
        
        if (lead && (lead.status === 'emailed' || (lead.status === 'opened' && newStatus === 'clicked'))) {
           await db.aiSdrLead.update({
             where: { id: lead.id },
             data: { status: newStatus }
           });
           
           // Update the corresponding email log to show opened/clicked
           // Note: In a production app with multiple emails per lead, we would match by resend email_id
           const latestLog = await db.aiSdrEmailLog.findFirst({
             where: { leadId: lead.id },
             orderBy: { sentAt: 'desc' }
           });
           
           if (latestLog) {
             await db.aiSdrEmailLog.update({
               where: { id: latestLog.id },
               data: { status: newStatus }
             });
           }
        }
      }
    }
    
    return NextResponse.json({ success: true });
  } catch(e: any) {
    console.error("Tracking Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
