import { db } from './lib/db';
async function main() {
  const campaign = await db.linkCampaign.findFirst({
    where: { targetDomain: 'michigansportsoutdoor.com' }
  });
  if (campaign) {
    console.log('Found campaign:', campaign.id);
    const updated = await db.linkCampaign.update({
      where: { id: campaign.id },
      data: { competitors: ['bladehq.com', 'chicagoknifeworks.com'] }
    });
    console.log('Updated competitors for:', updated.targetDomain);
  } else {
    console.log('Campaign not found!');
  }
}
main().finally(() => process.exit(0));
