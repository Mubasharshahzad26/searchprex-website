import { config } from 'dotenv';
config({ path: '.env.local' });
import { db } from './lib/db';

async function main() {
  const mailbox = await db.outreachMailbox.create({
    data: {
      label: 'Main Outreach',
      fromEmail: 'hello@outreach.searchprex.com',
      fromName: 'Mubashar',
      warmingUp: true,
      dailyCap: 25
    }
  });
  console.log('CREATED_MAILBOX_ID:', mailbox.id);
}
main().finally(() => process.exit(0));
