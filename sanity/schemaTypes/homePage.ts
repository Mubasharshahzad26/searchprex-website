export default {
  name: 'homePage',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    { name: 'heroHeadline', title: 'Hero Headline', type: 'string' },
    { name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text' },
    { name: 'heroCtaText', title: 'Hero CTA Button Text', type: 'string' },
    { name: 'stat1Number', title: 'Stat 1 Number (e.g. 200+)', type: 'string' },
    { name: 'stat1Label', title: 'Stat 1 Label (e.g. US Clients)', type: 'string' },
    { name: 'stat2Number', title: 'Stat 2 Number', type: 'string' },
    { name: 'stat2Label', title: 'Stat 2 Label', type: 'string' },
    { name: 'stat3Number', title: 'Stat 3 Number', type: 'string' },
    { name: 'stat3Label', title: 'Stat 3 Label', type: 'string' },
    { name: 'phoneNumber', title: 'Phone Number', type: 'string' },
    { name: 'email', title: 'Email Address', type: 'string' },
    { name: 'address', title: 'Office Address', type: 'text' },
    { name: 'seo', title: 'SEO Settings', type: 'seo' },
    // Hero Image
{ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },

// Services Section
{ name: 'servicesHeading', title: 'Services Section Heading', type: 'string' },
{ name: 'services', title: 'Services', type: 'array', of: [{
  type: 'object', fields: [
    { name: 'title', title: 'Service Title', type: 'string' },
    { name: 'description', title: 'Service Description', type: 'text' },
    { name: 'icon', title: 'Service Icon', type: 'image', options: { hotspot: true } },
  ]
}]},

// Reviews
{ name: 'reviews', title: 'Reviews', type: 'array', of: [{
  type: 'object', fields: [
    { name: 'name', title: 'Client Name', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'review', title: 'Review Text', type: 'text' },
    { name: 'avatar', title: 'Client Photo', type: 'image', options: { hotspot: true } },
    { name: 'rating', title: 'Rating (1-5)', type: 'number' },
  ]
}]},

// FAQ
{ name: 'faqs', title: 'FAQs', type: 'array', of: [{
  type: 'object', fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
  ]
}]},

// Team Members
{ name: 'team', title: 'Team Members', type: 'array', of: [{
  type: 'object', fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
  ]
}]},

// CTA Section
{ name: 'ctaHeading', title: 'CTA Heading', type: 'string' },
{ name: 'ctaSubtext', title: 'CTA Subtext', type: 'text' },
{ name: 'ctaButtonText', title: 'CTA Button Text', type: 'string' },
{ name: 'ctaButtonLink', title: 'CTA Button Link', type: 'url' },
  ],
}