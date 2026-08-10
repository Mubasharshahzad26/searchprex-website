import { runBlogPipeline } from '@/lib/autopilot/blog-pipeline';

async function main() {
  const clientId = 'cmrcl8frg0000p8uruwv7j5qd';
  
  console.log('Starting dry-run blog generation...\n');
  
  const result = await runBlogPipeline(clientId, {
    categoryOverride: 'comparison',
    dryRun: true,
  });
  
  console.log('Result:', JSON.stringify(result, null, 2));
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});