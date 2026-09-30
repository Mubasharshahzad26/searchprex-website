import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';
import { buildCitationQueue } from '../lib/linkbuilding/citation-run';

async function setup() {
  console.log('--- Setting up SearchPrex White-Hat Authority Campaign ---');

  // 1. Find or create SearchPrex Client
  let client = await db.client.findFirst({
    where: {
      OR: [
        { domain: 'searchprex.com' },
        { domain: 'www.searchprex.com' },
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
    console.log(`✓ Created new Client: ${client.id} (${client.companyName})`);
  } else {
    console.log(`✓ Found existing Client: ${client.id} (${client.companyName})`);
  }

  // 2. Ensure Web 2.0 Brand Properties are retired for SearchPrex (No Telegra.ph / Write.as auto-posts)
  const retiredProps = await db.brandProperty.updateMany({
    where: {
      clientId: client.id,
      status: { not: 'retired' },
    },
    data: { status: 'retired' },
  });
  if (retiredProps.count > 0) {
    console.log(`✓ Retired ${retiredProps.count} Web 2.0 auto-post property(ies) for SearchPrex.`);
  }

  // 3. Configure SearchPrex LinkCampaign (Step 1 & Step 2: Free Tools, Checklists & Case Studies Outreach)
  const campaignData = {
    clientId: client.id,
    name: 'SearchPrex Authority & Free Tools Outreach',
    targetDomain: 'searchprex.com',
    enabled: true,
    dryRunMode: true, // Safe mode: drafts emails & qualifies prospects; never sends without approval
    requiresApproval: true,
    verifyIntervalDays: 7,
    competitors: [
      'rankings.io',
      'jurisdigital.com',
      'postali.com',
      'inflownetwork.com',
      'coalitiontechnologies.com',
      'victoriousseo.com',
    ],
    topic:
      'free SEO tools llms.txt generator JSON-LD schema generator GSC regex library law firm SEO and WooCommerce technical SEO',
    seedUrls: [
      'https://clutch.co/seo-firms',
      'https://www.designrush.com/agency/search-engine-optimization',
      'https://upcity.com/seo',
      'https://www.goodfirms.co/marketing-services/seo',
      'https://bloggers.feedspot.com/legal_marketing_blogs/',
      'https://bloggers.feedspot.com/ecommerce_seo_blogs/',
      'https://ahrefs.com/blog/free-seo-tools/',
      'https://backlinko.com/seo-tools',
    ],
  };

  let campaign = await db.linkCampaign.findFirst({
    where: {
      clientId: client.id,
      targetDomain: 'searchprex.com',
    },
  });

  if (!campaign) {
    campaign = await db.linkCampaign.create({
      data: campaignData,
    });
    console.log(`✓ Created LinkCampaign: ${campaign.id} (${campaign.name})`);
  } else {
    campaign = await db.linkCampaign.update({
      where: { id: campaign.id },
      data: {
        name: campaignData.name,
        enabled: true,
        dryRunMode: true,
        requiresApproval: true,
        competitors: campaignData.competitors,
        topic: campaignData.topic,
        seedUrls: campaignData.seedUrls,
      },
    });
    console.log(`✓ Updated LinkCampaign: ${campaign.id} (${campaign.name})`);
  }

  // 4. Ensure an OutreachMailbox exists on a separate subdomain so outreach-prepare can generate drafts
  let mailbox = await db.outreachMailbox.findFirst({
    where: { fromEmail: 'mubashar@outreach.searchprex.com' },
  });

  if (!mailbox) {
    mailbox = await db.outreachMailbox.create({
      data: {
        label: 'Mubashar Sharif — SearchPrex Outreach',
        fromEmail: 'mubashar@outreach.searchprex.com',
        fromName: 'Mubashar Sharif',
        postalAddress: 'SearchPrex, College Road, Daska, Punjab 51010',
        optOutText: 'Reply with STOP and I will not write again.',
        active: true,
        warmingUp: true,
        dailyCap: 20,
      },
    });
    console.log(`✓ Created OutreachMailbox for draft generation: ${mailbox.fromEmail}`);
  } else if (!mailbox.active) {
    mailbox = await db.outreachMailbox.update({
      where: { id: mailbox.id },
      data: { active: true },
    });
    console.log(`✓ Activated OutreachMailbox for draft generation: ${mailbox.fromEmail}`);
  }

  // 5. Configure BusinessProfile & B2B Agency Directory Citations (Step 3: Clutch, GoodFirms, DesignRush, UpCity, BBB, Trustpilot)
  let profile = await db.businessProfile.findUnique({
    where: { clientId: client.id },
  });

  if (!profile) {
    profile = await db.businessProfile.create({
      data: {
        clientId: client.id,
        name: 'SearchPrex',
        city: 'Daska',
        region: 'Punjab',
        postalCode: '51010',
        country: 'US',
        phone: '+92 305 9158010',
        website: 'https://www.searchprex.com',
        industry: 'agency',
        description:
          'Founder-led US SEO agency specializing in Law Firm SEO, WooCommerce & Shopify Ecommerce SEO, and Local Map Pack SEO.',
        categories: ['SEO Agency', 'Law Firm SEO', 'Ecommerce SEO', 'Technical SEO'],
      },
    });
    console.log(`✓ Created BusinessProfile for SearchPrex: ${profile.id}`);
  } else {
    profile = await db.businessProfile.update({
      where: { id: profile.id },
      data: {
        industry: 'agency',
        website: 'https://www.searchprex.com',
      },
    });
    console.log(`✓ Updated BusinessProfile for SearchPrex: ${profile.id}`);
  }

  const citationStats = await buildCitationQueue(profile.id);
  console.log(
    `✓ Citation Queue Synced: ${citationStats.applicable} total directories (${citationStats.created} newly added, ${citationStats.existing} existing)`
  );

  // Mark already-live profiles from TrustStrap.tsx as live/submitted
  const knownLiveListings: Array<{ directoryId: string; listingUrl: string }> = [
    { directoryId: 'trustpilot', listingUrl: 'https://www.trustpilot.com/review/searchprex.com' },
    { directoryId: 'clutch', listingUrl: 'https://clutch.co/profile/searchprex' },
    { directoryId: 'bbb', listingUrl: 'https://www.bbb.org/us/il/chicago/profile/searchprex' },
    { directoryId: 'goodfirms', listingUrl: 'https://www.goodfirms.co/company/searchprex' },
  ];

  for (const item of knownLiveListings) {
    await db.citationSubmission.updateMany({
      where: {
        profileId: profile.id,
        directoryId: item.directoryId,
      },
      data: {
        listingUrl: item.listingUrl,
        status: 'live',
      },
    });
  }
  console.log('✓ Linked existing live profiles (Trustpilot, Clutch, BBB, GoodFirms).');

  console.log('\n🎯 SearchPrex Campaign Summary:');
  console.log({
    campaignId: campaign.id,
    name: campaign.name,
    targetDomain: campaign.targetDomain,
    web20AutoPosting: 'DISABLED (Safe)',
    outreachDraftsMailbox: mailbox.fromEmail,
    competitors: campaign.competitors,
    seedsCount: campaign.seedUrls.length,
    agencyDirectoriesTracked: citationStats.directories.map((d) => d.name),
  });
}

setup()
  .catch(console.error)
  .finally(() => db.$disconnect());

