export type BlogPublishInput = {
  siteUrl: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  categories?: number[];
  tags?: string[];
  username: string;
  appPassword: string;
};

export type BlogPublishResult = {
  wpPostId: number;
  liveUrl: string;
  publishedAt: Date;
};

/**
 * Publishes a blog post to WordPress via /wp-json/wp/v2/posts endpoint.
 * TODO (weekend): implement WP REST integration + Rank Math meta
 */
export async function publishBlogToWordPress(
  input: BlogPublishInput
): Promise<BlogPublishResult> {
  throw new Error('Not implemented — build during weekend');
}