import { runBlogPipeline } from '@/lib/autopilot/blog-pipeline';

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry');
  const clientId = process.env.MSO_CLIENT_ID ?? 'cmrcl8frg0000p8uruwv7j5qd';

  console.log(`=== MSO BLOG AUTOPILOT RUNNER (Mode: ${dryRun ? 'DRY-RUN' : 'LIVE PUBLISH'}) ===\n`);

  const result = await runBlogPipeline(clientId, {
    dryRun,
  });

  console.log('\n=== ? BLOG AUTOPILOT RESULT ===');
  console.log(JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error('\n? Error running blog autopilot:', err);
  process.exit(1);
});
