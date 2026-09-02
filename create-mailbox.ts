import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const mailbox = await prisma.outreachMailbox.create({
    data: {
      label: 'Main Outreach Domain',
      fromEmail: 'hello@outreach.searchprex.com',
      fromName: 'Mubashar',
      warmingUp: true,
      dailyCap: 25
    }
  });
  console.log('Mailbox:', mailbox);
}
main().finally(() => prisma.$disconnect());
