import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { db } from '../lib/db'

const CLIENT_ID = 'cmr6ly1kd0000l4ur3379olx1' // SMK Store — copy-paste only!

async function main() {
  const rc = await db.reportConfig.upsert({
    where: { clientId: CLIENT_ID },
    update: {},
    create: {
      clientId: CLIENT_ID,
      recipientEmail: 'mubasharshahzad726@gmail.com', // ⚠️ apna Resend signup wala email
      ccEmails: null,
      frequency: 'weekly',
      sendDay: 1,        // Monday
      sendHourUTC: 9,    // 9 AM UTC = 2 PM PKT
      enabled: true,
    },
  })
  console.log('ReportConfig ready:', rc)
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })