import { db } from '@/lib/db';

async function syncFirstPost() {
  const clientId = 'cmrcl8frg0000p8uruwv7j5qd';
  const topic = 'Best Hunting Knives for Michigan Deer Season (2026 Field-Tested Guide)';
  const liveUrl = 'https://www.michigansportsoutdoor.com/best-hunting-knives-for-michigan-deer-season-3/';
  const wpPostId = 166496;

  const existing = await db.blogPost.findFirst({
    where: {
      clientId,
      topic
    }
  });

  if (existing) {
    console.log('Post already exists in DB:', existing.id, existing.status);
    if (existing.status !== 'published') {
      await db.blogPost.update({
        where: { id: existing.id },
        data: {
          status: 'published',
          wpPostId,
          liveUrl,
          publishedAt: new Date()
        }
      });
      console.log('Updated to published status.');
    }
    return;
  }

  const created = await db.blogPost.create({
    data: {
      clientId,
      topic,
      category: 'buying-guide',
      keywords: ['hunting knives for deer', 'best field dressing knife', 'michigan deer hunting gear', 'buck 110 hunting'],
      status: 'published',
      wpPostId,
      liveUrl,
      publishedAt: new Date()
    }
  });

  console.log('Created BlogPost record in DB:', created.id, created.status);
}

syncFirstPost()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
