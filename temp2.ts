import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from './lib/db';

async function run() {
  try {
    const total = await db.linkProspect.count();
    const qualified = await db.linkProspect.count({ where: { status: 'qualified' } });
    const rejected = await db.linkProspect.count({ where: { status: 'rejected' } });
    const discovered = await db.linkProspect.count({ where: { status: 'discovered' } });
    const emails = await db.outreachMessage.count();
    const campaigns = await db.linkCampaign.findMany({ select: { name: true, _count: { select: { prospects: true } } } });
    
    console.log(JSON.stringify({ total, qualified, rejected, discovered, emails, campaigns }, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
run();
