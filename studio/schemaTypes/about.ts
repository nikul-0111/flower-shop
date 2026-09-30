import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'Our Story / About Us',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'ourStory',
      title: 'Our Story Paragraphs',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'heroImage',
      title: 'About Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'values',
      title: 'Company Core Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Value Title', type: 'string'}),
            defineField({name: 'description', title: 'Value Description', type: 'text', rows: 2}),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
  },
})
