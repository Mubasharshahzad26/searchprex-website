export default {
  name: 'pricingPlan',
  title: 'Pricing Plans',
  type: 'document',
  fields: [
    { name: 'name', title: 'Plan Name', type: 'string' },
    { name: 'price', title: 'Price (e.g. $1,500/month)', type: 'string' },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'features', title: 'Features Included', type: 'array', of: [{ type: 'string' }] },
    { name: 'notIncluded', title: 'Not Included', type: 'array', of: [{ type: 'string' }] },
    { name: 'highlighted', title: 'Most Popular?', type: 'boolean' },
    { name: 'ctaText', title: 'Button Text', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: { select: { title: 'name', subtitle: 'price' } }
}