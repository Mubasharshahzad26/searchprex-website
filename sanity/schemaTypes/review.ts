export default {
  name: 'review',
  title: 'Reviews & Testimonials',
  type: 'document',
  fields: [
    { name: 'name', title: 'Client Name', type: 'string' },
    { name: 'role', title: 'Title & Company', type: 'string' },
    { name: 'review', title: 'Review Text', type: 'text' },
    { name: 'rating', title: 'Rating (1-5)', type: 'number' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
  preview: { select: { title: 'name', subtitle: 'role' } }
}