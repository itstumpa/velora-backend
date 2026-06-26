import {InfoOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label only',
      initialValue: 'About Section',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'About Us',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Crafted by Passion, Defined by Precision',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short description below the heading',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'founderHeading',
      title: 'Founder Section Heading',
      type: 'string',
      initialValue: 'Designing Dreams Since 2010',
    }),
    defineField({
      name: 'paragraphs',
      title: 'Paragraphs',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Body text paragraphs about the company',
    }),
    defineField({
      name: 'founderName',
      title: 'Founder Name',
      type: 'string',
      initialValue: 'Elena Voss',
    }),
    defineField({
      name: 'founderRole',
      title: 'Founder Role',
      type: 'string',
      initialValue: 'Founder & Principal Designer',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
