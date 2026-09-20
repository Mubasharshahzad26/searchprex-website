require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  const client = new Client({ connectionString });
  await client.connect();
  console.log('Connected to PostgreSQL');

  try {
    console.log('Adding externalId column to MarketingBlog if not exists...');
    await client.query(`
      ALTER TABLE "MarketingBlog" 
      ADD COLUMN IF NOT EXISTS "externalId" TEXT;
    `);

    console.log('Creating unique index on MarketingBlog(externalId) if not exists...');
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "MarketingBlog_externalId_key" 
      ON "MarketingBlog"("externalId");
    `);

    console.log('Creating AutopilotRankDelivery table if not exists...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS "AutopilotRankDelivery" (
        "id" TEXT NOT NULL,
        "deliveryKey" TEXT NOT NULL,
        "event" TEXT NOT NULL,
        "articleId" TEXT NOT NULL,
        "slug" TEXT,
        "status" TEXT NOT NULL DEFAULT 'processed',
        "metadata" JSONB,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "AutopilotRankDelivery_pkey" PRIMARY KEY ("id")
      );
    `);

    console.log('Creating indexes on AutopilotRankDelivery...');
    await client.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "AutopilotRankDelivery_deliveryKey_key" 
      ON "AutopilotRankDelivery"("deliveryKey");
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS "AutopilotRankDelivery_articleId_idx" 
      ON "AutopilotRankDelivery"("articleId");
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS "AutopilotRankDelivery_event_idx" 
      ON "AutopilotRankDelivery"("event");
    `);

    console.log('Database migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
