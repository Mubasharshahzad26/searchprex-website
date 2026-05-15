export default {
  name: 'caseStudy',
  title: 'Case Studies',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'clientName', title: 'Client Name', type: 'string' },
    { name: 'location', title: 'Location (e.g. Dallas, TX)', type: 'string' },
    { name: 'industry', title: 'Industry', type: 'string', options: {
        list: ['Law Firm SEO', 'Shopify SEO', 'Local SEO', 'Enterprise SEO', 'Home Services SEO']
      }
    },
    { name: 'result', title: 'Main Result (e.g. +380%)', type: 'string' },
    { name: 'resultLabel', title: 'Result Label', type: 'string' },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'excerpt', title: 'Short Description', type: 'text' },
    { name: 'body', title: 'Full Case Study', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
  ],
  preview: { select: { title: 'clientName', subtitle: 'result', media: 'coverImage' } }
}