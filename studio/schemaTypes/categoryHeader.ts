import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'categoryHeader',
  title: 'Category Section Heading',
  type: 'document',
  fields: [
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Tagline (e.g. Curated Collections)',
      type: 'string',
      initialValue: 'Curated Collections',
    }),
    defineField({
      name: 'title',
      title: 'Section Main Title (e.g. Shop by Occasion & Floral Style)',
      type: 'string',
      initialValue: 'Shop by Occasion & Floral Style',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      initialValue: 'Find the ideal floral expression for birthdays, anniversaries, weddings, or everyday moments of elegance.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
