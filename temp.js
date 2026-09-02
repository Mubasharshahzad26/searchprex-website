require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
  try {
    const existing = await prisma.outreachMailbox.findFirst();
    if (existing) {
      console.log('ID:', existing.id);
      return;
    }
    const mailbox = await prisma.outreachMailbox.create({
      data: {
        label: 'Main Outreach',
        fromEmail: 'hello@outreach.searchprex.com',
        fromName: 'Mubashar',
        warmingUp: true,
        dailyCap: 25
      }
    });
    console.log('ID:', mailbox.id);
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
