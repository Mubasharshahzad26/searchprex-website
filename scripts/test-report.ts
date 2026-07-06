import { config } from 'dotenv'
config({ path: '.env.local' })
config()

import { generateReport } from '../lib/report-generator'
import { Resend } from 'resend'
import { writeFileSync } from 'fs'

const CLIENT_ID = 'cmr6ly1kd0000l4ur3379olx1'
const SEND_TO = 'mubasharshahzad726@gmail.com' // ⚠️ apna Resend signup wala email

async function main() {
  console.log('1. Generating report (GSC KPIs + autopilot stats)...')
  const report = await generateReport(CLIENT_ID)

  writeFileSync('previews/report-preview.html', report.html)
  console.log('2. Preview saved: previews/report-preview.html (browser mein kholo)')
  console.log('   Subject:', report.subject)

  console.log('3. Sending test email...')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: 'SearchPrex Reports <onboarding@resend.dev>',
    to: [SEND_TO],
    subject: '[TEST] ' + report.subject,
    html: report.html,
  })
  if (error) throw new Error(error.message)
  console.log('DONE! Email sent, id:', data?.id, '— inbox check karo (spam bhi)!')
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })