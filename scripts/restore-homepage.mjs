import fs from 'fs';

async function restoreHomePage() {
  const baseUrl = 'https://www.michigansportsoutdoor.com';
  const username = 'apiuser';
  const appPassword = process.env.MSO_WP_PASS;
  if (!appPassword) throw new Error("Set MSO_WP_PASS to the MSO WordPress application password. Never hardcode it: this repository is public.");
  const auth = Buffer.from(`${username}:${appPassword}`).toString('base64');
  const headers = {
    Authorization: `Basic ${auth}`,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Content-Type': 'application/json'
  };

  const backupPath = 'C:/Users/Mubashar Shahzad/.gemini/antigravity/brain/a8924898-ab09-41e9-8d00-8dda8d7dfbf4/scratch/homepage-3821-backup.json';
  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

  console.log('Restoring Page #3821 from backup...');
  console.log('Backup content length:', backup.content.rendered.length);

  const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages/3821`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      title: 'Home',
      content: backup.content.rendered,
      meta: {
        _elementor_edit_mode: 'builder'
      }
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to restore page #3821: ${res.status} ${errText}`);
  }

  const data = await res.json();
  console.log('✅ Page #3821 restored successfully to previous state:', data.link);
}

restoreHomePage().catch(err => {
  console.error('❌ Error restoring homepage:', err);
  process.exit(1);
});
