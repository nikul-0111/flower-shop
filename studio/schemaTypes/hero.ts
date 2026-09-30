import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Main Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading / Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'badge',
      title: 'Badge Text (e.g. 🌸 Handcrafted Floral Designs)',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'Button Text (e.g. Explore Collection)',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button Link (e.g. /shop)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      media: 'image',
    },
  },
})
