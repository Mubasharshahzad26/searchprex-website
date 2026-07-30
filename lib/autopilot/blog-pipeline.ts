import { db } from '@/lib/db';
import { generateBlogTopic, WEEKLY_SCHEDULE } from './blog-topic-generator';

/**
 * Weekly blog pipeline orchestrator. Runs 3x/week (Mon/Wed/Fri).
 * 
 * Flow:
 * 1. Determine today's category from WEEKLY_SCHEDULE
 * 2. Generate topic via blog-topic-generator
 * 3. Generate content via Gemini (long-form)
 * 4. Quality scoring
 * 5. Publish to WordPress
 * 6. Submit URL to Google Indexing API
 * 7. Log to BlogPost + CostLog tables
 * 
 * TODO (weekend): implement full pipeline
 */
export async function runBlogPipeline(clientId: string) {
  throw new Error('Not implemented — build during weekend');
}