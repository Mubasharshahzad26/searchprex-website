import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from '../lib/db';
import { withRetry } from '../lib/db-retry';

async function main() {
  console.log('🚀 Registering GitLab (DA 92) Live Backlink in Neon DB...');

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

  // 1. Ensure GitLab Brand Property exists
  let gitlabProp = client.brandProperties.find(p => p.platform === 'gitlab');
  if (!gitlabProp) {
    gitlabProp = await withRetry(() =>
      db.brandProperty.create({
        data: {
          clientId: client.id,
          platform: 'gitlab',
          handle: 'digitizpk',
          authorName: 'DigitizPK Outdoor Gear Lab',
          authorBio: 'Field-tested outdoor cutlery protocols and technical cutting benchmarks.',
          status: 'live'
        }
      })
    );
    console.log('✓ Created GitLab BrandProperty:', gitlabProp.id);
  } else {
    console.log('✓ Found GitLab BrandProperty:', gitlabProp.id);
  }

  const liveUrl = 'https://gitlab.com/-/snippets/6056783';
  const targetUrl = 'https://michigansportsoutdoor.com';
  const anchorText = 'Michigan Sports Outdoor';
  const title = 'Field Sharpening & Edge Geometry Protocol for Working Knives';
  const now = new Date();

  // 2. Record Post
  const post = await withRetry(() =>
    db.brandPropertyPost.create({
      data: {
        propertyId: gitlabProp.id,
        title,
        bodyHtml: 'Public Markdown Snippet Published to GitLab',
        status: 'published',
        liveUrl,
        publishedAt: now,
        clientAnchors: [anchorText],
        anchorVerdicts: ['brand'],
        wordCount: 300,
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
  console.log('  Platform: GitLab (DA 92)');
}

main().catch(console.error).finally(() => process.exit(0));
