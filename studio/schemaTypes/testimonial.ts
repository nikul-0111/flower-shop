import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Customer Review / Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Customer Location / Tag (e.g. Verified Buyer - New York)',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1 to 5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'avatar',
      title: 'Customer Photo / Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'content',
      media: 'avatar',
    },
  },
})
