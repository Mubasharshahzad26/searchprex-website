import { config } from 'dotenv'
config({ path: '.env.local' })
import { db } from '../lib/db'
import fs from 'fs'

async function preview() {
  const run = await db.autopilotRun.findFirst({
    where: { status: 'success' },
    orderBy: { startedAt: 'desc' },
  })
  if (!run) throw new Error('Koi successful run nahe mila')

  const results = run.results as any
  const pages = results?.pages?.filter((p: any) => p.content) ?? []
  console.log(`Latest run: ${run.id} — ${pages.length} pages with content\n`)

  if (!fs.existsSync('previews')) fs.mkdirSync('previews')

  const index: string[] = []

  for (const page of pages) {
    const c = page.content
    const slug = page.url.replace('https://www.smkstore.com/', '').replace(/\//g, '-').replace(/-$/, '') || 'home'
    const faqsHtml = (c.faqs ?? [])
      .map((f: any) => `<div class="faq"><h3>${f.question}</h3><p>${f.answer}</p></div>`)
      .join('')

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${c.metaTitle ?? ''}</title>
<meta name="description" content="${(c.metaDescription ?? '').replace(/"/g, '&quot;')}">
<style>
  body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #222; line-height: 1.7; }
  .meta-box { background: #f0f4f8; border-left: 4px solid #3d5a3d; padding: 15px; margin-bottom: 30px; font-family: Arial, sans-serif; font-size: 14px; }
  .meta-box strong { color: #3d5a3d; }
  h1 { font-size: 32px; line-height: 1.3; }
  h2 { margin-top: 40px; border-bottom: 2px solid #eee; padding-bottom: 8px; }
  table { border-collapse: collapse; width: 100%; margin: 20px 0; font-family: Arial, sans-serif; font-size: 14px; }
  th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
  th { background: #3d5a3d; color: white; }
  a { color: #1a6b1a; }
  .faq { background: #fafafa; padding: 15px 20px; margin: 10px 0; border-radius: 8px; }
  .faq h3 { margin: 0 0 8px 0; font-size: 17px; }
  .section-label { font-family: Arial; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-top: 50px; }
</style>
</head>
<body>
<div class="meta-box">
  <strong>URL:</strong> ${page.url}<br>
  <strong>GSC Keyword:</strong> ${page.keyword} (${page.impressions} imp, ${page.clicks} clicks)<br>
  <strong>Meta Title (${(c.metaTitle ?? '').length} chars):</strong> ${c.metaTitle ?? ''}<br>
  <strong>Meta Description (${(c.metaDescription ?? '').length} chars):</strong> ${c.metaDescription ?? ''}<br>
  <strong>Focus Keyword:</strong> ${c.focusKeyword ?? ''} | <strong>Words:</strong> ${c.qualityChecklist?.wordCount ?? '?'}
</div>
<h1>${c.h1Title ?? ''}</h1>
${c.contentBody ?? ''}
<p class="section-label">FAQs</p>
${faqsHtml}
</body>
</html>`

    const filename = `previews/${slug}.html`
    fs.writeFileSync(filename, html)
    index.push(`<li><a href="${slug}.html">${c.h1Title ?? page.url}</a></li>`)
    console.log(`✅ ${filename}`)
  }

  fs.writeFileSync(
    'previews/index.html',
    `<html><body style="font-family:Arial;padding:40px"><h1>SEO Autopilot — Content Previews</h1><ul>${index.join('')}</ul></body></html>`,
  )
  console.log('\nDone! previews/index.html kholo browser mein.')
}

preview()
  .catch(console.error)
  .finally(() => process.exit(0))