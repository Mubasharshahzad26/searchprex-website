export default {
  name: 'teamMember',
  title: 'Team Members',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full Name', type: 'string' },
    { name: 'role', title: 'Role/Title', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Short Bio', type: 'text' },
    { name: 'previousCompany', title: 'Previously At', type: 'string' },
    { name: 'specialty', title: 'Specialty Tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'stat', title: 'Key Stat (e.g. +380%)', type: 'string' },
    { name: 'statLabel', title: 'Stat Label', type: 'string' },
    { name: 'available', title: 'Available?', type: 'boolean' },
    { name: 'order', title: 'Order', type: 'number' },
  ],
  preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } }
}