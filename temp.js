require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    const total = await prisma.linkProspect.count();
    const qualified = await prisma.linkProspect.count({ where: { status: 'qualified' } });
    const rejected = await prisma.linkProspect.count({ where: { status: 'rejected' } });
    const discovered = await prisma.linkProspect.count({ where: { status: 'discovered' } });
    const emails = await prisma.outreachMessage.count();
    const campaigns = await prisma.linkCampaign.findMany({ select: { name: true, _count: { select: { prospects: true } } } });
    
    console.log({ total, qualified, rejected, discovered, emails, campaigns });
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
