import {CaseIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Residential Design", "Space Planning"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon displayed on the service card',
      options: {
        list: [
          {title: 'Home', value: 'home'},
          {title: 'Briefcase', value: 'briefcase'},
          {title: 'Star', value: 'star'},
          {title: 'Shopping Bag', value: 'shopping-bag'},
          {title: 'Layout', value: 'layout'},
          {title: 'Edit', value: 'edit'},
        ],
        layout: 'radio',
      },
      initialValue: 'home',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
