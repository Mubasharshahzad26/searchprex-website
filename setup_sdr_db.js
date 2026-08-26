require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();

  try {
    await client.query(`
      CREATE TABLE "AiSdrLead" (
        "id" TEXT NOT NULL,
        "websiteUrl" TEXT NOT NULL,
        "companyName" TEXT,
        "niche" TEXT,
        "location" TEXT,
        "contactEmail" TEXT,
        "score" INTEGER,
        "analysis" TEXT,
        "status" TEXT NOT NULL DEFAULT 'new',
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "AiSdrLead_pkey" PRIMARY KEY ("id")
      );
    `);
    await client.query(`CREATE UNIQUE INDEX "AiSdrLead_websiteUrl_key" ON "AiSdrLead"("websiteUrl");`);

    await client.query(`
      CREATE TABLE "AiSdrEmailLog" (
        "id" TEXT NOT NULL,
        "leadId" TEXT NOT NULL,
        "subject" TEXT NOT NULL,
        "body" TEXT NOT NULL,
        "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "status" TEXT NOT NULL DEFAULT 'sent',
        CONSTRAINT "AiSdrEmailLog_pkey" PRIMARY KEY ("id")
      );
    `);
    
    await client.query(`
      ALTER TABLE "AiSdrEmailLog" ADD CONSTRAINT "AiSdrEmailLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "AiSdrLead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    `);

    console.log('Success');
  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

run();
