const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.aiSdrLead.deleteMany({
    where: { websiteUrl: { contains: "google.com/goto" } }
  });
  console.log("Deleted broken goto links");
}
main().finally(() => prisma.$disconnect());
