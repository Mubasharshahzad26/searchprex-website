export default {
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  groups: [
    { name: 'basic', title: '🔵 Basic SEO' },
    { name: 'og', title: '📘 Open Graph' },
    { name: 'twitter', title: '🐦 Twitter Card' },
    { name: 'schema', title: '🧩 Schema Markup' },
  ],
  fields: [
    // BASIC SEO
    {
      name: 'title',
      title: 'Title Tag',
      type: 'string',
      group: 'basic',
      description: 'Recommended: 50-60 characters',
      validation: (R: any) => R.max(60).warning('Keep under 60 chars'),
    },
    {
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: 'Recommended: 150-160 characters',
      validation: (R: any) => R.max(160).warning('Keep under 160 chars'),
    },
    {
      name: 'canonical',
      title: 'Canonical URL',
      type: 'url',
      group: 'basic',
      description: 'Leave blank to auto-generate from slug',
    },
    {
      name: 'noIndex',
      title: 'No Index (Hide from Google)',
      type: 'boolean',
      group: 'basic',
      initialValue: false,
    },
    // OPEN GRAPH
    {
      name: 'ogTitle',
      title: 'OG Title',
      type: 'string',
      group: 'og',
    },
    {
      name: 'ogDescription',
      title: 'OG Description',
      type: 'text',
      rows: 2,
      group: 'og',
    },
    {
      name: 'ogImage',
      title: 'OG Image (1200x630)',
      type: 'image',
      group: 'og',
      options: { hotspot: true },
    },
    // TWITTER
    {
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      group: 'twitter',
    },
    {
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      rows: 2,
      group: 'twitter',
    },
    {
      name: 'twitterImage',
      title: 'Twitter Image',
      type: 'image',
      group: 'twitter',
      options: { hotspot: true },
    },
    {
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      group: 'twitter',
      options: {
        list: ['summary', 'summary_large_image'],
      },
      initialValue: 'summary_large_image',
    },
    // SCHEMA
    {
      name: 'schemaType',
      title: 'Schema Type',
      type: 'string',
      group: 'schema',
      options: {
        list: [
          { title: 'Local Business', value: 'LocalBusiness' },
          { title: 'Law Firm', value: 'LegalService' },
          { title: 'FAQ Page', value: 'FAQPage' },
          { title: 'Service', value: 'Service' },
          { title: 'Article', value: 'Article' },
          { title: 'Organization', value: 'Organization' },
          { title: 'WebPage', value: 'WebPage' },
        ],
      },
    },
    {
      name: 'schemaJson',
      title: 'Custom Schema JSON-LD',
      type: 'text',
      rows: 10,
      group: 'schema',
      description: 'Paste full JSON-LD schema here',
    },
  ],
}