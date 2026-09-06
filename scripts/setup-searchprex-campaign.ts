import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';

async function setup() {
  console.log('--- Setting up SearchPrex Client & Link Campaign ---');

  // 1. Find or create Client
  let client = await db.client.findFirst({
    where: {
      OR: [
        { domain: 'searchprex.com' },
        { companyName: 'SearchPrex' },
      ],
    },
  });

  if (!client) {
    client = await db.client.create({
      data: {
        companyName: 'SearchPrex',
        email: 'contact@searchprex.com',
        domain: 'searchprex.com',
      },
    });
    console.log(`Created new Client: ${client.id} (${client.companyName})`);
  } else {
    console.log(`Found existing Client: ${client.id} (${client.companyName})`);
  }

  // 2. Find or create LinkCampaign
  let campaign = await db.linkCampaign.findFirst({
    where: {
      clientId: client.id,
      targetDomain: 'searchprex.com',
    },
  });

  const campaignData = {
    clientId: client.id,
    name: 'SearchPrex SEO Backlinks',
    targetDomain: 'searchprex.com',
    enabled: true,
    dryRunMode: true,
    requiresApproval: true,
    verifyIntervalDays: 7,
    competitors: [
      'victoriousseo.com',
      'coalitiontechnologies.com',
      'webfx.com',
      'straightnorth.com',
    ],
    topic: 'SEO agency B2B SaaS legal ecommerce SEO digital marketing',
    seedUrls: [
      'https://clutch.co/seo-firms',
      'https://www.designrush.com/agency/search-engine-optimization',
      'https://upcity.com/seo',
      'https://www.goodfirms.co/marketing-services/seo',
    ],
  };

  if (!campaign) {
    campaign = await db.linkCampaign.create({
      data: campaignData,
    });
    console.log(`Created new LinkCampaign: ${campaign.id} (${campaign.name})`);
  } else {
    campaign = await db.linkCampaign.update({
      where: { id: campaign.id },
      data: {
        enabled: true,
        competitors: campaignData.competitors,
        topic: campaignData.topic,
        seedUrls: campaignData.seedUrls,
      },
    });
    console.log(`Updated existing LinkCampaign: ${campaign.id} (${campaign.name})`);
  }

  console.log('\nCampaign Details:');
  console.log({
    id: campaign.id,
    name: campaign.name,
    targetDomain: campaign.targetDomain,
    enabled: campaign.enabled,
    competitors: campaign.competitors,
    topic: campaign.topic,
    seedUrlsCount: campaign.seedUrls.length,
  });
}

setup()
  .catch(console.error)
  .finally(() => db.$disconnect());
