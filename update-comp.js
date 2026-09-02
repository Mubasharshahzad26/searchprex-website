const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const campaign = await prisma.linkCampaign.findFirst({
    where: { targetDomain: 'michigansportsoutdoor.com' }
  });
  if (campaign) {
    console.log('Found campaign:', campaign.id);
    const updated = await prisma.linkCampaign.update({
      where: { id: campaign.id },
      data: { competitors: ['bladehq.com', 'chicagoknifeworks.com'] }
    });
    console.log('Updated competitors for:', updated.targetDomain);
  } else {
    console.log('Campaign not found!');
  }
}
main().finally(() => prisma.$disconnect());
