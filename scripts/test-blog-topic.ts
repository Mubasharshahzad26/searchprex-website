import { generateBlogTopic } from '@/lib/autopilot/blog-topic-generator';

async function main() {
  const clientId = 'cmrcl8frg0000p8uruwv7j5qd'; // MSO
  const topic = await generateBlogTopic(clientId, 'comparison');
  console.log(JSON.stringify(topic, null, 2));
}

main().catch(console.error);