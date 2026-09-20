import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { NextRequest } from 'next/server';
import {
  verifyAutopilotRankSignature,
  AutopilotRankPayloadSchema,
  extractSlugFromUrl,
  slugify,
} from '../lib/autopilotrank/webhook';
import { POST } from '../app/api/webhooks/autopilotrank/route';
import { db } from '../lib/db';

function computeHmac(secret: string, body: string): string {
  return crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex');
}

test('AutopilotRank Webhook - Unit & Integration Tests', async (t) => {
  const testSecret = 'super_secret_test_key_12345';

  await t.test('1. verifyAutopilotRankSignature', () => {
    const rawBody = JSON.stringify({ test: true, event: 'article.published' });
    const validSig = computeHmac(testSecret, rawBody);

    // Valid raw hex signature
    assert.equal(
      verifyAutopilotRankSignature(rawBody, validSig, testSecret),
      true,
      'Valid raw hex signature should pass'
    );

    // Valid sha256= prefixed signature
    assert.equal(
      verifyAutopilotRankSignature(rawBody, `sha256=${validSig}`, testSecret),
      true,
      'Valid sha256= prefixed signature should pass'
    );

    // Invalid signature
    const invalidSig = computeHmac('wrong_secret', rawBody);
    assert.equal(
      verifyAutopilotRankSignature(rawBody, invalidSig, testSecret),
      false,
      'Invalid signature should fail'
    );

    // Missing signature header
    assert.equal(
      verifyAutopilotRankSignature(rawBody, null, testSecret),
      false,
      'Missing signature header should fail when secret is set'
    );

    // Malformed signature (wrong length)
    assert.equal(
      verifyAutopilotRankSignature(rawBody, 'abcd123', testSecret),
      false,
      'Malformed short signature should fail'
    );

    // When secret is not configured, check is bypassed
    assert.equal(
      verifyAutopilotRankSignature(rawBody, null, undefined),
      true,
      'No secret configured should bypass signature verification'
    );
  });

  await t.test('2. Helper functions: slugify & extractSlugFromUrl', () => {
    assert.equal(slugify('How to Boost SEO in 2026!'), 'how-to-boost-seo-in-2026');
    assert.equal(
      extractSlugFromUrl('https://www.searchprex.com/blog/boost-seo-guide'),
      'boost-seo-guide'
    );
    assert.equal(
      extractSlugFromUrl('https://example.com/blog/boost-seo-guide/'),
      'boost-seo-guide'
    );
    assert.equal(extractSlugFromUrl('/blog/boost-seo-guide'), 'boost-seo-guide');
  });

  await t.test('3. Schema validation with AutopilotRankPayloadSchema', () => {
    const validPublish = {
      event: 'article.published',
      test: false,
      timestamp: '2026-09-20T10:00:00Z',
      article: {
        id: 'article-uuid-1',
        title: 'Test Article Title',
        content: 'Markdown content here',
        slug: 'test-article-title',
        meta_description: 'Test description',
        images: [{ position: 1, url: 'https://example.com/image.png' }],
      },
      campaign: null,
      project: null,
    };

    const parsedPublish = AutopilotRankPayloadSchema.safeParse(validPublish);
    assert.equal(parsedPublish.success, true);

    const validUpdate = {
      event: 'article.updated',
      test: false,
      timestamp: '2026-09-20T11:00:00Z',
      article: {
        id: 'article-uuid-1',
        title: 'Updated Title',
        slug: 'test-article-title',
      },
      changes: {
        title: 'Updated Title',
        meta_description: 'Updated meta description',
      },
      opportunity: {
        id: 'opp-1',
        page_url: 'https://www.searchprex.com/blog/test-article-title',
      },
    };

    const parsedUpdate = AutopilotRankPayloadSchema.safeParse(validUpdate);
    assert.equal(parsedUpdate.success, true);

    // Missing article.id
    const invalidPayload = {
      event: 'article.published',
      article: {
        title: 'Missing ID',
      },
    };
    const parsedInvalid = AutopilotRankPayloadSchema.safeParse(invalidPayload);
    assert.equal(parsedInvalid.success, false);
  });

  await t.test('4. Route POST: Connection check ("test": true)', async () => {
    const payload = {
      event: 'article.published',
      test: true,
      timestamp: new Date().toISOString(),
      article: {
        id: 'test-ping-uuid',
        title: 'Test Ping',
      },
    };
    const bodyStr = JSON.stringify(payload);

    const req = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: bodyStr,
      headers: {
        'content-type': 'application/json',
      },
    });

    const res = await POST(req);
    assert.equal(res.status, 200, 'Test ping should return 200 OK');
    const json = await res.json();
    assert.equal(json.ok, true);
    assert.equal(json.action, 'test');
  });

  await t.test('5. Route POST: Malformed JSON payload', async () => {
    const req = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: '{ this is not valid JSON }',
      headers: {
        'content-type': 'application/json',
      },
    });

    const res = await POST(req);
    assert.equal(res.status, 400, 'Malformed JSON should return 400 Bad Request');
    const json = await res.json();
    assert.equal(json.ok, false);
    assert.equal(json.error, 'Malformed JSON payload');
  });

  await t.test('6. Route POST: Missing required fields', async () => {
    const req = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: JSON.stringify({ event: 'article.published' }), // missing article object
      headers: {
        'content-type': 'application/json',
      },
    });

    const res = await POST(req);
    assert.equal(res.status, 400, 'Missing article should return 400 Bad Request');
    const json = await res.json();
    assert.equal(json.ok, false);
    assert.match(json.error, /Missing or invalid required payload fields/);
  });

  await t.test('7. Route POST: HMAC signature verification in route', async () => {
    process.env.AUTOPILOTRANK_WEBHOOK_SECRET = testSecret;

    try {
      const payload = {
        event: 'article.published',
        test: true,
        article: { id: 'hmac-check-id', title: 'HMAC Check' },
      };
      const rawBody = JSON.stringify(payload);

      // A) Missing signature header
      const reqMissing = new NextRequest(
        'http://localhost:3000/api/webhooks/autopilotrank',
        {
          method: 'POST',
          body: rawBody,
          headers: { 'content-type': 'application/json' },
        }
      );
      const resMissing = await POST(reqMissing);
      assert.equal(resMissing.status, 401, 'Missing signature should return 401');

      // B) Invalid signature header
      const reqInvalid = new NextRequest(
        'http://localhost:3000/api/webhooks/autopilotrank',
        {
          method: 'POST',
          body: rawBody,
          headers: {
            'content-type': 'application/json',
            'x-signature-256': computeHmac('wrong_secret', rawBody),
          },
        }
      );
      const resInvalid = await POST(reqInvalid);
      assert.equal(resInvalid.status, 401, 'Invalid signature should return 401');

      // C) Valid signature header
      const reqValid = new NextRequest(
        'http://localhost:3000/api/webhooks/autopilotrank',
        {
          method: 'POST',
          body: rawBody,
          headers: {
            'content-type': 'application/json',
            'x-signature-256': computeHmac(testSecret, rawBody),
          },
        }
      );
      const resValid = await POST(reqValid);
      assert.equal(resValid.status, 200, 'Valid signature should return 200 OK');
    } finally {
      delete process.env.AUTOPILOTRANK_WEBHOOK_SECRET;
    }
  });

  await t.test('8. Full Lifecycle: Publish -> Idempotent Duplicate -> Update In-Place', async () => {
    const uniqueId = `ap_test_${Date.now()}`;
    const testSlug = `autopilot-test-article-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Clean up any pre-existing test data if needed
    try {
      await db.marketingBlog.deleteMany({
        where: { OR: [{ externalId: uniqueId }, { slug: testSlug }] },
      });
    } catch {
      // Ignore
    }

    // Step A: Publish article
    const publishPayload = {
      event: 'article.published',
      test: false,
      timestamp,
      article: {
        id: uniqueId,
        title: 'Original Autopilot Title',
        content: '# Heading\n\nThis is initial article content written in Markdown.',
        slug: testSlug,
        meta_description: 'Initial SEO meta description',
        word_count: 500,
        seo_score: 90,
        images: [{ position: 1, url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31' }],
      },
      campaign: { id: 'c1', name: 'SEO Pilot' },
      project: { id: 'p1', name: 'SearchPrex', domain: 'searchprex.com' },
    };

    const reqPublish = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: JSON.stringify(publishPayload),
      headers: { 'content-type': 'application/json' },
    });

    const resPublish = await POST(reqPublish);
    assert.equal(resPublish.status, 200, 'Publishing should succeed with 200 OK');
    const jsonPublish = await resPublish.json();
    assert.equal(jsonPublish.ok, true);
    assert.equal(jsonPublish.action, 'created');

    // Verify in database
    const createdPost = await db.marketingBlog.findFirst({
      where: { externalId: uniqueId },
    });
    assert.ok(createdPost, 'Post should exist in MarketingBlog');
    assert.equal(createdPost?.title, 'Original Autopilot Title');
    assert.equal(createdPost?.published, true);
    assert.equal(createdPost?.metaDescription, 'Initial SEO meta description');

    // Step B: Idempotency check (same payload again)
    const reqDuplicate = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: JSON.stringify(publishPayload),
      headers: { 'content-type': 'application/json' },
    });
    const resDuplicate = await POST(reqDuplicate);
    assert.equal(resDuplicate.status, 200, 'Duplicate delivery should return 200');
    const jsonDuplicate = await resDuplicate.json();
    assert.equal(jsonDuplicate.ok, true);
    assert.equal(jsonDuplicate.action, 'duplicate');

    // Step C: Update in-place (article.updated)
    const updatePayload = {
      event: 'article.updated',
      test: false,
      timestamp: new Date().toISOString(),
      article: {
        id: uniqueId,
        title: 'Updated Autopilot Title',
        slug: testSlug,
      },
      changes: {
        title: 'Updated Autopilot Title',
        meta_description: 'Updated SEO meta description from AutopilotRank',
        content: '## Updated Content\n\nThis content was updated in place.',
      },
      opportunity: {
        id: 'opp-101',
        type: 'declining_position',
        query: 'seo automation',
        page_url: `https://www.searchprex.com/blog/${testSlug}`,
      },
    };

    const reqUpdate = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: JSON.stringify(updatePayload),
      headers: { 'content-type': 'application/json' },
    });

    const resUpdate = await POST(reqUpdate);
    assert.equal(resUpdate.status, 200, 'Update should succeed with 200 OK');
    const jsonUpdate = await resUpdate.json();
    assert.equal(jsonUpdate.ok, true);
    assert.equal(jsonUpdate.action, 'updated');

    // Verify updated post in database
    const updatedPost = await db.marketingBlog.findFirst({
      where: { externalId: uniqueId },
    });
    assert.ok(updatedPost);
    assert.equal(updatedPost?.title, 'Updated Autopilot Title');
    assert.equal(updatedPost?.metaDescription, 'Updated SEO meta description from AutopilotRank');
    assert.match(updatedPost?.content || '', /Updated Content/);

    // Verify no duplicate post was created
    const totalMatching = await db.marketingBlog.count({
      where: { externalId: uniqueId },
    });
    assert.equal(totalMatching, 1, 'Only one post must exist for this externalId (no duplicates)');

    // Step D: Update non-existent post returns 404
    const unknownUpdatePayload = {
      event: 'article.updated',
      test: false,
      timestamp: new Date().toISOString(),
      article: {
        id: 'completely-unknown-external-id-xyz',
        title: 'Ghost Post Title',
      },
      changes: {
        title: 'Ghost Post',
      },
      opportunity: {
        page_url: 'https://www.searchprex.com/blog/non-existent-page-url-xyz',
      },
    };
    const reqUnknown = new NextRequest('http://localhost:3000/api/webhooks/autopilotrank', {
      method: 'POST',
      body: JSON.stringify(unknownUpdatePayload),
      headers: { 'content-type': 'application/json' },
    });
    const resUnknown = await POST(reqUnknown);
    assert.equal(resUnknown.status, 404, 'Update on non-existent post must return 404');

    // Clean up test post
    try {
      await db.marketingBlog.deleteMany({
        where: { externalId: uniqueId },
      });
      await db.autopilotRankDelivery.deleteMany({
        where: { articleId: uniqueId },
      });
    } catch {
      // Ignore
    }
  });
});
