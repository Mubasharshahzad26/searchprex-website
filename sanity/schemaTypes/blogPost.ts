export default {
  name: 'blogPost',
  title: 'Blog Posts',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', title: 'Short Description', type: 'text' },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
    { name: 'category', title: 'Category', type: 'string', options: {
        list: ['Law Firm SEO', 'Ecommerce SEO', 'Local SEO', 'Technical SEO', 'General']
      }
    },
    { name: 'body', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
  preview: { select: { title: 'title', media: 'coverImage' } }
}