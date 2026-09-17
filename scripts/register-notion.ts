import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';
import { withRetry } from '../lib/db-retry';

async function main() {
  console.log('🚀 Registering Notion (DA 91) Live Backlink in Neon DB...');

  const client = await withRetry(() =>
    db.client.findFirst({
      where: {
        OR: [
          { domain: 'michigansportsoutdoor.com' },
          { companyName: 'Michigan Sports Outdoor' }
        ]
      },
      include: {
        linkCampaigns: { where: { enabled: true } },
        brandProperties: true
      }
    })
  );

  if (!client) throw new Error('MSO Client not found');
  const campaign = client.linkCampaigns[0];
  if (!campaign) throw new Error('No active link campaign for MSO');

  // 1. Ensure Notion Brand Property exists
  let notionProp = client.brandProperties.find(p => p.platform === 'notion');
  if (!notionProp) {
    notionProp = await withRetry(() =>
      db.brandProperty.create({
        data: {
          clientId: client.id,
          platform: 'notion',
          handle: 'michigan-sports-outdoor',
          authorName: 'Michigan Sports Outdoor Knowledge Base',
          authorBio: 'Official cutlery guides and wilderness equipment documentation.',
          status: 'live'
        }
      })
    );
    console.log('✓ Created Notion BrandProperty:', notionProp.id);
  } else {
    console.log('✓ Found Notion BrandProperty:', notionProp.id);
  }

  const liveUrl = 'https://cautious-point-398.notion.site/High-Carbon-vs-Powder-Metallurgy-Steel-in-Field-Cutlery-3de9122f939d811cac66c857425e5317';
  const targetUrl = 'https://michigansportsoutdoor.com/product-category/knives-tools/hunting-knives/';
  const anchorText = 'American hunting knives';
  const title = 'High-Carbon vs Powder Metallurgy Steel in Field Cutlery';
  const now = new Date();

  // 2. Record Post
  const post = await withRetry(() =>
    db.brandPropertyPost.create({
      data: {
        propertyId: notionProp.id,
        title,
        bodyHtml: 'Public Notion Page Published to Notion Workspace',
        status: 'published',
        liveUrl,
        publishedAt: now,
        clientAnchors: [anchorText],
        anchorVerdicts: ['natural'],
        wordCount: 350,
      }
    })
  );
  console.log('✓ Created BrandPropertyPost record:', post.id);

  // 3. Record Link Placement
  const placement = await withRetry(() =>
    db.linkPlacement.upsert({
      where: {
        campaignId_sourceUrl_targetUrl: {
          campaignId: campaign.id,
          sourceUrl: liveUrl,
          targetUrl,
        }
      },
      update: {
        status: 'live',
        lastLiveAt: now,
        lastCheckedAt: now,
        expectedAnchor: anchorText,
      },
      create: {
        campaignId: campaign.id,
        sourceUrl: liveUrl,
        targetUrl,
        expectedAnchor: anchorText,
        origin: 'property',
        status: 'live',
        linkType: 'dofollow',
        firstSeenAt: now,
        lastLiveAt: now,
        lastCheckedAt: now,
      }
    })
  );

  console.log('✓ Registered Live Placement in LinkPlacement table:', placement.id);
  console.log('  Source:', placement.sourceUrl);
  console.log('  Target:', placement.targetUrl);
  console.log('  Anchor:', placement.expectedAnchor);
  console.log('  Platform: Notion (DA 91)');

  const totalCount = await db.linkPlacement.count({
    where: { campaignId: campaign.id, status: 'live' },
  });
  console.log(`\n🎉 Total Live MSO Placements now in Neon DB: ${totalCount}`);
}

main().catch(console.error).finally(() => process.exit(0));
