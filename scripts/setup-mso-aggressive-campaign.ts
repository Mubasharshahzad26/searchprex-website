import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';

async function main() {
  console.log('--- Setting up MSO Aggressive Backlink Campaign ---');

  const client = await db.client.findFirst({
    where: {
      OR: [
        { domain: 'michigansportsoutdoor.com' },
        { companyName: 'Michigan Sports Outdoor' },
      ],
    },
  });

  if (!client) {
    throw new Error('Michigan Sports Outdoor client not found in database!');
  }

  console.log(`Found MSO Client: ${client.id} (${client.companyName})`);

  // Aggressive campaign parameters
  const campaignData = {
    name: 'Michigan Sports Outdoor Backlinks',
    targetDomain: 'michigansportsoutdoor.com',
    enabled: true,
    dryRunMode: true,
    requiresApproval: true,
    verifyIntervalDays: 3, // Check links every 3 days for aggressive monitoring
    competitors: [
      'bladehq.com',
      'chicagoknifeworks.com',
      'knifecenter.com',
      'smkw.com',
      'dlttrading.com',
      'gpknives.com',
    ],
    topic: 'pocket knives and outdoor gear',
    seedUrls: [
      'https://akti.org/resources',
      'https://bloggers.feedspot.com/knife_blogs',
      'https://bloggers.feedspot.com/edc_blogs',
      'https://bushcraftusa.com',
      'https://edcforums.com',
      'https://knifeinformer.com/knife-knowledge',
      'https://gearjunkie.com/knives',
      'https://everydaycarry.com',
    ],
  };

  // Find existing MSO campaign or create new
  let campaign = await db.linkCampaign.findFirst({
    where: {
      clientId: client.id,
      targetDomain: 'michigansportsoutdoor.com',
    },
  });

  if (campaign) {
    campaign = await db.linkCampaign.update({
      where: { id: campaign.id },
      data: campaignData,
    });
    console.log(`✓ Updated existing MSO Campaign: ${campaign.id}`);
  } else {
    campaign = await db.linkCampaign.create({
      data: {
        clientId: client.id,
        ...campaignData,
      },
    });
    console.log(`✓ Created new MSO Campaign: ${campaign.id}`);
  }

  console.log('\nAggressive Campaign Status:');
  console.log({
    id: campaign.id,
    name: campaign.name,
    targetDomain: campaign.targetDomain,
    verifyIntervalDays: campaign.verifyIntervalDays,
    competitorsCount: campaign.competitors.length,
    competitors: campaign.competitors,
    topic: campaign.topic,
    seedsCount: campaign.seedUrls.length,
  });
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
