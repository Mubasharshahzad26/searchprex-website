const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const leads = await prisma.aiSdrLead.findMany({
    select: { websiteUrl: true, status: true, score: true }
  });
  console.log(leads);
}
main().finally(() => prisma.$disconnect());
