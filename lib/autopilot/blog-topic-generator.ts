import { db } from '@/lib/db';

export type BlogTopicCategory = 'comparison' | 'buying-guide' | 'educational' | 'roundup';

export type BlogTopic = {
  topic: string;
  category: BlogTopicCategory;
  keywords: string[];
  contextProducts?: string[];
};

/**
 * Generates a blog topic based on category, drawing from client's product catalog.
 * TODO (weekend): implement Gemini-based topic generation
 */
export async function generateBlogTopic(
  clientId: string,
  category: BlogTopicCategory
): Promise<BlogTopic> {
  throw new Error('Not implemented — build during weekend');
}

export const WEEKLY_SCHEDULE: Record<number, BlogTopicCategory> = {
  1: 'comparison',
  3: 'buying-guide',
  5: 'educational',
};