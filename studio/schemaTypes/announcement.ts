import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'announcement',
  title: 'Top Announcement Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Announcement Message',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Action Link (Optional URL or Page Path)',
      type: 'string',
    }),
    defineField({
      name: 'enabled',
      title: 'Active Banner Toggle',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'link',
    },
  },
})
